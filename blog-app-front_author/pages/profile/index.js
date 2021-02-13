import { Fragment, useEffect, useState } from 'react'
import Head from 'next/head'

import Nav from '../../components/Layout'
import Axios from 'axios'

import styles from '../../styles/Profile.module.css'
import auth from '../../utils/auth'

const Profile = props => {
    const { API_URL } = process.env
    const [author, SetAuthor] = useState(null)

    const getProfile = async () => {
        try {
             const { data } = await Axios.get(`${API_URL}/users/me`, {
                 headers: {
                     Authorization: `Bearer ${auth.getToken()}`
                 }
             })
             SetAuthor(data)
             console.log(data)
        } catch(err) {
            console.log(err.message)
        }
    }

    useEffect(() => {
        getProfile()
    }, [])

    return (
        <Fragment>
            <Head>
                <title>Profie - Author System</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <div className={styles.profileContainer}>
                <Nav />
                <div className={styles.content}>
                    <div className={styles.profilePic}></div>
                    <div>{author.name}</div>
                    <div>{author.email}</div>
                </div>

            </div>
        </Fragment>
    )
}

export default Profile