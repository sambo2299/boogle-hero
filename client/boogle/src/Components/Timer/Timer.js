import React from 'react'

import classes from './Timer.css';

const timer = props =>{ 
    let timer = props.timer ?  <span >
    { Math.floor(props.timer/60)  } : { props.timer > 60 ? props.timer-60: props.timer} 
</span> : null
    return (
        <div className={classes.Timer}>
            {timer}
        </div>
    ) 
};

export default timer;