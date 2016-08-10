const { InputField } = window.App;

class TodoItem extends React.Component {
  constructor(props, context) {
    super(props, context);

    // 1. 使用 class constructor (類別建構子) 初始元件狀態
    this.state = { editable: false };

    // 7. 在 ES6 component class 中，你必須手動綁定 this
    this.toggleEditMode = this.toggleEditMode.bind(this);
  }

  toggleEditMode() {
    // 6. 更新元件狀態來切換模式
    this.setState({ editable: !this.state.editable });
  }

  renderViewMode() {
    // 3. 將原本渲染「瀏覽模式」的程式，移至這裡
    const {
      title,
      completed,
      // 9.3.1. 當刪除按鈕被點選，觸發上層元件 (TodoList) 傳遞的 onDelete callback
      onDelete
    } = this.props;
    return (
      <div>
        <input type="checkbox" checked={completed} />
        <span onDoubleClick={this.toggleEditMode}>{title}</span>
        <button onClick={() => onDelete && onDelete()}>x</button>
      </div>
    );
  }

  renderEditMode() {
    const { title } = this.props;
    return (
      // 4. 「編輯模式」使用 InputField 元件
      <InputField
        // 5. autoFocus 讓使用者切換到編輯模式後，可以立即編打
        autoFocus
        placeholder="編輯待辦事項"
        value={title}
        onBlur={this.toggleEditMode} // 8. 當使用者點擊其他地方，則切換為「瀏覽模式」

        // 9. 當使用者按下 ESC，則切換為「瀏覽模式」
        onKeyDown={(e) => {
          if (e.keyCode === 27) {
            e.preventDefault();
            this.toggleEditMode();
          }
        }}
      />
    );
  }

  render() {
    // 2. 判斷目前模式為何，渲染不同的畫面
    return this.state.editable ?
      this.renderEditMode() :
      this.renderViewMode();
  }
}

TodoItem.propTypes = {
  title: React.PropTypes.string.isRequired,
  completed: React.PropTypes.bool.isRequired,
  // 9.3.2. 完成 onDelete 的 propTypes or defaultProps
  onDelete: React.PropTypes.func
};

window.App.TodoItem = TodoItem;
