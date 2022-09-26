import { BrowserRouter as Router , Route, Routes, Navigate } from 'react-router-dom';
import Home, { Signup, SignIn, DisplayCoin } from '~/pages';
import configs from '~/configs';
import { PrivateRoute, PublicRoute } from './routes/routes-v1';
import P2P from './pages/P2P';
import LayoutDefault from './layouts/LayoutDefault';
import TokenDetail from './pages/TokenDetail';

function App() {
    return (
        <Router>
            <Routes>
                <Route path={configs.routes.home} element={<PublicRoute element={<Home />} />} />
                <Route path={configs.routes.displayCoin} element={<PublicRoute element={<DisplayCoin />} />} />
                <Route path={configs.routes.p2p} element={<PrivateRoute element={<P2P />} />} />
                <Route path={configs.routes.tokenDetailL} element={<PublicRoute element={<LayoutDefault><TokenDetail /></LayoutDefault>} />} />

                {/* Authentication router */}
                <Route path={configs.routes.signIn} element={<SignIn />} />
                <Route path={configs.routes.signUp} element={<Signup />} />
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </Router>
    );
}

export default App;
