import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "../../components/Header/Header";
import styles from "./Geruser.module.scss";
import axios from "axios";
import { api } from "../../services/api";

export default function Geruser() {
  const [user, setUser] = useState([]);

  useEffect(() => {
    api
      .get("/users")
      .then((response) => {
        setUser(response.data);
      })
      .catch(() => {
        console.log("Err");
      });
  }, []);

  function deletePost(id){
      axios.delete(`/users/${id}`)

      setUser(user.filter(user=>user.id !== id));
  }

  return (
    <>
      <Header />
      <main>
        <div className={styles.cards}>
          {user.map((user, key) => {
            return (
              <div key={key} className={styles.card}>
                <header>
                  <h2>{user.name}</h2>
                </header>

                <div className={styles.line}></div> 
                <p>{user.position}</p>

                <div className={styles.btns}>
                  <div className={styles.btnedit}>
                    <Link to={{pathname:`/edituser/${user.id}`}}>
                      <button>Editar</button>
                    </Link>
                  </div>

                  <div className={styles.btndelete}>
                    <button onClick={()=>deletePost(user.id)}>Deletar</button>
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

