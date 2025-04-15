// import { verifyListCreation } from '../../lib/db'; // Your database function

// export async function POST(request) {
//     console.log('API register handler invoked');
//     const { name, status } = await request.json();
//     console.log('Received registration request:', { name, status });

//     try {

//         console.log('Calling verifyAccountCreation with:', {
//             name,
//             status
//         });

//         // Create the user in the database
//         const success = await verifyListCreation(name, status);
//         console.log('verifyAccountCreation returned:', success);

//         if (success) {
//             return new Response(JSON.stringify({ message: 'Registration successful' }), {
//                 status: 201, // 201 Created
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//             });
//         } else {
//             return new Response(JSON.stringify({ message: 'Registration failed' }), {
//                 status: 400, // 400 Bad Request
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//             });
//         }
//     } catch (error) {
//         console.error('Error during registration:', error);
//         return new Response(JSON.stringify({ message: 'Internal server error' }), {
//             status: 500,
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//         });
//     }
// }




import { execute } from '../../lib/db';
import { NextResponse } from 'next/server'; 

export async function POST(req, res) { 
    console.log('API createAlist POST handler invoked');
    const { name, status, userId } = await req.json();

    if (!name || !userId) {
        return NextResponse.json({ message: 'List name and User ID are required' }, { status: 400 });
    }

    try {
        const insertListQuery = `
            INSERT INTO individual_list (IndList_Name, IndList_Status, User_ID)
            VALUES (?, ?, ?)
        `;

        const [result] = await execute(insertListQuery, [name, status, userId]);

        if (result && result.insertId) {
            return NextResponse.json({ message: 'List created successfully', listId: result.insertId }, { status: 201 });
        } else {
            return NextResponse.json({ message: 'Failed to create list in the database' }, { status: 500 });
        }
    } catch (error) {
        console.error('Database error creating list:', error);
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
}