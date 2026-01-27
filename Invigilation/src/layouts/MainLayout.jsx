import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const MainLayout = ({ children }) => {
    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow pt-[var(--header-height)]">
                {children}
            </main>
            <Footer />
        </div>
    );
};

export default MainLayout;
