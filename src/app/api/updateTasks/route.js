// src/app/api/updateTask/route.js
import { execute } from "@/app/lib/db";
export async function POST(request) {
    try {
        // 1. Get the data your computer sent in the request
        const { IndTask_ID, IndTask_Name, IndTask_Content } = await request.json();

        // Make sure we have the task ID!
        if (!IndTask_ID) {
            return new Response(JSON.stringify({ message: 'Task ID is required to update.' }), {
                status: 400, // 400 means "Bad Request"
                headers: { 'Content-Type': 'application/json' },
            });
        }

        // 2. Talk to your database to update the task
        const result = await execute(
            'UPDATE individual_task SET IndTask_Name = ?, IndTask_Content = ? WHERE IndTask_ID = ?',
            [IndTask_Name, IndTask_Content, IndTask_ID]
        );
        console.log('Database update result:', result);

        // 3. Check if the update was successful
        if (result.affectedRows > 0) {
            // If at least one row was changed, it means the update worked!
            return new Response(JSON.stringify({ message: 'Task updated successfully!' }), {
                status: 200, // 200 means "OK"
                headers: { 'Content-Type': 'application/json' },
            });
        } else {
            // If no rows were changed, maybe the task with that ID doesn't exist
            return new Response(JSON.stringify({ message: 'Task not found or no changes made.' }), {
                status: 404, // 404 means "Not Found"
                headers: { 'Content-Type': 'application/json' },
            });
        }

    } catch (error) {
        // If something went wrong during the process (like a problem with the database)
        console.error('Error updating task:', error);
        return new Response(JSON.stringify({ message: 'Internal server error.' }), {
            status: 500, // 500 means "Internal Server Error"
            headers: { 'Content-Type': 'application/json' },
        });
    }
}