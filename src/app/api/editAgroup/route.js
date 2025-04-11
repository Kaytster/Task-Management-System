import { execute } from '../../lib/db'; // Assuming execute is there
// Assuming addmemberAndLinkToGroup is also now in '../../lib/db'
import { addMemberToGroup } from '../../lib/db';
import { NextResponse } from 'next/server';

export async function POST(req, res) {
    console.log('API createAlist POST handler invoked');
    const { userid, groupId } = await req.json();

    if (!userid || !groupId) {
        return NextResponse.json({ message: 'User ID and Group ID are required' }, { status: 400 });
    }

    try {
        const success = await addMemberToGroup(userid, groupId);

        if (success) {
            return NextResponse.json({ message: 'Member added successfully' }, { status: 201 });
        } else {
            return NextResponse.json({ message: 'Failed to add member to the group' }, { status: 500 });
        }
    } catch (error) {
        console.error('Error adding member:', error);
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
}