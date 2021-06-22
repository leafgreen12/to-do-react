import React from 'react';
import {unmountComponentAtNode} from 'react-dom';
import Enzyme, {shallow, mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import App from "./app/App";

// @ts-ignore
(Enzyme as any).configure({adapter: new Adapter()})
describe('Index', () => {
    let app = null as any;
    beforeEach(() => {
        // cài đặt một DOM element như là target cho render
        app = shallow(<App/>)
    });

    it('should render correctly', () => expect(app).toMatchSnapshot());
});
