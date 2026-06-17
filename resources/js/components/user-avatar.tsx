import { X } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useInitials } from '@/hooks/use-initials';
import type { User } from '@/types';

export default function UserAvatar({ user }: { user: User }) {
    const getInitials = useInitials();

    return (
        <Avatar className="h-8 w-8 overflow-hidden rounded-full">
            {user.deleted_at ? (
                <AvatarFallback className="rounded-lg bg-destructive text-black dark:text-white">
                    <X />
                </AvatarFallback>
            ) : (
                <>
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback className="rounded-lg bg-neutral-200 text-black dark:bg-neutral-700 dark:text-white">
                        {getInitials(user.name)}
                    </AvatarFallback>
                </>
            )}
        </Avatar>
    );
}
