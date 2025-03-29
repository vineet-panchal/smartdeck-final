'use client';
import { useUser, SignedIn, SignedOut, UserButton, SignUpButton } from "@clerk/nextjs";
import { useRouter } from 'next/navigation';
import { collection, doc, getDocs } from "firebase/firestore";
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Container, Grid, Card, CardContent, Typography, CardActionArea, Box, AppBar, Toolbar, Button, Switch } from '@mui/material';
import db from '@/firebase';
import Navbar from "../components/Navbar";
import Header from "../components/Header";
import Flashcard from "../components/Flashcard";
import Footer from "../components/Footer";
import "@/app/css/collection.css";

export default function Collection() {
  const { isLoaded, isSignedIn, user } = useUser();
  const [flashcards, setFlashcards] = useState([]);
  const [flipped, setFlipped] = useState({});
  const router = useRouter();
  const searchParams = useSearchParams();
  const search = searchParams.get('id');
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
    
  useEffect(() => {
    async function getFlashcard() {
      if (!isSignedIn) {
        router.push('/');
      }
        
      const colRef = collection(doc(collection(db, 'users'), user.id), search);
      const docs = await getDocs(colRef);
      const flashcards = [];
      docs.forEach((doc) => {
        flashcards.push({ id: doc.id, ...doc.data() });
      });
      setFlashcards(flashcards);
    }
    if (isLoaded && isSignedIn && user) {
      getFlashcard();
    }
  }, [search, user, isSignedIn, router, isLoaded]);
    
  const handleCardClick = (id) => {
    setFlipped((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };
    
  return (
    <>
      <Navbar active={active} icon={icon} toggle={navToggle} />
      <section className="savedFlashcards-ctr">
        <Header 
          title={search} 
          subheading={`Your flashcards from the '${search}' collection.`}
        />
        <div className="savedFlashcards-grid-ctr">
          <Grid container spacing={3} sx={{ mt: 4 }}>
            {flashcards.map((flashcard) => (
              <Grid item xs={12} sm={6} md={4} key={flashcard.id}>
                <Flashcard
                  text={flipped[flashcard.id] ? flashcard.back : flashcard.front}
                  onClick={() => handleCardClick(flashcard.id)}
                />
              </Grid>
            ))}
          </Grid>
        </div>
        <Footer />
      </section>
    </>
  );
}
