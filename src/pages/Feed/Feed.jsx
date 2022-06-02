import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import HeaderMain from "../../components/HeaderMain/HeaderMain";
import MoreImg from "../../img/more.svg";
import styles from "./Feed.module.scss";
import axios from "axios";
import { api } from "../../services/api";

export default function Feed() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    api
      .get("/posts")
      .then((response) => {
        setPosts(response.data);
      })
      .catch(() => {
        console.log("Err");
      });
  }, []);

  function deletePost(id){
      api.delete(`/posts/${id}`)

      setPosts(posts.filter(post=>post.id !== id));
  }

  return (
    <>
      <HeaderMain />
      <main>
        <div className={styles.cards}>
          {posts.map((post, key) => {
            return (
              <div key={key} className={styles.card}>
                <header>
                  <h2>{post.title}</h2>
                </header>

                <div className={styles.line}></div> 
                <p>{post.description}</p>

                <div className={styles.line}></div>
                <p>{post.Id_user}</p>

                <div className={styles.btns}>
                  <div className={styles.btnedit}>
                    <Link to={{pathname:`/edit/${post.id}`}}>
                      <button>Editar</button>
                    </Link>
                  </div>

                  <div className={styles.btnreadmore}>
                    <Link to={{pathname:`/lermais/${post.id}`}}>
                      <button>Ler mais</button>
                    </Link>

                  </div>
                  <div className={styles.btndelete}>
                    <button onClick={()=>deletePost(post.id)}>Deletar</button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </main>
    </>
  );
}
