import axiosClient from "./axios-client";

export const register = (data) => axiosClient.post("/public/register", data);
