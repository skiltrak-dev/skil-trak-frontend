import Link from 'next/link'
import { useRouter } from 'next/router'
type Props = {
  tabs: any
}

export const Tabs = ({ tabs }: Props) => {
  const pathname = useRouter()
  return (
    <div className="flex gap-x-14 py-4 mb-3 cursor-pointer border-b border-secondary-dark">
      {tabs.map(({ tab, url, count }: any, index: number) => (
        <Link legacyBehavior
          key={index}
          href={url}
          className={`text-sm font-semibold ${pathname === url ? 'text-black' : 'text-gray-light'
            }`}
        >
          <span className="flex items-center gap-x-1">
            {tab}
            {count && (
              <span className="bg-info px-1 min-w-[16px] h-4 flex justify-center items-center rounded-sm text-white text-[11px]">
                {count}
              </span>
            )}
          </span>
        </Link>
      ))}
    </div>
  )
}
