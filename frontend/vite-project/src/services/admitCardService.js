import axios
  from "axios";

const API =
  "http://localhost:5000/api/admit-cards";

export const
  getAllAdmitCards =
  async () => {

    const response =
      await axios.get(
        API
      );

    return response.data;
  };

export const
  getAdmitCardById =
  async (id) => {

    const response =
      await axios.get(
        `${API}/${id}`
      );

    return response.data;
  };

export const
  addAdmitCard =
  async (
    admitCardData
  ) => {

    const response =
      await axios.post(
        "http://localhost:5000/api/admit-cards",
        admitCardData
      );

    return response.data;
  };