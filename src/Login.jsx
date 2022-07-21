import React from "react";
import {
  Box,
  Container,
  Heading,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [userName, setUsername] = useState("");
  const body = {
    password: password,
    username: userName,
  };
  const handleLogin = async () => {
    try {
      const results = await axios.post(
        "http://94.74.86.174:8080/api/login",
        body
      );
      if (results.data.statusCode === 2110) {
        localStorage.setItem("token", JSON.stringify(results.data.data.token));
        navigate("/");
      }
      console.log("res", results);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <Container>
      <Heading>Login</Heading>
      <FormControl isRequired>
        <FormLabel>Username</FormLabel>
        <Input type="text" onChange={(e) => setUsername(e.target.value)} />
      </FormControl>
      <FormControl id="password" isRequired>
        <FormLabel>Password</FormLabel>
        <Input type="password" onChange={(e) => setPassword(e.target.value)} />
      </FormControl>
      <Button onClick={() => handleLogin()}>Register</Button>
    </Container>
  );
};

export default Login;
