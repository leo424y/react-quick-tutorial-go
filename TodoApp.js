const {
  InputField,
  TodoHeader,
  TodoList
} = window.App;

// 9.3.7. 將刪除邏輯抽成一個 function
const _deleteTodo = (todos, id) => {
  const idx = todos.findIndex((todo) => todo.id === id);
  if (idx !== -1) todos.splice(idx, 1);
  return todos;
};

class TodoApp extends React.Component {
  constructor(props, context) {
    super(props, context);

    // 9.3.4. 將 todos 搬到 state 中：
    //    放在 state 的好處是當使用 this.setState() 更新 todos 後，
    //    React 會幫你重新 render，讓使用者看到最新的畫面。
    //
    //    PS. React 的資料模型分兩種：props、state，
    //    你應該盡可能讓底層元件存取資料的方式是使用 props，
    //    所以我們將 todos 儲存在上層元件 (TodoApp) 的 state 中。
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

  render() {

    // 9.3.5. 從 state 中取得 todos
    const { todos } = this.state;
    return (
      <div>
        <TodoHeader
          title="我的待辦清單"
          username="Jason"
          todoCount={todos.filter((todo) => !todo.completed).length}
        />
        <InputField placeholder="新增待辦清單" />
        <TodoList
          todos={todos}

          // 9.3.6. 呼叫 _deleteTodo，更新 todos 狀態
          onDeleteTodo={
            (...args) => this.setState({
              todos: _deleteTodo(todos, ...args)
            })
          }
        />
      </div>
    );
  }
}

window.App.TodoApp = TodoApp;
