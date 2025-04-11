"use client"
import Cookies from 'js-cookie';
import Header from "../../../components/header";
import Link from "next/link";
import 'bootstrap/dist/css/bootstrap.css'
import '../../../styles/editgroup.css'
import '../../../globals.css';
import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation'; // Import useParams

export default function EditGroup() {

  const router = useRouter();
      const { groupId } = useParams(); // Get the listId from the URL
      const [name, setName] = useState('');
      const [userid, setID] = useState('');
      const [errors, setErrors] = useState({});
      const [isFormValid, setIsFormValid] = useState(false);
  
      useEffect(() => {
          console.log('Validating form');
          validateForm();
      }, [userid, name]);
  
      // Validate form
      const validateForm = () => {
          let errors = {};
          console.log('Validating creation');
  
          if (!userid) {
              errors.name = 'Task Name is required.';
          }
          if (!name) {
            errors.name = 'Task Name is required.';
        }
  
          setErrors(errors);
          setIsFormValid(Object.keys(errors).length === 0);
          console.log('Validation complete', errors, isFormValid);
      };
  
      const handleSubmit = async (e) => {
        console.log("handleSubmit for adding member is running!");
        e.preventDefault();
      
        if (!groupId) {
          console.error("Group ID is missing!");
          setErrors({ form: 'Could not identify the group.' });
          return;
        }
      
        if (!userid) {
          setErrors({ name: 'User ID to add is required.' });
          return;
        }
      
        console.log("About to send request to add member with userId:", userid, "and groupId:", groupId);
      
        try {
          const response = await fetch('/api/editAgroup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ action: 'addMember', userid: userid, groupId: groupId }), // Added 'action: 'addMember'' here
          });
      
          const result = await response.json();
      
          if (response.ok) {
            console.log('Member added successfully!', result);
            setID('');
            // You might want to refresh the list of members here
          } else {
            setErrors({ form: result.message || 'Failed to add member.' });
            console.error('Failed to add member:', result.message);
          }
        } catch (error) {
          console.error('Error adding member:', error);
          setErrors({ form: 'Internal server error' });
        }
      };

      const handleSubmitAddList = async (e) => {
        console.log("handleSubmit for adding list is running!");
        e.preventDefault();
      
        if (!groupId) {
          console.error("Group ID is missing!");
          setErrors({ form: 'Could not identify the group.' });
          return;
        }
      
        if (!name) {
          setErrors({ name: 'List name is required.' });
          return;
        }
      
        try {
          const response = await fetch('/api/editAgroup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ action: 'addList', name: name, status: 'incomplete', groupId: groupId }), // Added 'action: 'addList'' here
          });
      
          const result = await response.json();
      
          if (response.ok) {
            console.log('List created successfully!', result);
            setName(''); // Clear the input field
            // Optionally, refresh the list of groups on the page
          } else {
            setErrors({ form: result.message || 'Failed to create list' });
            console.error('Failed to create list:', result.message);
          }
        } catch (error) {
          console.error('Error creating list:', error);
          setErrors({ form: 'Internal server error' });
        }
      };
    return (
      <html>
        <head>
        </head>
        <body>
          <Header />
          <main>
            <br/>
            <br/>
            <div className="row">
                <div className="card">
                    <form onSubmit={handleSubmit}> {/* Add onSubmit handler */}
                        <h2>Add Members</h2>
                        <div class="mb-3">
                            <label class="form-label"><b>Name</b></label>
                            <input
                                        type="text" 
                                        className="form-control"
                                        id="InputListName"
                                        value={userid}
                                        onChange={(e) => setID(e.target.value)}
                                    /> 
                                    {errors.name && <p style={{ color: 'red' }}>{errors.name}</p>}
                                    
                        </div>
                        <button type="submit" class="btn-primary">Create</button> 
                    </form>
                </div>

                <div className="card">
                    <form onSubmit={handleSubmitAddList}>
                        <h2>Add List</h2>
                        <div class="mb-3">
                            <label class="form-label"><b>Name</b></label>
                            <label className="form-label"><b>Name</b></label>
                                <input
                                    type="text" 
                                    className="form-control"
                                    id="InputListName"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                                {errors.name && <p style={{ color: 'red' }}>{errors.name}</p>}
                        </div>
                        <button type="submit" class="btn-primary">Create</button> 
                    </form>
                </div>
                

                
            </div>
          </main>
        </body>
      </html>
    );
  }

