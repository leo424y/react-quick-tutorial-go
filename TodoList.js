const { TodoItem } = window.App;

class TodoList extends React.Component {
  render() {
    // 將 title 和 completed 依序傳遞給 TodoItem；
    // 傳遞參數的方式，就如同定義 HTML 元素的屬性
    return (
      <ul>
        <li>
          <TodoItem
            title="Item 1"
            completed={true}
          />
        </li>
        <li>
          <TodoItem
            title="Item 2"
            completed={false}
          />
        </li>
        <li>
          <TodoItem
            title="Item 3"
            completed={false}
          />
        </li>
      </ul>
    );
  }
}

window.App.TodoList = TodoList;
