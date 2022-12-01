import { Suspense, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import LoadingCustomize from '~/components/LoadingCustomize';
import { useSelector } from 'react-redux';
import { userIsPremiumSelector } from '~/modules/user/auth/selectors';
import ModalNotify from '~/components/ModalNotify';

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
    const [openModalSucceed, setOpenModalSucceed] = useState(true);

    const isLoggedIn = localStorage.getItem('userInfo');
    const userIsPremium = useSelector(userIsPremiumSelector);

    const navigate = useNavigate()


console.log({ userIsPremium });
    return userIsPremium ? (
        <Suspense fallback={<LoadingCustomize cover="content" />}>{element || children}</Suspense>
    ) : (
        <Navigate to="/sign-in" />
    );
};
