import Link from 'next/link';
import '../globals.css';
import '../styles/signup.css';
<Link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous"></Link>

export default function Signup() {
    return (
        <html>
            <body>
                <main>
                    <h1>Jello</h1>
                    <div class="dropdown-menu">
  <form class="px-4 py-3">
    <div class="mb-3">
      <label for="exampleDropdownFormEmail1" class="form-label">Email address</label>
      <input type="email" class="form-control" id="exampleDropdownFormEmail1" placeholder="email@example.com"/>
    </div>
    <div class="mb-3">
      <label for="exampleDropdownFormPassword1" class="form-label">Password</label>
      <input type="password" class="form-control" id="exampleDropdownFormPassword1" placeholder="Password"/>
    </div>
    <div class="mb-3">
      <div class="form-check">
        <input type="checkbox" class="form-check-input" id="dropdownCheck"/>
        <label class="form-check-label" for="dropdownCheck">
          Remember me
        </label>
      </div>
    </div>
    <button type="submit" class="btn btn-primary">Sign in</button>
  </form>
  <div class="dropdown-divider"></div>
  <a class="dropdown-item" href="#">New around here? Sign up</a>
  <a class="dropdown-item" href="#">Forgot password?</a>
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