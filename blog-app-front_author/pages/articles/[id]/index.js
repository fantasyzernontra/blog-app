import { Fragment, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'

import Axios from 'axios'
import Nav from '../../../components/Layout'

import styles from '../../../styles/ID.module.css'

const SpecificArticle = ({ id }) => {
    const [article, setArticle] = useState(null)
    const router = useRouter()
    const { API_URL } = process.env

    const getArticle = async () => {
        try {
            const { data } = await Axios.get(`${API_URL}/articles/${router.query.id}`)
            setArticle(data)
        } catch (err) {
            console.log(err.message)
        }
    }

    useEffect(() => {
        getArticle()
    }, [])

    let content = null

    if (article) {
        content = (
            <Fragment>
                <Head>
                    <title>{article.title} - Author System</title>
                    <link rel="icon" href="/favicon.ico" />
                </Head>
                <div>{article.title}</div>
                <div>{`Written By ${article.author.name}`}</div>
                <div><img src={'http://localhost:1337' + article.cover.formats.small.url} width={300} height={300} /></div>
                <div>{article.content}</div>
            </Fragment>
        )
    }

    return (
        <Fragment>
            <div className={styles.articleContainer}>
                <Nav />

                <div className={styles.content}>
                    {content}
                </div>
            </div>
        </Fragment >
    )
}

export default SpecificArticle