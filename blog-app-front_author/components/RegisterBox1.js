import { Fragment } from 'react'

import styles from '../styles/RegisterBox1.module.css'

const RegisterBox1 = props => {
    return (
        <Fragment>
            <div className={styles.container}>
                <div>{props.title}</div>
                {props.name === 'cover' ? <input type="file" name={props.name} placeholder={props.placeholder}  onChange={props.onChange} /> : <input type="text" name={props.name} placeholder={props.placeholder} value={props.value} onChange={props.onChange} />}
            </div>
        </Fragment>
    )
}

export default RegisterBox1