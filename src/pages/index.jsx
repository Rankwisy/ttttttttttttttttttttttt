import Layout from "./Layout.jsx";

import Home from "./Home";

import Services from "./Services";

import About from "./About";

import Contact from "./Contact";

import Fleet from "./Fleet";

import Testimonials from "./Testimonials";

import Pricing from "./Pricing";

import TripPlanner from "./TripPlanner";

import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';

const PAGES = {
    
    Home: Home,
    
    Services: Services,
    
    About: About,
    
    Contact: Contact,
    
    Fleet: Fleet,
    
    Testimonials: Testimonials,
    
    Pricing: Pricing,
    
    TripPlanner: TripPlanner,
    
}

function _getCurrentPage(url) {
    if (url.endsWith('/')) {
        url = url.slice(0, -1);
    }
    let urlLastPart = url.split('/').pop();
    if (urlLastPart.includes('?')) {
        urlLastPart = urlLastPart.split('?')[0];
    }

    const pageName = Object.keys(PAGES).find(page => page.toLowerCase() === urlLastPart.toLowerCase());
    return pageName || Object.keys(PAGES)[0];
}

// Create a wrapper component that uses useLocation inside the Router context
function PagesContent() {
    const location = useLocation();
    const currentPage = _getCurrentPage(location.pathname);
    
    return (
        <Layout currentPageName={currentPage}>
            <Routes>            
                
                    <Route path="/" element={<Home />} />
                
                
                <Route path="/Home" element={<Home />} />
                
                <Route path="/Services" element={<Services />} />
                
                <Route path="/About" element={<About />} />
                
                <Route path="/Contact" element={<Contact />} />
                
                <Route path="/Fleet" element={<Fleet />} />
                
                <Route path="/Testimonials" element={<Testimonials />} />
                
                <Route path="/Pricing" element={<Pricing />} />
                
                <Route path="/TripPlanner" element={<TripPlanner />} />
                
            </Routes>
        </Layout>
    );
}

export default function Pages() {
    return (
        <Router>
            <PagesContent />
        </Router>
    );
}