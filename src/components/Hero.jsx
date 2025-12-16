import { useEffect, useRef } from 'react'
import gsap from 'gsap'

const Hero = () => {
    const canvasRef = useRef(null)
    const heroRef = useRef(null)

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return

        const ctx = canvas.getContext('2d')
        let width = 0
        let height = 0
        let mousePos = { x: 0, y: 0 }
        let targetMousePos = { x: 0, y: 0 }
        let waves = []
        let time = 0
        let animationId = null

        const resize = () => {
            width = canvas.parentElement.offsetWidth
            height = canvas.parentElement.offsetHeight
            canvas.width = width
            canvas.height = height
        }

        const addWave = (x, y) => {
            waves.push({
                x, y, radius: 0, maxRadius: 300, opacity: 0.5, speed: 8
            })
        }

        const animate = () => {
            time += 0.01
            mousePos.x += (targetMousePos.x - mousePos.x) * 0.1
            mousePos.y += (targetMousePos.y - mousePos.y) * 0.1

            ctx.clearRect(0, 0, width, height)

            // Fluid background
            const gradient = ctx.createRadialGradient(
                mousePos.x, mousePos.y, 0,
                mousePos.x, mousePos.y, 400
            )
            gradient.addColorStop(0, 'rgba(232, 213, 183, 0.03)')
            gradient.addColorStop(1, 'rgba(232, 213, 183, 0)')
            ctx.fillStyle = gradient
            ctx.fillRect(0, 0, width, height)

            // Floating orbs
            for (let i = 0; i < 3; i++) {
                const x = width * (0.3 + i * 0.2) + Math.sin(time + i) * 50
                const y = height * 0.5 + Math.cos(time * 0.7 + i) * 100
                const grad = ctx.createRadialGradient(x, y, 0, x, y, 200)
                grad.addColorStop(0, `rgba(196, 181, 160, ${0.02 - i * 0.005})`)
                grad.addColorStop(1, 'rgba(196, 181, 160, 0)')
                ctx.fillStyle = grad
                ctx.fillRect(0, 0, width, height)
            }

            // Waves
            waves = waves.filter(wave => {
                wave.radius += wave.speed
                wave.opacity -= 0.008
                if (wave.opacity <= 0) return false

                ctx.beginPath()
                ctx.arc(wave.x, wave.y, wave.radius, 0, Math.PI * 2)
                ctx.strokeStyle = `rgba(232, 213, 183, ${wave.opacity})`
                ctx.lineWidth = 2
                ctx.stroke()
                return true
            })

            // Mouse glow
            const glowGradient = ctx.createRadialGradient(
                mousePos.x, mousePos.y, 0,
                mousePos.x, mousePos.y, 150
            )
            glowGradient.addColorStop(0, 'rgba(232, 213, 183, 0.08)')
            glowGradient.addColorStop(0.5, 'rgba(232, 213, 183, 0.02)')
            glowGradient.addColorStop(1, 'rgba(232, 213, 183, 0)')
            ctx.fillStyle = glowGradient
            ctx.beginPath()
            ctx.arc(mousePos.x, mousePos.y, 150, 0, Math.PI * 2)
            ctx.fill()

            animationId = requestAnimationFrame(animate)
        }

        const handleMouseMove = (e) => {
            const rect = canvas.getBoundingClientRect()
            targetMousePos.x = e.clientX - rect.left
            targetMousePos.y = e.clientY - rect.top
        }

        const handleClick = (e) => {
            const rect = canvas.getBoundingClientRect()
            addWave(e.clientX - rect.left, e.clientY - rect.top)
        }

        resize()
        window.addEventListener('resize', resize)
        heroRef.current?.addEventListener('mousemove', handleMouseMove)
        heroRef.current?.addEventListener('click', handleClick)
        animate()

        return () => {
            window.removeEventListener('resize', resize)
            heroRef.current?.removeEventListener('mousemove', handleMouseMove)
            heroRef.current?.removeEventListener('click', handleClick)
            if (animationId) cancelAnimationFrame(animationId)
        }
    }, [])

    // Text distortion effect
    useEffect(() => {
        const heroTitle = heroRef.current?.querySelectorAll('[data-distort]')
        if (!heroTitle) return

        heroTitle.forEach(el => {
            const lines = el.querySelectorAll('.hero-line')

            const handleMouseMove = (e) => {
                const rect = el.getBoundingClientRect()
                const x = (e.clientX - rect.left) / rect.width
                const y = (e.clientY - rect.top) / rect.height

                lines.forEach((line, i) => {
                    const offset = (i % 2 === 0 ? 1 : -1) * 10
                    gsap.to(line, {
                        x: (x - 0.5) * offset,
                        y: (y - 0.5) * 5,
                        duration: 0.5,
                        ease: 'power2.out'
                    })
                })
            }

            const handleMouseLeave = () => {
                lines.forEach(line => {
                    gsap.to(line, {
                        x: 0, y: 0,
                        duration: 0.8,
                        ease: 'elastic.out(1, 0.5)'
                    })
                })
            }

            el.addEventListener('mousemove', handleMouseMove)
            el.addEventListener('mouseleave', handleMouseLeave)
        })
    }, [])

    return (
        <section className="hero" id="hero" ref={heroRef}>
            <canvas ref={canvasRef} className="hero-canvas"></canvas>
            <div className="hero-content">
                <div className="hero-title-wrapper">
                    <h1 className="hero-title" data-distort>
                        <span className="hero-line">DIGITAL</span>
                        <span className="hero-line">CRAFT</span>
                    </h1>
                    <div className="hero-divider"></div>
                    <h1 className="hero-title hero-title-alt" data-distort>
                        <span className="hero-line">CREATIVE</span>
                        <span className="hero-line">CODE</span>
                    </h1>
                </div>
                <div className="hero-meta">
                    <p className="hero-subtitle">Full Stack Developer & Creative Technologist</p>
                </div>
            </div>
            <div className="hero-scroll-indicator">
                <div className="scroll-arrow">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M12 5V19M12 19L19 12M12 19L5 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </div>
            </div>
        </section>
    )
}

export default Hero
