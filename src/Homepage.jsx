import React, { useEffect } from "react";
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
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Homepage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const token = JSON.parse(localStorage.getItem("token"));
  const navigate = useNavigate();

  const [data, setData] = useState([]);
  const [list, setList] = useState("");

  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const getDataChecklist = async () => {
    try {
      const results = await axios.get(
        "http://94.74.86.174:8080/api/checklist",
        config
      );
      if (results.data.statusCode === 2100) {
        setData(results.data.data);
      }
      setIsLoading(false);
    } catch (error) {
      console.log(error.message);
      setIsLoading(false);
    }
  };

  const handleAddChecklist = async () => {
    const body = {
      name: list,
    };
    try {
      const results = await axios.post(
        "http://94.74.86.174:8080/api/checklist",
        body,
        config
      );
      if (results.data.statusCode === 2000) {
        console.log("add", results.data);
        getDataChecklist();
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      const results = await axios.delete(
        `http://94.74.86.174:8080/api/checklist/${id}`,
        config
      );
      if (results.data.statusCode === 2300) {
        console.log("add", results.data);
        getDataChecklist();
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getDataChecklist();
  }, []);

  return (
    <Container>
      <Heading mb={10}>Homepage</Heading>
      <HStack mb={10}>
        <FormControl isRequired>
          <FormLabel>Add Checklist</FormLabel>
          <Input type="text" onChange={(e) => setList(e.target.value)} />
        </FormControl>
        <Button onClick={() => handleAddChecklist()}>Add</Button>
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
                        {list.checklistCompletionStatus === true
                          ? "complete"
                          : "on progress"}
                      </Td>
                      <Td>
                        <Button onClick={() => navigate(`/detail/${list.id}`)}>
                          Detail
                        </Button>
                        <Button onClick={() => handleDelete(list.id)}>
                          Delete
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

export default Homepage;
