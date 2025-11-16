import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calculator, Clock, Calendar, Users, MapPin, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";

export default function PriceCalculator({ language = "en" }) {
  const [formData, setFormData] = useState({
    service: "",
    passengers: "",
    date: "",
    time: "",
    pickup: "",
    dropoff: ""
  });
  const [priceBreakdown, setPriceBreakdown] = useState(null);

  const content = {
    en: {
      title: "Get Instant Price Quote",
      subtitle: "See your price breakdown in real-time",
      service: "Service Type",
      passengers: "Number of Passengers",
      date: "Travel Date",
      time: "Departure Time",
      pickup: "Pickup Location",
      dropoff: "Dropoff Location",
      calculate: "Calculate Price",
      breakdown: "Price Breakdown",
      basePrice: "Base Price",
      peakTime: "Peak Time Surcharge",
      weekend: "Weekend Surcharge",
      distance: "Distance Fee",
      passengers_fee: "Additional Passengers",
      demand: "High Demand Adjustment",
      total: "Total Price",
      perPerson: "per person",
      services: {
        airport_zaventem: "Brussels Airport (Zaventem)",
        airport_charleroi: "Charleroi Airport",
        city_tour: "City Tour",
        corporate: "Corporate Event",
        private: "Private Transfer"
      }
    },
    fr: {
      title: "Obtenez un Devis Instantané",
      subtitle: "Voyez la répartition de votre prix en temps réel",
      service: "Type de Service",
      passengers: "Nombre de Passagers",
      date: "Date du Voyage",
      time: "Heure de Départ",
      pickup: "Lieu de Prise en Charge",
      dropoff: "Lieu de Dépose",
      calculate: "Calculer le Prix",
      breakdown: "Répartition du Prix",
      basePrice: "Prix de Base",
      peakTime: "Supplément Heures de Pointe",
      weekend: "Supplément Week-end",
      distance: "Frais de Distance",
      passengers_fee: "Passagers Supplémentaires",
      demand: "Ajustement Forte Demande",
      total: "Prix Total",
      perPerson: "par personne",
      services: {
        airport_zaventem: "Aéroport de Bruxelles (Zaventem)",
        airport_charleroi: "Aéroport de Charleroi",
        city_tour: "Visite Guidée",
        corporate: "Événement d'Entreprise",
        private: "Transfert Privé"
      }
    }
  };

  const t = content[language];

  const calculatePrice = () => {
    if (!formData.service || !formData.passengers || !formData.date || !formData.time) {
      return;
    }

    // Base prices by service type
    const basePrices = {
      airport_zaventem: 45,
      airport_charleroi: 65,
      city_tour: 80,
      corporate: 120,
      private: 100
    };

    const basePrice = basePrices[formData.service] || 50;
    let breakdown = {
      basePrice: basePrice,
      peakTime: 0,
      weekend: 0,
      distance: 0,
      passengers: 0,
      demand: 0
    };

    // Parse time and date
    const [hours] = formData.time.split(":").map(Number);
    const selectedDate = new Date(formData.date);
    const dayOfWeek = selectedDate.getDay();

    // Peak time surcharge (7-9 AM, 5-7 PM on weekdays)
    if ((hours >= 7 && hours < 9) || (hours >= 17 && hours < 19)) {
      if (dayOfWeek >= 1 && dayOfWeek <= 5) {
        breakdown.peakTime = basePrice * 0.2; // 20% surcharge
      }
    }

    // Weekend surcharge (Saturday & Sunday)
    if (dayOfWeek === 0 || dayOfWeek === 6) {
      breakdown.weekend = basePrice * 0.15; // 15% surcharge
    }

    // Distance estimate based on service
    if (formData.service === "airport_charleroi") {
      breakdown.distance = 25; // Farther airport
    } else if (formData.service === "city_tour") {
      breakdown.distance = 15;
    }

    // Additional passengers (beyond base of 4)
    const passengerCount = parseInt(formData.passengers);
    if (passengerCount > 4) {
      breakdown.passengers = (passengerCount - 4) * 5;
    }

    // Demand surge on specific dates (holidays, events)
    const today = new Date();
    const daysUntilTrip = Math.floor((selectedDate - today) / (1000 * 60 * 60 * 24));
    if (daysUntilTrip < 2) {
      breakdown.demand = basePrice * 0.25; // 25% last-minute booking fee
    }

    setPriceBreakdown(breakdown);
  };

  const totalPrice = priceBreakdown
    ? Object.values(priceBreakdown).reduce((sum, val) => sum + val, 0)
    : 0;

  const pricePerPerson = priceBreakdown && formData.passengers
    ? totalPrice / parseInt(formData.passengers)
    : 0;

  return (
    <div className="grid lg:grid-cols-2 gap-8">
      {/* Calculator Form */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <Card className="shadow-xl">
          <CardHeader className="bg-orange-500 text-white rounded-t-xl">
            <CardTitle className="flex items-center gap-2">
              <Calculator className="w-6 h-6" />
              {t.title}
            </CardTitle>
            <p className="text-orange-100 text-sm">{t.subtitle}</p>
          </CardHeader>
          <CardContent className="p-6 space-y-4">
            <div>
              <Label htmlFor="service">{t.service} *</Label>
              <Select
                value={formData.service}
                onValueChange={(value) => setFormData({ ...formData, service: value })}
              >
                <SelectTrigger className="mt-2">
                  <SelectValue placeholder={t.service} />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(t.services).map(([key, label]) => (
                    <SelectItem key={key} value={key}>
                      {label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="passengers">{t.passengers} *</Label>
              <div className="relative mt-2">
                <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  id="passengers"
                  type="number"
                  min="1"
                  max="60"
                  className="pl-10"
                  value={formData.passengers}
                  onChange={(e) => setFormData({ ...formData, passengers: e.target.value })}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="date">{t.date} *</Label>
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
                <Label htmlFor="time">{t.time} *</Label>
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
              <Label htmlFor="pickup">{t.pickup}</Label>
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
              <Label htmlFor="dropoff">{t.dropoff}</Label>
              <div className="relative mt-2">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  id="dropoff"
                  className="pl-10"
                  placeholder="e.g., Brussels Airport"
                  value={formData.dropoff}
                  onChange={(e) => setFormData({ ...formData, dropoff: e.target.value })}
                />
              </div>
            </div>

            <Button
              onClick={calculatePrice}
              className="w-full bg-orange-500 hover:bg-orange-600"
              size="lg"
            >
              <Calculator className="w-4 h-4 mr-2" />
              {t.calculate}
            </Button>
          </CardContent>
        </Card>
      </motion.div>

      {/* Price Breakdown */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <Card className="shadow-xl h-full">
          <CardHeader className="bg-gray-50 rounded-t-xl">
            <CardTitle className="flex items-center gap-2 text-gray-900">
              <TrendingUp className="w-6 h-6 text-orange-500" />
              {t.breakdown}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            {priceBreakdown ? (
              <div className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center pb-2 border-b">
                    <span className="text-gray-700">{t.basePrice}</span>
                    <span className="font-semibold">€{priceBreakdown.basePrice.toFixed(2)}</span>
                  </div>

                  {priceBreakdown.peakTime > 0 && (
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-600 flex items-center gap-2">
                        <Clock className="w-4 h-4 text-orange-500" />
                        {t.peakTime}
                      </span>
                      <span className="text-orange-600">+€{priceBreakdown.peakTime.toFixed(2)}</span>
                    </div>
                  )}

                  {priceBreakdown.weekend > 0 && (
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-600 flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-orange-500" />
                        {t.weekend}
                      </span>
                      <span className="text-orange-600">+€{priceBreakdown.weekend.toFixed(2)}</span>
                    </div>
                  )}

                  {priceBreakdown.distance > 0 && (
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-600 flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-orange-500" />
                        {t.distance}
                      </span>
                      <span className="text-orange-600">+€{priceBreakdown.distance.toFixed(2)}</span>
                    </div>
                  )}

                  {priceBreakdown.passengers > 0 && (
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-600 flex items-center gap-2">
                        <Users className="w-4 h-4 text-orange-500" />
                        {t.passengers_fee}
                      </span>
                      <span className="text-orange-600">+€{priceBreakdown.passengers.toFixed(2)}</span>
                    </div>
                  )}

                  {priceBreakdown.demand > 0 && (
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-600 flex items-center gap-2">
                        <TrendingUp className="w-4 h-4 text-red-500" />
                        {t.demand}
                      </span>
                      <span className="text-red-600">+€{priceBreakdown.demand.toFixed(2)}</span>
                    </div>
                  )}
                </div>

                <div className="pt-4 border-t-2 border-orange-500">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-lg font-bold text-gray-900">{t.total}</span>
                    <span className="text-3xl font-bold text-orange-600">€{totalPrice.toFixed(2)}</span>
                  </div>
                  {formData.passengers && (
                    <div className="text-right text-sm text-gray-600">
                      €{pricePerPerson.toFixed(2)} {t.perPerson}
                    </div>
                  )}
                </div>

                <div className="mt-6 p-4 bg-orange-50 rounded-lg">
                  <p className="text-sm text-gray-700">
                    {language === "en" 
                      ? "* Final price may vary based on actual route and conditions. This is an estimate."
                      : "* Le prix final peut varier selon l'itinéraire réel et les conditions. Ceci est une estimation."}
                  </p>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-gray-400">
                <Calculator className="w-16 h-16 mb-4" />
                <p className="text-center">
                  {language === "en"
                    ? "Fill out the form to see your price breakdown"
                    : "Remplissez le formulaire pour voir votre répartition de prix"}
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}