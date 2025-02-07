import Header from "../header";
import '../styles/create.css'
import '../globals.css';

export default function Create() {
    return (
      <html>
        <head>
        </head>
        <body>
          <Header />
          <main>
            <br/>
            <br/>
            <h1>What do you want to create?</h1>
            <div id="createbuttons">
                <p>Task List</p>
                <p id="brk"></p>
                <p>Group</p>
            </div>
          </main>
        </body>
      </html>
    );
  }