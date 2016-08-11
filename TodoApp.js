const {
  InputField,
  TodoHeader,
  TodoList
} = window.App;
// 10.3.2.2. 將新增邏輯抽成一個 function
const _createTodo = (todos, title) => {
  todos.push({
    id: todos[todos.length - 1].id + 1,
    title,
    completed: false
  });
  return todos;
};

// 10.4.2.2. 將編輯邏輯抽成一個 function
const _updateTodo = (todos, id, title) => {
  const target = todos.find((todo) => todo.id === id);
  if (target) target.title = title;
  return todos;
};

const _toggleTodo = (todos, id, completed) => {
  const target = todos.find((todo) => todo.id === id);
  if (target) target.completed = completed;
  return todos;
};

const _deleteTodo = (todos, id) => {
  const idx = todos.findIndex((todo) => todo.id === id);
  if (idx !== -1) todos.splice(idx, 1);
  return todos;
};

class TodoApp extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      todos: [
        {
          id: 0,
          title: 'Item 1',
          completed: false
        },
        {
          id: 1,
          title: 'Item 2',
          completed: false
        },
        {
          id: 2,
          title: 'Item 3',
          completed: false
        }
      ]
    };
  }

  //10.4.3. 重構 TodoApp 元件，如果你發現 TodoApp 渲染 InputField 和 TodoList 元件時，傳遞的 callback 結構都長得很相似，那你應該會跟我一樣手癢：
  updateTodosBy(updateFn) {
    return (...args) => {
      this.setState({
        todos: updateFn(this.state.todos, ...args)
      });
    };
  }


  render() {
    const { todos } = this.state;
    return (
      <div>
        <TodoHeader
          title="我的待辦清單"
          username="Jason"
          todoCount={todos.filter((todo) => !todo.completed).length}
        />
        <InputField
           // 10.3.2.1. 呼叫 _createTodo，更新 todos 狀態
          placeholder="新增待辦清單"
          // 10.4.3 重構
          onSubmitEditing={
            this.updateTodosBy(_createTodo)
            // (title) => this.setState({
            //   todos: _createTodo(todos, title)
            // })
          }
        />
        <TodoList
          todos={todos}
          // 10.4.2.1. 呼叫 _updateTodo，更新 todos 狀態
          onUpdateTodo={this.updateTodosBy(_updateTodo)}
          onToggleTodo={this.updateTodosBy(_toggleTodo)}
          onDeleteTodo={this.updateTodosBy(_deleteTodo)}
        />
      </div>
    );
  }
}

window.App.TodoApp = TodoApp;
