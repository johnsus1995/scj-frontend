import axiosClient from "./axios-client";

export const register = (data) => axiosClient.post("/public/register", data);
export const login = (data) => axiosClient.post("/public/login", data);
