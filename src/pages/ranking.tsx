import  Head from 'next/head'
import { NavBar } from '../components/NavBar'
import withAuth from '../components/withAuth'
import styles from '../styles/Pages/Ranking.module.css'

function Ranking() {
  
  return (
    <div className={styles.container}>
      <Head>
          <title>Ranking | I Go.it</title>
      </Head>

      <NavBar/>



    </div>
  )
}

export default withAuth(Ranking)