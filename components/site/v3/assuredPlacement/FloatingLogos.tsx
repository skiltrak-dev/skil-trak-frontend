import React, { useState, useEffect } from 'react'

export const FloatingLogos = () => {
    const [balls, setBalls] = useState([])

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
            hasLogo: true,
            logoSrc: '/images/site/home-page-v3/assured-placement/logos/raise-log.webp',
            logoText: 'raise',
        },
        {
            id: 11,
            x: 350,
            y: 285,
            size: 75,
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

                    // Calculate scale and opacity based on proximity to top
                    // Start scaling up when ball is within 150px of top
                    const distanceFromTop = newY
                    let newScale = ball.scale
                    let newOpacity = ball.opacity

                    if (distanceFromTop < 150) {
                        // Scale grows from 1 to 1.8 as it approaches top
                        const scaleProgress = 1 - (distanceFromTop / 150)
                        newScale = 1 + (scaleProgress * 0.8)

                        // Opacity fades when very close to top (last 80px)
                        if (distanceFromTop < 80) {
                            newOpacity = distanceFromTop / 80
                        }
                    }

                    // Reset ball when it's completely faded and off screen
                    if (newY < -50 || newOpacity <= 0) {
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

                    return { ...ball, currentY: newY, scale: newScale, opacity: newOpacity }
                })
            )
        }, 50)

        return () => clearInterval(interval)
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
                    className={`absolute rounded-full flex items-center justify-center ${ball.border ? 'border-2 border-gray-300' : ''
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
                        transition: 'transform 0.3s ease-out, opacity 0.3s ease-out',
                    }}
                >
                    {renderBallContent(ball)}
                </div>
            ))}
        </div>
    )
}

export default FloatingLogos