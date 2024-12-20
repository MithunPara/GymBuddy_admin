"use client"
import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import '../auth.css';
import { sign } from 'crypto';

interface SignUpFormDetails {
    name: string | null,
    email: string | null,
    password: string | null,
}

const SignUpPage = () => {

    const [signUpDetails, setSignUpDetails] = useState<SignUpFormDetails>({
        name: '',
        email: '',
        password: ''
    });

    const handleSignUp = async () => {
        fetch(process.env.NEXT_PUBLIC_BACKEND_API + '/admin/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(signUpDetails),
            credentials: 'include'
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);

            if (data.ok) {
                toast.success('Admin registration is successful', {
                    position: 'top-center',
                });
            } 
            else {
                toast.error('Admin registration has failed', {
                    position: 'top-center',
                });
            }
        }).catch(err => {
            console.log(err);
            toast.error('Error occurred during registration');
        });
    }

  return (
    <div className='auth-form'>
        <input type='text' placeholder='Name' value={signUpDetails.name || ''} 
        onChange={(e) => {
            setSignUpDetails({
                ...signUpDetails,
                name: e.target.value
            });
        }}/>
        <input type='email' placeholder='Email' value={signUpDetails.email || ''}
        onChange={(e) => {
            setSignUpDetails({
                ...signUpDetails,
                email: e.target.value
            });
        }}/>
        <input type='password' placeholder='Password' value={signUpDetails.password || ''}
        onChange={(e) => {
            setSignUpDetails({
                ...signUpDetails,
                password: e.target.value
            })
        }}/>
        <button onClick={handleSignUp}>Sign Up</button>
    </div>
  )
}

export default SignUpPage