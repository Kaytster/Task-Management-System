// src/app/api/createTask/route.js
import { execute, createTaskAndLinkToList } from '../../lib/db';
import { NextResponse } from 'next/server';

export async function POST(req) {
    console.log('API createTask POST handler invoked');
    const { name, content, status, userId, listId } = await req.json();

    if (!name || !content || !userId || !listId) {
        return NextResponse.json({ message: 'Task name, content, User ID, and List ID are required' }, { status: 400 });
    }

    try {
        const success = await createTaskAndLinkToList(name, content, status, listId);

        if (success) {
            return NextResponse.json({ message: 'Task created and linked successfully' }, { status: 201 });
        } else {
            return NextResponse.json({ message: 'Failed to create and link task' }, { status: 500 });
        }
    } catch (error) {
        console.error('Error creating and linking task:', error);
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
}