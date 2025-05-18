// import React from 'react';
import { Outlet } from 'react-router';
import Footer from '../components/Footer';
import SmallNav from '../components/SmallNav';

const MainLayout = () => {
    return (
        <div>
            <SmallNav/>
            <Outlet />
            <Footer />
        </div>
    );
};

export default MainLayout;