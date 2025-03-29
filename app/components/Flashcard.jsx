"use client";

import React from 'react';
import { Typography, Box } from '@mui/material';
import "@/app/css/flashcard.css";

const Flashcard = (props) => {
  return (
    <>
      <Box className="flashcard-ctr" onClick={props.onClick}>
        <span class="glass"></span>
        <div class="content">
          <Typography className="flashcard-text">{props.text}</Typography>
          <Typography className="flashcard-subheading">Click To Flip</Typography>
        </div>
      </Box>
    </>
  )
}

export default Flashcard;