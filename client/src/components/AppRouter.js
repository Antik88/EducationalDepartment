import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { authRoutes, publicRoutes } from '../routes';
import { observer } from 'mobx-react-lite';
import { LOGIN_ROUTE, MAINPAGE_ROUTE } from '../utils/consts';

const AppRouter = () => {
    const isAuth = localStorage.getItem('isAuth');

    return (
        <Routes>
            {isAuth === 'true' && authRoutes.map(({ path, Component }) =>
                <Route key={path} path={path} element={<Component />} exact />
            )}
            {publicRoutes.map(({ path, Component }) => (
                <Route key={path} path={path} element={<Component />} />
            ))}
            <Route path="*" element={<Navigate to={MAINPAGE_ROUTE} />} />
        </Routes>
    );
};

export default observer(AppRouter);