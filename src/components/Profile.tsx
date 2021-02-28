import { useContext } from 'react';
import Cookies from 'js-cookie'
import { ChallengesContext } from '../contexts/ChallengesContext';
import styles from '../styles/components/Profile.module.css';

export function Profile() {
  const { level } = useContext(ChallengesContext)
  const username = Cookies.get('username')
  return (
    <div className={styles.profileContainer}>
      <img src={`https://github.com/${username}.png`} alt={`${username}`}/>
      <div>
        <strong>{username}</strong>
        <p>
          <img src="icons/level.svg" alt="Level" />
          Level {level}
        </p>
      </div>
    </div>
    )
  }