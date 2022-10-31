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
} from './pages';

import { Chart, registerables } from 'chart.js';
import ModalSubmitCode from './pages/SignIn/components/ModalFindCode/ModalSubmitCode';
import ResetPassword from './pages/SignIn/components/ModalFindCode/ResetPassword';
import ModalFindCode from './pages/SignIn/components/ModalFindCode/ModalFindCode';
import BuyToken from './pages/BuyToken';
import SwapToken from './pages/SwapToken';
import { ToastContainer } from 'react-toastify';
import configs from './configs';
import LayoutDefault from './layouts/LayoutDefault';

Chart.register(...registerables);

function App() {
    return (
      
        <div className="app">
            <ToastContainer />
            <Router>
                <Routes>
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
