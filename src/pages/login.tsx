import  Head from 'next/head'
import { useRouter } from 'next/router'
import { useContext, useEffect, useState } from 'react'
import styles from '../styles/Pages/Login.module.css'
import { UserContext } from '../contexts/UserContext'
import { GetServerSideProps } from 'next'

interface LoginProps {
  username: string
}


export default function Login(props:LoginProps) {
  const router = useRouter()
  const { saveUser, username } = useContext(UserContext)
  const [colorButton, setColorButton] = useState(props.username ? 'var(--green)' : 'var(--blue-dark)')
  const [valueLogin, setValueLogin] = useState(props.username)

  useEffect(()=>{
    if (username){
      router.replace('/')
    }else{
      router.replace('/login')
    }
  },[])

  const handleChange = (e) => {

    setValueLogin(e.target.value)

    if (String(e.target.value)){
      setColorButton('var(--green)')
    }else{
      setColorButton('var(--blue-dark)')
    }

  }

  const handleLogin = ()=> {
    // if (!valueLogin){
    //   return
    // }

    saveUser(valueLogin)
    router.replace('/')
  }

  return (
    <div className={styles.container}>
      <Head>
          <title>Login | I Go.it</title>
      </Head>

      <img src="/icons/simbol.svg" alt="Simbolo Grande" className={styles.logoGrande}/>
      
      <section>

        <img src="/logo-full-white.svg" alt="Moveit Logo Complete" className={styles.logoMoveit}/>
        
        <div className={styles.apresentation}>

          <strong>Bem-vindo</strong>

          <p>
            <img src="icons/github.svg" alt="Level" />
            Faça login com seu github para iniciar
          </p>

        </div>

        <div className={styles.inputLogin}>

          <input 
            type="text" 
            value={valueLogin}
            onChange={handleChange}
            className={styles.placeholderColor} 
            placeholder="Digite seu username"
          />

          <button 
            type="button" 
            style={{  backgroundColor: colorButton }}
            onClick={ handleLogin }
          >
            <img src="icons/arrow-right.svg" alt="Level" />
          </button> 

        </div>

      </section>
    </div>
  )
}

export const getServerSideProps:GetServerSideProps = async(ctx) => {

  const { username } = ctx.req.cookies;
  
  return {
    props:{
      username: username ? String(username) : ''
    }
  }
}