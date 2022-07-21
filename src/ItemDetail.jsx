import React, { useEffect, useState } from "react";
import {
  Box,
  Container,
  Heading,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Spinner,
  FormControl,
  FormLabel,
  Input,
  Button,
  HStack,
  useDisclosure,
  Text,
} from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const ItemDetail = () => {
  const { id, item_id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const token = JSON.parse(localStorage.getItem("token"));
  const navigate = useNavigate();

  const [data, setData] = useState([]);
  const [item, setItem] = useState("");

  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const getDataDetail = async () => {
    try {
      const results = await axios.get(
        `http://94.74.86.174:8080/api/checklist/${id}/item/${item_id}`,
        config
      );
      if (results.data.statusCode === 2110) {
        setData(results.data.data);
      }
      setIsLoading(false);
    } catch (error) {
      console.log(error.message);
      setIsLoading(false);
    }
  };

  const handleEdit = async () => {
    const body = {
      itemName: item,
    };
    try {
      const results = await axios.put(
        `http://94.74.86.174:8080/api/checklist/${id}/item/rename/${item_id}`,
        body,
        config
      );
      if (results.data.statusCode === 2200) {
        getDataDetail();
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getDataDetail();
  }, []);

  return (
    <Container maxW="container.sm">
      <Heading mb={10}>Detail Item</Heading>
      {isLoading ? (
        <Spinner />
      ) : (
        <Box>
          <Heading>{data.name}</Heading>
          <Heading>
            {data.itemCompletionStatus === true ? "complete" : "on progress"}
          </Heading>
        </Box>
      )}

      <HStack mb={10}>
        <FormControl isRequired>
          <FormLabel>Add Item</FormLabel>
          <Input type="text" onChange={(e) => setItem(e.target.value)} />
        </FormControl>
        <Button onClick={() => handleEdit()}>Rename</Button>
      </HStack>
    </Container>
  );
};

export default ItemDetail;
