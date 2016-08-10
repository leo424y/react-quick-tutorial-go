const { TodoItem } = window.App;

class TodoList extends React.Component {
  render() {
    const {
      todos,
      onUpdateTodo,
      onToggleTodo,
      onDeleteTodo
    } = this.props;
    const todoElements = todos.map((todo) => (
      <li key={todo.id}>
        <TodoItem
          title={todo.title}
          completed={todo.completed}
          // 10.1.3. 當待辦狀態被切換，觸發上層元件 (TodoApp) 傳遞的 onToggleTodo callback
          onUpdate={(content) => onUpdateTodo && onUpdateTodo(todo.id, content)}
          onToggle={(completed) => onToggleTodo && onToggleTodo(todo.id, completed)}
          onDelete={() => onDeleteTodo && onDeleteTodo(todo.id)}
        />
      </li>
    ));
    return <ul>{todoElements}</ul>;
  }
}

TodoList.propTypes = {
  todos: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
  // 10.1.4. 完成 onToggleTodo 的 propTypes or defaultProps
  onUpdateTodo: React.PropTypes.func,
  onToggleTodo: React.PropTypes.func,
  onDeleteTodo: React.PropTypes.func
};

window.App.TodoList = TodoList;
