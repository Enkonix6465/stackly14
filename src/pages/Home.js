import React, { useState, useEffect, useContext } from "react";
import { LanguageContext } from "../components/Header";
import "./Home.css";
import { useNavigate } from 'react-router-dom';

// const data = [
//   {
//     name: 'James Pattinson',
//     text: '“Lobortis leo pretium facilisis amet nisi at nec. Scelerisque risus tortor donec ipsum consequat semper consequat adipiscing ultrices.”',
//     rating: 4,
//     imgSrc: 'Images/test1.jpg',
//   },
//   {
//     name: 'Greg Stuart',
//     text: '“Vestibulum, cum nam non amet consectetur morbi senectus condimentum eget. Ultricies integer nunc neque accumsan laoreet. Viverra nibh ultrices.”',
//     rating: 5,
//     imgSrc: 'Images/test2.jpg',
//   },
//   {
//     name: 'Trevor Mitchell',
//     text: '“Ut tristique viverra sed porttitor senectus. A facilisis metus pretium id habitant lorem. Velit vel bibendum eget aliquet sem nec, id sed. Tincidunt.”',
//     rating: 3,
//     imgSrc: 'Images/test3.jpg',
//   },
// ];

const programs = [
  {
    logo: 'Images/edu-logo.png',
    title: 'Education for All',
    tagline: 'Empowering Minds, Transforming Futures',
    description: 'Providing quality education to underprivileged children, ensuring a brighter tomorrow.',
  },
  {
    logo: 'Images/healthcare.png',
    title: 'Healthcare Access',
    tagline: 'Wellness for Every Community',
    description: 'Delivering essential healthcare services to remote and underserved areas.',
  },
  {
    logo: 'Images/clean-water.png',
    title: 'Clean Water Initiative',
    tagline: 'Quenching Thirst, Saving Lives',
    description: 'Installing sustainable water systems to combat water scarcity and improve hygiene.',
  },
  {
    logo: 'Images/food.png',
    title: 'Food Security Program',
    tagline: 'Nourishing Bodies, Strengthening',
    description: 'Distributing nutritious meals to families facing food insecurity.',
  },
  {
    logo: 'Images/shelter.png',
    title: 'Shelter for Homeless',
    tagline: 'Providing Roofs, Restoring Dignity',
    description: 'Offering safe and supportive housing solutions for the homeless.',
  },
  {
    logo: 'Images/mental-health.png',
    title: 'Mental Health Support',
    tagline: 'Healing Minds, Building Resilience',
    description: 'Offering counseling and support services to those affected by mental health issues.',
  },
  {
    logo: 'Images/youth.png',
    title: 'Youth Mentorship Program',
    tagline: 'Guiding Tomorrow\'s Leaders',
    description: 'Pairing young individuals with experienced mentors to provide guidance support..',
  },
  {
    logo: 'Images/clean-up.png',
    title: 'Community Clean-Up Initiative',
    tagline: 'Revitalizing Our Neighborhoods',
    description: 'Organizing regular clean-up events in local parks, streets, and public spaces.',
  },
];

const homeTranslations = {
  en: {
    heroTitle: "Give Hope, Change Lives",
    heroDesc: "Together we can make a difference. Join us in supporting those in need and building a brighter future.",
    donateNow: "Donate Now",
    greeting: "Welcome to a place where kindness changes lives",
    secHeroTitle: "Together, We Can Change Lives",
    secHeroDesc: `"Every act of kindness, no matter how small, has the power to transform lives. At Hope Foundation, we witness this truth every day as we work to create a brighter future for those in need. Whether it's providing nourishing meals to hungry families, safe shelter to those without homes, quality education to underserved children, or vital healthcare to vulnerable communities, each gesture of support creates ripples of hope. We've seen how a single meal can restore strength, how one school uniform can renew dignity, and how access to medical care can save generations. But the challenges remain great - too many still face hunger, homelessness, and hardship. That's why we need you. Your contribution, whether through donating, volunteering, or simply spreading awareness, becomes part of something greater. Together, we're not just offering temporary relief; we're building pathways out of poverty, empowering individuals to rewrite their stories, and planting seeds of lasting change in communities. When compassionate people unite, miracles happen. Join us in this movement of hope - because every life touched, every family lifted, and every community transformed begins with someone like you saying, 'I can help.' The need is urgent, but the solution is within our reach when we stand together."`,
    contactUs: "Contact Us",
    ourKeyPrograms: "Our Key Programs",
    ourImpact: "Our Impact",
    impactDesc: "Transforming lives through nourishment and education",
    joinMission: "Join Our Mission",
    seeOurWork: "See Our Work",
    testimonialsTitle: "What our clients say about us.",
    getQuote: "Get a Quote",
    contactTitle: "Your Call Can Save Lives.",
    contactText: "Your voice matters in our mission to create a better world. Whether you want to volunteer, partner with us, or simply learn more about our work, we'd love to hear from you. Together, we can turn compassion into action—one connection at a time. Drop us a message, call our team, or visit our offices. Let's start making a difference today.",
    getStarted: "Get Started",
    programs: [
      {
        title: "Education for All",
        tagline: "Empowering Minds, Transforming Futures",
        description: "Providing quality education to underprivileged children, ensuring a brighter tomorrow."
      },
      {
        title: "Healthcare Access",
        tagline: "Wellness for Every Community",
        description: "Delivering essential healthcare services to remote and underserved areas."
      },
      {
        title: "Clean Water Initiative",
        tagline: "Quenching Thirst, Saving Lives",
        description: "Installing sustainable water systems to combat water scarcity and improve hygiene."
      },
      {
        title: "Food Security Program",
        tagline: "Nourishing Bodies, Strengthening",
        description: "Distributing nutritious meals to families facing food insecurity."
      },
      {
        title: "Shelter for Homeless",
        tagline: "Providing Roofs, Restoring Dignity",
        description: "Offering safe and supportive housing solutions for the homeless."
      },
      {
        title: "Mental Health Support",
        tagline: "Healing Minds, Building Resilience",
        description: "Offering counseling and support services to those affected by mental health issues."
      },
      {
        title: "Youth Mentorship Program",
        tagline: "Guiding Tomorrow's Leaders",
        description: "Pairing young individuals with experienced mentors to provide guidance and support."
      },
      {
        title: "Community Clean-Up Initiative",
        tagline: "Revitalizing Our Neighborhoods",
        description: "Organizing regular clean-up events in local parks, streets, and public spaces."
      }
    ],
    testimonials: [
      {
        name: 'James Pattinson',
        text: '“Lobortis leo pretium facilisis amet nisi at nec. Scelerisque risus tortor donec ipsum consequat semper consequat adipiscing ultrices.”',
        rating: 4,
        imgSrc: 'Images/test1.jpg',
      },
      {
        name: 'Greg Stuart',
        text: '“Vestibulum, cum nam non amet consectetur morbi senectus condimentum eget. Ultricies integer nunc neque accumsan laoreet. Viverra nibh ultrices.”',
        rating: 5,
        imgSrc: 'Images/test2.jpg',
      },
      {
        name: 'Trevor Mitchell',
        text: '“Ut tristique viverra sed porttitor senectus. A facilisis metus pretium id habitant lorem. Velit vel bibendum eget aliquet sem nec, id sed. Tincidunt.”',
        rating: 3,
        imgSrc: 'Images/test3.jpg',
      },
    ]
  },
  ar: {
    heroTitle: "امنح الأمل، غيّر الحياة",
    heroDesc: "معًا يمكننا إحداث فرق. انضم إلينا لدعم المحتاجين وبناء مستقبل أكثر إشراقًا.",
    donateNow: "تبرع الآن",
    greeting: "مرحبًا بك في مكان حيث تغير اللطف الحياة",
    secHeroTitle: "معًا، يمكننا تغيير الحياة",
    secHeroDesc: `"كل عمل لطف، مهما كان صغيرًا، لديه القدرة على تغيير الحياة. في مؤسسة الأمل، نشهد هذه الحقيقة كل يوم بينما نعمل على خلق مستقبل أكثر إشراقًا لمن هم بحاجة. سواء كان ذلك بتوفير وجبات مغذية للعائلات الجائعة، أو مأوى آمن لمن بلا مأوى، أو تعليم جيد للأطفال المحرومين، أو رعاية صحية حيوية للمجتمعات الضعيفة، كل لفتة دعم تخلق موجات من الأمل. لقد رأينا كيف يمكن لوجبة واحدة أن تعيد القوة، وكيف يمكن لزي مدرسي واحد أن يجدد الكرامة، وكيف يمكن أن ينقذ الوصول إلى الرعاية الطبية أجيالًا. لكن التحديات لا تزال كبيرة - الكثيرون لا يزالون يواجهون الجوع والتشرد والمشقة. لهذا السبب نحتاج إليك. مساهمتك، سواء من خلال التبرع أو التطوع أو مجرد نشر الوعي، تصبح جزءًا من شيء أكبر. معًا، نحن لا نقدم راحة مؤقتة فقط؛ نحن نبني طرقًا للخروج من الفقر، ونمكّن الأفراد من إعادة كتابة قصصهم، ونزرع بذور التغيير الدائم في المجتمعات. عندما يتحد الأشخاص المتعاطفون، تحدث المعجزات. انضم إلينا في هذه الحركة من الأمل - لأن كل حياة تمس، وكل عائلة تُرفع، وكل مجتمع يتحول يبدأ بشخص مثلك يقول: 'يمكنني المساعدة.' الحاجة ملحة، لكن الحل في متناولنا عندما نقف معًا."`,
    contactUs: "اتصل بنا",
    ourKeyPrograms: "برامجنا الرئيسية",
    ourImpact: "تأثيرنا",
    impactDesc: "تغيير الحياة من خلال التغذية والتعليم",
    joinMission: "انضم إلى مهمتنا",
    seeOurWork: "شاهد أعمالنا",
    testimonialsTitle: "ماذا يقول عملاؤنا عنا.",
    getQuote: "احصل على عرض سعر",
    contactTitle: "اتصالك يمكن أن ينقذ الأرواح.",
    contactText: "صوتك مهم في مهمتنا لخلق عالم أفضل. سواء كنت ترغب في التطوع، أو الشراكة معنا، أو ببساطة معرفة المزيد عن عملنا، يسعدنا التواصل معك. معًا، يمكننا تحويل التعاطف إلى عمل - اتصال واحد في كل مرة. أرسل لنا رسالة، اتصل بفريقنا، أو زر مكاتبنا. لنبدأ في إحداث فرق اليوم.",
    getStarted: "ابدأ الآن",
    programs: [
      {
        title: "التعليم للجميع",
        tagline: "تمكين العقول، تغيير المستقبل",
        description: "توفير التعليم الجيد للأطفال المحرومين لضمان غد أكثر إشراقًا."
      },
      {
        title: "الوصول إلى الرعاية الصحية",
        tagline: "الصحة لكل مجتمع",
        description: "تقديم خدمات الرعاية الصحية الأساسية للمناطق النائية والمحرومة."
      },
      {
        title: "مبادرة المياه النظيفة",
        tagline: "إرواء العطش، إنقاذ الأرواح",
        description: "تركيب أنظمة مياه مستدامة لمكافحة ندرة المياه وتحسين النظافة."
      },
      {
        title: "برنامج الأمن الغذائي",
        tagline: "تغذية الأجسام، تقوية المجتمع",
        description: "توزيع وجبات مغذية للعائلات التي تواجه انعدام الأمن الغذائي."
      },
      {
        title: "مأوى للمشردين",
        tagline: "توفير السكن، استعادة الكرامة",
        description: "تقديم حلول سكنية آمنة وداعمة للمشردين."
      },
      {
        title: "دعم الصحة النفسية",
        tagline: "شفاء العقول، بناء المرونة",
        description: "تقديم خدمات الإرشاد والدعم لمن يعانون من مشاكل الصحة النفسية."
      },
      {
        title: "برنامج إرشاد الشباب",
        tagline: "توجيه قادة الغد",
        description: "ربط الشباب بأشخاص ذوي خبرة لتقديم الإرشاد والدعم."
      },
      {
        title: "مبادرة تنظيف المجتمع",
        tagline: "تنشيط أحيائنا",
        description: "تنظيم فعاليات تنظيف منتظمة في الحدائق والشوارع والأماكن العامة."
      }
    ],
    testimonials: [
      {
        name: 'جيمس باتينسون',
        text: '“لوبورتيس ليو بريتيوم فاسيليسيس أميت نيسي. سكيليريسك ريسوس تورتور دونك إيبسوم كونسيكوات سيمبر أدبيسينج أولتريسيس.”',
        rating: 4,
        imgSrc: 'Images/test1.jpg',
      },
      {
        name: 'جريج ستيوارت',
        text: '“فيستيبولوم، كم نام نون أميت كونسيكتيتور موربي سينكتوس كونديمينتوم إيجيت. أولتريسيس إنتيجر نونك نيكي أكومسان لوريت. فيفيرا نيبه أولتريسيس.”',
        rating: 5,
        imgSrc: 'Images/test2.jpg',
      },
      {
        name: 'تريفور ميتشل',
        text: '“يوت تريستيك فيفيرا سيد بورتتيتور سينكتوس. أ فاسيليسيس ميتوس بريتيوم إيد هابيتانت لوريم. فيليت فيلي بيبيندوم إيجت أليكيت سيم نيك، إيد سيد. تينسينت.”',
        rating: 3,
        imgSrc: 'Images/test3.jpg',
      },
    ]
  },
  he: {
    heroTitle: "תן תקווה, שנה חיים",
    heroDesc: "ביחד נוכל לעשות שינוי. הצטרף אלינו לתמיכה בנזקקים ולבניית עתיד טוב יותר.",
    donateNow: "תרום עכשיו",
    greeting: "ברוך הבא למקום שבו טוב לב משנה חיים",
    secHeroTitle: "ביחד, נוכל לשנות חיים",
    secHeroDesc: `"כל מעשה טוב לב, קטן ככל שיהיה, יכול לשנות חיים. בקרן התקווה אנו עדים לכך מדי יום כשאנו פועלים ליצור עתיד טוב יותר לנזקקים. בין אם מדובר במתן ארוחות מזינות למשפחות רעבות, מקלט בטוח לחסרי בית, חינוך איכותי לילדים מוחלשים או טיפול רפואי חיוני לקהילות פגיעות, כל מחווה של תמיכה יוצרת גלי תקווה. ראינו כיצד ארוחה אחת יכולה להחזיר כוח, כיצד מדים לבית הספר יכולים להחזיר כבוד, וכיצד גישה לטיפול רפואי יכולה להציל דורות. אך האתגרים עדיין גדולים - רבים עדיין מתמודדים עם רעב, חוסר בית וקושי. לכן אנו זקוקים לך. תרומתך, בין אם בתרומה, בהתנדבות או פשוט בהפצת מודעות, הופכת לחלק ממשהו גדול יותר. יחד, אנו לא רק מעניקים הקלה זמנית; אנו בונים דרכים לצאת מהעוני, מעצימים אנשים לכתוב מחדש את סיפורם ושותלים זרעי שינוי מתמשך בקהילות. כאשר אנשים רחומים מתאחדים, מתרחשים ניסים. הצטרף אלינו לתנועת התקווה הזו - כי כל חיים שנוגעים בהם, כל משפחה שמרימים, וכל קהילה שהופכת מתחילה במישהו כמוך שאומר: 'אני יכול לעזור.' הצורך דחוף, אך הפתרון בהישג יד כשאנו עומדים יחד."`,
    contactUs: "צור קשר",
    ourKeyPrograms: "התוכניות המרכזיות שלנו",
    ourImpact: "ההשפעה שלנו",
    impactDesc: "משנים חיים באמצעות תזונה וחינוך",
    joinMission: "הצטרף למשימה שלנו",
    seeOurWork: "ראה את עבודתנו",
    testimonialsTitle: "מה הלקוחות שלנו אומרים עלינו.",
    getQuote: "קבל הצעת מחיר",
    contactTitle: "הטלפון שלך יכול להציל חיים.",
    contactText: "הקול שלך חשוב במשימתנו ליצור עולם טוב יותר. בין אם ברצונך להתנדב, לשתף פעולה איתנו או פשוט ללמוד עוד על עבודתנו, נשמח לשמוע ממך. יחד, נוכל להפוך חמלה לפעולה—חיבור אחד בכל פעם. שלח לנו הודעה, התקשר לצוות שלנו או בקר במשרדינו. בוא נתחיל לעשות שינוי היום.",
    getStarted: "התחל",
    programs: [
      {
        title: "חינוך לכולם",
        tagline: "העצמת מוחות, שינוי עתיד",
        description: "מתן חינוך איכותי לילדים מוחלשים, להבטחת עתיד טוב יותר."
      },
      {
        title: "גישה לבריאות",
        tagline: "בריאות לכל קהילה",
        description: "אספקת שירותי בריאות חיוניים לאזורים מרוחקים ומוחלשים."
      },
      {
        title: "יוזמת מים נקיים",
        tagline: "מרווים צמא, מצילים חיים",
        description: "התקנת מערכות מים ברות קיימא למאבק במחסור מים ולשיפור ההיגיינה."
      },
      {
        title: "תוכנית ביטחון תזונתי",
        tagline: "מזינים גופים, מחזקים קהילה",
        description: "הפצת ארוחות מזינות למשפחות המתמודדות עם חוסר ביטחון תזונתי."
      },
      {
        title: "מקלט לחסרי בית",
        tagline: "מספקים קורת גג, משיבים כבוד",
        description: "הצעת פתרונות דיור בטוחים ותומכים לחסרי בית."
      },
      {
        title: "תמיכה בבריאות הנפש",
        tagline: "מרפאים מוחות, בונים חוסן",
        description: "מתן ייעוץ ושירותי תמיכה לנפגעי בעיות בריאות הנפש."
      },
      {
        title: "תוכנית חונכות לנוער",
        tagline: "מנחים את מנהיגי המחר",
        description: "חיבור צעירים עם מנטורים מנוסים להכוונה ותמיכה."
      },
      {
        title: "יוזמת ניקיון קהילתית",
        tagline: "מחדשים את השכונות שלנו",
        description: "ארגון אירועי ניקיון קבועים בפארקים, רחובות ומקומות ציבוריים."
      }
    ],
    testimonials: [
      {
        name: 'ג\'יימס פטינסון',
        text: '“לובורטיס ליאו פריטיום פאסיליסיס אמת ניסי. סקלריסקה ריסוס טורטור דונק איפסום קונסקואט סמפר אדיפיסינג אולטריסס.”',
        rating: 4,
        imgSrc: 'Images/test1.jpg',
      },
      {
        name: 'גרג סטיוארט',
        text: '“וסטיבולום, קום נאם נון אמת קונסקטטור מורבי סנקסטוס קונדימנטום איגט. אולטריסיס אינטגר נונק נקה אקומסן לוריט. ויוורה ניבה אולטריסס.”',
        rating: 5,
        imgSrc: 'Images/test2.jpg',
      },
      {
        name: 'טרבור מיטשל',
        text: '“אוט טריסטיקה ויוורה סד פורטיטור סנקסטוס. א פאסיליסיס מטוס פריטיום איד הביטנט לורם. וליט ול ביבנדום איגט אליקוט סם נק, איד סד. טינצידונט.”',
        rating: 3,
        imgSrc: 'Images/test3.jpg',
      },
    ]
  }
};

const rtlLanguages = ["ar", "he"];

const Home = () => {
  const navigate = useNavigate();
  const [theme, setTheme] = useState('light');
  const { language } = useContext(LanguageContext);

  // Add RTL detection
  const isRTL = rtlLanguages.includes(language);

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
  
  const handleDonateNow = () => {
    navigate('/contact');
  };
  
  const handleContactUs = () => {
    navigate('/contact');
  };
  
  const handleJoinMission = () => {
    navigate('/Aboutus');
  };
  
  const handleSeeOurWork = () => {
    navigate('/services');
  };
  
  const handleGetQuote = () => {
    navigate('/contact');
  };

  return (
    <>
      <div
        className={`hero-container ${theme === 'dark' ? 'dark' : ''}`}
        style={{
          direction: isRTL ? "rtl" : "ltr",
          textAlign: isRTL ? "right" : "left",
        }}
      >
        <video className="hero-video" autoPlay loop muted>
          <source src="/Images/herohome.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="hero-content">
          <h1 className={theme === 'dark' ? 'text-white' : ''}>{homeTranslations[language].heroTitle}</h1>
          <p className="text-white">{homeTranslations[language].heroDesc}</p>
          <button className="hero-btn" onClick={handleDonateNow}>{homeTranslations[language].donateNow}</button>
        </div>
      </div>
      
      {/* Second Section */}
      <section
        className={`second-container ${theme === 'dark' ? 'dark' : ''}`}
        style={{
          direction: isRTL ? "rtl" : "ltr",
          textAlign: isRTL ? "right" : "left",
        }}
      >
        <div className="second-content">
          <p className={`second-con-greeting ${theme === 'dark' ? 'text-white' : ''}`}>
            {homeTranslations[language].greeting}
          </p>
          <h1 className={`sec-hero-title ${theme === 'dark' ? 'text-white' : ''}`}>
            {homeTranslations[language].secHeroTitle}
          </h1>
          <p className={`sec-hero-description ${theme === 'dark' ? 'text-white' : ''}`}>
            {homeTranslations[language].secHeroDesc}
          </p>
          <button className="sec-hero-button" onClick={handleContactUs}>{homeTranslations[language].contactUs}</button>
        </div>
        <div className="hero-image-wrapper">
          <img
            src="Images/charityl.jpg"
            alt="Charity Event"
            className="hero-image"
          />
        </div>
      </section>
      
      {/* Third Section */}
      <section
        className={`programs-section ${theme === 'dark' ? 'dark' : ''}`}
        style={{
          direction: isRTL ? "rtl" : "ltr",
          textAlign: isRTL ? "right" : "left",
        }}
      >
        <h2 className={`programs-title ${theme === 'dark' ? 'text-white' : ''}`}>{homeTranslations[language].ourKeyPrograms}</h2>
        <div className="programs-grid">
          {programs.map((program, index) => (
            <div key={index} className={`program-card ${theme === 'dark' ? 'dark' : ''}`}>
              <img src={program.logo} alt={`${homeTranslations[language].programs[index].title} Logo`} className="program-logo" />
              <h3 className={`program-title ${theme === 'dark' ? 'text-white' : ''}`}>{homeTranslations[language].programs[index].title}</h3>
              <p className={`program-tagline ${theme === 'dark' ? 'text-white' : ''}`}>{homeTranslations[language].programs[index].tagline}</p>
              <p className={`program-desc ${theme === 'dark' ? 'text-white' : ''}`}>{homeTranslations[language].programs[index].description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Counter Section */}
      <section
        className={`charity-impact-home1 ${theme === 'dark' ? 'dark' : ''}`}
        style={{
          direction: isRTL ? "rtl" : "ltr",
          textAlign: isRTL ? "right" : "left",
        }}
      >
        <div className="impact-header-home1">
          <h2 className={theme === 'dark' ? 'text-white' : ''}>{homeTranslations[language].ourImpact}</h2>
          <p className={theme === 'dark' ? 'text-white' : ''}>{homeTranslations[language].impactDesc}</p>
        </div>

        <div className="impact-stats-home1">
          {[
            { number: '5M+', label: 'Meals Served Daily', desc: 'Across 12 Indian states' },
            { number: '20K+', label: 'Schools Reached', desc: 'Government and aided schools' },
            { number: '85%', label: 'Attendance Increase', desc: 'In partner schools' },
            { number: '1.8M', label: 'Children Empowered', desc: 'Since 2000' },
          ].map((stat, idx) => (
            <div key={idx} className={`stat-card-home1 ${theme === 'dark' ? 'dark' : ''}`}>
              <div className={`stat-number-home1 ${theme === 'dark' ? 'text-white' : ''}`}>{stat.number}</div>
              <div className={`stat-label-home1 ${theme === 'dark' ? 'text-white' : ''}`}>{stat.label}</div>
              <div className={`stat-desc-home1 ${theme === 'dark' ? 'text-white' : ''}`}>{stat.desc}</div>
            </div>
          ))}
        </div>

        <div className="impact-cta-home1">
          <button className="cta-button" onClick={handleJoinMission}>{homeTranslations[language].joinMission}</button>
          <button className={`secondary-button ${theme === 'dark' ? 'dark' : ''}`} onClick={handleSeeOurWork}>{homeTranslations[language].seeOurWork}</button>
        </div>
      </section>

      {/* Fifth Section */}
      <section
        className={`testimonials-fullscreen-home1 ${theme === 'dark' ? 'dark' : ''}`}
        style={{
          direction: isRTL ? "rtl" : "ltr",
          textAlign: isRTL ? "right" : "left",
        }}
      >
        <h2 className={`testimonials-title-home1 ${theme === 'dark' ? 'text-white' : ''}`}>{homeTranslations[language].testimonialsTitle}</h2>
        <div className="testimonials-container-home1">
          {homeTranslations[language].testimonials.map((item, idx) => (
            <div key={idx} className={`testimonial-card-home1 ${theme === 'dark' ? 'dark' : ''}`}>
              <img src={item.imgSrc} alt={item.name} className="testimonial-photo-home1" />
              <h3 className={`testimonial-name-home1 ${theme === 'dark' ? 'text-white' : ''}`}>{item.name}</h3>
              <div className="testimonial-stars-home1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <span key={i} className={i < item.rating ? 'star filled' : 'star'}>★</span>
                ))}
              </div>
              <p className={`testimonial-text-home1 ${theme === 'dark' ? 'text-white' : ''}`}>{item.text}</p>
            </div>
          ))}
        </div>
        <button className="testimonial-btn-home1" onClick={handleGetQuote}>{homeTranslations[language].getQuote}</button>
      </section>
      
      {/* Contact Section */}
      <section
        className={`contact-section-home1 ${theme === 'dark' ? 'dark' : ''}`}
        style={{
          direction: isRTL ? "rtl" : "ltr",
          textAlign: isRTL ? "right" : "left",
        }}
      >
        <div className="container-fluid p-0">
          <div className="row no-gutters align-items-center">
            
            {/* Image Side */}
            <div className="col-md-6">
              <img
                src="/Images/contact-for-home.jpg"
                alt="Support person"
                className="img-fluid w-100"
              />
            </div>

            {/* Content Side */}
            <div className="col-md-6 ">
              <div className="p-5">
                <h2 className={`contact-title ${theme === 'dark' ? 'text-white' : ''}`}>{homeTranslations[language].contactTitle}</h2>
                <p className={`contact-text ${theme === 'dark' ? 'text-white' : ''}`} style={{color:"black"}}>
                  {homeTranslations[language].contactText}
                </p>
                <button className="btn btn-primary" style={{backgroundColor:"#00CAE0"}} onClick={() => handleGetStarted('/contact')}>
                  {homeTranslations[language].getStarted}
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
};

export default Home;