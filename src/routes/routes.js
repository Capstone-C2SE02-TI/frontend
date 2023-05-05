import Home, { Signup, SignIn, DisplayCoin, BuyToken, SwapToken, Blog, BlogDetail, ReportOverview } from '~/pages';

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
    path: configs.routes.buyToken,
    component: BuyToken,
  },
  {
    path: configs.routes.swapToken,
    component: SwapToken,
  },
  {
    path: configs.routes.displayCoin,
    component: DisplayCoin,
  },
  {
    path: configs.routes.home,
    component: Home,
  },
  {
    path: configs.routes.blog,
    component: Blog,
  },
  {
    path: configs.routes.blogDetail,
    component: BlogDetail,
  },
  {
    path: configs.routes.reportOverview,
    component: ReportOverview,
  },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
