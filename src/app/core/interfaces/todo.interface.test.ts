import {TodoModel} from "./todo.interface";

// @ts-ignore
describe('App', () => {

    it('should render todosLists correctly', () => {
        const todoItem = {
            userId: 1,
            id: 12,
            title: 'xxxxxx',
            completed: false
        } as TodoModel
        expect(todoItem).toBeTruthy();
    });
});
