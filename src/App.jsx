import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import SmoothScroll from './components/SmoothScroll';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import UGCCreators from './pages/UGCCreators';
import InfluencerMarketing from './pages/InfluencerMarketing';
import Preloader from './components/Preloader';
import { useLenis } from 'lenis/react';

// Optimized Scroll Handler for both Page changes and Anchor links
function ScrollHandler() {
    const { pathname, hash } = useLocation();
    const lenis = useLenis();

    useEffect(() => {
        if (hash) {
            // If navigating to an anchor, use lenis for a smooth, snappy transition
            const element = document.querySelector(hash);
            if (element) {
                // Short timeout to ensure page content is rendered
                const timer = setTimeout(() => {
                    if (lenis) {
                        lenis.scrollTo(hash, {
                            offset: 0,
                            immediate: true // Jump immediately as requested
                        });
                    } else {
                        const top = element.getBoundingClientRect().top + window.pageYOffset;
                        window.scrollTo({ top, behavior: 'auto' });
                    }
                }, 10); // Reduced delay for faster response
                return () => clearTimeout(timer);
            }
        } else {
            // Jump to top immediately on page change if no hash
            window.scrollTo(0, 0);
            if (lenis) lenis.scrollTo(0, { immediate: true });
        }
    }, [pathname, hash, lenis]);

    return null;
}

import FloatingActions from './components/FloatingActions';

function App() {
    const [isLoading, setIsLoading] = useState(true);

    return (
        <>
            {isLoading && <Preloader onComplete={() => setIsLoading(false)} />}

            <div className={isLoading ? "opacity-0 invisible" : "opacity-100 visible transition-all duration-700"}>
                <SmoothScroll>
                    <ScrollHandler />
                    <Navbar />
                    <main className="min-h-screen">
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/ugc-creators" element={<UGCCreators />} />
                            <Route path="/influencer-marketing" element={<InfluencerMarketing />} />
                        </Routes>
                        <Footer />
                    </main>
                    <FloatingActions />
                </SmoothScroll>
            </div>
        </>
    );
}

export default App;
