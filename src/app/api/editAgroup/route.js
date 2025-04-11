// import { execute } from '../../lib/db'; // Assuming execute is there
// // Assuming addmemberAndLinkToGroup is also now in '../../lib/db'
// import { addMemberToGroup } from '../../lib/db';
// import { NextResponse } from 'next/server';

// export async function POST(req, res) {
//     console.log('API createAlist POST handler invoked');
//     const { userid, groupId } = await req.json();

//     if (!userid || !groupId) {
//         return NextResponse.json({ message: 'User ID and Group ID are required' }, { status: 400 });
//     }

//     try {
//         const success = await addMemberToGroup(userid, groupId);

//         if (success) {
//             return NextResponse.json({ message: 'Member added successfully' }, { status: 201 });
//         } else {
//             return NextResponse.json({ message: 'Failed to add member to the group' }, { status: 500 });
//         }
//     } catch (error) {
//         console.error('Error adding member:', error);
//         return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
//     }
// }

// // api/editAgroup/route.js


// export async function POST(req) {
//     console.log('API createAlist POST handler invoked for adding list');
//     const { name: grpname, status: grpstatus, groupId } = await req.json(); // Using 'name' from the form

//     if (!grpname || !groupId) {
//         return NextResponse.json({ message: 'List name and Group ID are required' }, { status: 400 });
//     }

//     try {
//         const insertGrpListQuery = `
//             INSERT INTO group_list (GrpList_Name, GrpList_Status, Group_ID)
//             VALUES (?, ?, ?)
//         `;

//         const [result] = await execute(insertGrpListQuery, [grpname, grpstatus, groupId]);

//         if (result && result.insertId) {
//             return NextResponse.json({ message: 'List created successfully', listId: result.insertId }, { status: 201 });
//         } else {
//             return NextResponse.json({ message: 'Failed to create list in the database' }, { status: 500 });
//         }
//     } catch (error) {
//         console.error('Database error creating list:', error);
//         return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
//     }
// }

// src/app/api/editAgroup/route.js
import { execute, addMemberToGroup } from '../../lib/db';
import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const requestData = await req.json(); 

    const { action } = requestData;

    if (action === 'addMember') {
      console.log('API handling addMember');
      const { userid, groupId } = requestData;
      if (!userid || !groupId) {
        return NextResponse.json({ message: 'User ID and Group ID are needed!', status: 400 });
      }
      try {
        const success = await addMemberToGroup(userid, groupId);
        if (success) {
          return NextResponse.json({ message: 'Member added successfully!', status: 201 });
        } else {
          return NextResponse.json({ message: 'Failed to add member to the group.', status: 500 });
        }
      } catch (error) {
        console.error('Error adding member:', error);
        return NextResponse.json({ message: 'Something went wrong while adding the member.', status: 500 });
      }
    } else if (action === 'addList') {
      console.log('API handling addList');
      const { name: grpname, status: grpstatus, groupId } = requestData;
      if (!grpname || !groupId) {
        return NextResponse.json({ message: 'List name and Group ID are needed!', status: 400 });
      }
      try {
        const insertGrpListQuery = `
          INSERT INTO group_list (GrpList_Name, GrpList_Status, Group_ID)
          VALUES (?, ?, ?)
        `;
        const [result] = await execute(insertGrpListQuery, [grpname, grpstatus, groupId]);

        if (result && result.insertId) {
          return NextResponse.json({ message: 'List created successfully!', listId: result.insertId, status: 201 });
        } else {
          return NextResponse.json({ message: 'Failed to create list in the database.', status: 500 });
        }
      } catch (error) {
        console.error('Database error creating list:', error);
        return NextResponse.json({ message: 'Something went wrong while creating the list.', status: 500 });
      }
    } else {
      return NextResponse.json({ message: 'Unknown action', status: 400 });
    }
  } catch (error) {
    console.error('Error parsing request body:', error);
    return NextResponse.json({ message: 'The information you sent wasn\'t in the right format.', status: 400 });
  }
}