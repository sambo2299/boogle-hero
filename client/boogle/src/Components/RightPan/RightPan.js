import React from 'react'

import classes from './RightPan.css';
import Timer from '../Timer/Timer';
import Button from '../Button/Button';
import Block from '../WordLists/WordLists';

const rightPan = (props) => {
    const playingBlock = props.playing ? 
    <div>
        <Button
            clicked={props.refresh}
            refresh="true">
            Refresh
        </Button>
        <Timer timer={props.timer}/>
        <Block id="wordboard"
            playing={props.playing}
            userWords={props.userWords}
        />
    </div> : null
    return(
        <div className={classes.Block}>
        {playingBlock}
        {props.score && <Block id="scoreboard" 
            playing={props.playing}
            score={props.score}
            />}
    </div>
    )
}

export default rightPan;