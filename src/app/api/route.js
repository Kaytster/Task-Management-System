// the api to check against the database
import { handleLogin } from '../lib/db';
import { cookies } from 'next/headers'; // If you are using Next.js

export async function POST(request) {
  console.log('API handler invoked');
  const { username, password } = await request.json();
  console.log('Received request:', { username, password });

  try {
    const loginResult = await handleLogin(username, password);

    if (loginResult && loginResult.userId && loginResult.accountType) {
      const { userId, accountType } = loginResult;
      const cookieStore = cookies();
      cookieStore.set('accountType', accountType, {
        maxAge: 60 * 60 * 24 * 7, // Cookie lasts for 7 days (in seconds)
        path: '/', // Cookie is valid for the entire domain
        // secure: process.env.NODE_ENV === 'production', // Only send over HTTPS in production
      });

      return new Response(JSON.stringify({ message: 'Login successful', userId: userId, accountType: accountType }), {
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
    console.error('Error during login:', error);
    return new Response(JSON.stringify({ message: 'Internal server error' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}