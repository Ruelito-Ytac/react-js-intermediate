import axios from "axios";
import { PostListData } from "../types/posts";
import { ProjectDataType } from "../types/project";

const BASE_URL = "https://jsonplaceholder.typicode.com";
const axiosInstance = axios.create({ baseURL: BASE_URL });

export const getPostsIds = async () => {
    return (await axiosInstance.get<PostListData[]>("/posts")).data.map((todo) => todo.id);
}

export const getPost = async (id: number) => {
    return (await axiosInstance.get<PostListData>(`/posts/${ id }`)).data;
}

export const createPost = async (data: PostListData) => {
    await axiosInstance.post("/posts", data);
}

export const updateTodo = async (data: PostListData) => {
    await axiosInstance.put(`/posts/${ data.id }`, data);
}

export const deleteTodo = async (id: number) => {
    await axiosInstance.delete(`/posts/${id }`);
}

export const getProjects = async (page = 1) => {
    return (await axiosInstance.get<ProjectDataType[]>(`/posts?_page=${ page }&limit=10`));
}

export const getProducts = async ({ pageParam } : { pageParam: number }) => {
    return (await axiosInstance.get<ProjectDataType[]>(`/posts?_page=${ pageParam + 1 }&limit=10`)).data;
}

export const getProduct = async (id: number) => {
    return (await axiosInstance.get<ProjectDataType>(`posts/${ id }`)).data;
}