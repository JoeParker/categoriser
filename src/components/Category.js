import categories from '../data/Categories';

const React = require('react')

class Category extends React.Component {

    state = {
        showCategory: false
    }

    newCategory = () => {
        this.setState({showCategory: true});
    };

    render() {
        return(
            <div>
                {this.state.showCategory && <h1>{categories[Math.floor(Math.random() * categories.length)]}</h1>}
                <button onClick={this.newCategory}>New Category</button>
            </div>
        )
    }
}

export default Category