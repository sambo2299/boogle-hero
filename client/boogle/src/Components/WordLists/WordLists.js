import React from 'react'

import classes from './WordLists.css'

const wordLists = (props) => {
    let wordlist = null;
    if(props.playing) {
        wordlist = props.userWords  ? props.userWords.map((itms, idx) =><li key={idx} className={classes.Items}>{itms}</li>) : null;
    };
    // console.log("score",props.score);
    if(props.score && props.score.validList) {
        wordlist = props.score  ? props.score.validList.map((itms, idx) =><li key={idx} className={classes.ItemsScore}>{itms.word} {itms.score}</li>) : null;
    }
    // let header = {}
    return (
        <div className={classes.Block}>
            { props.score && <h4>Total score: {props.score.totalscore}</h4>}
        <ul className={classes.Lists}>
            {
            wordlist
            }
        </ul>
    </div>
    );
}

export default wordLists;