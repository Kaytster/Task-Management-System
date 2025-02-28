import Header from "../components/header";
import Link from "next/link";
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