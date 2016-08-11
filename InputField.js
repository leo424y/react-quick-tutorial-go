class InputField extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = { value: props.value || '' };
    this.handleChange = this.handleChange.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  handleChange(e) {
    this.setState({ value: e.target.value });
  }
  // 10.3.1. 傾聽使用者 keydown 事件：
  //    當使用者按下 enter (keyCode = 13) 後，
  //    呼叫上層傳遞的 onSubmitEditing callback，
  //    將資料傳遞給上層元件。
  handleKeyDown(e) {
    const {
      onKeyDown,
      onSubmitEditing
    } = this.props;
    const { value } = this.state;
    switch (e.keyCode) {
      case 13:
      // 10.3.2. 如果使用者沒有鍵入任何值（包括都是空白），則不會呼叫 callback
        if (value.trim()) {
          onSubmitEditing && onSubmitEditing(value);
        }
        // 10.3.3. 將輸入框資料清空
        //e.target.value = '';
        this.setState({ value: '' });
        break;
    }
    // 10.3.4. 如果上層元件傳遞 onKeyDown callback，我們必須觸發它
    onKeyDown && onKeyDown(e);
  }

  render() {
    return (
      <input
        {...this.props}
        type="text"
        value={this.state.value}
        onChange={this.handleChange}
        // 10.3.5. 傾聽 input 的 onKeyDown 事件
        onKeyDown={this.handleKeyDown}
      />
    );
  }
}
// 10.3.6. 完成 onSubmitEditing 的 propTypes
InputField.propTypes = {
  onSubmitEditing: React.PropTypes.func
};

window.App.InputField = InputField;
