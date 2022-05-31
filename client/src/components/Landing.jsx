import React from 'react';
import { Link } from 'react-router-dom';
import './Landing.css';

export default function Landing(){
    return (
        <div className="landing-container">
            <div className='btn-container'>
            <Link to ='/home'>
                <button className='btn-landing'>
                    <span>Perrolandia</span>
                </button>
            </Link>
            </div>
        </div>
    )
}