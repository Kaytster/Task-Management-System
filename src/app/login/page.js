import 'bootstrap/dist/css/bootstrap.css'
import '../globals.css';
import '../styles/login.css';
export default function Login() {
    return (
        <html>
            <body>
                <main>
                    <h1>Jello</h1>
                    <div id='form'>
                    <form>
                        <h2>Login</h2>
                        <div class="mb-3">
                            <label class="form-label">Username</label>
                            <input type="username" class="form-control" id="InputUsername"/>
                        </div>
                        <div class="mb-3">
                            <label class="form-label">Password</label>
                            <input type="password" class="form-control" id="InputPassword"/>
                        </div>
                        <button type="submit" class="btn btn-primary">Login</button>
                    </form>
                    </div>
                </main>
            </body>
        </html>
    );
}