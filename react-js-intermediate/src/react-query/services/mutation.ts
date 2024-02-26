import { useMutation, useQueryClient } from "@tanstack/react-query"
import { PostListData } from "../types/posts"
import { createPost, deleteTodo, updateTodo } from "./api"

export const useCreatePost = () => {
    const queryClient = useQueryClient();
    
    return useMutation({
        mutationFn: (data: PostListData) => createPost(data),
        onMutate: () => {
            console.log("mutate");
        },

        onError: () => {
            console.log("error");
        },

        onSuccess: () => {
            console.log("success");
        },

        onSettled: async (_, error) => {
            if(error) {
                console.log(error);
            }
            else {
                await queryClient.invalidateQueries({ queryKey: ["posts"] });
            }
        }
    });
}

export const useUpdatePost = () => {
    const queryClient = useQueryClient();
    
    return useMutation({
        mutationFn: (data: PostListData) => updateTodo(data),

        onMutate: () => {
            console.log("mutate");
        },

        onError: () => {
            console.log("error");
        },

        onSuccess: () => {
            console.log("success");
        },

        onSettled: async (_, error, variables) => {
            if(error) {
                console.log(error);
            }
            else {
                await queryClient.invalidateQueries({ queryKey: ["posts"] });
                await queryClient.invalidateQueries({
                    queryKey: ["post", { id:  variables.id }]
                });
            }
        }
    });
}

export const useDeletePost = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: number) => deleteTodo(id),
        onMutate: () => {
            console.log("mutate");
        },

        onError: () => {
            console.log("error");
        },

        onSuccess: () => {
            console.log("deleted successfully");
        },

        onSettled: async (_, error) => {
            if(error) {
                console.log(error);
            }
            else {
                await queryClient.invalidateQueries({ queryKey: ["posts"] });
            }
        }
    });
}