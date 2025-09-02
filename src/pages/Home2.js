import React, { useContext } from 'react';
import Slider from 'react-slick';
import './Home2.css';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { LanguageContext } from '../components/Header'; // Correct import

const home2Translations = {
  en: {
    heroTitle: 'Empowering Lives Through Technology and Compassion',
    heroDesc: 'Join us in making a difference. Explore our initiatives and see how you can help.',
    getStarted: 'Get Started',
    impactTitle: 'How Your Support Creates Lasting Change',
    impactDesc: 'Transparency in every step of our mission',
    steps: [
      {
        title: 'Identify Needs',
        desc: 'Effective charitable work begins with a clear and evidence-based understanding of the needs you\'re aiming to address.',
      },
      {
        title: 'Designing Sustainable Solutions',
        desc: 'At the heart of our mission lies the commitment to create solutions that are not only effective but also enduring.',
      },
      {
        title: 'Mobilizing Resources & Support',
        desc: 'At the core of our mission is the belief that lasting change is achieved through collective effort.',
      },
      {
        title: 'Implementing Programs',
        desc: 'At the core of our mission lies the commitment to create solutions that are not only effective but also enduring.',
        button: 'See 2024 Impact Report →',
      },
    ],
    cardSectionTitle: 'Where Compassion Meets Action.',
    cardSectionDesc: 'Explore the impact stories from our supported initiatives.',
    cards: [
      {
        img: '/Images/tech-rural.jpg',
        text: 'Tech for Rural Schools',
        text2: 'Bridging the digital divide with laptops and WiFi for 100 remote schools. Education should not have a zip code limit.',
      },
      {
        img: '/Images/weelchair.jpg',
        text: 'Wheelchair Access Initiative',
        text2: 'Building ramps and accessible facilities in public spaces. Mobility is a right, not a privilege.',
      },
      {
        img: '/Images/mentorship.jpg',
        text: 'Foster Youth Mentorship',
        text2: 'Matching teens aging out of foster care with career mentors and housing support.',
      },
      {
        img: '/Images/distaster.jpg',
        text: 'Disaster Tech Response',
        text2: 'Deploying drones to deliver medicines and map crisis zones within hours of emergencies.',
      },
    ],
    partnersTitle: 'OUR PARTNERS IN CHANGE',
    upcomingTitle: 'Our Upcoming Programs',
    upcomingDesc: 'Be part of our mission—discover how you can make a difference next.',
    programs: [
      {
        title: 'Community Health Camp',
        date: 'September 20, 2025',
        description: 'Free health check-ups and consultation in rural areas.',
        image: '/Images/health-camp.jpg',
      },
      {
        title: 'Green Tree Plantation Drive',
        date: 'October 5, 2025',
        description: 'Join us to plant 5,000 trees in urban localities.',
        image: '/images/green-tree.jpg',
      },
      {
        title: 'Digital Literacy Workshop',
        date: 'November 10, 2025',
        description: 'Empowering senior citizens with basic computer skills.',
        image: '/images/digital literacy.jpg',
      },
    ],
    contactTitle: 'Your Perfect Home Starts with a Conversation',
    contactDesc: "Finding your dream home isn't just about listings—it's about understanding your unique needs, preferences, and aspirations.",
    contactBtn: 'Reach Out Today',
  },
  ar: {
    heroTitle: 'تمكين الأرواح من خلال التكنولوجيا والتعاطف',
    heroDesc: 'انضم إلينا في إحداث فرق. استكشف مبادراتنا وانظر كيف يمكنك المساعدة.',
    getStarted: 'ابدأ الآن',
    impactTitle: 'كيف يخلق دعمك تغييرًا دائمًا',
    impactDesc: 'الشفافية في كل خطوة من مهمتنا',
    steps: [
      {
        title: 'تحديد الاحتياجات',
        desc: 'يبدأ العمل الخيري الفعال بفهم واضح ومبني على الأدلة للاحتياجات التي تهدف إلى معالجتها.',
      },
      {
        title: 'تصميم حلول مستدامة',
        desc: 'في صميم مهمتنا تكمن الالتزام بخلق حلول ليست فعالة فحسب، بل دائمة أيضًا.',
      },
      {
        title: 'ت mobilizing الموارد والدعم',
        desc: 'في جوهر مهمتنا تكمن القناعة بأن التغيير الدائم يتحقق من خلال الجهد الجماعي.',
      },
      {
        title: 'تنفيذ البرامج',
        desc: 'في صميم مهمتنا تكمن الالتزام بخلق حلول ليست فعالة فحسب، بل دائمة أيضًا.',
        button: 'شاهد تقرير تأثير 2024 →',
      },
    ],
    cardSectionTitle: 'حيث يلتقي التعاطف مع العمل.',
    cardSectionDesc: 'استكشف قصص التأثير من مبادراتنا المدعومة.',
    cards: [
      {
        img: '/Images/tech-rural.jpg',
        text: 'التكنولوجيا للمدارس الريفية',
        text2: 'سد الفجوة الرقمية من خلال توفير أجهزة الكمبيوتر المحمولة والواي فاي لـ 100 مدرسة نائية. يجب ألا تكون التعليمات محدودة برمز بريدي.',
      },
      {
        img: '/Images/weelchair.jpg',
        text: 'مبادرة الوصول إلى الكراسي المتحركة',
        text2: 'بناء منحدرات ومرافق يمكن الوصول إليها في الأماكن العامة. التنقل حق، وليس امتيازًا.',
      },
      {
        img: '/Images/mentorship.jpg',
        text: 'إرشاد الشباب في دور الرعاية',
        text2: 'مطابقة المراهقين الذين يخرجون من دور الرعاية مع مرشدين مهنيين ودعم سكني.',
      },
      {
        img: '/Images/distaster.jpg',
        text: 'استجابة التكنولوجيا للكوارث',
        text2: 'نشر الطائرات بدون طيار لتوصيل الأدوية ورسم خرائط لمناطق الأزمات في غضون ساعات من الطوارئ.',
      },
    ],
    partnersTitle: 'شركاؤنا في التغيير',
    upcomingTitle: 'برامجنا القادمة',
    upcomingDesc: 'كن جزءًا من مهمتنا - اكتشف كيف يمكنك إحداث فرق بعد ذلك.',
    programs: [
      {
        title: 'مخيم الصحة المجتمعية',
        date: '20 سبتمبر 2025',
        description: 'فحوصات صحية مجانية واستشارات في المناطق الريفية.',
        image: '/Images/health-camp.jpg',
      },
      {
        title: 'حملة زراعة الأشجار الخضراء',
        date: '5 أكتوبر 2025',
        description: 'انضم إلينا لزرع 5000 شجرة في المناطق الحضرية.',
        image: '/images/green-tree.jpg',
      },
      {
        title: 'ورشة عمل محو الأمية الرقمية',
        date: '10 نوفمبر 2025',
        description: 'تمكين كبار السن من مهارات الكمبيوتر الأساسية.',
        image: '/images/digital literacy.jpg',
      },
    ],
    contactTitle: 'منزلك المثالي يبدأ بمحادثة',
    contactDesc: 'إن العثور على منزل أحلامك لا يتعلق فقط بالقوائم - بل يتعلق بفهم احتياجاتك الفريدة وتفضيلاتك وطموحاتك.',
    contactBtn: 'تواصل معنا اليوم',
  },
  he: {
    heroTitle: 'העצמת חיים דרך טכנולוגיה וחמלה',
    heroDesc: 'הצטרפו אלינו לעשות הבדל. גלו את היוזמות שלנו וראו איך תוכלו לעזור.',
    getStarted: 'התחל עכשיו',
    impactTitle: 'איך התמיכה שלכם יוצרת שינוי מתמשך',
    impactDesc: 'שקיפות בכל שלב של המשימה שלנו',
    steps: [
      {
        title: 'זיהוי צרכים',
        desc: 'עבודה צדקה אפקטיבית מתחילה בהבנה ברורה ומבוססת ראיות של הצרכים שאתם שואפים לטפל בהם.',
      },
      {
        title: 'עיצוב פתרונות בני קיימא',
        desc: 'בלב המשימה שלנו טמון המחויבות ליצור פתרונות שלא רק שהם אפקטיביים אלא גם נמשכים.',
      },
      {
        title: 'גיוס משאבים ותמיכה',
        desc: 'בלב המשימה שלנו נמצאת האמונה ששינוי מתמשך מושג דרך מאמץ קולקטיבי.',
      },
      {
        title: 'יישום תוכניות',
        desc: 'בלב המשימה שלנו טמון המחויבות ליצור פתרונות שלא רק שהם אפקטיביים אלא גם נמשכים.',
        button: 'ראה את דוח ההשפעה של 2024 →',
      },
    ],
    cardSectionTitle: 'כאשר חמלה פוגשת פעולה.',
    cardSectionDesc: 'גלו את סיפורי ההשפעה מיוזמות התמיכה שלנו.',
    cards: [
      {
        img: '/Images/tech-rural.jpg',
        text: 'טכנולוגיה לבתי ספר כפריים',
        text2: 'סגירת הפער הדיגיטלי עם מחשבים ניידים ו-WiFi ל-100 בתי ספר מרוחקים. חינוך לא צריך להיות מוגבל על ידי קוד דואר.',
      },
      {
        img: '/Images/weelchair.jpg',
        text: 'יוזמת נגישות לכיסאות גלגלים',
        text2: 'בניית רמפות ומתקנים נגישים במקומות ציבוריים. ניידות היא זכות, לא privilege.',
      },
      {
        img: '/Images/mentorship.jpg',
        text: 'חונכות לנוער במשבר',
        text2: 'התאמת מתבגרים המתקשים לצאת ממסגרות הרווחה עם מנטורים לקריירה ותמיכה בדיור.',
      },
      {
        img: '/Images/distaster.jpg',
        text: 'תגובה טכנולוגית לאסונות',
        text2: 'פריסת רחפנים לספק תרופות ומפות אזורי משבר בתוך שעות מרגע החירום.',
      },
    ],
    partnersTitle: 'השותפים שלנו לשינוי',
    upcomingTitle: 'התוכניות הקרובות שלנו',
    upcomingDesc: 'היו חלק מהמשימה שלנו - גלו איך תוכלו לעשות הבדל הבא.',
    programs: [
      {
        title: 'מחנה בריאות קהילתי',
        date: '20 בספטמבר 2025',
        description: 'בדיקות בריאות חינם וייעוץ באזורים כפריים.',
        image: '/Images/health-camp.jpg',
      },
      {
        title: 'מיזם נטיעת עצים ירוקים',
        date: '5 באוקטובר 2025',
        description: 'הצטרפו אלינו לנטוע 5,000 עצים באזורים עירוניים.',
        image: '/images/green-tree.jpg',
      },
      {
        title: 'סדנת אוריינות דיגיטלית',
        date: '10 בנובמבר 2025',
        description: 'העצמת אזרחים ותיקים עם מיומנויות מחשב בסיסיות.',
        image: '/images/digital literacy.jpg',
      },
    ],
    contactTitle: 'הבית המושלם שלך מתחיל בשיחה',
    contactDesc: 'מציאת בית חלומותיך אינה עוסקת רק ברשימות - היא עוסקת בהבנת הצרכים, ההעדפות והשאיפות הייחודיות שלך.',
    contactBtn: 'צור קשר היום',
  }
};

const logos = [
  { src: '/Images/logo111.png', alt: 'Partner One' },
  { src: '/Images/sbi1.jpg', alt: 'Partner Two' },
  { src: '/images/ibm1.jpg', alt: 'Partner Three' },
  { src: '/images/infosys1.jpg', alt: 'Partner Four' },
  { src: '/images/tcs.jpg', alt: 'Partner Five' },
];

const settings = {
  infinite: true,
  slidesToShow: Math.min(logos.length, 5),
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 2000,
  arrows: false,
  responsive: [
    { breakpoint: 992, settings: { slidesToShow: Math.min(logos.length, 4) } },
    { breakpoint: 768, settings: { slidesToShow: Math.min(logos.length, 3) } },
    { breakpoint: 576, settings: { slidesToShow: Math.min(logos.length, 2) } },
  ],
};

const rtlLanguages = ["ar", "he"];

const Home2 = () => {
  const navigate = useNavigate();
  const [theme, setTheme] = useState('light');
  const { language } = useContext(LanguageContext);

  // RTL detection
  const isRTL = rtlLanguages.includes(language);

  const handleNavigate = (path) => () => {
    navigate(path);
  };

  // Load theme preference from localStorage on component mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
    document.body.className = `theme-${savedTheme}`;
  }, []);

  // Listen for theme changes
  useEffect(() => {
    const handleThemeChange = () => {
      const newTheme = localStorage.getItem('theme') || 'light';
      setTheme(newTheme);
      document.body.className = `theme-${newTheme}`;
    };
    
    // Listen for custom event and storage changes
    window.addEventListener('theme-changed', handleThemeChange);
    window.addEventListener('storage', handleThemeChange);
    
    return () => {
      window.removeEventListener('theme-changed', handleThemeChange);
      window.removeEventListener('storage', handleThemeChange);
    };
  }, []);

  return (
    <div
      className={`home2-container theme-${theme}`}
      style={{
        direction: isRTL ? "rtl" : "ltr",
        textAlign: isRTL ? "right" : "left",
      }}
    >
      {/* Hero Section */}
      <section className="hero-home2">
        <video className="hero-video-home2" src="/Images/home2.mp4" autoPlay loop muted playsInline />
        <div className="hero-overlay-home2">
          <h1>{home2Translations[language].heroTitle}</h1>
          <p>{home2Translations[language].heroDesc}</p>
          <div className="hero-buttons-home2">
            <button className="btn-home2" onClick={handleNavigate('/contact')}>
              {home2Translations[language].getStarted}
            </button>
          </div>
        </div>
      </section>

      {/* Impact Pathway Section */}
      <section className="impact-pathway">
        <div className="pathway-header">
          <h2>{home2Translations[language].impactTitle}</h2>
          <p>{home2Translations[language].impactDesc}</p>
        </div>
        <div className="pathway-steps">
          {home2Translations[language].steps.map((step, idx) => (
            <div key={idx} className={`step${idx % 2 === 1 ? ' step-reverse' : ''}`}>
              <div className="step-icon">{idx + 1}</div>
              <div className="step-content">
                <h3>{step.title}</h3>
                <p style={{ textAlign: 'justify' }}>{step.desc}</p>
                {idx === 3 && step.button && (
                  <button className="impact-button">
                    {step.button}
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Cards Section */}
      <section className="card-section py-5">
        <div className="container-fluid">
          <div className="text-center mb-4 px-3 px-md-5">
            <h2 className="section-title">{home2Translations[language].cardSectionTitle}</h2>
            <p className="section-desc">{home2Translations[language].cardSectionDesc}</p>
          </div>
          <div className="new-card row row-cols-1 row-cols-md-4 g-4 mx-0 px-3 px-md-5">
            {home2Translations[language].cards.map((card, idx) => (
              <div key={idx} className="col">
                <div className="card h-100 custom-card">
                  <img src={card.img} className="card-img-top" alt={`Card ${idx + 1}`} />
                  <div className="card-body">
                    <h3 className="card-title" style={{ fontSize: '20px' }}>{card.text}</h3>
                    <p className="card-text">{card.text2}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partners Carousel Section */}
      <section className="partners-section">
        <h2>{home2Translations[language].partnersTitle}</h2>
        <Slider {...settings} className="partners-slider">
          {logos.map((logo, idx) => (
            <div key={idx} className="logo-slide">
              <img src={logo.src} alt={logo.alt} className="logo-image" />
            </div>
          ))}
        </Slider>
      </section>
      
      {/* Upcoming Programs Section */}
      <section className="upcoming-programs-section-home2">
        <div className="content-wrapper text-center-home2">
          <h2>{home2Translations[language].upcomingTitle}</h2>
          <p style={{textAlign:"center"}}>{home2Translations[language].upcomingDesc}</p>
        </div>
        <div className="programs-grid-home2">
          {home2Translations[language].programs.map((program, idx) => (
            <div key={idx} className="program-card-home2">
              <img src={program.image} alt={program.title} className="program-image-home2" />
              <div className="program-info-home2">
                <h3>{program.title}</h3>
                <time>{program.date}</time>
                <p>{program.description}</p>
                <button className="btn btn-primary" style={{ backgroundColor: "#00CAE0" }} onClick={handleNavigate('/contact')}>
                  {home2Translations[language].getStarted}
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
      
      {/* Contact section */}
      <section className="contact-section">
        <h1>{home2Translations[language].contactTitle}</h1>
        <p>{home2Translations[language].contactDesc}</p>
        <button onClick={handleNavigate('/contact')}>
          {home2Translations[language].contactBtn}
        </button>
      </section>
    </div>
  ); 
};

export default Home2;