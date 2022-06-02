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
  name: yup
    .string()
    .required("O Nome é obrigatório")
    .max(40, "O nome precisa ter menosde 80 caracteres"),
  position: yup
    .string()
    .required("O Cargo é obrigatório")
    .max(150, "A descrição precisa ter menosde 150 caracteres"),
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
      .put(`/users/${id}`, data)
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
      .get(`/users/${id}`)
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
              
            </form>
          </div>
        </div>
      </main>
    </>
  );
}
