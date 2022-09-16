import Home, { Signup, SignIn, DisplayCoin } from '~/pages';

import configs from '~/configs';

const publicRoutes = [
    {
        path: configs.routes.signUp,
        component: Signup,
    },
    {
        path: configs.routes.signIn,
        component: SignIn,
    },
    {
        path: configs.routes.home,
        component: Home,
    },
    {
        path: configs.routes.displayCoin,
        component: DisplayCoin,
    },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
