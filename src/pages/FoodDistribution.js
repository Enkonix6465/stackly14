import { motion } from 'framer-motion';
import './FoodDistribution.css';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import { LanguageContext } from '../components/Header'; // adjust path if needed

const foodTranslations = {
  en: {
    heroTitle: "Nourishing Communities",
    heroDesc: "Fighting hunger one meal at a time with dignity and compassion",
    heroBtn: "Donate Now",
    promoTitle: "Hunger stops here – lend your support",
    promoDesc: `Food distribution organizations—whether community food banks, public systems, or donor-driven charities—play a vital role in bridging the gap between excess and need, turning potential waste into nourishment for vulnerable populations. By collecting surplus food from farms, retailers, restaurants, or wholesalers, these organizations ensure timely redistribution to those facing hunger or food insecurity.
Beyond addressing immediate hunger, efficient distribution preserves nutritional value
A compelling example is Assam's "Zero Waste, Zero Hunger" initiative—where hygienic surplus from eateries is collected daily, inspected, repackaged, and distributed to over 100 homeless individuals, exemplifying how local efforts successfully reduce food waste and support social equity.`,
    promoBtn: "Donate Now",
    stats: [
      { number1: "10,000+", label: "Meals Served" },
      { number1: "25", label: "Community Partners" },
      { number1: "500+", label: "Volunteers" },
      { number1: "100%", label: "Donation Impact" }
    ],
    overviewTitle: "Our Food Distribution Mission",
    overviewDesc1: "We rescue surplus food—from farms, supermarkets, and communal donors—and deliver it directly to the tables of families, seniors, refugees, and individuals facing food insecurity in our community.",
    overviewDesc2: "Each week, our teams sort, package, and send fresh, nutritious meals to local shelters, community centers, and schools. With every delivery, we're not just combating hunger—we're preserving dignity, nourishing hope, and minimizing waste.",
    overviewList: [
      "Reduce Waste & Nourish Communities: Valuable surplus is transformed into wholesome meals.",
      "Efficient and Caring Network: Driven by volunteers, powered by collaboration.",
      "Building Stronger Communities: Feeding families today while planting seeds for tomorrow."
    ],
    programsTitle: "Our Food Programs",
    programsDesc: "Comprehensive solutions to combat hunger",
    programs: [
      { icon: "🍎", title: "School Nutrition", desc: "Daily meals for children in underserved schools" },
      { icon: "🛒", title: "Food Pantries", desc: "Weekly grocery distributions for families" },
      { icon: "🚚", title: "Mobile Deliveries", desc: "Food delivery to homebound seniors" },
      { icon: "🌱", title: "Urban Gardens", desc: "Fresh produce from community gardens" }
    ],
    driveTitle: "Host a Food Drive",
    driveDesc: "Organize a collection in your neighborhood, school, or workplace",
    driveList: [
      "Get a starter kit with materials",
      "We provide collection bins",
      "Free pickup service"
    ],
    driveBtn: "Get Started"
  },
  ar: {
    heroTitle: "تغذية المجتمعات",
    heroDesc: "محاربة الجوع وجبة تلو الأخرى بكرامة وتعاطف",
    heroBtn: "تبرع الآن",
    promoTitle: "الجوع يتوقف هنا – قدم دعمك",
    promoDesc: `تلعب منظمات توزيع الطعام—سواء بنوك الطعام المجتمعية أو الأنظمة العامة أو الجمعيات الخيرية—دوراً حيوياً في سد الفجوة بين الفائض والحاجة، وتحويل الهدر المحتمل إلى غذاء للفئات الضعيفة. من خلال جمع الفائض من المزارع والمتاجر والمطاعم، تضمن هذه المنظمات إعادة توزيع الطعام في الوقت المناسب لمن يواجهون الجوع أو انعدام الأمن الغذائي.
إلى جانب معالجة الجوع الفوري، يحافظ التوزيع الفعال على القيمة الغذائية من خلال النقل والتخزين السريع، مما يساعد في الوقاية من سوء التغذية وتلبية الاحتياجات الغذائية المتنوعة.
مثال ملهم هو مبادرة "لا هدر، لا جوع" في آسام—حيث يتم جمع الفائض الصحي من المطاعم يومياً، فحصه، إعادة تعبئته، وتوزيعه على أكثر من 100 شخص بلا مأوى، مما يوضح كيف تقلل الجهود المحلية من هدر الطعام وتدعم العدالة الاجتماعية.`,
    promoBtn: "تبرع الآن",
    stats: [
      { number1: "10,000+", label: "وجبات مقدمة" },
      { number1: "25", label: "شركاء المجتمع" },
      { number1: "500+", label: "متطوعون" },
      { number1: "100%", label: "تأثير التبرعات" }
    ],
    overviewTitle: "مهمتنا في توزيع الطعام",
    overviewDesc1: "نقوم بإنقاذ الفائض من الطعام من المزارع والمتاجر والمتبرعين ونوصله مباشرة إلى الأسر وكبار السن واللاجئين والأفراد الذين يواجهون انعدام الأمن الغذائي في مجتمعنا.",
    overviewDesc2: "كل أسبوع، يقوم فريقنا بفرز وتعبئة وإرسال وجبات مغذية وطازجة إلى الملاجئ والمراكز المجتمعية والمدارس المحلية. مع كل عملية تسليم، لا نحارب الجوع فقط—بل نحافظ على الكرامة ونغذي الأمل ونقلل الهدر.",
    overviewList: [
      "تقليل الهدر وتغذية المجتمعات: تحويل الفائض إلى وجبات صحية.",
      "شبكة فعالة ومهتمة: يقودها المتطوعون، وتدعمها التعاونيات.",
      "بناء مجتمعات أقوى: إطعام الأسر اليوم وزراعة بذور الغد."
    ],
    programsTitle: "برامجنا الغذائية",
    programsDesc: "حلول شاملة لمحاربة الجوع",
    programs: [
      { icon: "🍎", title: "تغذية المدارس", desc: "وجبات يومية للأطفال في المدارس المحرومة" },
      { icon: "🛒", title: "مخازن الطعام", desc: "توزيع البقالة أسبوعياً للأسر" },
      { icon: "🚚", title: "توصيل الطعام", desc: "توصيل الطعام لكبار السن في المنازل" },
      { icon: "🌱", title: "حدائق المدن", desc: "منتجات طازجة من حدائق المجتمع" }
    ],
    driveTitle: "نظم حملة توزيع طعام",
    driveDesc: "نظم جمع الطعام في حيّك أو مدرستك أو مكان عملك",
    driveList: [
      "احصل على مجموعة بداية بالمواد",
      "نوفر صناديق جمع الطعام",
      "خدمة الاستلام المجانية"
    ],
    driveBtn: "ابدأ الآن"
  },
  he: {
    heroTitle: "מזינים קהילות",
    heroDesc: "נלחמים ברעב, ארוחה אחת בכל פעם, בכבוד ובחמלה",
    heroBtn: "תרום עכשיו",
    promoTitle: "הרעב נעצר כאן – תן את תמיכתך",
    promoDesc: `ארגוני חלוקת מזון—בנקי מזון קהילתיים, מערכות ציבוריות או עמותות—ממלאים תפקיד חיוני בגישור בין עודפים לצורך, והופכים בזבוז פוטנציאלי לתזונה לאוכלוסיות מוחלשות. איסוף עודפי מזון מחוות, חנויות, מסעדות או סיטונאים מאפשר חלוקה מהירה למי שמתמודד עם רעב או חוסר ביטחון תזונתי.
מעבר לטיפול ברעב מיידי, חלוקה יעילה שומרת על ערך תזונתי באמצעות הובלה ואחסון מהירים, ומסייעת במניעת תת-תזונה ומענה לצרכים מגוונים.
דוגמה מעוררת השראה היא יוזמת "אפס בזבוז, אפס רעב" באסאם—עודפים נקיים ממסעדות נאספים מדי יום, נבדקים, נארזים מחדש ומחולקים ליותר מ-100 חסרי בית, וממחישים כיצד מאמצים מקומיים מפחיתים בזבוז מזון ותומכים בשוויון חברתי.`,
    promoBtn: "תרום עכשיו",
    stats: [
      { number1: "10,000+", label: "ארוחות חולקו" },
      { number1: "25", label: "שותפי קהילה" },
      { number1: "500+", label: "מתנדבים" },
      { number1: "100%", label: "השפעת התרומות" }
    ],
    overviewTitle: "משימת חלוקת המזון שלנו",
    overviewDesc1: "אנו מצילים עודפי מזון מחוות, סופרמרקטים ותורמים ומעבירים אותם ישירות לשולחנות משפחות, קשישים, פליטים ואנשים המתמודדים עם חוסר ביטחון תזונתי בקהילה.",
    overviewDesc2: "בכל שבוע, הצוותים שלנו ממיינים, אורזים ושולחים ארוחות מזינות וטריות למקלטים, מרכזים קהילתיים ובתי ספר. בכל משלוח, אנו לא רק נלחמים ברעב—אנו שומרים על כבוד, מזינים תקווה ומפחיתים בזבוז.",
    overviewList: [
      "הפחתת בזבוז ומזון לקהילות: עודפים הופכים לארוחות מזינות.",
      "רשת יעילה ואכפתית: מונעת על ידי מתנדבים, מופעלת בשיתוף פעולה.",
      "בניית קהילות חזקות: מזינים משפחות היום ושותלים זרעים למחר."
    ],
    programsTitle: "תוכניות המזון שלנו",
    programsDesc: "פתרונות מקיפים למאבק ברעב",
    programs: [
      { icon: "🍎", title: "תזונת בתי ספר", desc: "ארוחות יומיות לילדים בבתי ספר מוחלשים" },
      { icon: "🛒", title: "מחסני מזון", desc: "חלוקת מצרכים שבועית למשפחות" },
      { icon: "🚚", title: "משלוחים ניידים", desc: "משלוחי מזון לקשישים בביתם" },
      { icon: "🌱", title: "גינות עירוניות", desc: "תוצרת טרייה מגינות קהילתיות" }
    ],
    driveTitle: "ארגן מבצע מזון",
    driveDesc: "ארגן איסוף בשכונה, בבית הספר או במקום העבודה",
    driveList: [
      "קבל ערכת התחלה עם חומרים",
      "אנו מספקים מיכלי איסוף",
      "שירות איסוף חינם"
    ],
    driveBtn: "התחל"
  }
};

const FoodDistribution = () => {
    const navigate = useNavigate();
    const [theme, setTheme] = useState('light');
    const { language } = useContext(LanguageContext);
    
    const fallback = foodTranslations.en;
    const content = foodTranslations[language] || fallback;

    function get(key) {
      return content[key] || fallback[key];
    }

    const stats = Array.isArray(get('stats')) ? get('stats') : [];
    const overviewList = Array.isArray(get('overviewList')) ? get('overviewList') : [];
    const programs = Array.isArray(get('programs')) ? get('programs') : [];
    const driveList = Array.isArray(get('driveList')) ? get('driveList') : [];

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

    const handleGetStarted = (path) => {
        navigate(path);
    };

    return (
        <div className={`food-distribution ${theme}`}>
            {/* Hero Section */}
            <section className="hero-section">
                <div className="container">
                    <div className="text-content">
                        <h1>{get('heroTitle')}</h1>
                        <p>{get('heroDesc')}</p>
                        <button onClick={() => handleGetStarted("/donate")}>{get('heroBtn')}</button>
                    </div>
                    <div className="image-content">
                        <motion.img 
                            src="/Images/hero-image.jpg" 
                            alt="Hero Image"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 1 }}
                        />
                    </div>
                </div>
            </section>

            {/* Promo Section */}
            <section className="promo-section">
                <div className="container">
                    <h2 style={{ color: theme === 'light' ? 'black' : 'white' }}>{get('promoTitle')}</h2>
                    <p style={{ color: theme === 'light' ? 'black' : 'white', textAlign: "justify" }}>{get('promoDesc')}</p>
                    <button 
                        style={{ color: theme === 'light' ? 'black' : 'white' }} 
                        onClick={() => handleGetStarted("/donate")}
                    >
                        {get('promoBtn')}
                    </button>
                </div>
            </section>

            {/* Stats Section */}
            <section className="stats-section">
                <div className="container">
                    <div className="stats-grid">
                        {stats.map((stat, index) => (
                            <div className="stat-item" key={index}>
                                <h3>{stat.number1}</h3>
                                <p>{stat.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Overview Section */}
            <section className="overview-section">
                <div className="container">
                    <h2>{get('overviewTitle')}</h2>
                    <p>{get('overviewDesc1')}</p>
                    <p>{get('overviewDesc2')}</p>
                    <ul>
                      {overviewList.map((item, idx) => <li key={idx}>{item}</li>)}
                    </ul>
                </div>
            </section>

            {/* Programs Section */}
            <section className="programs-section">
                <div className="container">
                    <h2>{get('programsTitle')}</h2>
                    <p>{get('programsDesc')}</p>
                    <div className="programs-grid">
                      {programs.map((program, idx) => (
                        <div className="program-card" key={idx}>
                          <div className="icon">{program.icon}</div>
                          <h3>{program.title}</h3>
                          <p>{program.desc}</p>
                        </div>
                      ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="food-drive-section">
                <div className="container">
                    <div className="content-col">
                        <h2>{get('driveTitle')}</h2>
                        <p>{get('driveDesc')}</p>
                        <ul>
                          {driveList.map((item, idx) => <li key={idx}>{item}</li>)}
                        </ul>
                        <button className="cta-btn" onClick={() => handleGetStarted("/contact")}>
                            {get('driveBtn')}
                        </button>
                    </div>
                    <div className="image-col">
                        <img src="/Images/food-drive.jpg" alt="Community food drive" />
                    </div>
                </div>
            </section>
        </div>
    );
};

export default FoodDistribution;