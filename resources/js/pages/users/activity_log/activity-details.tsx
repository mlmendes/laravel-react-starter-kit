import type { Activity } from '@/types';

export default function ActivityDetails({ activity }: { activity: Activity }) {
    const attributes = activity.attribute_changes?.attributes as Record<
        string,
        unknown
    >;
    const old = activity.attribute_changes?.old as Record<string, unknown>;

    return (
        <ul className="space-y-1 text-sm">
            {Object.keys(attributes).map((key) => {
                let oldValue = undefined;

                if (old) {
                    oldValue = old[key] ?? undefined;
                }

                const newValue = attributes[key];

                return (
                    <li key={key} className="flex flex-wrap gap-1">
                        <span className="font-bold">{key}:</span>
                        {oldValue && (
                            <>
                                <span className="text-destructive">
                                    {oldValue as string}
                                </span>
                                &#8594;
                            </>
                        )}
                        <span>{newValue as string}</span>
                    </li>
                );
            })}
        </ul>
    );
}
