import { useEffect, forwardRef } from 'react'
import gsap from 'gsap'

const Loader = forwardRef(({ onComplete }, ref) => {
    useEffect(() => {
        const tl = gsap.timeline()

        // Animate letters
        tl.to('.loader-letter', {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.05,
            ease: 'expo.out'
        })

        // Animate progress bar
        tl.to('.loader-progress', {
            width: '100%',
            duration: 1.2,
            ease: 'expo.out'
        }, '-=0.3')

        // Hide loader
        tl.to(ref.current, {
            opacity: 0,
            duration: 0.6,
            ease: 'power2.inOut',
            onComplete: () => {
                onComplete?.()
                triggerHeroAnimations()
            }
        }, '+=0.3')
    }, [onComplete, ref])

    const triggerHeroAnimations = () => {
        gsap.to('.hero-line', {
            opacity: 1,
            y: 0,
            duration: 1.2,
            stagger: 0.1,
            ease: 'expo.out'
        })

        gsap.to('.hero-divider', {
            opacity: 1,
            scaleX: 1,
            duration: 0.8,
            delay: 0.5,
            ease: 'expo.out'
        })

        gsap.to('.hero-meta', {
            opacity: 1,
            y: 0,
            duration: 1,
            delay: 0.8,
            ease: 'expo.out'
        })

        gsap.to('.hero-scroll-indicator', {
            opacity: 1,
            duration: 1,
            delay: 1.2,
            ease: 'power2.out'
        })
    }

    const letters = 'PARTH'.split('')

    return (
        <div className="loader" ref={ref}>
            <div className="loader-content">
                <div className="loader-text">
                    {letters.map((letter, i) => (
                        <span key={i} className="loader-letter">{letter}</span>
                    ))}
                </div>
                <div className="loader-bar">
                    <div className="loader-progress"></div>
                </div>
            </div>
        </div>
    )
})

Loader.displayName = 'Loader'

export default Loader
