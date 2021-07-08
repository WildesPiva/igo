import { useRouter } from 'next/router'
import useDropdownMenu from 'react-accessible-dropdown-menu-hook';
import { useAuthContext } from '../../hooks/useAuth';

import styles from './styles.module.scss'


export const UserOptions = () => {
    const router = useRouter()
    const { user, signOutFirebase } = useAuthContext()
    const { buttonProps, isOpen } = useDropdownMenu(2);

    const handleLogout = async () => {
        await signOutFirebase()
        router.push('/login')
    }

    return (
        <div className={styles.user}>
            <button {...buttonProps} >
                <img src={user?.avatar} alt="User" />
            </button>

            <div className={`${styles.menu} ${isOpen ? styles.visible : styles.invisible}`}>
                <img src={user?.avatar} alt="User" />
                <span>
                    <p>{user?.name}</p>
                    <p>{user?.email}</p>
                </span>
                <button onClick={handleLogout}>Sair</button>
            </div>
        </div>
    )

}