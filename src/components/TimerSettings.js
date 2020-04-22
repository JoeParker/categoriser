import categories from '../data/Categories';
import Timer from './Timer';

const React = require('react')

class TimerSettings extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            mins: "4",
            secs: "00"
        }

    }

    updateMins = this.updateMins.bind(this)
    updateSecs = this.updateSecs.bind(this)

    updateMins(event) {
        this.setState({mins: event.target.value})
    }

    updateSecs(event) {
        this.setState({secs: event.target.value})
    }

    render() {
        return(
            <div>
                <Timer startCount={this.props.startCount} begin={(this.state.mins*60*1000)+(this.state.secs*1000)} />   
                <h4>Time allowed:</h4>
                <h3>{this.state.mins} mins {this.state.secs} secs</h3>           
                <input type="range" defaultValue={this.state.mins} min="0" max="59" onChange={this.updateMins} />
                <input type="range" defaultValue={this.state.secs} min="0" max="59" onChange={this.updateSecs} /> 
            </div>
        )
    }
}

export default TimerSettings