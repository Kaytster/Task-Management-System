import Header from "../components/header";
import 'bootstrap/dist/css/bootstrap.css'
import '../globals.css';
import '../styles/creategrouptask.css'

export default function CreateGroupTask() {
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
                    <h2>Create a Task </h2>
                    <div class="mb-3">
                        <label class="form-label"><b>Name</b></label>
                        <input type="taskname" class="form-control" id="InputTaskName"/>
                    </div>
                    <div class="mb-3">
                        <label class="form-label"><b>Content</b></label>
                        <input type="taskcontent" class="form-control" id="InputTaskContent"/>
                    </div>
                    <button type="submit" class="btn-primary">Create</button> 
                </form>
            </div>
          </main>
        </body>
      </html>
    );
  }