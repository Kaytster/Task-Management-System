import bcrypt from 'bcrypt';
import { verifyAccountCreation } from '../../lib/db'; // Your database function

export async function POST(request) {
    console.log('API register handler invoked');
    const { firstname, lastname, email, username, password } = await request.json();
    console.log('Received registration request:', { firstname, lastname, email, username });

    try {
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10); // 10 is the salt rounds

        console.log('Calling verifyAccountCreation with:', {
            firstname,
            lastname,
            email,
            username,
            hashedPassword,
        });

        // Create the user in the database
        const success = await verifyAccountCreation(firstname, lastname, email, username, hashedPassword);
        console.log('verifyAccountCreation returned:', success);

        if (success) {
            return new Response(JSON.stringify({ message: 'Registration successful' }), {
                status: 201, // 201 Created
                headers: {
                    'Content-Type': 'application/json',
                },
            });
        } else {
            return new Response(JSON.stringify({ message: 'Registration failed' }), {
                status: 400, // 400 Bad Request
                headers: {
                    'Content-Type': 'application/json',
                },
            });
        }
    } catch (error) {
        console.error('Error during registration:', error);
        return new Response(JSON.stringify({ message: 'Internal server error' }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }
}