import React from 'react';
import ReactDOM from 'react-dom';
import styles from './InputItem.css'
class InputItem extends React.Component {
  constructor(props){
    super(props);
  }
  state = {
    funcOnChange:this.props.onChange,
    funcOnBlur:this.isFunction(this.props.onBlur)?this.props.onBlur:()=>{},
    funcOnFocus:this.isFunction(this.props.onFocus)?this.props.onFocus:()=>{},
    enteredValue:this.props.value?this.props.value:'',
    enteredCaption:this.props.caption?this.props.caption:'',
    enteredPlaceholder: this.props.placeholder?this.props.placeholder:'',
    focused:false,
    blurred:false,
    // error:this.props.error
  }
  isFunction(property){
      if(typeof property==='function') return true
      else {
          // console.log('notFunction')
        return false
      }
  }
  loadInputStyle(){
      if (this.props.error==='true'&&!this.state.focused){return styles.input__error}
      else if (this.state.focused){return styles.input__focused}
      else return styles.input__blurred
      
    //   else {return styles.input__blurred} 
  }
  handleChange(e){
    const { onChange } = this.props;
    if (onChange) {
      onChange(e.target.value);
    }
  }
  render() {
      return(
        <div className={this.loadInputStyle()}>
            <div className={styles.input__caption}>{this.state.enteredCaption}</div>
            <div className={styles.input__icon}></div>
            <input className={styles.input__field__normal}
            error={this.props.error}
            value={this.props.value}
            onChange={this.handleChange.bind(this)}
            onBlur={()=>{
                this.state.funcOnBlur
                this.setState({
                    blurred:true,
                    focused:false
                })
            }}
            onFocus={()=>{
                this.state.funcOnBlur
                this.setState({
                    focused:true
                })
            }}
            placeholder={this.state.enteredPlaceholder}
            type={this.props.type}
            />
        </div>
      )
  }
}
export default InputItem;