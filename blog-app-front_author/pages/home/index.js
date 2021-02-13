import { Fragment, useEffect, useState } from 'react'
import Nav from '../../components/Layout'
import Head from 'next/head'

import auth from '../../utils/auth'
import Axios from 'axios'

import styles from '../../styles/Home.module.css'

const Home = (props) => {
    const [authorName, setAuthorName] = useState('')
    const [articles_amount, setArticlesAmount] = useState(0)

    const getAmountOfArticles = async () => {
        const authorID = localStorage.getItem('authorID')

        try {
            const { data } = await Axios.get(`http://localhost:1337/articles/count?author=${authorID}`,{
                headers: {
                    'Authorization': `Bearer ${auth.getToken()}`
                }
            })
            setArticlesAmount(data)
        } catch (err) {
            console.log(err.message)
        }
    }

    useEffect(() => {
        getAmountOfArticles()
        setAuthorName(localStorage.getItem('author_name'))
    }, [])

    return (
        <Fragment>
            <Head>
                <title>Home - Author System</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className={styles.homeContainer}>

                <Nav />
                <div>
                    <div>Welcome Back!</div>
                    <div>{authorName}</div>
                    <div>Articles Amount: {articles_amount}</div> 
                </div>
            </div>
        </Fragment>
    )
}

export default Home