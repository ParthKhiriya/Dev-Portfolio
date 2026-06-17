import { useEffect, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const Navigation = () => {
    const [activeSection, setActiveSection] = useState('hero')

    useEffect(() => {
        const sections = ['hero', 'projects', 'skills', 'experience', 'about', 'contact']

        sections.forEach(sectionId => {
            ScrollTrigger.create({
                trigger: `#${sectionId}`,
                start: 'top center',
                end: 'bottom center',
                onEnter: () => setActiveSection(sectionId),
                onEnterBack: () => setActiveSection(sectionId)
            })
        })

        return () => {
            ScrollTrigger.getAll().forEach(st => st.kill())
        }
    }, [])

    const handleClick = (e, sectionId) => {
        e.preventDefault()
        const target = document.getElementById(sectionId)
        if (target) {
            gsap.to(window, {
                duration: 1.5,
                scrollTo: { y: target, autoKill: false },
                ease: 'expo.inOut'
            })
        }
    }

    const navItems = [
        { id: 'hero', label: 'Home' },
        { id: 'projects', label: 'Works' },
        { id: 'skills', label: 'Skills' },
        { id: 'experience', label: 'Experience' },
        { id: 'about', label: 'About' },
        { id: 'contact', label: 'Contact' }
    ]

    return (
        <nav className="navigation" id="navigation">
            <ul className="nav-list">
                {navItems.map(item => (
                    <li key={item.id} className="nav-item">
                        <a
                            href={`#${item.id}`}
                            className={`nav-link ${activeSection === item.id ? 'active' : ''}`}
                            data-section={item.id}
                            onClick={(e) => handleClick(e, item.id)}
                        >
                            {item.label}
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
    )
}

export default Navigation
