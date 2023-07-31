import { Component } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import { getImages } from 'api/api';
import css from '../components/App.module.css';
const maxImages = 12;
class App extends Component {
  state = {
    query: '',
    images: [],
    isLoading: false,
    totalHits: 0,
    currentPage: 1,
  };
  componentDidUpdate(prevProps, prevState) {
    if (
      this.state.query !== prevState.query ||
      this.state.currentPage !== prevState.currentPage
    ) {
      this.fetchItems();
    }
    if (this.state.totalHits !== prevState.totalHits) {
      this.setState({
        maxPage: Math.ceil(this.state.totalHits / maxImages),
      });
    }
  }

  fetchItems = async () => {
    const { currentPage, query, images } = this.state;
    this.setState({ isLoading: true });
    try {
      const data = await getImages(query, currentPage, maxImages);
      this.setState({
        images: [...images, ...data.hits],
        totalHits: data.totalHits,
      });
      if (data.hits.length === 0) {
        alert('Not found images');
      }
    } catch (error) {
      console.error('Error fetching images:', error);
      alert('Something went wrong...');
    } finally {
      this.setState({ isLoading: false });
    }
  };
  handleLoadMore = () => {
    this.setState({ currentPage: this.state.currentPage + 1 });
  };
  handleSubmit = query => {
    this.setState({ query, images: [], currentPage: 1 });
  };
  render() {
    const { images, isLoading, totalHits } = this.state;
    const showLoadMoreButton = images.length < totalHits;
    return (
      <div className={css.App}>
        <Searchbar onSubmit={this.handleSubmit} />
        <ImageGallery
          query={this.state.images}
          images={this.state.images}
          isLoading={this.state.isLoading}
        />
        {isLoading && <Loader />}
        {!isLoading && showLoadMoreButton && (
          <Button
            onClick={this.handleLoadMore}
            showButton={images.length > 0}
          />
        )}
      </div>
    );
  }
}
export default App;
