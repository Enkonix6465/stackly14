import { motion } from 'framer-motion';
import { FaBookOpen, FaUserGraduate, FaChalkboard } from 'react-icons/fa';
import './EducationProgram.css';
import { useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from 'react';
import { LanguageContext } from '../components/Header'; // Adjust path if needed

// const rtlLanguages = ["ar", "he"];

const EducationProgram = () => {
    const navigate = useNavigate();
    const handleGetStarted = (path) => {
      navigate(path);
    }
    
    const [theme, setTheme] = useState('light');
    
    // Load theme preference from localStorage on component mount
    useEffect(() => {
      if (typeof window !== 'undefined') {
        const savedTheme = localStorage.getItem('theme') || 'light';
        setTheme(savedTheme);

        // Apply theme class to body
        document.body.className = savedTheme;
      }
    }, []);
  
    // Listen for theme changes from Header component
    useEffect(() => {
      if (typeof window !== 'undefined') {
        const handleThemeChange = () => {
          const newTheme = localStorage.getItem('theme') || 'light';
          setTheme(newTheme);
          document.body.className = newTheme;
        };
        
        window.addEventListener('theme-changed', handleThemeChange);
        window.addEventListener('storage', handleThemeChange);
        
        return () => {
          window.removeEventListener('theme-changed', handleThemeChange);
          window.removeEventListener('storage', handleThemeChange);
        };
      }
    }, []);
    
    // Language context
    const { language } = useContext(LanguageContext);
    const t = educationTranslations[language] || educationTranslations['en'];

    // Animation variants
    const fadeIn = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.8 } }
    };

    const slideUp = {
        hidden: { y: 30, opacity: 0 },
        visible: { y: 0, opacity: 1, transition: { duration: 0.6 } }
    };

    const scaleUp = {
        hidden: { scale: 0.9, opacity: 0 },
        visible: { scale: 1, opacity: 1, transition: { duration: 0.5 } }
    };

    // RTL detection
    // const isRTL = rtlLanguages.includes(language);

    return (
        <div className={`education-program ${theme}`}>
            {/* Section 1: Diagonal Hero */}
            <motion.section
                className="diagonal-hero"
                style={{
                  backgroundImage: "url('/Images/edu-pro.jpg')",
                  backgroundSize: "cover", // <-- Add missing closing quote and comma
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat"
                }}
                initial="hidden"
                animate="visible"
                variants={fadeIn}
            >
                <div className="diagonal-bg"></div>
                <div className="hero-content">
                    <motion.p variants={slideUp} transition={{ delay: 0.2 }}>
                        {t.heroDesc}
                    </motion.p>
                    <motion.div variants={slideUp} transition={{ delay: 0.4 }}>
                        <button className="hero-cta" onClick={() => handleGetStarted("/services")}>{t.heroBtn}</button>
                    </motion.div>
                </div>
            </motion.section>

            {/* Section 2: Icon Cards */}
            <motion.section
                className="icon-cards-section"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={{
                    visible: { transition: { staggerChildren: 0.2 } }
                }}
            >
                <div className="container">
                    <motion.h2 variants={slideUp}>{t.coreProgramsTitle}</motion.h2>
                    <div className="cards-grid">
                        {t.programs.map((program, index) => (
                            <motion.div className="icon-card" variants={scaleUp} key={index}>
                                <div className="icon-wrapper">
                                    {program.icon}
                                </div>
                                <h3>{program.title}</h3>
                                <p>{program.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </motion.section>

            {/* Section 3: Zigzag Feature */}
            <section className="zigzag-feature">
                <div className="container">
                    <motion.div
                        className="feature-row"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={slideUp}
                    >
                        <div className="feature-text">
                            <h2>{t.digitalTitle}</h2>
                            <p>{t.digitalDesc}</p>
                            <ul>
                                {t.digitalList.map((item, index) => (
                                    <li key={index}>{item}</li>
                                ))}
                            </ul>
                        </div>
                        <div className="feature-image">
                            <img
                                src="/Images/digital-labs.jpg"
                                alt="Digital Learning Lab"
                                className="feature-img rectangular-img"
                            />
                        </div>
                    </motion.div>
                    <motion.div
                        className="feature-row reversed"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={slideUp}
                    >
                        <div className="feature-text">
                            <h2>{t.vocationalTitle}</h2>
                            <p>{t.vocationalDesc}</p>
                            <ul>
                                {t.vocationalList.map((item, index) => (
                                    <li key={index}>{item}</li>
                                ))}
                            </ul>
                        </div>
                        <div className="feature-image">
                            <img
                                src="/Images/vocational.jpg"
                                alt="Vocational Training"
                                className="feature-img rectangular-img"
                            />
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Section 4: Testimonials */}
            <section className="testimonials-section">
                <div className="container">
                    <motion.h2
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={slideUp}
                    >
                        {t.testimonialsTitle}
                    </motion.h2>
                    <div className="testimonial-cards">
                        <motion.div
                            className="testimonial-card"
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={{
                              hidden: { x: -50, opacity: 0 },
                              visible: { x: 0, opacity: 1, transition: { duration: 0.6 } }
                            }}
                        >
                            <div
                              className="testimonial-content"
                              style={{ color: theme === 'light' ? 'black' : 'white' }}
                            >
                                <p>"{t.testimonials[0].text}"</p>
                                <div className="author">{t.testimonials[0].author}</div>
                            </div>
                        </motion.div>
                        <motion.div
                            className="testimonial-card main-card"
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={scaleUp}
                        >
                            <div
                              className="testimonial-content"
                              style={{ color: theme === 'light' ? 'black' : 'white' }}
                            >
                                <p>"{t.testimonials[1].text}"</p>
                                <div className="author">{t.testimonials[1].author}</div>
                            </div>
                        </motion.div>
                        <motion.div
                            className="testimonial-card"
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={{
                              hidden: { x: 50, opacity: 0 },
                              visible: { x: 0, opacity: 1, transition: { duration: 0.6 } }
                            }}
                        >
                            <div
                              className="testimonial-content"
                              style={{ color: theme === 'light' ? 'black' : 'white' }}
                            >
                                <p>"{t.testimonials[2].text}"</p>
                                <div className="author">{t.testimonials[2].author}</div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Section 5: Animated CTA */}
            <section className="cta-section">
  <div className="container">
    <h2 className="cta-title">{t.ctaTitle}</h2>
    <p className="cta-desc">{t.ctaDesc}</p>
    <div className="cta-buttons">
      <button
        className="cta-btn primary"
        onClick={() => navigate("/contact")}
      >
        {t.donateBtn}
      </button>
      <button
        className="cta-btn secondary"
        onClick={() => navigate("/contact")}
      >
        {t.volunteerBtn}
      </button>
    </div>
  </div>
</section>

            {/* Your Custom Section */}
            <div
                className="your-section-class"
                style={{
                  backgroundColor:'black',
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat"
                }}
            >
                {/* Section content here */}
            </div>
        </div>
    );
};

export default EducationProgram;

const educationTranslations = {
  en: {
    heroTitle: "Education Empowerment",
    heroDesc: "Breaking barriers through innovative learning solutions",
    heroBtn: "Learn About Our Impact",
    coreProgramsTitle: "Our Core Programs",
    programs: [
      {
        icon: <FaBookOpen />,
        title: "Literacy Initiative",
        desc: "Adult and child literacy programs with proven results"
      },
      {
        icon: <FaUserGraduate />,
        title: "Scholarships",
        desc: "Supporting promising students through higher education"
      },
      {
        icon: <FaChalkboard />,
        title: "Teacher Training",
        desc: "Professional development for educators in underserved areas"
      }
    ],
    digitalTitle: "Digital Learning Labs",
    digitalDesc: "We've established 25 tech-enabled learning centers across rural communities, providing access to computers, internet, and digital literacy training.",
    digitalList: [
      "Interactive learning software",
      "Remote classroom capabilities",
      "After-hours access for adults"
    ],
    vocationalTitle: "Vocational Pathways",
    vocationalDesc: "Our career-focused programs equip students with marketable skills for immediate employment opportunities.",
    vocationalList: [
      "Certified technical training",
      "Apprenticeship placements",
      "Entrepreneurship workshops"
    ],
    testimonialsTitle: "Success Stories",
    testimonials: [
      {
        text: "This program gave me the skills to start my own business and support my family.",
        author: "- Jamal, Age 24"
      },
      {
        text: "After learning to read at 42, I can now help my grandchildren with their homework. This changed our whole family.",
        author: "- Maria, Adult Literacy Graduate"
      },
      {
        text: "The vocational training led directly to my first full-time job with benefits.",
        author: "- Aisha, Age 19"
      }
    ],
    ctaTitle: "Ready to Make an Impact?",
    ctaDesc: "Join us in transforming lives through education",
    donateBtn: "Donate Now",
    volunteerBtn: "Volunteer"
  },
  ar: {
    heroTitle: "تمكين التعليم",
    heroDesc: "كسر الحواجز من خلال حلول التعلم المبتكرة",
    heroBtn: "تعرف على تأثيرنا",
    coreProgramsTitle: "برامجنا الأساسية",
    programs: [
      {
        icon: <FaBookOpen />,
        title: "مبادرة محو الأمية",
        desc: "برامج محو الأمية للكبار والأطفال بنتائج مثبتة"
      },
      {
        icon: <FaUserGraduate />,
        title: "المنح الدراسية",
        desc: "دعم الطلاب الواعدين في التعليم العالي"
      },
      {
        icon: <FaChalkboard />,
        title: "تدريب المعلمين",
        desc: "تطوير مهني للمعلمين في المناطق المحرومة"
      }
    ],
    digitalTitle: "مختبرات التعلم الرقمية",
    digitalDesc: "أنشأنا 25 مركز تعلم مزود بالتقنية في المجتمعات الريفية، يوفر الوصول إلى الحواسيب والإنترنت وتدريب على المهارات الرقمية.",
    digitalList: [
      "برمجيات تعليمية تفاعلية",
      "قدرات الفصول الدراسية عن بعد",
      "إتاحة بعد ساعات العمل للكبار"
    ],
    vocationalTitle: "مسارات التدريب المهني",
    vocationalDesc: "برامجنا المهنية تجهز الطلاب بمهارات سوق العمل لفرص التوظيف الفوري.",
    vocationalList: [
      "تدريب تقني معتمد",
      "تدريبات مهنية",
      "ورش ريادة الأعمال"
    ],
    testimonialsTitle: "قصص النجاح",
    testimonials: [
      {
        text: "هذا البرنامج منحني المهارات لبدء عملي الخاص ودعم أسرتي.",
        author: "- جمال، 24 سنة"
      },
      {
        text: "بعد أن تعلمت القراءة في سن 42، أستطيع الآن مساعدة أحفادي في واجباتهم. هذا غيّر عائلتنا بالكامل.",
        author: "- ماريا، خريجة محو الأمية للكبار"
      },
      {
        text: "التدريب المهني قادني مباشرة إلى أول وظيفة بدوام كامل مع مزايا.",
        author: "- عائشة، 19 سنة"
      }
    ],
    ctaTitle: "جاهز لصنع تأثير؟",
    ctaDesc: "انضم إلينا في تغيير الحياة من خلال التعليم",
    donateBtn: "تبرع الآن",
    volunteerBtn: "تطوع"
  },
  he: {
    heroTitle: "העצמת חינוך",
    heroDesc: "שוברים מחסומים באמצעות פתרונות לימוד חדשניים",
    heroBtn: "למד על ההשפעה שלנו",
    coreProgramsTitle: "התוכניות המרכזיות שלנו",
    programs: [
      {
        icon: <FaBookOpen />,
        title: "יוזמת אוריינות",
        desc: "תוכניות אוריינות לילדים ומבוגרים עם תוצאות מוכחות"
      },
      {
        icon: <FaUserGraduate />,
        title: "מלגות לימודים",
        desc: "תמיכה בסטודנטים מצטיינים להשכלה גבוהה"
      },
      {
        icon: <FaChalkboard />,
        title: "הכשרת מורים",
        desc: "פיתוח מקצועי למורים באזורים מוחלשים"
      }
    ],
    digitalTitle: "מעבדות לימוד דיגיטליות",
    digitalDesc: "הקמנו 25 מרכזי לימוד טכנולוגיים בקהילות כפריות, עם גישה למחשבים, אינטרנט והכשרה דיגיטלית.",
    digitalList: [
      "תוכנה לימודית אינטראקטיבית",
      "יכולות כיתה מרחוק",
      "גישה למבוגרים בשעות הערב"
    ],
    vocationalTitle: "מסלולי הכשרה מקצועית",
    vocationalDesc: "התוכניות המקצועיות שלנו מעניקות לתלמידים מיומנויות לשוק העבודה ולמשרות מיידיות.",
    vocationalList: [
      "הכשרה טכנית מוסמכת",
      "השמות התמחות",
      "סדנאות יזמות"
    ],
    testimonialsTitle: "סיפורי הצלחה",
    testimonials: [
      {
        text: "התוכנית נתנה לי את הכלים לפתוח עסק ולפרנס את משפחתי.",
        author: "- ג'מאל, בן 24"
      },
      {
        text: "אחרי שלמדתי לקרוא בגיל 42, אני יכולה לעזור לנכדים עם שיעורי הבית. זה שינה את כל המשפחה.",
        author: "- מריה, בוגרת אוריינות למבוגרים"
      },
      {
        text: "ההכשרה המקצועית הובילה אותי ישירות לעבודה הראשונה שלי במשרה מלאה עם הטבות.",
        author: "- עאישה, בת 19"
      }
    ],
    ctaTitle: "מוכן להשפיע?",
    ctaDesc: "הצטרף אלינו לשינוי חיים באמצעות חינוך",
    donateBtn: "תרום עכשיו",
    volunteerBtn: "התנדב"
  }
};