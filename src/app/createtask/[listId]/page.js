// "use client";
// import Cookies from 'js-cookie';
// import Header from "../../components/header";
// import 'bootstrap/dist/css/bootstrap.css'
// import '../../globals.css';
// import '../../styles/createtask.css';
// import React, { useState, useEffect } from 'react';
// import { useRouter, useParams } from 'next/navigation'; // Import useParams

// const CreateTask = () => {
//     const router = useRouter();
//     const { listId } = useParams(); // Get the listId from the URL
//     const [name, setName] = useState('');
//     const [content, setContent] = useState('');
//     const [errors, setErrors] = useState({});
//     const [isFormValid, setIsFormValid] = useState(false);

//     useEffect(() => {
//         console.log('Validating form');
//         validateForm();
//     }, [name, content]);

//     // Validate form
//     const validateForm = () => {
//         let errors = {};
//         console.log('Validating creation');

//         if (!name) {
//             errors.name = 'Task Name is required.';
//         }

//         if (!content) {
//             errors.content = 'Task Content is required.';
//         }

//         setErrors(errors);
//         setIsFormValid(Object.keys(errors).length === 0);
//         console.log('Validation complete', errors, isFormValid);
//     };

//     const handleSubmit = async (e) => {
//         console.log("handleSubmit is running!");
//         e.preventDefault();

//         const userIdFromCookie = Cookies.get('userId');

//         if (!userIdFromCookie) {
//             console.error("User ID not found in cookie!");
//             setErrors({ form: 'Could not identify the user. Please log in again.' });
//             return;
//         }

//         if (!listId) {
//             console.error("List ID is missing!");
//             setErrors({ form: 'Could not identify the list.' });
//             return;
//         }

//         if (isFormValid) {
//             try {
//                 console.log('Sending task creation request with userId:', userIdFromCookie, 'and listId:', listId);
//                 const response = await fetch('/api/createAtask', { // New API endpoint for tasks
//                     method: 'POST',
//                     headers: { 'Content-Type': 'application/json' },
//                     body: JSON.stringify({ name: name, content: content, status: 'Incomplete', userId: userIdFromCookie, listId: listId }), // Include listId
//                 });

//                 const result = await response.json();

//                 if (response.ok) {
//                     console.log('Task creation successful!', result);
//                     router.push(`/tasklists`); // Redirect back to the specific list page
//                 } else {
//                     setErrors({ form: result.message || 'Failed to create task' });
//                     console.error('Task creation failed:', result.message);
//                 }
//             } catch (error) {
//                 console.error('Error creating task:', error);
//                 setErrors({ form: 'Internal server error' });
//             }
//         } else {
//             console.log('Form has errors. Please correct them.');
//         }
//     };

//     const [listsWithTasks, setListsWithTasks] = useState([]);
    
//       useEffect(() => {
//         const userIdString = Cookies.get('userId');
    
//         if (userIdString) {
//           const userId = parseInt(userIdString, 10);
    
//           if (!isNaN(userId)) {
//             fetch(`/api/listANDtaskStatus?userId=${userId}`)
//               .then((response) => response.json())
//               .then((data) => {
//                 // Now we correctly use the state update function
//                 setListsWithTasks(data);
//               })
//               .catch((error) => {
//                 console.error('Oops, something went wrong:', error);
//               });
//           } else {
//             console.error('Hmm, that user ID doesn\'t look right.');
//           }
//         } else {
//           console.log('Where did the user ID go?');
//         }
//       }, []); // This runs once when the page loads
    
//       const handleCheckboxChange = async (event, taskId) => {
//         const isChecked = event.target.checked;
    
//         try {
//           const response = await fetch('/api/listANDtaskStatus', { // Make sure this URL is correct
//             method: 'POST',
//             headers: {
//               'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({ taskId: taskId, isCompleted: isChecked }),
//           });
    
//           if (response.ok) {
//             console.log('Task status updated!');
//             // Update local state to reflect the change
//             setListsWithTasks(prevLists =>
//               prevLists.map(list => ({
//                 ...list,
//                 tasks: list.tasks.map(task =>
//                   task.IndTask_ID === taskId ? { ...task, IndTask_Status: isChecked ? 1 : 0 } : task
//                 ),
//               }))
//             );
//           } else {
//             console.error('Failed to update task status:', response.status);
//           }
//         } catch (error) {
//           console.error('Error updating task:', error);
//         }
//       };

//     return (
//         <html>
//             <head>
//             </head>
//             <body>
//                 <Header />
//                 <main>
//                     <br />
//                     <br />
//                     <div className='row'>
//                         <div className='card'>
//                         <div className="card-body">
//                             <div className="card-title">
//                             <h1>Recent List</h1>
//                             </div>
//                             {/* <h3>{individual_list.IndList_Name}</h3> */}
//                             {individual_list ? ( // Check if individual_list is defined
//                                         <h3>{individual_list.IndList_Name}</h3>
//                                     ) : (
//                                         <h3>No recent list found.</h3> // Show a message if no list
//                                     )}
//                             <table className="list">
//                             <tbody>
//                                 {individual_list && (
//                                 <tr id="row">
//                                     <td><h4>{individual_list.IndList_Status}</h4></td>
//                                 </tr>
//                                 )}
//                             </tbody>
//                             </table>
//                         </div>
//                         <div id='form'>
//                             <form onSubmit={handleSubmit}> {/* Add onSubmit handler */}
//                                 <h2>Create a Task </h2>
//                                 <div className="mb-3">
//                                     <label className="form-label"><b>Name</b></label>
//                                     <input
//                                         type="text" // Changed type
//                                         className="form-control"
//                                         id="InputTaskName"
//                                         value={name} // Bind value to state
//                                         onChange={(e) => setName(e.target.value)} // Update state on change
//                                     />
//                                     {errors.name && <p style={{ color: 'red' }}>{errors.name}</p>}
//                                 </div>
//                                 <div className="mb-3">
//                                     <label className="form-label"><b>Content</b></label>
//                                     <input
//                                         type="text" // Changed type
//                                         className="form-control"
//                                         id="InputTaskContent"
//                                         value={content} // Bind value to state
//                                         onChange={(e) => setContent(e.target.value)} // Update state on change
//                                     />
//                                     {errors.content && <p style={{ color: 'red' }}>{errors.content}</p>}
//                                 </div>
//                                 <button type="submit" className="btn-primary">Create</button>
//                             </form>
//                         </div>
//                     </div>
//                 </main>
//             </body>
//         </html>
//     );
// };
// export default CreateTask;

"use client";
import Cookies from 'js-cookie';
import Header from "../../components/header";
import 'bootstrap/dist/css/bootstrap.css'
import '../../globals.css';
import '../../styles/createtask.css';
import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation'; // Import useParams

const CreateTask = () => {
    const router = useRouter();
    const { listId } = useParams(); // Get the listId from the URL
    const [name, setName] = useState('');
    const [content, setContent] = useState('');
    const [errors, setErrors] = useState({});
    const [isFormValid, setIsFormValid] = useState(false);
    const [tasks, setTasks] = useState([]); // State to hold the tasks for the current list
    const [checkedTasks, setCheckedTasks] = useState([]); // State to hold IDs of checked tasks

    useEffect(() => {
        validateForm();
    }, [name, content]);

    useEffect(() => {
        // Fetch tasks for the specific list when the component mounts or listId changes
        if (listId) {
            fetch(`/api/createAtask?listId=${listId}`) // Assuming you have an API endpoint to get tasks by listId
                .then(response => response.json())
                .then(data => {
                    setTasks(data);
                })
                .catch(error => {
                    console.error("Error fetching tasks:", error);
                });
        }
    }, [listId]);

    // Validate form
    const validateForm = () => {
        let errors = {};
        console.log('Validating creation');

        if (!name) {
            errors.name = 'Task Name is required.';
        }

        if (!content) {
            errors.content = 'Task Content is required.';
        }

        setErrors(errors);
        setIsFormValid(Object.keys(errors).length === 0);
        console.log('Validation complete', errors, isFormValid);
    };

    const handleSubmit = async (e) => {
        console.log("handleSubmit is running!");
        e.preventDefault();

        const userIdFromCookie = Cookies.get('userId');

        if (!userIdFromCookie) {
            console.error("User ID not found in cookie!");
            setErrors({ form: 'Could not identify the user. Please log in again.' });
            return;
        }

        if (!listId) {
            console.error("List ID is missing!");
            setErrors({ form: 'Could not identify the list.' });
            return;
        }

        if (isFormValid) {
            try {
                console.log('Sending task creation request with userId:', userIdFromCookie, 'and listId:', listId);
                const response = await fetch('/api/createAtask', { // New API endpoint for tasks
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ name: name, content: content, status: 'Incomplete', userId: userIdFromCookie, listId: listId }), // Include listId
                });

                const result = await response.json();

                if (response.ok) {
                    console.log('Task creation successful!', result);
                    // After successful creation, re-fetch tasks to update the list
                    fetch(`/api/tasks?listId=${listId}`)
                        .then(response => response.json())
                        .then(data => {
                            setTasks(data);
                            setName(''); // Clear the form
                            setContent('');
                        })
                        .catch(error => {
                            console.error("Error re-fetching tasks:", error);
                        });
                } else {
                    setErrors({ form: result.message || 'Failed to create task' });
                    console.error('Task creation failed:', result.message);
                }
            } catch (error) {
                console.error('Error creating task:', error);
                setErrors({ form: 'Internal server error' });
            }
        } else {
            console.log('Form has errors. Please correct them.');
        }
    };

    const handleCheckboxChange = (taskId) => {
        // Update the checkedTasks state when a checkbox is toggled
        if (checkedTasks.includes(taskId)) {
            setCheckedTasks(checkedTasks.filter(id => id !== taskId));
        } else {
            setCheckedTasks([...checkedTasks, taskId]);
        }
    };

    const handleDeleteSelected = async () => {
        if (checkedTasks.length > 0) {
            try {
                const response = await fetch('/api/deleteTasks', { // Assuming you have an API endpoint to delete tasks
                    method: 'DELETE',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ taskIds: checkedTasks }),
                });

                const result = await response.json();

                if (response.ok) {
                    console.log('Tasks deleted successfully!', result);
                    // After successful deletion, re-fetch tasks to update the list
                    fetch(`/api/createAtask?listId=${listId}`)
                        .then(response => response.json())
                        .then(data => {
                            setTasks(data);
                            setCheckedTasks([]); // Clear the checked tasks
                        })
                        .catch(error => {
                            console.error("Error re-fetching tasks after deletion:", error);
                        });
                } else {
                    console.error('Failed to delete tasks:', result.message);
                    // Optionally set an error message for the user
                }
            } catch (error) {
                console.error('Error deleting tasks:', error);
                // Optionally set an error message for the user
            }
        } else {
            alert('Please select tasks to delete.');
        }
    };

    return (
        <html>
            <head>
                <title>Create Task</title>
            </head>
            <body>
                <Header />
                {/* <main className="container mt-5"> */}
                    <div className="row">
                        {/* Left side: List of tasks */}
                        {/* <div className="col-md-6"> */}
                            <div className="card" style={{width: '33%'}}>
                                <h2 className="card-title">Delete Tasks</h2>
                                <div className="card-body">
                                    {tasks.length > 0 ? (
                                        <ul className="list-group">
                                            {tasks.map(task => (
                                                <li key={task.IndTask_ID} className="list-group-item d-flex align-items-center">
                                                    <input
                                                        type="checkbox"
                                                        className="form-check-input me-2"
                                                        value={task.IndTask_ID}
                                                        checked={checkedTasks.includes(task.IndTask_ID)}
                                                        onChange={() => handleCheckboxChange(task.IndTask_ID)}
                                                    />
                                                    <span>{task.IndTask_Name}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    ) : (
                                        <p>No tasks in this list yet.</p>
                                    )}
                                    
                                        <button onClick={handleDeleteSelected} style={{width:'fit-content'}}>
                                            Delete Selected Tasks
                                        </button>
                                </div>
                            </div>
                        {/* </div> */}

                        {/* Right side: Create new task form */}
                       
                             <form onSubmit={handleSubmit} style={{width: '33%'}}> {/* Add onSubmit handler */}
                                 <h2>Create a Task</h2>
                                 <div className="mb-3">
                                     <label className="form-label"><b>Name</b></label>
                                  <input
                                        type="text" 
                                        className="form-control"
                                        id="InputTaskName"
                                        value={name} 
                                        onChange={(e) => setName(e.target.value)} 
                                    />
                                    {errors.name && <p style={{ color: 'red' }}>{errors.name}</p>}
                                </div>
                                <div className="mb-3">
                                    <label className="form-label"><b>Content</b></label>
                                    <input
                                        type="text" 
                                        className="form-control"
                                        id="InputTaskContent"
                                        value={content} 
                                        onChange={(e) => setContent(e.target.value)} 
                                    />
                                    {errors.content && <p style={{ color: 'red' }}>{errors.content}</p>}
                                </div>
                                <button type="submit" className="btn-primary">Create</button>
                            </form>
                        
                    </div>
                {/* </main> */}
            </body>
        </html>
    );
};

export default CreateTask;