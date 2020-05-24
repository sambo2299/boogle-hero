import React from 'react'

import classes from './Button.css';

const button = (props) => 
<button className={[classes.Button, props.refresh ? classes.ButtonRefresh : classes.ButtonStart].join(' ')} onClick={props.clicked}>
    {props.children}
</button>

export default button;