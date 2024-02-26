import React, { useState } from "react";
import { useProjects } from "./services/quiries";

const Project = () => {
    const [page, setPage] = useState(1);

    const { data, isPending, error, isError, isPlaceholderData, isFetching } = useProjects(page);

    const nextPage = () => {
        if(!isPlaceholderData){
            setPage((old) => old + 1);
        }
    }

    const prevPage = () => {
        setPage((old) => Math.max(old - 1, 1));
    }

    return (
        <React.Fragment>
            { (isPending) && <span>Loading...</span> }
            { (isError) && <span>{ error.message }</span> }

            <ul>
                { data?.data.map((item, index) =>
                   <li key={ index + 1 }>{ item.title }</li>     
                ) }
            </ul>

            <span>Current page: { page }</span>
            <button type="button" onClick={ prevPage } disabled={ page === 1 }>Previous Page</button>
            <button type="button" onClick={ nextPage } disabled={ isPlaceholderData }>Next Page</button>
            <span>{ (isFetching) ? "Loading..." : "Loaded!" }</span>
        </React.Fragment>
    )
}

export default Project