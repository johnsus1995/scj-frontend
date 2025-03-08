import axiosClient from "./axios-client";

export const getAllExams = (data) => axiosClient.get("/api/exams", data);
export const addNewExam = (data) => axiosClient.post("/api/exams/add", data);
export const addQuestion = (data) =>
  axiosClient.post("/api/questions/add", data);
export const addCorrectAnswer = (data) =>
  axiosClient.post("/api/correct/correct-answer", data);
export const deleteExam = (data) => axiosClient.delete(`/api/exams/${data.id}`);
export const getAllQuestionsOfExam = (data) =>
  axiosClient.get(`/api/questions?examId=${data.id}`);
