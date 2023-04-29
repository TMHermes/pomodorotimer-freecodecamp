const audio = document.getElementById('beep');

class App extends React.Component {
  
  state = {
    currentPeriod: 'Session',
    breakCount: 5,
    sessionCount: 25,
    clockCount: 25 * 60,
    isCounting: false
  }
  
  constructor(props) {
    super(props);
    this.interval = undefined;
  }
  
  componentDidMount() {
    clearInterval(this.interval);
  }
  
  handlePlayPause = () => {
    const { isCounting } = this.state
    if (isCounting) {
      clearInterval(this.interval);
      this.setState({
        isCounting: false
      });
    } else {
      this.setState({
        isCounting: true
      });
      
      this.interval = setInterval(() => {
        const {
          clockCount,
          currentPeriod,
          breakCount,
          sessionCount
        } = this.state;
        
        if(clockCount === 0) {
          this.setState({
            currentPeriod: (currentPeriod === 'Session') ? 'Break' : 'Session',
            clockCount: (currentPeriod === 'Session') ? (breakCount * 60) : (sessionCount * 60)
          });
          audio.play();
        } else {
          this.setState({
            clockCount: clockCount - 1
         });
       }      
     }, 1000);    
  } 
}
      
   
  
  
 handleReset = () => {
   this.setState({
    currentPeriod: "Session",
    breakCount: 5,
    sessionCount: 25,
    clockCount: 25 * 60,
    isCounting: false
   })
  clearInterval(this.interval);
  audio.pause();
  audio.currentTime = 0;
}

  convertToTime = (value) => {
    let minutes = Math.floor(value/60);
    let seconds = value % 60;
    minutes = minutes < 10 ? ('0'+minutes) : minutes;
    seconds = seconds < 10 ? ('0'+seconds) : seconds;
    return `${minutes}:${seconds}`;
  }
  
  handleLength = (count, period) => {
    const { breakCount, sessionCount, isCounting, currentPeriod} = this.state;
    let newCount;
    if (period === 'session') {
      newCount = sessionCount + count;
    } else {
      newCount = breakCount + count;
    }
    if(newCount > 0  && newCount < 61 && !isCounting){     
      this.setState({
        [`${period}Count`]: newCount       
      });
    if(currentPeriod.toLowerCase() === period){
      this.setState({
        clockCount: newCount * 60
      })
    }
     }  
} 
  
  render(){
    const { breakCount,
            sessionCount,
            clockCount,
            currentPeriod,
           } = this.state;
    
    const breakProps = {
      title: 'Break',
      count: breakCount,
      handleDecrease: () => this.handleLength(-1, 'break'),
      handleIncrease: () => this.handleLength(1, 'break')
    }
    
    const sessionProps = {
      title: 'Session',
      count: sessionCount,
      handleDecrease: () => this.handleLength(-1, 'session'),
      handleIncrease: () => this.handleLength(1, 'session')
    }
  
  return (
    <>
     <div id="container">
      <div className="title">25 + 5 Clock</div>
      <div className="timer">
        <div className="clock-wrapper">
          <div id="timer-label">{currentPeriod}</div>
          <div id="time-left">{this.convertToTime(clockCount)}</div>
        </div>
      </div>
      <div className="clock-control">
        <button id="start_stop" onClick={this.handlePlayPause}>Play/Pause</button>
        <button id="reset" onClick={this.handleReset}>Reset</button>
       </div>
       <Timer {...breakProps} />
       <Timer {...sessionProps} />
      <div className="author">
          Created by 
          <br />  
          <a href="https://github.com/TMHermes">THermes</a>
          </div>
      </div>
    </>
  );
}
}

const Timer = (props) => {
  const id = props.title.toLowerCase();
  return (
  <div className="lengths">
    <h2 id={`${id}-label`}>{props.title} Length</h2>
    <div className="actions-wrapper">
      <button id={`${id}-decrement`} onClick={props.handleDecrease}>Down</button>
      <span id={`${id}-length`}>{props.count}</span>
      <button id={`${id}-increment`} onClick={props.handleIncrease}>Up</button>
    </div>
  </div>
  )
}

const root = ReactDOM.createRoot(document.getElementById('app'));
root.render(<App />);


