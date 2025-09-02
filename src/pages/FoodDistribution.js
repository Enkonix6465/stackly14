import React, { useContext } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { LanguageContext } from "../components/Header";
import './FoodDistribution.css';

const translations = {
  en: {
    heroTitle: "Nourishing Communities",
    heroDesc: "Fighting hunger one meal at a time with dignity and compassion",
    donateBtn: "Donate Now",
    promoTitle: "Hunger stops here – lend your support",
    promoDesc: `Food distribution organizations—whether community food banks, public systems, or donor-driven charities—play a vital role in bridging the gap between excess and need, turning potential waste into nourishment for vulnerable populations. By collecting surplus food from farms, retailers, restaurants, or wholesalers, these organizations ensure timely redistribution to those facing hunger or food insecurity.
    Beyond addressing immediate hunger, efficient distribution preserves nutritional value through timely transportation and storage, helping guard against malnutrition and feeding diverse dietary needs.
    A compelling example is Assam's "Zero Waste, Zero Hunger" initiative—where hygienic surplus from eateries is collected daily, inspected, repackaged, and distributed to over 100 homeless individuals, exemplifying how local efforts successfully reduce food waste and support social equity.`,
    statsHeading: "Impact At a Glance",
    overviewTitle: "Our Food Distribution Mission",
    overviewDesc1: "We rescue surplus food—from farms, supermarkets, and communal donors—and deliver it directly to the tables of families, seniors, refugees, and individuals facing food insecurity in our community.",
    overviewDesc2: "Each week, our teams sort, package, and send fresh, nutritious meals to local shelters, community centers, and schools. With every delivery, we're not just combating hunger—we're preserving dignity, nourishing hope, and minimizing waste.",
    overviewList: [
      "Reduce Waste & Nourish Communities: Valuable surplus is transformed into wholesome meals.",
      "Efficient and Caring Network: Driven by volunteers, powered by collaboration.",
      "Building Stronger Communities: Feeding families today while planting seeds for tomorrow."
    ],
    programsHeading: "Our Food Programs",
    programsDesc: "Comprehensive solutions to combat hunger",
    ctaTitle: "Host a Food Drive",
    ctaDesc: "Organize a collection in your neighborhood, school, or workplace",
    ctaList: [
      "Get a starter kit with materials",
      "We provide collection bins",
      "Free pickup service"
    ],
    ctaBtn: "Get Started",
    stats: [
      { number1: "10,000+", label: "Meals Served" },
      { number1: "25", label: "Community Partners" },
      { number1: "500+", label: "Volunteers" },
      { number1: "100%", label: "Donation Impact" }
    ],
    programs: [
      { icon: "🍎", title: "School Nutrition", desc: "Daily meals for children in underserved schools" },
      { icon: "🛒", title: "Food Pantries", desc: "Weekly grocery distributions for families" },
      { icon: "🚚", title: "Mobile Deliveries", desc: "Food delivery to homebound seniors" },
      { icon: "🌱", title: "Urban Gardens", desc: "Fresh produce from community gardens" }
    ]
  },
  ar: {
    heroTitle: "تغذية المجتمعات",
    heroDesc: "محاربة الجوع وجبة تلو الأخرى بكرامة ورحمة",
    donateBtn: "تبرع الآن",
    promoTitle: "هنا يتوقف الجوع – قدم دعمك",
    promoDesc: `تلعب منظمات توزيع الطعام—سواء بنوك الطعام المجتمعية أو الأنظمة العامة أو الجمعيات الخيرية المدعومة من المتبرعين—دورًا حيويًا في سد الفجوة بين الفائض والحاجة، وتحويل الهدر المحتمل إلى غذاء للفئات الضعيفة. من خلال جمع فائض الطعام من المزارع أو المتاجر أو المطاعم أو تجار الجملة، تضمن هذه المنظمات إعادة التوزيع في الوقت المناسب لأولئك الذين يواجهون الجوع أو انعدام الأمن الغذائي. بالإضافة إلى معالجة الجوع الفوري، يحافظ التوزيع الفعال على القيمة الغذائية من خلال النقل والتخزين في الوقت المناسب، مما يساعد على الحماية من سوء التغذية وتلبية الاحتياجات الغذائية المتنوعة. مثال رائع هو مبادرة "صفر هدر، صفر جوع" في آسام—حيث يتم جمع الفائض الصحي من المطاعم يوميًا، وفحصه، وإعادة تعبئته، وتوزيعه على أكثر من 100 شخص بلا مأوى، مما يجسد كيف تقلل الجهود المحلية من هدر الطعام وتدعم العدالة الاجتماعية.`,
    statsHeading: "نظرة سريعة على التأثير",
    overviewTitle: "مهمة توزيع الطعام لدينا",
    overviewDesc1: "نحن ننقذ فائض الطعام—من المزارع، والمتاجر الكبرى، والمتبرعين المجتمعيين—ونوصله مباشرة إلى موائد الأسر وكبار السن واللاجئين والأفراد الذين يواجهون انعدام الأمن الغذائي في مجتمعنا.",
    overviewDesc2: "كل أسبوع، تقوم فرقنا بفرز وتعبئة وإرسال وجبات طازجة ومغذية إلى الملاجئ المحلية والمراكز المجتمعية والمدارس. مع كل عملية تسليم، نحن لا نحارب الجوع فقط—بل نحافظ على الكرامة، ونغذي الأمل، ونقلل من الهدر.",
    overviewList: [
      "تقليل الهدر وتغذية المجتمعات: يتم تحويل الفائض القيم إلى وجبات صحية.",
      "شبكة فعالة وتهتم: يقودها متطوعون، مدعومة بالتعاون.",
      "بناء مجتمعات أقوى: إطعام الأسر اليوم وزراعة بذور الغد."
    ],
    programsHeading: "برامج الطعام لدينا",
    programsDesc: "حلول شاملة لمكافحة الجوع",
    ctaTitle: "نظم حملة توزيع الطعام",
    ctaDesc: "نظم جمع الطعام في حيّك أو مدرستك أو مكان عملك",
    ctaList: [
      "احصل على مجموعة بداية مع المواد",
      "نوفر صناديق جمع الطعام",
      "خدمة الاستلام المجانية"
    ],
    ctaBtn: "ابدأ الآن",
    stats: [
      { number1: "١٠٬٠٠٠+", label: "وجبات مقدمة" },
      { number1: "٢٥", label: "شركاء المجتمع" },
      { number1: "٥٠٠+", label: "متطوعون" },
      { number1: "١٠٠٪", label: "أثر التبرعات" }
    ],
    programs: [
      { icon: "🍎", title: "تغذية المدارس", desc: "وجبات يومية للأطفال في المدارس المحتاجة" },
      { icon: "🛒", title: "مخازن الطعام", desc: "توزيع أسبوعي للبقالة للأسر" },
      { icon: "🚚", title: "توصيل متنقل", desc: "توصيل الطعام لكبار السن في المنازل" },
      { icon: "🌱", title: "حدائق حضرية", desc: "منتجات طازجة من حدائق المجتمع" }
    ]
  }
  // Add Hebrew and other languages as needed
};
const rtlLanguages = ['ar', 'he'];

const FoodDistribution = () => {
  const navigate = useNavigate();
  const { language } = useContext(LanguageContext); // <-- use global context
  const isRTL = rtlLanguages.includes(language);

  const handleGetStarted = (path) => {
    navigate(path);
  };

  const t = translations[language] || translations.en;

  return (
    <div className="food-distribution" data-theme="light" dir={isRTL ? "rtl" : "ltr"}>
      {/* Hero Section */}
      <section className="hero-section" style={{ backgroundImage: "url('/Images/food-distribution.jpg')" }}>
        <div className="hero-content">
          <motion.h1>{t.heroTitle}</motion.h1>
          <motion.p>{t.heroDesc}</motion.p>
          <motion.button
            className="cta-button"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleGetStarted("/contact")}
          >
            {t.donateBtn}
          </motion.button>
        </div>
      </section>

      {/* Promo Section */}
      <div className="promo-container-food">
        <div className="image-side-food">
          <img src="/Images/food-distribution.jpg" alt="Healing Hands" />
        </div>
        <div className="content-side-food">
          <div className="emotional-appeal-food">
            <h2>{t.promoTitle}</h2>
            <p style={{ textAlign: "justify" }}>{t.promoDesc}</p>
            <button className="donate-button" onClick={() => handleGetStarted("/contact")}>{t.donateBtn}</button>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="container">
          <h2 className="stats-heading" style={{ textAlign: "center", marginBottom: "2rem", fontWeight: "bold" }}>
            {t.statsHeading}
          </h2>
          <div className="stats-cards-row">
            {t.stats.map((statt, index) => (
              <motion.div
                key={index}
                className="stat-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <h3>{statt.number1 || "N/A"}</h3>
                <p>{statt.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Overview Section */}
      <section className="food-distribution-overview with-bg">
        <div className="overlay">
          <div className="overview-content">
            <h2>{t.overviewTitle}</h2>
            <p>{t.overviewDesc1}</p>
            <p>{t.overviewDesc2}</p>
            <ul className="overview-list">
              {t.overviewList.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Programs Section */}
      <section className="programs-section">
        <div className="container">
          <div className="header-wrapper">
            <h2>{t.programsHeading}</h2>
            <p className="full-width-description">{t.programsDesc}</p>
          </div>
          <div className="programs-grid">
            {t.programs.map((program, index) => (
              <div key={index} className="program-card">
                <div className="program-icon">{program.icon}</div>
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
            <h2>{t.ctaTitle}</h2>
            <p>{t.ctaDesc}</p>
            <ul>
              {t.ctaList.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
            <button className="cta-btn" onClick={() => handleGetStarted("/contact")}>{t.ctaBtn}</button>
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

