import { Typography } from '@components'
import React, { useState, useEffect, memo, useMemo, useCallback } from 'react'
import {
    MdSmartToy,
    MdSearch,
    MdLocationOn,
    MdBusiness,
    MdCheckCircle,
    MdAutoAwesome,
} from 'react-icons/md'
import { accentGradient, THEME_COLORS } from './utils/theme'

interface LoadingStep {
    icon: React.ComponentType<{ className?: string }>
    text: string
    duration: number
}

const LOADING_STEPS: LoadingStep[] = [
    {
        icon: MdSearch,
        text: 'Initializing AI search algorithms...',
        duration: 2000,
    },
    {
        icon: MdLocationOn,
        text: 'Scanning location databases...',
        duration: 3000,
    },
    {
        icon: MdBusiness,
        text: 'Analyzing workplace compatibility...',
        duration: 4000,
    },
    { icon: MdSmartToy, text: 'Optimizing match results...', duration: 3000 },
    { icon: MdAutoAwesome, text: 'Finalizing discoveries...', duration: 3000 },
]

const TOTAL_LISTINGS = 25
const LISTING_INTERVAL = 600 // ms
const COMPLETION_DELAY = 13500 // ms

const LoadingProgress = memo<{
    listingsFound: number
    showCompletion: boolean
}>(({ listingsFound, showCompletion }) => {
    const progressPercentage = Math.round(
        (listingsFound / TOTAL_LISTINGS) * 100
    )

    if (showCompletion) {
        return (
            <div className="flex flex-col items-center justify-center py-12 space-y-6 animate-in fade-in-0 zoom-in-95 duration-500">
                <style jsx>{`
                    @keyframes pulse-scale {
                        0%,
                        100% {
                            transform: scale(1);
                        }
                        50% {
                            transform: scale(1.1);
                        }
                    }
                    @keyframes fade-up {
                        from {
                            opacity: 0;
                            transform: translateY(20px);
                        }
                        to {
                            opacity: 1;
                            transform: translateY(0);
                        }
                    }
                    .animate-pulse-scale {
                        animation: pulse-scale 0.8s ease-in-out 2;
                    }
                    .animate-fade-up-1 {
                        animation: fade-up 0.5s ease-out 0.2s both;
                    }
                    .animate-fade-up-2 {
                        animation: fade-up 0.5s ease-out 0.4s both;
                    }
                    .animate-fade-up-3 {
                        animation: fade-up 0.5s ease-out 0.6s both;
                    }
                `}</style>
                <div
                    className="w-20 h-20 rounded-full flex items-center justify-center animate-pulse-scale"
                    style={accentGradient}
                >
                    <MdCheckCircle className="w-10 h-10 text-white" />
                </div>

                <div className="text-center space-y-2">
                    <div className="animate-fade-up-1">
                        <div
                            className="bg-clip-text text-transparent"
                            style={{
                                backgroundImage: `linear-gradient(to right, ${THEME_COLORS.accent}, ${THEME_COLORS.primary})`,
                            }}
                        >
                            <Typography
                                variant="h3"
                                color="bg-clip-text text-transparent"
                            >
                                Listing Completed!
                            </Typography>
                        </div>
                    </div>
                    <div className="animate-fade-up-2">
                        <Typography variant="body" color="text-gray-600">
                            Successfully discovered {TOTAL_LISTINGS} workplace
                            opportunities
                        </Typography>
                    </div>
                </div>

                <div
                    className="flex items-center gap-3 px-6 py-3 rounded-lg border animate-fade-up-3"
                    style={{
                        backgroundColor: `rgba(247, 166, 25, 0.1)`,
                        borderColor: `rgba(247, 166, 25, 0.3)`,
                    }}
                >
                    <MdAutoAwesome
                        className="w-5 h-5"
                        style={{ color: THEME_COLORS.accent }}
                    />
                    <Typography variant="body" color={THEME_COLORS.primary}>
                        Ready to view your personalized matches
                    </Typography>
                </div>
            </div>
        )
    }

    return (
        <div className="w-full max-w-lg space-y-3">
            <style>{`
          @keyframes progress-fill {
            from { width: 0%; }
            to { width: ${progressPercentage}%; }
          }
          @keyframes pulse-opacity {
            0%, 100% { opacity: 0.7; }
            50% { opacity: 1; }
          }
          .animate-progress-fill {
            animation: progress-fill 0.5s ease-out;
            width: ${progressPercentage}%;
          }
          .animate-pulse-opacity {
            animation: pulse-opacity 2s infinite;
          }
        `}</style>
            <div className="flex justify-between">
                <Typography variant="small" color="text-gray-600">
                    Progress
                </Typography>
                <Typography variant="small" color="text-gray-600">
                    {progressPercentage}%
                </Typography>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                <div
                    className="h-full rounded-full animate-progress-fill transition-all duration-500"
                    style={{
                        background: `linear-gradient(to right, ${THEME_COLORS.primary}, ${THEME_COLORS.secondary})`,
                    }}
                />
            </div>
            <div className="animate-pulse-opacity">
                <Typography variant="small" color="text-gray-500" center>
                    {listingsFound < TOTAL_LISTINGS
                        ? `Discovering opportunities... ${listingsFound} found so far`
                        : 'All listings discovered! Preparing results...'}
                </Typography>
            </div>
        </div>
    )
})

LoadingProgress.displayName = 'LoadingProgress'

const StepIndicator = memo<{
    step: LoadingStep
    index: number
    currentStep: number
}>(({ step, index, currentStep }) => (
    <div
        className={`flex items-center gap-3 p-3 rounded-lg border transition-all duration-500 animate-in slide-in-from-left-5 ${
            index <= currentStep
                ? 'border-gray-200'
                : 'bg-white/50 border-gray-200'
        }`}
        style={{
            backgroundColor:
                index <= currentStep ? 'rgba(4, 72, 102, 0.1)' : undefined,
            animationDelay: `${index * 0.1}s`,
        }}
    >
        <style>{`
      @keyframes scale-in {
        from { transform: scale(0); }
        to { transform: scale(1); }
      }
      @keyframes dot-appear {
        from { 
          transform: scale(0);
          opacity: 0;
        }
        to { 
          transform: scale(1);
          opacity: 1;
        }
      }
      .animate-scale-in {
        animation: scale-in 0.3s ease-out;
      }
      .animate-dot-appear {
        animation: dot-appear 0.3s ease-out 0.2s both;
      }
    `}</style>
        {index <= currentStep ? (
            <div
                className="w-8 h-8 rounded-full flex items-center justify-center animate-scale-in"
                style={{ backgroundColor: THEME_COLORS.primary }}
            >
                {index < currentStep ? (
                    <MdCheckCircle className="w-4 h-4 text-white" />
                ) : (
                    <step.icon className="w-4 h-4 text-white" />
                )}
            </div>
        ) : (
            <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                <step.icon className="w-4 h-4 text-gray-400" />
            </div>
        )}
        <Typography
            variant="small"
            color={
                index <= currentStep ? THEME_COLORS.primary : 'text-gray-500'
            }
        >
            <span className="transition-colors duration-300">{step.text}</span>
        </Typography>
        {index < currentStep && (
            <div
                className="ml-auto w-2 h-2 rounded-full animate-dot-appear"
                style={{ backgroundColor: THEME_COLORS.accent }}
            />
        )}
    </div>
))

StepIndicator.displayName = 'StepIndicator'

export const LoadingAnimation: React.FC = memo(() => {
    const [currentStep, setCurrentStep] = useState(0)
    const [listingsFound, setListingsFound] = useState(0)
    const [showCompletion, setShowCompletion] = useState(false)

    // Progress through steps
    useEffect(() => {
        if (currentStep >= LOADING_STEPS.length - 1) return

        const stepTimer = setTimeout(() => {
            setCurrentStep((prev) => prev + 1)
        }, LOADING_STEPS[currentStep]?.duration || 2000)

        return () => clearTimeout(stepTimer)
    }, [currentStep])

    // Increment listings counter
    useEffect(() => {
        const listingTimer = setInterval(() => {
            setListingsFound((prev) =>
                prev < TOTAL_LISTINGS ? prev + 1 : prev
            )
        }, LISTING_INTERVAL)

        return () => clearInterval(listingTimer)
    }, [])

    // Show completion message
    useEffect(() => {
        const completionTimer = setTimeout(() => {
            setShowCompletion(true)
        }, COMPLETION_DELAY)

        return () => clearTimeout(completionTimer)
    }, [])

    const orbitingDots = useMemo(
        () =>
            Array.from({ length: 6 }, (_, index) => (
                <div
                    key={index}
                    className="absolute w-2 h-2 rounded-full animate-spin"
                    style={{
                        backgroundColor: THEME_COLORS.accent,
                        left: '50%',
                        top: '50%',
                        marginLeft: '-4px',
                        marginTop: '-4px',
                        transformOrigin: `${
                            50 * Math.cos((index * Math.PI) / 3)
                        }px ${50 * Math.sin((index * Math.PI) / 3)}px`,
                        animationDuration: '4s',
                        animationDelay: `${index * 0.3}s`,
                    }}
                />
            )),
        []
    )

    return (
        <div className="flex flex-col items-center justify-center py-12 space-y-8">
            <style>{`
        @keyframes spin-ring {
          to { transform: rotate(360deg); }
        }
        @keyframes pulse-scale-1-5 {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }
        @keyframes counter-pulse {
          0%, 100% { transform: translateX(-50%) scale(1); }
          50% { transform: translateX(-50%) scale(1.05); }
        }
        @keyframes orbit {
          from { transform: rotate(0deg) translateX(50px) rotate(0deg); }
          to { transform: rotate(360deg) translateX(50px) rotate(-360deg); }
        }
        .animate-spin-ring {
          animation: spin-ring 2s linear infinite;
        }
        .animate-pulse-scale {
          animation: pulse-scale-1-5 1.5s infinite;
        }
        .animate-counter-pulse {
          animation: counter-pulse 1s infinite;
        }
        .animate-orbit {
          animation: orbit 4s ease-in-out infinite;
        }
      `}</style>
            <LoadingProgress
                listingsFound={listingsFound}
                showCompletion={showCompletion}
            />

            {!showCompletion && (
                <>
                    {/* Central Loading Animation */}
                    <div className="relative">
                        {/* Outer rotating ring */}
                        <div
                            className="w-32 h-32 border-4 rounded-full animate-spin-ring"
                            style={{
                                borderColor: THEME_COLORS.primary,
                                borderTopColor: THEME_COLORS.secondary,
                                borderLeftColor: `rgba(4, 72, 102, 0.3)`,
                                borderRightColor: `rgba(4, 72, 102, 0.3)`,
                                borderBottomColor: `rgba(4, 72, 102, 0.3)`,
                            }}
                        />

                        {/* Inner pulsing circle */}
                        <div
                            className="absolute inset-6 rounded-full flex items-center justify-center animate-pulse-scale"
                            style={{
                                background: `linear-gradient(to right, ${THEME_COLORS.primary}, ${THEME_COLORS.secondary})`,
                            }}
                        >
                            <MdSmartToy className="w-10 h-10 text-white" />
                        </div>

                        {/* Listings Counter */}
                        <div className="absolute -bottom-4 left-1/2 bg-white px-4 py-2 rounded-full shadow-lg border animate-counter-pulse">
                            <span
                                className="text-lg bg-clip-text text-transparent"
                                style={{
                                    backgroundImage: `linear-gradient(to right, ${THEME_COLORS.primary}, ${THEME_COLORS.secondary})`,
                                }}
                            >
                                {listingsFound}/{TOTAL_LISTINGS}
                            </span>
                        </div>

                        {/* Orbiting dots */}
                        {orbitingDots}
                    </div>

                    {/* Progress Steps */}
                    <div className="w-full max-w-lg space-y-4">
                        <div className="text-center space-y-2">
                            <div
                                className="bg-clip-text text-transparent"
                                style={{
                                    backgroundImage: `linear-gradient(to right, ${THEME_COLORS.primary}, ${THEME_COLORS.secondary})`,
                                }}
                            >
                                <Typography
                                    variant="h4"
                                    color="bg-clip-text text-transparent"
                                >
                                    AI Discovery in Progress
                                </Typography>
                            </div>
                            <Typography variant="small" color="text-gray-500">
                                Finding{' '}
                                {listingsFound < TOTAL_LISTINGS
                                    ? 'and analyzing'
                                    : 'the best'}{' '}
                                workplace opportunities for you
                            </Typography>
                        </div>

                        {LOADING_STEPS.map((step, index) => (
                            <StepIndicator
                                key={index}
                                step={step}
                                index={index}
                                currentStep={currentStep}
                            />
                        ))}
                    </div>

                    {/* Progress Bar */}
                    <LoadingProgress
                        listingsFound={listingsFound}
                        showCompletion={showCompletion}
                    />
                </>
            )}
        </div>
    )
})

LoadingAnimation.displayName = 'LoadingAnimation'
