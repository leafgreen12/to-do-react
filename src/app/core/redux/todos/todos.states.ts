import {TodoModel} from "../../interfaces/todo.interface";

export interface ITodoState {
    items: TodoModel[]
    dispatch?: any
}
