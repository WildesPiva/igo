import Head from 'next/head'
import { GetServerSideProps } from 'next'
import { NavBar } from '../components/NavBar'
import { CompletedChallenges } from '../components/CompletedChallenges'
import { Countdown } from '../components/Countdown'
import { ExperienceBar } from '../components/ExperienceBar'
import { Profile } from '../components/Profile'
import { ChallengeBox } from '../components/ChallengeBox'
import { CountdownProvider } from '../contexts/CountdownContext'
import { ChalengesProvider } from '../contexts/ChallengesContext'
// import { validateLogin } from '../hooks/useAuth';

import styles from '../styles/Pages/Home.module.css'
import { validadeSession } from '../hooks/validadeSession'
import { database } from '../services/firebaseAdmin'

interface HomeProps {
  level: number,
  currentExperience: number,
  challengesCompleted: number,
  username: string,
  theme: string,
}

const Home = (props: HomeProps) => {

  return (
    <ChalengesProvider
      level={props.level}
      currentExperience={props.currentExperience}
      challengesCompleted={props.challengesCompleted}
    >
      <div className={styles.container}>
        <Head>
          <title>Início | Se mexe ai</title>
        </Head>

        <NavBar />

        <ExperienceBar />

        <CountdownProvider>
          <section>
            <div>
              <Profile />
              <CompletedChallenges />
              <Countdown />
            </div>
            <div>
              <ChallengeBox />
            </div>
          </section>
        </CountdownProvider>

      </div>
    </ChalengesProvider>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {

  // const { level, currentExperience, challengesCompleted, theme } = context.req.cookies;
  // validateLogin(context)

  const user = await validadeSession(context)

  if (!user || !user?.uid) return { props: {} as never };


  const leaderboard = database.ref(`leaderboard/${user.uid}`)
  const valuesSnapshot = await leaderboard.once('value')
  leaderboard.off('value')
  const { challengesCompleted, currentExperience, level } = valuesSnapshot.val() || {}

  const themes = database.ref(`themes/${user.uid}`)
  const themesSnapshot = await themes.once('value')
  themes.off('value')

  const { theme } = themesSnapshot.val() || { theme: 'lightTheme' }

  return {
    props: {
      level: Number(level),
      currentExperience: Number(currentExperience),
      challengesCompleted: Number(challengesCompleted),
      theme
    }
  }
}
export default Home
// export default withAuth(Home)