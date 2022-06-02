import React from 'react';
import { Link } from 'react-router-dom';
import styles from './HeaderMain.module.scss'

export default function HeaderMain() {
  return (
      <header>
          <div className={styles.container}>
              <div className={styles.logo}>
                  <h1>To-Do</h1>
              </div>
              <div className={styles.btnnewPost}>
                  <Link to="/post">
                      <button>
                         Adicone uma nova tarefa 
                      </button>
                  </Link>
                  <Link to="/users">
                      <button>
                         Gerenciar usuarios
                      </button>
                  </Link>
              </div>
              
          </div>
      </header>
  );
}
