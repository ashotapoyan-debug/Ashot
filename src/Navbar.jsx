import { useState } from 'react'

export default function Navbar({ activeTab, setActiveTab }) {
    // Local state to track if the mobile hamburger menu is open
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="navbar-container">
            {/* Logo/Brand Section */}
            <div className="navbar-logo">
                NASA
            </div>

            {/* Hamburger icon for smaller screens */}
            <button
                className={`navbar-toggle ${isOpen ? 'open' : ''}`}
                onClick={() => setIsOpen(!isOpen)}
                aria-label="Toggle navigation menu"
            >
                <span className="bar"></span>
                <span className="bar"></span>
                <span className="bar"></span>
            </button>

            {/* Navigation Links Menu */}
            <div className={`navbar-menu ${isOpen ? 'is-active' : ''}`}>
                <button
                    className={`navbar-item ${activeTab === 'dashboard' ? 'active' : ''}`}
                    onClick={() => { setActiveTab('dashboard'); setIsOpen(false); }}
                >
                    Dashboard
                </button>
                <button
                    className={`navbar-item ${activeTab === 'solarsystem' ? 'active' : ''}`}
                    onClick={() => { setActiveTab('solarsystem'); setIsOpen(false); }}
                >
                    Solar System
                </button>
                <button
                    className={`navbar-item ${activeTab === 'card' ? 'active' : ''}`}
                    onClick={() => { setActiveTab('card'); setIsOpen(false); }}
                >
                    Photo and Video
                </button>
                <button
                    className={`navbar-item ${activeTab === 'card' ? 'active' : ''}`}
                    onClick={() => { setActiveTab('card'); setIsOpen(false); }}
                >
                    Constellations
                </button>
            </div>
        </nav>
    )
}
