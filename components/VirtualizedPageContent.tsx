import React, { Suspense } from 'react'
import { FixedSizeList } from 'react-window'
import { useInView } from 'react-intersection-observer'

// Type for section data
interface Section {
    Component: React.LazyExoticComponent<any>
    height: number
}

// Component to wrap each section
const SectionWrapper: React.FC<{ section: Section }> = ({ section }) => {
    const { ref, inView } = useInView({
        threshold: 0,
        triggerOnce: true,
    })

    return (
        <div ref={ref} className="w-full">
            {inView && (
                <Suspense
                    fallback={
                        <div className="h-full w-full bg-gray-100 animate-pulse" />
                    }
                >
                    <section.Component />
                </Suspense>
            )}
        </div>
    )
}

// Main virtualized container
const VirtualizedPageContent: React.FC<{ sections: Section[] }> = ({
    sections,
}) => {
    const Row = ({
        index,
        style,
    }: {
        index: number
        style: React.CSSProperties
    }) => (
        <div style={style}>
            <SectionWrapper section={sections[index]} />
        </div>
    )

    return (
        <FixedSizeList
            height={window.innerHeight}
            width="100%"
            itemCount={sections.length}
            itemSize={800} // Adjust this based on your average section height
            overscanCount={2}
        >
            {Row}
        </FixedSizeList>
    )
}

export default VirtualizedPageContent
