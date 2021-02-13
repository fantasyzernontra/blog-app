import { Fragment, useState } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'

import SmallRegisterBox from '../../../components/RegisterBox1'
import BigRegisterBox from '../../../components/RegisterBox2'
import Nav from '../../../components/Layout'

import auth from '../../../utils/auth'
import Axios from 'axios'

import styles from '../../../styles/CreateArticle.module.css'

const CreateArticle = props => {
    const [created, setCreated] = useState({
        title: '',
        cover: '',
        content: ''
    })
    const router = useRouter()

    const InputChangeHandler = e => {
        if (e.target.name === 'cover')
            setCreated({ ...created, cover: e.target.files[0] })
        else
            setCreated({ ...created, [e.target.name]: e.target.value })
    }

    const createArticle = async () => {
        const form = new FormData()
        form.append('data', JSON.stringify({
            title: created.title,
            content: created.content,
            author: localStorage.getItem('authorID'),
            created_by: localStorage.getItem('authorID'),
            updated_by: localStorage.getItem('authorID')
        }))

        form.append('files.cover', created.cover, created.cover.name)

        try {
            await Axios({
                method: 'POST',
                url: 'http://localhost:1337/articles',
                data: form,
                headers: { Authorization: `Bearer ${auth.getToken()}`, 'Content-Type': 'multipart/form-data' }
            })
            router.push('/articles')
        } catch (err) {
            console.log(err.message)
        }
    }

    return (
        <Fragment>
            <Head>
                <title>Create Article - Author System</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className={styles.createArticleContainer}>
                <Nav />

                <div className={styles.content}>
                    <div>
                        <div>Create Article</div>

                        <div className={styles.registerForm}>
                            <SmallRegisterBox title={"Title"} name={'title'} value={created.title} onChange={InputChangeHandler} placeholder={"article's title"} />
                            <SmallRegisterBox title={"Cover"} name={'cover'} onChange={InputChangeHandler} placeholder={"article's cover"} />
                            <BigRegisterBox title={"Content"} name={'content'} value={created.content} onChange={InputChangeHandler} placeholder={"article's content"} />
                            <div>
                                <div onClick={createArticle}>Create</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default CreateArticle