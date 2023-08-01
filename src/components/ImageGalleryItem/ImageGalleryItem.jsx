import React, { useState } from 'react';
import Modal from '../Modal/Modal';
import styled from './ImageGalleryItem.module.css';

export function ImageGalleryItem({ image }) {
  const [isModalOpen, setModalOpen] = useState(false);
  const handleOpenModal = () => {
    setModalOpen(true);
  };
  const handleCloseModal = () => {
    setModalOpen(false);
  };
  return (
    <>
      <li key={image.id} className={styled.imageGalleryItem}>
        <img
          className={styled.ImageGalleryItemImage}
          src={image.webformatURL}
          alt=""
          onClick={handleOpenModal}
        />
      </li>
      {isModalOpen && (
        <Modal largeImageURL={image.largeImageURL} onClose={handleCloseModal} />
      )}
    </>
  );
}

// export const ImageGalleryItem = ({ image }) => {
//   const [isModalOpen, setModalOpen] = useState(false);

//   const handleOpenModal = () => {
//     setModalOpen(true);
//   };

//   const handleCloseModal = () => {
//     setModalOpen(false);
//   };

//   return (
//     <>
//       <li key={image.id} className={styled.imageGalleryItem}>
//         <img
//           className={styled.ImageGalleryItemImage}
//           src={image.webformatURL}
//           alt=""
//           onClick={handleOpenModal}
//         />
//       </li>
//       {isModalOpen && (
//         <Modal largeImageURL={image.largeImageURL} onClose={handleCloseModal} />
//       )}
//     </>
//   );
// };
