import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: {
          // Navbar Links
          "navbar_home": "Home",
          "navbar_results": "Results",
          "navbar_faq": "Help & FAQ",
          "navbar_polling": "Polling Stations",
          "navbar_timeline": "Election Timeline",
          
          // Hero Section
          "hero_title": "Voter Assist KTM",
          "hero_subtitle": "Your official portal for election updates and candidate info.",
          "live_ticker": "LIVE: Official 2026 Election Results Verified • Balendra Shah sworn in as PM",

          // FAQ Page Content
          "faq_title": "Frequently Asked Questions",
          "faq_q1": "Can I use my Nagarik App digital ID for official verification?",
          "faq_a1": "While the Nagarik App displays your digital Voter ID, the Election Commission currently recommends carrying your physical Citizenship Card or National ID.",
          "faq_q2": "How do I report an error in my voter details?",
          "faq_a2": "You can call the Election Commission's toll-free center at 1102 or use the Pre-enrollment feature in the Nagarik App.",
          "faq_footer_title": "Still have questions?",
          "faq_footer_subtitle": "Contact the Official Election Commission Hotline",

          // Buttons & Actions
          "chat_button": "Chat with Nagarik Bot",
          "call_button": "Call 1102",
          "voter_login": "Voter Login",
          "logout": "Logout",
          "signed_in_as": "Signed in as",

          // Footer
          "footer_text": "Developed by Kushal Karki & Amar Tamang",
          "gov_verified": "ELECTION COMMISSION VERIFIED",

          // UI General
          "language_label": "Language"
        }
      },
      ne: {
        translation: {
          // Navbar Links
          "navbar_home": "गृहपृष्ठ",
          "navbar_results": "नतिजा",
          "navbar_faq": "मद्दत र प्रश्नोत्तर",
          "navbar_polling": "मतदान केन्द्र",
          "navbar_timeline": "निर्वाचन कार्यतालिका",
          
          // Hero Section
          "hero_title": "भोटर असिस्ट काठमाडौं",
          "hero_subtitle": "निर्वाचन अपडेट र उम्मेदवार जानकारीको लागि आधिकारिक पोर्टल।",
          "live_ticker": "लाइभ: आधिकारिक २०२६ निर्वाचन परिणामहरू प्रमाणित • बालेन्द्र शाहले प्रधानमन्त्रीको रूपमा शपथ लिए",

          // FAQ Page Content
          "faq_title": "धेरै सोधिने प्रश्नहरू",
          "faq_q1": "के म आधिकारिक प्रमाणीकरणको लागि नागरिक एप डिजिटल आईडी प्रयोग गर्न सक्छु?",
          "faq_a1": "नागरिक एपले तपाईंको डिजिटल मतदाता परिचयपत्र देखाए तापनि, निर्वाचन आयोगले हाल तपाईंको भौतिक नागरिकता प्रमाणपत्र वा राष्ट्रिय परिचयपत्र बोक्न सिफारिस गर्दछ।",
          "faq_q2": "मेरो मतदाता विवरणमा भएको त्रुटि कसरी सच्याउने?",
          "faq_a2": "तपाईं निर्वाचन आयोगको टोल-फ्री कल सेन्टर ११०२ मा फोन गर्न सक्नुहुन्छ वा नागरिक एपमा रहेको 'प्रि-एनरोलमेन्ट' सुविधा प्रयोग गर्न सक्नुहुन्छ।",
          "faq_footer_title": "अझै प्रश्नहरू छन्?",
          "faq_footer_subtitle": "आधिकारिक निर्वाचन आयोग हटलाइनमा सम्पर्क गर्नुहोस्",

          // Buttons & Actions
          "chat_button": "नागरिक बटसँग कुरा गर्नुहोस्",
          "call_button": "११०२ मा कल गर्नुहोस्",
          "voter_login": "मतदाता लगइन",
          "logout": "लगआउट",
          "signed_in_as": "लगइन गरिएको",

          // Footer
          "footer_text": "कुशल कार्की र अमर तामाङ द्वारा विकसित",
          "gov_verified": "निर्वाचन आयोग प्रमाणित",

          // UI General
          "language_label": "भाषा"
        }
      }
    },
    fallbackLng: "en",
    debug: false,
    interpolation: {
      escapeValue: false 
    }
  });

export default i18n;