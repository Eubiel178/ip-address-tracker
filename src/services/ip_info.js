import axios from "axios";

const api = axios.create({
  baseURL: "https://ipinfo.io/",
});

export const getIpInfo = async (ip) => {
  try {
    const { data } = await api.get(ip + "?token=4fb2f467b3f6a6");

    return data;
  } catch (error) {
    return error;
  }
};
