import { useContext } from 'react';
import { LanguageContext } from '../components/Header'; // adjust path if needed
import { useState, useEffect } from 'react';
import './Services.css';
import { motion } from 'framer-motion';
import 'swiper/css';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import { useNavigate } from 'react-router-dom';

const servicesTranslations = {
  en: {
    heroTitle: "Small Acts, Big Impact – Together We Can Change Lives.",
    heroDesc: "Every act of kindness, no matter how small, creates ripples of hope.",
    servicesHeader: "Our Humanitarian Services",
    servicesDesc: "We're committed to making a difference through these vital programs",
    services: [
      {
        id: 1,
        title: "Education Programs",
        icon: "📚",
        description: "Providing quality education to underprivileged children through our network of schools and learning centers.",
        path: "/education-programs",
      },
      {
        id: 2,
        title: "Healthcare Initiatives",
        icon: "🏥",
        description: "Free medical camps, vaccination drives, and health awareness programs in rural areas.",
        path: "/healthcare-initiatives",
      },
      {
        id: 3,
        title: "Food Distribution",
        icon: "🍲",
        description: "Daily meal programs and nutrition support for families in need across communities.",
        path: "/food-distribution",
      },
      {
        id: 4,
        title: "Disaster Relief",
        icon: "🚨",
        description: "Rapid response teams providing emergency aid during natural calamities and crises.",
        path: "/disaster-relief",
      },
      {
        id: 5,
        title: "Women Empowerment",
       
        description: "Vocational training and micro-finance programs to help women become financially independent.",
        path: "/women-empowerment",
      },
      {
        id: 6,
        title: "Elderly Care",
        icon: "👵",
        description: "Supporting senior citizens with healthcare, companionship, and daily necessities.",
        path: "/elderly-care",
      },
    ],
    impactHeader: "Lives We've Touched",
    impactDesc: "Real stories from people whose lives have been transformed",
    stories: [
      {
        id: 1,
        quote: "Thanks to the education program, my daughter is now the first in our family to attend school regularly.",
        author: "Rahul, Father of 3",
        location: "Mumbai, India",
        image: "Images/edu-daug.jpg",
      },
      {
        id: 2,
        quote: "The medical camp saved my husband's life when he had a severe infection and we couldn't afford treatment.",
        author: "Priya, Caregiver",
        location: "Rural Uttar Pradesh",
        image: "Images/old.jpg",
      },
      {
        id: 3,
        quote: "After the vocational training, I started my own tailoring business and now support my entire family.",
        author: "Sunita, Entrepreneur",
        location: "Delhi, India",
        image: "Images/woman.jpg",
      },
    ],
    metricHeader: "Service Impact Breakdown",
    metric: [
      {
        category: "Nutrition",
        programs: ["Food pantry", "Community kitchen"],
        costPerBeneficiary: "$3.20",
        monthlyReach: "1,200 people",
        cta: "Fund a Week of Meals"
      },
      {
        category: "Healthcare",
        programs: ["Mobile clinic", "Vaccination drives"],
        costPerBeneficiary: "$45",
        monthlyReach: "350 patients",
        cta: "Sponsor a Clinic"
      },
      {
        category: "Education",
        programs: ["Tutoring", "School supplies"],
        costPerBeneficiary: "$18",
        monthlyReach: "200 students",
        cta: "Support a Learner"
      }
    ],
    volunteerHeader: "Volunteer With Us",
    volunteerDesc: "Whether you can spare a few hours or a few days, your time makes a real impact. Help distribute food, teach children, support health camps, or simply lend a hand. Every action counts.",
    volunteerBenefits: [
      "👐 Build real-world impact in local communities",
      "📚 Gain hands-on experience and training",
      "💬 Connect with like-minded changemakers"
    ],
    volunteerBtn: "Join Our Volunteer Team"
  },
  ar: {
    heroTitle: "أعمال صغيرة، تأثير كبير – معًا يمكننا تغيير الحياة.",
    heroDesc: "كل عمل لطف، مهما كان صغيرًا، يخلق موجات من الأمل.",
    servicesHeader: "خدماتنا الإنسانية",
    servicesDesc: "نلتزم بإحداث فرق من خلال هذه البرامج الحيوية",
    services: [
      {
        id: 1,
        title: "برامج التعليم",
        icon: "📚",
        description: "توفير التعليم الجيد للأطفال المحرومين من خلال شبكة المدارس ومراكز التعلم.",
        path: "/education-programs",
      },
      {
        id: 2,
        title: "مبادرات الرعاية الصحية",
        icon: "🏥",
        description: "معسكرات طبية مجانية، حملات تطعيم، وبرامج توعية صحية في المناطق الريفية.",
        path: "/healthcare-initiatives",
      },
      {
        id: 3,
        title: "توزيع الغذاء",
        icon: "🍲",
        description: "برامج الوجبات اليومية ودعم التغذية للأسر المحتاجة في المجتمعات.",
        path: "/food-distribution",
      },
      {
        id: 4,
        title: "الإغاثة من الكوارث",
        icon: "🚨",
        description: "فرق استجابة سريعة تقدم المساعدة الطارئة أثناء الكوارث الطبيعية والأزمات.",
        path: "/disaster-relief",
      },
      {
        id: 5,
        title: "تمكين المرأة",
        icon: "💪",
        description: "برامج التدريب المهني والتمويل الصغير لمساعدة النساء على الاستقلال المالي.",
        path: "/women-empowerment",
      },
      {
        id: 6,
        title: "رعاية كبار السن",
        icon: "👵",
        description: "دعم كبار السن بالرعاية الصحية، الصحبة، والاحتياجات اليومية.",
        path: "/elderly-care",
      },
    ],
    impactHeader: "حياة لمسناها",
    impactDesc: "قصص حقيقية من أشخاص تغيرت حياتهم",
    stories: [
      {
        id: 1,
        quote: "بفضل برنامج التعليم، أصبحت ابنتي أول من يحضر المدرسة بانتظام في عائلتنا.",
        author: "راهول، أب لثلاثة أطفال",
        location: "مومباي، الهند",
        image: "Images/edu-daug.jpg",
      },
      {
        id: 2,
        quote: "أنقذ المخيم الطبي حياة زوجي عندما أصيب بعدوى شديدة ولم نستطع تحمل تكاليف العلاج.",
        author: "برية، مقدمة رعاية",
        location: "ريف أوتار براديش",
        image: "Images/old.jpg",
      },
      {
        id: 3,
        quote: "بعد التدريب المهني، بدأت عملي الخاص بالخياطة وأدعم الآن أسرتي بالكامل.",
        author: "سنيتا، رائدة أعمال",
        location: "دلهي، الهند",
        image: "Images/woman.jpg",
      },
    ],
    metricHeader: "تفصيل تأثير الخدمة",
    metric: [
      {
        category: "التغذية",
        programs: ["مخزن الطعام", "مطبخ المجتمع"],
        costPerBeneficiary: "$3.20",
        monthlyReach: "1,200 شخص",
        cta: "مول أسبوع من الوجبات"
      },
      {
        category: "الرعاية الصحية",
        programs: ["عيادة متنقلة", "حملات التطعيم"],
        costPerBeneficiary: "$45",
        monthlyReach: "350 مريض",
        cta: "ادعم عيادة"
      },
      {
        category: "التعليم",
        programs: ["دروس خصوصية", "مستلزمات مدرسية"],
        costPerBeneficiary: "$18",
        monthlyReach: "200 طالب",
        cta: "ادعم متعلمًا"
      }
    ],
    volunteerHeader: "تطوع معنا",
    volunteerDesc: "سواء كنت تستطيع تخصيص بضع ساعات أو أيام، وقتك يحدث فرقًا حقيقيًا. ساعد في توزيع الطعام، تعليم الأطفال، دعم معسكرات الصحة، أو ببساطة قدم يد المساعدة. كل عمل مهم.",
    volunteerBenefits: [
      "👐 اصنع تأثيرًا حقيقيًا في المجتمعات المحلية",
      "📚 اكتسب خبرة وتدريب عملي",
      "💬 تواصل مع صانعي التغيير"
    ],
    volunteerBtn: "انضم لفريق المتطوعين"
  },
  he: {
    heroTitle: "מעשים קטנים, השפעה גדולה – יחד נוכל לשנות חיים.",
    heroDesc: "כל מעשה טוב לב, קטן ככל שיהיה, יוצר גלי תקווה.",
    servicesHeader: "השירותים ההומניטריים שלנו",
    servicesDesc: "אנחנו מחויבים לעשות שינוי באמצעות תוכניות חיוניות אלו",
    services: [
      {
        id: 1,
        title: "תוכניות חינוך",
        icon: "📚",
        description: "מתן חינוך איכותי לילדים מוחלשים באמצעות רשת בתי ספר ומרכזי לימוד.",
        path: "/education-program",
      },
      {
        id: 2,
        title: "יוזמות בריאות",
        icon: "🏥",
        description: "מחנות רפואיים חינם, מבצעי חיסונים ותוכניות מודעות לבריאות באזורים כפריים.",
        path: "/healthcare-initiatives",
      },
      {
        id: 3,
        title: "חלוקת מזון",
        icon: "🍲",
        description: "תוכניות ארוחות יומיות ותמיכה תזונתית למשפחות נזקקות בקהילות.",
        path: "/food-distribution",
      },
      {
        id: 4,
        title: "סיוע באסונות",
        icon: "🚨",
        description: "צוותי תגובה מהירה המספקים סיוע חירום בעת אסונות טבע ומשברים.",
        path: "/disaster-relief",
      },
      {
        id: 5,
        title: "העצמת נשים",
        icon: "💪",
        description: "הכשרה מקצועית ותוכניות מימון זעיר לנשים לעצמאות כלכלית.",
        path: "/women-empowerment",
      },
      {
        id: 6,
        title: "טיפול בקשישים",
        icon: "👵",
        description: "תמיכה בקשישים עם בריאות, חברות וצרכים יומיומיים.",
        path: "/elderly-care",
      },
    ],
    impactHeader: "חיים שנגענו בהם",
    impactDesc: "סיפורים אמיתיים מאנשים שחייהם השתנו",
    stories: [
      {
        id: 1,
        quote: "בזכות תוכנית החינוך, בתי היא הראשונה במשפחה שלנו שמגיעה לבית הספר באופן קבוע.",
        author: "רהול, אב לשלושה",
        location: "מומבאי, הודו",
        image: "Images/edu-daug.jpg",
      },
      {
        id: 2,
        quote: "המחנה הרפואי הציל את חיי בעלי כשהיה לו זיהום קשה ולא יכולנו להרשות לעצמנו טיפול.",
        author: "פריה, מטפלת",
        location: "אוטר פראדש הכפרית",
        image: "Images/old.jpg",
      },
      {
        id: 3,
        quote: "אחרי ההכשרה המקצועית, פתחתי עסק תפירה משלי וכעת אני מפרנסת את כל משפחתי.",
        author: "סוניטה, יזמית",
        location: "דלהי, הודו",
        image: "Images/woman.jpg",
      },
    ],
    metricHeader: "פירוט השפעת השירות",
    metric: [
      {
        category: "תזונה",
        programs: ["מזווה מזון", "מטבח קהילתי"],
        costPerBeneficiary: "$3.20",
        monthlyReach: "1,200 אנשים",
        cta: "ממן שבוע של ארוחות"
      },
      {
        category: "בריאות",
        programs: ["מרפאה ניידת", "מבצעי חיסונים"],
        costPerBeneficiary: "$45",
        monthlyReach: "350 מטופלים",
        cta: "תמוך במרפאה"
      },
      {
        category: "חינוך",
        programs: ["הדרכה", "ציוד לבית הספר"],
        costPerBeneficiary: "$18",
        monthlyReach: "200 תלמידים",
        cta: "תמוך בלומד"
      }
    ],
    volunteerHeader: "התנדב איתנו",
    volunteerDesc: "בין אם יש לך כמה שעות או כמה ימים, הזמן שלך עושה שינוי אמיתי. עזור בחלוקת מזון, לימוד ילדים, תמיכה במחנות בריאות או פשוט עזור. כל פעולה נחשבת.",
    volunteerBenefits: [
      "👐 צור השפעה אמיתית בקהילות מקומיות",
      "📚 קבל ניסיון והכשרה מעשית",
      "💬 התחבר לעושי שינוי"
    ],
    volunteerBtn: "הצטרף לצוות המתנדבים"
  }
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const rtlLanguages = ["ar", "he"];

const Services = () => {
  const [theme, setTheme] = useState('light');
  const { language } = useContext(LanguageContext);
  const navigate = useNavigate();

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

  const handleNavigate = (path) => () => {
    navigate(path);
  };

  const fallbackLanguage = ['en', 'ar', 'he'].includes(language) ? language : 'en';
  const translation = servicesTranslations[fallbackLanguage] || servicesTranslations['en'] || {};

  const services = Array.isArray(translation?.services) ? translation.services : [];
  const stories = Array.isArray(translation?.stories) ? translation.stories : [];
  const services3 = Array.isArray(translation?.metric) ? translation.metric : [];

  console.log({ language, translation, services, stories, services3 });

  // RTL detection
  const isRTL = rtlLanguages.includes(language);

  return (
    <div
      style={{
        direction: isRTL ? "rtl" : "ltr",
        textAlign: isRTL ? "right" : "left",
      }}
    >
      {/* Hero Section */}
      <section className={`hero-services ${theme === 'dark' ? 'dark' : ''}`}>
        <video className="hero-video-services" src="/Images/services.mp4" autoPlay loop muted playsInline />
        <div className="hero-overlay-services">
          <h1 className={theme === 'dark' ? 'text-white' : ''}>{translation.heroTitle}</h1>
          <p className={theme === 'dark' ? 'text-white' : ''}>{translation.heroDesc}</p>
        </div>
      </section>

      {/* Services Section */}
      <section className={`services-section ${theme === 'dark' ? 'dark' : ''}`}>
        <div className="services-container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="services-header"
          >
            <h2 className={theme === 'dark' ? 'text-white' : ''}>{translation.servicesHeader}</h2>
            <p className={theme === 'dark' ? 'text-white' : ''}>{translation.servicesDesc}</p>
          </motion.div>

          <motion.div
            className="services-grid"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {services.map((service) => (
              <motion.div
                key={service.id}
                className={`service-card ${theme === 'dark' ? 'dark' : ''}`}
                variants={itemVariants}
                whileHover={{ y: -10, boxShadow: "0 15px 30px rgba(0,0,0,0.1)" }}
              >
                <div className="service-icon">{service.icon}</div>
                <h3 className={theme === 'dark' ? 'text-white' : ''}>{service.title}</h3>
                <p className={theme === 'dark' ? 'text-white' : ''}>{service.description}</p>
                <button className="learn-more-btn" onClick={() => navigate(service.path)}>Discover More →</button>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Impact Stories Section */}
      <section className={`impact-section ${theme === 'dark' ? 'dark' : ''}`}>
        <div className="impact-container">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="section-header"
          >
            <h2 className={theme === 'dark' ? 'text-white' : ''}>{translation.impactHeader}</h2>
            <p className={theme === 'dark' ? 'text-white' : ''}>{translation.impactDesc}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="carousel-wrapper"
          >
            <Swiper
              modules={[Pagination, Autoplay]}
              spaceBetween={30}
              slidesPerView={1}
              pagination={{ clickable: true }}
              autoplay={{ delay: 5000 }}
              breakpoints={{
                768: {
                  slidesPerView: 2,
                },
                1024: {
                  slidesPerView: 3,
                }
              }}
            >
              {stories.map((story) => (
                <SwiperSlide key={story.id}>
                  <div className={`story-card ${theme === 'dark' ? 'dark' : ''}`}>
                    <div className="card-image">
                      <img src={story.image} alt={story.author} />
                      <div className="image-overlay"></div>
                    </div>
                    <div className="card-content">
                      <blockquote className={theme === 'dark' ? 'text-white' : ''}>"{story.quote}"</blockquote>
                      <div className="author-info">
                        <h4 className={theme === 'dark' ? 'text-white' : ''}>{story.author}</h4>
                        <p className={theme === 'dark' ? 'text-white' : ''}>{story.location}</p>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </motion.div>
        </div>
      </section>

      {/* Metric Comparison Section */}
      <section className={`metric-comparison ${theme === 'dark' ? 'dark' : ''}`}>
        <h2 style={{ textAlign: "center", color: theme === 'dark' ? 'white' : 'inherit' }}>{translation.metricHeader}</h2>
        <table>
          <thead>
            <tr>
              <th className={theme === 'dark' ? 'dark' : ''}>Category</th>
              <th className={theme === 'dark' ? 'dark' : ''}>Programs</th>
              <th className={theme === 'dark' ? 'dark' : ''}>Cost Per Person</th>
              <th className={theme === 'dark' ? 'dark' : ''}>Monthly Reach</th>
              <th className={theme === 'dark' ? 'dark' : ''}>Take Action</th>
            </tr>
          </thead>
          <tbody>
            {services3.map((service, index) => (
              <tr key={index} className={theme === 'dark' ? 'dark' : ''}>
                <td className={theme === 'dark' ? 'text-white' : ''}>{service.category}</td>
                <td className={theme === 'dark' ? 'text-white' : ''}>
                  <ul>
                    {service.programs.map((program, i) => (
                      <li key={i} className={theme === 'dark' ? 'text-white' : ''}>{program}</li>
                    ))}
                  </ul>
                </td>
                <td className={theme === 'dark' ? 'text-white' : ''}>{service.costPerBeneficiary}</td>
                <td className={theme === 'dark' ? 'text-white' : ''}>{service.monthlyReach}</td>
                <td>
                  <button className="metric-cta" onClick={handleNavigate('/contact')}>
                    {service.cta}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* Transformation Stories Section */}
      <section className={`volunteer-section ${theme === 'dark' ? 'dark' : ''}`}>
        <div className="volunteer-container">
          <div className="volunteer-text">
            <h2 className={theme === 'dark' ? 'text-black' : ''}>{translation.volunteerHeader}</h2>
            <p className={theme === 'dark' ? 'text-black' : ''}>
              {translation.volunteerDesc}
            </p>
            <ul className="volunteer-benefits">
              {translation.volunteerBenefits.map((benefit, index) => (
                <li key={index} className={theme === 'dark' ? 'text-black' : ''}>{benefit}</li>
              ))}
            </ul>
            <button className="volunteer-button" onClick={handleNavigate('/contact')}>{translation.volunteerBtn}</button>
          </div>
          <div className="volunteer-image">
            <img src="/images/rahul.jpg" alt="Volunteers working" />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={`cta-section ${theme === 'dark' ? 'dark' : ''}`}>
        <div
          className="cta-container"
          style={{
            backgroundColor: theme === 'dark' ? '#000' : '#f4f4f4',
            color: theme === 'dark' ? '#fff' : '#222',
            padding: '1rem 1rem',
            textAlign: 'center',
            borderRadius: '16px',
            margin: '2rem auto',
            maxWidth: '700px',
            boxShadow: theme === 'dark'
              ? '0 4px 24px rgba(0,0,0,0.7)'
              : '0 4px 24px rgba(0,0,0,0.1)'
          }}
        >
          <h2 style={{ marginBottom: '1rem' }}>
            {translation.heroTitle}
          </h2>
          <p style={{ marginBottom: '2rem',color:"black",textAlign:"center" }}>
            {translation.heroDesc}
          </p>
          <button
            className="cta-button"
            onClick={handleNavigate('/contact')}
            style={{
              backgroundColor: "#00CAE0",
              color: "#000000ff",
              fontWeight: "bold",
              padding: "1rem 2rem",
              borderRadius: "8px",
              border: "none",
              fontSize: "1.1rem"
            }}
          >
            {translation.volunteerBtn}
          </button>
        </div>
      </section>
    </div>
  );
};

export default Services;