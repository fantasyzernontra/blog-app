import { Fragment } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import NavData from '../data/Navbar'

import auth from '../utils/auth'
import Axios from 'axios'

import styles from '../styles/Layout.module.css'
import { route } from 'next/dist/next-server/server/router'

const Layout = props => {
    const router = useRouter()

    const LogoutHandler = async () => {
        try {
            auth.clearToken()
            router.push('/')
        } catch (err) {
            console.log(err.message)
        }
    }

    return (
        <Fragment>
            <div className={styles.navcontainer}>
                <div>Articles System</div>
                <ul>
                    {NavData.map((nav, ind) => {
                        return (<li className={router.pathname === nav.href || (router.pathname === '/articles/create' && nav.name === 'Articles' ? true : false) ? styles.active : ''} key={ind}><Link href={nav.href}>{nav.name}</Link></li>)
                    })}
                    <div onClick={LogoutHandler}>Log Out</div>
                </ul>
            </div>
            {props.children}
        </Fragment>
    )
}

export default Layout