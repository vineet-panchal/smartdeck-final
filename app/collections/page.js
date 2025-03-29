'use client';
import { useUser,SignedIn, SignedOut, UserButton, } from "@clerk/nextjs";
import { collection, doc, setDoc, getDoc } from "firebase/firestore";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import db from '@/firebase';
import { Container, Grid, Card, CardContent, Typography, CardActionArea, Box, Paper, AppBar, Toolbar, Button, Switch, CssBaseline, ThemeProvider } from '@mui/material';
import Navbar from "../components/Navbar";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "@/app/css/collections.css";

export default function Collections() {
  // if (typeof window !== 'undefined') { // Check if running in the browser
    const { isLoaded, isSignedIn, user } = useUser();
    const [flashcards, setFlashcards] = useState([]);
    const router = useRouter();
    const [active, setActive] = useState("navbar-menu");
    const [icon, setIcon] = useState("navbar-toggler");
    
    const navToggle = () => {
      // if (typeof window !== 'undefined') { // Check if running in the browser
      // }
      if (active === "navbar-menu") {
        setActive("navbar-menu active");
      } else setActive("navbar-menu");
      
      if (icon === "navbar-toggler") {
        setIcon("navbar-toggler toggle");
      } else setIcon("navbar-toggler");
    };
    
    useEffect(() => {
      // if (typeof window !== 'undefined') { // Check if running in the browser
      // }
      async function getFlashcards() {
        // If the user isn't signed in then send them back to the home page
        if (isLoaded && !isSignedIn) {
          return router.push('/');
        }
        // Check if the doc/user exists
        const docRef = doc(collection(db, 'users'), user.id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          // Get all collection names from doc
          const collections = docSnap.data().flashcards || [];
          setFlashcards(collections);
        } else {
          // Create the user account
          await setDoc(docRef, { flashcards: [] });
        }
      }
      if (isLoaded && isSignedIn && user) {
        getFlashcards();
      }
    }, [user, isSignedIn, router, isLoaded]);
    
    // If the user signs out while on the page
    if (!isLoaded || !isSignedIn) {
      return null;
    }
    
    const handleCardClick = (id) => {
      // if (typeof window !== 'undefined') { // Check if running in the browser
      // }
      router.push(`/collection?id=${id}`);
    };
    
  // }
  return (
    <>
      <section className="collections-ctr">
        <Navbar active={active} toggle={navToggle} icon={icon} />
        <Header 
          title="Your Flashcard Collections" 
          subheading="Below are your flashcard collections. Click on a collection to view the flashcards within it. You can create and manage your collections from your profile."
        />
        <div className="collections-grid-ctr">
          <Grid container spacing={4}>
            {flashcards.map((flashcard) => (
              <Grid item xs={12} sm={6} md={4} key={flashcard.name}>
                <Box className="collection-card"
                  onClick={() => handleCardClick(flashcard.name)}
                >
                  <Typography variant="h5" component="div" sx={{ textAlign: 'center' }}>
                    {flashcard.name}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </div>
        <Footer />
      </section>
    </>
  );
}
