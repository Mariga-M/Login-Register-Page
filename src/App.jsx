import React from 'react';
import "./App.scss";
import {Login, Register} from "./components/login/index";

class App extends React.Component {
  constructor(props) {
    super(props);
  
    this.state = {
       isLogginActive: true
    };
  }

  componentDidMount() {
    //Add .right by default
    this.rightSide.classList.add("right");
  }

  changeState() {
    //ES6 Object Destructuring
    const { isLogginActive } = this.state;
  
    //We togglet component classes depending on the current active state 
    if (isLogginActive) {
      //Right side for login
      this.rightSide.classList.remove("right");
      this.rightSide.classList.add("left");
    } else {
      //Left side for Register 
      this.rightSide.classList.remove("left");
      this.rightSide.classList.add("right");
    }
    //Of course we need to toggel the isLogginActive by inversing it's previous state 
    this.setState(prevState => ({ isLogginActive: !prevState.isLogginActive }));
  }
  
  render() {
    const { isLogginActive } = this.state;
    const current = isLogginActive ? "Register" : "Login";
    const currentActive = isLogginActive ? "login" : "register";
    return (
      <div className = "App">
        <div className = "login">
          <div classname = "container" ref = {ref =>(this.container + ref)}>
            {isLogginActive && (
            <Login containerRef = {ref => (this.current = ref)}/>
            )}
            {!isLogginActive && (
            <Register containerRef = {ref => (this.current = ref)}/>
            )}
          </div>
          <RightSide
            current={current}
            currentActive={currentActive}
            containerRef={ref => (this.rightSide = ref)}            
            onClick={this.changeState.bind(this)}
          />
        </div>        
      </div>
    );
  }
}
/*We also add custom container ref to pass ref to the App Component so we can 
easily manipulate the right-side container (React functional Component)*/
const RightSide = props => {
  return (
    <div
      className="right-side"
      ref={props.containerRef}
      onClick={props.onClick}
    >
      <div className="inner-container">
        <div className="text">{props.current}</div>
      </div>
    </div>
  );
};

export default App;