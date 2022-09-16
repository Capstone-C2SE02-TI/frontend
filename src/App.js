import { BrowserRouter as Router , Route, Routes, Navigate } from 'react-router-dom';
import Home, { Signup, SignIn } from '~/pages';
import configs from '~/configs';
import { PrivateRoute, PublicRoute } from './routes/routes-v1';
import P2P from './pages/P2P';

function App() {
    return (
        <Router>
            <Routes>
                <Route path={configs.routes.home} element={<PublicRoute element={<Home />} />} />
                <Route path={configs.routes.p2p} element={<PrivateRoute element={<P2P />} />} />

                <Route path={configs.routes.signIn} element={<SignIn />} />
                <Route path={configs.routes.signUp} element={<Signup />} />
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </Router>
    );
}

export default App;
