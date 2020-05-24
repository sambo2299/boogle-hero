import React from "react";


import Header from '../Header/Header';
import classes from './Layout.css';

const layout = (props) =>
    <div className={classes.MainContainer}>
        <Header 
        />
        <main>
            {props.children}
        </main>        
    </div>


export default layout;