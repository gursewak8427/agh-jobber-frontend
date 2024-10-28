import { useProgressBar } from '@/hooks/use-progress-bar';
import { useRouter } from 'next/navigation';
import { startTransition } from 'react';

export const useCustomRouter = () => {
    const router = useRouter();
    const progress = useProgressBar();

    const customPush = (href) => {
        progress.start();
        startTransition(() => {
            router.push(href);
            progress.done();
        });
    };

    return { customPush };
};
