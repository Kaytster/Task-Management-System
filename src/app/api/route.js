// the api to check against the database
import { verifyUserCredentials } from '../lib/db'; 

export async function POST(request) {
  console.log('API handler invoked');
  const { username, password } = await request.json(); 
  console.log('Received request:', { username, password });

  try {
    const isValid = await verifyUserCredentials(username, password);
    console.log('Credentials verification result:', isValid);

    if (isValid) {
      return new Response(JSON.stringify({ message: 'Login successful' }), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    } else {
      return new Response(JSON.stringify({ message: 'Invalid username or password' }), {
        status: 401,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }
  } catch (error) {
    console.error('Error verifying user credentials:', error);
    return new Response(JSON.stringify({ message: 'Internal server error' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}
