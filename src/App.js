import React, { Component } from 'react'
import './style.css';
import todos from './Todos.js'
export default class App extends Component {
  constructor () {
    super();
    this.state  = {
      isUpdateTodo: false,
      updateTodo: {},
      createTodoText: '',
      updateTodoText: '',
      todos: todos
    }
  }
  _toggleTodoCompletion = (todoId) => {
    //mutating way
    // let {todos} = this.state
    // let todosIndex = todos.findIndex(todo => todo.id == todoId);
    // let todo = todos[todosIndex];
    // let newTodo = {
    //   id: Date.now(),
    //   text: todo.text,
    //   complete: !todo.complete
    // }
    // todos.splice(todosIndex, 1, newTodo);
    // this.setState({todos: todos})
    //non mutating way
    let todos = this.state.todos.map(todo => {
      if (todo.id === todoId) {
        return {
          id: todoId,
          complete: !todo.complete,
          text: todo.text
        }
      }else {
        return todo;
      }
    });
    this.setState({todos});
  }
  _updateTodo (todoId) {
    console.log('update todo');
    const {todos, updateTodoText} = this.state;
    let updatedTodos = todos.map(todo => {
      if (todo.id === todoId) {
        return {
          id: todo.id,
          completion: todo.id,
          text: updateTodoText,
        }
      } else {
        return todo
      }
    })
    if (updateTodoText.length > 2) {
      this.setState({todos: updatedTodos, isUpdateTodo: false})
    }else {
      alert('text should be more than 2 characters');
    }
  }
  _createTodo (todoId) {
    const {todos, createTodoText} = this.state;
    const newTodo = {
      id: Date.now(),
      text: createTodoText,
      complete: false
    }
    const newTodos = [...todos, newTodo]
    if (createTodoText.length > 2) {
      this.setState({todos: newTodos, createTodoText:''})
    } else {
      alert('text should be more than 2 characters');
    }
  }
  _deleteTodo = (todoId) => {
    let todos = this.state.todos.filter(todo => todo.id !== todoId);
    this.setState({todos, isUpdateTodo: false});
  }
  _createTodoText = (event) =>  {
    this.setState ({
      createTodoText: event.target.value
    })

  }
  _updateTodoText =  (event) => {
    console.log('event');
    this.setState({
      updateTodoText : event.target.value
    })
  }
  _updateKeyDown = (e) => {
    if (e.keyCode === 13) {
      return this._updateTodo(this.state.updateTodo.id);
    } 
  }
  _createKeyDown = (e) => {
    if (e.keyCode === 13) {
      return this._createTodo()
    } 
  }
  _editTodo = (todoId) => {
    console.log('_edittodo')
    let todo = this.state.todos.find(todo => todo.id === todoId )
    this.setState({
      isUpdateTodo: true,
      updateTodo: todo,
      updateTodoText: todo.text
    })
  }
  render() {
    console.log(this.state)
    const {todos, isUpdateTodo, updateTodoText, createTodoText} = this.state;
    return (
      <div>
        <h1>All todos</h1>
        {
          todos.length ? null : <h4 className='red'> You don't have any todo </h4>
        }
        <ul>
          {
            todos.map(todo => {
             return <GenerateList
                      _editTodo={this._editTodo}
                      _deleteTodo={this._deleteTodo}
                      _toggleTodoCompletion={this._toggleTodoCompletion}
                      key={todo.id}
                      todo={todo} />
            })
          }
        </ul>
        {
          isUpdateTodo ? 
            <div>
              <h1>Update todo</h1>
              <input onKeyDown={this._updateKeyDown} onChange={this._updateTodoText} value={updateTodoText} type="text"/>
              <button onClick={() => {
                this._updateTodo(this.state.updateTodo.id)
              }}>update todo</button>
            </div> : null
        }
        <h1>create todo</h1>
        <input onChange={this._createTodoText} onKeyDown={this._createKeyDown} value={createTodoText} type="text"/>
        <button onClick={() => this._createTodo() }>create todo</button>
      </div>
    )
  }
}

const GenerateList = (props) => {
  const {todo, _editTodo, _deleteTodo, _toggleTodoCompletion} = props;
  return todo.complete ? 
  <li className="complete">
    <span onClick={() => _toggleTodoCompletion(todo.id)} className="complete">{todo.text}</span>
    <button onClick={() => { _editTodo(todo.id) }}>edit</button>
    <button onClick={() => {_deleteTodo(todo.id)}}>delete</button>
  </li> : 
  <li>
    <span onClick={() => _toggleTodoCompletion(todo.id)}>{todo.text}</span>
    <button onClick={() => { _editTodo(todo.id) }}>edit</button>
    <button onClick={() => {_deleteTodo(todo.id)}}>delete</button>
  </li>
} 
