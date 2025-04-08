// "use client";
// import Header from "../components/header";
// import 'bootstrap/dist/css/bootstrap.css'
// import '../globals.css';
// import '../styles/createlist.css'
// import React, { useState, useEffect } from 'react';
// import { useRouter } from 'next/navigation'; 
// import { verifyListCreation } from "../lib/db";

// const createList = () => {
//   const router = useRouter();
//       const [name, setName] = useState('');
//       const [status, setStatus] = useState('');
//       const [email, setEmail] = useState('');
//       // const [username, setUsername] = useState('');
//       // const [password, setPassword] = useState('');
//       // const [type, setType] = useState('');
//       const [errors, setErrors] = useState({});
//       const [isFormValid, setIsFormValid] = useState(false);
  
//       useEffect(() => {
//           console.log('Validating form'); 
//           validateForm();
//       }, [name]);
  
//       // Validate form
//       const validateForm = () => {
//           let errors = {};
//           console.log('Validating creation'); 
  
//           if (!name) {
//               errors.firstname = 'List Name is required.';
//           }
  
//           setErrors(errors);
//           setIsFormValid(Object.keys(errors).length === 0);
//           console.log('Validation complete', errors, isFormValid); 
//       };
  
//       const handleSubmit = async (e) => {
//           console.log("handleSubmit is running!"); // Add this line
//           e.preventDefault();
//           status = 'incomplete';
//           console.log("Data being sent:", { name, status }); // Add this line
//           console.log('Form submitted');
//           validateForm();
  
//           if (isFormValid) {
//               try {
//                   console.log('Sending registration request');
//                   const response = await fetch('/api/createAlist', {
//                       method: 'POST',
//                       headers: { 'Content-Type': 'application/json' },
//                       body: JSON.stringify({
//                           name,
//                           status
//                       }),
//                   })
//                       .then((response) => {
//                           if (!response.ok) {
//                               return response.json().then((errorData) => {
//                                   throw new Error(errorData.message || 'Something went wrong');
//                               });
//                           }
//                           // return response.json();
//                       })
//                       .then((data) => {
//                           console.log('API response:', data);
//                           // ... handle success ...
//                       })
//                       .catch((error) => {
//                           console.error('Fetch error:', error);
//                           // ... handle error ...
//                       });
      
//                   const result = await response.json();
//                   console.log('API response:', result);
      
//                   if (response.ok) {
//                       console.log('Registration successful!');
//                       // Navigate to a success page or login page
//                       router.push('/tasklists'); // or a success page
//                   } else {
//                       setErrors({ form: result.message });
//                       console.log('Registration failed:', result.message);
//                   }
//               } catch (error) {
//                   console.error('Error during registration:', error);
//                   setErrors({ form: 'Internal server error' });
//               }
//           } else {
//               console.log('Form has errors. Please correct them.');
//           }
//       };
  
//     return (
//       <html>
//         <head>
//         </head>
//         <body>
//           <Header />
//           <main>
//             <br />
//             <br />
//             <div id='form'>
//                 <form>
//                     <h2>Create a Task List</h2>
//                     <div class="mb-3">
//                         <label class="form-label"><b>Name</b></label>
//                         <input type="name" class="form-control" id="InputListName" value={name} onChange={(e) => setName(e.target.value)}/>
//                     </div>
//                     <button type="submit" class="btn-primary">Create</button> 
//                 </form>
//             </div>
//           </main>
//         </body>
//       </html>
//     );
//   }
//   export default createList;

"use client";
import Cookies from 'js-cookie';
import Header from "../components/header";
import 'bootstrap/dist/css/bootstrap.css'
import '../globals.css';
import '../styles/createlist.css'
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
// import { verifyListCreation } from "../lib/db"; // You're not using this import in this component

const CreateList = () => { // Changed component name to be more standard (PascalCase)
    const router = useRouter();
    const [name, setName] = useState('');
    const [errors, setErrors] = useState({});
    const [isFormValid, setIsFormValid] = useState(false);

    useEffect(() => {
        console.log('Validating form');
        validateForm();
    }, [name]);

    // Validate form
    const validateForm = () => {
        let errors = {};
        console.log('Validating creation');

        if (!name) {
            errors.name = 'List Name is required.'; // Corrected the error key
        }

        setErrors(errors);
        setIsFormValid(Object.keys(errors).length === 0);
        console.log('Validation complete', errors, isFormValid);
    };

    const handleSubmit = async (e) => {
      console.log("handleSubmit is running!");
      e.preventDefault();
  
      const userIdFromCookie = Cookies.get('userId'); // Replace 'userId' with the actual name of your cookie
  
      if (!userIdFromCookie) {
          console.error("User ID not found in cookie!");
          setErrors({ form: 'Could not identify the user. Please log in again.' });
          return; // Stop the function if we can't get the userId
      }
  
      if (isFormValid) {
          try {
              console.log('Sending list creation request with userId:', userIdFromCookie);
              const response = await fetch('/api/createAlist', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({ name: name, status: 'incomplete', userId: userIdFromCookie }),
              });
  
              const result = await response.json();
  
              if (response.ok) {
                  console.log('List creation successful!', result);
                  router.push('/tasklists');
              } else {
                  setErrors({ form: result.message || 'Failed to create list' });
                  console.error('List creation failed:', result.message);
              }
          } catch (error) {
              console.error('Error creating list:', error);
              setErrors({ form: 'Internal server error' });
          }
      } else {
          console.log('Form has errors. Please correct them.');
      }
  };

    return (
        <html>
            <head>
                {/* You might want to put your page title here */}
            </head>
            <body>
                <Header />
                <main>
                    <br />
                    <br />
                    <div id='form'>
                        <form onSubmit={handleSubmit}> {/* Added onSubmit handler to the form */}
                            <h2>Create a Task List</h2>
                            <div className="mb-3">
                                <label className="form-label"><b>Name</b></label>
                                <input
                                    type="text" // Changed type to "text" for the list name
                                    className="form-control"
                                    id="InputListName"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                                {errors.name && <p style={{ color: 'red' }}>{errors.name}</p>} {/* Corrected error display */}
                            </div>
                            <button type="submit" className="btn-primary">Create</button>
                        </form>
                    </div>
                </main>
            </body>
        </html>
    );
}

export default CreateList; // Ensure the component name matches the export