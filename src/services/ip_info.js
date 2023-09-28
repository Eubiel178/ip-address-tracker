import axios from "axios";

const api = axios.create({
  baseURL: "http://ip-api.com/json/",
});

export const getIpInfo = async (ip) => {
  try {
    const { data } = await api.post(ip);

    return data;
  } catch (error) {
    return error;
  }
};
