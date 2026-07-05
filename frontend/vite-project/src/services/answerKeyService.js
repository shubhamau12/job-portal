import axios from "axios";

const API_URL =
  `${import.meta.env.VITE_API_URL}/api/answer-keys`;


// Get All Answer Keys
export const getAllAnswerKeys =
  async () => {

    const response =
      await axios.get(
        API_URL
      );

    return response.data;
  };


// Get Answer Key By ID
export const getAnswerKeyById =
  async (id) => {

    const response =
      await axios.get(
        `${API_URL}/${id}`
      );

    return response.data;
  };


// Add Answer Key
export const addAnswerKey =
  async (data) => {

    const response =
      await axios.post(
        API_URL,
        data
      );

    return response.data;
  };


// Update Answer Key
export const updateAnswerKey =
  async (
    id,
    data
  ) => {

    const response =
      await axios.put(
        `${API_URL}/${id}`,
        data
      );

    return response.data;
  };


// Delete Answer Key
export const deleteAnswerKey =
  async (id) => {

    const response =
      await axios.delete(
        `${API_URL}/${id}`
      );

    return response.data;
  };