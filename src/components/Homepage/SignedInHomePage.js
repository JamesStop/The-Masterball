import React from 'react';
import './Homepage.css'

function SignedInHomePage(props) {
    return (
         <div className='homepage-wrapper'>
            <div className='homepage-text-display'>
                <span>Welcome to THE MASTERBALL {localStorage.getItem('username')}!!!</span>
                <span>To get started, simply click your name in the top right corner to be taken to the start of your pokemon team creation process!</span>
            </div>
        </div>
    );
}

export default SignedInHomePage;