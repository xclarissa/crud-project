import GlobalStyle from "./styles/globalStyles";
import { toast, ToastContainer, Zoom } from "react-toastify"
import 'react-toastify/dist/ReactToastify.min.css';
import styled from "styled-components";
import Form from "./components/Form/Form";
import Grid from "./components/Grid/Grid";
import { Users } from "./types/users.type"; 
import { useEffect, useState } from "react";
import { Http } from './api/api'

const Container = styled.div`
  width: 100%;
  max-width: 900px;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`

const Title = styled.h2``

function App() {
  const [users, setUsers] = useState<Users[]>([]);
  // const [postUser, setPostUser] = useState<Users>()
  const [form, setForm] = useState<Users>({
    id: 1,
    nome: "",
    email: "",
    fone: "",
    data_nascimento: null,
  });

  const getUsers = async () => {
    try {
      const res = await Http.get('/'); 
      setUsers(res.data.sort((a: Users, b: Users): number => a.nome > b.nome ? 1 : -1))
    } catch {
      toast.error("erro!!")
    }
  } 

  useEffect(() => {
    getUsers()
  }, [setUsers])
  

  return (
    <>
       <Container>
        <Title>USUÁRIOS</Title>
        <Form form={form} setForm={setForm} getUsers={getUsers} />
        <Grid users={users} setUsers={setUsers} setForm={setForm} getUsers={getUsers}/>
      </Container>
      <ToastContainer style={{ width: '400px' }} transition={Zoom} limit={4} />
      <GlobalStyle />
    </>
  );
}

export default App;
