"use client";

import React from 'react';
import { Typography, Box } from '@mui/material';
import FeatureCard from './FeatureCard';
import "@/app/css/features.css";

const Features = () => {
  return (
    <>
      <Box className="features-ctr" width={"100%"} justifyContent={"center"} alignItems={"center"}>
        <Typography color={"white"} variant="h4" textAlign={"center"} gutterBottom>Features</Typography>
        <div className="features-cards">
          <ul>
            <li>
              <FeatureCard 
                heading="Easy Text Input" 
                text="Simply input you text and let our software do the rest. Creating flashcards has never been easier." 
                id="featureCard-1"
              />
            </li>
            <li>
              <FeatureCard
                heading="Smart Flashcards"
                text="Our AI intelligently breaks down your text into concise flashcards perfect for studying."
                id="featureCard-2"
              />
            </li>
            <li>
              <FeatureCard
                heading="Accessible Anywhere"
                text="Access your flashcards from any device and at any time. Study on the go with ease."
                id="featureCard-3"
              />
            </li>
          </ul>
        </div>
      </Box>
    </>
  )
}

export default Features;