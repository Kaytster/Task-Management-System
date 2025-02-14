import Header from "../header";
import 'bootstrap/dist/css/bootstrap.css'
import '../globals.css';
import '../styles/members.css'

export default function CreateGroup() {
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
                    <h2>Add Members</h2>
                    <div class="mb-3">
                        <label class="form-label"><b>First Name</b></label>
                        <input type="firstname" class="form-control" id="InputFirstName"/>
                    </div>
                    <div class="mb-3">
                        <label class="form-label"><b>Last Name</b></label>
                        <input type="lastname" class="form-control" id="InputLastName"/>
                    </div>
                    <div class="mb-3">
                        <label class="form-label"><b>User ID</b></label>
                        <input type="userid" class="form-control" id="InputUserID"/>
                    </div>
                    <button type="submit" id="small-btn">Add</button> 
                    <button type="submit" className="btn-primary">Done</button> 
                </form>
            </div>
          </main>
        </body>
      </html>
    );
  }