import { createContext, useState, ReactNode, useEffect } from 'react'
import Cookies from 'js-cookie'
import { LevelUpModal } from '../components/LevelUpModal';
import { database } from '../services/firebase';

interface Challenge {
  type: 'body' | 'eye',
  description: string,
  amount: number
}

interface ChallengesContextData {
  level: number,
  currentExperience: number,
  challengesCompleted: number,
  activeChallenge: Challenge,
  experienceToNextLevel: number,
  levelUp: () => void,
  startNewChallenge: () => void,
  resetChallenge: () => void,
  completeChallenge: () => void,
  closeLevelUpModal: () => void,
}

interface ChalengesProviderProps {
  children: ReactNode;
  level: number;
  currentExperience: number;
  challengesCompleted: number
}

export const ChallengesContext = createContext({} as ChallengesContextData)

export function ChalengesProvider({ children, ...rest }: ChalengesProviderProps) {
  const [level, setLevel] = useState(rest.level ?? 1);
  const [currentExperience, setCurrentExperience] = useState(rest.currentExperience ?? 0);
  const [challengesCompleted, setChallengesCompleted] = useState(rest.challengesCompleted ?? 0);
  const [challenges, setChallenges] = useState<Challenge[]>()
  const [activeChallenge, setActiveChallenge] = useState(null)
  const [isLevelUpModalOpen, setIsLevelUpModalOpen] = useState(false)
  const experienceToNextLevel = Math.pow((level + 1) * 4, 2)

  useEffect(() => {
    const roomRef = database.ref(`challenges`)
    roomRef.once("value", room => {
      // const databaseChallenges = room.val()
      setChallenges(room.val())
    })
    return () => { roomRef.off("value") }
  }, [])

  function levelUp() {
    setLevel(level + 1)
    setIsLevelUpModalOpen(true)
    new Audio('/congrats.mp3').play()
  }

  function closeLevelUpModal() {
    setIsLevelUpModalOpen(false)
  }

  useEffect(() => {
    Notification.requestPermission()
  }, [])

  useEffect(() => {

    Cookies.set('level', String(level))
    Cookies.set('currentExperience', String(currentExperience))
    Cookies.set('challengesCompleted', String(challengesCompleted))

  }, [level, currentExperience, challengesCompleted])

  function startNewChallenge() {
    const randomChallengeIndex = Math.floor(Math.random() * challenges.length)
    const challenge = challenges[randomChallengeIndex]

    setActiveChallenge(challenge)

    new Audio('/notification.mp3').play()

    if (Notification.permission === 'granted') {
      new Notification('Novo desafio 🎉', {
        body: `Valendo ${challenge.amount}xp!`
      })
    }
  }

  function resetChallenge() {
    setActiveChallenge(null)
  }

  function completeChallenge() {
    if (!activeChallenge) {
      return
    }

    const { amount } = activeChallenge

    let finalExperince = currentExperience + amount

    if (finalExperince >= experienceToNextLevel) {
      finalExperince = finalExperince - experienceToNextLevel
      levelUp()
    }

    setCurrentExperience(finalExperince)
    setActiveChallenge(null)
    setChallengesCompleted(challengesCompleted + 1)
  }

  return (
    <ChallengesContext.Provider
      value={{
        level,
        currentExperience,
        challengesCompleted,
        activeChallenge,
        experienceToNextLevel,
        levelUp,
        startNewChallenge,
        resetChallenge,
        completeChallenge,
        closeLevelUpModal
      }}
    >
      {children}
      {isLevelUpModalOpen && <LevelUpModal />}
    </ChallengesContext.Provider>
  )
}