import React from 'react';
import './Homepage.css'

function Homepage(props) {
    return (
        <div className='homepage-wrapper'>
            <div className='homepage-text-display'>
                <span>Welcome to THE MASTERBALL!!!</span>
                <span>Please Sign up, or sign in in the top right corner to get started.</span>
                <span className='smaller-text'>{'(Disclaimer, you will not be notified of whether your sign up was successful or not, so sign in and if you don\'t see a difference in the sign in\/up bubble, try again with different information.'}</span>
            </div>
        </div>
    );
}

export default Homepage;