import React, {Component} from 'react';
import './todo-add-item.scss';
import * as fromTodosAction from '../core/redux/todos';
import {Field, reduxForm} from 'redux-form';
import {validate} from '../core/redux/redux-form/sync-validation-form';

export class TodoAddItem extends Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {value: ''};
    }

    addItem(data: any) {
        const {onSubmit} = this.props;

        if (data) {
            const value = {...data}
            onSubmit(new fromTodosAction.AddTodo({
                userId: 9,
                id: 12,
                title: value.title,
                completed: false
            }));
        }
    }

    submitMyForm(data: any) {
        const {reset} = this.props;
        this.addItem(data)
        reset();
    }

    render() {
        const renderField = (x: any) => (
            <div>
                <label>{x.name}</label>
                <div>
                    <input className={"input-text"} {...(x.input)} placeholder={x.placeholder} type={x.type}/>
                    <p className="error-text">
                        {x.meta.touched && ((x.meta.error && x.meta.error) || (x.meta.warning && x.meta.warning))}
                    </p>
                </div>
            </div>
        )
        const {handleSubmit} = this.props;
        return (
            <div>
                <form onSubmit={handleSubmit(this.submitMyForm.bind(this))}>
                    <Field
                        name="title"
                        component={renderField}
                        type="text"
                        placeholder="title"
                    />
                    <button className={"create-task"} type="submit">Add new</button>
                </form>
            </div>
        );
    }
}

// @ts-ignore
TodoAddItem = reduxForm({
    form: 'title',
    validate
})(TodoAddItem as any)

export default TodoAddItem;
