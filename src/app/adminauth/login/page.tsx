"use client"
import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import '../auth.css';
import { sign } from 'crypto';

interface LoginFormDetails {
  email: string | null,
  password: string | null,
}

const LoginPage = () => {

    const [loginDetails, setLoginDetails] = useState<LoginFormDetails>({
        email: '',
        password: ''
    });

    const handleLogin = async () => {
        fetch(process.env.NEXT_PUBLIC_BACKEND_API + '/admin/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(loginDetails),
            credentials: 'include'
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);

            if (data.ok) {
                toast.success('Admin login successful', {
                    position: 'top-center',
                });
                window.location.href = '/pages/addroutine';
            } 
            else {
                toast.error('Admin login failed', {
                    position: 'top-center',
                });
            }
        }).catch(err => {
            console.log(err);
            toast.error('Error occurred during login');
        });
    }

  return (
    <div className='auth-form'>
        <input type='email' placeholder='Email' value={loginDetails.email || ''}
        onChange={(e) => {
            setLoginDetails({
              ...loginDetails,
              email: e.target.value
            })
        }}/>
        <input type='password' placeholder='Password' value={loginDetails.password || ''}
        onChange={(e) => {
            setLoginDetails({
              ...loginDetails,
              password: e.target.value
            })
        }}/>
        <button onClick={handleLogin}>Login</button>
    </div>
  )
}

export default LoginPage