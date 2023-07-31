import { Component } from 'react';
import styled from './Modal.module.css';

export class Modal extends Component {
  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyDown);
  }
  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = e => {
    if (e.code === 'Escape') this.props.onClose();
  };

  handleOverlayClick = e => {
    if (e.target === e.currentTarget) this.props.onClose();
  };

  render() {
    return (
      <div className={styled.Overlay}>
        <div className={styled.Modal}>
          <img src={this.props.largeImageURL} alt="" />
        </div>
      </div>
    );
  }
}
