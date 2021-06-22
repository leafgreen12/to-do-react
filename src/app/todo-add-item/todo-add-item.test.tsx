import React from 'react';
import {unmountComponentAtNode} from 'react-dom';
import Enzyme, {mount, ReactWrapper} from 'enzyme';
import {Provider} from "react-redux";
import Adapter from 'enzyme-adapter-react-16';
import {TodoAddItem} from "./todo-add-item";
import configureStore from 'redux-mock-store';
import App from "../App";

const mockStore = configureStore();
const mockDispatchfn = jest.fn();
// @ts-ignore
(Enzyme as any).configure({adapter: new Adapter()})
describe('TodoAddItem', () => {
    let container = null as any;
    let todoAddItem = {} as ReactWrapper<TodoAddItem>;
    beforeEach(() => {
        // cài đặt một DOM element như là target cho render
        container = document.createElement("div");
        document.body.appendChild(container);
        todoAddItem = mount(
            <App>
                <Provider store={mockStore()}>
                    <TodoAddItem dispatch={mockDispatchfn}/>
                </Provider>
            </App>
        )
    });

    afterEach(() => {
        // dọn dẹp lúc thoát
        unmountComponentAtNode(container);
        container.remove();
        container = null;
    });

    it('required submit false', () => {
        todoAddItem.find('form').simulate('submit')
        expect(todoAddItem.find('.error-text').text()).toBe('Required');

    });

    it('Must be 10 characters or less submit false', () => {
        todoAddItem.find('.input-text').simulate('change', { target: { value: 'Helloxxxxxxxxxxxx' } })
        todoAddItem.find('form').simulate('submit')
        expect(todoAddItem.find('.error-text').text()).toBe('Must be 10 characters or less');
    });

});
