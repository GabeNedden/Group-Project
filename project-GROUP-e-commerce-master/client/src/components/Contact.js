import React from "react";
import { useState } from "react";
import styled from "styled-components";
import Footer from "./Footer/Footer";

const Contact = () => {
  return (
    <>
      <Title>Contact Us</Title>
      <Span></Span>
      <Wrapper>
        <Name placeholder="Full Name" maxLength={30} required />
        <Email placeholder="Email" maxLength={30} required />
        <ContactForm>
          <form>
            <StyledInput
              placeholder="How can we help?"
              maxLength={235}
              required
            />
          </form>
          <StyledButton type="submit" value="Send" />
        </ContactForm>
      </Wrapper>
      <Footer />
    </>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 80px;
`;

const Span = styled.hr`
  border: 2px solid black;
  text-decoration: underline;
  margin-top: 70px;
  margin-left: 175px;
  margin-right: 175px;
`;

const Title = styled.h1`
  display: flex;
  justify-content: center;
  margin-top: 250px;
  font-family: sans-serif;
  font-size: 32px;
`;

const StyledInput = styled.textarea`
  margin-top: 20px;
  margin-left: 20px;
  height: 200px;
  width: 400px;
  line-height: 30px;
  border: none;
  font-size: 20px;
  color: black;
  resize: none;
  &:focus {
    outline: none;
  }
`;

const Name = styled.textarea`
  padding-left: 22px;
  padding-top: 5px;
  letter-spacing: 1px;
  line-height: 28px;
  font-size: 20px;
  border: 2px solid black;
  border-radius: 5px;
  height: 40px;
  width: 440px;
  resize: none;
  margin-bottom: 15px;
  &:focus {
    outline: none;
  }
`;

const Email = styled.textarea`
  padding-left: 22px;
  padding-top: 5px;
  letter-spacing: 1px;
  line-height: 28px;
  font-size: 20px;
  border: 2px solid black;
  border-radius: 5px;
  height: 40px;
  width: 440px;
  resize: none;
  margin-bottom: 15px;
  &:focus {
    outline: none;
  }
`;

const StyledButton = styled.input`
  background-image: linear-gradient(#464d55, #25292e);
  border-radius: 8px;
  border: none;
  color: white;
  cursor: pointer;
  font-size: 18px;
  height: 42px;
  justify-content: center;
  padding: 0 32px;
  transform: translate3d(0, 0, 0);
  transition: all 150ms;
  margin-left: 300px;

  &:hover {
    opacity: 0.85;
  }

  &:active {
    transform: scale(0.9);
  }
`;

const ContactForm = styled.div`
  border: 2px solid black;
  border-radius: 5px;
  height: 300px;
  width: 440px;
`;

export default Contact;
