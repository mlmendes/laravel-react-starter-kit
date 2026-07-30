import { Cog } from 'lucide-react';
import UserAvatar from '@/components/user-avatar';
import type { Activity } from '@/types';
export default function ActivityCauser({ activity }: { activity: Activity }) {
    return activity.causer ? (
        <UserAvatar user={activity.causer} />
    ) : (
        <span className="relative flex size-8 h-8 w-8 shrink-0 overflow-hidden rounded-full">
            <span className="flex size-full items-center justify-center rounded-lg bg-neutral-200 text-black dark:bg-neutral-700 dark:text-white">
                <Cog />
            </span>
        </span>
    );
}
