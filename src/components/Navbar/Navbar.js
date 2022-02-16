import React from 'react';
import { Link } from 'react-router-dom';
import './style.css';

function Navbar() {
    return (
        <div className="Navbar">
            <Link to="/">Home</Link>
        </div>
    );
}

export default Navbar;