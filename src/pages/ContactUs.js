import React, { useContext } from "react";
import { LanguageContext } from "./LanguageContext";

const rtlLanguages = ["ar", "he"];

const translations = {
  en: {
    title: "Contact Us",
    subtitle: "We'd love to hear from you!",
    address: "123 Charity Lane, City, Country",
    phone: "+1 234 567 890",
    email: "info@charity.org",
    formTitle: "Send Us a Message",
    name: "Your Name",
    emailLabel: "Your Email",
    message: "Your Message",
    submit: "Send Message",
  },
  ar: {
    title: "اتصل بنا",
    subtitle: "يسعدنا التواصل معك!",
    address: "123 شارع الخير، المدينة، البلد",
    phone: "+1 234 567 890",
    email: "info@charity.org",
    formTitle: "أرسل لنا رسالة",
    name: "اسمك",
    emailLabel: "بريدك الإلكتروني",
    message: "رسالتك",
    submit: "إرسال الرسالة",
  },
  he: {
    title: "צור קשר",
    subtitle: "נשמח לשמוע ממך!",
    address: "123 רחוב צדקה, עיר, מדינה",
    phone: "+1 234 567 890",
    email: "info@charity.org",
    formTitle: "שלח לנו הודעה",
    name: "השם שלך",
    emailLabel: "האימייל שלך",
    message: "ההודעה שלך",
    submit: "שלח הודעה",
  },
};

const ContactUs = () => {
  const { language } = useContext(LanguageContext);
  const isRTL = rtlLanguages.includes(language);
  const t = translations[language] || translations.en;

  return (
    <div
      style={{
        direction: isRTL ? "rtl" : "ltr",
        textAlign: isRTL ? "right" : "left",
        maxWidth: 600,
        margin: "2rem auto",
        padding: "1rem",
        background: "#fff",
        borderRadius: "12px",
        boxShadow: "0 2px 12px rgba(0,0,0,0.07)",
      }}
    >
      <h1>{t.title}</h1>
      <p>{t.subtitle}</p>
      <div style={{ marginBottom: "1.5rem" }}>
        <div>
          <strong>{t.address}</strong>
        </div>
        <div>{t.phone}</div>
        <div>
          <a href={`mailto:${t.email}`}>{t.email}</a>
        </div>
      </div>
      <h2 style={{ marginTop: "2rem" }}>{t.formTitle}</h2>
      <form>
        <div style={{ marginBottom: "1rem" }}>
          <label>
            {t.name}
            <input
              type="text"
              name="name"
              style={{
                width: "100%",
                padding: "0.5rem",
                marginTop: "0.25rem",
              }}
            />
          </label>
        </div>
        <div style={{ marginBottom: "1rem" }}>
          <label>
            {t.emailLabel}
            <input
              type="email"
              name="email"
              style={{
                width: "100%",
                padding: "0.5rem",
                marginTop: "0.25rem",
              }}
            />
          </label>
        </div>
        <div style={{ marginBottom: "1rem" }}>
          <label>
            {t.message}
            <textarea
              name="message"
              rows={4}
              style={{
                width: "100%",
                padding: "0.5rem",
                marginTop: "0.25rem",
              }}
            />
          </label>
        </div>
        <button
          type="submit"
          style={{
            padding: "0.75rem 2rem",
            background: "#00CAE0",
            color: "#fff",
            border: "none",
            borderRadius: "6px",
            fontWeight: "bold",
          }}
        >
          {t.submit}
        </button>
      </form>
    </div>
  );
};

export default ContactUs;