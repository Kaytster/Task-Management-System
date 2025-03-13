
import { recentList, recentListTasks } from "../lib/db/showData";
import Header from "../components/header";
import 'bootstrap/dist/css/bootstrap.css'
import '../globals.css';
import '../styles/dashboard.css';


const Home = async () => {
  const individual_list = await recentList();
  const individual_task = await recentListTasks();
    return (
      <html>
        <body>
          <Header />
          <main>
          <br/>
          <br/>
          <div className="row">
            <div className="col">
              <h1>Recent List</h1>
              <h3>{individual_list.IndList_Name}</h3>
              <table className="list">
                <tbody>
                  {individual_list && (
                    <tr id="row">
                      <td><h4>{individual_list.IndList_Status}</h4></td>
                    </tr>
                  )}
                </tbody>
              </table>

              <table>
                {individual_task && individual_task.length > 0 ? (
                  <tbody>
                      {individual_task.map((item, index) => (
                        item.IndTask_ID ? (
                          <div key={item.IndTask_ID}>
                          <tr id="row">
                            <td id="name">{item.IndTask_Name}</td>
                          </tr>
                          <tr id="row">
                            <td>{item.IndTask_Content}</td>
                          </tr>
                          <tr id="row">
                            <td>{item.IndTask_Status}</td>
                          </tr>
                          </div>
                        ) : null
                      ))}
                  </tbody>
                ) : (
                  <p>no data found</p>
                )
              }
              </table>

            </div>
          </div>
        
          </main>
        </body>
      </html>
    );
  };
  export default Home;
  