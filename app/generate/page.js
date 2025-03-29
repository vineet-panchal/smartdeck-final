'use client';

import { useUser, SignedIn, SignedOut, UserButton, SignUpButton } from "@clerk/nextjs";
import { collection, doc, setDoc, getDoc, writeBatch } from "firebase/firestore";
import { useState, useEffect } from 'react';
import { useRouter } from "next/navigation";
import { Grid, Typography, TextField, Box, Button, Modal } from '@mui/material';
import db from '@/firebase';
import "@/app/css/generate.css";
import Navbar from "../components/Navbar";
import Header from "../components/Header";
import Flashcard from "../components/Flashcard";
import Footer from "../components/Footer";

export default function Generate() {
  // if (typeof window !== 'undefined') {

    const { user, isSignedIn,isLoaded} = useUser();
    const [flashcards, setFlashcards] = useState([]);
    const [flipped, setFlipped] = useState({});
    const [text, setText] = useState('');
    const [name, setName] = useState('');
    const [modalOpen, setModalOpen] = useState(false);
    const router = useRouter();
    const [active, setActive] = useState("navbar-menu");
    const [icon, setIcon] = useState("navbar-toggler");
    
    const navToggle = () => {
      // if (typeof window !== 'undefined') { // Check if running in the browser
        // existing code...
      // } // Closing brace for navToggle
      if (active === "navbar-menu") {
        setActive("navbar-menu active");
      } else setActive("navbar-menu");
      
      if (icon === "navbar-toggler") {
        setIcon("navbar-toggler toggle");
      } else setIcon("navbar-toggler");
    }; // Closing brace for navToggle
    
    useEffect(() => {
      if (isLoaded && !isSignedIn) {
        router.push('/');
      }
    }, [isSignedIn, user, router]);
    
    const handleSubmit = async () => {
      // if (typeof window !== 'undefined') { // Check if running in the browser
        // existing code...
      // } // Closing brace for handleSubmit
      const response = await fetch('/api/generate', {
        method: 'POST',
        body: JSON.stringify({ text }),
        headers: { 'Content-Type': 'application/json' },
      });
      const data = await response.json();
      setFlashcards(data || []);
    };
    
    const handleSave = async () => {
      // if (typeof window !== 'undefined') { // Check if running in the browser
        // existing code...
      // } // Closing brace for handleSave
      if (!name.trim()) return alert("Please provide a name for your flashcard collection");
      
      const batch = writeBatch(db);
      const userDocRef = doc(collection(db, 'users'), user.id);
      const userDocSnap = await getDoc(userDocRef);
      
      if (userDocSnap.exists()) {
        const collections = userDocSnap.data().flashcards || [];
        if (collections.find((f) => f.name === name)) {
          alert("A flashcard collection with that name already exists.");
          return;
        } else {
          collections.push({ name });
          batch.set(userDocRef, { flashcards: collections }, { merge: true });
        }
      } else {
        batch.set(userDocRef, { flashcards: [{ name }] });
      }
      
      const colRef = collection(userDocRef, name);
      flashcards.forEach((flashcard) => {
        const cardDocRef = doc(colRef);
        batch.set(cardDocRef, flashcard);
      });
      
      await batch.commit();
      setModalOpen(false);
      router.push('/collections');
    }; 
  // }
    
  const handleFlip = (index) => {
    setFlipped(prevState => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  }; // Closing brace for navToggle

  return (
    <>
      <section className="generate-ctr">
        <Navbar active={active} toggle={navToggle} icon={icon} />
        <Header 
          title="Generate Flashcards" 
          subheading="Input text in the box and click 'Generate Flashcards'. WARNING: It may take about 10-15 seconds to generate flashcards. If Flashcards do not generate, the OPENAI API may have ran out of tokens."
        />
        <div className="generate-input-ctr">
          <textarea
            placeholder="generate flashcards on..." 
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={4}
          />
          <button className="generateBtn" onClick={handleSubmit}>
            <span>GENERATE FLASHCARDS</span>
          </button>
        </div>

        <div className="generate-flashcards-ctr">
          {flashcards.length > 0 && (
            <Box sx={{ mt: 4 }}>
              <Grid container spacing={4}>
                {flashcards.map((flashcard, index) => (
                  <Grid item xs={12} sm={6} md={4} key={index}>
                    <Flashcard 
                      text={flipped[index] ? flashcard.back : flashcard.front}
                      onClick={() => handleFlip(index)}
                    />
                  </Grid>
                ))}
              </Grid>
              <button className="generateBtn" onClick={() => setModalOpen(true)}>SAVE FLASHCARDS</button>
            </Box>
          )}

          <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
            <Box sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 400,
              bgcolor: 'black',
              borderRadius: 2,
              boxShadow: 24,
              p: 4,
            }}>
              <Typography color={"white"} fontFamily={"Basier Square"} variant="h6" gutterBottom>Save Flashcards</Typography>
              <div className="generate-save-input-ctr">
                <textarea
                  placeholder="name of collection" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <button className="generateBtn" onClick={handleSave}>
                  <span>SAVE</span>
                </button>
              </div>
            </Box>
          </Modal>
        </div>
      <Footer />
      </section>
    </>
  );
}
