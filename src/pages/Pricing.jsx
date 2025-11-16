import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Calculator, Info, TrendingUp, Clock, Calendar, Zap } from "lucide-react";
import PriceCalculator from "../components/pricing/PriceCalculator";
import SEO from "../components/SEO";

export default function Pricing() {
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
        title: "Transparent Pricing",
        subtitle: "Get instant quotes with our dynamic pricing calculator"
      },
      howItWorks: {
        title: "How Our Pricing Works",
        description: "We use dynamic pricing to ensure fair rates based on demand, time, and distance. Here's what affects your price:",
        factors: [
          {
            icon: Clock,
            title: "Time of Day",
            description: "Peak hours (7-9 AM, 5-7 PM on weekdays) have a 20% surcharge to account for traffic and high demand."
          },
          {
            icon: Calendar,
            title: "Day of Week",
            description: "Weekend bookings have a 15% surcharge. Holidays and special events may have additional fees."
          },
          {
            icon: TrendingUp,
            title: "Booking Window",
            description: "Last-minute bookings (within 48 hours) have a 25% surcharge. Book early to save!"
          },
          {
            icon: Zap,
            title: "Service Type & Distance",
            description: "Different services have different base rates. Longer distances incur additional fees."
          }
        ]
      },
      benefits: {
        title: "Why Dynamic Pricing?",
        points: [
          "Fair pricing based on actual demand",
          "Transparent breakdown of all costs",
          "Encourages advance booking for better rates",
          "No hidden fees or surprises",
          "Real-time price adjustments"
        ]
      },
      cta: {
        title: "Have Questions About Pricing?",
        description: "Our team is here to help you understand your quote",
        button: "Contact Us"
      }
    },
    fr: {
      hero: {
        title: "Tarification Transparente",
        subtitle: "Obtenez des devis instantanés avec notre calculateur de prix dynamique"
      },
      howItWorks: {
        title: "Comment Fonctionne Notre Tarification",
        description: "Nous utilisons une tarification dynamique pour garantir des tarifs équitables basés sur la demande, l'heure et la distance. Voici ce qui affecte votre prix:",
        factors: [
          {
            icon: Clock,
            title: "Heure de la Journée",
            description: "Les heures de pointe (7h-9h, 17h-19h en semaine) ont un supplément de 20% pour tenir compte du trafic et de la forte demande."
          },
          {
            icon: Calendar,
            title: "Jour de la Semaine",
            description: "Les réservations de week-end ont un supplément de 15%. Les jours fériés peuvent avoir des frais supplémentaires."
          },
          {
            icon: TrendingUp,
            title: "Délai de Réservation",
            description: "Les réservations de dernière minute (dans les 48h) ont un supplément de 25%. Réservez tôt pour économiser!"
          },
          {
            icon: Zap,
            title: "Type de Service & Distance",
            description: "Différents services ont des tarifs de base différents. Les longues distances entraînent des frais supplémentaires."
          }
        ]
      },
      benefits: {
        title: "Pourquoi la Tarification Dynamique?",
        points: [
          "Prix équitable basé sur la demande réelle",
          "Répartition transparente de tous les coûts",
          "Encourage la réservation anticipée pour de meilleurs tarifs",
          "Pas de frais cachés ni de surprises",
          "Ajustements de prix en temps réel"
        ]
      },
      cta: {
        title: "Questions sur la Tarification?",
        description: "Notre équipe est là pour vous aider à comprendre votre devis",
        button: "Contactez-nous"
      }
    }
  };

  const t = content[language];

  return (
    <div className="min-h-screen">
      <SEO language={language} page="home" />
      
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-orange-500 to-orange-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Calculator className="w-16 h-16 mx-auto mb-6" />
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {t.hero.title}
            </h1>
            <p className="text-xl text-orange-100">
              {t.hero.subtitle}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Price Calculator */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <PriceCalculator language={language} />
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t.howItWorks.title}
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              {t.howItWorks.description}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {t.howItWorks.factors.map((factor, index) => {
              const Icon = factor.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className="bg-white rounded-xl p-6 shadow-lg"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon className="w-6 h-6 text-orange-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        {factor.title}
                      </h3>
                      <p className="text-gray-600">
                        {factor.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                {t.benefits.title}
              </h2>
            </div>

            <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-2xl p-8">
              <ul className="space-y-3">
                {t.benefits.points.map((point, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <Info className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-800">{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-orange-500 to-orange-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            {t.cta.title}
          </h2>
          <p className="text-xl text-orange-100 mb-8">
            {t.cta.description}
          </p>
          <Link to={createPageUrl("Contact")}>
            <Button size="lg" className="bg-white text-orange-600 hover:bg-gray-100 text-lg px-10 py-6">
              {t.cta.button}
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}