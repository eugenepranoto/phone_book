interface routeProps {
    loader: () => Promise<{ default: React.ComponentType}>;
    path: routePaths
}

export enum routePaths {
    dashboard = '/',
    favorite = '/favorite',
}

const routes: routeProps[] = [
    {
        path: routePaths.dashboard,
        loader: () => import('../../Modules/Contact'),
    },
    {
        path: routePaths.favorite,
        loader: () => import('../../Modules/Favorite'),
    },
];

export default routes;
