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
import { validateLogin } from '../hooks/useAuth';


import styles from '../styles/Pages/Home.module.css'

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
  const { level, currentExperience, challengesCompleted, user, theme } = context.req.cookies;

  validateLogin(context)

  return {
    props: {
      level: Number(level),
      currentExperience: Number(currentExperience),
      challengesCompleted: Number(challengesCompleted),
      username: user ? String(user) : '',
      theme: theme ? String(theme) : 'lightTheme'
    }
  }
}

export default Home
// export default withAuth(Home)