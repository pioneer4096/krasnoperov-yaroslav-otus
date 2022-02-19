import './CloseButton.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import React from 'react';

function CloseButton({click}) {
    return (
        <div className="close-btn">
            <FontAwesomeIcon icon={faXmark} onClick={click}/>
        </div>
    )
}

export default CloseButton
