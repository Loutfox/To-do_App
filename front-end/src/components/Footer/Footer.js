import React from 'react';
import styles from './footer.module.css';

function Footer(props) {
    return (
        <>
            <div className={styles.footer}>
                <p>Aliluch Loutfi</p>
                <p>Copyright © Loutfi Aliluch 2020</p>
            </div>
        </>
    );
}

export default Footer;