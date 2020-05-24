import React, { Component } from "react";

import classes from './Blocks.css'
import Block from './Block/Block';

class Blocks extends Component {

    shouldComponentUpdate(nextProps, nextState){
        return (
            nextProps.letterLists !== this.props.letterLists 
            );
    }

    /* componentDidUpdate() {
        console.log('will update')
    } */

    render () {
        let letterLists = this.props.letterLists ? [...this.props.letterLists] : null;
        let letterBuilderLists = [];
        let row = letterLists ? [] : null;
        if(letterLists) {
            while(letterLists.length) {
                letterBuilderLists.push(letterLists.splice(0,this.props.matrix))
            }
            row = letterBuilderLists.map((rowitm,idx) =>
                        <Block key={idx} letters={rowitm} />
            );
        }
        
        return (
            <table className={classes.LetterBlock}>
                <tbody>
                    {row}
                </tbody>
            </table>
        );
    }
}

export default Blocks;