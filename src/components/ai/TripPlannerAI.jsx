import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Sparkles, MapPin, Users, Calendar, Clock, Bus, Lightbulb, Route, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { base44 } from "@/api/base44Client";
import { toast } from "sonner";

export default function TripPlannerAI({ language = "en" }) {
  const [formData, setFormData] = useState({
    destination: "",
    pickup: "",
    date: "",
    time: "",
    passengers: "",
    tripType: ""
  });
  const [aiSuggestions, setAiSuggestions] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const content = {
    en: {
      title: "AI Trip Planning Assistant",
      subtitle: "Get intelligent recommendations for your journey",
      destination: "Destination",
      pickup: "Pickup Location",
      date: "Travel Date",
      time: "Departure Time",
      passengers: "Number of Passengers",
      tripType: "Trip Type",
      tripTypes: {
        airport: "Airport Transfer",
        city_tour: "City Tour",
        corporate: "Corporate Event",
        wedding: "Wedding",
        custom: "Custom Trip"
      },
      getPlan: "Get AI Recommendations",
      loading: "Planning your trip...",
      results: {
        route: "Optimal Route",
        vehicle: "Recommended Vehicle",
        schedule: "Suggested Schedule",
        tips: "Travel Tips",
        duration: "Estimated Duration",
        distance: "Estimated Distance"
      }
    },
    fr: {
      title: "Assistant de Planification IA",
      subtitle: "Obtenez des recommandations intelligentes pour votre voyage",
      destination: "Destination",
      pickup: "Lieu de Prise en Charge",
      date: "Date du Voyage",
      time: "Heure de Départ",
      passengers: "Nombre de Passagers",
      tripType: "Type de Voyage",
      tripTypes: {
        airport: "Transfert Aéroport",
        city_tour: "Visite Guidée",
        corporate: "Événement d'Entreprise",
        wedding: "Mariage",
        custom: "Voyage Personnalisé"
      },
      getPlan: "Obtenir des Recommandations IA",
      loading: "Planification de votre voyage...",
      results: {
        route: "Itinéraire Optimal",
        vehicle: "Véhicule Recommandé",
        schedule: "Horaire Suggéré",
        tips: "Conseils de Voyage",
        duration: "Durée Estimée",
        distance: "Distance Estimée"
      }
    }
  };

  const t = content[language];

  const handleGetPlan = async () => {
    if (!formData.destination || !formData.pickup || !formData.passengers) {
      toast.error(language === "en" ? "Please fill in all required fields" : "Veuillez remplir tous les champs obligatoires");
      return;
    }

    setIsLoading(true);

    try {
      const prompt = `You are an expert trip planning assistant for a Brussels shuttle and bus rental service.

User Trip Details:
- Pickup: ${formData.pickup}
- Destination: ${formData.destination}
- Date: ${formData.date || "Not specified"}
- Time: ${formData.time || "Not specified"}
- Passengers: ${formData.passengers}
- Trip Type: ${formData.tripType || "General transport"}

Please provide comprehensive trip planning recommendations including:
1. Optimal route with key waypoints and traffic considerations
2. Recommended vehicle type based on passenger count and trip purpose (options: Luxury Minibus 9-16 seats, Midi Coach 17-35 seats, Luxury Coach 36-60 seats, VIP Executive Coach 20-30 seats)
3. Suggested schedule with departure time, stops, and arrival time
4. Estimated duration and distance
5. Local travel tips and information about the destination
6. Best time to travel considering traffic patterns in Brussels

Respond in ${language === "en" ? "English" : "French"}.`;

      const response = await base44.integrations.Core.InvokeLLM({
        prompt: prompt,
        add_context_from_internet: true,
        response_json_schema: {
          type: "object",
          properties: {
            route: {
              type: "object",
              properties: {
                waypoints: { type: "array", items: { type: "string" } },
                description: { type: "string" },
                traffic_notes: { type: "string" }
              }
            },
            vehicle_recommendation: {
              type: "object",
              properties: {
                vehicle_type: { type: "string" },
                reason: { type: "string" },
                features: { type: "array", items: { type: "string" } }
              }
            },
            schedule: {
              type: "object",
              properties: {
                departure: { type: "string" },
                stops: { type: "array", items: { type: "string" } },
                arrival: { type: "string" }
              }
            },
            estimates: {
              type: "object",
              properties: {
                duration: { type: "string" },
                distance: { type: "string" }
              }
            },
            travel_tips: {
              type: "array",
              items: { type: "string" }
            },
            local_info: {
              type: "string"
            }
          }
        }
      });

      setAiSuggestions(response);
    } catch (error) {
      toast.error(language === "en" ? "Failed to generate recommendations" : "Échec de la génération des recommandations");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="grid lg:grid-cols-2 gap-8">
      {/* Input Form */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="shadow-xl">
          <CardHeader className="bg-gradient-to-r from-purple-500 to-orange-500 text-white rounded-t-xl">
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="w-6 h-6" />
              {t.title}
            </CardTitle>
            <p className="text-purple-100 text-sm">{t.subtitle}</p>
          </CardHeader>
          <CardContent className="p-6 space-y-4">
            <div>
              <Label htmlFor="pickup">{t.pickup} *</Label>
              <div className="relative mt-2">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  id="pickup"
                  className="pl-10"
                  placeholder="e.g., Brussels Central Station"
                  value={formData.pickup}
                  onChange={(e) => setFormData({ ...formData, pickup: e.target.value })}
                />
              </div>
            </div>

            <div>
              <Label htmlFor="destination">{t.destination} *</Label>
              <div className="relative mt-2">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  id="destination"
                  className="pl-10"
                  placeholder="e.g., Brussels Airport"
                  value={formData.destination}
                  onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="date">{t.date}</Label>
                <div className="relative mt-2">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                  <Input
                    id="date"
                    type="date"
                    className="pl-10"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="time">{t.time}</Label>
                <div className="relative mt-2">
                  <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                  <Input
                    id="time"
                    type="time"
                    className="pl-10"
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                  />
                </div>
              </div>
            </div>

            <div>
              <Label htmlFor="passengers">{t.passengers} *</Label>
              <div className="relative mt-2">
                <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  id="passengers"
                  type="number"
                  min="1"
                  className="pl-10"
                  value={formData.passengers}
                  onChange={(e) => setFormData({ ...formData, passengers: e.target.value })}
                />
              </div>
            </div>

            <div>
              <Label htmlFor="tripType">{t.tripType}</Label>
              <select
                id="tripType"
                className="w-full mt-2 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                value={formData.tripType}
                onChange={(e) => setFormData({ ...formData, tripType: e.target.value })}
              >
                <option value="">{language === "en" ? "Select..." : "Sélectionner..."}</option>
                {Object.entries(t.tripTypes).map(([key, label]) => (
                  <option key={key} value={label}>{label}</option>
                ))}
              </select>
            </div>

            <Button
              onClick={handleGetPlan}
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-purple-500 to-orange-500 hover:from-purple-600 hover:to-orange-600"
              size="lg"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                  {t.loading}
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 mr-2" />
                  {t.getPlan}
                </>
              )}
            </Button>
          </CardContent>
        </Card>
      </motion.div>

      {/* AI Results */}
      <AnimatePresence mode="wait">
        {aiSuggestions ? (
          <motion.div
            key="results"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.5 }}
            className="space-y-4"
          >
            {/* Route Card */}
            <Card className="shadow-lg">
              <CardHeader className="bg-purple-50">
                <CardTitle className="flex items-center gap-2 text-purple-900">
                  <Route className="w-5 h-5 text-purple-600" />
                  {t.results.route}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <p className="text-gray-700 mb-3">{aiSuggestions.route?.description}</p>
                <div className="space-y-2">
                  {aiSuggestions.route?.waypoints?.map((waypoint, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-sm">
                      <ArrowRight className="w-4 h-4 text-purple-500" />
                      <span>{waypoint}</span>
                    </div>
                  ))}
                </div>
                {aiSuggestions.route?.traffic_notes && (
                  <div className="mt-3 p-3 bg-amber-50 rounded-lg text-sm text-amber-900">
                    <strong>Traffic:</strong> {aiSuggestions.route.traffic_notes}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Vehicle Recommendation */}
            <Card className="shadow-lg">
              <CardHeader className="bg-orange-50">
                <CardTitle className="flex items-center gap-2 text-orange-900">
                  <Bus className="w-5 h-5 text-orange-600" />
                  {t.results.vehicle}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <h4 className="font-bold text-lg text-gray-900 mb-2">
                  {aiSuggestions.vehicle_recommendation?.vehicle_type}
                </h4>
                <p className="text-gray-700 mb-3">{aiSuggestions.vehicle_recommendation?.reason}</p>
                <ul className="space-y-1">
                  {aiSuggestions.vehicle_recommendation?.features?.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-sm text-gray-600">
                      <div className="w-1.5 h-1.5 bg-orange-500 rounded-full" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Schedule & Estimates */}
            <Card className="shadow-lg">
              <CardHeader className="bg-blue-50">
                <CardTitle className="flex items-center gap-2 text-blue-900">
                  <Clock className="w-5 h-5 text-blue-600" />
                  {t.results.schedule}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 space-y-3">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-sm text-gray-600">{t.results.duration}</span>
                    <p className="font-semibold text-gray-900">{aiSuggestions.estimates?.duration}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">{t.results.distance}</span>
                    <p className="font-semibold text-gray-900">{aiSuggestions.estimates?.distance}</p>
                  </div>
                </div>
                {aiSuggestions.schedule?.departure && (
                  <div className="pt-3 border-t">
                    <p className="text-sm"><strong>Departure:</strong> {aiSuggestions.schedule.departure}</p>
                    <p className="text-sm"><strong>Arrival:</strong> {aiSuggestions.schedule.arrival}</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Travel Tips */}
            <Card className="shadow-lg">
              <CardHeader className="bg-green-50">
                <CardTitle className="flex items-center gap-2 text-green-900">
                  <Lightbulb className="w-5 h-5 text-green-600" />
                  {t.results.tips}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <ul className="space-y-2">
                  {aiSuggestions.travel_tips?.map((tip, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                      <Lightbulb className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                      {tip}
                    </li>
                  ))}
                </ul>
                {aiSuggestions.local_info && (
                  <div className="mt-4 p-3 bg-green-50 rounded-lg text-sm text-gray-700">
                    {aiSuggestions.local_info}
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        ) : (
          <motion.div
            key="placeholder"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center justify-center h-full"
          >
            <div className="text-center text-gray-400">
              <Sparkles className="w-16 h-16 mx-auto mb-4" />
              <p>
                {language === "en" 
                  ? "Fill out the form to get AI-powered trip recommendations"
                  : "Remplissez le formulaire pour obtenir des recommandations de voyage IA"}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}