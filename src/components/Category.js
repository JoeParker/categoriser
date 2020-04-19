import categories from '../data/Categories';
import Timer from './Timer';

const React = require('react')

class Category extends React.Component {

    state = {
        showCategory: false,
        startCount: 0
    }

    newCategory = () => {
        this.setState({showCategory: true});
        this.setState({startCount: this.state.startCount + 1});
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
                {this.state.showCategory && <h1>{this.randomCategory()}</h1>}
                <button onClick={this.newCategory}>New Category</button>
                <Timer startCount={this.state.startCount} />
                <p>Round {this.state.startCount}</p>
            </div>
        )
    }
}

export default Category