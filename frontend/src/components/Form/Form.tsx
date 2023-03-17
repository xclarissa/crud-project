import moment from "moment";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { Http } from "../../api/api";
import { Users } from "../../types/users.type";
import * as F from "./Form.styles";

export interface FormProps {
  form: Users;
  setForm: React.Dispatch<React.SetStateAction<Users>>;
  getUsers: () => Promise<void>;
}

export default function Form({ form, setForm, getUsers }: FormProps) {
 

  function handleChange(key: number, ev: ChangeEvent<HTMLInputElement>) {
    const value = ev.target.value;
    console.log("value", value);
    setForm((prevState) => {
      if (prevState.id === key) {
        return {
          ...prevState,
          [ev.target.name]: ev.target.value,
        };
      }
      return prevState;
    });
    console.log(form);

    return form;
  }

  const createUser = async () => {
    await Http.post("/", {
      nome: form.nome,
      email: form.email,
      fone: form.fone,
      data_nascimento: moment(form.data_nascimento).format(`YYYY-MM-DD`),
    })
      .then(({ data }) => toast.success(data))
      .catch(({ data }) => toast.error(data));
  };

  function handleSubmit(ev: ChangeEvent<HTMLFormElement>) {
    ev.preventDefault();
    createUser();

    setForm({
      id: 0,
      nome: "",
      email: "",
      fone: "",
      data_nascimento: null,
    });

    getUsers();
    console.log(form);
  }

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <F.FormContainer onSubmit={handleSubmit}>
      <F.Label>Nome</F.Label>
      <F.InputArea>
        <F.Input
          name="nome"
          value={form.nome}
          onChange={(event) => handleChange(form.id, event)}
        />
      </F.InputArea>

      <F.Label>Email</F.Label>
      <F.InputArea>
        <F.Input
          name="email"
          type="email"
          value={form.email}
          onChange={(event) => handleChange(form.id, event)}
        />
      </F.InputArea>

      <F.Label>Fone</F.Label>
      <F.InputArea>
        <F.Input
          name="fone"
          value={form.fone}
          onChange={(event) => handleChange(form.id, event)}
        />
      </F.InputArea>

      <F.Label>Data de Nascimento</F.Label>
      <F.InputArea>
        <F.Input
          name="data_nascimento"
          type="date"
          lang="pt-BR"
          value={moment(form.data_nascimento).format(`YYYY-MM-DD`)} 
          onChange={(event) => handleChange(form.id, event)}
        />
      </F.InputArea>
      <F.Button type="submit">Enviar</F.Button>
    </F.FormContainer>
  );
}
