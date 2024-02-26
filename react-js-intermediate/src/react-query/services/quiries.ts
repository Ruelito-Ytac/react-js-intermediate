import { keepPreviousData, useInfiniteQuery, useQueries, useQuery, useQueryClient } from "@tanstack/react-query";
import { getPost, getPostsIds, getProduct, getProducts, getProjects } from "./api";
import { ProjectDataType } from "../types/project";

export const usePostIds = () => {
    return useQuery({
        queryKey: ["posts"],
        queryFn: getPostsIds
    });
}

export function usePosts(ids: (number | undefined)[] | undefined) {
    return useQueries({
        queries: (ids ?? []).map((id) => {
            return {
                queryKey: ["post", id],
                queryFn: () => getPost(id!),
            }
        })
    });
}

export function useProjects(page: number){
    return useQuery({
        queryKey: ["projects", { page }],
        queryFn: () => getProjects(page),
        placeholderData: keepPreviousData,
    });
}

export const useProducts = () => {
    return useInfiniteQuery ({
        queryKey: ["products"],
        queryFn: getProducts,
        initialPageParam: 0,
        getNextPageParam: (lastPage, _, lastPageParam) => {
            if(lastPage.length === 0){
                return undefined;
            }

            return lastPageParam + 1;
        },
        getPreviousPageParam: (_, __, firstPageParam) => {
            if(firstPageParam <= 1){
                return undefined;
            }

            return firstPageParam - 1;
        }
    });
}

export const useProduct = (id: number | null) => {
    const queryClient = useQueryClient();

    return useQuery({
        queryKey: ["product", { id }],
        queryFn: () => getProduct(id!),
        enabled: !!id,
        placeholderData: () => {
            const cacheProducts = (queryClient.getQueryData(["products"]) as {
                pages: ProjectDataType[] | undefined;
            })?.pages?.flat(2);

            if(cacheProducts){
                return cacheProducts.find((item) => item.id === id);
            }
        }
    });
}