import Head from 'next/head'
import { useEffect, useState } from 'react'
import { GetServerSideProps } from 'next'
import { Profile } from '../components/Profile'
import { NavBar } from '../components/NavBar'

import { validadeSession } from '../hooks/validadeSession'

import { database } from '../services/firebase'
import { database as databaseAdmin } from '../services/firebaseAdmin'
import { useAuthContext } from '../hooks/useAuth'

import styles from '../styles/Pages/Ranking.module.css'

interface RankingProps {
  level: number,
  currentExperience: number,
  challengesCompleted: number,
  username: string,
  theme: string
}

type FirebaseLeaderboard = Record<string, {
  avatar: string
  challengesCompleted: number
  currentExperience: number
  level: number
  username: string
}>

type UserRanking = {
  uuid: string
  avatar: string
  challengesCompleted: number
  currentExperience: number
  level: number
  username: string
}

function Ranking(props: RankingProps) {
  const { user } = useAuthContext()
  const [usersRanking, setUsersRanking] = useState<UserRanking[]>([])

  useEffect(() => {
    const rankingRef = database.ref(`leaderboard`).limitToLast(100)
    rankingRef.on("value", room => {
      const databaseRoom = room.val()

      if (!databaseRoom) {
        return
      }

      const firebaseLeaderboard: FirebaseLeaderboard = databaseRoom ?? {}
      const parsedLeaderboard = Object.entries(firebaseLeaderboard).map((([key, value]) => ({
        uuid: key,
        avatar: value.avatar,
        challengesCompleted: value.challengesCompleted,
        currentExperience: value.currentExperience,
        level: value.level,
        username: value.username
      })))

      setUsersRanking(parsedLeaderboard.sort(function (a, b) {
        if ((a.level + a.challengesCompleted) < (b.level + b.challengesCompleted)) {
          return 1;
        }
        if ((a.level + a.challengesCompleted) > (b.level + b.challengesCompleted)) {
          return -1;
        }
        // a must be equal to b
        return 0;
      }))
    })

    return () => { rankingRef.off("value") }
  }, [])

  return (
    <div className={styles.container}>
      <Head>
        <title>Ranking | Se mexe ai</title>
      </Head>

      <NavBar />

      <section>
        <h1>Leaderboard</h1>
        <div>
          <table>
            <thead>
              <tr>
                <td>Posição</td>
                <td>Usuário</td>
                <td>Desafios</td>
                <td>Experiência</td>
              </tr>
            </thead>
            <tbody>
              {usersRanking.map((userRank, index) => {
                const isAuthenticatedUser = Boolean((userRank?.uuid === user?.id) && userRank)
                return (
                  <tr className={isAuthenticatedUser ? styles.userLogged : ''} key={userRank.uuid}>
                    <td>{index + 1}</td>
                    <td>
                      <Profile
                        renderUser={{
                          avatar: userRank.avatar,
                          name: userRank.username,
                          id: userRank.uuid
                        }}
                        renderLevel={userRank.level} />
                    </td>
                    <td><b>{userRank.challengesCompleted}</b> completados</td>
                    <td><b>{userRank.currentExperience}</b> XP</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </section>

    </div>
  )

}

export const getServerSideProps: GetServerSideProps = async (context) => {

  // const { level, currentExperience, challengesCompleted, theme } = context.req.cookies;
  // validateLogin(context)

  const user = await validadeSession(context)
  if (!user || !user?.uid) return { props: {} as never };

  const themes = databaseAdmin.ref(`themes/${user.uid}`)
  const themesSnapshot = await themes.once('value')
  themes.off('value')

  const { theme } = themesSnapshot.val() || { theme: 'lightTheme' }

  return {
    props: {
      theme
    }
  }
}

export default Ranking