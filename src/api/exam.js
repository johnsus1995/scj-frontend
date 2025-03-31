import axiosClient from "./axios-client";

//exams
export const getAllExams = (data) => axiosClient.get("/api/exams", data);
export const addNewExam = (data) => axiosClient.post("/api/exams/add", data);
export const deleteExam = (data) => axiosClient.delete(`/api/exams/${data.id}`);
export const startAttemptExam = (data) =>
  axiosClient.post(`/api/exams/${data.id}/start`);

//questions
export const addQuestion = (data) =>
  axiosClient.post("/api/questions/add", data);
export const getAllQuestionsOfExam = (data) =>
  axiosClient.get(`/api/questions?examId=${data.id}`);
export const getNextQuestion = (data) =>
  axiosClient.post(`/api/questions/next`, data);

//answers
export const addCorrectAnswer = (data) =>
  axiosClient.post("/api/correct/correct-answer", data);
//will be needed for listing questions and answers, not implemented yet in the backend
export const getAllAnswersOfExam = (data) =>
  axiosClient.get(`/api/questions?examId=${data.id}`);
export const attemptAnswer = (data) =>
  axiosClient.post("/api/answers/attempt", data);
export const getAllAttemptedAnswersOfExam = (data) =>
  axiosClient.get(`/api/answers/attempted-answers?attemptExamId=${data.id}`);