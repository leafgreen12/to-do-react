import React, {useContext} from 'react';
import {act, render, screen} from '@testing-library/react';
import {unmountComponentAtNode} from 'react-dom';
import Enzyme, {shallow, mount} from 'enzyme';
import toJson from 'enzyme-to-json'
import Adapter from 'enzyme-adapter-react-16';
import TodoAddItem from "./todo-add-item";

// @ts-ignore
(Enzyme as any).configure({adapter: new Adapter()})
describe('TodoAddItem', () => {
    let container = null as any;
    let todoAddItem = null as any;
    beforeEach(() => {
        // cài đặt một DOM element như là target cho render
        container = document.createElement("div");
        document.body.appendChild(container);
        todoAddItem = shallow(<TodoAddItem dispatch={(action: any) => null} onSubmit={(action: any) => null}/>)
    });

    afterEach(() => {
        // dọn dẹp lúc thoát
        unmountComponentAtNode(container);
        container.remove();
        container = null;
    });

    it('should render todoAddItem correctly', () => expect(todoAddItem).toMatchSnapshot());
});
