// import { Component } from 'react';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import styled from './ImageGallery.module.css';
import PropTypes from 'prop-types';

export function ImageGallery(prop) {
  const { images } = prop;
  return (
    <>
      <ul className={styled.ImageGallery}>
        {images.map(image => (
          <ImageGalleryItem key={image.id} image={image} />
        ))}
      </ul>
    </>
  );
}
ImageGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
    })
  ).isRequired,
};
