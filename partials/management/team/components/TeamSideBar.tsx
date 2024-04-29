type TeamSideBarProps = {
    children: any
    sideBar?: boolean
}
export function TeamSideBar({ children, sideBar }: TeamSideBarProps) {
    let classes = ''
    if (sideBar) {
        classes = `${classes} w-[305px] py-9 px-6`
    }else{
        classes = `${classes} w-full py-5 pl-10 pr-7`
    }
    return <div className={`rounded-lg bg-white/80 ${classes}`}>{children}</div>
}
const Avatar = ({ children }: any) => {
    return <div>{children}</div>
}
const KpiCountCard = ({ children }: any) => {
    return <div>{children}</div>
}
const Title = ({ children }: any) => {
    return <div>{children}</div>
}

TeamSideBar.Avatar = Avatar
TeamSideBar.KpiCountCard = KpiCountCard
TeamSideBar.Title = Title
