// // import { fetchUsers } from "../lib/db.js";

// // import Header from "../header";
// // import 'bootstrap/dist/css/bootstrap.css'
// // import '../globals.css';
// // import '../styles/tasklists.css'

// // export default function TaskLists() {
// //   const Users = async () => {
// //     const user = await fetchUsers();

// //     return (
// //       <html>
// //         <head>
// //         </head>
// //         <body>
// //           <Header />
// //           <main>
// //             <br/>
// //             <br/>
// //             <div className="row">
// //               <div className="col">
// //                 <h1>My Task List</h1>
// //                 <div class="input-group mb-3">
// //                   <div class="input-group-prepend">
// //                     <div class="input-group-text">
// //                       <input type="checkbox" aria-label="Checkbox for following text input" />
// //                     </div>
// //                   </div>
// //                   <p>peep</p>
// //                 </div>
// //                 <div class="input-group mb-3">
// //                   <div class="input-group-prepend">
// //                     <div class="input-group-text">
// //                       <input type="checkbox" aria-label="Checkbox for following text input" />
// //                     </div>
// //                   </div>
// //                   <p>peep</p>
// //                 </div>
// //                 <div class="input-group mb-3">
// //                   <div class="input-group-prepend">
// //                     <div class="input-group-text">
// //                       <input type="checkbox" aria-label="Checkbox for following text input" />
// //                     </div>
// //                   </div>
// //                   <p>peep</p>
// //                   <button>Edit</button>
// //                 </div>
// //               </div>
              
// //               <div className="col">
// //                 <h1>My Task List</h1>
// //               </div>
// //               <div className="col">
// //                 <h1>My Task List</h1>
// //               </div>
// //             </div>
// //             <div className="row">
// //               <div className="col">
// //                 <h1>My Task List</h1>
// //               </div>
// //               <div className="col">
// //                 <h1>My Task List</h1>
// //               </div>
// //               <div className="col">
// //                 <h1>My Task List</h1>
// //                 {user.map((user, index) => (
// //                   <tr key={index}>
// //                   <td>{user.User_ID}</td>
// //                   <td>{user.User_Fname}</td>
// //                   <td>{user.User_Lname}</td>
// //                   </tr>
// //                 ))}
// //               </div>
// //             </div>
// //           </main>
// //         </body>
// //       </html>
// //     );
// //   };
// // }

// "use client"
// // import { showLists, recentListTasks } from "../lib/db/showData.js";
// import Header from "../components/header.js";
// import 'bootstrap/dist/css/bootstrap.css';
// import '../globals.css';
// import '../styles/tasklists.css';

// import Link from "next/link.js";

// function getUserIdFromCookie() {
//     const userIdString = Cookies.get('userId');
//     console.log('1. User ID from cookie (string):', userIdString);
  
//     if (!userIdString) {
//       return <div>Please log in!</div>;
//     }
  
//     const userId = parseInt(userIdString, 10);
//     console.log('2. User ID (number):', userId);
  
//     if (isNaN(userId)) {
//       return <div>Invalid user ID. Please log in again.</div>;
//     }
  
// }

// async function getUserLists(userId) {
//   const lists = await showLists(userId);
//   const listsWithTasks = await Promise.all(lists.map(async (list) => {
//       const tasks = await recentListTasks(list.IndList_ID);
//       return { ...list, tasks };
//   }));
//   return listsWithTasks;
// }

// export default async function TaskLists() {

//     const userIdString = getUserIdFromCookie();

//   if (!userIdString) {
//       return <div>Please log in!</div>;
//   }

//   const userId = parseInt(userIdString, 10);

//   if (isNaN(userId)) {
//       return <div>Invalid user ID. Please log in again.</div>;
//   }

//   const listsWithTasks = await getUserLists(userId);

// //   return (
// //     <div>
// //       <Header />
// //       <main>
// //         <br/>
// //         <br/>
// //         <div className="row">
// //         {listsWithTasks.map((list) => (
// //           <div className="card">
// //             <div className="card-title">
// //               <h1>My Task List</h1>
// //               <h3>{list.IndList_Name}</h3>
// //             </div>
// //             <div className="card-body">
// //             {list.tasks && list.tasks.map((task) => (
// //               <tr key={task.IndTask_ID}>
// //                   <td>
// //                       <div className="input-group mb-3">
// //                           <div className="input-group-prepend">
// //                               <div className="input-group-text">
// //                                   <input type="checkbox" aria-label="Checkbox for following text input" />
// //                               </div>
// //                           </div>
// //                           <p>{task.IndTask_Name}: {task.IndTask_Content}</p>
// //                       </div>
// //                   </td>
// //                   <td>
// //                       <button>Edit</button>
// //                   </td>
// //               </tr>
// //           ))}
// //               </div>
// //               <div className="input-group mb-3">
// //                 <div className="input-group-prepend">
// //                   <div className="input-group-text">
// //                     <input type="checkbox" aria-label="Checkbox for following text input" />
// //                   </div>
// //                 </div>
// //                 <p>peep</p>
// //               </div>
// //               <button>Edit</button>
// //             </div>
// //           </div>
// //           <div className="card">
// //             <div className="card-title">
// //               <h1>My Task List</h1>
// //             </div>
// //             <div className="card-body">
// //               <div className="input-group mb-3">
// //                 <div className="input-group-prepend">
// //                   <div className="input-group-text">
// //                     <input type="checkbox" aria-label="Checkbox for following text input" />
// //                   </div>
// //                 </div>
// //                 <p>peep</p>
// //               </div>
// //               <div className="input-group mb-3">
// //                 <div className="input-group-prepend">
// //                   <div className="input-group-text">
// //                     <input type="checkbox" aria-label="Checkbox for following text input" />
// //                   </div>
// //                 </div>
// //                 <p>peep</p>
// //               </div>
// //               <button>Edit</button>
// //             </div>
// //           </div>

// //           <div className="card">
// //             <div className="card-title">
// //               <h1>My Task List</h1>
// //             </div>
// //             <div className="card-body">
// //               <div className="input-group mb-3">
// //                 <div className="input-group-prepend">
// //                   <div className="input-group-text">
// //                     <input type="checkbox" aria-label="Checkbox for following text input" />
// //                   </div>
// //                 </div>
// //                 <p>peep</p>
// //               </div>
// //               <div className="input-group mb-3">
// //                 <div className="input-group-prepend">
// //                   <div className="input-group-text">
// //                     <input type="checkbox" aria-label="Checkbox for following text input" />
// //                   </div>
// //                 </div>
// //                 <p>peep</p>
// //               </div>
// //               <button>Edit</button>
// //             </div>
// //           </div>

// //         </div>
// //         <div className="row">
// //           <div className="col">
// //             <h1>My Task List</h1>
// //           </div>
// //           <div className="col">
// //             <h1>My Task List</h1>
// //           </div>
// //           <div className="col">
// //             <h1>My Task List</h1>
// //             <table>
// //               <thead>
// //                 <tr>
// //                   <th>User ID</th>
// //                   <th>First Name</th>
// //                   <th>Last Name</th>
// //                 </tr>
// //               </thead>
// //               <tbody>
// //                 {account.map((account, index) => (
// //                   <tr key={index}>
// //                     <td>{account.Account_ID}</td>
// //                     <td>{account.Account_Username}</td>
// //                     <td>{account.Account_Email}</td>
// //                   </tr>
// //                 ))}
// //               </tbody>
// //             </table>
// //           </div>
// //         </div>
// //       </main>
// //     </div>
// //   );
// // };
// const [setListsWithTasks] = useState([]);

//   useEffect(() => {
//     const userIdString = Cookies.get('userId');

//     if (userIdString) {
//       const userId = parseInt(userIdString, 10);

//       if (!isNaN(userId)) {
//         // This is the important part - sending the "letter" to the API!
//         fetch(`/api/tasks?userId=${userId}`)
//           .then((response) => response.json()) // Tell it we expect the answer in JSON format
//           .then((data) => {
//             setListsWithTasks(data); // When we get the answer, put it in our state
//           })
//           .catch((error) => {
//             console.error('Oops, something went wrong:', error);
//           });
//       } else {
//         console.error('Hmm, that user ID doesn\'t look right.');
//       }
//     } else {
//       console.log('Where did the user ID go?');
//     }
//   }, []); // This runs once when the page loads

//   const handleCheckboxChange = async (event, taskId) => {
//     const isChecked = event.target.checked; // True if checked, false if not

//     try {
//       const response = await fetch('/api/listANDtaskStatus', { // The URL of your API
//         method: 'POST', // We're sending data to the API to update something
//         headers: {
//           'Content-Type': 'application/json', // Tell the API we're sending JSON data
//         },
//         body: JSON.stringify({ taskId: taskId, isCompleted: isChecked }), // Send the task ID and the new checked state
//       });

//       if (response.ok) {
//         console.log('Task status updated!');
//         // Maybe you want to update your local state here to reflect the change
//         // without having to reload the whole page.
//         setListsWithTasks(prevLists =>
//           prevLists.map(list => ({
//             ...list,
//             tasks: list.tasks.map(task =>
//               task.IndTask_ID === taskId ? { ...task, IndTask_Status: isChecked ? 1 : 0 } : task
//             ),
//           }))
//         );
//       } else {
//         console.error('Failed to update task status:', response.status);
//         // Maybe show an error message to the user
//       }
//     } catch (error) {
//       console.error('Error updating task:', error);
//       // Maybe show an error message to the user
//     }
//   };


// return (
//   <div>
//       <Header />
//       <main>
//           <br />
//           <br />
//           <div className="row">
//               {listsWithTasks.map((list) => (
//                   <div className="card" key={list.IndList_ID} style={{ marginRight: '80px', marginBottom: '20px' }}>
//                       <div className="card-title">
//                           <h1>{list.IndList_Name}</h1>
//                       </div>
                      
//                       <div className="card-body">
//                           <table>
//                               <tbody>
//                                   {list.tasks && list.tasks.map((task) => (
//                                       <tr key={task.IndTask_ID}>
//                                           <td>
//                                               <div className="input-group mb-3">
//                                                   <div className="input-group-prepend">
//                                                       <div className="input-group-text">
//                                                       <input
//                                                         type="checkbox"
//                                                         aria-label="Checkbox for following text input"
//                                                         checked={task.IndTask_Status === 1 ? true : false} // Assuming 1 means complete in your DB
//                                                         onChange={(event) => handleCheckboxChange(event, task.IndTask_ID)}
//                                                         />
//                                                       </div>
//                                                   </div>
//                                                   <p>{task.IndTask_Name}: {task.IndTask_Content}</p>
//                                               </div>
//                                           </td>
//                                           <td>
//                                           <Link href={`/createtask/${list.IndList_ID}`}>
//                                               <button>Edit</button>
//                                           </Link>
//                                           </td>
//                                       </tr>
//                                   ))}
//                               </tbody>
//                           </table>
//                       </div>
//                   </div>
//               ))}
//           </div>
//       </main>
//   </div>
// );
// };

"use client";
import { useState, useEffect } from 'react';
import Header from "../components/header.js";
import 'bootstrap/dist/css/bootstrap.css';
import '../globals.css';
import '../styles/tasklists.css';
import Link from "next/link.js";
import Cookies from 'js-cookie';

export default function TaskLists() {
  // Let's correctly set up our state to hold the lists and the function to update them
  const [listsWithTasks, setListsWithTasks] = useState([]);

  useEffect(() => {
    const userIdString = Cookies.get('userId');

    if (userIdString) {
      const userId = parseInt(userIdString, 10);

      if (!isNaN(userId)) {
        fetch(`/api/listANDtaskStatus?userId=${userId}`)
          .then((response) => response.json())
          .then((data) => {
            // Now we correctly use the state update function
            setListsWithTasks(data);
          })
          .catch((error) => {
            console.error('Oops, something went wrong:', error);
          });
      } else {
        console.error('Hmm, that user ID doesn\'t look right.');
      }
    } else {
      console.log('Where did the user ID go?');
    }
  }, []); // This runs once when the page loads

  const handleCheckboxChange = async (event, taskId) => {
    const isChecked = event.target.checked;

    try {
      const response = await fetch('/api/listANDtaskStatus', { // Make sure this URL is correct
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ taskId: taskId, isCompleted: isChecked }),
      });

      if (response.ok) {
        console.log('Task status updated!');
        // Update local state to reflect the change
        setListsWithTasks(prevLists =>
          prevLists.map(list => ({
            ...list,
            tasks: list.tasks.map(task =>
              task.IndTask_ID === taskId ? { ...task, IndTask_Status: isChecked ? 1 : 0 } : task
            ),
          }))
        );
      } else {
        console.error('Failed to update task status:', response.status);
      }
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

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
                <h3>{list.IndList_Status}</h3>
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
                                <input
                                  type="checkbox"
                                  aria-label="Checkbox for following text input"
                                  checked={task.IndTask_Status === 'Complete'}
                                  onChange={(event) => handleCheckboxChange(event, task.IndTask_ID)}
                                />
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
}
