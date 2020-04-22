import categories from '../data/Categories';
import TimerSettings from './TimerSettings';

const React = require('react')

class Category extends React.Component {

    state = {
        showCategory: false,
        startCount: 0,
        currentCategory: ""
    }

    newCategory = () => {
        this.setState({showCategory: true});
        this.setState({startCount: this.state.startCount + 1});
        this.setState({currentCategory: this.randomCategory()})
    };

    randomCategory = String => {
        let randIndex = Math.floor(Math.random() * categories.length)
        let category = categories[randIndex] ? categories[randIndex] : "Oops - there's no more categories!"
        categories.splice(randIndex, 1)
        return category
    };

    render() {
        return(
            <div>
                <h1>{this.state.currentCategory}</h1>
                <button onClick={this.newCategory}>New Category</button>
                <TimerSettings startCount={this.state.startCount} />                
                <p>Round {this.state.startCount}</p>
            </div>
        )
    }
}

export default Category