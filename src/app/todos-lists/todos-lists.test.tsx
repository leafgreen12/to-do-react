import React, {useContext} from 'react';
import {act, render, screen} from '@testing-library/react';
import {unmountComponentAtNode} from 'react-dom';
import Enzyme, {shallow, mount} from 'enzyme';
import toJson from 'enzyme-to-json'
import Adapter from 'enzyme-adapter-react-16';
import {Provider} from "react-redux";
import store from "./../core/redux/redux-form/store";
import * as fromTodosAction from "./../core/redux/todos";
import TodosLists from "./todos-lists";
import {TodosService} from "../core/services/todos.service";
import App, {TodosContext} from "../App";

// @ts-ignore
(Enzyme as any).configure({adapter: new Adapter()})
describe('TodoList', () => {
    let container = null as any;
    let todosLists = null as any;
    beforeEach(() => {
        // cài đặt một DOM element như là target cho render
        container = document.createElement("div");
        document.body.appendChild(container);
        todosLists = shallow(<TodosLists/>)
    });

    afterEach(() => {
        // dọn dẹp lúc thoát
        unmountComponentAtNode(container);
        container.remove();
        container = null;
    });

    it('should render todosLists correctly', () => expect(todosLists).toMatchSnapshot());
});
