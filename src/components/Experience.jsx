import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const experiencesData = [
    {
        id: '01',
        role: 'Web Designer & Developer Intern',
        company: 'The Janpaksh',
        duration: '6th May 2026 - 7th June 2026',
        description: 'Contributed to website design, responsive web development, user interface creation, and front-end implementation.',
        founder: 'Virender Choudhary',
        links: [
            { label: 'Live Site', url: 'http://www.virenderchoudhary.com' },
            { label: 'GitHub', url: 'https://github.com/ParthKhiriya/virendra-chaudhary-website' }
        ],
        certificate: '/certificate.pdf' // Please ensure the provided PDF is saved as 'certificate.pdf' in the 'public' folder
    }
]

const Experience = () => {
    const sectionRef = useRef(null)

    useEffect(() => {
        const section = sectionRef.current
        if (!section) return

        const cards = section.querySelectorAll('.experience-card')
        cards.forEach((card, i) => {
            gsap.fromTo(card,
                { opacity: 0, y: 50 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    delay: i * 0.2,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: card,
                        start: 'top 85%',
                        toggleActions: 'play none none reverse'
                    }
                }
            )
        })
    }, [])

    return (
        <section className="experience-section" id="experience" ref={sectionRef}>
            <div className="experience-container">
                <div className="experience-header">
                    <span className="experience-label">Career Journey</span>
                    <h2 className="experience-title">Experience</h2>
                </div>
                
                <div className="experience-timeline">
                    {experiencesData.map((exp) => (
                        <div key={exp.id} className="experience-card">
                            <div className="experience-meta">
                                <span className="experience-duration">{exp.duration}</span>
                                <span className="experience-company">{exp.company}</span>
                            </div>
                            <div className="experience-content">
                                <h3 className="experience-role">{exp.role}</h3>
                                <p className="experience-desc">{exp.description}</p>
                                <div className="experience-founder">Founder: {exp.founder}</div>
                                <div className="experience-links">
                                    {exp.links.map((link, i) => (
                                        <a key={i} href={link.url} target="_blank" rel="noopener noreferrer" className="experience-link" data-cursor="VIEW">
                                            {link.label}
                                        </a>
                                    ))}
                                    <a href={exp.certificate} target="_blank" rel="noopener noreferrer" className="experience-link certificate-link" data-cursor="VIEW">
                                        View Certificate
                                    </a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Experience
