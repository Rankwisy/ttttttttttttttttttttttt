import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Star, Send, CheckCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { base44 } from "@/api/base44Client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export default function ReviewSubmissionForm({ language = "en" }) {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    customer_name: "",
    customer_location: "",
    service_type: "",
    quote_en: "",
    quote_fr: ""
  });

  const queryClient = useQueryClient();

  const content = {
    en: {
      title: "Share Your Experience",
      subtitle: "Help others by sharing your experience with our service",
      name: "Your Name",
      location: "Your Location",
      service: "Service Used",
      rating: "Your Rating",
      review_en: "Your Review (English)",
      review_fr: "Your Review (French - Optional)",
      submit: "Submit Review",
      submitting: "Submitting...",
      success: "Thank you for your review!",
      successMsg: "Your review has been submitted and will be published after verification.",
      required: "Required fields",
      services: {
        "Airport Transfer": "Airport Transfer",
        "Corporate Event": "Corporate Event",
        "Wedding": "Wedding",
        "City Tour": "City Tour",
        "School Trip": "School Trip",
        "Other": "Other"
      }
    },
    fr: {
      title: "Partagez Votre Expérience",
      subtitle: "Aidez les autres en partageant votre expérience avec notre service",
      name: "Votre Nom",
      location: "Votre Localisation",
      service: "Service Utilisé",
      rating: "Votre Évaluation",
      review_en: "Votre Avis (Anglais - Optionnel)",
      review_fr: "Votre Avis (Français)",
      submit: "Soumettre l'Avis",
      submitting: "Envoi en cours...",
      success: "Merci pour votre avis!",
      successMsg: "Votre avis a été soumis et sera publié après vérification.",
      required: "Champs obligatoires",
      services: {
        "Airport Transfer": "Transfert Aéroport",
        "Corporate Event": "Événement d'Entreprise",
        "Wedding": "Mariage",
        "City Tour": "Visite Guidée",
        "School Trip": "Sortie Scolaire",
        "Other": "Autre"
      }
    }
  };

  const t = content[language];

  const createReviewMutation = useMutation({
    mutationFn: async (reviewData) => {
      return await base44.entities.Testimonial.create(reviewData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['testimonials'] });
      setSubmitted(true);
      toast.success(t.success);
      setTimeout(() => {
        setSubmitted(false);
        setFormData({
          customer_name: "",
          customer_location: "",
          service_type: "",
          quote_en: "",
          quote_fr: ""
        });
        setRating(0);
      }, 3000);
    },
    onError: (error) => {
      toast.error(language === "en" ? "Failed to submit review" : "Échec de la soumission");
    }
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.customer_name || !formData.customer_location || !formData.service_type || !rating) {
      toast.error(language === "en" ? "Please fill all required fields" : "Veuillez remplir tous les champs obligatoires");
      return;
    }

    const primaryReview = language === "en" ? formData.quote_en : formData.quote_fr;
    if (!primaryReview) {
      toast.error(language === "en" ? "Please write your review" : "Veuillez écrire votre avis");
      return;
    }

    const reviewData = {
      customer_name: formData.customer_name,
      customer_location: formData.customer_location,
      service_type: formData.service_type,
      rating: rating,
      quote_en: formData.quote_en || formData.quote_fr,
      quote_fr: formData.quote_fr || formData.quote_en,
      date: new Date().toISOString().split('T')[0],
      verified: true,
      featured: false
    };

    createReviewMutation.mutate(reviewData);
  };

  return (
    <Card className="shadow-xl">
      <CardHeader className="bg-orange-500 text-white">
        <CardTitle className="flex items-center gap-2">
          <Star className="w-6 h-6" />
          {t.title}
        </CardTitle>
        <p className="text-orange-100 text-sm">{t.subtitle}</p>
      </CardHeader>
      <CardContent className="p-6">
        <AnimatePresence mode="wait">
          {submitted ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="text-center py-12"
            >
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 mb-2">{t.success}</h3>
              <p className="text-gray-600">{t.successMsg}</p>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onSubmit={handleSubmit}
              className="space-y-4"
            >
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">{t.name} *</Label>
                  <Input
                    id="name"
                    value={formData.customer_name}
                    onChange={(e) => setFormData({ ...formData, customer_name: e.target.value })}
                    className="mt-2"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="location">{t.location} *</Label>
                  <Input
                    id="location"
                    value={formData.customer_location}
                    onChange={(e) => setFormData({ ...formData, customer_location: e.target.value })}
                    placeholder="e.g., Brussels"
                    className="mt-2"
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="service">{t.service} *</Label>
                <Select
                  value={formData.service_type}
                  onValueChange={(value) => setFormData({ ...formData, service_type: value })}
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
                <Label>{t.rating} *</Label>
                <div className="flex gap-2 mt-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      onMouseEnter={() => setHoveredRating(star)}
                      onMouseLeave={() => setHoveredRating(0)}
                      className="transition-transform hover:scale-110"
                    >
                      <Star
                        className={`w-8 h-8 ${
                          star <= (hoveredRating || rating)
                            ? "fill-orange-500 text-orange-500"
                            : "text-gray-300"
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <Label htmlFor="review_en">
                  {t.review_en} {language === "en" ? "*" : ""}
                </Label>
                <Textarea
                  id="review_en"
                  value={formData.quote_en}
                  onChange={(e) => setFormData({ ...formData, quote_en: e.target.value })}
                  placeholder={language === "en" ? "Share your experience..." : "Optional English version..."}
                  className="mt-2 h-24"
                  required={language === "en"}
                />
              </div>

              <div>
                <Label htmlFor="review_fr">
                  {t.review_fr} {language === "fr" ? "*" : ""}
                </Label>
                <Textarea
                  id="review_fr"
                  value={formData.quote_fr}
                  onChange={(e) => setFormData({ ...formData, quote_fr: e.target.value })}
                  placeholder={language === "fr" ? "Partagez votre expérience..." : "Optional French version..."}
                  className="mt-2 h-24"
                  required={language === "fr"}
                />
              </div>

              <Button
                type="submit"
                size="lg"
                disabled={createReviewMutation.isPending}
                className="w-full bg-orange-500 hover:bg-orange-600"
              >
                {createReviewMutation.isPending ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                    {t.submitting}
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 mr-2" />
                    {t.submit}
                  </>
                )}
              </Button>

              <p className="text-xs text-gray-500 text-center">
                * {t.required}
              </p>
            </motion.form>
          )}
        </AnimatePresence>
      </CardContent>
    </Card>
  );
}