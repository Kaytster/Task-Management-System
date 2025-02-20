"use client"


import 'bootstrap/dist/css/bootstrap.css'
import '../globals.css';
import '../styles/login.css';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});
    const [isFormValid, setIsFormValid] = useState(false);

    useEffect(() => {
        validateForm();
    }, [username, password]);
    // Validate form
    const validateForm = () => {
        let errors = {};

        if (!username) {
            errors.username = 'Name is required.';
        }

        if (!password) {
            errors.password = 'Password is required.';
        } else if (password.length < 6) {
            errors.password = 'Password must be at least 6 characters.';
        }

        setErrors(errors);
        setIsFormValid(Object.keys(errors).length === 0);
    };

    const checkData = () => {
        if (password != account.Account_Password) {
            errors.password = 'password invalid'
        }
        if (username != account.Account_Username) {
            errors.username = 'username invalid'
        }
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        validateForm();
        if (isFormValid) {
            checkData();
            if (isFormValid) {
                console.log('Form submitted successfully!');
            } else {
                console.log('Password is invalid.');
            }
        } else {
            console.log('Form has errors. Please correct them.');
        }
    };


    return (
        // <html>
        //     <body>
        //         <main>
        //             <h1>Jello</h1>
        //             <div id='form'>
        //             <form>
        //                 <h2>Login</h2>
        //                 <div class="mb-3">
        //                     <label class="form-label"><b>Username</b></label>
        //                     <input type="username" class="form-control" id="InputUsername"/>
        //                 </div>
        //                 <div class="mb-3">
        //                     <label class="form-label"><b>Password</b></label>
        //                     <input type="password" class="form-control" id="InputPassword"/>
        //                 </div>
        //                 <Link href="/tasklists">
        //                     <button type="submit" class="btn-primary">Login</button> 
        //                 </Link>
        //             </form>
        //             </div>
        //         </main>
        //     </body>
        // </html>
        <html>
            <body>
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
                            <button 
                                type="submit" 
                                className="btn-primary" 
                                disabled={!isFormValid}
                            >
                                Login
                            </button>
                        </form>
                    </div>
                </main>
            </body>
        </html>
    );
}
export default Login;