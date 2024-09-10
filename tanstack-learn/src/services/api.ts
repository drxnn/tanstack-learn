import axios from "axios";
import { Todo } from "../types/todo";
import { Project } from "../types/project";

const baseUrl = "http://localhost:8080";
const axiosInstance = axios.create({ baseURL: baseUrl });

export const getTodosIds = async () => {
  return (await axiosInstance.get<Todo[]>("todos")).data.map((item) => item.id);
};

export const getTodo = async (id: number) => {
  return (await axiosInstance.get<Todo>(`todos/${id}`)).data;
};

export const createTodo = async (data: Todo) => {
  return await axiosInstance.post("todos", data);
};

export const updateTodo = async (data: Todo) => {
  return await axiosInstance.put(`todos/${data.id}`, data);
};

export const deleteToDo = async (data: Todo) => {
  return await axiosInstance.delete(`todos/${data.id}`);
};

export const getProjects = async (page = 1) => {
  return (await axiosInstance.get<Project[]>(`projects?_page=${page}&_limit=3`))
    .data;
};
