import { Suspense } from 'react';
import { Navigate } from 'react-router-dom';
import Loading from '~/components/Loading';

export const PrivateRoute = (props) => {
    const { children, element } = props;

    const  isLoggedIn  = false;
    return isLoggedIn ? (
           <Suspense fallback={<Loading cover='content' />}>{element || children}</Suspense>
    ) : (
        <Navigate to="/sign-in" />
    );
};

export const PublicRoute = (props) => {
    const { children, element } = props;
    return    <Suspense fallback={<Loading cover='content' />}>{element || children}</Suspense>;
};
