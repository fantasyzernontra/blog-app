import { Fragment } from 'react'

import Link from 'next/link'

import styles from '../styles/Article.module.css'

const Article = props => {
    const { API_URL } = process.env
    const PicSrc = `${API_URL}/uploads/small_${props.articlePic}`



    return (
        <Fragment>
            <Link href={`/articles/${props.id}`}>
                <div className={styles.container} style={{'backgroundImage': `url(${PicSrc})`}}>
                    <div>{props.articleName}</div>
                </div>
            </Link>
        </Fragment>
    )
}

export default Article  