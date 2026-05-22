import axios from "axios";

// Dynamic API URL
const API_URL =
  `${window.location.protocol}//${window.location.hostname}:5000/api/jobs`;

// Token config
const getConfig = () => {
  const token =
    localStorage.getItem(
      "token"
    );

  return {
    headers: {
      Authorization:
        `Bearer ${token}`,
    },
  };
};

// Get all jobs
export const getAllJobs =
  async () => {
    const response =
      await axios.get(
        API_URL
      );

    return response.data;
  };

// Get CS Jobs
export const getCSJobs =
  async () => {
    const response =
      await axios.get(
        `${API_URL}/category/CS`
      );

    return response.data;
  };

// Get single job
export const getJobById =
  async (id) => {
    const response =
      await axios.get(
        `${API_URL}/${id}`
      );

    return response.data;
  };

// Add Job
export const addJob =
  async (jobData) => {
    const response =
      await axios.post(
        API_URL,
        jobData,
        getConfig()
      );

    return response.data;
  };

// Update Job
export const updateJob =
  async (
    id,
    jobData
  ) => {
    const response =
      await axios.put(
        `${API_URL}/${id}`,
        jobData,
        getConfig()
      );

    return response.data;
  };

// Delete Job
export const deleteJob =
  async (id) => {
    const response =
      await axios.delete(
        `${API_URL}/${id}`,
        getConfig()
      );

    return response.data;
  };