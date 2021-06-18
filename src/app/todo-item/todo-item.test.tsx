import {act, render, screen} from '@testing-library/react';
import {unmountComponentAtNode} from 'react-dom';
import Enzyme, {shallow, mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import TodoItem from "./todo-item";
import {TodoModel} from "../core/interfaces/todo.interface";
import * as fromTodosAction from "../core/redux/todos";

// @ts-ignore
(Enzyme as any).configure({adapter: new Adapter()})
describe('TodoItem', () => {
    let container = null as any;
    let todoItem = null as any;
    beforeEach(() => {
        // cài đặt một DOM element như là target cho render
        container = document.createElement("div");
        document.body.appendChild(container);
        const item = {
            "userId": 1,
            "id": 3,
            "title": "fugiat veniam minus",
            "completed": false
        }
        const editItem = (data: TodoModel) => {};
        todoItem = shallow(<TodoItem item={item} delete={null} edit={editItem}/>)
    });

    afterEach(() => {
        // dọn dẹp lúc thoát
        unmountComponentAtNode(container);
        container.remove();
        container = null;
    });

    it('should render todosLists correctly', () => expect(todoItem).toMatchSnapshot());

    it('toggle edit', () => {
        todoItem.find('.edit-button').simulate('click');
        expect(todoItem.find('.done-button').text()).toBe('Done');
        expect(todoItem.find('.input-text').getElement()).toBeTruthy();
        expect(todoItem).toMatchSnapshot()

        todoItem.find('.done-button').simulate('click');
        expect(todoItem.find('.edit-button').text()).toBe('Edit');

    });
});
