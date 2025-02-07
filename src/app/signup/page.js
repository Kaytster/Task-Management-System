import Form from 'next/form';
import '../globals.css';
import '../styles/signup.css';
export default function Signup() {
    return (
        <html>
            <body>
                <main>
                    <h1>Jello</h1>
                    <div id='form'>
                        <Form>
                            <h2>Sign Up</h2>
                            <label>First Name</label>
                            <input name='Fname' />
                            <label>Last Name</label>
                            <input name='Lname' />
                            <label>Email Address</label>
                            <input name='Email' />
                            <label>Username</label>
                            <input name='Username' />
                            <label>Password</label>
                            <input name='Password' />
                            <button type='submit'>Create Account</button>
                            <p>Already have an account?<u><b>Sign in</b></u></p>
                        </Form>
                    </div>
                </main>
            </body>
        </html>
    );
}