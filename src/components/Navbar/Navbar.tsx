"use client"
import React, { useState, useEffect } from 'react'
import logo from './gymbuddy-logo.png';
import './Navbar.css'
import Image from 'next/image'
import Link from 'next/link'

const Navbar = () => {
    const [adminLoggedIn, setAdminLoggedIn] = useState<boolean>(false);

    const checkAdminLogin = async () => {
        fetch(process.env.NEXT_PUBLIC_BACKEND_API + '/admin/checklogin', {
          method: 'POST',
          credentials: 'include'
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
    
            if (data.ok) {
                setAdminLoggedIn(true);
            } 
            else {
                setAdminLoggedIn(false);
            }
        }).catch(err => console.log(err));
      }

      useEffect(() => {
        checkAdminLogin();
      }, []);

  return (
    <nav>
        <Image src={logo} alt="App logo"/>
        <div>
        {
            adminLoggedIn ? (
                <Link href='/pages/addroutine'>Add Routine</Link>
            ) : (
                <>
                    <Link href='/adminauth/login'>Login</Link>
                    <Link href='/adminauth/register'>Sign Up</Link>
                </>
            )
        }
        </div>
    </nav>
  )
}

export default Navbar