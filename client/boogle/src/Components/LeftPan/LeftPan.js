import React from 'react';

import Blocks from '../Blocks/Blocks';
import Input from '../Input/Input';
import Button from '../Button/Button'

import classes from './LeftPan.css'

const leftpan = (props) => {
    return (

        <div className={classes.Block}>
           
            { props.letterLists ?
                <div>
                    <Blocks  
                        letterLists={props.letterLists} matrix={props.matrix}/>
                </div> 
            : 
            <div className={classes.StartBlock}>
                    <p>Click start button to Start Boogle</p>
                    <Button  clicked={() => props.startBoogle(3)} start="true" value="3">
                        Start 3x3
                    </Button>
                    <Button  clicked={() => props.startBoogle(4)} start="true" value="4">
                        Start 4x4
                    </Button>                    
                    <Button  clicked={() => props.startBoogle(5)} start="true" value="5">
                        Start 5x5
                    </Button>                    
                </div>
            } 
           {props.letterLists && <Input 
                submit={props.wordSubmit}
                checkLetter={props.checkLetter}
                currentWord={props.currentWord}
                disabled={props.disabledInput}
            />}
            <p className={classes.ErrorMessage}>{props.errorMessage}</p>
        </div>
    );
}

export default leftpan;