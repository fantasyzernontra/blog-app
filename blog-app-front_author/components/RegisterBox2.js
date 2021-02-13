import { Fragment } from 'react'

import styles from '../styles/RegisterBox2.module.css'

const RegisterBox1 = props => {
    return (
        <Fragment>
            <div className={styles.container}>
                <div>{props.title}</div>
                <textarea rows={6} name={props.name} placeholder={props.placeholder} value={props.value} onChange={props.onChange} />
            </div>
        </Fragment>
    )
}

export default RegisterBox1