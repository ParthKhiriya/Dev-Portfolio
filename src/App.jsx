import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'

import CustomCursor from './components/CustomCursor'
import Loader from './components/Loader'
import Hero from './components/Hero'
import Projects from './components/Projects'
import Skills from './components/Skills'
import Experience from './components/Experience'
import About from './components/About'
import Contact from './components/Contact'
import Navigation from './components/Navigation'

import './styles/main.css'

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin)

function App() {
  const mainRef = useRef(null)
  const loaderRef = useRef(null)

  useEffect(() => {
    // Wait for loader to complete before initializing ScrollTrigger
    const timer = setTimeout(() => {
      ScrollTrigger.refresh()
    }, 2500)

    return () => clearTimeout(timer)
  }, [])

  const handleLoaderComplete = () => {
    if (loaderRef.current) {
      loaderRef.current.classList.add('hidden')
    }
  }

  return (
    <>
      <CustomCursor />
      <Loader ref={loaderRef} onComplete={handleLoaderComplete} />

      <main className="main-wrapper" ref={mainRef}>
        <Hero />
        <Projects />
        <Skills />
        <Experience />
        <About />
        <Contact />
      </main>

      <Navigation />
    </>
  )
}

export default App
