import axiosClient from "./axios-client";

export const getAllExams = (data) => axiosClient.get("/api/exams", data);
export const addNewExam = (data) => axiosClient.post("/api/exams/add", data);
