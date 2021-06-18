import React, {useContext} from 'react';
import './todos-lists.scss';
import TodoItem from "../todo-item/todo-item";
import {TodoModel} from "../core/interfaces/todo.interface";
import {TodosContext} from "../App";
import * as fromTodosAction from "../core/redux/todos";
interface IProps {
    items?: TodoModel[];
}

function TodosLists(props?: IProps) {
    const {items, dispatch} = useContext(TodosContext);
    const deleteItem = (id: number) => {
        dispatch(new fromTodosAction.DeleteTodo(id));
    }

    const editItem = (data: TodoModel) => {
        dispatch(new fromTodosAction.EditTodo(data));
    }

    const result = items?.map(item => {
        return (
            <li key={item.id} className="App">
                <TodoItem item={item} delete={deleteItem} edit={editItem} />
            </li>
        );
    });
    return (
        <ul>
            {result}
        </ul>
    );
}

export default TodosLists;
