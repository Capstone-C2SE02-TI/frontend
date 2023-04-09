import { Suspense } from 'react';
import { Navigate } from 'react-router-dom';
import LoadingCustomize from '~/components/LoadingCustomize';
import { useSelector } from 'react-redux';
import { userIsPremiumSelector } from '~/modules/user/auth/selectors';

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

export const PremiumRoute = (props) => {
    const { children, element } = props;

    const userIsPremium = useSelector(userIsPremiumSelector);
    return userIsPremium ? (
        <Suspense fallback={<LoadingCustomize cover="content" />}>{element || children}</Suspense>
    ) : (
        <Navigate to="/sign-in" />
    );
};
