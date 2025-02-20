import 'bootstrap/dist/css/bootstrap.css'
import '../globals.css';
import '../styles/signup.css';
import Link from 'next/link';


export default function Signup() {
    return (
        <html>
            <body>
                <main>
                    <h1>Jello</h1>
                    <div id='form'>
                    <form>
                        <h2>Signup</h2>
                        <div class="mb-3">
                            <label class="form-label"><b>First Name</b></label>
                            <input type="fname" class="form-control" id="InputFname"/>
                        </div>
                        <div class="mb-3">
                            <label class="form-label"><b>Last Name</b></label>
                            <input type="lname" class="form-control" id="InputLname"/>
                        </div>
                        <div class="mb-3">
                            <label class="form-label"><b>Email address</b></label>
                            <input type="email" class="form-control" id="InputEmail"/>
                        </div>
                        <div class="mb-3">
                            <label class="form-label"><b>Username</b></label>
                            <input type="username" class="form-control" id="InputUsername"/>
                        </div>
                        <div class="mb-3">
                            <label class="form-label"><b>Password</b></label>
                            <input type="password" class="form-control" id="InputPassword"/>
                        </div>
                        <Link href="/dashboard">
                            <button type="submit" class="btn-primary"><b>Create Account</b></button>
                        </Link>
                    </form>
                    </div>
                </main>
            </body>
        </html>
    );
}
{/* <div id='form'>
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
</div> */}