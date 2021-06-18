import TodosList from './todos-lists/todos-lists';

const routes = [
    {
        path : '/',
        exact : false,
        main : () => <TodosList />
    }
];

export default routes;
