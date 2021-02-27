import  Head from 'next/head'
import { useState } from 'react'

import styles from '../styles/Pages/Login.module.css'

export default function Login() {
  const [colorButton, setColorButton] = useState('var(--blue-dark)')
  const [valueLogin, setValueLogin] = useState('')
  
  const handleChange = (e) => {

    setValueLogin(e.target.value)

    if (String(e.target.value)){
      setColorButton('var(--green)')
    }else{
      setColorButton('var(--blue-dark)')
    }

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
            onClick={ () => window.location.replace('/') }
          >
            <img src="icons/arrow-right.svg" alt="Level" />
          </button> 

        </div>

      </section>
    </div>
  )
}
