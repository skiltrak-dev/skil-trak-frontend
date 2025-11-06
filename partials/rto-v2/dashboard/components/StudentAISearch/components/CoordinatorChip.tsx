import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar"

interface CoordinatorChipProps {
    name: string
    avatar: string
}

export function CoordinatorChip({ name, avatar }: CoordinatorChipProps) {
    const initials = name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2)

    return (
        <div className="inline-flex items-center gap-2 rounded-full bg-secondary px-3 py-1.5">
            <Avatar className="h-6 w-6">
                <AvatarImage src={avatar} alt={name} />
                <AvatarFallback className="text-xs">{initials}</AvatarFallback>
            </Avatar>
            <span className="text-sm text-secondary-foreground">{name}</span>
        </div>
    )
}
