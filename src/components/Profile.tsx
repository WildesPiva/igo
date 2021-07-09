import { useContext } from 'react';
import { ChallengesContext } from '../contexts/ChallengesContext';
import { useAuthContext } from '../hooks/useAuth';

import styles from '../styles/components/Profile.module.css';

type User = {
  id: string,
  name: string,
  avatar: string,
}

type ProfileProps = {
  renderUser?: User,
  renderLevel?: number
}

export function Profile({ renderUser, renderLevel }: ProfileProps) {
  const { level } = useContext(ChallengesContext)
  const { user } = useAuthContext()
  const finalUser = renderUser || user
  const finalLevel = renderLevel || level

  return (
    <div className={`${styles.profileContainer}`}>
      <img src={finalUser?.avatar} alt={finalUser?.name} />
      <div>
        <strong>{finalUser?.name}</strong>
        <p>
          <img src="icons/level.svg" alt="Level" />
          Level {finalLevel}
        </p>
      </div>
    </div>
  )
}