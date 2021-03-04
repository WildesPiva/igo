import  Head from 'next/head'
import { useRouter } from 'next/router'
import { useContext, useEffect, useState } from 'react'
import styles from '../styles/Pages/Login.module.css'
import { UserContext } from '../contexts/UserContext'
import { GetServerSideProps } from 'next'


export default function Login() {
  const router = useRouter()
  const { signIn, session } = useContext(UserContext)

  useEffect(()=>{
    if (session){
        router.replace('/')
    }else{
        router.replace('/login')
    }
  },[])
      
  const handleLogin = ()=> {
    signIn('google')
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
            Faça login com a sua conta Google
          </p>

        </div>

        <div className={styles.inputLogin}>

          <button 
            type="button" 
            style={{  backgroundColor: 'var(--blue-dark)' }}
            onClick={ handleLogin }
          >
            <img src="icons/arrow-right.svg" alt="Level" />
          </button> 

        </div>

      </section>
    </div>
  )
}