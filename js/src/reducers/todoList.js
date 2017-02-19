import { fromJS } from 'immutable';

import {
  INPUT_CHANGE,
  ADD_TODO,
  MARK_AS_DONE,
  ARCHIVE,
} from '../actions/todoList';

const initialState = fromJS({
  todos: [
    {
      id: '1',
      description: "hello",
      date: '06/13/2017'
    },
    {
      id: '2',
      description: "hello",
      date: '06/13/2017'
    },
    {
      id: '3',
      description: "hello",
      date: '06/13/2017'
    },
    {
      id: '4',
      description: "hello",
      date: '06/13/2017'
    },
    {
      id: '5',
      description: "hello",
      date: '06/13/2017'
    },
    {
      id: '6',
      description: "hello",
      date: '06/13/2017'
    },
    {
      id: '7',
      description: "hello",
      date: '06/13/2017'
    },
  ],
  archive: [],
  done: [],
  form: {
    description: '',
    date: '',
  },
});

export default function reducer(state=initialState, action) {

  switch(action.type) {
    case INPUT_CHANGE:
      return inputChange(state, action.payload);
    case ADD_TODO:
      return addTodo(state, action.payload);
    case MARK_AS_DONE:
      return markAsDone(state, action.payload);
    case ARCHIVE:
      return archive(state, action.payload);
    default:
      return state;
  }

}


function inputChange(state, payload) {

  let input = payload.input;
  let value = payload.value;

  return state.setIn(['form', input], value);

}

function addTodo(state, payload) {

  let description = payload.description;
  let dueDate = payload.dueDate;
  let id = payload.id;

  let todo = fromJS({
    description,
    date:dueDate,
    id
  });
  let todos = state.get('todos');
  todos = todos.push(todo);

  return state.set('todos', todos);

}

function markAsDone(state, payload) {

  let id = payload.id;
  let [todo, index] = getTodo(state.get('todos'), id);
  let todos = state.get('todos');

  if(index >= 0) {
    todos = todos.delete(index);

    state = state.set('todos', todos);

    let done = state.get('done');
    done = done.push(todo);

    return state.set('done', done);
  }

  return state;

}

function getTodo(todos, id) {

  for(let i = 0; i < todos.size; i++) {
    let todo = todos.get(i);
    console.log(todo.get('id'));
    console.log(id);
    if(todo.get('id') === id) {
      return [todo, i];
    }
  }

  return [undefined, -1];

}

function archive(state, payload) {

  let id = payload.id;
  let [todo, index] = getTodo(state.get('todos'), id);
  let todos = state.get('todos');

  if(index >= 0) {
    todos = todos.delete(index);

    state = state.set('todos', todos);

    let archive = state.get('archive');
    archive = archive.push(todo);

    return state.set('archive', archive);
  }

  return state;

}
