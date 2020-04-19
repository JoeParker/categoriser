// Simple Timer class by Egor Egorov
// https://medium.com/@650egor/react-30-day-challenge-day-1-simple-timer-df85d0867553

const React = require('react')
const ms = require('pretty-ms')

class Timer extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      time: 0,
      isOn: false,
      start: 0
    }

    this.startTimer = this.startTimer.bind(this)
    this.stopTimer = this.stopTimer.bind(this)
    this.resetTimer = this.resetTimer.bind(this)
  }

  sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
  }

  componentDidUpdate(prevProps) {
    if((this.props.startCount !== prevProps.startCount)) {
      this.stopTimer()
      this.resetTimer()
      this.sleep(1).then(() => {
        this.startTimer()
      })
    }
  }

  startTimer() {
    this.setState({isOn: true, time: this.state.time, start: Date.now() - this.state.time})
    this.timer = setInterval(() => this.setState({time: Date.now() - this.state.start}), 1);
  }

  stopTimer() {
    this.setState({isOn: false})
    clearInterval(this.timer)
  }

  resetTimer() {
    this.setState({time: 0, isOn: false})
  }

  render() {

    let Start = (this.state.time == 0) ?
      <button onClick={this.startTimer}>start</button> :
      null

    let Stop = (this.state.time == 0 || !this.state.isOn) ?
      null :
      <button onClick={this.stopTimer}>stop</button>

    let Resume = (this.state.time == 0 || this.state.isOn) ?
      null :
      <button onClick={this.startTimer}>resume</button>

    let Reset = (this.state.time == 0 || this.state.isOn) ?
      null :
      <button onClick={this.resetTimer}>reset</button>

    return(
      <div>
        <h3>Timer: {ms(this.state.time)}</h3>
        {Start}
        {Resume}
        {Stop}
        {Reset}
      </div>
    )
  }
}

module.exports = Timer