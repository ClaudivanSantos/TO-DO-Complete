import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Header.module.scss'
import Backimg from '../../img/back-button.svg'

export default function Header() {
  return (
      <header>
          <div className={styles.container}>
              
                  <Link to="/">
                      <img src={Backimg} alt="imgvoltar" style={{width: '50px'}}/>
                  </Link>
          </div>
      </header>
  );
}
