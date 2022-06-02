import React from "react";
import axios from "axios";

import { useHistory } from "react-router-dom";

import Header from "../../components/Header/Header";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import styles from "./Users.module.scss";
import { Link } from "react-router-dom";
import { api } from "../../services/api";

const validationPost = yup.object().shape({
  name: yup
    .string()
    .required("O Nome é obrigatório")
    .max(40, "O nome precisa ter menos de 80 caracteres"),
  position: yup
    .string()
    .required("O Cargo é obrigatório")
    .max(150, "A descrição precisa ter menos de 150 caracteres"),
});

function Post() {
  let history = useHistory();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationPost),
  });

  const addPost = (data) =>
    api
      .post("/users", data)
      .then(() => {
        history.push("/");
      })
      .catch(() => {
        console.log("Deu errado");
      });

  return (
    <div>
      <Header />

      <main>
        <div className="cardpost">
          <h1 className={styles.cardposth1}>Criar usuarios</h1>
          <div className={styles.linepost}></div>

          <div className="card-body-post">
            <form onSubmit={handleSubmit(addPost)}>
              <div className={styles.fields}>
                <label>Nome</label>
                <input type="text" name="name" {...register("name")} />
                <p className={styles.errormessage}>{errors.name?.message}</p>
              </div>

              <div className="fields">
                <label>Cargo</label>
                <input
                  type="text"
                  name="description"
                  {...register("position")}
                />
                <p className={styles.errormessage}>
                  {errors.position?.message}
                </p>
              </div>
              <div className={styles.btnpost}>
                <button type="submit">Enviar</button>
              </div>
              <div className={styles.btnedit}>
                <Link to={{ pathname:'/geruser/' }}>
                  <button>Editar usuarios</button>
                </Link>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Post;
