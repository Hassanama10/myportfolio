"use client"

import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import { Download, Send } from "lucide-react"
import { Link } from "react-router-dom"

const GlowingButton = ({ children, primary = false, onClick }) => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.button
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`
        relative px-8 py-3 rounded-full flex items-center justify-center gap-2
        transition-all duration-500 ease-out
        ${primary ? "text-white" : "text-violet-100"}
        overflow-hidden
        ${primary ? "bg-violet-600" : "border-2 border-violet-600/50"}
        group
      `}
      style={{
        boxShadow: isHovered ? `0 0 20px ${primary ? "#7c3aed" : "rgba(124, 58, 237, 0.3)"}` : "none",
      }}
    >
      <motion.div
        className={`
          absolute inset-0 
          ${
            primary
              ? "bg-gradient-to-r from-violet-600 via-purple-600 to-violet-600"
              : "bg-gradient-to-r from-violet-600/20 via-purple-600/20 to-violet-600/20"
          }
        `}
        initial={{ x: "-100%" }}
        animate={{ x: isHovered ? "100%" : "-100%" }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
      />

      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-violet-300 rounded-full"
          initial={{ scale: 0, opacity: 0 }}
          animate={
            isHovered
              ? {
                  scale: [0, 1.5, 0],
                  opacity: [0, 0.8, 0],
                  x: [0, (i - 1) * 30],
                  y: [0, (Math.random() - 0.5) * 20],
                }
              : {}
          }
          transition={{
            duration: 1,
            delay: i * 0.2,
            repeat: Number.POSITIVE_INFINITY,
            repeatDelay: 0.5,
          }}
        />
      ))}

      <div className="relative flex items-center gap-2 z-10">
        <motion.div animate={isHovered ? { rotate: 360 } : { rotate: 0 }} transition={{ duration: 0.5 }}>
          {primary ? <Download size={20} /> : <Send size={20} />}
        </motion.div>
        <span className="relative">
          {children}
          <motion.div
            className="absolute bottom-0 left-0 w-full h-[2px] bg-white/50"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          />
        </span>
      </div>
    </motion.button>
  )
}

const SpaceBackground = () => {
  const canvasRef = useRef(null)
  const [mounted, setMounted] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    setMounted(true)
    setIsMobile(window.innerWidth < 768)
    if (typeof window === "undefined") return

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationFrameId
    let mousePosition = { x: canvas.width / 2, y: canvas.height / 2 }

    const handleResize = () => {
      if (canvas && ctx) {
        const dpr = window.devicePixelRatio || 1
        canvas.width = window.innerWidth * dpr
        canvas.height = window.innerHeight * dpr
        ctx.scale(dpr, dpr)
        setIsMobile(window.innerWidth < 768)
      }
    }

    const handleMouseMove = (e) => {
      mousePosition = {
        x: e.clientX,
        y: e.clientY,
      }
    }

    const handleTouchMove = (e) => {
      if (e.touches[0]) {
        mousePosition = {
          x: e.touches[0].clientX,
          y: e.touches[0].clientY,
        }
      }
    }

    window.addEventListener("resize", handleResize)
    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("touchmove", handleTouchMove)
    handleResize()

    // Enhanced icons with more complex designs
    const icons = [
      // React icon with orbital rings
      {
        draw: (ctx, x, y, size, time) => {
          const orbitSpeed = time * 2
          ctx.beginPath()
          ctx.ellipse(x, y, size * 2, size * 0.8, orbitSpeed, 0, Math.PI * 2)
          ctx.moveTo(x - size, y)
          ctx.ellipse(x, y, size * 2, size * 0.8, orbitSpeed + Math.PI / 3, 0, Math.PI * 2)
          ctx.moveTo(x - size, y)
          ctx.ellipse(x, y, size * 2, size * 0.8, orbitSpeed - Math.PI / 3, 0, Math.PI * 2)
          // Add pulsing core
          ctx.arc(x, y, size * 0.5, 0, Math.PI * 2)
          ctx.stroke()
        },
        color: "61, 184, 255",
      },
      // Enhanced TypeScript icon
      {
        draw: (ctx, x, y, size, time) => {
          const pulse = Math.sin(time * 3) * 0.2 + 1
          ctx.beginPath()
          ctx.rect(x - size * 1.2 * pulse, y - size * 1.2 * pulse, size * 2.4 * pulse, size * 2.4 * pulse)
          // Add dynamic crosshairs
          ctx.moveTo(x - size * 1.5, y)
          ctx.lineTo(x + size * 1.5, y)
          ctx.moveTo(x, y - size * 1.5)
          ctx.lineTo(x, y + size * 1.5)
          ctx.stroke()
        },
        color: "0, 122, 204",
      },
      // WordPress icon
      {
        draw: (ctx, x, y, size, time) => {
          const pulse = Math.sin(time * 2) * 0.2 + 1
          // Draw W shape
          ctx.beginPath()
          ctx.moveTo(x - size, y - size * 0.5)
          ctx.lineTo(x - size * 0.6, y - size * 0.5)
          ctx.lineTo(x - size * 0.3, y + size * 0.5)
          ctx.lineTo(x, y - size * 0.5)
          ctx.lineTo(x + size * 0.3, y + size * 0.5)
          ctx.lineTo(x + size * 0.6, y - size * 0.5)
          ctx.lineTo(x + size, y - size * 0.5)
          // Circle around it
          ctx.moveTo(x + size * 1.5 * pulse, y)
          ctx.arc(x, y, size * 1.5 * pulse, 0, Math.PI * 2)
          ctx.stroke()
        },
        color: "33, 117, 155",
      },
      // HTML5 icon
      {
        draw: (ctx, x, y, size, time) => {
          const pulse = Math.sin(time * 2.5) * 0.15 + 1
          // Draw shield shape
          ctx.beginPath()
          ctx.moveTo(x, y - size * 1.5 * pulse)
          ctx.lineTo(x - size * pulse, y + size * pulse)
          ctx.lineTo(x, y + size * 1.5 * pulse)
          ctx.lineTo(x + size * pulse, y + size * pulse)
          ctx.lineTo(x, y - size * 1.5 * pulse)
          // Add inner details
          ctx.moveTo(x - size * 0.5, y)
          ctx.lineTo(x + size * 0.5, y)
          ctx.moveTo(x - size * 0.3, y - size * 0.5)
          ctx.lineTo(x + size * 0.3, y - size * 0.5)
          ctx.stroke()
        },
        color: "227, 79, 38",
      },
      // CSS3 icon
      {
        draw: (ctx, x, y, size, time) => {
          const pulse = Math.sin(time * 2.2) * 0.15 + 1
          // Draw shield shape similar to HTML but different
          ctx.beginPath()
          ctx.moveTo(x, y - size * 1.5 * pulse)
          ctx.lineTo(x - size * pulse, y + size * 0.8 * pulse)
          ctx.lineTo(x, y + size * 1.3 * pulse)
          ctx.lineTo(x + size * pulse, y + size * 0.8 * pulse)
          ctx.lineTo(x, y - size * 1.5 * pulse)
          // Add inner details - different from HTML
          ctx.moveTo(x - size * 0.5, y + size * 0.2)
          ctx.lineTo(x + size * 0.5, y + size * 0.2)
          ctx.moveTo(x - size * 0.3, y - size * 0.3)
          ctx.lineTo(x + size * 0.3, y - size * 0.3)
          ctx.stroke()
        },
        color: "38, 77, 228",
      },
      // Node.js icon
      {
        draw: (ctx, x, y, size, time) => {
          const pulse = Math.sin(time * 1.8) * 0.2 + 1
          // Hexagon shape
          ctx.beginPath()
          for (let i = 0; i < 6; i++) {
            const angle = (Math.PI / 3) * i
            const px = x + Math.cos(angle) * size * 1.2 * pulse
            const py = y + Math.sin(angle) * size * 1.2 * pulse
            if (i === 0) ctx.moveTo(px, py)
            else ctx.lineTo(px, py)
          }
          ctx.closePath()
          // Inner detail
          ctx.moveTo(x, y - size)
          ctx.lineTo(x, y + size)
          ctx.stroke()
        },
        color: "104, 160, 99",
      },
      // Database icon
      {
        draw: (ctx, x, y, size, time) => {
          const pulse = Math.sin(time * 2) * 0.15 + 1
          // Cylinder shape
          ctx.beginPath()
          ctx.ellipse(x, y - size * pulse, size * pulse, size * 0.4 * pulse, 0, 0, Math.PI * 2)
          ctx.moveTo(x - size * pulse, y - size * pulse)
          ctx.lineTo(x - size * pulse, y + size * pulse)
          ctx.ellipse(x, y + size * pulse, size * pulse, size * 0.4 * pulse, 0, 0, Math.PI * 2)
          ctx.moveTo(x + size * pulse, y - size * pulse)
          ctx.lineTo(x + size * pulse, y + size * pulse)
          ctx.stroke()
        },
        color: "237, 114, 152",
      },
      // Cloud icon
      {
        draw: (ctx, x, y, size, time) => {
          const pulse = Math.sin(time) * 0.2 + 1
          // Cloud shape
          ctx.beginPath()
          ctx.arc(x, y, size * pulse, 0, Math.PI * 2)
          ctx.arc(x - size * 1.2 * pulse, y, size * 0.8 * pulse, 0, Math.PI * 2)
          ctx.arc(x + size * 1.2 * pulse, y, size * 0.8 * pulse, 0, Math.PI * 2)
          ctx.arc(x - size * 0.6 * pulse, y - size * 0.7 * pulse, size * 0.6 * pulse, 0, Math.PI * 2)
          ctx.arc(x + size * 0.6 * pulse, y - size * 0.7 * pulse, size * 0.6 * pulse, 0, Math.PI * 2)
          ctx.stroke()
        },
        color: "66, 165, 245",
      },
      // Code brackets icon
      {
        draw: (ctx, x, y, size, time) => {
          const pulse = Math.sin(time * 2.5) * 0.2 + 1
          // Code brackets
          ctx.beginPath()
          // Left bracket
          ctx.moveTo(x - size * pulse, y - size * pulse)
          ctx.lineTo(x - size * 1.5 * pulse, y)
          ctx.lineTo(x - size * pulse, y + size * pulse)
          // Right bracket
          ctx.moveTo(x + size * pulse, y - size * pulse)
          ctx.lineTo(x + size * 1.5 * pulse, y)
          ctx.lineTo(x + size * pulse, y + size * pulse)
          ctx.stroke()
        },
        color: "255, 193, 7",
      },
    ]

    // Adjust number of elements based on screen size
    const getElementCount = () => (isMobile ? 20 : 35)

    // Enhanced floating elements with interactive behavior
    const floatingElements = Array.from({ length: getElementCount() }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * (isMobile ? 2 : 3) + 2,
      speed: Math.random() * 0.02 + 0.01,
      angle: Math.random() * Math.PI * 2,
      rotationSpeed: (Math.random() - 0.5) * 0.001,
      icon: icons[Math.floor(Math.random() * icons.length)],
      glowIntensity: Math.random() * 0.4 + 0.3,
      pulseOffset: Math.random() * Math.PI * 2,
      pulseSpeed: Math.random() * 0.004 + 0.002,
      interactiveRadius: Math.random() * 100 + 50,
    }))

    // Enhanced stars with dynamic trails and colors
    const stars = Array.from({ length: isMobile ? 60 : 120 }, () => {
      const colorOptions = [
        "147, 51, 234", // Purple
        "64, 147, 255", // Blue
        "255, 107, 107", // Red
        "46, 204, 113", // Green
        "241, 196, 15", // Yellow
      ]
      return {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 1.5,
        speed: Math.random() * 0.5 + 0.1,
        trail: [],
        maxTrailLength: Math.floor(Math.random() * 15) + 5,
        color: colorOptions[Math.floor(Math.random() * colorOptions.length)],
        twinkleSpeed: Math.random() * 0.05 + 0.01,
        twinkleOffset: Math.random() * Math.PI * 2,
      }
    })

    // Add nebula clouds
    const nebulae = Array.from({ length: 5 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 200 + 100,
      color:
        Math.random() > 0.5
          ? `rgba(${Math.floor(Math.random() * 100) + 50}, ${Math.floor(Math.random() * 50)}, ${Math.floor(Math.random() * 150) + 100}, 0.03)`
          : `rgba(${Math.floor(Math.random() * 50)}, ${Math.floor(Math.random() * 100) + 50}, ${Math.floor(Math.random() * 150) + 100}, 0.03)`,
      speed: Math.random() * 0.001 + 0.0005,
    }))

    const animate = () => {
      if (!ctx || !canvas) return

      ctx.fillStyle = "rgba(0, 0, 0, 0.1)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      const time = Date.now() * 0.001

      // Draw nebulae
      nebulae.forEach((nebula) => {
        nebula.x += Math.sin(time * nebula.speed) * 0.2
        nebula.y += Math.cos(time * nebula.speed) * 0.2

        const gradient = ctx.createRadialGradient(nebula.x, nebula.y, 0, nebula.x, nebula.y, nebula.radius)
        gradient.addColorStop(0, nebula.color)
        gradient.addColorStop(1, "rgba(0, 0, 0, 0)")

        ctx.fillStyle = gradient
        ctx.beginPath()
        ctx.arc(nebula.x, nebula.y, nebula.radius, 0, Math.PI * 2)
        ctx.fill()
      })

      // Enhanced star animation with trails and twinkle
      stars.forEach((star) => {
        star.y += star.speed
        if (star.y > canvas.height) {
          star.y = 0
          star.x = Math.random() * canvas.width
          star.trail = []
        }

        // Twinkle effect
        const twinkle = Math.sin(time * star.twinkleSpeed + star.twinkleOffset) * 0.5 + 0.5

        // Add current position to trail
        star.trail.unshift({ x: star.x, y: star.y, twinkle })
        if (star.trail.length > star.maxTrailLength) {
          star.trail.pop()
        }

        // Draw trail
        star.trail.forEach((point, index) => {
          const alpha = (1 - index / star.maxTrailLength) * 0.5 * point.twinkle
          ctx.fillStyle = `rgba(${star.color}, ${alpha})`
          ctx.beginPath()
          ctx.arc(point.x, point.y, star.size * point.twinkle, 0, Math.PI * 2)
          ctx.fill()
        })
      })

      // Enhanced floating elements with interactive behavior
      floatingElements.forEach((element) => {
        // Calculate distance to mouse
        const dx = mousePosition.x - element.x
        const dy = mousePosition.y - element.y
        const distance = Math.sqrt(dx * dx + dy * dy)

        // Interactive behavior
        if (distance < element.interactiveRadius) {
          const angle = Math.atan2(dy, dx)
          element.x -= Math.cos(angle) * 2
          element.y -= Math.sin(angle) * 2
          element.glowIntensity = 0.8
        } else {
          element.glowIntensity = Math.max(0.3, element.glowIntensity - 0.02)
          element.x += Math.cos(element.angle) * element.speed
          element.y += Math.sin(element.angle) * element.speed
        }

        // Wrap around screen edges
        element.x = (element.x + canvas.width) % canvas.width
        element.y = (element.y + canvas.height) % canvas.height

        // Enhanced drawing with effects
        ctx.save()
        ctx.translate(element.x, element.y)

        const pulse = Math.sin(time * element.pulseSpeed * 5 + element.pulseOffset)
        const scale = 1 + pulse * 0.2

        ctx.scale(scale, scale)
        ctx.rotate(time * element.rotationSpeed)

        // Enhanced glow effect
        ctx.shadowColor = `rgba(${element.icon.color}, ${element.glowIntensity})`
        ctx.shadowBlur = 20 + pulse * 10
        ctx.strokeStyle = `rgba(${element.icon.color}, ${element.glowIntensity})`
        ctx.lineWidth = 1.5 + pulse * 0.5

        element.icon.draw(ctx, 0, 0, element.size * 2, time)

        // Add interactive rings
        if (distance < element.interactiveRadius) {
          ctx.beginPath()
          ctx.arc(0, 0, element.size * 4 * (1 - distance / element.interactiveRadius), 0, Math.PI * 2)
          ctx.strokeStyle = `rgba(${element.icon.color}, ${0.2 * (1 - distance / element.interactiveRadius)})`
          ctx.stroke()
        }

        ctx.restore()
      })

      // Add occasional shooting stars
      if (Math.random() < 0.01) {
        const shootingStar = {
          x: Math.random() * canvas.width,
          y: 0,
          length: Math.random() * 80 + 40,
          angle: Math.PI / 4 + (Math.random() * Math.PI) / 4,
          speed: Math.random() * 15 + 10,
          life: 1.0,
          decay: Math.random() * 0.02 + 0.01,
        }

        const drawShootingStar = () => {
          if (shootingStar.life <= 0) return

          const tailX = shootingStar.x - Math.cos(shootingStar.angle) * shootingStar.length * shootingStar.life
          const tailY = shootingStar.y - Math.sin(shootingStar.angle) * shootingStar.length * shootingStar.life

          const gradient = ctx.createLinearGradient(shootingStar.x, shootingStar.y, tailX, tailY)
          gradient.addColorStop(0, `rgba(255, 255, 255, ${shootingStar.life})`)
          gradient.addColorStop(1, "rgba(255, 255, 255, 0)")

          ctx.beginPath()
          ctx.moveTo(shootingStar.x, shootingStar.y)
          ctx.lineTo(tailX, tailY)
          ctx.strokeStyle = gradient
          ctx.lineWidth = 2 * shootingStar.life
          ctx.stroke()

          shootingStar.x += Math.cos(shootingStar.angle) * shootingStar.speed
          shootingStar.y += Math.sin(shootingStar.angle) * shootingStar.speed
          shootingStar.life -= shootingStar.decay

          if (shootingStar.life > 0) {
            requestAnimationFrame(drawShootingStar)
          }
        }

        drawShootingStar()
      }

      animationFrameId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", handleResize)
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("touchmove", handleTouchMove)
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId)
      }
    }
  }, [mounted])

  if (!mounted) {
    return (
      <div
        className="absolute inset-0 w-full h-full"
        style={{ background: "linear-gradient(to bottom, #040412, #0a0a20)" }}
      />
    )
  }

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{
        background: "linear-gradient(to bottom, #040412, #0a0a20)",
        touchAction: "none", // Prevent default touch behaviors
      }}
    />
  )
}

// AnimatedText Component
const AnimatedText = ({ text, className = "", delay = 0 }) => {
  return (
    <motion.span
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay }}
      className="inline-block"
    >
      {text.split("").map((char, index) => (
        <motion.span
          key={index}
          className="inline-block"
          whileHover={{
            y: -5,
            color: "#a78bfa",
            transition: { duration: 0.2 },
          }}
          transition={{ duration: 0.2 }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </motion.span>
  )
}

// Main Hero Component
const WavingHand = () => {
  return (
    <motion.span
      animate={{
        rotate: [0, 14, -8, 14, -4, 10, 0],
        transformOrigin: "70% 70%",
      }}
      transition={{
        duration: 2.5,
        repeat: Number.POSITIVE_INFINITY,
        repeatType: "loop",
        ease: "easeInOut",
        repeatDelay: 1,
      }}
      className="inline-block"
    >
      👋
    </motion.span>
  )
}

const Hero = () => {
  const [isMounted, setIsMounted] = useState(false)

  const handleCVDownload = async () => {
    try {
      const response = await fetch("/HassanAmagroud.pdf", {
        headers: {
          "Content-Type": "application/pdf",
        },
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement("a")
      link.style.display = "none"
      link.href = url
      link.download = "HassanAmagroud.pdf"

      document.body.appendChild(link)
      link.click()

      document.body.removeChild(link)
      window.URL.revokeObjectURL(url)
    } catch (error) {
      console.error("Failed to download CV:", error)
    }
  }

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <>
      <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {isMounted && <SpaceBackground />}

        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/50" />

        <div className="relative z-10 text-center px-4">
          <motion.div variants={containerVariants} initial="hidden" animate="visible">
            <motion.div className="mb-6" variants={itemVariants}>
              <motion.h2 className="text-violet-400 text-xl mb-4 font-light tracking-wide flex items-center justify-center gap-2">
                <AnimatedText text="Hello" delay={0.2} />
                <WavingHand />
                <AnimatedText text="I'm " delay={0.2} />
              </motion.h2>

              <h1 className="text-white text-5xl md:text-7xl font-bold mb-6 tracking-tight">
                <AnimatedText text="Hassan Amagroud " delay={0.4} />
              </h1>

              <motion.p className="text-gray-300 text-xl md:text-2xl mb-8" variants={itemVariants}>
                <AnimatedText text="WordPress Developer" delay={0.6} />
              </motion.p>
            </motion.div>

            <motion.div className="flex flex-col sm:flex-row gap-4 justify-center" variants={itemVariants}>
              <GlowingButton primary onClick={handleCVDownload}>
                Download CV
              </GlowingButton>

              <GlowingButton>
                <Link to="/contact" className="no-underline text-inherit">
                  Contact
                </Link>
              </GlowingButton>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </>
  )
}

export default Hero

