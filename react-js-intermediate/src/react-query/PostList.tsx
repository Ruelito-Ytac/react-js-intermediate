import React, { useEffect } from "react";
import "./TodoList.scss";
import { usePostIds, usePosts } from "./services/quiries";
import { useCreatePost, useDeletePost, useUpdatePost } from "./services/mutation";
import { PostListData } from "./types/posts";
import { useForm, SubmitHandler } from "react-hook-form";

const PostList = () => {
    const { isLoading, data: post_list, isError } =  usePostIds();
    const postQueries = usePosts(post_list);

    const createPostMutation = useCreatePost();
    const updatePostMutation = useUpdatePost();
    const deletePostMutation = useDeletePost();
    const { register, handleSubmit, reset } = useForm<PostListData>();

    const handleCreatePostSubmit: SubmitHandler<PostListData> = (post_list) => {
        createPostMutation.mutate(post_list);
        reset();
    }

    const handleUpdatePostSubmit = (post_list: PostListData | undefined) => {
        if(post_list){
            updatePostMutation.mutate({ ...post_list, title: `Update ${ post_list.title }` });
        }
    }

    const handleDeletePostSubmit = (id: number) => {
        deletePostMutation.mutate(id);
    }

    if(isLoading){
        return <span>Loading...</span>
    }

    if(isError){
        return <span>There's an error!</span>
    }

    return (
        <React.Fragment>
            <form onSubmit={ handleSubmit(handleCreatePostSubmit) }>
                <h4>New Post</h4>
                <input type="text" placeholder="Title..." { ...register("title") } />
                <input type="text" placeholder="Desription..." { ...register("body") } />

                <input type="submit" value={ (createPostMutation.isPending) ? "Creating..." : "Add Post" } disabled={ createPostMutation.isPending } />
            </form>
            <ul>
                { postQueries?.map(({ data }, post_index) => 
                    <li key={ post_index + 1 }>
                        - { data?.title }
                        <button type="button" onClick={ () => handleUpdatePostSubmit(data) }>Update Title</button>
                        <button type="button" onClick={ () => handleDeletePostSubmit(data?.id!) }>Remove Post</button>
                    </li>
                )}
            </ul>
        </React.Fragment>
    )
}

export default PostList