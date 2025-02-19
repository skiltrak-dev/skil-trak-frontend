import { VariableSizeGrid as Grid } from 'react-window'
import { useEffect, useState } from 'react'
import { BlogCard } from '@partials/common/Blogs'
import { useWindowWidth } from '@hooks'

const COLUMN_COUNT = 3 // Default for desktop

export const ReactWindowBlogsGrid = ({ data }: { data: any[] }) => {
    const windowWidth = useWindowWidth() // Custom hook to get window width
    const [columnCount, setColumnCount] = useState(COLUMN_COUNT)
    const maxWidth = 1280 // Set max container width

    useEffect(() => {
        if (windowWidth < 768) {
            setColumnCount(1) // Mobile view: 1 column
        } else if (windowWidth < 1024) {
            setColumnCount(2) // Tablet view: 2 columns
        } else {
            setColumnCount(3) // Desktop view: 3 columns
        }
    }, [windowWidth])

    const rowCount = Math.ceil(data.length / columnCount)
    const gridWidth = Math.min(windowWidth - 40, maxWidth) // Ensure max width of 1280px
    const columnWidth = gridWidth / columnCount // Ensure even distribution

    function Cell({ columnIndex, rowIndex, style }: any) {
        const itemIndex = rowIndex * columnCount + columnIndex
        if (itemIndex >= data.length) return null // Avoid rendering empty items

        const blog = data[itemIndex]

        return (
            <div
                style={{
                    ...style,
                    padding: '10px',
                    maxWidth: columnWidth,
                }}
                className=""
            >
                <BlogCard
                    key={blog.id}
                    title={blog.title}
                    content={blog.content}
                    featuredImage={blog.featuredImage}
                    date={blog.updatedAt}
                    id={blog.id}
                    slug={blog.slug}
                    author={blog.author}
                    shortDescription={blog.shortDescription}
                    metaData={blog.metaData}
                />
            </div>
        )
    }

    return (
        <div className="mx-auto" style={{ maxWidth: maxWidth }}>
            <Grid
                columnCount={columnCount}
                columnWidth={() => columnWidth} // Ensures grid fits within maxWidth
                height={600}
                rowCount={rowCount}
                rowHeight={() => 410} // Adjust row height as needed
                width={gridWidth}
                className="remove-scrollbar space-y-6" // Set max width of grid
            >
                {Cell}
            </Grid>
        </div>
    )
}
