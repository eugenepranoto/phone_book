import { Routes, Route } from 'react-router-dom';

import LoadableComponent from '../Loadable';
import routes from './data';

import NotFound from '../../Modules/NotFound';
import ErrorBoundary from '../ErrorBoundary';

export default function RouterComponent() : JSX.Element {
    return (
        <ErrorBoundary>
            <Routes>
                {routes.map((route) => (
                    <Route
                        key={route.path}
                        path={route.path}
                        element={<LoadableComponent loader={route.loader} />}
                    />
                ))}
                <Route path="*" element={<NotFound />} />
            </Routes>
        </ErrorBoundary>

    );
}
