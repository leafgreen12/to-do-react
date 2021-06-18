import React, {Component} from 'react';
import './todo-add-item.scss';
import * as fromTodosAction from '../core/redux/todos';
import {Field, reduxForm} from 'redux-form';
import {validate} from '../core/redux/redux-form/sync-validation-form';

class TodoAddItem extends Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {value: ''};
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event: any) {
        this.setState({value: event.target?.value ? event.target.value : ''});
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
                    <input {...(x.input)} placeholder={x.placeholder} type={x.type}/>
                    {x.meta.touched &&
                    ((x.meta.error &&
                        <p className="error-text error-text-char-max">{x.meta.error}</p>) ||
                        (x.meta.warning && <span>{x.meta.warning}</span>))}
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
    form: 'title', // a unique name for this form
    validate // <--- validation function given to redux-form
})(TodoAddItem as any);
export default TodoAddItem;
