import { Fragment, useState, useEffect } from 'react'
import Link from 'next/link'
import Head from 'next/head'

import Nav from '../../components/Layout'
import Article from '../../components/Article'
import Axios from 'axios'

import styles from '../../styles/Articles.module.css'

const Articles = props => {
    const [articles, setArticles] = useState('')
    const { API_URL } = process.env

    const getArticles = async () => {
        const authorID = localStorage.getItem('authorID')

        try {
            const { data } = await Axios.get(`${API_URL}/articles?author=${authorID}`)
            setArticles(data)
        } catch (err) {
            console.log(err.message)
        }
    }

    let content = null

    if (articles) {
        content = articles.map((arti, ind) => {
            return (
                <Article key={ind} id={arti.id} articleName={arti.title} articlePic={arti.cover.hash + arti.cover.ext} />
            )
        })
    }

    useEffect(() => {
        getArticles()
    }, [])

    return (
        <Fragment>
            <Head>
                <title>Articles - Author System</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className={styles.articlesContainer}>
                <Nav />
                <div className={styles.content}>
                    <div>
                        <div>Articles</div>
                        <Link href='/articles/create'><div>Create Article</div></Link>
                    </div>

                    <div className={styles.articleWrapper}>
                        {content}
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default Articles