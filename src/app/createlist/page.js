"use client";
import Header from "../components/header";
import 'bootstrap/dist/css/bootstrap.css'
import '../globals.css';
import '../styles/createlist.css'
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'; 

const createList = () => {
  const router = useRouter();
  const [listID, setID] = useState('');
  const [listName, setName] = useState('');
  const [listStatus, setStatus] = useState('');
  const [errors, setErrors] = useState({});

  useEffect(() => {
    console.log('Validating form');
    validateForm();
  }, [listName]);
  const validateForm = () => {
    let errors = {};
    console.log('Validating name'); 

    if (!listName) {
        errors.listName = 'name is required.';
    }

    setErrors(errors);
    //setIsFormValid(Object.keys(errors).length === 0);
    console.log('Validation complete', errors, /*isFormValid*/); 
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
                <form>
                    <h2>Create a Task List</h2>
                    <div class="mb-3">
                        <label class="form-label"><b>Name</b></label>
                        <input type="listname" class="form-control" id="InputListName" value={listName} onChange={(e) => setName(e.target.value)}/>
                    </div>
                    <button type="submit" class="btn-primary">Create</button> 
                </form>
            </div>
          </main>
        </body>
      </html>
    );
  }
  export default createList;