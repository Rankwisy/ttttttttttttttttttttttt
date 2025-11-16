import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Sparkles, Zap, Target, Brain } from "lucide-react";
import TripPlannerAI from "../components/ai/TripPlannerAI";
import SEO from "../components/SEO";

export default function TripPlanner() {
  const [language, setLanguage] = useState("en");

  useEffect(() => {
    const savedLanguage = localStorage.getItem("language") || "en";
    setLanguage(savedLanguage);

    const handleLanguageChange = (e) => {
      setLanguage(e.detail);
    };
    window.addEventListener("languageChange", handleLanguageChange);
    return () => window.removeEventListener("languageChange", handleLanguageChange);
  }, []);

  const content = {
    en: {
      hero: {
        title: "AI Trip Planning",
        subtitle: "Let our intelligent assistant plan the perfect journey for you"
      },
      features: {
        title: "Smart Trip Planning Features",
        items: [
          {
            icon: Brain,
            title: "Intelligent Route Optimization",
            description: "AI analyzes traffic patterns and suggests the best routes for your journey"
          },
          {
            icon: Target,
            title: "Perfect Vehicle Matching",
            description: "Get personalized vehicle recommendations based on your group size and needs"
          },
          {
            icon: Zap,
            title: "Real-time Insights",
            description: "Access up-to-date local information and travel tips for your destination"
          }
        ]
      }
    },
    fr: {
      hero: {
        title: "Planification de Voyage IA",
        subtitle: "Laissez notre assistant intelligent planifier le voyage parfait pour vous"
      },
      features: {
        title: "Fonctionnalités de Planification Intelligente",
        items: [
          {
            icon: Brain,
            title: "Optimisation Intelligente des Itinéraires",
            description: "L'IA analyse les conditions de trafic et suggère les meilleurs itinéraires"
          },
          {
            icon: Target,
            title: "Correspondance de Véhicule Parfaite",
            description: "Obtenez des recommandations de véhicules personnalisées selon vos besoins"
          },
          {
            icon: Zap,
            title: "Informations en Temps Réel",
            description: "Accédez aux informations locales et conseils de voyage actualisés"
          }
        ]
      }
    }
  };

  const t = content[language];

  return (
    <div className="min-h-screen">
      <SEO language={language} page="home" />
      
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-purple-600 via-purple-500 to-orange-500 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Sparkles className="w-16 h-16 mx-auto mb-6" />
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {t.hero.title}
            </h1>
            <p className="text-xl text-purple-100">
              {t.hero.subtitle}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            {t.features.title}
          </h2>
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {t.features.items.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className="text-center"
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-orange-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-8 h-8 text-purple-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">
                    {feature.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* AI Trip Planner */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <TripPlannerAI language={language} />
        </div>
      </section>
    </div>
  );
}