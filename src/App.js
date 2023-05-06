import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { PublicRoute } from './routes/routes-v1';
import Home, {
  Profile,
  EditProfile,
  HomeDashboard,
  Setting,
  Report,
  Support,
  Discover,
  Analyze,
  TokenDetail,
  TransactionShark,
  GainLoss,
  PortfolioSharkFollow,
  Blog,
  BlogDetail,
  ReportOverview,
  CopyTrading,
  CopyOverview,
} from './pages';

import { Chart, registerables } from 'chart.js';
import BuyToken from './pages/BuyToken';
import SwapToken from './pages/SwapToken';
import { ToastContainer } from 'react-toastify';
import configs from './configs';
import LayoutDefault from './layouts/LayoutDefault';
import zoomPlugin from 'chartjs-plugin-zoom';
import { Slide, Zoom, Flip, Bounce } from 'react-toastify';
import ChartRenderer from './pages/ChartRenderer/ChartRenderer';

Chart.register(zoomPlugin, ...registerables);
// Interaction.modes.interpolate = Interpolate;

function App() {
  return (
    <div className="app">
      <ToastContainer
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick={true}
        pauseOnHover={true}
        draggable={true}
        progress={undefined}
        // theme={'warning'}
        transition={Flip}
      />
      <Router>
        <Routes>
          <Route path={'/test'} element={<PublicRoute element={<ChartRenderer />} />} />

          <Route path={configs.routes.home} element={<PublicRoute element={<Home />} />} />
          <Route
            path={configs.routes.analyze}
            element={
              <PublicRoute
                element={
                  <LayoutDefault>
                    <Analyze />
                  </LayoutDefault>
                }
              />
            }
          />
          <Route
            path={configs.routes.discover}
            element={
              <PublicRoute
                element={
                  <LayoutDefault>
                    <Discover />
                  </LayoutDefault>
                }
              />
            }
          />
          <Route
            path={configs.routes.editProfile}
            element={
              <PublicRoute
                element={
                  <LayoutDefault>
                    <EditProfile />
                  </LayoutDefault>
                }
              />
            }
          />
          <Route
            path={configs.routes.transactionShark}
            element={
              <PublicRoute
                element={
                  <LayoutDefault>
                    <TransactionShark />
                  </LayoutDefault>
                }
              />
            }
          />
          <Route
            path="/support"
            element={
              <PublicRoute
                element={
                  <LayoutDefault>
                    <Support />
                  </LayoutDefault>
                }
              />
            }
          />
          <Route
            path="/report"
            element={
              <PublicRoute
                element={
                  <LayoutDefault>
                    <Report />
                  </LayoutDefault>
                }
              />
            }
          />
          <Route
            path="/setting"
            element={
              <PublicRoute
                element={
                  <LayoutDefault>
                    <Setting />
                  </LayoutDefault>
                }
              />
            }
          />
          <Route
            path={configs.routes.homeDashboard}
            element={
              <PublicRoute
                element={
                  <LayoutDefault>
                    <HomeDashboard />
                  </LayoutDefault>
                }
              />
            }
          />
          <Route
            path={configs.routes.buyToken}
            element={
              <PublicRoute
                element={
                  <LayoutDefault>
                    <BuyToken />
                  </LayoutDefault>
                }
              />
            }
          />
          <Route
            path={configs.routes.swapToken}
            element={
              <PublicRoute
                element={
                  <LayoutDefault>
                    <SwapToken />
                  </LayoutDefault>
                }
              />
            }
          />
          <Route
            path={configs.routes.tokenDetailL}
            element={
              <PublicRoute
                element={
                  <LayoutDefault>
                    <TokenDetail />
                  </LayoutDefault>
                }
              />
            }
          />
          <Route
            path={configs.routes.gainLoss}
            element={
              <PublicRoute
                element={
                  <LayoutDefault>
                    <GainLoss />
                  </LayoutDefault>
                }
              />

            }
          />
          <Route
            path={configs.routes.reportOverview}
            element={
              <PublicRoute
                element={
                  <LayoutDefault>
                    <ReportOverview />
                  </LayoutDefault>
                }
              />
            }
          />
          <Route
            path={configs.routes.portfolioSharkFollow}
            element={
              <PublicRoute
                element={
                  <LayoutDefault>
                    <PortfolioSharkFollow />
                  </LayoutDefault>
                }
              />
            }
          />
          <Route
            path={configs.routes.profile}
            element={
              <PublicRoute
                element={
                  <LayoutDefault>
                    <Profile />
                  </LayoutDefault>
                }
              />
            }
          />
          <Route
            path={configs.routes.copyTrading}
            element={
              <PublicRoute
                element={
                  <LayoutDefault>
                    <CopyTrading />
                  </LayoutDefault>
                }
              />
            }
          />
          <Route
            path={configs.routes.copyOverview}
            element={
              <PublicRoute
                element={
                  <LayoutDefault>
                    <CopyOverview />
                  </LayoutDefault>
                }
              />
            }
          />
          <Route path={configs.routes.blogDetail} element={<PublicRoute element={<BlogDetail />} />} />
          <Route path={configs.routes.blog} element={<PublicRoute element={<Blog />} />} />
          {/* Authentication router */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
