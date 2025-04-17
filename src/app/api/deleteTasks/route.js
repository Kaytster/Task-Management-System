// src/app/api/deleteTasks/route.js
import { execute } from '@/app/lib/db';
import { NextResponse } from 'next/server';

export async function DELETE(req) {
  console.log('API deleteTasks DELETE handler invoked!');
  try {
    const { taskIds } = await req.json();

    if (!taskIds || !Array.isArray(taskIds) || taskIds.length === 0) {
      return NextResponse.json({ message: 'Please provide an array of task IDs to delete.' }, { status: 400 });
    }

    // 1. Delete the links in the individual_link table
    const deleteLinksQuery = 'DELETE FROM individual_link WHERE IndTask_ID IN (?)';
    await execute(deleteLinksQuery, taskIds);
    const query = 'DELETE FROM individual_task WHERE IndTask_ID IN (?)';
    const [result] = await execute(query, taskIds);

    if (result.affectedRows > 0) {
      return NextResponse.json({ message: `${result.affectedRows} task(s) deleted successfully.` }, { status: 200 });
    } else {
      return NextResponse.json({ message: 'No tasks found with the provided IDs.' }, { status: 404 });
    }
  } catch (error) {
    console.error('Error deleting tasks:', error);
    return NextResponse.json({ message: 'Failed to delete tasks.' }, { status: 500 });
  }
}