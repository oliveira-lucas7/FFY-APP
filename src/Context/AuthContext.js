import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useState } from "react";
import Observacao from "../Pages/Observacoes";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [logado, setLogado] = useState(false);
  const [sucessLogin, setSucessLogin] = useState(null);
  const [sucessCadastro, setSucessCadastro] = useState(false);

  const [cadastro, setCadastro] = useState(false);
  const [error, setError] = useState(false);
  const [showCadastro, setShowCadastro] = useState(false);7


  const[ exibirobservacao, setExibirObservacao] = useState(false)

  async function Login(email, senha) {
    await fetch('http://10.139.75.33:5251/api/Usuario/Login', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        UsuarioEmail: email,
        UsuarioSenha: senha
      }),
    })
      .then((res) => res.json())
      .then(async (json) => {
        if (json.sucess) {
            console.log("Teste")
            try{
                await AsyncStorage.setItem(
                    "userId",
                    json.user.usuarioId.toString()
                );
            } catch (err)
            {
                setError(true);
            }
            setSucessLogin(true);
            setTimeout(() => {
                setLogado(true);
                setSucessLogin(false);
            }, 2000);         
        } else 
        {
            setError(true);
        }
    })
    
    .catch((err) => setError(true));
}

    function toggleScreen()
    {
        setShowCadastro(!showCadastro)
    }

    function toggleObs()
    {
               setExibirObservacao(true)
    }

  async function RealizaCadastro(nome, telefone, email, senha) {
     await fetch('http://10.139.75.33:5251/api/Usuario/CreateUsuario', {
        method: 'POST',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify({
          UsuarioEmail: email,
          UsuarioNome: nome,
          UsuarioSenha: senha,
          UsuarioTelefone: telefone,
        })
      })
      .then((res) => {
        if ( res.status == 200 ) {
            setSucessCadastro(true);
            setTimeout(() => {
                setSucessCadastro(false);
                setShowCadastro(false);
            }, 2000)
        } else {
            setError(true)
        }
      })
      .catch((err) => setError(true));
  }

  return (
    <AuthContext.Provider 
        value={{ 
            logado, 
            Login, 
            error, 
            cadastro,
            RealizaCadastro,
            showCadastro,
            toggleScreen,
            sucessCadastro,
            sucessLogin,
            Observacao: exibirobservacao, setExibirObservacao,
            toggleObs
            }}>
        {children}
        </AuthContext.Provider>
  );
}