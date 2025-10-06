import React from 'react'

export const Redirecting = () => {
    return (
        <div className="text-center">
            <div className="text-xl font-semibold text-gray-800 text-center">
                Redirecting
                <span className="inline-flex ml-1">
                    <span className="animate-[bounce_1s_ease-in-out_0s_infinite] opacity-0 animation-delay-0">
                        .
                    </span>
                    <span className="animate-[bounce_1s_ease-in-out_0.2s_infinite] opacity-0 animation-delay-200">
                        .
                    </span>
                    <span className="animate-[bounce_1s_ease-in-out_0.4s_infinite] opacity-0 animation-delay-400">
                        .
                    </span>
                </span>
            </div>
            <p className="mt-4 text-gray-600 text-[13px] text-center">
                Please wait while we redirect you
            </p>

            <style jsx>{`
                @keyframes bounce {
                    0%,
                    80%,
                    100% {
                        opacity: 0;
                    }
                    40% {
                        opacity: 1;
                    }
                }

                .animation-delay-0 {
                    animation-delay: 0s;
                }

                .animation-delay-200 {
                    animation-delay: 0.2s;
                }

                .animation-delay-400 {
                    animation-delay: 0.4s;
                }
            `}</style>
        </div>
    )
}
