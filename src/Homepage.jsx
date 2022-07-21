import React, { useEffect } from "react";
import { Box, Container, Heading } from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";

const Homepage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState("");
  const getData = async () => {
    try {
      const results = await axios.get("http://94.74.86.174:8080/api/checklist");
      if (results.data.statusCode === 2100) {
        console.log("data", results.data);
      }
      setIsLoading(false);
    } catch (error) {
      console.log(error.message);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <Container>
      <Heading>Homepage</Heading>
    </Container>
  );
};

export default Homepage;
