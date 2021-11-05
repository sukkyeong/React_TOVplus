import styles from './search_header.module.css';
import React, { useRef } from 'react';



const SearchHeader = ({ onSearch, onLogout }) => {
  const inputRef = useRef();
  const handleSearch = () => {
    const value = inputRef.current.value;
    onSearch(value);
  };
  const onClick = () => {
    handleSearch();
  };

  const onKeyPress = event => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <img className={styles.img} src="/images/voistore_logo.png" alt="logo" />
        <h1 className={styles.title}>TOVplus</h1>
      </div>
      <input
        ref={inputRef}
        className={styles.input}
        type="search"
        placeholder="Search..."
        onKeyPress={onKeyPress}
      />
      <button className={styles.search} type="submit" onClick={onClick}>
        <img
          className={styles.searchImg}
          src="/images/search.png"
          alt="search"
        />
      </button>

      {onLogout && (
        <button className={styles.logout} onClick={onLogout}>
        Logout
        </button>
        )}
    </header>
  );
};

export default SearchHeader;
