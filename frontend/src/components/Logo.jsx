import React from 'react';
import logoImg from '../../public/logo.png';

function Logo() {
    return (
        <div className="logo">
            <label>Lul</label>
            <img src={logoImg} alt="Logo" />
            <label>in-Labs</label>
        </div>
    );
}

export default Logo;