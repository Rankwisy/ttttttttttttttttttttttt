
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Button } from "@/components/ui/button";
import { 
  Bus, 
  Shield, 
  Clock, 
  Users, 
  Star,
  ArrowRight,
  Check,
  Plane,
  MapPin,
  Euro,
  ChevronDown
} from "lucide-react";
import { motion } from "framer-motion";
import SEO from "../components/SEO";
import TestimonialSection from "../components/testimonials/TestimonialSection";

export default function Home() {
  const [language, setLanguage] = useState("en");
  const [openFaq, setOpenFaq] = useState(null);

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
        tagline: "EFFORTLESS TRANSPORT",
        title: "Your Reliable Brussels Airport Shuttle Service",
        description: "Experience stress-free airport transfers with our safe, easy, and reliable shuttle service. Book your journey with us today!",
        cta: "Book Now"
      },
      stats: [
        { value: "9+", label: "Years Of Experience" },
        { value: "2500+", label: "Happy Customers" },
        { value: "98%", label: "Customer Satisfaction" }
      ],
      about: {
        tag: "ABOUT US",
        title: "Discover Our Commitment to Exceptional Shuttle Services",
        description: "At Brussels Airport Shuttle Service, we prioritize customer satisfaction, providing convenient, safe, and professional transfers that exceed your expectations."
      },
      services: {
        title: "Explore Our Comprehensive Airport Shuttle Offerings",
        items: [
          {
            icon: Plane,
            number: "01.",
            title: "Brussels Airport Express",
            description: "Fast and reliable transfers between Brussels city center and Brussels Airport (Zaventem). Professional drivers, comfortable vehicles, 24/7 service."
          },
          {
            icon: Bus,
            number: "02.",
            title: "Charleroi Airport Shuttle",
            description: "Direct shuttle service to Brussels South Charleroi Airport. Affordable rates, convenient schedules, and door-to-door service available."
          },
          {
            icon: MapPin,
            number: "03.",
            title: "Private Airport Transfers",
            description: "Exclusive private shuttle service for individuals and groups. Luxury vehicles, meet & greet service, luggage assistance included."
          }
        ]
      },
      whyChoose: {
        tag: "WHY CHOOSE US",
        title: "Unmatched Value for Your Airport Transfers",
        description: "We offer a unique blend of reliability, affordability, and professionalism, ensuring your travel experience is seamless and enjoyable.",
        points: [
          {
            icon: Clock,
            number: "01.",
            title: "Reliability",
            description: "Count on us for timely pickups and drop-offs, ensuring you never miss a flight or an important appointment."
          },
          {
            icon: Users,
            number: "02.",
            title: "Professional Drivers",
            description: "Our courteous and skilled drivers provide a safe and comfortable ride, so you can relax and focus on your journey."
          },
          {
            icon: Euro,
            number: "03.",
            title: "Affordable Pricing",
            description: "Enjoy competitive rates without compromising on quality, making travel economical while meeting all your transfer needs."
          }
        ]
      },
      destinations: {
        title: "Popular Destinations",
        items: [
          "Brussels Airport (Zaventem)",
          "Charleroi Airport",
          "NH Brussels Airport Hotel",
          "Crowne Plaza Brussels Airport",
          "Brussels City Center",
          "EU District"
        ]
      },
      faq: [
        {
          question: "How do I book a shuttle to Brussels Airport?",
          answer: "Booking is easy! Use our online booking form, call us directly, or send an email. We recommend booking at least 24 hours in advance for guaranteed availability."
        },
        {
          question: "Do you offer transfers to Charleroi Airport?",
          answer: "Yes! We provide regular shuttle services to both Brussels Airport (Zaventem) and Charleroi Airport. Both airports are covered by our professional service."
        },
        {
          question: "What is the cost for airport shuttle service?",
          answer: "Prices vary based on destination, group size, and service type. Contact us for a personalized quote. We offer competitive rates and group discounts."
        },
        {
          question: "Can I track my shuttle in real-time?",
          answer: "Yes, we provide real-time tracking for all our shuttles. You'll receive updates via SMS or email about your driver's location and estimated arrival time."
        }
      ],
      cta: {
        tag: "GET STARTED",
        title: "Book Your Airport Shuttle Today for a Hassle-Free Experience",
        description: "Join countless satisfied customers by choosing our shuttle service for your next journey. Book now and experience the difference!",
        button: "Book Now"
      }
    },
    fr: {
      hero: {
        tagline: "TRANSPORT SANS EFFORT",
        title: "Votre Service de Navette Fiable vers l'Aéroport de Bruxelles",
        description: "Vivez des transferts aéroport sans stress avec notre service de navette sûr, facile et fiable. Réservez votre voyage aujourd'hui !",
        cta: "Réserver"
      },
      stats: [
        { value: "9+", label: "Années d'Expérience" },
        { value: "2500+", label: "Clients Satisfaits" },
        { value: "98%", label: "Satisfaction Client" }
      ],
      about: {
        tag: "À PROPOS",
        title: "Découvrez Notre Engagement envers des Services de Navette Exceptionnels",
        description: "Chez Brussels Airport Shuttle Service, nous privilégions la satisfaction client, offrant des transferts pratiques, sûrs et professionnels qui dépassent vos attentes."
      },
      services: {
        title: "Explorez Nos Offres Complètes de Navette Aéroport",
        items: [
          {
            icon: Plane,
            number: "01.",
            title: "Brussels Airport Express",
            description: "Transferts rapides et fiables entre le centre de Bruxelles et l'aéroport de Bruxelles (Zaventem). Chauffeurs pros, véhicules confortables, service 24/7."
          },
          {
            icon: Bus,
            number: "02.",
            title: "Navette Aéroport Charleroi",
            description: "Service de navette direct vers l'aéroport de Bruxelles-Sud Charleroi. Tarifs abordables, horaires pratiques, service porte-à-porte disponible."
          },
          {
            icon: MapPin,
            number: "03.",
            title: "Transferts Privés Aéroport",
            description: "Service de navette privé exclusif pour particuliers et groupes. Véhicules de luxe, service d'accueil, assistance bagages incluse."
          }
        ]
      },
      whyChoose: {
        tag: "POURQUOI NOUS CHOISIR",
        title: "Valeur Inégalée pour Vos Transferts Aéroport",
        description: "Nous offrons un mélange unique de fiabilité, d'accessibilité et de professionnalisme, garantissant une expérience de voyage fluide et agréable.",
        points: [
          {
            icon: Clock,
            number: "01.",
            title: "Fiabilité",
            description: "Comptez sur nous pour des ramassages et déposes ponctuels, vous assurant de ne jamais manquer un vol ou un rendez-vous important."
          },
          {
            icon: Users,
            number: "02.",
            title: "Chauffeurs Professionnels",
            description: "Nos chauffeurs courtois et qualifiés offrent un trajet sûr et confortable, pour que vous puissiez vous détendre et vous concentrer sur votre voyage."
          },
          {
            icon: Euro,
            number: "03.",
            title: "Prix Abordables",
            description: "Profitez de tarifs compétitifs sans compromettre la qualité, rendant le voyage économique tout en répondant à tous vos besoins de transfert."
          }
        ]
      },
      destinations: {
        title: "Destinations Populaires",
        items: [
          "Aéroport de Bruxelles (Zaventem)",
          "Aéroport de Charleroi",
          "Hôtel NH Brussels Airport",
          "Crowne Plaza Brussels Airport",
          "Centre-Ville de Bruxelles",
          "Quartier Européen"
        ]
      },
      faq: [
        {
          question: "Comment réserver une navette vers l'aéroport de Bruxelles ?",
          answer: "La réservation est facile ! Utilisez notre formulaire en ligne, appelez-nous ou envoyez un email. Nous recommandons de réserver au moins 24h à l'avance."
        },
        {
          question: "Offrez-vous des transferts vers l'aéroport de Charleroi ?",
          answer: "Oui ! Nous assurons des navettes régulières vers l'aéroport de Bruxelles (Zaventem) et de Charleroi. Les deux aéroports sont couverts."
        },
        {
          question: "Quel est le coût du service de navette ?",
          answer: "Les prix varient selon la destination, la taille du groupe et le type de service. Contactez-nous pour un devis personnalisé. Remises de groupe disponibles."
        },
        {
          question: "Puis-je suivre ma navette en temps réel ?",
          answer: "Oui, nous fournissons un suivi en temps réel pour toutes nos navettes. Vous recevrez des mises à jour par SMS ou email sur la position du chauffeur."
        }
      ],
      cta: {
        tag: "COMMENCER",
        title: "Réservez Votre Navette Aéroport Aujourd'hui pour une Expérience Sans Tracas",
        description: "Rejoignez d'innombrables clients satisfaits en choisissant notre service de navette. Réservez maintenant !",
        button: "Réserver"
      }
    }
  };

  const t = content[language];

  return (
    <div className="min-h-screen">
      <SEO language={language} page="home" />
      
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=2069&auto=format"
            alt="Brussels Airport Shuttle"
            loading="eager"
            fetchpriority="high"
            className="w-full h-full object-cover"
            width="2069"
            height="1380"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900/95 to-gray-900/70" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-orange-400 font-semibold text-sm tracking-widest uppercase mb-4">
              {t.hero.tagline}
            </p>
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              {t.hero.title}
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-3xl mx-auto">
              {t.hero.description}
            </p>
            <Link to={createPageUrl("Contact")}>
              <Button size="lg" className="bg-orange-500 hover:bg-orange-600 text-white text-lg px-12 py-6 rounded-full shadow-2xl">
                {t.hero.cta}
              </Button>
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="mt-20 grid grid-cols-3 gap-8 max-w-3xl mx-auto"
          >
            {t.stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-orange-400 mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-300 text-sm md:text-base">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <img
                src="https://ik.imagekit.io/by733ltn6/elegant-sight-white-tourist-bus-mediterranean-coast-scale%20a%20bruxelles.png"
                alt="Brussels Airport Shuttle Vehicles"
                loading="lazy"
                className="rounded-2xl shadow-2xl"
                width="800"
                height="600"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <p className="text-orange-500 font-semibold text-sm tracking-widest uppercase mb-3">
                {t.about.tag}
              </p>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                {t.about.title}
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                {t.about.description}
              </p>
              <Link to={createPageUrl("About")}>
                <Button variant="outline" className="border-orange-500 text-orange-500 hover:bg-orange-50">
                  Read More <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-orange-500 font-semibold text-sm tracking-widest uppercase mb-3">
              OUR SERVICES
            </p>
            <h2 className="text-4xl font-bold text-gray-900">
              {t.services.title}
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {t.services.items.map((service, index) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all group"
                >
                  <div className="text-orange-500 font-bold text-lg mb-3">
                    {service.number}
                  </div>
                  <div className="w-14 h-14 bg-orange-100 rounded-xl flex items-center justify-center mb-6 group-hover:bg-orange-500 transition-colors">
                    <Icon className="w-7 h-7 text-orange-500 group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {service.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-orange-500 font-semibold text-sm tracking-widest uppercase mb-3">
              {t.whyChoose.tag}
            </p>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              {t.whyChoose.title}
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              {t.whyChoose.description}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {t.whyChoose.points.map((point, index) => {
              const Icon = point.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className="text-center"
                >
                  <div className="text-orange-500 font-bold text-lg mb-3">
                    {point.number}
                  </div>
                  <div className="w-16 h-16 bg-orange-100 rounded-xl flex items-center justify-center mx-auto mb-6">
                    <Icon className="w-8 h-8 text-orange-500" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {point.title}
                  </h3>
                  <p className="text-gray-600">
                    {point.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Destinations */}
      <section className="py-20 bg-orange-500 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold mb-8">
              {t.destinations.title}
            </h2>
            <div className="grid md:grid-cols-3 gap-4 max-w-4xl mx-auto">
              {t.destinations.items.map((destination, index) => (
                <div
                  key={index}
                  className="bg-white/10 backdrop-blur-sm rounded-lg px-6 py-4 font-medium"
                >
                  {destination}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <TestimonialSection language={language} />

      {/* FAQ */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900">
              {language === "en" ? "Frequently Asked Questions" : "Questions Fréquemment Posées"}
            </h2>
          </div>

          <div className="space-y-4">
            {t.faq.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="bg-gray-50 rounded-xl overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full px-6 py-5 flex justify-between items-center hover:bg-gray-100 transition-colors"
                >
                  <span className="font-semibold text-gray-900 text-left">
                    {item.question}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-orange-500 transition-transform ${
                      openFaq === index ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {openFaq === index && (
                  <div className="px-6 pb-5 text-gray-600">
                    {item.answer}
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-gradient-to-br from-gray-900 to-gray-800 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-orange-400 font-semibold text-sm tracking-widest uppercase mb-3">
              {t.cta.tag}
            </p>
            <h2 className="text-4xl font-bold mb-6">
              {t.cta.title}
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              {t.cta.description}
            </p>
            <Link to={createPageUrl("Contact")}>
              <Button size="lg" className="bg-orange-500 hover:bg-orange-600 text-white text-lg px-12 py-6 rounded-full shadow-2xl">
                {t.cta.button}
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
