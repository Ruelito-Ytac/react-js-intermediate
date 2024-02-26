import useTodoList from "./hooks/useTodoList";
import "./TodoList.scss";

const TodoList = () => {
    const { data: todo_list, error, isLoading } = useTodoList();

    if(isLoading) return <p>Loading...</p>;

    if(error) return <p>{ error.message }</p>;

    return (
        <div>
            { todo_list?.map((todo_item, todo_index) => 
                <span key={ todo_index }>{ todo_item.title }</span>
            )}
        </div>
    );
}

export default TodoList;