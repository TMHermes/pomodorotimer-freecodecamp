function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}const audio = document.getElementById('beep');

class App extends React.Component {









  constructor(props) {
    super(props);_defineProperty(this, "state", { currentPeriod: 'Session', breakCount: 5, sessionCount: 25, clockCount: 25 * 60, isCounting: false });_defineProperty(this, "handlePlayPause",







    () => {
      const { isCounting } = this.state;
      if (isCounting) {
        clearInterval(this.interval);
        this.setState({
          isCounting: false });

      } else {
        this.setState({
          isCounting: true });


        this.interval = setInterval(() => {
          const {
            clockCount,
            currentPeriod,
            breakCount,
            sessionCount } =
          this.state;

          if (clockCount === 0) {
            this.setState({
              currentPeriod: currentPeriod === 'Session' ? 'Break' : 'Session',
              clockCount: currentPeriod === 'Session' ? breakCount * 60 : sessionCount * 60 });

            audio.play();
          } else {
            this.setState({
              clockCount: clockCount - 1 });

          }
        }, 1000);
      }
    });_defineProperty(this, "handleReset",




    () => {
      this.setState({
        currentPeriod: "Session",
        breakCount: 5,
        sessionCount: 25,
        clockCount: 25 * 60,
        isCounting: false });

      clearInterval(this.interval);
      audio.pause();
      audio.currentTime = 0;
    });_defineProperty(this, "convertToTime",

    value => {
      let minutes = Math.floor(value / 60);
      let seconds = value % 60;
      minutes = minutes < 10 ? '0' + minutes : minutes;
      seconds = seconds < 10 ? '0' + seconds : seconds;
      return `${minutes}:${seconds}`;
    });_defineProperty(this, "handleLength",

    (count, period) => {
      const { breakCount, sessionCount, isCounting, currentPeriod } = this.state;
      let newCount;
      if (period === 'session') {
        newCount = sessionCount + count;
      } else {
        newCount = breakCount + count;
      }
      if (newCount > 0 && newCount < 61 && !isCounting) {
        this.setState({
          [`${period}Count`]: newCount });

        if (currentPeriod.toLowerCase() === period) {
          this.setState({
            clockCount: newCount * 60 });

        }
      }
    });this.interval = undefined;}componentDidMount() {clearInterval(this.interval);}

  render() {
    const { breakCount,
      sessionCount,
      clockCount,
      currentPeriod } =
    this.state;

    const breakProps = {
      title: 'Break',
      count: breakCount,
      handleDecrease: () => this.handleLength(-1, 'break'),
      handleIncrease: () => this.handleLength(1, 'break') };


    const sessionProps = {
      title: 'Session',
      count: sessionCount,
      handleDecrease: () => this.handleLength(-1, 'session'),
      handleIncrease: () => this.handleLength(1, 'session') };


    return /*#__PURE__*/(
      React.createElement(React.Fragment, null, /*#__PURE__*/
      React.createElement("div", { id: "container" }, /*#__PURE__*/
      React.createElement("div", { className: "title" }, "25 + 5 Clock"), /*#__PURE__*/
      React.createElement("div", { className: "timer" }, /*#__PURE__*/
      React.createElement("div", { className: "clock-wrapper" }, /*#__PURE__*/
      React.createElement("div", { id: "timer-label" }, currentPeriod), /*#__PURE__*/
      React.createElement("div", { id: "time-left" }, this.convertToTime(clockCount)))), /*#__PURE__*/


      React.createElement("div", { className: "clock-control" }, /*#__PURE__*/
      React.createElement("button", { id: "start_stop", onClick: this.handlePlayPause }, "Play/Pause"), /*#__PURE__*/
      React.createElement("button", { id: "reset", onClick: this.handleReset }, "Reset")), /*#__PURE__*/

      React.createElement(Timer, breakProps), /*#__PURE__*/
      React.createElement(Timer, sessionProps), /*#__PURE__*/
      React.createElement("div", { className: "author" }, "Created by", /*#__PURE__*/

      React.createElement("br", null), /*#__PURE__*/
      React.createElement("a", { href: "https://github.com/TMHermes" }, "THermes")))));




  }}


const Timer = props => {
  const id = props.title.toLowerCase();
  return /*#__PURE__*/(
    React.createElement("div", { className: "lengths" }, /*#__PURE__*/
    React.createElement("h2", { id: `${id}-label` }, props.title, " Length"), /*#__PURE__*/
    React.createElement("div", { className: "actions-wrapper" }, /*#__PURE__*/
    React.createElement("button", { id: `${id}-decrement`, onClick: props.handleDecrease }, "Down"), /*#__PURE__*/
    React.createElement("span", { id: `${id}-length` }, props.count), /*#__PURE__*/
    React.createElement("button", { id: `${id}-increment`, onClick: props.handleIncrease }, "Up"))));



};

const root = ReactDOM.createRoot(document.getElementById('app'));
root.render( /*#__PURE__*/React.createElement(App, null));