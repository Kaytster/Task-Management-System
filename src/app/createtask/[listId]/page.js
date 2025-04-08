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

    useEffect(() => {
        console.log('Validating form');
        validateForm();
    }, [name, content]);

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
                    router.push(`/tasklists`); // Redirect back to the specific list page
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
                        <form onSubmit={handleSubmit}> {/* Add onSubmit handler */}
                            <h2>Create a Task </h2>
                            <div className="mb-3">
                                <label className="form-label"><b>Name</b></label>
                                <input
                                    type="text" // Changed type
                                    className="form-control"
                                    id="InputTaskName"
                                    value={name} // Bind value to state
                                    onChange={(e) => setName(e.target.value)} // Update state on change
                                />
                                {errors.name && <p style={{ color: 'red' }}>{errors.name}</p>}
                            </div>
                            <div className="mb-3">
                                <label className="form-label"><b>Content</b></label>
                                <input
                                    type="text" // Changed type
                                    className="form-control"
                                    id="InputTaskContent"
                                    value={content} // Bind value to state
                                    onChange={(e) => setContent(e.target.value)} // Update state on change
                                />
                                {errors.content && <p style={{ color: 'red' }}>{errors.content}</p>}
                            </div>
                            <button type="submit" className="btn-primary">Create</button>
                        </form>
                    </div>
                </main>
            </body>
        </html>
    );
};
export default CreateTask;