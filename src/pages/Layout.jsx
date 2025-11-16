

import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Bus, Mail, MapPin, Globe, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import FaviconLinks from "@/components/FaviconLinks";
import Sitemap from "@/components/Sitemap";

export default function Layout({ children, currentPageName }) {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [language, setLanguage] = useState("en");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const savedLanguage = localStorage.getItem("language") || "en";
    setLanguage(savedLanguage);
    
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLanguageChange = (newLang) => {
    setLanguage(newLang);
    localStorage.setItem("language", newLang);
    window.dispatchEvent(new CustomEvent("languageChange", { detail: newLang }));
  };

  const translations = {
    en: {
      home: "HOME",
      services: "SERVICES",
      fleet: "FLEET",
      about: "ABOUT",
      testimonials: "TESTIMONIALS",
      pricing: "PRICING",
      tripPlanner: "AI TRIP PLANNER",
      contact: "CONTACT",
      bookNow: "BOOK NOW",
      footer: {
        tagline: "Professional Brussels Airport shuttle service since 2011",
        quick: "Quick Links",
        contact: "Contact Us",
        hours: "Available 24/7"
      }
    },
    fr: {
      home: "ACCUEIL",
      services: "SERVICES",
      fleet: "FLOTTE",
      about: "À PROPOS",
      testimonials: "TÉMOIGNAGES",
      pricing: "TARIFS",
      tripPlanner: "PLANIFICATEUR IA",
      contact: "CONTACT",
      bookNow: "RÉSERVER",
      footer: {
        tagline: "Service de navette professionnel vers l'aéroport de Bruxelles depuis 2011",
        quick: "Liens Rapides",
        contact: "Contactez-nous",
        hours: "Disponible 24h/24"
      }
    }
  };

  const t = translations[language];

  const navigation = [
    { name: t.home, path: createPageUrl("Home") },
    { name: t.services, path: createPageUrl("Services") },
    { name: t.fleet, path: createPageUrl("Fleet") },
    { name: t.about, path: createPageUrl("About") },
    { name: t.testimonials, path: createPageUrl("Testimonials") },
    { name: t.pricing, path: createPageUrl("Pricing") },
    { name: t.tripPlanner, path: createPageUrl("TripPlanner") },
    { name: t.contact, path: createPageUrl("Contact") }
  ];

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <FaviconLinks />
      <Sitemap />
      
      {/* Header */}
      <header className={`fixed top-0 w-full z-50 transition-all duration-300 bg-gray-900 ${
        scrolled ? "shadow-lg py-3" : "py-5"
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <Link to={createPageUrl("Home")} className="flex items-center gap-2 group">
              <Bus className="w-8 h-8 text-orange-500" />
              <div>
                <h1 className="text-xl font-bold text-white uppercase tracking-wide" style={{fontFamily: 'serif'}}>
                  Shuttles Brussels
                </h1>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-6">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`text-sm font-medium transition-colors ${
                    location.pathname === item.path
                      ? "text-orange-400"
                      : "text-white hover:text-orange-400"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
              
              <button
                onClick={() => handleLanguageChange(language === "en" ? "fr" : "en")}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-orange-500 text-orange-400 hover:bg-orange-500 hover:text-white transition-colors text-sm"
              >
                <Globe className="w-4 h-4" />
                {language.toUpperCase()}
              </button>

              <Link to={createPageUrl("Contact")}>
                <Button className="bg-orange-500 hover:bg-orange-600 text-white rounded-full px-6">
                  {t.bookNow}
                </Button>
              </Link>
            </nav>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <div className="w-6 h-5 flex flex-col justify-between">
                <span className={`w-full h-0.5 bg-white transition-all ${mobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
                <span className={`w-full h-0.5 bg-white transition-all ${mobileMenuOpen ? 'opacity-0' : ''}`} />
                <span className={`w-full h-0.5 bg-white transition-all ${mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
              </div>
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden mt-4 pb-4 border-t border-gray-700 pt-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className="block py-2 text-white hover:text-orange-400"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <button
                onClick={() => {
                  handleLanguageChange(language === "en" ? "fr" : "en");
                  setMobileMenuOpen(false);
                }}
                className="flex items-center gap-2 py-2 text-white hover:text-orange-400"
              >
                <Globe className="w-4 h-4" />
                {language === "en" ? "Français" : "English"}
              </button>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 pt-20">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Bus className="w-8 h-8 text-orange-500" />
                <h3 className="text-lg font-bold uppercase" style={{fontFamily: 'serif'}}>Shuttles Brussels</h3>
              </div>
              <p className="text-gray-400 text-sm">{t.footer.tagline}</p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-semibold mb-4 text-orange-400">{t.footer.quick}</h4>
              <div className="space-y-2">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.path}
                    className="block text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-semibold mb-4 text-orange-400">{t.footer.contact}</h4>
              <div className="space-y-3 text-sm text-gray-400">
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <span>Rue Bara 1070 Brussels</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 flex-shrink-0" />
                  <a href="mailto:info@shuttles.brussels" className="hover:text-white transition-colors">
                    info@shuttles.brussels
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 flex-shrink-0" />
                  <a href="tel:+3227810150" className="hover:text-white transition-colors">
                    +32 2 781 01 50
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-6 text-center text-sm text-gray-400">
            <p>&copy; {new Date().getFullYear()} Shuttles Brussels. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

