// "use server"

// import { handleLogin } from '../lib/db/showData';
// import { cookies } from 'next/headers';
// import { redirect } from 'next/navigation';

// async function loginAction(formData) {
//     'use server'; // This is a server action.
//     const username = formData.get('username');
//     const password = formData.get('password');

//     const { handleLogin } = await import('../lib/db/showData');
//     const { cookies } = await import('next/headers');
//     const { redirect } = await import('next/navigation');

//     try {
//         const userId = await handleLogin(username, password);
//         if (userId) {
//             cookies().set('userId', userId);
//             redirect('/dashboard');
//         } else {
//             return 'Invalid username or password';
//         }
//     } catch (error) {
//         console.error('Login error:', error);
//         return 'Internal server error';
//     }
// }

'use server';

import { handleLogin } from '../lib/db';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function loginAction(prevState, formData) {
    const username = formData.get('username');
    const password = formData.get('password');

    try {
        const userId = await handleLogin(username, password);
        if (userId) {
            // We'll handle cookies on the client side!
            redirect(`/dashboard?userId=${userId}`); // Send userId as a query parameter
        } else {
            return { message: 'Invalid username or password' };
        }
    } catch (error) {
        console.error('Login error:', error);
        return { message: 'Internal server error' }; // Return error message as object
    }
}