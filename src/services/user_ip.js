import axios from "axios";

const api = axios.create({
  baseURL: "https://api64.ipify.org	",
});

export const getUserIp = async () => {
  try {
    const { data } = await api.get();

    return data;
  } catch (error) {
    return error;
  }
};
