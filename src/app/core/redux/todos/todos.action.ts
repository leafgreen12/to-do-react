import {TodoModel} from "../../interfaces/todo.interface";

export enum ETodos {
    ADD_TODO = '[TODOS] add todo',
    EDIT_TODO = '[TODOS] edit todo',
    DELETE_TODO = '[TODOS] delete todo',
}

export class AddTodo {
    public readonly type = ETodos.ADD_TODO;
    constructor(
        public data: TodoModel) {}
}

export class EditTodo {
    public readonly type = ETodos.EDIT_TODO;
    constructor(
        public data: TodoModel) {}
}

export class DeleteTodo {
    public readonly type = ETodos.DELETE_TODO;
    constructor(
        public idTodo: number) {}
}

export type HandleTodoActions =
    AddTodo |
    DeleteTodo |
    EditTodo;
