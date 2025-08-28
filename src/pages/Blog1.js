import React, { useState, useEffect, useContext } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { LanguageContext } from '../components/Header'; // adjust path if needed
import './Blog1.css';

const blog1Translations = {
    en: {
        programTitle: "Community Outreach Program",
        smilesTitle: "Bringing Smiles to Our Elders",
        programDesc: "Our Community Outreach Program has been transforming lives since 2015, connecting volunteers with elderly community members who need companionship and support. Each month, our team organizes:",
        visits: [
            "Weekly visitations to senior homes",
            "Monthly community gatherings",
            "Holiday celebration events",
            "Essential supplies delivery"
        ],
        impactStories: "Impact Stories",
        stories: [
            {
                title: "Mr. Sharma's 80th Birthday",
                text: "Volunteers organized a surprise celebration for Mr. Sharma who hadn't celebrated his birthday in 10 years.",
                img: "/Images/birthday.jpg"
            },
            {
                title: "The Garden Project",
                text: "How we transformed the backyard of a senior living facility into a thriving community garden.",
                img: "/Images/garden.jpg"
            },
            {
                title: "Intergenerational Connections",
                text: "Our program pairing local students with seniors has created meaningful friendships across generations.",
                img: "/Images/ingreational.jpg"
            }
        ]
    },
    ar: {
        programTitle: "برنامج التواصل المجتمعي",
        smilesTitle: "إدخال البهجة على كبار السن",
        programDesc: "برنامج التواصل المجتمعي لدينا يغير الحياة منذ عام 2015، حيث يربط المتطوعين بكبار السن الذين يحتاجون إلى الصحبة والدعم. ينظم فريقنا كل شهر:",
        visits: [
            "زيارات أسبوعية لدور كبار السن",
            "تجمعات مجتمعية شهرية",
            "فعاليات احتفالية في الأعياد",
            "توصيل المستلزمات الأساسية"
        ],
        impactStories: "قصص التأثير",
        stories: [
            {
                title: "عيد ميلاد السيد شارما الـ80",
                text: "نظم المتطوعون احتفالًا مفاجئًا للسيد شارما الذي لم يحتفل بعيد ميلاده منذ 10 سنوات.",
                img: "/Images/birthday.jpg"
            },
            {
                title: "مشروع الحديقة",
                text: "كيف حولنا حديقة دار كبار السن إلى حديقة مجتمعية مزدهرة.",
                img: "/Images/garden.jpg"
            },
            {
                title: "روابط بين الأجيال",
                text: "برنامجنا الذي يربط الطلاب المحليين بكبار السن خلق صداقات ذات معنى بين الأجيال.",
                img: "/Images/ingreational.jpg"
            }
        ]
    },
    he: {
        programTitle: "תוכנית קהילתית",
        smilesTitle: "מביאים שמחה לקשישים",
        programDesc: "תוכנית הקהילה שלנו משנה חיים מאז 2015, ומחברת מתנדבים עם קשישים שזקוקים לחברה ותמיכה. בכל חודש הצוות שלנו מארגן:",
        visits: [
            "ביקורים שבועיים בבתי אבות",
            "מפגשים קהילתיים חודשיים",
            "אירועי חג מיוחדים",
            "אספקת ציוד חיוני"
        ],
        impactStories: "סיפורי השפעה",
        stories: [
            {
                title: "יום הולדת 80 למר שארמה",
                text: "המתנדבים ארגנו חגיגה מפתיעה למר שארמה שלא חגג יום הולדת 10 שנים.",
                img: "/Images/birthday.jpg"
            },
            {
                title: "פרויקט הגינה",
                text: "איך הפכנו את חצר בית האבות לגינה קהילתית פורחת.",
                img: "/Images/garden.jpg"
            },
            {
                title: "קשרים בין-דוריים",
                text: "החיבור בין תלמידים לקשישים יצר חברות משמעותית בין דורות.",
                img: "/Images/ingreational.jpg"
            }
        ]
    }
};

const Blog1 = () => {
    const { language } = useContext(LanguageContext);
    const t = blog1Translations[language] || blog1Translations['en'];
    const [theme, setTheme] = useState('light');

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
        <div className={`blog-page ${theme}`}>
            {/* Section 1: Program Overview */}
            <section className="outreach-section">
                <Container>
                    <h1 
                        className="section-title" 
                        style={{ color: theme === 'light' ? 'black' : undefined }}
                    >
                        {t.programTitle}
                    </h1>
                    <Row className="align-items-center">
                        <Col md={6}>
                            <img 
                                src="/Images/out-reach.jpg" 
                                alt={t.programTitle} 
                                className="img-fluid rounded"
                            />
                        </Col>
                        <Col md={6}>
                            <div 
                                className="program-description"
                                style={{ color: theme === 'light' ? 'black' : undefined }}
                            >
                                <h2 style={{ color: theme === 'light' ? 'black' : undefined }}>
                                    {t.smilesTitle}
                                </h2>
                                <p style={{ color: theme === 'light' ? 'black' : undefined }}>
                                    {t.programDesc}
                                </p>
                                <ul>
                                    {t.visits.map((item, idx) => (
                                        <li key={idx}>{item}</li>
                                    ))}
                                </ul>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>

            {/* Section 2: Success Stories */}
            <section className="success-stories">
                <Container>
                    <h2 
                        className="text-center mb-5"
                        style={{ color: theme === 'light' ? 'black' : undefined }}
                    >
                        {t.impactStories}
                    </h2>
                    <Row>
                        {t.stories.map((story, idx) => (
                            <Col lg={4} className="mb-4" key={idx}>
                                <Card className="h-100 shadow">
                                    <Card.Img variant="top" src={story.img} />
                                    <Card.Body style={{ color: theme === 'light' ? 'black' : undefined }}>
                                        <Card.Title>{story.title}</Card.Title>
                                        <Card.Text style={{ color: theme === 'light' ? 'black' : undefined }}>
                                            {story.text}
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </Container>
            </section>
        </div>
    );
};

export default Blog1;