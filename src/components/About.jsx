import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const About = () => {
    const sectionRef = useRef(null)

    useEffect(() => {
        const section = sectionRef.current
        if (!section) return

        // Animate title words
        const words = section.querySelectorAll('.about-title .word')
        words.forEach((word, i) => {
            gsap.to(word, {
                opacity: 1,
                y: 0,
                duration: 0.8,
                delay: i * 0.1,
                ease: 'expo.out',
                scrollTrigger: {
                    trigger: '.about-title',
                    start: 'top 80%',
                    toggleActions: 'play none none reverse'
                }
            })
        })

        // Animate philosophy items
        const philosophyItems = section.querySelectorAll('.philosophy-item')
        philosophyItems.forEach((item, i) => {
            gsap.to(item, {
                opacity: 1,
                y: 0,
                duration: 0.8,
                delay: i * 0.15,
                ease: 'expo.out',
                scrollTrigger: {
                    trigger: item,
                    start: 'top 85%',
                    toggleActions: 'play none none reverse'
                }
            })
        })

        // Portrait parallax
        const portraitFrame = section.querySelector('.portrait-frame')
        const portraitDecoration = section.querySelector('.portrait-decoration')

        const handleMouseMove = (e) => {
            const rect = section.getBoundingClientRect()
            const x = (e.clientX - rect.left) / rect.width
            const y = (e.clientY - rect.top) / rect.height

            gsap.to(portraitFrame, {
                x: (x - 0.5) * 20,
                y: (y - 0.5) * 20,
                duration: 0.8,
                ease: 'power2.out'
            })

            gsap.to(portraitDecoration, {
                x: (x - 0.5) * -10,
                y: (y - 0.5) * -10,
                duration: 0.8,
                ease: 'power2.out'
            })
        }

        section.addEventListener('mousemove', handleMouseMove)

        return () => {
            section.removeEventListener('mousemove', handleMouseMove)
        }
    }, [])


    return (
        <section className="about" id="about" ref={sectionRef}>
            <div className="about-container">
                <div className="about-portrait">
                    <div className="portrait-frame">
                        <div className="portrait-image">
                            <div className="portrait-placeholder">
                                <span className="portrait-initials">PK</span>
                            </div>
                        </div>
                        <div className="portrait-decoration"></div>
                    </div>
                </div>
                <div className="about-content">
                    <h2 className="about-title">
                        <span className="word" data-reveal>I</span>
                        <span className="word" data-reveal>BELIEVE</span>
                        <span className="word" data-reveal>IN</span>
                        <br />
                        <span className="word highlight" data-reveal>CODE</span>
                        <span className="word" data-reveal>THAT</span>
                        <br />
                        <span className="word italic" data-reveal>BREATHES</span>
                    </h2>
                    <div className="about-philosophy">
                        <div className="philosophy-item" data-reveal>
                            <span className="philosophy-label">Approach</span>
                            <p>Every line of code is an opportunity to create something meaningful. I blend technical precision with creative vision.</p>
                        </div>
                        <div className="philosophy-item" data-reveal>
                            <span className="philosophy-label">Focus</span>
                            <p>Full-stack development with a passion for interactive experiences, machine learning, and scalable systems.</p>
                        </div>
                        <div className="philosophy-item" data-reveal>
                            <span className="philosophy-label">Background</span>
                            <p>B.Tech in Electrical Engineering at IIT Jodhpur. Full Stack Developer and Machine Learning enthusiast.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default About
