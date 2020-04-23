const React = require('react')

class ImageLoader extends React.Component {

    state = {
        imageUrl: ""
    }

    componentDidUpdate(prevProps) {
        if((this.props.image !== prevProps.image)) {
          this.loadImage()
        }
      }

    loadImage = () => {
        let imageString = this.props.image.replace(/\s/g, "+") // Encode search string URL
        let searchUrl = "https://pixabay.com/api/?key=16195313-04c82445336f57b6fb9d3ddef&q=" + imageString + "&safesearch=true"

        console.log(searchUrl)
        fetch(searchUrl)
        .then(response => response.json())
        .then((json) => {
            this.setState({imageUrl: json.hits[0].largeImageURL})
        })
        .catch((error) => {
            console.error(error)
        })
    };

    render() {
        return(
            <div>
                <img src={this.state.imageUrl} alt={this.props.image} />
            </div>
        )
    }
}

export default ImageLoader