import Home, { Signup } from '~/pages';

import configs from '~/configs';

const publicRoutes = [
    {
        path: configs.routes.signUp,
        component: Signup,
    },
    {
        path: configs.routes.home,
        component: Home,
    },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
