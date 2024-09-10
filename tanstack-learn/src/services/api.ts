import axios from "axios";
import { Todo } from "../types/todo";

const baseUrl = "http://localhost:8080";
const axiosInstance = axios.create({ baseURL: baseUrl });

export const getTodosIds = async () => {
  return (await axiosInstance.get<Todo[]>("todos")).data.map((item) => item.id);
};
