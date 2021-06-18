import React, {Component} from 'react';
import './App.scss';
import { Provider } from "react-redux";
import TodoAddItem from "./todo-add-item/todo-add-item";
import {TodosService} from "./core/services/todos.service";
import TodosLists from "./todos-lists/todos-lists";
import todos from "./core/redux/todos/todos.reducer";
import {HandleTodoActions, ITodoState} from "./core/redux/todos";
import {TodoModel} from "./core/interfaces/todo.interface";
import store from "./core/redux/redux-form/store";
export const TodosContext = React.createContext({
    items: [],
    dispatch: () => null
} as Readonly<ITodoState>);

class App extends Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            items: [] as TodoModel[],
            dispatch: (action: any) => this.reducer(action)
        } as Readonly<ITodoState>
    }
    componentWillUnmount() {
        this.getData();
    }

    async getData() {
        const todosService = new TodosService();
        const data = await todosService.getTodos();
        const stateApp = {
            items: data as TodoModel[],
            dispatch: (action: any) => this.reducer(action)
        }
        this.setState(stateApp);
    }

    reducer(action: HandleTodoActions) {
        let state = {...this.state} as ITodoState;
        this.setState(todos(state, action));
    }

    render() {
        return (
            <div className="todos">
                <h1>Todo's App</h1>
                <Provider store={store}>
                    <TodosContext.Provider value={this.state}>
                        <TodoAddItem dispatch={(action: any) => this.reducer(action)} onSubmit={(action: any) => this.reducer(action)}/>
                        <TodosLists/>
                    </TodosContext.Provider>
                </Provider>
            </div>
        );
    }
}

export default App;
