import React from 'react'
import ContentLoader from 'react-content-loader'

export const JobContentLoader = () => {
    return (
        <div
            className="
      bg-white
      shadow-md
      border-secondary border-t-8
      px-3
      py-1
      block
      transition-all
      hover:bg-secondary
      duration-300
      group
      "
        >
            <ContentLoader
                speed={2}
                width={476}
                height={110}
                viewBox="0 0 476 110"
                backgroundColor="#f3f3f3"
                foregroundColor="#ecebeb"
            >
                <rect x="1" y="6" rx="3" ry="3" width="132" height="24" />
                <rect x="2" y="40" rx="3" ry="3" width="178" height="14" />
                <rect x="3" y="58" rx="3" ry="3" width="96" height="14" />
                <rect x="5" y="96" rx="3" ry="3" width="72" height="8" />
            </ContentLoader>
        </div>
    )
}
