import Link from 'next/link'
import { useRouter } from 'next/router'
import { useContext } from 'react'
import { UserContext } from '../contexts/UserContext'
import styles from '../styles/components/NavBar.module.css'

export function NavBar () {
  const router = useRouter()
  const { changeTheme } = useContext(UserContext)

  return (
    <div className={styles.container}>
      <img src="/logo.svg" alt="Icone Moveit Menu"/>
      <nav>
        <ul>

          <li className={(router.asPath === '/') ? styles.itemActive : ''}>
            <Link href="/">
              <a>
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4 12L16 2.66663L28 12V26.6666C28 27.3739 27.719 28.0522 27.219 28.5522C26.7189 29.0523 26.0406 29.3333 25.3333 29.3333H6.66667C5.95942 29.3333 5.28115 29.0523 4.78105 28.5522C4.28095 28.0522 4 27.3739 4 26.6666V12Z" />
                    <path d="M12 29.3333V16H20V29.3333" />
                </svg>
              </a>
            </Link>
          </li>

          <li className={(router.asPath === '/ranking') ? styles.itemActive : ''}>
            <Link href="/ranking">
              <a>
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16.0001 20C21.1547 20 25.3334 15.8214 25.3334 10.6667C25.3334 5.51205 21.1547 1.33337 16.0001 1.33337C10.8454 1.33337 6.66675 5.51205 6.66675 10.6667C6.66675 15.8214 10.8454 20 16.0001 20Z" />
                    <path d="M10.9466 18.52L9.33325 30.6667L15.9999 26.6667L22.6666 30.6667L21.0533 18.5067" />
                </svg>
              </a>
            </Link>

          </li>      

        </ul>

      </nav>

      <div className={styles.theme}>
        <button onClick={changeTheme}>
          <svg aria-hidden="true" focusable="false" width="32" height="32" preserveAspectRatio="xMidYMid meet" viewBox="0 0 2267 2267">
            <path d="M0 1133q0-39 27-66q28-26 64-26h218q37 0 61.5 27t24.5 65t-24.5 64.5T309 1224H91q-37 0-64-27t-27-64zm305 739q0-37 25-65l157-152q24-25 63-25q38 0 63.5 24t25.5 61q0 39-26 68l-152 152q-65 51-131 0q-25-27-25-63zm0-1477q0-37 25-65q31-26 68-26q35 0 63 26l152 157q26 24 26 63q0 38-25.5 63.5T550 639q-39 0-63-26L330 461q-25-27-25-66zm272 738q0-149 75-277.5T855.5 652t277.5-75q112 0 215 44.5t177.5 119T1644 918t44 215q0 150-74.5 278T1411 1613.5t-278 74.5t-278-74.5T652 1411t-75-278zm465 829q0-38 26.5-64t64.5-26q39 0 65 26t26 64v212q0 39-26.5 66t-64.5 27t-64.5-27t-26.5-66v-212zm0-1653V91q0-37 27-64t64-27t64 27t27 64v218q0 37-26.5 61.5T1133 395t-64.5-24.5T1042 309zm11 461q139 17 233.5 123t94.5 249q0 133-83.5 234.5T1086 1506q32 4 47 4q156 0 266.5-110.5T1510 1133q0-154-110.5-263T1133 761q-41 0-80 9zm578 945q0-37 24-60q24-25 60-25q39 0 64 25l156 152q26 28 26 65t-26 63q-64 50-128 0l-152-152q-24-27-24-68zm0-1165q0-40 24-63l152-157q28-26 63-26q38 0 64.5 27t26.5 64q0 40-26 66l-156 152q-29 26-64 26q-36 0-60-25.5t-24-63.5zm241 583q0-38 26-66q26-26 61-26h216q37 0 64.5 27.5t27.5 64.5t-27.5 64t-64.5 27h-216q-37 0-62-26.5t-25-64.5z" fill="#626262"/>
          </svg>
        </button>
      </div>

    </div>
  )
}