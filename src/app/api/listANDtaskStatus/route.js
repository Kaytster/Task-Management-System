// src/app/api/tasks.js
import { execute } from '../../lib/db';
import { showLists, recentListTasks } from '../../lib/db/showData';
import { cookies } from 'next/headers';

export async function GET(request) {
  try {
    const cookieStore = cookies(); // Get the cookie store
    const userIdObject = cookieStore.get('userId'); // Get the 'userId' cookie

    let userId = null;
    if (userIdObject) {
      userId = parseInt(userIdObject.value, 10); // Get the value and parse it
    }

    if (!userId) {
      return new Response(JSON.stringify({ error: 'User ID not found in cookies' }), { status: 401 }); // Or handle this as you need
    }

    const lists = await showLists(userId);
    const listsWithTasks = await Promise.all(
      lists.map(async (list) => {
        const tasks = await recentListTasks(list.IndList_ID);
        return { ...list, tasks };
      })
    );

    return Response.json(listsWithTasks);
  } catch (error) {
    console.error('API Error:', error);
    return new Response(JSON.stringify({ error: 'Something went wrong on the server' }), { status: 500 });
  }
}

export async function POST(request) {
  try {
    const { taskId, isCompleted } = await request.json();
    const taskStatus = isCompleted ? 'Complete' : 'Incomplete';

    // 1. Update the individual task status
    const updateTaskQuery = 'UPDATE individual_task SET IndTask_Status = ? WHERE IndTask_ID = ?';
    const [updateResult] = await execute(updateTaskQuery, [taskStatus, taskId]);

    if (updateResult.affectedRows > 0) {
      // 2. Get the List ID from the link table
      const getListIdQuery = 'SELECT IndList_ID FROM individual_link WHERE IndTask_ID = ?';
      const [linkResult] = await execute(getListIdQuery, [taskId]);
      const listId = linkResult[0]?.IndList_ID;

      if (listId) {
        // 3. Count total tasks in the list
        const countTotalTasksQuery = 'SELECT COUNT(*) AS total FROM individual_task it JOIN individual_link il ON it.IndTask_ID = il.IndTask_ID WHERE il.IndList_ID = ?';
        const [totalTasksResult] = await execute(countTotalTasksQuery, [listId]);
        const totalTasks = totalTasksResult[0]?.total || 0;

        // 4. Count completed tasks in the list
        const countCompletedTasksQuery = 'SELECT COUNT(*) AS completed FROM individual_task it JOIN individual_link il ON it.IndTask_ID = il.IndTask_ID WHERE il.IndList_ID = ? AND it.IndTask_Status = "Complete"';
        const [completedTasksResult] = await execute(countCompletedTasksQuery, [listId]);
        const completedTasks = completedTasksResult[0]?.completed || 0;

        // 5. Update the list status based on completed tasks
        if (totalTasks > 0 && totalTasks === completedTasks) {
          const updateListQuery = 'UPDATE individual_list SET IndList_Status = "Complete" WHERE IndList_ID = ?';
          await execute(updateListQuery, [listId]);
          console.log(`List ${listId} set to Complete!`);
        } else if (totalTasks > 0) { // Check if there are tasks and not all are complete
          const updateListQuery = 'UPDATE individual_list SET IndList_Status = "Incomplete" WHERE IndList_ID = ?';
          await execute(updateListQuery, [listId]);
          console.log(`List ${listId} set to Incomplete!`);
        }
      } else {
        console.log(`Task with ID ${taskId} not found in individual_link, or has no List ID.`);
        // It's probably good to log this in case it happens.
      }

      return new Response(JSON.stringify({ message: 'Task status updated successfully' }), { status: 200 });
    } else {
      return new Response(JSON.stringify({ error: 'Task not found' }), { status: 404 });
    }
  } catch (error) {
    console.error('API Error:', error);
    return new Response(JSON.stringify({ error: 'Something went wrong on the server' }), { status: 500 });
  }
}