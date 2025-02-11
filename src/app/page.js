import Header from "./header";
import './globals.css';
import './styles/landing.css';
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous" />

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
        </main>
      </body>
    </html>
  );
}
