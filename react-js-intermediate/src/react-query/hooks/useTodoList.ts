import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface TodoList{
    user_id: number;
    id: number;
    title: string;
    completed: boolean;
}

const useTodoList = () => {
    const fetchTodoList = () => 
        axios
            .get<TodoList[]>("https://jsonplaceholder.typicode.com/todos")
            .then((res) => res.data);

    return useQuery<TodoList[], Error>({
        queryKey: ["todo_list"],
        queryFn: fetchTodoList,
        staleTime: 10 * 1000
    });
}

export default useTodoList;