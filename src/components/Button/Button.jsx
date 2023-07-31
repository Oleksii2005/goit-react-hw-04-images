import css from '../Button/Button.module.css';
export const Button = ({ onClick, showButton }) => {
  return showButton ? (
    <button type="button" onClick={onClick} className={css.Button}>
      Load more...
    </button>
  ) : null;
};
