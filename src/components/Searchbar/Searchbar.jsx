import React from 'react';
import { useState } from 'react';
import styled from './Searchbar.module.css';

export const Searchbar = ({ onSubmit }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit(query);
    setQuery('');
  };

  const handleChange = e => {
    setQuery(e.target.value);
  };

  return (
    <header className={styled.Searchbar}>
      <form onSubmit={handleSubmit} className={styled.SearchForm}>
        <button type="submit" className={styled.SearchFormButton}>
          <span className={styled.SearchFormbuttonlabel}>Search</span>
        </button>

        <input
          className={styled.SearchFormInput}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={query}
          onChange={handleChange}
        />
      </form>
    </header>
  );
};
