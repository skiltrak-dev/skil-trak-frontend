import moment from 'moment'
import Link from 'next/link'
import ContentLoader from 'react-content-loader'

export const NewsCard = ({ news, large, small, loader }: any) => {
    const largeCard = {
        container:
            'w-full lg:w-3/6 rounded-xl border block overflow-hidden mb-3 lg:mb-0',
        loader: 'w-full lg:w-3/6 rounded-xl border block overflow-hidden mb-3 lg:mb-0',
        image: 'w-full h-64',
        description: {
            container: 'p-3',
            dated: 'text-secondary text-sm',
            news: 'text-xl lg:text-2xl font-semibold my-3',
        },
    }

    const smallCard = {
        container:
            'rounded-xl border flex flex-grow overflow-hidden mb-3 lg:mb-2',
        loader: 'rounded-xl border overflow-hidden mb-3 lg:mb-2',
        image: 'w-24 lg:w-48 h-auto',
        description: {
            container: 'py-3 px-1 lg:p-3',
            dated: 'text-secondary text-sm',
            news: 'text-sm lg:text-md font-semibold my-2',
        },
    }

    const defaultCard = {
        container:
            'w-full md:w-1/5 rounded-xl border block overflow-hidden mb-2',
        loader: 'w-full md:w-1/5 rounded-xl border block overflow-hidden',
        image: 'w-full h-48',
        description: {
            container: 'p-3',
            dated: 'text-secondary text-sm',
            news: 'font-semibold my-3',
        },
    }

    let cardStyle = defaultCard
    if (large) cardStyle = largeCard
    else if (small) cardStyle = smallCard

    let getLoader = () => {
        if (large)
            return (
                <ContentLoader
                    speed={2}
                    width={576}
                    height={358}
                    viewBox="0 0 576 358"
                    backgroundColor="#f3f3f3"
                    foregroundColor="#ecebeb"
                >
                    <rect x="0" y="0" rx="0" ry="0" width="576" height="256" />
                    <rect
                        x="12"
                        y="268"
                        rx="0"
                        ry="0"
                        width="100"
                        height="17"
                    />
                    <rect
                        x="12"
                        y="298"
                        rx="0"
                        ry="0"
                        width="297"
                        height="32"
                    />
                </ContentLoader>
            )

        if (small)
            return (
                <ContentLoader
                    speed={2}
                    width={576}
                    height={112}
                    viewBox="0 0 576 112"
                    backgroundColor="#f3f3f3"
                    foregroundColor="#ecebeb"
                >
                    <rect x="0" y="0" rx="0" ry="0" width="192" height="112" />
                    <rect x="206" y="12" rx="0" ry="0" width="72" height="17" />
                    <rect
                        x="206"
                        y="36"
                        rx="0"
                        ry="0"
                        width="277"
                        height="17"
                    />
                    <rect
                        x="207"
                        y="60"
                        rx="0"
                        ry="0"
                        width="277"
                        height="17"
                    />
                </ContentLoader>
            )

        return (
            <ContentLoader
                speed={2}
                width={238}
                height={308}
                viewBox="0 0 238 308"
                backgroundColor="#f3f3f3"
                foregroundColor="#ecebeb"
            >
                <rect x="0" y="0" rx="0" ry="0" width="238" height="192" />
                <rect x="12" y="212" rx="0" ry="0" width="88" height="17" />
                <rect x="12" y="241" rx="0" ry="0" width="208" height="17" />
                <rect x="12" y="264" rx="0" ry="0" width="208" height="17" />
            </ContentLoader>
        )
    }

    return loader ? (
        <div className={cardStyle.loader}>{getLoader()}</div>
    ) : (
        <Link href="#" className={cardStyle.container}>
            {/* <img className={cardStyle.image} src={news?.image_url} alt="" /> */}
            <div
                className={cardStyle.image}
                style={{
                    backgroundImage: `url('${news?.image_url}')`,
                    backgroundPosition: 'center center',
                    backgroundSize: 'cover',
                }}
            ></div>
            <div className={cardStyle.description.container}>
                <p className={cardStyle.description.dated}>
                    {moment(news?.posted_at).fromNow()}
                </p>
                <p className={cardStyle.description.news}>{news?.title}</p>
            </div>
        </Link>
    )
}
