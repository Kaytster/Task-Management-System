'use client'
import Header from "./components/header";
import 'bootstrap/dist/css/bootstrap.css'
import './globals.css';
import './styles/landing.css';
import Link from "next/link";

  

export default function Home() {

  return (
    <html>
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
            <Link href="/signup">
              <button>Sign Up</button>
            </Link>
              <p id="brk"></p>
            <Link href="/login">
              <button>Login</button>
            </Link>
            </div>
          </section>
          <section className="examples">

          </section>
        </main>
      </body>
    </html>
  );
}
