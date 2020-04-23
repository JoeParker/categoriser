// Modified version of Simple Timer class by Egor Egorov
// https://medium.com/@650egor/react-30-day-challenge-day-1-simple-timer-df85d0867553

// https://freesound.org/people/GowlerMusic/sounds/266566/
import gongFile from "../media/gong.wav"
import countdownFile from "../media/countdown.mp3"

const React = require('react')
const ms = require('pretty-ms')

class Timer extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      time: 0,
      isOn: false,
      start: 0,
      begin: this.props.begin
    }

    this.startTimer = this.startTimer.bind(this)
    this.pauseTimer = this.pauseTimer.bind(this)
    this.resetTimer = this.resetTimer.bind(this)

    this.countdownAudio =  new Audio(countdownFile)
    this.countdownAudio.addEventListener('ended', function () {
      this.currentTime = 0
      this.play()
    }, false)
  }

  sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
  }

  componentDidUpdate(prevProps) {
    if((this.props.startCount !== prevProps.startCount)) {
      this.setState({begin: this.props.begin})
      this.pauseTimer()
      this.resetTimer()
      this.countdownAudio.currentTime = 0
      this.sleep(1).then(() => { // Ensures reset happens before resume
        this.startTimer()
      })
    }
    if((this.props.audio !== prevProps.audio)) {
      this.props.audio ? this.countdownAudio.play() : this.countdownAudio.pause()
    }
  }

  startTimer() {
    this.setState({isOn: true, time: this.state.time, start: Date.now() - this.state.time})
    this.timer = setInterval(() => this.setState({time: Date.now() - this.state.start}), 1);
    if (this.props.audio) this.countdownAudio.play()
  }

  pauseTimer() {
    this.setState({isOn: false})
    clearInterval(this.timer)
    this.countdownAudio.pause()
  }

  resetTimer() {
    this.setState({time: 0, isOn: false})
  }

  getTimeRemaining = () => {
    let rem = this.state.begin - this.state.time
    if (rem <= 0 && this.state.isOn) { 
      this.countdownAudio.pause()
      this.countdownAudio.currentTime = 0
      new Audio(gongFile).play()
      this.setState({isOn: false}) 
    }
    return rem > 0 ? rem : 0
  }



  render() {

    let progressBarStyle = {
      width: window.innerWidth - window.innerWidth / this.state.begin * this.state.time,   
      height: '10px',
      backgroundColor: 'hsl('+ (130 - (130 / this.state.begin * this.state.time)) +', 60%, 50%)'
    }

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
        <div style={progressBarStyle}></div>
        {this.state.time !== 0 && this.getTimeRemaining() > 0 && <h3>Time Remaining: {ms(this.getTimeRemaining())}</h3>}
        {this.getTimeRemaining() <= 0 && <h2>Time's Up!</h2>}
        {this.getTimeRemaining() > 0 && Resume}
        {this.getTimeRemaining() > 0 && Pause}
      </div>
    )
  }
}

export default Timer