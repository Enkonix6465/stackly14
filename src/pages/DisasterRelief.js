import './DisasterRelief.css';

import { useState,useEffect, useContext } from 'react';
import { LanguageContext } from '../components/Header'; // adjust path if needed

const campaignsData = [
    {
        id: 1,
        title: "Turkey Earthquake Relief",
        description: "Providing shelter and medical aid to survivors",
        progress: 65,
        raised: "1.2M",
        goal: "2M",
        urgent: true
    },
    {
        id: 2,
        title: "Bangladesh Flood Relief",
        description: "Emergency supplies for affected families",
        progress: 42,
        raised: "840K",
        goal: "2M",
        urgent: true
    },
    {
        id: 3,
        title: "Horn of Africa Drought",
        description: "Food and water for famine-stricken regions",
        progress: 38,
        raised: "760K",
        goal: "2M",
        urgent: false
    }
];

const servicesData = [
    { id: 1, icon: "🏥", title: "Medical Aid", description: "Emergency medical teams and supplies" },
    { id: 2, icon: "🏠", title: "Shelter", description: "Temporary housing for displaced families" },
    { id: 3, icon: "💧", title: "Clean Water", description: "Water purification and distribution" },
    { id: 4, icon: "🍲", title: "Food Relief", description: "Emergency food packages" }
];

const disasterTranslations = {
  en: {
    heroTitle: "Rapid Response to Global Disasters",
    heroSubtitle: "Delivering life-saving aid within 72 hours of emergencies worldwide",
    promoTitle: "Rising Together – Hope, Help, and Healing in Every Crisis.",
    promoDesc: `In times of disaster, we rise together—bringing hope to the despairing, help to the vulnerable, and healing to the broken. Every crisis demands courage, compassion, and collective action. Whether it’s delivering emergency supplies, rebuilding shattered communities, or offering a shoulder to lean on, we stand united in our mission to restore light where darkness falls. Because when we rise together, no challenge is too great, and no heart is left behind.
we believe that no one should face disaster alone. Our teams work tirelessly to provide immediate relief—food, clean water, medical aid, and safe shelter—to those hardest hit. But our mission doesn’t end there. We stay for the long haul, helping communities rebuild stronger, restore hope, and heal from trauma.`,
    promoBtn: "Donate Now",
    campaignsTitle: "Active Relief Campaigns",
    campaignsSubtitle: "Your support makes these relief efforts possible",
    campaignUrgent: "Urgent",
    campaignBtn: "Support This Cause",
    approachTitle: "A New Approach to Disaster Relief: ",
    approachSpan: "Compassion in Action",
    approachCards: [
      {
        number: "1",
        title: "Rapid Response That Saves Lives",
        desc: "When catastrophe strikes, every minute counts. Our emergency teams deploy within hours, delivering:",
        list: [
          "Life-saving supplies (food, clean water, medical kits)",
          "Emergency shelter for displaced families",
          "Search & rescue operations in crisis zones"
        ]
      },
      {
        number: "2",
        title: "Rebuilding for Resilience",
        desc: "After the initial crisis, the real work begins. We partner with communities to:",
        list: [
          "Repair homes, schools, and hospitals—stronger than before",
          "Restore livelihoods through job training and small-business support",
          "Strengthen infrastructure to withstand future disasters"
        ]
      },
      {
        number: "3",
        title: "Healing Beyond the Physical",
        desc: "Disasters leave invisible scars. Our long-term programs provide:",
        list: [
          "Mental health support for trauma survivors",
          "Community-led recovery plans to empower local voices",
          "Disaster preparedness training to reduce future risks"
        ]
      }
    ],
    servicesTitle: "Our Relief Services",
    servicesSubtitle: "Comprehensive aid for disaster-affected communities",
    impactTitle: "Why It Works",
    impactDesc: `This isn't just relief—it's dignity, hope, and lasting change. By combining speed, sustainability, and innovation, we don't just rebuild communities—we help them rise stronger.`,
    impactBtn: "Join Us in Redefining Disaster Response"
  },
  ar: {
    heroTitle: "استجابة سريعة للكوارث العالمية",
    heroSubtitle: "تقديم المساعدة المنقذة للحياة خلال 72 ساعة من الطوارئ حول العالم",
    promoTitle: "ننهض معًا – الأمل والمساعدة والشفاء في كل أزمة.",
    promoDesc: `في أوقات الكوارث، ننهض معًا—نجلب الأمل لليائسين، والمساعدة للضعفاء، والشفاء للمجروحين. كل أزمة تتطلب الشجاعة والرحمة والعمل الجماعي. سواء كان ذلك بتقديم الإمدادات الطارئة، أو إعادة بناء المجتمعات المنهارة، أو تقديم الدعم النفسي، نقف متحدين في مهمتنا لإعادة النور حيث يسود الظلام. لأننا عندما ننهض معًا، لا يوجد تحدٍ كبير ولا قلب يُترك خلفنا.
نؤمن أن لا أحد يجب أن يواجه الكارثة وحده. يعمل فريقنا بلا كلل لتقديم الإغاثة الفورية—الغذاء، المياه النظيفة، المساعدة الطبية، والمأوى الآمن—للمتضررين بشدة. لكن مهمتنا لا تنتهي هنا. نبقى لفترة طويلة، نساعد المجتمعات على إعادة البناء بقوة، واستعادة الأمل، والشفاء من الصدمات.`,
    promoBtn: "تبرع الآن",
    campaignsTitle: "حملات الإغاثة النشطة",
    campaignsSubtitle: "دعمك يجعل جهود الإغاثة هذه ممكنة",
    campaignUrgent: "عاجل",
    campaignBtn: "ادعم هذه القضية",
    approachTitle: "نهج جديد للإغاثة من الكوارث: ",
    approachSpan: "الرحمة في العمل",
    approachCards: [
      {
        number: "1",
        title: "استجابة سريعة تنقذ الأرواح",
        desc: "عندما تضرب الكارثة، كل دقيقة مهمة. فرقنا الطارئة تنتشر خلال ساعات، وتقدم:",
        list: [
          "إمدادات منقذة للحياة (غذاء، مياه نظيفة، معدات طبية)",
          "مأوى طارئ للأسر المشردة",
          "عمليات البحث والإنقاذ في مناطق الأزمة"
        ]
      },
      {
        number: "2",
        title: "إعادة البناء من أجل الصمود",
        desc: "بعد الأزمة الأولية، يبدأ العمل الحقيقي. نتعاون مع المجتمعات لـ:",
        list: [
          "إصلاح المنازل والمدارس والمستشفيات—أقوى من قبل",
          "استعادة سبل العيش من خلال التدريب المهني ودعم الأعمال الصغيرة",
          "تعزيز البنية التحتية لمواجهة الكوارث المستقبلية"
        ]
      },
      {
        number: "3",
        title: "الشفاء يتجاوز الجسد",
        desc: "تترك الكوارث ندوبًا غير مرئية. برامجنا طويلة الأمد تقدم:",
        list: [
          "دعم الصحة النفسية للناجين من الصدمات",
          "خطط تعافي يقودها المجتمع لتمكين الأصوات المحلية",
          "تدريب على الاستعداد للكوارث لتقليل المخاطر المستقبلية"
        ]
      }
    ],
    servicesTitle: "خدمات الإغاثة لدينا",
    servicesSubtitle: "مساعدات شاملة للمجتمعات المتضررة من الكوارث",
    impactTitle: "لماذا ينجح هذا",
    impactDesc: `هذه ليست مجرد إغاثة—بل كرامة وأمل وتغيير دائم. من خلال الجمع بين السرعة والاستدامة والابتكار، لا نعيد بناء المجتمعات فقط—بل نساعدها على النهوض بقوة.`,
    impactBtn: "انضم إلينا لإعادة تعريف الاستجابة للكوارث"
  },
  he: {
    heroTitle: "תגובה מהירה לאסונות עולמיים",
    heroSubtitle: "סיוע מציל חיים תוך 72 שעות ממקרי חירום ברחבי העולם",
    promoTitle: "עולים יחד – תקווה, עזרה וריפוי בכל משבר.",
    promoDesc: `בעת אסון, אנו עולים יחד—מביאים תקווה לנואשים, עזרה לפגיעים וריפוי לשבורים. כל משבר דורש אומץ, חמלה ופעולה משותפת. בין אם זה אספקה דחופה, בניית קהילות מחדש או תמיכה נפשית, אנו מאוחדים במשימתנו להחזיר אור במקום בו יש חושך. כי כשעולים יחד, אין אתגר גדול מדי ואין לב שנשאר מאחור.
אנו מאמינים שאף אחד לא צריך להתמודד עם אסון לבד. הצוותים שלנו פועלים ללא לאות כדי לספק סיוע מיידי—אוכל, מים נקיים, עזרה רפואית ומקלט בטוח—לנפגעים ביותר. אבל המשימה שלנו לא מסתיימת כאן. אנו נשארים לטווח הארוך, עוזרים לקהילות לבנות מחדש, להחזיר תקווה ולהחלים מטראומה.`,
    promoBtn: "תרום עכשיו",
    campaignsTitle: "קמפיינים פעילים",
    campaignsSubtitle: "התרומה שלך מאפשרת את מאמצי הסיוע האלה",
    campaignUrgent: "דחוף",
    campaignBtn: "תמוך במטרה זו",
    approachTitle: "גישה חדשה לסיוע באסונות: ",
    approachSpan: "חמלה בפעולה",
    approachCards: [
      {
        number: "1",
        title: "תגובה מהירה שמצילה חיים",
        desc: "כשאסון מכה, כל דקה חשובה. הצוותים שלנו נפרסים תוך שעות ומספקים:",
        list: [
          "אספקה מצילת חיים (אוכל, מים נקיים, ערכות רפואיות)",
          "מקלט חירום למשפחות שנעקרו",
          "מבצעי חילוץ והצלה באזורי משבר"
        ]
      },
      {
        number: "2",
        title: "בנייה מחדש לחוסן",
        desc: "לאחר המשבר הראשוני, העבודה האמיתית מתחילה. אנו משתפים פעולה עם קהילות כדי:",
        list: [
          "לתקן בתים, בתי ספר ובתי חולים—חזקים יותר מבעבר",
          "להחזיר מקורות פרנסה באמצעות הכשרה מקצועית ותמיכה בעסקים קטנים",
          "לחזק תשתיות לעמידות בפני אסונות עתידיים"
        ]
      },
      {
        number: "3",
        title: "ריפוי מעבר לפיזי",
        desc: "אסונות משאירים צלקות בלתי נראות. התוכניות ארוכות הטווח שלנו מספקות:",
        list: [
          "תמיכה נפשית לנפגעי טראומה",
          "תוכניות התאוששות בהובלת הקהילה להעצמת קולות מקומיים",
          "הכשרה להתמודדות עם אסונות להפחתת סיכונים עתידיים"
        ]
      }
    ],
    servicesTitle: "שירותי הסיוע שלנו",
    servicesSubtitle: "סיוע מקיף לקהילות שנפגעו מאסון",
    impactTitle: "למה זה עובד",
    impactDesc: `זו לא רק סיוע—זו כבוד, תקווה ושינוי מתמשך. בשילוב מהירות, קיימות וחדשנות, אנו לא רק בונים מחדש קהילות—אנו עוזרים להן לעלות חזקות יותר.`,
    impactBtn: "הצטרף אלינו להגדיר מחדש את הסיוע באסונות"
  }
};

function DisasterRelief() {
    const [, setTheme] = useState('light');
    const { language } = useContext(LanguageContext);
      
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
        <>
            {/* Hero Section */}
            <section className="hero-section">
                <div className="hero-overlay">
                    <div className="container">
                        <div className="hero-content">
                            <h1>{disasterTranslations[language].heroTitle}</h1>
                            <p className="hero-subtitle">
                                {disasterTranslations[language].heroSubtitle}
                            </p>
                        </div>
                    </div>
                </div>
            </section>
            {/*second section*/}
            <div className="promo-container-disaster">
                <div className="image-side-disaster">
                    <img src="/Images/disaster.jpg" alt="Healing Hands" />
                </div>
                <div className="content-side-disaster">
                    <div className=" emotional-appeal-disaster">
                        <h2>{disasterTranslations[language].promoTitle}</h2>
                        <p style={{ textAlign: "justify" }}>{disasterTranslations[language].promoDesc}</p>
                        <button className="donate-button">{disasterTranslations[language].promoBtn}</button>
                    </div>
                </div>
            </div>


            {/* Campaigns Section */}
            <section className="campaigns-section">
                <div className="campaigns-container">
                    <h2 className="campaigns-title">{disasterTranslations[language].campaignsTitle}</h2>
                    <p className="campaigns-subtitle">
                        {disasterTranslations[language].campaignsSubtitle}
                    </p>
                    <div className="campaigns-grid">
                        {campaignsData.map(c => (
                            <div key={c.id} className="campaign-card">
                                {c.urgent && (
                                    <div className="campaign-urgent">{disasterTranslations[language].campaignUrgent}</div>
                                )}
                                <h3 className="campaign-title">{c.title}</h3>
                                <p className="campaign-description">{c.description}</p>
                                <div className="campaign-progress-container">
                                    <div className="campaign-progress-bar">
                                        <div
                                            className="campaign-progress-fill"
                                            style={{ width: `${c.progress}%` }}
                                        />
                                    </div>
                                    <div className="campaign-progress-stats">
                                        <span>${c.raised}</span>
                                        <span>${c.goal}</span>
                                    </div>
                                </div>
                                <button className="campaign-button">
                                    {disasterTranslations[language].campaignBtn}
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            {/*second section*/}
            <section className="disaster-relief">
                <div className="relief-container">
                    <h2 className="relief-title">{disasterTranslations[language].approachTitle} <span>{disasterTranslations[language].approachSpan}</span></h2>
                    <p className="relief-intro">
                        {disasterTranslations[language].approachDesc}
                    </p>

                    <div className="approach-grid">
                        {disasterTranslations[language].approachCards.map(card => (
                            <div className="approach-card" key={card.number}>
                                <div className="card-header">
                                    <div className="card-number">{card.number}</div>
                                    <h3>{card.title}</h3>
                                </div>
                                <p>{card.desc}</p>
                                <ul>
                                    {card.list.map((item, index) => (
                                        <li key={index}>{item}</li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>


                </div>
            </section>
            {/* Services Section */}
            <section className="relief-services-container">
                <div className="section-header">
                    <h2 className="section-title">{disasterTranslations[language].servicesTitle}</h2>
                    <p className="section-subtitle">{disasterTranslations[language].servicesSubtitle}</p>
                </div>
                <div className="service-items-grid">
                    {servicesData.map(service => (
                        <div key={service.id} className="individual-service-item">
                            <div className="service-icon">{service.icon}</div>
                            <h3>{service.title}</h3>
                            <p>{service.description}</p>
                        </div>
                    ))}
                </div>
            </section>
            <div className="impact-statement">
                <h3>{disasterTranslations[language].impactTitle}</h3>
                <p>
                    {disasterTranslations[language].impactDesc}
                </p>
                <button className="cta-button">{disasterTranslations[language].impactBtn}</button>
            </div>
        </>
    );
}

export default DisasterRelief;