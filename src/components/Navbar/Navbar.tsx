"use client"
import React, { useState, useEffect } from 'react'
import logo from './gymbuddy-logo.png';
import './Navbar.css'
import Image from 'next/image'
import Link from 'next/link'

const Navbar = () => {
    const [adminLoggedIn, setAdminLoggedIn] = useState<boolean>(false);


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