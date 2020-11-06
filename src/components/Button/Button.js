import React from 'react';
import './Button.scss'

const Button = props =>(
        <button
            className='btn'
            onClick={props.clicked}
            disabled={props.disabled}
        >
            {props.children}
        </button>
    )

export default Button