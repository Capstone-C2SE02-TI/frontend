import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { PrivateRoute, PublicRoute } from './routes/routes-v1';
import Home, {
    Signup,
    SignIn,
    ChangePassword,
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
} from './pages';

import { Chart, registerables, Interaction } from 'chart.js';
import ModalSubmitCode from './pages/SignIn/components/ModalFindCode/ModalSubmitCode';
import ResetPassword from './pages/SignIn/components/ModalFindCode/ResetPassword';
import ModalFindCode from './pages/SignIn/components/ModalFindCode/ModalFindCode';
import BuyToken from './pages/BuyToken';
import SwapToken from './pages/SwapToken';
import { ToastContainer } from 'react-toastify';
import configs from './configs';
import LayoutDefault from './layouts/LayoutDefault';
import { useCoinsFetchInterval } from '~/hooks';
import { CrosshairPlugin, Interpolate } from 'chartjs-plugin-crosshair';
import zoomPlugin from 'chartjs-plugin-zoom';
import { Slide, Zoom, Flip, Bounce } from 'react-toastify';
Chart.register(zoomPlugin, ...registerables);
// Interaction.modes.interpolate = Interpolate;

function App() {
    useCoinsFetchInterval();

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
                    <Route path={configs.routes.home} element={<PublicRoute element={<Home />} />} />

                    <Route
                        path={configs.routes.analyze}
                        element={
                            <PrivateRoute
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
                        path="/support"
                        element={
                            <PrivateRoute
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
                            <PrivateRoute
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
                            <PrivateRoute
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
                            <PrivateRoute
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
                            <PrivateRoute
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
                            <PrivateRoute
                                element={
                                    <LayoutDefault>
                                        <TokenDetail />
                                    </LayoutDefault>
                                }
                            />
                        }
                    />
                    <Route
                        path={configs.routes.editProfile}
                        element={
                            <PrivateRoute
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
                            <PrivateRoute
                                element={
                                    <LayoutDefault>
                                        <TransactionShark />
                                    </LayoutDefault>
                                }
                            />
                        }
                    />
                    <Route
                        path={configs.routes.changePassword}
                        element={
                            <PrivateRoute
                                element={
                                    <LayoutDefault>
                                        <ChangePassword />
                                    </LayoutDefault>
                                }
                            />
                        }
                    />
                    <Route
                        path={configs.routes.gainLoss}
                        element={
                            <PrivateRoute
                                element={
                                    <LayoutDefault>
                                        <GainLoss />
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
                            <PrivateRoute
                                element={
                                    <LayoutDefault>
                                        <Profile />
                                    </LayoutDefault>
                                }
                            />
                        }
                    />
                    <Route path={'/resend-code'} element={<ModalSubmitCode />} />
                    <Route path={'/reset-password'} element={<ResetPassword />} />
                    <Route path={'/forgot-password'} element={<ModalFindCode />} />

                    {/* Authentication router */}
                    <Route path={configs.routes.signIn} element={<SignIn />} />
                    <Route path={configs.routes.signUp} element={<Signup />} />
                    <Route path="*" element={<Navigate to="/" />} />
                </Routes>
            </Router>
        </div>
    );
}

export default App;
