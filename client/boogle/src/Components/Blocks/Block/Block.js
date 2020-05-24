import React from 'react'

import classes from './Block.css';

const block = (props) => {
    let letterBlock = [];
    letterBlock = props.letters.map((letterItm, idx) => {
        return (
            <td 
                key={idx} 
                className={classes.letterBox}>
                <span>
                    {letterItm}
                </span>
            </td>
        );
    });   
    return (
    <tr>
        {letterBlock}
    </tr>
    ); 
}

export default block;
