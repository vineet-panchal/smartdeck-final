'use client'

import { React, useState, useEffect } from 'react';
import Image from "next/image";
import Link from "next/link";
import Head from 'next/head';
import { useRouter } from 'next/navigation';
import { Container, Typography, Box, Button, Grid, AppBar, Toolbar, Card, CardContent, Switch } from '@mui/material';
import { SignedOut, SignedIn, UserButton, useUser } from '@clerk/nextjs';
import { collection, doc, setDoc, getDoc } from "firebase/firestore";
// import db from 'firebase'; 
import Navbar from './components/Navbar';
import Features from './components/Features';
import Footer from './components/Footer';
import './css/landing-page.css'; 

export default function Home() {
  const { isSignedIn, isLoaded, user } = useUser();
  const router = useRouter();
  const [active, setActive] = useState("navbar-menu");
  const [icon, setIcon] = useState("navbar-toggler");

  const navToggle = () => {
    if (active === "navbar-menu") {
      setActive("navbar-menu active");
    } else setActive("navbar-menu");

    if (icon === "navbar-toggler") {
      setIcon("navbar-toggler toggle");
    } else setIcon("navbar-toggler");
  };

  const handleSubmit = async () => {
    if (!isSignedIn) {
      return router.push('/sign-in');
    }

    if (error) {
      console.warn(error.message);
    }
  };

  const handleGetStarted = () => {
    if (isSignedIn) {
      router.push('/generate');
    } else {
      router.push('/sign-in');
    }
  };

  return (
    <>
      <Head>
        <title>SmartDeck AI Flashcards</title>
        <meta name="description" content="create flashcards from text" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="landingPage-ctr">
        <Navbar active={active} toggle={navToggle} icon={icon} />
        <Box height={"100vh"} display={"flex"} justifyContent={"center"} alignItems={"center"} textAlign={"center"}>
          <Box
            marginTop={-15}
            className="headingBg-ctr"
            width={"90vw"}
            height={"75vh"}
            display={"flex"}
            flexDirection={"column"}
            justifyContent={"center"}
            alignItems={"center"}
            textAlign={"center"}
            borderRadius={"30px"}
          >
            <Typography variant="h2" fontFamily={"sans-serif"} gutterBottom>Welcome To SmartDeck</Typography>
            <Typography variant="h5" fontFamily={"sans-serif"} pb={4} gutterBottom>
              {' '}Introducing the fastest way to create flashcards from scratch.
            </Typography>
            <button className="heading-btn" onClick={handleGetStarted}>Get Started</button>
          </Box>
        </Box>
        <Box marginTop={-10}><Features/></Box>
        <Footer />
      </div>
    </>
  );
}
