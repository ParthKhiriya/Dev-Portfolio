import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const projectsData = [
    {
        id: '01',
        title: 'QuickChat',
        description: 'A full-stack MERN application for real-time chat with JWT authentication, Socket.io integration, and MongoDB persistence.',
        tech: ['React', 'Node.js', 'Socket.io', 'MongoDB'],
        accent: '#E8D5B7',
        visual: 'quickchat',
        liveUrl: 'http://quick-chat-seven-xi.vercel.app',
        githubUrl: 'https://github.com/ParthKhiriya/QuickChat'
    },
    {
        id: '02',
        title: 'ThinkBoard',
        description: 'A personal note manager MERN application with RESTful APIs, production-ready error handling, and reusable components.',
        tech: ['React', 'TypeScript', 'Express.js', 'MongoDB'],
        accent: '#C4B5A0',
        visual: 'thinkboard',
        liveUrl: 'https://thinkboard-bfop.onrender.com',
        githubUrl: 'https://github.com/ParthKhiriya/ThinkBoard'
    },
    {
        id: '03',
        title: 'Tweet Sentiment',
        description: 'NLP-powered sentiment analyzer for Twitter posts using TF-IDF, Logistic Regression, and SVM classifiers with real-time prediction.',
        tech: ['Python', 'NLP', 'Scikit-learn', 'Flask'],
        accent: '#A69B8D',
        visual: 'sentiment',
        liveUrl: null,
        githubUrl: 'https://github.com/ParthKhiriya/Tweet-Sentiment-Analysis'
    },
    {
        id: '04',
        title: 'GraphDB',
        description: 'Neo4j-inspired graph database with custom query engine, CRUD operations, and interactive Python frontend for JSON visualization.',
        tech: ['C++', 'Python', 'Graph Theory', 'DSA'],
        accent: '#8B7E6F',
        visual: 'graphdb',
        liveUrl: null,
        githubUrl: 'https://github.com/poojanpatelalpesh/dsa_Ne04j'
    }
]

const ProjectVisual = ({ type }) => {
    if (type === 'quickchat') {
        return (
            <div className="project-visual quickchat-visual">
                <div className="chat-bubbles">
                    <div className="chat-bubble incoming">Real-time messaging</div>
                    <div className="chat-bubble outgoing">Secure & Fast</div>
                    <div className="chat-bubble incoming">Socket.io powered</div>
                </div>
            </div>
        )
    }

    if (type === 'thinkboard') {
        return (
            <div className="project-visual thinkboard-visual">
                <div className="note-cards">
                    <div className="note-card">📝 Ideas</div>
                    <div className="note-card">✓ Tasks</div>
                    <div className="note-card">💡 Notes</div>
                </div>
            </div>
        )
    }

    if (type === 'sentiment') {
        return (
            <div className="project-visual sentiment-visual">
                <div className="sentiment-graph">
                    <div className="sentiment-bar positive" style={{ '--height': '80%' }}>😊</div>
                    <div className="sentiment-bar neutral" style={{ '--height': '50%' }}>😐</div>
                    <div className="sentiment-bar negative" style={{ '--height': '30%' }}>😢</div>
                </div>
            </div>
        )
    }

    if (type === 'graphdb') {
        return (
            <div className="project-visual graphdb-visual">
                <div className="graph-nodes">
                    <div className="graph-node node-1"></div>
                    <div className="graph-node node-2"></div>
                    <div className="graph-node node-3"></div>
                    <div className="graph-edge edge-1"></div>
                    <div className="graph-edge edge-2"></div>
                </div>
            </div>
        )
    }

    return null
}

const Projects = () => {
    const sectionRef = useRef(null)
    const trackRef = useRef(null)
    const progressFillRef = useRef(null)
    const progressCurrentRef = useRef(null)

    useEffect(() => {
        const section = sectionRef.current
        const track = trackRef.current
        const slides = track?.querySelectorAll('.project-slide')

        if (!section || !track || !slides?.length) return

        const totalWidth = slides.length * window.innerWidth

        const scrollTrigger = gsap.to(track, {
            x: () => -(totalWidth - window.innerWidth),
            ease: 'none',
            scrollTrigger: {
                trigger: section,
                start: 'top top',
                end: () => `+=${totalWidth}`,
                scrub: 1,
                pin: true,
                anticipatePin: 1,
                onUpdate: (self) => {
                    const progress = self.progress
                    if (progressFillRef.current) {
                        progressFillRef.current.style.width = `${progress * 100}%`
                    }
                    const currentSlide = Math.min(
                        Math.floor(progress * slides.length) + 1,
                        slides.length
                    )
                    if (progressCurrentRef.current) {
                        progressCurrentRef.current.textContent = currentSlide.toString().padStart(2, '0')
                    }
                }
            }
        })

        // Project image hover effects
        slides.forEach(slide => {
            const image = slide.querySelector('.project-image')
            if (!image) return

            const handleMouseEnter = () => {
                gsap.to(image, { scale: 1.02, duration: 0.6, ease: 'power2.out' })
            }

            const handleMouseLeave = () => {
                gsap.to(image, { scale: 1, rotateY: 0, rotateX: 0, duration: 0.6, ease: 'power2.out' })
            }

            const handleMouseMove = (e) => {
                const rect = slide.getBoundingClientRect()
                const x = (e.clientX - rect.left) / rect.width
                const y = (e.clientY - rect.top) / rect.height
                gsap.to(image, {
                    rotateY: (x - 0.5) * 5,
                    rotateX: (y - 0.5) * -5,
                    duration: 0.5,
                    ease: 'power2.out'
                })
            }

            slide.addEventListener('mouseenter', handleMouseEnter)
            slide.addEventListener('mouseleave', handleMouseLeave)
            slide.addEventListener('mousemove', handleMouseMove)
        })

        return () => {
            scrollTrigger.scrollTrigger?.kill()
        }
    }, [])

    return (
        <section className="projects" id="projects" ref={sectionRef}>
            <div className="projects-header">
                <h2 className="section-label">Selected Works</h2>
                <div className="projects-progress">
                    <div className="progress-current" ref={progressCurrentRef}>01</div>
                    <div className="progress-bar">
                        <div className="progress-fill" ref={progressFillRef}></div>
                    </div>
                    <div className="progress-total">04</div>
                </div>
            </div>
            <div className="projects-wrapper">
                <div className="projects-track" ref={trackRef}>
                    {projectsData.map((project) => (
                        <article key={project.id} className="project-slide" data-project={project.id}>
                            <div className="project-image-wrapper">
                                <div className="project-image" style={{ '--accent': project.accent }}>
                                    <div className="project-image-inner">
                                        <ProjectVisual type={project.visual} />
                                    </div>
                                </div>
                            </div>
                            <div className="project-info">
                                <span className="project-number">{project.id}</span>
                                <h3 className="project-title">{project.title}</h3>
                                <p className="project-description">{project.description}</p>
                                <div className="project-tech">
                                    {project.tech.map((tech, i) => (
                                        <span key={i}>{tech}</span>
                                    ))}
                                </div>
                                <div className="project-links">
                                    {project.liveUrl && (
                                        <a href={project.liveUrl} className="project-link" target="_blank" rel="noopener noreferrer" data-cursor="VIEW">View Project</a>
                                    )}
                                    <a href={project.githubUrl} className="project-link" target="_blank" rel="noopener noreferrer" data-cursor="CODE">GitHub</a>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Projects
