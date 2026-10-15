export let cleanupMascot = () => {}

export function initMascot() {
  const container = document.getElementById('mascot-interactive-container')
  const card = document.getElementById('mascot-3d-card')
  const mascotImg = document.getElementById('mascot-interactive-img')
  const glare = document.getElementById('mascot-glare')
  const speechBubble = document.getElementById('mascot-speech-bubble')
  const speechText = document.getElementById('mascot-speech-text')
  const pokeBtn = document.getElementById('mascot-poke-btn')

  if (!container || !card || !mascotImg) return

  const speeches = [
    "Hi! Farhana builds intelligent AI web apps! 🚀",
    "Pixel-perfect Tailwind CSS & clean code! ✨",
    "Thumbs up for fast, scalable Flask backends! 👍",
    "Need custom LLM workflow integrations? Let's talk! 💬",
    "1,200+ hours of coding & 100% dedication! 🔥",
    "Looking for a full-stack engineer? Farhana is ready! 🎯",
  ]
  let speechIndex = 0

  const handleMouseMove = (e) => {
    card.classList.remove('spring-back')
    const rect = container.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    const deltaX = (x - centerX) / centerX
    const deltaY = (y - centerY) / centerY
    const maxTilt = 16
    const rotateX = -deltaY * maxTilt
    const rotateY = deltaX * maxTilt
    card.style.transform = `rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg)`
    if (glare) {
      glare.style.opacity = '1'
      glare.style.background = `radial-gradient(circle at ${(x / rect.width) * 100}% ${(y / rect.height) * 100}%, rgba(255, 255, 255, 0.45) 0%, rgba(255, 255, 255, 0) 65%)`
    }
    mascotImg.style.transform = `translateZ(55px) translateX(${deltaX * 10}px) translateY(${deltaY * 10}px)`
  }

  const handleMouseLeave = () => {
    card.classList.add('spring-back')
    card.style.transform = 'rotateX(0deg) rotateY(0deg)'
    mascotImg.style.transform = 'translateZ(55px) translateX(0px) translateY(0px)'
    if (glare) glare.style.opacity = '0'
  }

  const spawnConfetti = (parent) => {
    const colors = ['#7C3AED', '#3B82F6', '#10B981', '#F59E0B', '#EC4899', '#6366F1']
    for (let i = 0; i < 18; i++) {
      const confetti = document.createElement('div')
      confetti.className = 'mascot-confetti'
      const size = Math.floor(Math.random() * 8) + 6
      confetti.style.width = `${size}px`
      confetti.style.height = `${size}px`
      confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)]
      confetti.style.left = '50%'
      confetti.style.top = '50%'
      const angle = (Math.PI * 2 * i) / 18 + (Math.random() * 0.4 - 0.2)
      const dist = Math.random() * 95 + 45
      const tx = Math.cos(angle) * dist
      const ty = Math.sin(angle) * dist
      confetti.style.setProperty('--tx', `${tx}px`)
      confetti.style.setProperty('--ty', `${ty}px`)
      parent.appendChild(confetti)
      setTimeout(() => confetti.remove(), 900)
    }
  }

  const triggerCelebration = () => {
    mascotImg.classList.add('mascot-celebrating')
    setTimeout(() => mascotImg.classList.remove('mascot-celebrating'), 750)
    speechIndex = (speechIndex + 1) % speeches.length
    if (speechText) {
      speechText.style.opacity = '0'
      speechText.style.transform = 'translateY(4px)'
      setTimeout(() => {
        speechText.textContent = speeches[speechIndex]
        speechText.style.opacity = '1'
        speechText.style.transform = 'translateY(0)'
      }, 150)
    }
    spawnConfetti(card)
  }

  // Event listeners
  const mouseMove = (e) => handleMouseMove(e)
  const mouseLeave = () => handleMouseLeave()
  const touchMove = (e) => {
    if (e.touches.length > 0) handleMouseMove(e.touches[0])
  }
  const touchEnd = () => handleMouseLeave()
  const clickMascot = () => triggerCelebration()
  const clickSpeech = () => triggerCelebration()
  const clickPoke = (e) => { e.stopPropagation(); triggerCelebration() }

  container.addEventListener('mousemove', mouseMove)
  container.addEventListener('mouseleave', mouseLeave)
  container.addEventListener('touchmove', touchMove, { passive: true })
  container.addEventListener('touchend', touchEnd)
  mascotImg.addEventListener('click', clickMascot)
  if (speechBubble) speechBubble.addEventListener('click', clickSpeech)
  if (pokeBtn) pokeBtn.addEventListener('click', clickPoke)

  // Cleanup
  const cleanup = () => {
    container.removeEventListener('mousemove', mouseMove)
    container.removeEventListener('mouseleave', mouseLeave)
    container.removeEventListener('touchmove', touchMove)
    container.removeEventListener('touchend', touchEnd)
    mascotImg.removeEventListener('click', clickMascot)
    if (speechBubble) speechBubble.removeEventListener('click', clickSpeech)
    if (pokeBtn) pokeBtn.removeEventListener('click', clickPoke)
  }

  cleanupMascot = cleanup
}

export { cleanupMascot as cleanupMascotFn }
