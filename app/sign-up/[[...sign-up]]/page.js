"use client";

import { React, useState } from 'react';
import { SignUp } from "@clerk/nextjs";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import { dark, neobrutalism } from "@clerk/themes";
import "@/app/css/sign-up.css";

export default function Page() {
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

  return (
    <>
      <section className="signUp-ctr">
        <Navbar active={active} icon={icon} toggle={navToggle} />
        <div className="signup-form-ctr">
          <SignUp 
            appearance={{
              baseTheme: [dark],
              variables: { colorPrimary: 'grey' }
            }}
          />
        </div>
        <Footer />
      </section>
    </>
  );
}