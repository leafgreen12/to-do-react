import React, {Component} from 'react';
import './todo-item.scss';

class TodoItem extends Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            showEdit: false,
            value: this.props.item
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
    }

    handleChange(event: any) {
        const value = {
            userId: this.state.value.userId,
            id: this.state.value.id,
            title: event.target?.value,
            completed: this.state.value.completed
        }
        this.setState({
            value
        });
    }

    handleCheckboxChange(event: any) {
        const value = {
            userId: this.state.value.userId,
            id: this.state.value.id,
            title: this.state.value.title,
            completed: event.target?.checked
        }
        this.setState({
            value,
        });
    }

    private delete(event: number) {
        this.props.delete(event)
    }

    private editTodo() {
        this.props.edit(this.state.value)
        this.showEdit(false);
    }

    private showEdit(value: boolean) {
        this.setState({showEdit: value})
    }

    render() {
        const input = this.state.showEdit ?
            <input value={this.state.value.title} onChange={(event) => this.handleChange(event)} type="text"/> :
            <label>{this.state.value.title}</label>
        const button = !this.state.showEdit ?
            <button className={'edit-button'} type={"button"} onClick={($event) => this.showEdit(true)}>Edit</button> :
            <button className={'done-button'} type={"button"} onClick={($event) => this.editTodo()}>Done</button>
        return (
            <div className="list-item">
                <div>
                    <input className={'input-text'} onChange={(event) => this.handleCheckboxChange(event)} checked={this.state.value.completed}  type="checkbox"/>
                    {input}
                    {!this.state.value.completed ? button : null}
                </div>
                {!this.state.value.completed ?
                    <button type="button" onClick={($event) => this.delete(this.state.value.id)}>X</button> : null}
            </div>
        );
    }
}

export default TodoItem;
