const { InputField } = window.App;

class TodoItem extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = { editable: false };
    this.toggleEditMode = this.toggleEditMode.bind(this);
  }

  toggleEditMode() {
    this.setState({ editable: !this.state.editable });
  }

  renderViewMode() {
    const {
      title,
      completed,
      onToggle,
      onDelete
    } = this.props;
    return (
      <div>
        <input
          type="checkbox"
          checked={completed}
          // 10.1.1. 當切換狀態的選擇框被點選，觸發上層元件 (TodoList) 傳遞的 onToggle callback
          onChange={() => onToggle && onToggle(!completed)}
        />
        <span onDoubleClick={this.toggleEditMode}>{title}</span>
        <button onClick={() => onDelete && onDelete()}>x</button>
      </div>
    );
  }

  renderEditMode() {
    const { title, onUpdate } = this.props;
    return (
      <InputField
        autoFocus
        placeholder="編輯待辦事項"
        // 10.4.1. 將 value 屬性改為 defaultValue：
        //    如果只給予 value，不給予 onChange callback，
        //    使用者輸入的資料將不會被更新，因此改為 defaultValue。
        //defaultValue={title}
        value={title}
        onBlur={this.toggleEditMode}
        onKeyDown={(e) => {
          if (e.keyCode === 27) {
            e.preventDefault();
            this.toggleEditMode();
          }
        }}
        // 10.4.1.2. 傳遞 onSubmitEditing callback，該 callback 做兩件事情：
        //    a. 呼叫上層元件的 onUpdate callback
        //    b. 切換為「預覽模式」
        // 10.4.2.6. 加入 onSubmitEditing callback
        onSubmitEditing={(content) => {
          onUpdate && onUpdate(content);
          this.toggleEditMode();
        }}
      />
    );
  }

  render() {
    return this.state.editable ?
      this.renderEditMode() :
      this.renderViewMode();
  }
}

TodoItem.propTypes = {
  title: React.PropTypes.string.isRequired,
  completed: React.PropTypes.bool.isRequired,
  // 10.1.2. 完成 onToggle 的 propTypes or defaultProps
  onUpdate: React.PropTypes.func,
  onToggle: React.PropTypes.func,
  onDelete: React.PropTypes.func
};

window.App.TodoItem = TodoItem;
