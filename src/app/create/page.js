import Header from "../components/header";
import Link from "next/link";
import 'bootstrap/dist/css/bootstrap.css'
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
            <div className="card">
              <div className="card-title">
                <h1>What do you want to create?</h1>
              </div>
            </div>
            <div id="createbuttons">
              <Link href={"/createlist"}>
                <button>Task List</button>
              </Link>
                <p id="brk"></p>
              <Link href={"/creategroup"}>
                <button>Group</button>
              </Link>
            </div>
          </main>
        </body>
      </html>
    );
  }