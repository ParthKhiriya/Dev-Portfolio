import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'

const CustomCursor = () => {
    const cursorRef = useRef(null)
    const dotRef = useRef(null)
    const circleRef = useRef(null)
    const textRef = useRef(null)

    const [isHovering, setIsHovering] = useState(false)
    const [cursorText, setCursorText] = useState('')

    const mousePos = useRef({ x: 0, y: 0 })
    const cursorPos = useRef({ x: 0, y: 0 })
    const circlePos = useRef({ x: 0, y: 0 })

    useEffect(() => {
        const handleMouseMove = (e) => {
            mousePos.current = { x: e.clientX, y: e.clientY }
        }

        const handleMouseOver = (e) => {
            const target = e.target.closest('a, button, [data-cursor]')
            if (target) {
                setIsHovering(true)
                const text = target.dataset.cursor
                if (text) {
                    setCursorText(text)
                }
            }
        }

        const handleMouseOut = (e) => {
            const target = e.target.closest('a, button, [data-cursor]')
            if (target) {
                setIsHovering(false)
                setCursorText('')
            }
        }

        document.addEventListener('mousemove', handleMouseMove)
        document.addEventListener('mouseover', handleMouseOver)
        document.addEventListener('mouseout', handleMouseOut)

        // Animation loop
        const animate = () => {
            const dotLerp = 0.15
            const circleLerp = 0.08

            cursorPos.current.x += (mousePos.current.x - cursorPos.current.x) * dotLerp
            cursorPos.current.y += (mousePos.current.y - cursorPos.current.y) * dotLerp

            circlePos.current.x += (mousePos.current.x - circlePos.current.x) * circleLerp
            circlePos.current.y += (mousePos.current.y - circlePos.current.y) * circleLerp

            if (dotRef.current) {
                dotRef.current.style.transform = `translate(${cursorPos.current.x}px, ${cursorPos.current.y}px) translate(-50%, -50%)`
            }
            if (circleRef.current) {
                circleRef.current.style.transform = `translate(${circlePos.current.x}px, ${circlePos.current.y}px) translate(-50%, -50%)`
            }
            if (textRef.current) {
                textRef.current.style.transform = `translate(${circlePos.current.x}px, ${circlePos.current.y}px) translate(-50%, -50%)`
            }

            requestAnimationFrame(animate)
        }

        const animationId = requestAnimationFrame(animate)

        return () => {
            document.removeEventListener('mousemove', handleMouseMove)
            document.removeEventListener('mouseover', handleMouseOver)
            document.removeEventListener('mouseout', handleMouseOut)
            cancelAnimationFrame(animationId)
        }
    }, [])

    const cursorClasses = `cursor ${isHovering ? 'hover' : ''} ${cursorText ? 'text-visible' : ''}`

    return (
        <div className={cursorClasses} ref={cursorRef}>
            <div className="cursor-dot" ref={dotRef}></div>
            <div className="cursor-circle" ref={circleRef}></div>
            <span className="cursor-text" ref={textRef}>{cursorText}</span>
        </div>
    )
}

export default CustomCursor
