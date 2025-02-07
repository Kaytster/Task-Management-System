import Form from 'next/form';
import '../globals.css';
import '../styles/login.css';
export default function Login() {
    return (
        <html>
            <body>
                <main>
                    <h1>Jello</h1>
                    <div id='form'>
                        <Form>
                            <h2>Login</h2>
                            <label>Username</label>
                            <input name='Username' />
                            <label>Password</label>
                            <input name='Password' />
                            <button type='submit'>Login</button>
                            <p>New to Hello?<u><b>Sign up</b></u></p>
                        </Form>
                    </div>
                </main>
            </body>
        </html>
    );
}