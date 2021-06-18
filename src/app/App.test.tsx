import React from 'react';
import {act, render, screen} from '@testing-library/react';
import App, {TodosContext} from './App';
import {unmountComponentAtNode} from 'react-dom';
import Enzyme, {shallow, mount} from 'enzyme';
import toJson from 'enzyme-to-json'
import Adapter from 'enzyme-adapter-react-16';
import {Provider} from "react-redux";
import store from "./core/redux/redux-form/store";
import TodosLists from "./todos-lists/todos-lists";
import {TodosService} from "./core/services/todos.service";
import * as fromTodosAction from "./core/redux/todos";

// @ts-ignore
(Enzyme as any).configure({adapter: new Adapter()})
describe('App', () => {
    let container = null as any;
    let app = null as any;
    beforeEach(() => {
        // cài đặt một DOM element như là target cho render
        container = document.createElement("div");
        document.body.appendChild(container);
        app = shallow(<App/>)
    });

    afterEach(() => {
        // dọn dẹp lúc thoát
        unmountComponentAtNode(container);
        container.remove();
        container = null;
    });

    it('should render correctly', () => expect(app).toMatchSnapshot());

    it('renders Todo\'s App', () => {
        render(<App/>);
        const linkElement = screen.getByText(/Todo's App/i);
        expect(linkElement).toBeInTheDocument();
    });

    it('renders TodoList', async () => {
        const fakeTodos = [
            {
                "userId": 1,
                "id": 1,
                "title": "delectus aut autem",
                "completed": false
            },
            {
                "userId": 1,
                "id": 2,
                "title": "quis ut nam facilis et officia qui",
                "completed": false
            },
            {
                "userId": 1,
                "id": 3,
                "title": "fugiat veniam minus",
                "completed": false
            }
        ] as any;

        // @ts-ignore
        jest.spyOn(global, "fetch").mockImplementation(() =>
            Promise.resolve({
                json: () => Promise.resolve(fakeTodos)
            })
        );
        const todosService = new TodosService();
        const data = await todosService.getTodos();
        await expect(data.length).toEqual(3);
        app.instance().componentWillUnmount();

        await act(async () => {
            render(
                <Provider store={store}>
                    <TodosContext.Provider value={app.state}>
                        <TodosLists/>
                    </TodosContext.Provider>
                </Provider>, container);
        });

        await expect(app.state().items.length).toEqual(3);

        const value = new fromTodosAction.DeleteTodo(3)
        app.instance().reducer(value);
        expect(app.state().items.length).toEqual(2);


        const valueEdit = new fromTodosAction.EditTodo({
            userId: 9,
            id: 2,
            title: 'xxxxxxx',
            completed: false
        })
        app.instance().reducer(valueEdit);
        expect(app.state().items[1].title).toEqual('xxxxxxx');
        // const linkElement = screen.getByText(/fugiat veniam minus/i);
        // await expect(linkElement).toBeInTheDocument();
    });

    it('add item to list', () => {
        const value = new fromTodosAction.AddTodo({
            userId: 9,
            id: 12,
            title: 'xxxxxxx',
            completed: false
        })
        app.instance().reducer(value);
        expect(app.state().items.length).toEqual(1);
    });
});
