import Header from "../header";
import 'bootstrap/dist/css/bootstrap.css'
import '../globals.css';
import '../styles/createlist.css'

export default function CreateList() {
    return (
      <html>
        <head>
        </head>
        <body>
          <Header />
          <main>
            <br />
            <br />
            <div id='form'>
                <form>
                    <h2>Create a Task List</h2>
                    <div class="mb-3">
                        <label class="form-label"><b>Name</b></label>
                        <input type="listname" class="form-control" id="InputListName"/>
                    </div>
                    <button type="submit" class="btn-primary">Create</button> 
                </form>
            </div>
          </main>
        </body>
      </html>
    );
  }