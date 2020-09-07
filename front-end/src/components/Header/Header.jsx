import React from 'react';
import styles from './header.module.css';
import logo from '../../assets/images/logo.png'

function Header(props) {
    return (
        <div className={styles.header}>
            <div className={styles.brand}>
                <img src={logo} alt="To-do logo"/>
            </div>
            <div className={styles.menu}>
                <a href="/">To-do App</a>
            </div>
        </div>
    );
}

export default Header;