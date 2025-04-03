import { handleLogin } from '../lib/db/showData';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers'; // Import cookies

export async function loginFunction(username, password) {
    const userId = await handleLogin(username, password);

    if (userId) {
        cookies().set('userId', userId); // Set the userId cookie
        redirect('/dashboard'); // Redirect without userId in the URL
    } else {
        console.log("Login failed.");
        // Optionally, display an error message to the user
    }
}