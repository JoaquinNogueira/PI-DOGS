import React from 'react';
import { Link } from 'react-router-dom';
import './Landing.css';

export default function Landing(){
    return (
        <div className="landing-container">
            <h1 className='texto-landing'>Bienvenidos a Perrolandia</h1>
            <div className='btn-container'>
            <Link to ='/home'>
                <button className="btn-landing">
                    Home
                </button>
            </Link>
            </div>
        </div>
    )
}