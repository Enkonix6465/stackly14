import React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Container, Row, Col, Card } from 'react-bootstrap';
import './Blog.css';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import { LanguageContext } from '../components/Header'; // adjust path if needed

const blogTranslations = {
  en: {
    heroTitle: "Where Compassion Finds Its Voice.",
    heroDesc: "Every act of kindness, no matter how small, creates ripples of hope.",
    heroBtn: "Get Started",
    blogCards: [
      {
        image: '/Images/out-reach.jpg',
        title: 'Community Outreach Program',
        description: 'Explore how our volunteers brought smiles to hundreds of elders through outreach activities.',
        buttonText: 'Read More',
        path: '/blog1'
      },
      {
        image: '/Images/health-blog.jpg',
        title: 'Healthcare Support Initiatives',
        description: 'Discover the healthcare programs we run to ensure elderly access to quality medical care.',
        buttonText: 'Learn More',
        path: '/blog2'
      },
      {
        image: '/Images/stories-hope.jpg',
        title: 'Stories of Hope & Resilience',
        description: 'Read inspiring stories about the elders we serve and how your support changes lives.',
        buttonText: 'Discover More',
        path: '/blog3'
      },
    ],
    impactStories: [
      {
        title: "Asha's Journey",
        subtitle: 'How education transformed her life—and many more.',
        image: 'https://via.placeholder.com/1200x400?text=Story+1',
        path: '/stories/asha-journey'
      },
      {
        title: 'Radhas Resilience',
        subtitle: 'With your help, Radha overcame health challenges and found strength.',
        image: 'https://via.placeholder.com/1200x400?text=Story+2',
        path: '/stories/radha-resilience'
      },
      {
        title: 'Senior Smiles',
        subtitle: 'Our community care program brought laughter and connection to homes.',
        image: 'https://via.placeholder.com/1200x400?text=Story+3',
        path: '/stories/senior-smiles'
      },
    ],
    waysTitle: "5 Simple Ways to Give Back Without Spending a Dollar",
    waysIntro: "Many people believe that making a difference requires deep",
    waysToGiveBack: [
      {
        title: "Volunteer Your Time",
        description: "Offer your skills, whether it's tutoring, organizing events, or helping at a local shelter. Time is one of the most valuable gifts you can give.",
        path: '/volunteer'
      },
      {
        title: "Spread Awareness",
        description: "Use your voice (or social media) to share stories, campaigns, or petitions that align with your values. A simple repost can inspire others to act.",
        path: '/awareness'
      },
      {
        title: "Donate Unused Items",
        description: "Clean out your closet, bookshelf, or pantry and donate gently used items to shelters, libraries, or food banks.",
        path: '/donate-items'
      },
      {
        title: "Offer a Skill or Talent",
        description: "Are you good at graphic design, writing, or mentoring? Nonprofits often need pro bono help—your expertise could make a huge impact!",
        path: '/skills'
      },
      {
        title: "Practice Kindness Daily",
        description: "Small acts—like thanking frontline workers, writing encouraging notes, or helping a neighbor—create ripple effects of positivity.",
        path: '/kindness'
      },
      {
        title: "Become a Community Champion",
        description: "Organize local initiatives like neighborhood cleanups, charity drives, or awareness campaigns. Even small grassroots efforts can spark.",
        path: '/champion'
      }
    ],
    helpHubTitle: "How You Can Help",
    resources: [
      {
        icon: '🆘',
        title: 'Emergency Relief',
        description: 'Find immediate aid and support programs in your area.',
        linkText: 'Access Now',
        path: '/emergency'
      },
      {
        icon: '🤲',
        title: 'Volunteer Near You',
        description: 'Discover local volunteer opportunities by interest and location.',
        linkText: 'Search Volunteering',
        path: '/volunteer'
      },
      {
        icon: '💡',
        title: 'Educational Materials',
        description: 'Get informative guides and resources for communities and caregivers.',
        linkText: 'Explore Library',
        path: '/education'
      },
      {
        icon: '📅',
        title: 'Upcoming Events',
        description: 'Join our events, workshops, and support groups near you.',
        linkText: 'View Calendar',
        path: '/events'
      },
    ],
    newsletterTitle: "Stay Updated",
    newsletterDesc: "Subscribe to receive our latest blog posts and news.",
    newsletterBtn: "Subscribe"
  },
  ar: {
    heroTitle: "حيث يجد التعاطف صوته.",
    heroDesc: "كل عمل لطف، مهما كان صغيرًا، يخلق موجات من الأمل.",
    heroBtn: "ابدأ الآن",
    blogCards: [
      {
        image: '/Images/out-reach.jpg',
        title: 'برنامج التواصل المجتمعي',
        description: 'اكتشف كيف جلب متطوعونا الابتسامات لمئات كبار السن من خلال أنشطة التواصل.',
        buttonText: 'اقرأ المزيد',
        path: '/blog1'
      },
      {
        image: '/Images/health-blog.jpg',
        title: 'مبادرات دعم الصحة',
        description: 'اكتشف البرامج الصحية التي نقدمها لضمان وصول كبار السن إلى رعاية طبية عالية الجودة.',
        buttonText: 'اعرف المزيد',
        path: '/blog2'
      },
      {
        image: '/Images/stories-hope.jpg',
        title: 'قصص الأمل والمرونة',
        description: 'اقرأ قصص ملهمة عن كبار السن الذين نخدمهم وكيف يغير دعمك حياتهم.',
        buttonText: 'اكتشف المزيد',
        path: '/blog3'
      },
    ],
    impactStories: [
      {
        title: "رحلة آشا",
        subtitle: 'كيف غير التعليم حياتها - والعديد من الآخرين.',
        image: 'https://via.placeholder.com/1200x400?text=Story+1',
        path: '/stories/asha-journey'
      },
      {
        title: 'مرونة رادا',
        subtitle: 'بمساعدتكم، تغلبت رادا على تحديات صحية ووجدت القوة.',
        image: 'https://via.placeholder.com/1200x400?text=Story+2',
        path: '/stories/radha-resilience'
      },
      {
        title: 'ابتسامات كبار السن',
        subtitle: 'جلب برنامج رعاية المجتمع لدينا الضحك والترابط إلى المنازل.',
        image: 'https://via.placeholder.com/1200x400?text=Story+3',
        path: '/stories/senior-smiles'
      },
    ],
    waysTitle: "5 طرق بسيطة للعطاء دون إنفاق دولار واحد",
    waysIntro: "يعتقد الكثيرون أن إحداث فرق يتطلب عمقًا",
    waysToGiveBack: [
      {
        title: "تطوع بوقتك",
        description: "قدم مهاراتك، سواء كانت في التدريس، تنظيم الفعاليات، أو المساعدة في ملجأ محلي. الوقت هو أحد أغلى الهدايا التي يمكنك تقديمها.",
        path: '/volunteer'
      },
      {
        title: "نشر الوعي",
        description: "استخدم صوتك (أو وسائل التواصل الاجتماعي) لمشاركة القصص، الحملات، أو العرائض التي تتماشى مع قيمك. قد يلهم إعادة نشر بسيطة الآخرين للعمل.",
        path: '/awareness'
      },
      {
        title: "التبرع بالأشياء غير المستخدمة",
        description: "قم بتنظيف خزانة ملابسك، رفوف كتبك، أو مخزنك وتبرع بالأشياء المستخدمة برفق للملاجئ، المكتبات، أو بنوك الطعام.",
        path: '/donate-items'
      },
      {
        title: "قدم مهارة أو موهبة",
        description: "هل أنت جيد في تصميم الجرافيك، الكتابة، أو الإرشاد؟ غالبًا ما تحتاج المنظمات غير الربحية إلى مساعدة تطوعية - يمكن أن يكون لخبرتك تأثير كبير!",
        path: '/skills'
      },
      {
        title: "مارس اللطف يوميًا",
        description: "تخلق الأعمال الصغيرة - مثل شكر العاملين في الخطوط الأمامية، كتابة ملاحظات تشجيعية، أو مساعدة جار - تأثيرات متتالية من الإيجابية.",
        path: '/kindness'
      },
      {
        title: "كن بطلًا مجتمعيًا",
        description: "نظم مبادرات محلية مثل تنظيف الأحياء، حملات جمع التبرعات، أو حملات التوعية. حتى الجهود الصغيرة يمكن أن تثير شرارة.",
        path: '/champion'
      }
    ],
    helpHubTitle: "كيف يمكنك المساعدة",
    resources: [
      {
        icon: '🆘',
        title: 'إغاثة طارئة',
        description: 'ابحث عن المساعدة الفورية وبرامج الدعم في منطقتك.',
        linkText: 'الوصول الآن',
        path: '/emergency'
      },
      {
        icon: '🤲',
        title: 'تطوع بالقرب منك',
        description: 'اكتشف فرص التطوع المحلية حسب الاهتمام والموقع.',
        linkText: 'ابحث عن التطوع',
        path: '/volunteer'
      },
      {
        icon: '💡',
        title: 'مواد تعليمية',
        description: 'احصل على أدلة وموارد معلوماتية للمجتمعات ومقدمي الرعاية.',
        linkText: 'استكشاف المكتبة',
        path: '/education'
      },
      {
        icon: '📅',
        title: 'الفعاليات القادمة',
        description: 'انضم إلى فعالياتنا، ورش العمل، ومجموعات الدعم بالقرب منك.',
        linkText: 'عرض التقويم',
        path: '/events'
      },
    ],
    newsletterTitle: "ابق على اطلاع",
    newsletterDesc: "اشترك لتصلك أحدث منشوراتنا وأخبارنا.",
    newsletterBtn: "اشترك"
  },
  he: {
    heroTitle: "המקום בו חמלה מוצאת קול.",
    heroDesc: "כל מעשה טוב, קטן ככל שיהיה, יוצר גלים של תקווה.",
    heroBtn: "התחל",
    blogCards: [
      {
        image: '/Images/out-reach.jpg',
        title: 'תוכנית קהילתית',
        description: 'גלה כיצד המתנדבים שלנו הביאו חיוכים למאות קשישים בפעילויות קהילתיות.',
        buttonText: 'קרא עוד',
        path: '/blog1'
      },
      {
        image: '/Images/health-blog.jpg',
        title: 'יוזמות תמיכה בבריאות',
        description: 'גלה את תוכניות הבריאות שלנו המיועדות להבטיח שהקשישים יקבלו טיפול רפואי איכותי.',
        buttonText: 'למידע נוסף',
        path: '/blog2'
      },
      {
        image: '/Images/stories-hope.jpg',
        title: 'סיפורי תקווה וחוסן',
        description: 'קרא סיפורים מעוררי השראה על הקשישים שאנו משרתים וכיצד התמיכה שלך משנה חיים.',
        buttonText: 'גלה עוד',
        path: '/blog3'
      },
    ],
    impactStories: [
      {
        title: "המסע של אשה",
        subtitle: 'איך החינוך שינה את חייה - ואת חייהם של רבים אחרים.',
        image: 'https://via.placeholder.com/1200x400?text=Story+1',
        path: '/stories/asha-journey'
      },
      {
        title: 'חוסן של רדה',
        subtitle: 'בעזרתכם, רדה התגברה על אתגרים בריאותיים ומצאה כוח.',
        image: 'https://via.placeholder.com/1200x400?text=Story+2',
        path: '/stories/radha-resilience'
      },
      {
        title: 'חיוכים של קשישים',
        subtitle: 'תוכנית הטיפול הקהילתי שלנו הביאה צחוק וחיבור לבתים.',
        image: 'https://via.placeholder.com/1200x400?text=Story+3',
        path: '/stories/senior-smiles'
      },
    ],
    waysTitle: "5 דרכים פשוטות לתת בחזרה دون להוציא אגורה",
    waysIntro: "רבים מאמינים שעשיית שינוי דורשת עומק",
    waysToGiveBack: [
      {
        title: "התנדבות בזמן שלך",
        description: "הצע את כישוריך, בין אם זה חונכות, ארגון אירועים, או עזרה במקלט מקומי. הזמן הוא אחד מהמתנות היקרות ביותר שאתה יכול לתת.",
        path: '/volunteer'
      },
      {
        title: "הגברת מודעות",
        description: "השתמש בקול שלך (או ברשתות החברתיות) כדי לשתף סיפורים, קמפיינים, או עצומות שמתאימות לערכים שלך. שיתוף פשוט יכול להניע אחרים לפעולה.",
        path: '/awareness'
      },
      {
        title: "תרומת פריטים לא בשימוש",
        description: "נקה את הארון, מדף הספרים, או המגירה שלך ותרום פריטים בשימוש קל למקלטים, ספריות, או בנקי מזון.",
        path: '/donate-items'
      },
      {
        title: "הצע מיומנות או כישרון",
        description: "האם אתה טוב בעיצוב גרפי, כתיבה, או חונכות? ארגונים ללא מטרות רווח זקוקים לעיתים לעזרה בהתנדבות - המומחיות שלך יכולה לעשות הבדל גדול!",
        path: '/skills'
      },
      {
        title: "תרגל טוב לב יומיומי",
        description: "מעשים קטנים - כמו להודות לעובדי קו החזית, לכתוב פתקים מעודדים, או לעזור לשכן - יוצרים אפקטים מתגלגלים של חיוביות.",
        path: '/kindness'
      },
      {
        title: "היה אלוף קהילתי",
        description: "ארגן יוזמות מקומיות כמו ניקוי שכונות, מבצעי צדקה, או קמפיינים להגברת מודעות. אפילו מאמצים קטנים יכולים להדליק ניצוץ.",
        path: '/champion'
      }
    ],
    helpHubTitle: "איך אתה יכול לעזור",
    resources: [
      {
        icon: '🆘',
        title: 'סיוע חירום',
        description: 'מצא סיוע מיידי ותוכניות תמיכה באזור שלך.',
        linkText: 'גש עכשיו',
        path: '/emergency'
      },
      {
        icon: '🤲',
        title: 'התנדבות לידך',
        description: 'גלה הזדמנויות התנדבות מקומיות לפי תחום עניין ומיקום.',
        linkText: 'חפש התנדבות',
        path: '/volunteer'
      },
      {
        icon: '💡',
        title: 'חומרים חינוכיים',
        description: 'קבל מדריכים ומשאבים אינפורמטיביים לקהילות ולמטפלים.',
        linkText: 'חקור ספרייה',
        path: '/education'
      },
      {
        icon: '📅',
        title: 'אירועים קרובים',
        description: 'הצטרף לאירועים, סדנאות, וקבוצות תמיכה קרוב אליך.',
        linkText: 'צפה בלוח שנה',
        path: '/events'
      },
    ],
    newsletterTitle: "הישאר מעודכן",
    newsletterDesc: "הירשם לקבלת פוסטים ועדכונים חדשים.",
    newsletterBtn: "הירשם"
  }
};

const settings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    fade: true,
};

const Blog = () => {
    const navigate = useNavigate();
    const [theme, setTheme] = useState('light');
    const { language } = useContext(LanguageContext);
    const t = blogTranslations[language] || blogTranslations.en;

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
            {/* 1. Hero Banner */}
            <section className="hero-blog">
                <video className="hero-video-blog" src="/Images/home2.mp4" autoPlay loop muted playsInline />
                <div className="hero-overlay-blog">
                    <h1>{t.heroTitle}</h1>
                    <p>{t.heroDesc}</p>
                    <div className="hero-buttons-blog">
                        <button className="btn-blog" onClick={() => navigate('/contact')}>{t.heroBtn}</button>
                    </div>
                </div>
            </section>

            {/* 2. Blog Cards */}
            <section className="blog-cards-section">
                {t.blogCards.map((card, idx) => (
                    <article key={idx} className="card">
                        <img src={card.image} alt={card.title} className="card-image" />
                        <div className="card-content">
                            <h3 className="card-title">{card.title}</h3>
                            <p className="card-description">{card.description}</p>
                            <button 
                                className="card-button"
                                onClick={() => navigate(card.path)}
                            >
                                {card.buttonText}
                            </button>
                        </div>
                    </article>
                ))}
            </section>

            {/* 3. Impact Carousel */}
            <section className="impact-carousel">
                <Slider {...settings}>
                    {t.impactStories.map((story, idx) => (
                        <div 
                            key={idx} 
                            className="slide"
                            onClick={() => navigate(story.path)}
                            style={{ cursor: 'pointer' }}
                        >
                            <div
                                className="parallax-bg"
                                style={{ backgroundImage: `url(${story.image})` }}
                            />
                            <div className="story-content">
                                <h2>{story.title}</h2>
                                <p>{story.subtitle}</p>
                            </div>
                        </div>
                    ))}
                </Slider>
            </section>

            {/* 4. Ways to Give Back Section */}
            <section className="ways-to-give-back">
                <Container>
                    <h2 className="ways-title">{t.waysTitle}</h2>
                    <p className="ways-intro">{t.waysIntro}</p>
                    <Row className="g-4">
                        {t.waysToGiveBack.map((way, index) => (
                            <Col key={index} md={6} lg={4} className="mb-3">
                                <Card 
                                    className="h-100 shadow-sm charity-card"
                                    onClick={() => navigate(way.path)}
                                    style={{ cursor: 'pointer' }}
                                >
                                    <Card.Body>
                                        <Card.Title className="text-primary">{way.title}</Card.Title>
                                        <Card.Text>{way.description}</Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </Container>
            </section>

            {/* 5. Help Hub Section */}
            <section className="help-hub-section">
    <h2 className="help-hub-title">{t.helpHubTitle}</h2>
    <div className="help-hub-container">
        {t.resources.map((res, idx) => (
            <div 
                key={idx} 
                className="help-hub-item"
                onClick={() => navigate(res.path)}
                style={{ cursor: 'pointer' }}
            >
                <div className="help-hub-icon">{res.icon}</div>
                <div className="help-hub-info">
                    <h3 className="help-hub-item-title">{res.title}</h3>
                    <p className="help-hub-item-desc">{res.description}</p>
                    <div className="help-hub-link">{res.linkText}</div>
                </div>
            </div>
        ))}
    </div>
</section>

{/* 6. Newsletter CTA */}
<section className="newsletter-cta">
    <h2>{t.newsletterTitle}</h2>
    <p>{t.newsletterDesc}</p>
    <form>
        <input type="email" placeholder="Your email address" />
        <button type="button" onClick={() => navigate('/contact')}>
            {t.newsletterBtn}
        </button>
    </form>
</section>
        </div>
    );
};

export default Blog;