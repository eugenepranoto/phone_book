import React, { Suspense } from 'react';

import LayoutComponent from '../Layout';
import LoadingComponent from '../Loading';

export default function LoadableComponent({
    loader,
}: {
    loader: () => Promise<{ default: React.ComponentType }>;
}) : JSX.Element {
    const LazyComponent = React.lazy(loader);

    return (
        <Suspense fallback={<LoadingComponent/>}>
            <LayoutComponent>
                <LazyComponent />
            </LayoutComponent>
        </Suspense>
    );
}
