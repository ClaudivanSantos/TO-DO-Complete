import React,{useEffect, useState} from "react";
import Header from "../../components/Header/Header";
import styles from "./Lermais.module.scss";
import axios from "axios";
import { useParams } from 'react-router-dom'
import { api } from "../../services/api";

export default function Lermais() {

  const { id } = useParams();

  const [lerMais, setLerMais] = useState({})

  useEffect(() => {
    api.get(`posts/${id}`)
      .then((response) => {
        setLerMais(response.data)
      })
      .catch(() => {
        console.log("Err");
      });
  }, []);

  return (
    <>
      <Header />
      <main>
        <div className={styles.cards}>
          <div className={styles.card}>
            <header>
              <h2>{lerMais.title}</h2>=
            </header>
            <div className={styles.line}></div>
            <p>{lerMais.content}</p>
          </div>
        </div>
      </main>
    </>
  );
}
