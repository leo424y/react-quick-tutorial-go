const { TodoItem } = window.App;

class TodoList extends React.Component {
  render() {
    const { todos } = this.props; // 1. 從 props 中，取得 todos (待辦清單) 陣列
    // 2. 將每一筆項目轉成 li 元素，並塞入對應的待辦資料
    //    PS. 務必給每筆 li 唯一 key（詳見[學習筆記 1]）
    const todoElements = todos.map((todo) => (
      <li key={todo.id}>
        <TodoItem
          title={todo.title}
          completed={todo.completed}
        />
      </li>
    ));
    return <ul>{todoElements}</ul>;
  }
}
TodoList.propTypes = {
  todos: React.PropTypes.arrayOf(React.PropTypes.object).isRequired
};

window.App.TodoList = TodoList;
