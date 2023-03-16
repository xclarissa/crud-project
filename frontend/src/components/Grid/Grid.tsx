import * as G from "./Grid.styles"; 
import { FaTrash, FaEdit } from "react-icons/fa";
import { toast } from "react-toastify";
import { Users } from "../../types/users.type";
import { Http } from "../../api/api"; 

interface UserProps {
  users: Users[];
  setUsers: React.Dispatch<React.SetStateAction<Users[]>>;
  setForm: React.Dispatch<React.SetStateAction<Users>>;
  getUsers: () => Promise<void>;
}

export default function Grid({ users, setUsers, setForm, getUsers }: UserProps) {
  const handleEdit = (item: Users) => {
    setForm(item)
  }

  
  const handleDelete = async (userId: number) => {
    await Http.delete(`/${userId}`)
      .then(({ data }) => {
        const newArray = users.filter((user) => user.id !== userId);
        setUsers(newArray);
        toast.success(data);
      })
      .catch(({ data }) => toast.error(data));
  };

  return (
    <G.Table>
      <G.THead>
        <G.Tr>
          <G.Th>Nome</G.Th>
          <G.Th>Email</G.Th>
          <G.Th onlyWeb>Telefone</G.Th>
          <G.Th>Dt de Nascimento</G.Th>
          <G.Th> </G.Th>
          <G.Th> </G.Th>
        </G.Tr>
      </G.THead>

      <G.TBody>
        {users.map((user, i) => (
          <G.Tr key={user.id}>
            <G.Td width="30%">{user.nome}</G.Td>
            <G.Td width="30%">{user.email}</G.Td>
            <G.Td width="20%">{user.fone}</G.Td>
            <G.Td width="20%">{String(user.data_nascimento)}</G.Td>
            <G.Td alignCenter width="5%">
              <FaEdit onClick={() => handleEdit(user)} />
            </G.Td>
            <G.Td alignCenter width="5%">
              <FaTrash onClick={() => handleDelete(user.id)} />
            </G.Td>
          </G.Tr>
        ))}
      </G.TBody>
    </G.Table>
  );
}
