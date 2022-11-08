import Image from 'next/image'

export const Advertisement = () => {
    return (
        // <Image
        //     src={`https://picsum.photos/150`}
        //     alt="SideBar"
        //     width={150}
        //     height={150}
        // />
        <img
            src={`https://picsum.photos/150`}
            alt="SideBar"
            width={150}
            height={150}
            className="mx-auto my-2 rounded-md"
        />
    )
}
