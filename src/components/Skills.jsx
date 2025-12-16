import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const skillsData = [
    {
        category: 'Languages',
        skills: [
            { name: 'C++', icon: '⚡', color: '#00599C' },
            { name: 'Python', icon: '🐍', color: '#3776AB' },
            { name: 'JavaScript', icon: '✨', color: '#F7DF1E' },
            { name: 'TypeScript', icon: '📘', color: '#3178C6' }
        ]
    },
    {
        category: 'Frontend',
        skills: [
            { name: 'React', icon: '⚛️', color: '#61DAFB' },
            { name: 'Next.js', icon: '▲', color: '#ffffff' },
            { name: 'HTML5', icon: '🌐', color: '#E34F26' },
            { name: 'CSS3', icon: '🎨', color: '#1572B6' },
            { name: 'Tailwind', icon: '💨', color: '#06B6D4' },
            { name: 'GSAP', icon: '🎬', color: '#88CE02' }
        ]
    },
    {
        category: 'Backend',
        skills: [
            { name: 'Node.js', icon: '🟢', color: '#339933' },
            { name: 'Express.js', icon: '🚀', color: '#ffffff' },
            { name: 'MongoDB', icon: '🍃', color: '#47A248' },
            { name: 'REST APIs', icon: '🔗', color: '#FF6B6B' },
            { name: 'Socket.io', icon: '🔌', color: '#010101' },
            { name: 'JWT', icon: '🔐', color: '#D63AFF' }
        ]
    },
    {
        category: 'Data Science & ML',
        skills: [
            { name: 'Pandas', icon: '🐼', color: '#150458' },
            { name: 'NumPy', icon: '🔢', color: '#013243' },
            { name: 'Scikit-learn', icon: '🤖', color: '#F7931E' },
            { name: 'NLP', icon: '💬', color: '#7B68EE' },
            { name: 'Matplotlib', icon: '📊', color: '#11557C' }
        ]
    },
    {
        category: 'Tools & Platforms',
        skills: [
            { name: 'Git', icon: '📝', color: '#F05032' },
            { name: 'GitHub', icon: '🐙', color: '#ffffff' },
            { name: 'VS Code', icon: '💻', color: '#007ACC' },
            { name: 'Postman', icon: '📮', color: '#FF6C37' },
            { name: 'Linux', icon: '🐧', color: '#FCC624' }
        ]
    }
]

const Skills = () => {
    const sectionRef = useRef(null)

    return (
        <section className="skills-section" id="skills" ref={sectionRef}>
            <div className="skills-container">
                <div className="skills-header">
                    <span className="skills-label">What I Work With</span>
                    <h2 className="skills-section-title">Technical Arsenal</h2>
                    <p className="skills-section-subtitle">
                        Technologies I use to bring ideas to life
                    </p>
                </div>

                <div className="skills-grid-container">
                    {skillsData.map((category, idx) => (
                        <div key={idx} className="skill-category-card">
                            <h3 className="skill-category-title">{category.category}</h3>
                            <div className="skill-items-grid">
                                {category.skills.map((skill, i) => (
                                    <div
                                        key={i}
                                        className="skill-item"
                                        style={{ '--skill-color': skill.color }}
                                    >
                                        <span className="skill-icon">{skill.icon}</span>
                                        <span className="skill-name">{skill.name}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="skills-stats">
                    <div className="stat-item">
                        <span className="stat-number">4+</span>
                        <span className="stat-label">Projects Built</span>
                    </div>
                    <div className="stat-item">
                        <span className="stat-number">20+</span>
                        <span className="stat-label">Technologies</span>
                    </div>
                    <div className="stat-item">
                        <span className="stat-number">2+</span>
                        <span className="stat-label">Years Learning</span>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Skills
