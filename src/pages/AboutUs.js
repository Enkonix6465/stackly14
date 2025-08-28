import React, { useState, useEffect, useContext } from 'react';
import { motion } from 'framer-motion';
import './AboutUs.css';
import { LanguageContext } from '../components/Header'; // adjust path if needed

const aboutUsTranslations = {
  en: {
    heroTitle: "Join Hands for a Brighter Tomorrow.",
    heroDesc: "We believe that real change begins when we come together.",
    historyTitle: "Our Journey of Compassion",
    milestones: [
      { year: "1998", title: "Foundation of Hope", description: "Established by a group of teachers and social workers to address childhood hunger in Bengaluru slums. Started with a single community kitchen serving 50 meals daily.", icon: "🏠" },
      { year: "2001", title: "School Nutrition Program", description: "Partnered with 5 government schools to launch our flagship mid-day meal initiative, benefiting 1,200 children daily with balanced meals.", icon: "🏫" },
      { year: "2005", title: "State-Wide Expansion", description: "Expanded operations across Karnataka, reaching 50 schools and 10,000 children. Introduced nutrition monitoring systems.", icon: "🗺" },
      { year: "2009", title: "Nutrition Research Unit", description: "Established research collaboration with NIMHANS to develop specialized meals for malnourished children, improving recovery rates by 62%.", icon: "🔬" },
      { year: "2012", title: "National Recognition", description: "Received the National Child Welfare Award for innovative 'Food + Education' model that increased school attendance by 45% in partner schools.", icon: "🏆" },
      { year: "2016", title: "Disaster Response Initiative", description: "Launched emergency feeding programs during floods in Chennai and Kerala, serving over 500,000 meals to affected families.", icon: "🚨" },
      { year: "2020", title: "Pandemic Relief Efforts", description: "Distributed 3.2 million meal kits during COVID-19 lockdowns through our 'No Child Hungry' campaign, supported by 2,000 volunteers.", icon: "❤" },
      { year: "2023", title: "Sustainable Farming Project", description: "Established 12 organic farms to source 40% of our ingredients locally, creating 150 jobs while reducing costs by 25%.", icon: "🌱" }
    ],
    missionTitle: "Our Mission",
    missionText: "Our mission is to empower underserved children by nourishing their bodies, inspiring their minds, and nurturing their potential. Through community‑centered nourishment programs, we deliver nutritious meals, educational support, and health awareness—creating pathways to growth and opportunity. We believe that every child deserves the strength to learn, the confidence to dream, and a brighter tomorrow.",
    missionList: [
      "Daily school meal programs",
      "Nutrition education initiatives",
      "Community food security projects",
      "Emergency hunger relief"
    ],
    visionTitle: "Our Vision",
    visionText: "We envision a world where every child has equal opportunities to thrive—where hunger is no barrier to education and where communities are empowered to sustain their own nourishment. Through our holistic approach, we aim to break the cycle of poverty by fostering healthy bodies, curious minds, and resilient spirits.",
    visionList: [
      "Nationwide access to school meals",
      "Education-first community development",
      "Sustainable local food systems",
      "Child-focused policy advocacy"
    ],
    teamTitle: "The Faces Behind Our Mission",
    teamDesc: "Meet the dedicated team making change possible",
    teamMembers: [
      { name: "Dr. Priya Sharma", role: "Founder & CEO", bio: "Pediatric nutrition specialist with 20+ years fighting childhood hunger", image: "/images/priya.jpg" },
      { name: "Rahul Kapoor", role: "Program Director", bio: "Leads our school meal initiatives across 5 states", image: "/images/rahul.jpg" },
      { name: "Ananya Patel", role: "Community Outreach", bio: "Connects with local communities to identify needs", image: "/images/Aananya.jpg" }
    ],
    teamCtaTitle: "Join Our Volunteer Family",
    teamCtaDesc: "500+ volunteers help us deliver meals daily across India",
    teamCtaBtn: "Become a Volunteer"
  },
  ar: {
    heroTitle: "انضم إلينا من أجل غد أكثر إشراقًا.",
    heroDesc: "نؤمن أن التغيير الحقيقي يبدأ عندما نتكاتف.",
    historyTitle: "رحلتنا في العطاء",
    milestones: [
      { year: "1998", title: "تأسيس الأمل", description: "تأسست من قبل مجموعة من المعلمين والعاملين الاجتماعيين لمعالجة جوع الأطفال في أحياء بنغالور الفقيرة. بدأت بمطبخ مجتمعي واحد يقدم 50 وجبة يوميًا.", icon: "🏠" },
      { year: "2001", title: "برنامج التغذية المدرسية", description: "شراكة مع 5 مدارس حكومية لإطلاق مبادرة الوجبات اليومية، استفاد منها 1200 طفل يوميًا.", icon: "🏫" },
      { year: "2005", title: "التوسع على مستوى الولاية", description: "توسعت العمليات عبر كارناتاكا، لتصل إلى 50 مدرسة و10,000 طفل. تم إدخال أنظمة مراقبة التغذية.", icon: "🗺" },
      { year: "2009", title: "وحدة أبحاث التغذية", description: "تأسيس تعاون بحثي مع NIMHANS لتطوير وجبات متخصصة للأطفال الذين يعانون من سوء التغذية، مما أدى إلى تحسين معدلات التعافي بنسبة 62٪.", icon: "🔬" },
      { year: "2012", title: "الاعتراف الوطني", description: "حصلت على جائزة رعاية الطفل الوطنية لنموذج 'الغذاء + التعليم' المبتكر الذي زاد من حضور الطلاب بنسبة 45٪.", icon: "🏆" },
      { year: "2016", title: "مبادرة الاستجابة للكوارث", description: "إطلاق برامج التغذية الطارئة أثناء الفيضانات في تشيناي وكيرالا، وتقديم أكثر من 500,000 وجبة للأسر المتضررة.", icon: "🚨" },
      { year: "2020", title: "جهود الإغاثة أثناء الجائحة", description: "توزيع 3.2 مليون مجموعة وجبات خلال إغلاقات كوفيد-19 من خلال حملة 'لا طفل جائع'، بدعم من 2000 متطوع.", icon: "❤" },
      { year: "2023", title: "مشروع الزراعة المستدامة", description: "تأسيس 12 مزرعة عضوية لتوفير 40٪ من المكونات محليًا، وخلق 150 وظيفة وتقليل التكاليف بنسبة 25٪.", icon: "🌱" }
    ],
    missionTitle: "مهمتنا",
    missionText: "مهمتنا هي تمكين الأطفال المحرومين من خلال تغذية أجسامهم، وإلهام عقولهم، ورعاية إمكاناتهم. من خلال برامج التغذية المجتمعية، نقدم وجبات مغذية، ودعمًا تعليميًا، وتوعية صحية—لنخلق مسارات للنمو والفرص. نؤمن أن كل طفل يستحق القوة للتعلم، والثقة في الحلم، وغدًا أكثر إشراقًا.",
    missionList: [
      "برامج الوجبات المدرسية اليومية",
      "مبادرات التوعية الغذائية",
      "مشاريع الأمن الغذائي المجتمعي",
      "الإغاثة الطارئة من الجوع"
    ],
    visionTitle: "رؤيتنا",
    visionText: "نطمح لعالم يتمتع فيه كل طفل بفرص متساوية للنمو—حيث لا يكون الجوع عائقًا أمام التعليم، وحيث تتمكن المجتمعات من الحفاظ على تغذيتها. من خلال نهجنا الشامل، نسعى لكسر دائرة الفقر عبر تعزيز الأجسام الصحية، والعقول الفضولية، والأرواح القوية.",
    visionList: [
      "الوصول الوطني إلى وجبات المدارس",
      "تنمية المجتمع عبر التعليم أولاً",
      "أنظمة غذائية محلية مستدامة",
      "الدفاع عن سياسات تركز على الطفل"
    ],
    teamTitle: "الوجوه وراء مهمتنا",
    teamDesc: "تعرف على الفريق المكرس الذي يجعل التغيير ممكنًا",
    teamMembers: [
      { name: "د. بريا شارما", role: "المؤسس والمدير التنفيذي", bio: "أخصائية تغذية أطفال بخبرة تزيد عن 20 عامًا في مكافحة جوع الأطفال", image: "/images/priya.jpg" },
      { name: "راهول كابور", role: "مدير البرامج", bio: "يقود مبادرات الوجبات المدرسية في 5 ولايات", image: "/images/rahul.jpg" },
      { name: "أنانيا باتيل", role: "التواصل المجتمعي", bio: "تتواصل مع المجتمعات المحلية لتحديد الاحتياجات", image: "/images/Aananya.jpg" }
    ],
    teamCtaTitle: "انضم إلى عائلة المتطوعين",
    teamCtaDesc: "أكثر من 500 متطوع يساعدوننا في تقديم الوجبات يوميًا في جميع أنحاء الهند",
    teamCtaBtn: "كن متطوعًا"
  },
  he: {
    heroTitle: "הצטרפו אלינו לעתיד מזהיר יותר.",
    heroDesc: "אנחנו מאמינים ששינוי אמיתי מתחיל כשאנחנו פועלים יחד.",
    historyTitle: "מסע החמלה שלנו",
    milestones: [
      { year: "1998", title: "יסוד התקווה", description: "הוקם על ידי קבוצת מורים ועובדים סוציאליים לטיפול ברעב ילדים בשכונות בנגלור. התחיל עם מטבח קהילתי אחד שהגיש 50 ארוחות ביום.", icon: "🏠" },
      { year: "2001", title: "תוכנית תזונה בבתי ספר", description: "שיתוף פעולה עם 5 בתי ספר ממשלתיים להשקת יוזמת ארוחות הצהריים, לטובת 1,200 ילדים ביום.", icon: "🏫" },
      { year: "2005", title: "התרחבות ברחבי המדינה", description: "הרחבת הפעילות ברחבי קרנטקה, הגעה ל-50 בתי ספר ו-10,000 ילדים. הוכנסו מערכות ניטור תזונה.", icon: "🗺" },
      { year: "2009", title: "יחידת מחקר תזונה", description: "הוקם שיתוף פעולה מחקרי עם NIMHANS לפיתוח ארוחות מיוחדות לילדים הסובלים מתת-תזונה, שיפור שיעורי ההחלמה ב-62%.", icon: "🔬" },
      { year: "2012", title: "הכרה לאומית", description: "קיבלנו את פרס רווחת הילד הלאומי על מודל 'אוכל + חינוך' החדשני שהגדיל את נוכחות התלמידים ב-45%.", icon: "🏆" },
      { year: "2016", title: "יוזמת תגובה לאסונות", description: "הושקו תוכניות הזנה חירום במהלך שיטפונות בצ'נאי וקרלה, הגשת מעל 500,000 ארוחות למשפחות שנפגעו.", icon: "🚨" },
      { year: "2020", title: "מאמצי סיוע במגפה", description: "חולקו 3.2 מיליון ערכות ארוחות במהלך סגרי הקורונה במסגרת קמפיין 'אין ילד רעב', בתמיכת 2,000 מתנדבים.", icon: "❤" },
      { year: "2023", title: "פרויקט חקלאות בת קיימא", description: "הוקמו 12 חוות אורגניות לספק 40% מהמרכיבים מקומית, יצירת 150 משרות והפחתת עלויות ב-25%.", icon: "🌱" }
    ],
    missionTitle: "המשימה שלנו",
    missionText: "המשימה שלנו היא להעצים ילדים מוחלשים על ידי הזנת גופם, השראת מוחם וטיפוח הפוטנציאל שלהם. באמצעות תוכניות הזנה קהילתיות, אנו מספקים ארוחות מזינות, תמיכה חינוכית ומודעות לבריאות—יוצרים מסלולים לצמיחה והזדמנות. אנו מאמינים שכל ילד ראוי לכוח ללמוד, לביטחון לחלום ולעתיד מזהיר.",
    missionList: [
      "תוכניות ארוחות יומיות בבתי ספר",
      "יוזמות חינוך לתזונה",
      "פרויקטים קהילתיים לביטחון תזונתי",
      "סיוע חירום נגד רעב"
    ],
    visionTitle: "החזון שלנו",
    visionText: "אנו שואפים לעולם שבו לכל ילד יש הזדמנויות שוות להצליח—שבו רעב אינו מחסום לחינוך, וקהילות מסוגלות לשמור על תזונה עצמאית. בגישתנו ההוליסטית, אנו שואפים לשבור את מעגל העוני באמצעות טיפוח גופים בריאים, מוחות סקרנים ורוחות חזקות.",
    visionList: [
      "גישה ארצית לארוחות בבתי ספר",
      "פיתוח קהילתי ממוקד חינוך",
      "מערכות מזון מקומיות ברות קיימא",
      "קידום מדיניות ממוקדת ילדים"
    ],
    teamTitle: "הפנים מאחורי המשימה שלנו",
    teamDesc: "הכירו את הצוות המסור שמאפשר את השינוי",
    teamMembers: [
      { name: "ד\"ר פריה שארמה", role: "מייסדת ומנכ\"לית", bio: "מומחית לתזונת ילדים עם ניסיון של מעל 20 שנה במאבק ברעב ילדים", image: "/images/priya.jpg" },
      { name: "רהול קאפור", role: "מנהל תוכניות", bio: "מוביל את יוזמות הארוחות בבתי ספר ב-5 מדינות", image: "/images/rahul.jpg" },
      { name: "אנניה פאטל", role: "קשרי קהילה", bio: "יוצרת קשר עם קהילות מקומיות לזיהוי צרכים", image: "/images/Aananya.jpg" }
    ],
    teamCtaTitle: "הצטרפו למשפחת המתנדבים שלנו",
    teamCtaDesc: "יותר מ-500 מתנדבים עוזרים לנו לספק ארוחות מדי יום ברחבי הודו",
    teamCtaBtn: "הפוך למתנדב"
  }
};

const AboutUs = () => {
  const [theme, setTheme] = useState('light');
  const { language } = useContext(LanguageContext);

  // Load theme preference from localStorage on component mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme') || 'light';
      setTheme(savedTheme);
      document.documentElement.setAttribute('data-theme', savedTheme);
    }
  }, []);

  // Listen for theme changes from Header component
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const handleThemeChange = () => {
        const newTheme = localStorage.getItem('theme') || 'light';
        setTheme(newTheme);
        document.documentElement.setAttribute('data-theme', newTheme);
      };
      
      window.addEventListener('theme-changed', handleThemeChange);
      window.addEventListener('storage', handleThemeChange);
      
      return () => {
        window.removeEventListener('theme-changed', handleThemeChange);
        window.removeEventListener('storage', handleThemeChange);
      };
    }
  }, []);

  const {
    heroTitle,
    heroDesc,
    historyTitle,
    milestones,
    missionTitle,
    missionText,
    missionList,
    visionTitle,
    visionText,
    visionList,
    teamTitle,
    teamDesc,
    teamMembers,
    teamCtaTitle,
    teamCtaDesc,
    teamCtaBtn
  } = aboutUsTranslations[language] || aboutUsTranslations.en;

  return (
    <>
        {/* Hero Section */}
        <section className={`hero ${theme === 'dark' ? 'dark-theme' : ''}`}>
            <video className="hero-video" src="/Images/home2.mp4" autoPlay loop muted playsInline />
            <div className="hero-overlay">
                <h1 className={theme === 'dark' ? 'text-white' : ''}>{heroTitle}</h1>
                <p className={theme === 'dark' ? 'text-gray-300' : ''}>{heroDesc}</p>
            </div>
        </section>

        {/* History Timeline Section */}
        <section className={`history-section ${theme === 'dark' ? 'dark-theme' : ''}`}>
            <div className="container">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className={`section-title ${theme === 'dark' ? 'text-white' : ''}`}
                >
                    {historyTitle}
                </motion.h2>

                <div className="timeline">
                    {milestones.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: index * 0.2 }}
                            className={`timeline-item ${index % 2 === 0 ? 'left' : 'right'}`}
                        >
                            <div className={`timeline-content ${theme === 'dark' ? 'dark-theme' : ''}`}>
                                <div className={`timeline-year ${theme === 'dark' ? 'dark-theme' : ''}`}>{item.year}</div>
                                <div className="timeline-icon">{item.icon}</div>
                                <h3 className={`timeline-title ${theme === 'dark' ? 'text-white' : ''}`}>{item.title}</h3>
                                <p className={`timeline-description ${theme === 'dark' ? 'text-gray-300' : ''}`}>{item.description}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
        
        {/* Third section */}
        <div className={`mission-vision-container ${theme === 'dark' ? 'dark-theme' : ''}`}>
            {/* Mission Section */}
            <div className={`split-section mission-section ${theme === 'dark' ? 'dark-theme' : ''}`}>
                <div className="section-image-container">
                    <img src="/Images/our-mission.jpg" alt="Children receiving meals" />
                </div>
                <div className={`section-content-container ${theme === 'dark' ? 'dark-theme' : ''}`}>
                    <div className="section-header">
                        <h2 className={theme === 'dark' ? 'text-white' : ''}>{missionTitle}</h2>
                        <div className="section-underline"></div>
                    </div>
                    <div className="section-text">
                        <p className={theme === 'dark' ? 'text-gray-300' : ''} style={{ textAlign: "justify" }}>
                            {missionText}
                        </p>
                        <ul className={`section-list ${theme === 'dark' ? 'dark-theme' : ''}`}>
                            {missionList.map((item, index) => (
                              <li key={index} className={theme === 'dark' ? 'text-gray-300' : ''}>{item}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>

            {/* Vision Section */}
            <div className={`split-section vision-section ${theme === 'dark' ? 'dark-theme' : ''}`}>
                <div className={`section-content-container ${theme === 'dark' ? 'dark-theme' : ''}`}>
                    <div className="section-header">
                        <h2 className={theme === 'dark' ? 'text-white' : ''}>{visionTitle}</h2>
                        <div className="section-underline"></div>
                    </div>
                    <div className="section-text">
                        <p className={theme === 'dark' ? 'text-gray-300' : ''} style={{ textAlign: "justify" }}>
                            {visionText}
                        </p>
                        <ul className={`section-list ${theme === 'dark' ? 'dark-theme' : ''}`}>
                            {visionList.map((item, index) => (
                              <li key={index} className={theme === 'dark' ? 'text-gray-300' : ''}>{item}</li>
                            ))}
                        </ul>
                    </div>
                </div>
                <div className="section-image-container">
                    <img src="/Images/vision.jpg" alt="Happy children learning" />
                </div>
            </div>
        </div>
        
        {/* Team Section */}
        <div className={`team-section ${theme === 'dark' ? 'dark-theme' : ''}`}>
            {/* Full-width colored header */}
            <div className={`team-header-bg ${theme === 'dark' ? 'dark-theme' : ''}`}>
                <div className="team-header-content">
                    <h2 className={theme === 'dark' ? 'text-white' : ''}>{teamTitle}</h2>
                    <div className="section-underline"></div>
                    <p className={theme === 'dark' ? 'text-gray-300' : ''}>{teamDesc}</p>
                </div>
            </div>

            {/* Full-width team grid */}
            <div className={`team-grid-bg ${theme === 'dark' ? 'dark-theme' : ''}`}>
                <div className="team-grid-container">
                    {teamMembers.map((member, index) => (
                        <div key={index} className={`team-card ${theme === 'dark' ? 'dark-theme' : ''}`}>
                            <div className="team-image-wrapper">
                                <img src={member.image} alt={member.name} />
                            </div>
                            <div className="team-info">
                                <h3 className={theme === 'dark' ? 'text-white' : ''}>{member.name}</h3>
                                <p className={`role ${theme === 'dark' ? 'text-blue-300' : ''}`}>{member.role}</p>
                                <p className={`bio ${theme === 'dark' ? 'text-gray-300' : ''}`}>{member.bio}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Full-width CTA */}
            <div className={`team-cta-bg ${theme === 'dark' ? 'dark-theme' : ''}`}>
                <div className="team-cta-content">
                    <h3 className={theme === 'dark' ? 'text-white' : ''}>{teamCtaTitle}</h3>
                    <p className={theme === 'dark' ? 'text-gray-300' : ''}>{teamCtaDesc}</p>
                    <button className="cta-button">{teamCtaBtn}</button>
                </div>
            </div>
        </div>
    </>
  );
};

export default AboutUs;