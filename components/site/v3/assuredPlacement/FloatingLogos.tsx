import React, { useState, useEffect } from 'react'

export const FloatingLogos = () => {
    const [balls, setBalls] = useState([])
    const [explosions, setExplosions] = useState<any>([])

    // Initial positions - mix of logo balls and plain colored balls
    const initialBalls: any = [
        // Top area - plain balls
        { id: 1, x: 235, y: 50, size: 60, color: '#B8441F', hasLogo: false },
        { id: 2, x: 325, y: 45, size: 50, color: '#B8441F', hasLogo: false },
        { id: 3, x: 280, y: 90, size: 45, color: '#CD7F7F', hasLogo: false },

        // Left side - mix
        { id: 4, x: 155, y: 120, size: 80, color: '#B8441F', hasLogo: false },
        { id: 5, x: 90, y: 170, size: 40, color: '#B8441F', hasLogo: false },
        { id: 6, x: 120, y: 210, size: 45, color: '#B8441F', hasLogo: false },
        { id: 7, x: 90, y: 250, size: 50, color: '#B8441F', hasLogo: false },

        // Center area - some with logos
        {
            id: 8,
            x: 215,
            y: 175,
            size: 70,
            color: '#8B4B8C',
            hasLogo: true,
            logoSrc: '/images/site/home-page-v3/assured-placement/logos/mission-aus-logo.webp',
            logoText: 'MISSION',
        },
        {
            id: 9,
            x: 190,
            y: 275,
            size: 80,
            color: '#E74C3C',
            hasLogo: true,
            logoSrc: '/images/site/home-page-v3/assured-placement/logos/the-salvation-army-logo.webp',
            logoText: 'SALVATION',
        },
        {
            id: 10,
            x: 120,
            y: 320,
            size: 70,
            // color: '#3498DB',
            hasLogo: true,
            logoSrc: '/images/site/home-page-v3/assured-placement/logos/raise-log.webp',
            logoText: 'raise',
        },
        {
            id: 11,
            x: 350,
            y: 285,
            size: 75,
            // color: '#FFFFFF',
            hasLogo: true,
            logoSrc: '/images/site/home-page-v3/assured-placement/logos/wesley-logo.webp',
            logoText: 'Wesley',
            border: true,
        },
        {
            id: 12,
            x: 110,
            y: 420,
            size: 80,
            color: '#2C3E50',
            hasLogo: true,
            logoSrc: '/images/site/home-page-v3/assured-placement/logos/wellways-logo.webp',
            logoText: 'wellways',
        },
        {
            id: 13,
            x: 165,
            y: 515,
            size: 70,
            color: '#27AE60',
            hasLogo: true,
            logoSrc: '/images/site/home-page-v3/assured-placement/logos/harris-scarfe-logo.webp',
            logoText: 'Harris Scarfe',
        },

        // Right side - plain balls
        { id: 14, x: 355, y: 155, size: 55, color: '#B8441F', hasLogo: false },
        { id: 15, x: 275, y: 240, size: 65, color: '#B8441F', hasLogo: false },
        { id: 16, x: 325, y: 245, size: 55, color: '#B8441F', hasLogo: false },
        { id: 17, x: 315, y: 350, size: 70, color: '#B8441F', hasLogo: false },
        { id: 18, x: 385, y: 380, size: 65, color: '#B8441F', hasLogo: false },

        // Bottom area - mix
        { id: 19, x: 240, y: 390, size: 50, color: '#CD7F7F', hasLogo: false },
        { id: 20, x: 280, y: 470, size: 70, color: '#B8441F', hasLogo: false },
        { id: 21, x: 385, y: 500, size: 60, color: '#B8441F', hasLogo: false },
        { id: 22, x: 240, y: 570, size: 70, color: '#B8441F', hasLogo: false },

        // Additional scattered balls
        { id: 23, x: 200, y: 300, size: 45, color: '#B8441F', hasLogo: false },
        { id: 24, x: 160, y: 450, size: 55, color: '#B8441F', hasLogo: false },
    ]

    const createExplosion = (x: any, y: any, color: any, size: any) => {
        const explosionId = Date.now() + Math.random()
        const particles: any = []

        // Create multiple particles for explosion
        for (let i = 0; i < 12; i++) {
            particles.push({
                id: `particle-${explosionId}-${i}`,
                x: x + size / 2,
                y: y + size / 2,
                vx: (Math.random() - 0.5) * 8, // Random velocity in x
                vy: (Math.random() - 0.5) * 8, // Random velocity in y
                size: Math.random() * 8 + 4,
                color: color,
                life: 1,
                decay: 0.02 + Math.random() * 0.02,
            })
        }

        setExplosions((prev: any) => [
            ...prev,
            {
                id: explosionId,
                particles: particles,
                startTime: Date.now(),
            },
        ])

        // Remove explosion after animation
        setTimeout(() => {
            setExplosions((prev: any) =>
                prev.filter((exp: any) => exp.id !== explosionId)
            )
        }, 2000)
    }

    useEffect(() => {
        setBalls(
            initialBalls.map((ball: any) => ({
                ...ball,
                currentY: ball.y,
                speed: 0.3 + Math.random() * 0.7,
                opacity: 1,
                scale: 1,
            }))
        )
    }, [])

    useEffect(() => {
        const interval = setInterval(() => {
            setBalls((prevBalls: any) =>
                prevBalls.map((ball: any) => {
                    const newY = ball.currentY - ball.speed

                    // Check if ball should explode (trigger explosion earlier, before reaching overflow)
                    // Changed from -20 to 30 to trigger explosion while ball is still fully visible
                    if (newY < 30) {
                        // Create explosion effect
                        createExplosion(ball.x, newY, ball.color, ball.size)

                        // Reset ball to original position
                        const originalBall: any = initialBalls.find(
                            (b: any) => b.id === ball.id
                        )
                        return {
                            ...originalBall,
                            currentY: originalBall.y + Math.random() * 100,
                            speed: 0.3 + Math.random() * 0.7,
                            opacity: 1,
                            scale: 1,
                        }
                    }

                    return { ...ball, currentY: newY }
                })
            )
        }, 50)

        return () => clearInterval(interval)
    }, [])

    useEffect(() => {
        // Update explosion particles
        const explosionInterval = setInterval(() => {
            setExplosions((prevExplosions: any) =>
                prevExplosions
                    .map((explosion: any) => ({
                        ...explosion,
                        particles: explosion.particles
                            .map((particle: any) => ({
                                ...particle,
                                x: particle.x + particle.vx,
                                y: particle.y + particle.vy,
                                life: Math.max(
                                    0,
                                    particle.life - particle.decay
                                ),
                                vy: particle.vy + 0.1, // Add gravity
                            }))
                            .filter((particle: any) => particle.life > 0),
                    }))
                    .filter((explosion: any) => explosion.particles.length > 0)
            )
        }, 30)

        return () => clearInterval(explosionInterval)
    }, [])

    const renderBallContent = (ball: any) => {
        if (ball.hasLogo) {
            return (
                <div className="w-full h-full flex items-center justify-center relative">
                    <img
                        src={ball.logoSrc}
                        alt={ball.logoText}
                        className="max-w-[70%] max-h-[70%] object-contain"
                    />
                </div>
            )
        }
        return null
    }

    return (
        <div className="relative w-full h-[600px] overflow-hidden">
            {/* Animated balls */}
            {balls.map((ball: any) => (
                <div
                    key={ball.id}
                    className={`absolute rounded-full transition-all duration-100 ease-out flex items-center justify-center ${
                        ball.border ? 'border-2 border-gray-300' : ''
                    }`}
                    style={{
                        left: `${ball.x}px`,
                        top: `${ball.currentY}px`,
                        width: `${ball.size}px`,
                        height: `${ball.size}px`,
                        backgroundColor: ball.color,
                        opacity: ball.opacity,
                        transform: `scale(${ball.scale})`,
                        boxShadow: ball.hasLogo
                            ? '0 4px 8px rgba(0,0,0,0.2)'
                            : 'none',
                    }}
                >
                    {renderBallContent(ball)}
                </div>
            ))}

            {/* Explosion particles */}
            {explosions.map((explosion: any) =>
                explosion.particles.map((particle: any) => (
                    <div
                        key={particle.id}
                        className="absolute rounded-full pointer-events-none"
                        style={{
                            left: `${particle.x}px`,
                            top: `${particle.y}px`,
                            width: `${particle.size}px`,
                            height: `${particle.size}px`,
                            backgroundColor: particle.color,
                            opacity: particle.life,
                            transform: `scale(${particle.life})`,
                            transition: 'none',
                        }}
                    />
                ))
            )}

            {/* Explosion flash effect */}
            {explosions.map((explosion: any) => {
                const age = Date.now() - explosion.startTime
                const flashOpacity = Math.max(0, 1 - age / 200)

                if (flashOpacity <= 0) return null

                return (
                    <div
                        key={`flash-${explosion.id}`}
                        className="absolute rounded-full pointer-events-none"
                        style={{
                            left: `${explosion.particles[0]?.x - 30}px`,
                            top: `${explosion.particles[0]?.y - 30}px`,
                            width: '60px',
                            height: '60px',
                            background: `radial-gradient(circle, rgba(255,255,255,${flashOpacity}) 0%, rgba(255,255,255,0) 50%, transparent 100%)`,
                            transform: `scale(${2 + age / 100})`,
                        }}
                    />
                )
            })}

            <style jsx>{`
                @keyframes pop {
                    0% {
                        transform: scale(1);
                    }
                    50% {
                        transform: scale(1.3);
                    }
                    100% {
                        transform: scale(0);
                        opacity: 0;
                    }
                }
            `}</style>
        </div>
    )
}
