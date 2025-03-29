"use client";
import React from 'react';
import { Typography } from '@mui/material';
import "@/app/css/feature-card.css";

const FeatureCard = (props) => {
  return (
    <div className="featureCard" id={props.id}>
      <Typography fontWeight={900} className="featureCard-title">{props.heading}</Typography>
      <Typography className="featureCard-subtitle">
        {props.text}
      </Typography>
    </div>
  )
}

export default FeatureCard;