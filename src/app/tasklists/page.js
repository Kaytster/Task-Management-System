import { fetchUsers } from "../lib/db.js";

import Header from "../header";
import 'bootstrap/dist/css/bootstrap.css'
import '../globals.css';
import '../styles/tasklists.css'

export default function TaskLists() {
    return (
      <html>
        <head>
        </head>
        <body>
          <Header />
          <main>
            <br/>
            <br/>
            <div className="row">
              <div className="col">
                <h1>My Task List</h1>
                <div class="input-group mb-3">
                  <div class="input-group-prepend">
                    <div class="input-group-text">
                      <input type="checkbox" aria-label="Checkbox for following text input" />
                    </div>
                  </div>
                  <p>peep</p>
                </div>
                <div class="input-group mb-3">
                  <div class="input-group-prepend">
                    <div class="input-group-text">
                      <input type="checkbox" aria-label="Checkbox for following text input" />
                    </div>
                  </div>
                  <p>peep</p>
                </div>
                <div class="input-group mb-3">
                  <div class="input-group-prepend">
                    <div class="input-group-text">
                      <input type="checkbox" aria-label="Checkbox for following text input" />
                    </div>
                  </div>
                  <p>peep</p>
                  <button>Edit</button>
                </div>
              </div>
              
              <div className="col">
                <h1>My Task List</h1>
              </div>
              <div className="col">
                <h1>My Task List</h1>
              </div>
            </div>
            <div className="row">
              <div className="col">
                <h1>My Task List</h1>
              </div>
              <div className="col">
                <h1>My Task List</h1>
              </div>
              <div className="col">
                <h1>My Task List</h1>
                {user.map((user, index) => (
                  <tr key={index}>
                  <td>{user.User_ID}</td>
                  <td>{film.User_Fname}</td>
                  <td>{film.User_Lname}</td>
                  </tr>
                ))}
              </div>
            </div>
          </main>
        </body>
      </html>
    );
  }
  