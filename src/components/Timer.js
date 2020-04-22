// Modified version of Simple Timer class by Egor Egorov
// https://medium.com/@650egor/react-30-day-challenge-day-1-simple-timer-df85d0867553

const React = require('react')
const ms = require('pretty-ms')

class Timer extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      time: 0,
      isOn: false,
      start: 0,
      begin: 240000 // 4 mins -> millis
    }

    this.startTimer = this.startTimer.bind(this)
    this.pauseTimer = this.pauseTimer.bind(this)
    this.resetTimer = this.resetTimer.bind(this)
  }

  sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
  }

  componentDidUpdate(prevProps) {
    if((this.props.startCount !== prevProps.startCount)) {
      this.pauseTimer()
      this.resetTimer()
      this.sleep(1).then(() => { // Ensures reset happens before resume
        this.startTimer()
      })
    }
  }

  startTimer() {
    this.setState({isOn: true, time: this.state.time, start: Date.now() - this.state.time})
    this.timer = setInterval(() => this.setState({time: Date.now() - this.state.start}), 1);
  }

  pauseTimer() {
    this.setState({isOn: false})
    clearInterval(this.timer)
  }

  resetTimer() {
    this.setState({time: 0, isOn: false})
  }

  getTimeRemaining = () => {
    let rem = this.state.begin - this.state.time
    return rem > 0 ? rem : 0
  }

  render() {

    let Start = (this.state.time === 0) ?
      <button onClick={this.startTimer}>Start</button> :
      null

    let Pause = (this.state.time === 0 || !this.state.isOn) ?
      null :
      <button onClick={this.pauseTimer}>Pause</button>

    let Resume = (this.state.time === 0 || this.state.isOn) ?
      null :
      <button onClick={this.startTimer}>Resume</button>

    let Reset = (this.state.time === 0 || this.state.isOn) ?
      null :
      <button onClick={this.resetTimer}>Reset</button>

    return(
      <div>
        <h3>Time Remaining: {ms(this.getTimeRemaining())}</h3>
        {Resume}
        {this.getTimeRemaining() > 0 && Pause}
      </div>
    )
  }
}

module.exports = Timer