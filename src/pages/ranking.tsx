import  Head from 'next/head'
import { NavBar } from '../components/NavBar'
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

export default Ranking