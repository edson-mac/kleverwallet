import React from 'react';
import { useNavigate } from "react-router";
import logo from '../assets/logo.svg';
import star from '../assets/shooting-star.svg';
import './Header.css';


function Header() {

    const navigate = useNavigate();

    return (
        <div className='headerWindow'>
            <img className="kleverLogo" src={logo} alt="Klever Logo" />
            <div className='underLogo'>
                <div className='stardiv'>
                    <img className="star" src={star} alt="star Logo" />
                    <p className='wishWallet'>Wish Wallet</p>
                </div>
                <div className='buttonDiv'>{window.location.pathname === '/' &&
                    <button className="addButton" onClick={() => navigate('/addtoken')}><span>Add Token</span></button>}</div>
            </div>
        </div >
    );

}

export default Header;
