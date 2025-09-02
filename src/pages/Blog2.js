import React, { useState, useEffect, useContext } from 'react';
import { Container, Row, Col, Card, ListGroup } from 'react-bootstrap';
// import { useNavigate } from 'react-router-dom';
import './Blog2.css';
import { LanguageContext } from '../components/Header'; // adjust path if needed

const blog2Translations = {
    en: {
        heroTitle: "Healthcare Support Initiatives",
        heroDesc: "Our comprehensive healthcare programs ensure elderly community members receive quality medical care, preventive services, and health education.",
        servicesTitle: "Our Healthcare Services",
        services: [
            {
                icon: "fas fa-clinic-medical",
                title: "Primary Care Services",
                desc: "Regular health check-ups, chronic disease management, and basic treatments provided by our team of dedicated healthcare professionals."
            },
            {
                icon: "fas fa-ambulance",
                title: "Emergency Support",
                desc: "24/7 emergency response team and transportation services for critical medical situations and hospital transfers."
            },
            {
                icon: "fas fa-brain",
                title: "Mental Health Programs",
                desc: "Counseling services, dementia care support, and mental wellness workshops to promote emotional well-being."
            },
            {
                icon: "fas fa-utensils",
                title: "Nutrition Support",
                desc: "Dietary planning, supplemental nutrition programs, and cooking demonstrations for seniors with special dietary needs."
            }
        ],
        list: [
            { icon: "fas fa-heartbeat", text: "Monthly mobile health clinics" },
            { icon: "fas fa-pills", text: "Free medication distribution" },
            { icon: "fas fa-user-md", text: "Specialist doctor consultations" },
            { icon: "fas fa-heart", text: "Cardiac health screenings" }
        ]
    },
    ar: {
        heroTitle: "مبادرات دعم الرعاية الصحية",
        heroDesc: "برامجنا الصحية الشاملة تضمن حصول كبار السن على رعاية طبية عالية الجودة وخدمات وقائية وتثقيف صحي.",
        servicesTitle: "خدمات الرعاية الصحية لدينا",
        services: [
            {
                icon: "fas fa-clinic-medical",
                title: "خدمات الرعاية الأولية",
                desc: "فحوصات صحية منتظمة، إدارة الأمراض المزمنة، وعلاجات أساسية يقدمها فريقنا من المتخصصين."
            },
            {
                icon: "fas fa-ambulance",
                title: "الدعم الطارئ",
                desc: "فريق استجابة طارئة على مدار الساعة وخدمات نقل للحالات الطبية الحرجة."
            },
            {
                icon: "fas fa-brain",
                title: "برامج الصحة النفسية",
                desc: "خدمات استشارية، دعم رعاية الخرف، وورش عمل للصحة النفسية."
            },
            {
                icon: "fas fa-utensils",
                title: "دعم التغذية",
                desc: "تخطيط غذائي، برامج تغذية إضافية، وعروض طبخ لكبار السن ذوي الاحتياجات الخاصة."
            }
        ],
        list: [
            { icon: "fas fa-heartbeat", text: "عيادات صحية متنقلة شهرية" },
            { icon: "fas fa-pills", text: "توزيع الأدوية مجانًا" },
            { icon: "fas fa-user-md", text: "استشارات أطباء متخصصين" },
            { icon: "fas fa-heart", text: "فحوصات صحة القلب" }
        ]
    },
    he: {
        heroTitle: "יוזמות תמיכה רפואית",
        heroDesc: "התוכניות הרפואיות שלנו מבטיחות לקשישים טיפול איכותי, שירותים מונעים וחינוך לבריאות.",
        servicesTitle: "שירותי הבריאות שלנו",
        services: [
            {
                icon: "fas fa-clinic-medical",
                title: "שירותי רפואה ראשונית",
                desc: "בדיקות בריאות שגרתיות, ניהול מחלות כרוניות וטיפולים בסיסיים על ידי צוות מקצועי."
            },
            {
                icon: "fas fa-ambulance",
                title: "תמיכה במקרי חירום",
                desc: "צוות חירום 24/7 ושירותי הסעה למצבים רפואיים קריטיים."
            },
            {
                icon: "fas fa-brain",
                title: "תוכניות בריאות הנפש",
                desc: "ייעוץ, תמיכה בדמנציה וסדנאות לרווחה נפשית."
            },
            {
                icon: "fas fa-utensils",
                title: "תמיכה תזונתית",
                desc: "תכנון תזונתי, תוכניות תוספי תזונה והדגמות בישול לקשישים עם צרכים מיוחדים."
            }
        ],
        list: [
            { icon: "fas fa-heartbeat", text: "מרפאות ניידות חודשיות" },
            { icon: "fas fa-pills", text: "חלוקת תרופות חינם" },
            { icon: "fas fa-user-md", text: "התייעצות עם רופאים מומחים" },
            { icon: "fas fa-heart", text: "בדיקות לב" }
        ]
    }
};

const rtlLanguages = ["ar", "he"];

const Blog2 = () => {
  const { language } = useContext(LanguageContext);

  // RTL detection
  const isRTL = rtlLanguages.includes(language);

  // const navigate = useNavigate();
    const [theme, setTheme] = useState('light');
    const t = blog2Translations[language] || blog2Translations.en;

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

    return (
        <div
      style={{
        direction: isRTL ? "rtl" : "ltr",
        textAlign: isRTL ? "right" : "left",
      }}
    >
            <div className={`healthcare-page ${theme}`}>
            {/* Section 1: Healthcare Program Overview */}
            <section className="healthcare-hero">
                <Container>
                    <Row className="align-items-center">
                        <Col lg={6} className="mb-4 mb-lg-0">
                            <img 
                                src="/Images/health-blog.jpg" 
                                alt="Healthcare Support" 
                                className="img-fluid rounded shadow"
                            />
                        </Col>
                        <Col lg={6}>
                            <div className="healthcare-intro">
                                <h1 style={{ color: theme === 'light' ? 'black' : undefined }}>{t.heroTitle}</h1>
                                <p className="lead" style={{ color: theme === 'light' ? 'black' : undefined }}>
                                    {t.heroDesc}
                                </p>
                                <ListGroup variant="flush" className="mb-4">
                                    {t.list.map((item, idx) => (
                                        <ListGroup.Item key={idx}>
                                            <i className={`${item.icon} me-2`}></i>
                                            {item.text}
                                        </ListGroup.Item>
                                    ))}
                                </ListGroup>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>

            {/* Section 2: Healthcare Services & Testimonials */}
            <section className="healthcare-services">
                <Container>
                    <h2 className="text-center mb-5" style={{ color: theme === 'light' ? 'black' : undefined }}>
                        {t.servicesTitle}
                    </h2>
                    <Row>
                        {t.services.map((service, idx) => (
                            <Col md={6} className="mb-4" key={idx}>
                                <Card className="h-100 border-0 shadow-sm">
                                    <Card.Body>
                                        <div className="service-icon mb-3">
                                            <i className={service.icon}></i>
                                        </div>
                                        <Card.Title>{service.title}</Card.Title>
                                        <Card.Text>{service.desc}</Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </Container>
            </section>
        </div>
        </div>
    );
};

export default Blog2;