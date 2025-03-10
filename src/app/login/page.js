"use client";

import 'bootstrap/dist/css/bootstrap.css';
import '../globals.css';
import '../styles/login.css';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'; 

//Validation to make sure the user has entered information

const Login = () => {
    const router = useRouter();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});
    const [isFormValid, setIsFormValid] = useState(false);

    useEffect(() => {
        console.log('Validating form'); 
        validateForm();
    }, [username, password]);

    // Validate form
    const validateForm = () => {
        let errors = {};
        console.log('Validating username and password'); 

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
        e.preventDefault();
        console.log('Form submitted'); 
        validateForm();

        if (isFormValid) {
            try {
                console.log('Sending login request'); 
                const response = await fetch('/api', { //api that validates against the database
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ username, password }),
                });

                const result = await response.json();
                console.log('API response:', result); 

                if (response.ok) {
                    console.log('Login successful!');
                    // Navigate to another page when logged in
                    router.push('/dashboard');
                } else {
                    setErrors({ form: result.message });
                    console.log('Login failed:', result.message); 
                }
            } catch (error) {
                console.error('Error during login:', error);
                setErrors({ form: 'Internal server error' });
            }
        } else {
            console.log('Form has errors. Please correct them.');
        }
    };

    return (
        <main>
            <h1>Jello</h1>
            <div id='form'>
                <form onSubmit={handleSubmit}>
                    <h2>Login</h2>
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
                    <button type="submit" className="btn-primary" > Login </button>
                </form>
            </div>
        </main>
    );
};

export default Login;
