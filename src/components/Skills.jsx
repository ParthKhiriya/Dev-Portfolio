import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const skillsData = [
    {
        category: 'Programming',
        skills: [
            { name: 'Python', icon: '🐍', color: '#3776AB' },
            { name: 'C/C++', icon: '⚡', color: '#00599C' },
            { name: 'JavaScript', icon: '✨', color: '#F7DF1E' },
            { name: 'TypeScript', icon: '📘', color: '#3178C6' },
            { name: 'DSA', icon: '🧩', color: '#E8D5B7' },
            { name: 'Graph Theory', icon: '🕸️', color: '#8B7E6F' }
        ]
    },
    {
        category: 'Machine Learning & DL',
        skills: [
            { name: 'PyTorch', icon: '🔥', color: '#EE4C2C' },
            { name: 'TensorFlow', icon: '🧠', color: '#FF6F00' },
            { name: 'scikit-learn', icon: '🤖', color: '#F7931E' },
            { name: 'Keras', icon: '🧮', color: '#D00000' },
            { name: 'Torchaudio', icon: '🎧', color: '#EE4C2C' },
            { name: 'ResNet', icon: '🧠', color: '#00599C' },
            { name: 'CLRNet', icon: '🛣️', color: '#695C4C' },
            { name: 'NLP', icon: '🗣️', color: '#A69B8D' }
        ]
    },
    {
        category: 'AI & Agents',
        skills: [
            { name: 'Vercel AI SDK', icon: '🔺', color: '#000000' },
            { name: 'OpenRouter', icon: '🔀', color: '#4B5563' },
            { name: 'Google Gemini AI', icon: '✨', color: '#4285F4' },
            { name: 'OpenClaw', icon: '🦞', color: '#FF4500' }
        ]
    },
    {
        category: 'Data Analysis & Prototyping',
        skills: [
            { name: 'NumPy', icon: '🔢', color: '#013243' },
            { name: 'Pandas', icon: '🐼', color: '#150458' },
            { name: 'Matplotlib', icon: '📊', color: '#11557C' },
            { name: 'Seaborn', icon: '🌊', color: '#4C6A9C' }
        ]
    },
    {
        category: 'Frontend',
        skills: [
            { name: 'HTML & CSS', icon: '🎨', color: '#E34F26' },
            { name: 'React.js', icon: '⚛️', color: '#61DAFB' },
            { name: 'Next.js', icon: '▲', color: '#ffffff' },
            { name: 'TailwindCSS', icon: '💨', color: '#06B6D4' },
            { name: 'GSAP', icon: '🎬', color: '#88CE02' },
            { name: 'Vite', icon: '⚡', color: '#646CFF' },
            { name: 'SCSS', icon: '💅', color: '#CC6699' },
            { name: 'Bootstrap/jQuery', icon: '🛠️', color: '#7952B3' }
        ]
    },
    {
        category: 'Backend',
        skills: [
            { name: 'Node.js', icon: '🟢', color: '#339933' },
            { name: 'Express.js', icon: '🚀', color: '#ffffff' },
            { name: 'Bun', icon: '🥟', color: '#FBF0DF' },
            { name: 'FastAPI', icon: '⚡', color: '#009688' },
            { name: 'Flask', icon: '🌶️', color: '#000000' },
            { name: 'Socket.io', icon: '🔌', color: '#010101' },
            { name: 'Telegraf', icon: '🤖', color: '#2CA5E0' },
            { name: 'Puppeteer', icon: '🎭', color: '#40B5A4' },
            { name: 'Zod', icon: '💎', color: '#3068B7' },
            { name: 'REST APIs', icon: '🔗', color: '#FF6B6B' },
            { name: 'Postman', icon: '📮', color: '#FF6C37' }
        ]
    },
    {
        category: 'Databases',
        skills: [
            { name: 'MongoDB', icon: '🍃', color: '#47A248' },
            { name: 'PostgreSQL', icon: '🐘', color: '#336791' }
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

                <div className="skills-stats" style={{ display: 'flex' }}>
                    <div className="stat-item">
                        <span className="stat-number">8+</span>
                        <span className="stat-label">Projects Built</span>
                    </div>
                    <div className="stat-item">
                        <span className="stat-number">8.28</span>
                        <span className="stat-label">CGPA @ IITJ</span>
                    </div>
                    <div className="stat-item">
                        <span className="stat-number">30+</span>
                        <span className="stat-label">Technologies</span>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Skills
