import { useContext, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import './HealthcareInitiative.css'
import { LanguageContext } from '../components/Header'; // adjust path if needed

const healthcareTranslations = {
  en: {
    heroTitle: "Healthcare for All",
    heroSubtitle: "Join our mission to bring quality medical care to underserved communities. Every donation helps save lives and build healthier futures.",
    promoTitle: "Healing Hands for Those in Need Your Help Saves Lives!",
    promoDesc: "Every day, countless individuals suffer without access to basic medical care… But you can change that. Every day, vulnerable individuals—children left untreated, elders enduring unbearable pain, families struggling in silence—are denied access to basic medical care. But together, we can change that narrative. Your support ignites a chain of hope: delivering life-saving treatments, essential medicines",
    donateBtn: "Donate Now",
    programsTitle: "Our Healthcare Programs",
    programsSubtitle: "Comprehensive solutions for diverse medical needs",
    programs: [
      {
        icon: '🚑',
        title: 'Emergency Medical Response',
        desc: '24/7 mobile units providing urgent care in crisis situations'
      },
      {
        icon:'🩺',
        title: 'Chronic Disease Management',
        desc: 'Ongoing care for diabetes, hypertension, and other conditions'
      },
      {
        icon: '💉',
        title: 'Vaccination Drives',
        desc: 'Community immunization programs for preventable diseases',
      },
      {
        icon: '🧠',
        title: 'Mental Health Support',
        desc: 'Counseling and psychiatric services for underserved populations'
      }
    ],
    volunteerTitle: "Heroes Behind the Scenes",
    volunteerDesc: "Meet the dedicated individuals powering our healthcare mission",
    volunteerCta: "Nominate a Healthcare Hero",
   
    ctaDesc: "Join us in transforming lives through education",
    ctaDonate: "Donate Now",
    ctaVolunteer: "Volunteer"
  },
  ar: {
    heroTitle: "الرعاية الصحية للجميع",
    heroSubtitle: "انضم إلى مهمتنا لتقديم رعاية طبية عالية الجودة للمجتمعات المحرومة. كل تبرع يساعد في إنقاذ الأرواح وبناء مستقبل أكثر صحة.",
    promoTitle: "أيادي الشفاء لمن يحتاجونها - مساعدتك تنقذ الأرواح!",
    promoDesc: "يعاني الكثيرون يومياً دون الحصول على الرعاية الطبية الأساسية… لكن يمكنك تغيير ذلك. كل يوم، يُحرم الأطفال من العلاج، ويعاني كبار السن من الألم، وتكافح الأسر بصمت. معاً يمكننا تغيير هذا الواقع. دعمك يخلق سلسلة أمل: علاج منقذ للحياة، أدوية ضرورية، وراحة قلبية لمن هم في أمس الحاجة. كرمك لا يوفر الراحة فقط، بل يمنح الحياة من جديد. تبرع اليوم وكن اليد الشافية التي تغير الحياة.",
    donateBtn: "تبرع الآن",
    programsTitle: "برامجنا الصحية",
    programsSubtitle: "حلول شاملة لاحتياجات طبية متنوعة",
    programs: [
      {
        icon: '🚑',
        title: 'الاستجابة الطبية الطارئة',
        desc: 'وحدات متنقلة تقدم الرعاية العاجلة على مدار الساعة'
      },
      {
        icon: '🩺',
        title: 'إدارة الأمراض المزمنة',
        desc: 'رعاية مستمرة لمرضى السكري وارتفاع ضغط الدم وغيرها'
      },
      {
        icon: '💉',
        title: 'حملات التطعيم',
        desc: 'برامج تطعيم مجتمعية ضد الأمراض القابلة للوقاية'
      },
      {
        icon: '🧠',
        title: 'دعم الصحة النفسية',
        desc: 'استشارات وخدمات نفسية للمجتمعات المحرومة'
      }
    ],
    volunteerTitle: "أبطال خلف الكواليس",
    volunteerDesc: "تعرف على الأفراد المخلصين الذين يدعمون مهمتنا الصحية",
    volunteerCta: "رشح بطل رعاية صحية",
    ctaTitle: "جاهز لصنع تأثير؟",
    ctaDesc: "انضم إلينا في تغيير الحياة من خلال التعليم",
    ctaDonate: "تبرع الآن",
    ctaVolunteer: "تطوع"
  },
  he: {
    heroTitle: "בריאות לכולם",
    heroSubtitle: "הצטרפו למשימה שלנו להביא טיפול רפואי איכותי לקהילות מוחלשות. כל תרומה מצילה חיים ובונה עתיד בריא יותר.",
    promoTitle: "ידיים מרפאות לנזקקים - עזרתך מצילה חיים!",
    promoDesc: "בכל יום סובלים אנשים רבים ללא גישה לטיפול רפואי בסיסי… אבל אתה יכול לשנות זאת. ילדים שלא מקבלים טיפול, קשישים שסובלים מכאב, משפחות שנאבקות בשקט. יחד נוכל לשנות את הסיפור הזה. התמיכה שלך יוצרת שרשרת תקווה: טיפולים מצילי חיים, תרופות חיוניות ונחמה אמיתית למי שזקוק לה ביותר. הנדיבות שלך לא רק מעניקה הקלה – היא מחזירה חיים לנפשות סובלות. תרום היום והיה היד המרפאה שמביאה שינוי.",
    donateBtn: "תרום עכשיו",
    programsTitle: "התוכניות הבריאותיות שלנו",
    programsSubtitle: "פתרונות מקיפים לצרכים רפואיים מגוונים",
    programs: [
      {
        icon: '🚑',
        title: 'תגובה רפואית דחופה',
        desc: 'יחידות ניידות המספקות טיפול דחוף מסביב לשעון'
      },
      {
        icon: '🩺',
        title: 'ניהול מחלות כרוניות',
        desc: 'טיפול מתמשך בסוכרת, לחץ דם גבוה ועוד'
      },
      {
        icon: '💉',
        title: 'מבצעי חיסונים',
        desc: 'תוכניות חיסון קהילתיות נגד מחלות שניתן למנוע'
      },
      {
        icon: '🧠',
        title: 'תמיכה בבריאות הנפש',
        desc: 'ייעוץ ושירותים פסיכיאטריים לאוכלוסיות מוחלשות'
      }
    ],
    volunteerTitle: "גיבורים מאחורי הקלעים",
    volunteerDesc: "הכירו את האנשים המסורים שמניעים את משימת הבריאות שלנו",
    volunteerCta: "המלץ על גיבור בריאות",
    ctaTitle: "מוכן להשפיע?",
    ctaDesc: "הצטרף אלינו לשינוי חיים באמצעות חינוך",
    ctaDonate: "תרום עכשיו",
    ctaVolunteer: "התנדב"
  }
};

const rtlLanguages = ["ar", "he"];

const HealthcareInitiatives = () => {
    const { language, theme } = useContext(LanguageContext); // <-- add theme here
    const [activeVolunteer, setActiveVolunteer] = useState(null);
    const navigate = useNavigate();

    const t = healthcareTranslations[language] || healthcareTranslations.en;

    // RTL detection
    const isRTL = rtlLanguages.includes(language);

    // Animation for text elements - corrected class name
    useEffect(() => {
        const heroContent = document.querySelector('.hero-content-healthcare');
        if (heroContent) {
            heroContent.style.opacity = 1;
            heroContent.style.transform = 'translateY(0)';
        }
    }, []);

    const volunteers = [
        {
            id: 1,
            name: "Dr. Anika Patel",
            role: "Pediatric Surgeon",
            location: "Mumbai, India",
            image: "/Images/doc1.jpg",
            story: "Volunteering weekends to perform life-changing surgeries for children from underserved communities.",
            stats: "142 surgeries performed"
        },
        {
            id: 2,
            name: "James Okafor",
            role: "Community Health Worker",
            location: "Lagos, Nigeria",
            image: "Images/doc3.jpg",
            story: "Trained 30 local volunteers to provide basic healthcare in his neighborhood.",
            stats: "5,000+ home visits"
        },
        {
            id: 3,
            name: "Maria Gonzalez",
            role: "Retired Nurse",
            location: "Guatemala City",
            image: "/Images/doc2.jpg",
            story: "Teaching hygiene practices in rural schools to prevent infectious diseases.",
            stats: "18 schools reached"
        },
        {
            id: 4,
            name: "The Tech Volunteers",
            role: "Developer Team",
            location: "San Francisco, USA",
            image: "/Images/doc4.jpg",
            story: "Built a patient records system for mobile clinics in 3 countries.",
            stats: "12,000 digital records"
        }
    ];



    const slideUp = {
        hidden: { y: 50, opacity: 0 },
        visible: { y: 0, opacity: 1, transition: { duration: 0.6 } }
    };

    const scaleUp = {
        hidden: { scale: 0.9, opacity: 0 },
        visible: { scale: 1, opacity: 1, transition: { duration: 0.5 } }
    };

    // const handleGetStarted = (path) => {
    //     navigate(path);
    // };

    return (
        <div
            style={{
                direction: isRTL ? "rtl" : "ltr",
                textAlign: isRTL ? "right" : "left",
            }}
        >
            {/* Hero Section */}
            <div
                className="hero-section"
                style={{
                    backgroundImage: "url(/Images/healthcare-charity.jpg)",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    height: "100vh",
                    position: "relative"
                }}
            >
                <div
                    className="hero-overlay-healthcare"
                    style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        // background: "rgba(0,0,0,1)", // Pure black overlay
                        zIndex: 1
                    }}
                ></div>
                <div
                    className="hero-content-healthcare"
                    style={{
                        position: "relative",
                        zIndex: 2,
                        color: theme === 'dark' ? '#fff' : '#fff', // Always white text on black overlay
                        textAlign: isRTL ? "right" : "left"
                    }}
                >
                    <h1 className="hero-title-healthcare" style={{ color: "#fff" }}>{t.heroTitle}</h1>
                    {/* <p className="hero-subtitle-healthcare" style={{ color: "#fff" }}>
                        {t.heroSubtitle}
                    </p> */}
                </div>
            </div>

            {/* Second section */}
            <div className="promo-container-health">
                <div className="image-side-health">
                    <img src="/Images/healthcare-charity.jpg" alt="Healing Hands" />
                </div>
                <div className="content-side-health">
                    <div className="section emotional-appeal-healthcare">
                        <h2 style={{color:"black"}}>{t.promoTitle}</h2>
                        <p style={{ textAlign: "justify",color:"black" }}>{t.promoDesc}</p>
                        <button className="donate-button-health" onClick={() => navigate("/contact")}>{t.donateBtn}</button>
                    </div>
                </div>
            </div>

            {/* Programs Section */}
            <section className="programs-section-health">
                <div className="container-health">
                    <h2>{t.programsTitle}</h2>
                    <p className="subtitle-health" style={{ textAlign: "center" }}>{t.programsSubtitle}</p>

                    <div className="programs-grid-health">
                        {t.programs.map((program, index) => (
                            <div
                                key={index}
                                className="program-card-health"
                                data-aos="fade-up"
                                data-aos-delay={index * 100}
                            >
                                <div className="program-icon-health">{program.icon}</div>
                                <h3>{program.title}</h3>
                                <p>{program.desc}</p>
                                <button className="learn-more" onClick={() => navigate("/contact")}>Learn More →</button>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Volunteer Spotlight Section */}
            <section className="volunteer-spotlight">
                <div className="section-header">
                    <h2>{t.volunteerTitle}</h2>
                    <p>{t.volunteerDesc}</p>
                </div>

                <div className="volunteer-row">
                    {volunteers.map((volunteer) => (
                        <div
                            key={volunteer.id}
                            className="volunteer-card"
                            onClick={() => setActiveVolunteer(volunteer)}
                        >
                            <div className="card-image" style={{ backgroundImage: `url(${volunteer.image})` }}></div>
                            <div className="card-content">
                                <h3>{volunteer.name}</h3>
                                <p className="role-location">{volunteer.role} • {volunteer.location}</p>
                                <div className="stats-badge">{volunteer.stats}</div>
                            </div>
                        </div>
                    ))}
                </div>

                {activeVolunteer && (
                    <div className="volunteer-modal">
                        <div className="modal-content">
                            <button className="close-button" onClick={() => setActiveVolunteer(null)}>
                                ×
                            </button>
                            <div className="modal-image" style={{ backgroundImage: `url(${activeVolunteer.image})` }}></div>
                            <div className="modal-text">
                                <h3>{activeVolunteer.name}</h3>
                                <p className="role">{activeVolunteer.role} • {activeVolunteer.location}</p>
                                <p className="story">{activeVolunteer.story}</p>
                                <div className="impact-stat">
                                    <span>{activeVolunteer.stats}</span>
                                </div>
                                <button className="volunteer-cta" onClick={() => navigate("/contact")}>
                                    {t.volunteerCta}
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </section>

            {/* CTA Section */}
            <motion.section
                className="animated-cta"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={{
                    visible: { transition: { staggerChildren: 0.2 } }
                }}
            >
                <div className="cta-bg"></div>
                <div className="container">
                    <motion.h2 variants={slideUp}>{t.ctaTitle}</motion.h2>
                    <motion.p variants={slideUp}>{t.ctaDesc}</motion.p>
                    <div className="cta-buttons">
                        <motion.button
                            className="cta-btn primary"
                            variants={scaleUp}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => navigate("/contact")}
                        >
                            {t.ctaDonate}
                        </motion.button>
                        <motion.button
                            className="cta-btn secondary"
                            variants={scaleUp}
                            whileHover={{ scale: 1.05 }}
                           
                            onClick={() => navigate("/contact")}
                        >
                            {t.ctaVolunteer}
                        </motion.button>
                    </div>
                </div>
            </motion.section>
        </div>
    );
};

export default HealthcareInitiatives;