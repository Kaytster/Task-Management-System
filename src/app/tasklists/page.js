// import { fetchUsers } from "../lib/db.js";

// import Header from "../header";
// import 'bootstrap/dist/css/bootstrap.css'
// import '../globals.css';
// import '../styles/tasklists.css'

// export default function TaskLists() {
//   const Users = async () => {
//     const user = await fetchUsers();

//     return (
//       <html>
//         <head>
//         </head>
//         <body>
//           <Header />
//           <main>
//             <br/>
//             <br/>
//             <div className="row">
//               <div className="col">
//                 <h1>My Task List</h1>
//                 <div class="input-group mb-3">
//                   <div class="input-group-prepend">
//                     <div class="input-group-text">
//                       <input type="checkbox" aria-label="Checkbox for following text input" />
//                     </div>
//                   </div>
//                   <p>peep</p>
//                 </div>
//                 <div class="input-group mb-3">
//                   <div class="input-group-prepend">
//                     <div class="input-group-text">
//                       <input type="checkbox" aria-label="Checkbox for following text input" />
//                     </div>
//                   </div>
//                   <p>peep</p>
//                 </div>
//                 <div class="input-group mb-3">
//                   <div class="input-group-prepend">
//                     <div class="input-group-text">
//                       <input type="checkbox" aria-label="Checkbox for following text input" />
//                     </div>
//                   </div>
//                   <p>peep</p>
//                   <button>Edit</button>
//                 </div>
//               </div>
              
//               <div className="col">
//                 <h1>My Task List</h1>
//               </div>
//               <div className="col">
//                 <h1>My Task List</h1>
//               </div>
//             </div>
//             <div className="row">
//               <div className="col">
//                 <h1>My Task List</h1>
//               </div>
//               <div className="col">
//                 <h1>My Task List</h1>
//               </div>
//               <div className="col">
//                 <h1>My Task List</h1>
//                 {user.map((user, index) => (
//                   <tr key={index}>
//                   <td>{user.User_ID}</td>
//                   <td>{user.User_Fname}</td>
//                   <td>{user.User_Lname}</td>
//                   </tr>
//                 ))}
//               </div>
//             </div>
//           </main>
//         </body>
//       </html>
//     );
//   };
// }
import { showLists, recentListTasks } from "../lib/db/showData.js";
import Header from "../components/header.js";
import 'bootstrap/dist/css/bootstrap.css';
import '../globals.css';
import '../styles/tasklists.css';
import { cookies } from "next/headers";
import Link from "next/link.js";

async function getUserLists(userId) {
  const lists = await showLists(userId);
  const listsWithTasks = await Promise.all(lists.map(async (list) => {
      const tasks = await recentListTasks(list.IndList_ID);
      return { ...list, tasks };
  }));
  return listsWithTasks;
}

export default async function TaskLists() {

  const cookieStore = cookies();
  const userIdString = cookieStore.get('userId')?.value;

  if (!userIdString) {
      return <div>Please log in!</div>;
  }

  const userId = parseInt(userIdString, 10);

  if (isNaN(userId)) {
      return <div>Invalid user ID. Please log in again.</div>;
  }

  const listsWithTasks = await getUserLists(userId);

//   return (
//     <div>
//       <Header />
//       <main>
//         <br/>
//         <br/>
//         <div className="row">
//         {listsWithTasks.map((list) => (
//           <div className="card">
//             <div className="card-title">
//               <h1>My Task List</h1>
//               <h3>{list.IndList_Name}</h3>
//             </div>
//             <div className="card-body">
//             {list.tasks && list.tasks.map((task) => (
//               <tr key={task.IndTask_ID}>
//                   <td>
//                       <div className="input-group mb-3">
//                           <div className="input-group-prepend">
//                               <div className="input-group-text">
//                                   <input type="checkbox" aria-label="Checkbox for following text input" />
//                               </div>
//                           </div>
//                           <p>{task.IndTask_Name}: {task.IndTask_Content}</p>
//                       </div>
//                   </td>
//                   <td>
//                       <button>Edit</button>
//                   </td>
//               </tr>
//           ))}
//               </div>
//               <div className="input-group mb-3">
//                 <div className="input-group-prepend">
//                   <div className="input-group-text">
//                     <input type="checkbox" aria-label="Checkbox for following text input" />
//                   </div>
//                 </div>
//                 <p>peep</p>
//               </div>
//               <button>Edit</button>
//             </div>
//           </div>
//           <div className="card">
//             <div className="card-title">
//               <h1>My Task List</h1>
//             </div>
//             <div className="card-body">
//               <div className="input-group mb-3">
//                 <div className="input-group-prepend">
//                   <div className="input-group-text">
//                     <input type="checkbox" aria-label="Checkbox for following text input" />
//                   </div>
//                 </div>
//                 <p>peep</p>
//               </div>
//               <div className="input-group mb-3">
//                 <div className="input-group-prepend">
//                   <div className="input-group-text">
//                     <input type="checkbox" aria-label="Checkbox for following text input" />
//                   </div>
//                 </div>
//                 <p>peep</p>
//               </div>
//               <button>Edit</button>
//             </div>
//           </div>

//           <div className="card">
//             <div className="card-title">
//               <h1>My Task List</h1>
//             </div>
//             <div className="card-body">
//               <div className="input-group mb-3">
//                 <div className="input-group-prepend">
//                   <div className="input-group-text">
//                     <input type="checkbox" aria-label="Checkbox for following text input" />
//                   </div>
//                 </div>
//                 <p>peep</p>
//               </div>
//               <div className="input-group mb-3">
//                 <div className="input-group-prepend">
//                   <div className="input-group-text">
//                     <input type="checkbox" aria-label="Checkbox for following text input" />
//                   </div>
//                 </div>
//                 <p>peep</p>
//               </div>
//               <button>Edit</button>
//             </div>
//           </div>

//         </div>
//         <div className="row">
//           <div className="col">
//             <h1>My Task List</h1>
//           </div>
//           <div className="col">
//             <h1>My Task List</h1>
//           </div>
//           <div className="col">
//             <h1>My Task List</h1>
//             <table>
//               <thead>
//                 <tr>
//                   <th>User ID</th>
//                   <th>First Name</th>
//                   <th>Last Name</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {account.map((account, index) => (
//                   <tr key={index}>
//                     <td>{account.Account_ID}</td>
//                     <td>{account.Account_Username}</td>
//                     <td>{account.Account_Email}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// };
return (
  <div>
      <Header />
      <main>
          <br />
          <br />
          <div className="row">
              {listsWithTasks.map((list) => (
                  <div className="card" key={list.IndList_ID} style={{ marginRight: '80px', marginBottom: '20px' }}>
                      <div className="card-title">
                          <h1>{list.IndList_Name}</h1>
                      </div>
                      
                      <div className="card-body">
                          <table>
                              <tbody>
                                  {list.tasks && list.tasks.map((task) => (
                                      <tr key={task.IndTask_ID}>
                                          <td>
                                              <div className="input-group mb-3">
                                                  <div className="input-group-prepend">
                                                      <div className="input-group-text">
                                                          <input type="checkbox" aria-label="Checkbox for following text input" />
                                                      </div>
                                                  </div>
                                                  <p>{task.IndTask_Name}: {task.IndTask_Content}</p>
                                              </div>
                                          </td>
                                          <td>
                                          <Link href={`/createtask/${list.IndList_ID}`}>
                                              <button>Edit</button>
                                          </Link>
                                          </td>
                                      </tr>
                                  ))}
                              </tbody>
                          </table>
                      </div>
                  </div>
              ))}
          </div>
      </main>
  </div>
);
};
