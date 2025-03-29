"use client";

import React from 'react';
import logo from "@/public/flash-card.png";
import { SignedOut, SignedIn, UserButton, useUser } from '@clerk/nextjs';
import "@/app/css/navbar.css";

import Link from 'next/link';
import Image from "next/image";

const Navbar = (props) => {
  return (
    <>
      <nav className={"navbar"}>
        <div className="navbar-title-ctr">
          <Image src={logo} width={40} height={40} alt="SmartDeck logo" />
          <Link className="navbar-title" href="/" passHref>SmartDeck</Link>
        </div>
        <ul className={props.active}>
          <SignedOut>
            <Link className="navbar-btn" href="/sign-in" passHref>Log In</Link>
            <Link className="navbar-btn" href="/sign-up" passHref>Sign Up</Link>
          </SignedOut>
          <SignedIn>
            <Link className="navbar-btn" href="/collections" passHref>Collections</Link>
            <Link className="navbar-btn" href="/generate" passHref>Generate</Link>
            <UserButton />
          </SignedIn>
        </ul>
        <div onClick={props.toggle} className={props.icon}>
          <div className="line1"></div>
          <div className="line2"></div>
          <div className="line3"></div>
        </div>
      </nav>
    </>
  )
}

export default Navbar;