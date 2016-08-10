const { TodoItem } = window.App;

class TodoList extends React.Component {
  render() {
    const {
      todos,
      onDeleteTodo
    } = this.props;
    const todoElements = todos.map((todo) => (
      <li key={todo.id}>
        <TodoItem
          title={todo.title}
          completed={todo.completed}

          // 9.3.3. 當待辦項目被刪除，觸發上層元件 (TodoApp) 傳遞的 onDeleteTodo callback：
          //    callback 必須傳遞 todo 的 id，讓上層元件知道哪一筆項目需要刪除；
          //    使用 props 傳遞 callback 的好處是，可以不用在底層 view 元件中加入業務邏輯。
          //
          //    小筆記：讓 view 元件職責簡單，只需顯示 props 的資料，和呼叫 props 中相對應的 callback
          onDelete={() => onDeleteTodo && onDeleteTodo(todo.id)}
        />
      </li>
    ));
    return <ul>{todoElements}</ul>;
  }
}

TodoList.propTypes = {
  todos: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
  onDeleteTodo: React.PropTypes.func
};

window.App.TodoList = TodoList;
