import React, { useState, useEffect, useCallback } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import { getImages } from 'api/api';
import css from '../components/App.module.css';

const maxImages = 12;

const App = () => {
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [totalHits, setTotalHits] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const fetchItems = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await getImages(query, currentPage, maxImages);
      setImages(prevImages => [...prevImages, ...data.hits]);
      setTotalHits(data.totalHits);
      if (data.hits.length === 0) {
        alert('Not found images');
      }
    } catch (error) {
      console.error('Error fetching images:', error);
      alert('Something went wrong...');
    } finally {
      setIsLoading(false);
    }
  }, [query, currentPage]);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  const [maxPage, setMaxPage] = useState(1);

  useEffect(() => {
    const newMaxPage = Math.ceil(totalHits / maxImages);
    setMaxPage(newMaxPage);
  }, [totalHits]);

  const handleLoadMore = () => {
    setCurrentPage(prevPage => prevPage + 1);
  };

  const handleSubmit = newQuery => {
    setQuery(newQuery);
    setImages([]);
    setCurrentPage(1);
  };

  const showLoadMoreButton = images.length < totalHits;
  useEffect(() => {
    fetchItems();
  }, [fetchItems, showLoadMoreButton]);

  return (
    <div className={css.App}>
      <Searchbar onSubmit={handleSubmit} />
      <ImageGallery query={query} images={images} isLoading={isLoading} />
      {isLoading && <Loader />}
      {!isLoading && showLoadMoreButton && (
        <Button onClick={handleLoadMore} showButton={images.length > 0} />
      )}
    </div>
  );
};

export default App;
