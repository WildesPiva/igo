import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useAuthContext } from '../hooks/useAuth'
// import { useContext, useEffect, useState } from 'react'
import styles from '../styles/Pages/Login.module.css'
// import { UserContext } from '../contexts/UserContext'
// import { GetServerSideProps } from 'next'


export default function Login() {
  const router = useRouter()
  const { user, signInWithGoogle } = useAuthContext()

  useEffect(() => {
    if (user) {
      const { redirected, to } = router.query

      router.replace(redirected ? String(to) : '/')
    }
  }, [user])

  const handleLogin = async () => {
    await signInWithGoogle()
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Login | Se mexe ai</title>
      </Head>

      <img src="/icons/simbol.svg" alt="Simbolo Grande" className={styles.logoGrande} />

      <section>

        <img src="/logo-full-white.png" alt="Moveit Logo Complete" className={styles.logoMoveit} />

        <div className={styles.apresentation}>

          <strong>Bem-vindo</strong>

          <p>
            <img src="icons/google.svg" alt="Level" />
            Faça login com a sua conta Google
          </p>

        </div>

        <div className={styles.inputLogin}>

          <button
            type="button"
            style={{ backgroundColor: 'var(--primary-dark)' }}
            onClick={handleLogin}
          >
            <img src="icons/arrow-right.svg" alt="Level" />
          </button>

        </div>

      </section>
    </div>
  )
}