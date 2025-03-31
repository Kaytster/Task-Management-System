"use client"
import 'bootstrap/dist/css/bootstrap.css'
import '../globals.css';
import '../styles/signup.css';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'; 

//Validation to make sure the user has entered information

const Signup = () => {
    const router = useRouter();
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [type, setType] = useState('');
    const [errors, setErrors] = useState({});
    const [isFormValid, setIsFormValid] = useState(false);

    useEffect(() => {
        console.log('Validating form'); 
        validateForm();
    }, [username, password]);

    // Validate form
    const validateForm = () => {
        let errors = {};
        console.log('Validating creation'); 

        if (!firstname) {
            errors.firstname = 'First Name is required.';
        }

        if (!lastname) {
            errors.lastname = 'Last Name is required.';
        }

        if (!email) {
            errors.email = 'Email Address is required.';
        }

        if (!username) {
            errors.username = 'Username is required.';
        }

        if (!password) {
            errors.password = 'Password is required.';
        } else if (password.length < 6) {
            errors.password = 'Password must be at least 6 characters.';
        }

        setErrors(errors);
        setIsFormValid(Object.keys(errors).length === 0);
        console.log('Validation complete', errors, isFormValid); 
    };

    const handleSubmit = async (e) => {
        console.log("handleSubmit is running!"); // Add this line
        e.preventDefault();
        console.log("Data being sent:", { firstname, lastname, email, username, password, type }); // Add this line
        console.log('Form submitted');
        validateForm();

        // Get checkbox values
    const standardChecked = document.getElementById("standardcheck").checked;
    const adminChecked = document.getElementById("admincheck").checked;

    // Set account type AND update the type state
    if (adminChecked) {
        setType("Group Admin"); // Update type state here!
    } else {
        setType("Standard"); // Update type state here!
    }
    
        if (isFormValid) {
            try {
                console.log('Sending registration request');
                const response = await fetch('/api/register', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        firstname,
                        lastname,
                        email,
                        username,
                        password,
                        type,
                    }),
                })
                    .then((response) => {
                        if (!response.ok) {
                            return response.json().then((errorData) => {
                                throw new Error(errorData.message || 'Something went wrong');
                            });
                        }
                        // return response.json();
                    })
                    .then((data) => {
                        console.log('API response:', data);
                        // ... handle success ...
                    })
                    .catch((error) => {
                        console.error('Fetch error:', error);
                        // ... handle error ...
                    });
    
                const result = await response.json();
                console.log('API response:', result);
    
                if (response.ok) {
                    console.log('Registration successful!');
                    // Navigate to a success page or login page
                    router.push('/login'); // or a success page
                } else {
                    setErrors({ form: result.message });
                    console.log('Registration failed:', result.message);
                }
            } catch (error) {
                console.error('Error during registration:', error);
                setErrors({ form: 'Internal server error' });
            }
        } else {
            console.log('Form has errors. Please correct them.');
        }
    };

    return (
        <html>
            <body>
                <main>
                    <h1>Jello</h1>
                    <div id='form'>
                    <form onSubmit={handleSubmit}>
                        <h2>Signup</h2>
                        <div className="mb-3">
                            <label className="form-label"><b>First Name</b></label>
                            <input 
                                type="text" 
                                className="form-control" 
                                id="InputFname"
                                value={firstname}
                                onChange={(e) => setFirstname(e.target.value)}
                            />
                            {errors.firstname && <p style={{color: 'red'}}>{errors.firstname}</p>}
                        </div>
                        <div className="mb-3">
                            <label className="form-label"><b>Last Name</b></label>
                            <input 
                                type="text" 
                                className="form-control" 
                                id="InputLname"
                                value={lastname}
                                onChange={(e) => setLastname(e.target.value)}
                            />
                            {errors.lastname && <p style={{color: 'red'}}>{errors.lastname}</p>}
                        </div>
                        <div className="mb-3">
                            <label className="form-label"><b>Email Address</b></label>
                            <input 
                                type="email" 
                                className="form-control" 
                                id="InputEmail"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            {errors.email && <p style={{color: 'red'}}>{errors.email}</p>}
                        </div>
                        <div className="mb-3">
                            <label className="form-label"><b>Username</b></label>
                            <input 
                                type="text" 
                                className="form-control" 
                                id="InputUsername"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                            {errors.username && <p style={{color: 'red'}}>{errors.username}</p>}
                        </div>
                        <div className="mb-3">
                            <label className="form-label"><b>Password</b></label>
                            <input 
                                type="password" 
                                className="form-control" 
                                id="InputPassword"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            {errors.password && <p style={{color: 'red'}}>{errors.password}</p>}
                        </div>
                        {errors.form && <p style={{color: 'red'}}>{errors.form}</p>}

                        <div className="mb-3" >
                            <label className="form-label"><b>Account Type</b></label>
                            <br />
                            <div className='check' style={{display: 'inline-flex'}}>
                                <div id='standard'>
                                    <p>Standard</p>
                                    <input id='standardcheck' type="checkbox" aria-label="Checkbox for following text input" />
                                </div>
                                <div className='brk'></div>
                                <div id='admin'>
                                    <p>Group Admin</p>
                                    <input id='admincheck' type="checkbox" aria-label="Checkbox for following text input" />
                                </div>
                            </div>
                            {errors.password && <p style={{color: 'red'}}>{errors.password}</p>}
                        </div>

                        <button 
                            type="submit" 
                            className="btn-primary"
                        >
                            Create Account
                        </button>
                    </form>
                    </div>
                </main>
            </body>
        </html>
    );
};
export default Signup;