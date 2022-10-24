import { Suspense } from 'react';
import { Navigate } from 'react-router-dom';
import LoadingCustomize from '~/components/LoadingCustomize';

export const PrivateRoute = (props) => {
    const { children, element } = props;

    const isLoggedIn = localStorage.getItem('userInfo');
  
    return isLoggedIn ? (
        <Suspense fallback={<LoadingCustomize cover="content" />}>{element || children}</Suspense>
    ) : (
        <Navigate to="/sign-in" />
    );
};

export const PublicRoute = (props) => {
    const { children, element } = props;
    return <Suspense fallback={<LoadingCustomize cover="content" />}>{element || children}</Suspense>;
};
