import './ElderlyCare.css';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import { LanguageContext } from '../components/Header'; // adjust path if needed

const ElderlyCare = () => {
    const navigate = useNavigate();
    const handleGetStarted = (path) => {
        navigate(path);
    }
    const elderlyTranslations = {
        en: {
            heroTitle: "Building a Circle of Care Around Our Elders",
            heroDesc: "No senior should face aging alone.",
            heroBtn: "Donate Now",
            promoTitle: "Building a Circle of Care Around Our Elders",
            promoDesc: `No senior should face aging alone. Through volunteer networks, meal delivery programs, and home safety initiatives, we create a community-powered safety net that ensures every elder receives the practical support and heartfelt companionship they deserve.
            Building a Circle of Care around our elders is essential to ensure they age with dignity, comfort, and connection. This model emphasizes the importance of community, collaboration, and comprehensive support in enhancing the quality of life for senior citizens. Initiatives like HelpAge India's Elder Self-Help Groups empower seniors by promoting financial inclusion, health awareness, and social engagement, fostering a sense of community and self-reliance. Similarly, Kerala's Vayomithram project offers mobile clinics, palliative care, and help desks, providing accessible healthcare services to elderly individuals.`,
            promoBtn: "Donate Now",
            servicesTitle: "Our Comprehensive Services",
            services: [
                { icon: "🛒", title: "Grocery Assistance", desc: "Weekly shopping help and delivery" },
                { icon: "💊", title: "Medication Management", desc: "Organization and reminders" },
                { icon: "🎨", title: "Social Activities", desc: "Arts, games and outings" },
                { icon: "🚗", title: "Transportation", desc: "Medical appointment rides" }
            ],
            tiersTitle: "How You Can Help",
            tiers: [
                {
                    title: "Basic Needs",
                    amount: "$50/month",
                    benefits: ["Weekly grocery delivery", "Medication reminders"],
                    btn: "Select"
                },
                {
                    title: "Comprehensive Care",
                    amount: "$120/month",
                    benefits: ["All Basic Needs benefits", "Monthly doctor visits", "Home safety assessment"],
                    btn: "Select",
                    featured: true
                },
                {
                    title: "Full Support",
                    amount: "$250/month",
                    benefits: ["All Comprehensive benefits", "24/7 emergency support", "Social activities"],
                    btn: "Select"
                }
            ],
            tiersBadge: "Most Popular",
            storiesTitle: "Lives We've Touched",
            stories: [
                {
                    image: '/Images/ellder1.jpg',
                    quote: '"The meal delivery service saved me after my hip surgery. But more than the food, it was knowing someone cared that made the difference."',
                    author: 'Margaret, 82',
                    badge: '3 years supported'
                },
                {
                    image: '/Images/elder22.jpg',
                    quote: '"I was so lonely after my wife passed, but my weekly visits from volunteers gave me something to look forward to again."',
                    author: 'Robert, 78',
                    badge: '2 years supported'
                },
                {
                    image: '/Images/elder3.jpg',
                    quote: '"Thanks to the transportation service, I can get to all my medical appointments without burdening my family."',
                    author: 'Ethel, 85',
                    badge: '1 year supported'
                }
            ],
            ctaTitle: "Make a Difference in an Elder's Life",
            ctaDesc: "Your support can provide comfort, care, and companionship to those who need it most.",
            ctaDonate: "Donate Now",
            ctaVolunteer: "Volunteer Today"
        },
        ar: {
            heroTitle: "بناء دائرة رعاية حول كبار السن",
            heroDesc: "لا يجب أن يواجه أي كبير السن الشيخوخة بمفرده.",
            heroBtn: "تبرع الآن",
            promoTitle: "بناء دائرة رعاية حول كبار السن",
            promoDesc: `لا يجب أن يواجه أي كبير السن الشيخوخة بمفرده. من خلال شبكات المتطوعين وبرامج توصيل الوجبات ومبادرات السلامة المنزلية، نخلق شبكة أمان مدعومة بالمجتمع تضمن حصول كل كبير سن على الدعم العملي والرفقة الصادقة التي يستحقها.
            بناء دائرة رعاية حول كبار السن أمر ضروري لضمان تقدمهم في العمر بكرامة وراحة واتصال. يركز هذا النموذج على أهمية المجتمع والتعاون والدعم الشامل في تحسين جودة حياة كبار السن. مبادرات مثل مجموعات المساعدة الذاتية لكبار السن في الهند تعزز الشمول المالي والوعي الصحي والمشاركة الاجتماعية، مما يعزز الشعور بالمجتمع والاعتماد على الذات. وبالمثل، يوفر مشروع "فايوميترام" في كيرالا عيادات متنقلة ورعاية تلطيفية ومكاتب مساعدة، مما يوفر خدمات رعاية صحية متاحة لكبار السن.`,
            promoBtn: "تبرع الآن",
            servicesTitle: "خدماتنا الشاملة",
            services: [
                { icon: "🛒", title: "مساعدة البقالة", desc: "مساعدة وتوصيل أسبوعي للتسوق" },
                { icon: "💊", title: "إدارة الأدوية", desc: "تنظيم وتذكير بالأدوية" },
                { icon: "🎨", title: "أنشطة اجتماعية", desc: "فن، ألعاب ورحلات" },
                { icon: "🚗", title: "النقل", desc: "توصيل للمواعيد الطبية" }
            ],
            tiersTitle: "كيف يمكنك المساعدة",
            tiers: [
                {
                    title: "الاحتياجات الأساسية",
                    amount: "$50/شهريًا",
                    benefits: ["توصيل البقالة أسبوعيًا", "تذكير بالأدوية"],
                    btn: "اختر"
                },
                {
                    title: "رعاية شاملة",
                    amount: "$120/شهريًا",
                    benefits: ["جميع مزايا الاحتياجات الأساسية", "زيارات الطبيب الشهرية", "تقييم سلامة المنزل"],
                    btn: "اختر",
                    featured: true
                },
                {
                    title: "دعم كامل",
                    amount: "$250/شهريًا",
                    benefits: ["جميع مزايا الرعاية الشاملة", "دعم طارئ على مدار الساعة", "أنشطة اجتماعية"],
                    btn: "اختر"
                }
            ],
            tiersBadge: "الأكثر شعبية",
            storiesTitle: "حياة لمسناها",
            stories: [
                {
                    image: '/Images/ellder1.jpg',
                    quote: '"خدمة توصيل الوجبات أنقذتني بعد جراحة الورك. لكن أكثر من الطعام، كان الشعور بأن هناك من يهتم هو ما أحدث الفرق."',
                    author: 'مارغريت، 82',
                    badge: 'مدعومة منذ 3 سنوات'
                },
                {
                    image: '/Images/elder22.jpg',
                    quote: '"كنت وحيدًا جدًا بعد وفاة زوجتي، لكن زيارات المتطوعين الأسبوعية أعطتني شيئًا أتطلع إليه من جديد."',
                    author: 'روبرت، 78',
                    badge: 'مدعوم منذ سنتين'
                },
                {
                    image: '/Images/elder3.jpg',
                    quote: '"بفضل خدمة النقل، يمكنني الذهاب لجميع مواعيدي الطبية دون أن أثقل على عائلتي."',
                    author: 'إيثيل، 85',
                    badge: 'مدعومة منذ سنة'
                }
            ],
            ctaTitle: "اصنع فرقًا في حياة كبير السن",
            ctaDesc: "دعمك يمكن أن يوفر الراحة والرعاية والرفقة لمن هم في أمس الحاجة إليها.",
            ctaDonate: "تبرع الآن",
            ctaVolunteer: "تطوع اليوم"
        },
        he: {
            heroTitle: "יוצרים מעגל תמיכה לקשישים",
            heroDesc: "אף קשיש לא צריך להתמודד עם הזקנה לבד.",
            heroBtn: "תרום עכשיו",
            promoTitle: "יוצרים מעגל תמיכה לקשישים",
            promoDesc: `אף קשיש לא צריך להתמודד עם הזקנה לבד. באמצעות רשתות מתנדבים, תוכניות משלוחי אוכל ויוזמות בטיחות בבית, אנו יוצרים רשת ביטחון קהילתית שמבטיחה שכל קשיש יקבל את התמיכה המעשית והחברתית שמגיעה לו.
            יצירת מעגל תמיכה לקשישים חיונית כדי להבטיח שהם יזדקנו בכבוד, בנוחות ובקשר. המודל מדגיש את חשיבות הקהילה, שיתוף הפעולה והתמיכה המקיפה בשיפור איכות החיים של אזרחים ותיקים. יוזמות כמו קבוצות עזרה עצמית לקשישים בהודו מקדמות הכללה פיננסית, מודעות לבריאות ומעורבות חברתית, ומטפחות תחושת קהילה ועצמאות. באופן דומה, פרויקט "ויומיתרם" בקרלה מציע מרפאות ניידות, טיפול פליאטיבי ודלפקי עזרה, ומספק שירותי בריאות נגישים לקשישים.`,
            promoBtn: "תרום עכשיו",
            servicesTitle: "השירותים המקיפים שלנו",
            services: [
                { icon: "🛒", title: "סיוע במכולת", desc: "עזרה וקניות שבועיות" },
                { icon: "💊", title: "ניהול תרופות", desc: "ארגון ותזכורות" },
                { icon: "🎨", title: "פעילויות חברתיות", desc: "אמנות, משחקים וטיולים" },
                { icon: "🚗", title: "הסעות", desc: "הסעות למרפאות רפואיות" }
            ],
            tiersTitle: "איך אפשר לעזור",
            tiers: [
                {
                    title: "צרכים בסיסיים",
                    amount: "$50/חודש",
                    benefits: ["משלוחי מכולת שבועיים", "תזכורות לתרופות"],
                    btn: "בחר"
                },
                {
                    title: "טיפול מקיף",
                    amount: "$120/חודש",
                    benefits: ["כל יתרונות הצרכים הבסיסיים", "ביקורי רופא חודשיים", "הערכת בטיחות בבית"],
                    btn: "בחר",
                    featured: true
                },
                {
                    title: "תמיכה מלאה",
                    amount: "$250/חודש",
                    benefits: ["כל יתרונות הטיפול המקיף", "תמיכה חירום 24/7", "פעילויות חברתיות"],
                    btn: "בחר"
                }
            ],
            tiersBadge: "הכי פופולרי",
            storiesTitle: "חיים שנגענו בהם",
            stories: [
                {
                    image: '/Images/ellder1.jpg',
                    quote: '"שירות משלוחי האוכל הציל אותי אחרי ניתוח הירך. אבל יותר מהאוכל, הידיעה שמישהו דואג עשתה את ההבדל."',
                    author: 'מרגרט, 82',
                    badge: 'נתמכת 3 שנים'
                },
                {
                    image: '/Images/elder22.jpg',
                    quote: '"הייתי כל כך בודד אחרי שאשתי נפטרה, אבל הביקורים השבועיים של המתנדבים נתנו לי למה לצפות שוב."',
                    author: 'רוברט, 78',
                    badge: 'נתמך שנתיים'
                },
                {
                    image: '/Images/elder3.jpg',
                    quote: '"בזכות שירות ההסעות, אני יכול להגיע לכל התורים הרפואיים שלי בלי להכביד על המשפחה."',
                    author: 'אתל, 85',
                    badge: 'נתמכת שנה'
                }
            ],
            ctaTitle: "עשה שינוי בחייו של קשיש",
            ctaDesc: "התרומה שלך יכולה להעניק נוחות, טיפול וחברה למי שזקוק לכך ביותר.",
            ctaDonate: "תרום עכשיו",
            ctaVolunteer: "התנדב היום"
        }
    };

    const [currentSlide, setCurrentSlide] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);
    const [theme, setTheme] = useState('light');
    const { language } = useContext(LanguageContext);
    const translations = elderlyTranslations[language] || elderlyTranslations.en;

    useEffect(() => {
        let interval;
        if (isAutoPlaying) {
            interval = setInterval(() => {
                setCurrentSlide((prev) => (prev === translations.stories.length - 1 ? 0 : prev + 1));
            }, 5000);
        }
        return () => clearInterval(interval);
    }, [isAutoPlaying, translations.stories.length]);

    const goToSlide = (index) => {
        setCurrentSlide(index);
        setIsAutoPlaying(false);
        setTimeout(() => setIsAutoPlaying(true), 10000);
    };
      
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
        <div className={`elderly-care ${theme}`}>
            {/* Hero Section */}
            <section className="elder-hero" style={{ backgroundImage: 'url(/Images/elderly-care.jpg)' }}>
                <div className="hero-content">
                    <h1>{translations.heroTitle}</h1>
                    <p>{translations.heroDesc}</p>
                    <button className="hero-cta" onClick={() => handleGetStarted("/contact")}>{translations.heroBtn}</button>
                </div>
            </section>

            {/* Promo Section */}
            <div className="promo-container-elder">
                <div className="image-side-elder">
                    <img src="/Images/elderly-care.jpg" alt="Healing Hands" />
                </div>
                <div className="content-side-elder">
                    <div className="emotional-appeal-elder">
                        <h2>{translations.promoTitle}</h2>
                        <p style={{ textAlign: "justify" }}>
                            {translations.promoDesc}
                        </p>
                        <button className="donate-button" onClick={() => handleGetStarted("/contact")}>{translations.promoBtn}</button>
                    </div>
                </div>
            </div>

            {/* Services Section */}
            <section className="services-showcase">
                <h2 className="section-title">{translations.servicesTitle}</h2>
                <div className="services-grid">
                    {translations.services.map((service, index) => (
                        <div className="service-card" key={index}>
                            <div className="card-icon">{service.icon}</div>
                            <h3>{service.title}</h3>
                            <p>{service.desc}</p>
                        </div>
                    ))}
                </div>
            </section>
            
            <section className="donation-tiers">
                <div className="tiers-container">
                    <h2 className="section-title">{translations.tiersTitle}</h2>
                    <div className="tiers-grid">
                        {translations.tiers.map((tier, index) => (
                            <div className={`tier-card ${tier.featured ? 'featured' : ''}`} key={index}>
                                {tier.featured && <div className="featured-badge">{translations.tiersBadge}</div>}
                                <h3>{tier.title}</h3>
                                <p className="tier-amount">{tier.amount}</p>
                                <ul className="tier-benefits">
                                    {tier.benefits.map((benefit, i) => <li key={i}>{benefit}</li>)}
                                </ul>
                                <button className="tier-button" onClick={() => handleGetStarted("/contact")}>{tier.btn}</button>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Success Stories Carousel */}
            <section className="success-stories">
                <div className="stories-container">
                    <h2 className="section-title">{translations.storiesTitle}</h2>
                    <div className="story-carousel">
                        {translations.stories.map((story, index) => (
                            <div
                                className={`story-slide ${index === currentSlide ? 'active' : ''}`}
                                key={index}
                            >
                                <div
                                    className="story-image"
                                    style={{ backgroundImage: `url(${story.image})` }}
                                ></div>
                                <div className="story-content">
                                    <blockquote>{story.quote}</blockquote>
                                    <p className="story-author">- {story.author}</p>
                                    <div className="story-badge">{story.badge}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="carousel-dots">
                        {translations.stories.map((_, index) => (
                            <span
                                key={index}
                                className={`dot ${index === currentSlide ? 'active' : ''}`}
                                onClick={() => goToSlide(index)}
                            ></span>
                        ))}
                    </div>
                </div>
            </section>
            
            <section className="cta-section">
                <div className="cta-content">
                    <h2>{translations.ctaTitle}</h2>
                    <p>{translations.ctaDesc}</p>
                    <div className="cta-buttons">
                        <button className="cta-btn donate" onClick={() => handleGetStarted("/contact")}>{translations.ctaDonate}</button>
                        <button className="cta-btn volunteer" onClick={() => handleGetStarted("/contact")}>{translations.ctaVolunteer}</button>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ElderlyCare;