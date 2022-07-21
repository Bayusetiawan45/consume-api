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
} from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const Detail = () => {
  const { id } = useParams();
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
        `http://94.74.86.174:8080/api/checklist/${id}/item`,
        config
      );
      if (results.data.statusCode === 2000) {
        setData(results.data.data);
      }
      setIsLoading(false);
    } catch (error) {
      console.log(error.message);
      setIsLoading(false);
    }
  };
  console.log("data detail", data);

  const handleAddItem = async () => {
    const body = {
      itemName: item,
    };
    try {
      const results = await axios.post(
        `http://94.74.86.174:8080/api/checklist/${id}/item`,
        body,
        config
      );
      if (results.data.statusCode === 2000) {
        console.log("add", results.data);
        getDataDetail();
      }
    } catch (error) {
      console.log(error.message)
    }
  };

  useEffect(() => {
    getDataDetail();
  }, []);

  return (
    <Container>
      <Heading mb={10}>Detail Page</Heading>
      <HStack mb={10}>
        <FormControl isRequired>
          <FormLabel>Add Item</FormLabel>
          <Input type="text" onChange={(e) => setItem(e.target.value)} />
        </FormControl>
        <Button onClick={() => handleAddItem()}>Add</Button>
      </HStack>
      {isLoading ? (
        <Spinner />
      ) : (
        <TableContainer>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>checklist</Th>
                <Th>status</Th>
                <Th>action</Th>
              </Tr>
            </Thead>
            <Tbody>
              {data.length > 0
                ? data.map((list) => (
                    <Tr key={list.id}>
                      <Td>{list.name}</Td>
                      <Td>
                        {list.itemCompletionStatus === true
                          ? "complete"
                          : "on progress"}
                      </Td>
                      <Td>
                        <Button onClick={() => navigate(`/detail/${list.id}`)}>
                          Detail
                        </Button>
                      </Td>
                    </Tr>
                  ))
                : "no data"}
            </Tbody>
          </Table>
        </TableContainer>
      )}
    </Container>
  );
};

export default Detail;
