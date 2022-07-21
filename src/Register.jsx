import React from "react";
import {
  Box,
  Container,
  Heading,
  Flex,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  HStack,
  FormErrorMessage,
  InputRightElement,
  Stack,
  Button,
  Text,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
    
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUsername] = useState("");

  console.log(email, password, userName);

  const body =  {
      email: email,
      password: password,
      username: userName,
    }
  const handleRegister = async () => {
    try {
      const results = await axios.post(
        "http://94.74.86.174:8080/api/register", body
      );
      if(results.data.statusCode === 2000){
        navigate('/login')
      }
      console.log("res", results);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <Container>
      <Heading>Register</Heading>
      <FormControl isRequired>
        <FormLabel>Username</FormLabel>
        <Input type="text" onChange={(e) => setUsername(e.target.value)} />
      </FormControl>
      <FormControl id="email" isRequired>
        <FormLabel>Email</FormLabel>
        <Input type="email" onChange={(e) => setEmail(e.target.value)} />
      </FormControl>
      <FormControl id="password" isRequired>
        <FormLabel>Password</FormLabel>
        <Input type="password" onChange={(e) => setPassword(e.target.value)} />
      </FormControl>
      <Button onClick={() => handleRegister()}>Register</Button>
    </Container>
  );
};

export default Register;
