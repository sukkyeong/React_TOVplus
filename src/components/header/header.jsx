import React from 'react';
import ReactDOM from 'react-dom';
import styles from './header.module.css';

const Header = ({ onLogout }) => (
    <header className={styles.header}>
        {onLogout && (
        <button className={styles.logout} onClick={onLogout}>
        Logout
        </button>
        )}
        <img className={styles.logo} src="/images/voistore_logo.png" alt="logo" />
        <h1 className={styles.title}>TOVplus</h1>
    </header>
);

export default Header;