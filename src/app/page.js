import Header from "./header";
import 'bootstrap/dist/css/bootstrap.css'
import './globals.css';
import './styles/landing.css';

export default function Home() {
  return (
    <html>
      <head>
      </head>
      <body>
        <Header />
        <main>
          <br/>
          <br/>
          <section className="intro">
            <h1>Welcome to Jello</h1>
            <p>With our Task Manager, you can easily keep your tasks organized with a list 
            and share your tasks with others to work together.</p>
            <p>With a Group Admin account, you can create groups for maximum collaboration.</p>
            <p>To get started:</p>
            <div id="introbuttons">
              <p>Sign Up</p>
              <p id="brk"></p>
              <p>Login</p>
            </div>
          </section>
          <section className="examples">

          </section>
        </main>
      </body>
    </html>
  );
}
