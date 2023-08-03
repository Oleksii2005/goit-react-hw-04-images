import { useState, useEffect, useCallback } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { getImages } from 'api/api';
import { Button } from 'components/Button/Button';
import { Loader } from 'components/Loader/Loader';
import styled from './App.module.css';

const IMAGES_PER_PAGE = 12;
export const App = () => {
  const [searchquery, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [totalHits, setTotalHits] = useState(0);

  const fetchImages = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await getImages(searchquery, currentPage, IMAGES_PER_PAGE);
      setImages(prevImages => [...prevImages, ...data.hits]);
      setTotalHits(data.totalHits);

      if (data.hits.length === 0) {
        alert('No images found...');
      }
    } catch (error) {
      console.error('Error fetching images::', error);
      alert('Something went wrong...');
    } finally {
      setIsLoading(false);
    }
  }, [searchquery, currentPage]);

  useEffect(() => {
    if (searchquery !== '') {
      fetchImages();
    }
  }, [searchquery, currentPage, fetchImages]);

  const handleLoadMore = () => {
    setCurrentPage(currentPage => currentPage + 1);
  };

  const handleSubmit = newQuery => {
    setQuery(newQuery);
    setImages([]);
    setCurrentPage(1);
  };
  const showLoadMoreButton = images.length < totalHits;
  return (
    <div className={styled.App}>
      <Searchbar onSubmit={handleSubmit}></Searchbar>
      <ImageGallery query={images} images={images} isLoading={isLoading} />
      {isLoading && (
        <div>
          <Loader />
        </div>
      )}
      {!isLoading && showLoadMoreButton && (
        <Button onClick={handleLoadMore} showButton={images.length > 0} />
      )}
    </div>
  );
};
