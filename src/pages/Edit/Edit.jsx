import React, { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import styles from "./Edit.module.scss";
import axios from "axios";

import { useHistory, useParams } from "react-router-dom";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { api } from "../../services/api";

const validationPost = yup.object().shape({
  title: yup
    .string()
    .required("O título é obrigatório")
    .max(40, "O título precisa ter menosde 40 caracteres"),
  description: yup
    .string()
    .required("A descrição é obrigatório")
    .max(150, "A descrição precisa ter menosde 150 caracteres"),
  content: yup
    .string()
    .max(500, "O conteúdo precisa ter menosde 500 caracteres"),
});

export default function Edit() {

  const [users, setUsers] = useState([]);
  useEffect(() => {
    api
      .get("/users")
      .then((response) => {
        setUsers(response.data);
      })
      .catch(() => {
        console.log("Err");
      });
  }, []);

  const { id } = useParams();

  let history = useHistory();

  const addPost = (data) =>
    api
      .put(`/posts/${id}`, data)
      .then(() => {
        history.push("/");
      })
      .catch(() => {
        console.log("Deu errado");
      });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(validationPost),
  });

  useEffect(() => {
    api
      .get(`/posts/${id}`)
      .then((response) => {
        reset(response.data);
      })
      .catch(() => {
        console.log("Err");
      });
  }, []);

  return (
    <>
      <Header />
      <main>
        <div className="cardpost">
          <h1 className={styles.cardposth1}>Editar Tarefa</h1>
          <div className={styles.linepost}></div>

          <div className="card-body-post">
            <form onSubmit={handleSubmit(addPost)}>
              <div className={styles.fields}>
                <label>Título</label>
                <input type="text" name="title" {...register("title")} />
                <p className={styles.errormessage}>{errors.title?.message}</p>
              </div>

              <div className="fields">
                <label>Descrição</label>
                <input
                  type="text"
                  name="description"
                  {...register("description")}
                />
                <p className={styles.errormessage}>
                  {errors.description?.message}
                </p>
              </div>

              <div className="fields">
                <label>Conteúdo</label>
                <textarea
                  type="text"
                  name="content"
                  {...register("content")}
                ></textarea>
                <p className={styles.errormessage}>{errors.content?.message}</p>
              </div>

              <div>
                <label>Usuario</label>
                <select name="select" onChange={(e)=> (e.target.value)} {...register("Id_user")}>
                  <option value="0">Sem usuario</option>
                  {users.map((users, key) => {
                    return (
                      <option key={key} value={users.name} >{users.name} </option>
                    );
                  })}
                </select>
              </div>

              <div className={styles.btnpost}>
                <button type="submit">Enviar</button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </>
  );
}
