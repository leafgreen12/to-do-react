import {ITodoState} from './todos.states';
import {ETodos, HandleTodoActions} from "./todos.action";
import {TodoModel} from "../../interfaces/todo.interface";

export const initialState = {} as ITodoState

const todos = (state = initialState, action: HandleTodoActions) => {
    switch (action.type) {
        case ETodos.ADD_TODO:
            const newItem = {...state} as ITodoState;
            action.data.id = newItem.items.length + 1;
            newItem.items.push(action.data as TodoModel);
            return newItem;
        case ETodos.EDIT_TODO:
            const newEditItem = {...state} as ITodoState;
            const existItem = newEditItem.items.find(item => item.id === action.data.id);
            if (existItem) {
                existItem.title = action.data.title;
            }
            return newEditItem;
        case ETodos.DELETE_TODO:
            const newArray = {...state} as ITodoState;
            newArray.items = newArray.items.filter(item => item.id !== action.idTodo)
            return newArray;
        default:
            return state
    }
}

export default todos
