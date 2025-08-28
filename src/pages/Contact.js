import React, { useState, useRef, useEffect, useContext } from 'react';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock, FaHeart, FaDonate, FaTimes } from 'react-icons/fa';
import emailjs from '@emailjs/browser';
import './Contact.css';
import { LanguageContext } from '../components/Header'; // adjust path if needed

const contactTranslations = {
  en: {
    heroTitle: "Get In Touch.",
    heroDesc: "We'd love to hear from you. Whether you want to volunteer, donate, or just learn more.",
    contactInfoTitle: "Our Contact Information",
    phone: "Phone",
    phone1: "+1 (555) 123-4567",
    phone2: "24/7 Helpline: +1 (555) 987-6543",
    email: "Email",
    email1: "info@charityhope.org",
    email2: "support@charityhope.org",
    address: "Address",
    address1: "123 Helping Hands Avenue",
    address2: "Hope City, HC 56789",
    officeHours: "Office Hours",
    office1: "Monday-Friday: 9am - 5pm",
    office2: "Weekends: 10am - 2pm",
    formTitle: "Send Us a Message",
    formDesc: "We'd love to hear from you. Fill out the form below, and our team will get back to you shortly.",
    name: "Your Name",
    emailLabel: "Email Address",
    subject: "Subject",
    message: "Your Message",
    sendBtn: "Send Message",
    volunteerTitle: "Volunteer With Us",
    volunteerDesc: "Join our team of dedicated volunteers and make a difference in your community. We have opportunities for all skill levels and time commitments.",
    volunteerList: [
      "Weekly volunteer shifts",
      "Special event volunteers",
      "Skilled professional volunteers",
      "Remote volunteering options"
    ],
    volunteerBtn: "Learn About Volunteering",
    findUs: "Find Us",
    supportTitle: "Support Our Cause",
    oneTime: "One-Time Donation",
    oneTimeDesc: "Make an immediate impact with a single contribution.",
    oneTimeBtn: "Donate Now",
    monthly: "Monthly Support",
    monthlyDesc: "Sustain our work with recurring monthly donations.",
    monthlyBtn: "Subscribe",
    donationModalTitleOne: "One-Time Donation",
    donationModalTitleMonthly: "Monthly Support",
    firstName: "First Name *",
    lastName: "Last Name *",
    mobile: "Mobile *",
    village: "Village/City *",
    emailField: "Email",
    amount: "Amount (₹) *",
    submitDonation: "Submit Donation",
    processing: "Processing...",
    thankYou: "Thank you for your donation! We will contact you shortly.",
    error: "There was an error submitting your donation. Please try again."
  },
  ar: {
    heroTitle: "تواصل معنا.",
    heroDesc: "يسعدنا التواصل معك. سواء كنت ترغب في التطوع أو التبرع أو معرفة المزيد.",
    contactInfoTitle: "معلومات الاتصال بنا",
    phone: "الهاتف",
    phone1: "+1 (555) 123-4567",
    phone2: "خط المساعدة 24/7: +1 (555) 987-6543",
    email: "البريد الإلكتروني",
    email1: "info@charityhope.org",
    email2: "support@charityhope.org",
    address: "العنوان",
    address1: "123 شارع الأيادي المساعدة",
    address2: "مدينة الأمل، HC 56789",
    officeHours: "ساعات العمل",
    office1: "الاثنين-الجمعة: 9 صباحًا - 5 مساءً",
    office2: "عطلات نهاية الأسبوع: 10 صباحًا - 2 مساءً",
    formTitle: "أرسل لنا رسالة",
    formDesc: "يسعدنا التواصل معك. يرجى ملء النموذج أدناه وسيتواصل معك فريقنا قريبًا.",
    name: "اسمك",
    emailLabel: "البريد الإلكتروني",
    subject: "الموضوع",
    message: "رسالتك",
    sendBtn: "إرسال الرسالة",
    volunteerTitle: "تطوع معنا",
    volunteerDesc: "انضم إلى فريق المتطوعين لدينا واصنع فرقًا في مجتمعك. لدينا فرص لجميع المهارات والالتزامات الزمنية.",
    volunteerList: [
      "مناوبات تطوعية أسبوعية",
      "متطوعو الفعاليات الخاصة",
      "متطوعون محترفون",
      "خيارات التطوع عن بعد"
    ],
    volunteerBtn: "تعرف على التطوع",
    findUs: "اعثر علينا",
    supportTitle: "ادعم قضيتنا",
    oneTime: "تبرع لمرة واحدة",
    oneTimeDesc: "أحدث تأثيرًا فوريًا بمساهمة واحدة.",
    oneTimeBtn: "تبرع الآن",
    monthly: "دعم شهري",
    monthlyDesc: "ادعم عملنا بتبرعات شهرية متكررة.",
    monthlyBtn: "اشترك",
    donationModalTitleOne: "تبرع لمرة واحدة",
    donationModalTitleMonthly: "دعم شهري",
    firstName: "الاسم الأول *",
    lastName: "اسم العائلة *",
    mobile: "الجوال *",
    village: "القرية/المدينة *",
    emailField: "البريد الإلكتروني",
    amount: "المبلغ (₹) *",
    submitDonation: "إرسال التبرع",
    processing: "جارٍ المعالجة...",
    thankYou: "شكرًا لتبرعك! سنتواصل معك قريبًا.",
    error: "حدث خطأ أثناء إرسال التبرع. يرجى المحاولة مرة أخرى."
  },
  he: {
    heroTitle: "צור קשר.",
    heroDesc: "נשמח לשמוע ממך. בין אם תרצה להתנדב, לתרום או ללמוד עוד.",
    contactInfoTitle: "פרטי יצירת קשר",
    phone: "טלפון",
    phone1: "+1 (555) 123-4567",
    phone2: "קו סיוע 24/7: +1 (555) 987-6543",
    email: "אימייל",
    email1: "info@charityhope.org",
    email2: "support@charityhope.org",
    address: "כתובת",
    address1: "123 רחוב הידיים העוזרות",
    address2: "עיר התקווה, HC 56789",
    officeHours: "שעות פעילות",
    office1: "שני-שישי: 9:00 - 17:00",
    office2: "סופי שבוע: 10:00 - 14:00",
    formTitle: "שלח לנו הודעה",
    formDesc: "נשמח לשמוע ממך. מלא את הטופס ונחזור אליך בהקדם.",
    name: "שמך",
    emailLabel: "כתובת אימייל",
    subject: "נושא",
    message: "הודעתך",
    sendBtn: "שלח הודעה",
    volunteerTitle: "התנדב איתנו",
    volunteerDesc: "הצטרף לצוות המתנדבים שלנו ועשה שינוי בקהילה שלך. יש לנו הזדמנויות לכל רמות הכישורים והזמנים.",
    volunteerList: [
      "משמרות התנדבות שבועיות",
      "מתנדבי אירועים מיוחדים",
      "מתנדבים מקצועיים",
      "אפשרויות התנדבות מרחוק"
    ],
    volunteerBtn: "מידע על התנדבות",
    findUs: "מצא אותנו",
    supportTitle: "תמוך במטרה שלנו",
    oneTime: "תרומה חד פעמית",
    oneTimeDesc: "השפעה מיידית בתרומה אחת.",
    oneTimeBtn: "תרום עכשיו",
    monthly: "תמיכה חודשית",
    monthlyDesc: "תמוך בעשייה שלנו בתרומות חודשיות.",
    monthlyBtn: "הירשם",
    donationModalTitleOne: "תרומה חד פעמית",
    donationModalTitleMonthly: "תמיכה חודשית",
    firstName: "שם פרטי *",
    lastName: "שם משפחה *",
    mobile: "נייד *",
    village: "יישוב/עיר *",
    emailField: "אימייל",
    amount: "סכום (₹) *",
    submitDonation: "שלח תרומה",
    processing: "מעבד...",
    thankYou: "תודה על תרומתך! ניצור איתך קשר בקרוב.",
    error: "אירעה שגיאה בשליחת התרומה. נסה שוב."
  }
};

const Contact = () => {
  const [showDonationForm, setShowDonationForm] = useState(false);
  const [donationType, setDonationType] = useState('');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    mobile: '',
    village: '',
    email: '',
    amount: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');
  const [theme, setTheme] = useState('light');
  const formRef = useRef();
  const { language } = useContext(LanguageContext);
  const t = contactTranslations[language] || contactTranslations.en;

  // Load theme preference from localStorage on component mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme') || 'light';
      setTheme(savedTheme);
    }
  }, []);

  // Listen for theme changes from Header component
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const handleThemeChange = () => {
        const newTheme = localStorage.getItem('theme') || 'light';
        setTheme(newTheme);
      };
      
      window.addEventListener('theme-changed', handleThemeChange);
      window.addEventListener('storage', handleThemeChange);
      
      return () => {
        window.removeEventListener('theme-changed', handleThemeChange);
        window.removeEventListener('storage', handleThemeChange);
      };
    }
  }, []);

  const handleDonateClick = (type) => {
    setDonationType(type);
    setShowDonationForm(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await emailjs.send(
        '',
        'YOUR_TEMPLATE_ID',
        {
          ...formData,
          donationType
        },
        'YOUR_PUBLIC_KEY'
      );

      setSubmitMessage(t.thankYou);
      setFormData({
        firstName: '',
        lastName: '',
        mobile: '',
        village: '',
        email: '',
        amount: ''
      });

      setTimeout(() => {
        setShowDonationForm(false);
        setSubmitMessage('');
      }, 3000);

    } catch (error) {
      setSubmitMessage(t.error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={`contact-page ${theme}`}>
      {/* Donation Modal */}
      {showDonationForm && (
        <div className="donation-modal">
          <div className="donation-modal-content">
            <button className="close-modal" onClick={() => setShowDonationForm(false)}>
              <FaTimes />
            </button>
            <h2>{donationType === 'one-time' ? t.donationModalTitleOne : t.donationModalTitleMonthly}</h2>
            {submitMessage ? (
              <div className="submit-message"><p>{submitMessage}</p></div>
            ) : (
              <form ref={formRef} className="donation-form" onSubmit={handleSubmit}>
                <div className="form-row">
                  <div className="form-group">
                    <label>{t.firstName}</label>
                    <input type="text" name="firstName" value={formData.firstName} onChange={handleInputChange} required />
                  </div>
                  <div className="form-group">
                    <label>{t.lastName}</label>
                    <input type="text" name="lastName" value={formData.lastName} onChange={handleInputChange} required />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>{t.mobile}</label>
                    <input type="tel" name="mobile" value={formData.mobile} onChange={handleInputChange} required />
                  </div>
                  <div className="form-group">
                    <label>{t.village}</label>
                    <input type="text" name="village" value={formData.village} onChange={handleInputChange} required />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>{t.emailField}</label>
                    <input type="email" name="email" value={formData.email} onChange={handleInputChange} />
                  </div>
                  <div className="form-group">
                    <label>{t.amount}</label>
                    <input type="number" name="amount" value={formData.amount} onChange={handleInputChange} required />
                  </div>
                </div>
                <button type="submit" className="submit-donation-btn" disabled={isSubmitting}>
                  {isSubmitting ? t.processing : t.submitDonation}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
      
      {/* Section 1: Hero Banner */} 
      <section className="hero"> 
        <video className="hero-video" src="/Images/contact.mp4" autoPlay loop muted playsInline /> 
        <div className="hero-overlay"> 
          <h1>{t.heroTitle}</h1> 
          <p>{t.heroDesc}</p> 
        </div> 
      </section> 
      
      {/* Section 2: Contact Information */} 
      <section className="contact-info-section"> 
        <div className="container"> 
          <h2>{t.contactInfoTitle}</h2> 
          <div className="info-grid"> 
            <div className="info-card"> 
              <FaPhone className="info-icon"/> 
              <h3>{t.phone}</h3> 
              <p>{t.phone1}</p> 
              <p>{t.phone2}</p> 
            </div> 
            <div className="info-card"> 
              <FaEnvelope className="info-icon" /> 
              <h3>{t.email}</h3> 
              <p>{t.email1}</p> 
              <p>{t.email2}</p> 
            </div> 
            <div className="info-card"> 
              <FaMapMarkerAlt className="info-icon" /> 
              <h3>{t.address}</h3> 
              <p>{t.address1}</p> 
              <p>{t.address2}</p> 
            </div> 
            <div className="info-card"> 
              <FaClock className="info-icon" /> 
              <h3>{t.officeHours}</h3> 
              <p>{t.office1}</p> 
              <p>{t.office2}</p> 
            </div> 
          </div> 
        </div> 
      </section> 
      
      {/* Section 3: Contact Form */} 
      <section className="contact-form-section"> 
        <div className="container"> 
          <div className="form-header"> 
            <h2>{t.formTitle}</h2> 
            <p>{t.formDesc}</p> 
          </div> 
          <form className="contact-form"> 
            <div className="form-row"> 
              <div className="form-group"> 
                <label htmlFor="name">{t.name}</label> 
                <input type="text" id="name" placeholder="John Doe" required /> 
              </div> 
              <div className="form-group"> 
                <label htmlFor="email">{t.emailLabel}</label> 
                <input type="email" id="email" placeholder="john@example.com" required /> 
              </div> 
            </div> 
            <div className="form-group"> 
              <label htmlFor="subject">{t.subject}</label> 
              <input type="text" id="subject" placeholder="How can we help?" required /> 
            </div> 
            <div className="form-group"> 
              <label htmlFor="message">{t.message}</label> 
              <textarea id="message" rows="6" placeholder="Type your message here..." required></textarea> 
            </div> 
            <button type="submit" className="submit-btn"> 
              {t.sendBtn} 
              <FaHeart className="btn-icon" /> 
            </button> 
          </form> 
        </div> 
      </section> 
      
      {/* Section 4: Volunteer Opportunities */} 
      <section className="volunteer-section"> 
        <div className="container"> 
          <h2>{t.volunteerTitle}</h2> 
          <div className="volunteer-content"> 
            <div className="volunteer-text"> 
              <p>{t.volunteerDesc}</p> 
              <ul> 
                {t.volunteerList.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul> 
              <button className="volunteer-btn">{t.volunteerBtn}</button> 
            </div> 
            <div className="volunteer-image"> 
              <img src="/Images/volunteer.jpg" alt="Volunteer with us" className="volunteer-img" /> 
            </div> 
          </div> 
        </div> 
      </section> 
      
      {/* Section 5: Map and Donation Options */} 
      <section className="map-donation-section"> 
        <div className="container"> 
          <div className="map-container"> 
            <h2>{t.findUs}</h2> 
            <div className="map-placeholder"> 
              <img src='/Images/map.jpg' alt="Map Location" className="map-image" /> 
            </div> 
          </div> 
          <div className="donation-container"> 
            <h2>{t.supportTitle}</h2> 
            <div className="donation-options"> 
              <div className="donation-card"> 
                <FaDonate className="donation-icon" /> 
                <h3>{t.oneTime}</h3> 
                <p>{t.oneTimeDesc}</p> 
                <button className="donate-btn" onClick={() => handleDonateClick('one-time')} > 
                  {t.oneTimeBtn} 
                </button> 
              </div> 
              <div className="donation-card"> 
                <FaDonate className="donation-icon" /> 
                <h3>{t.monthly}</h3> 
                <p>{t.monthlyDesc}</p> 
                <button className="donate-btn" onClick={() => handleDonateClick('monthly')} > 
                  {t.monthlyBtn} 
                </button> 
              </div> 
            </div> 
          </div> 
        </div> 
      </section>
    </div>
  );
};

export default Contact;