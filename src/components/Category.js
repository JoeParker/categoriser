import categories from '../data/Categories';
import TimerSettings from './TimerSettings';
import ImageLoader from './ImageLoader';

const React = require('react')

class Category extends React.Component {

    state = {
        showCategory: false,
        startCount: 0,
        currentCategory: "",
        loadImage: false
    }

    toggleImage = this.toggleImage.bind(this)

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

    toggleImage(event) {
        this.setState({loadImage: event.target.checked})
    }

    render() {
        return(
            <div>
                <h1>{this.state.currentCategory}</h1>
                <button onClick={this.newCategory}>New Category</button>
                <TimerSettings 
                    startCount={this.state.startCount} 
                />                
                <p>Round {this.state.startCount}</p>
                <ImageLoader 
                    image={this.state.currentCategory} 
                    loadImage={this.state.loadImage}
                />
                <p>Category Images<sup>BETA</sup>
                    <input
                        type="checkbox"
                        checked={this.state.loadImage}
                        onChange={this.toggleImage}
                    />
                </p>
            </div>
        )
    }
}

export default Category