import './CloseButton.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import React from 'react';

function CloseButton({click}) {
    function clickHandler(e) {
        e.stopPropagation();
        e.preventDefault();
        click();
    }

    return (
        <div className="close-btn">
            <FontAwesomeIcon icon={faXmark} onClick={clickHandler}/>
        </div>
    )
}

export default CloseButton
