import React from 'react';

import classes from './Input.css'
const input = (props) => {
    let cuword = props.currentWord ? props.currentWord : '';
    return (
        <form onSubmit={props.submit} className={classes.InputForm}>
            <input type="text" className={classes.Input}
            onChange={props.checkLetter}
            value={cuword} 
            disabled={props.disabled}
            autoFocus
            ></input>
        </form>

    )
} 


export default input;