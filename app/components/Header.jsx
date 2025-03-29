"use client";

import React from 'react'
import { Box, Typography } from '@mui/material';

const Header = (props) => {
  return (
    <>
      <Box
        width={"100%"}
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        pt={5}
      >
        <Box
          width={"90%"}
          display={"flex"}
          flexDirection={"column"}
          justifyContent={"center"}
          alignItems={"left"}
          textAlign={"left"}
        >
          <Typography color={"white"} variant="h2" fontFamily={"sans-serif"} gutterBottom>{props.title}</Typography>
          <Typography color={"white"} variant="h6" pb={2} fontFamily={"sans-serif"} gutterBottom>
            {' '}{props.subheading}
          </Typography>
          <Box width={"100%"} height={"0.3vh"} bgcolor={"rgb(99, 99, 99)"}></Box>
        </Box>
      </Box>
    </>
  )
}

export default Header;