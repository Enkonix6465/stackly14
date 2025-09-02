import React, { useState, useEffect, useContext } from 'react';
import { LanguageContext } from '../components/Header'; // adjust path if needed
import './Blog3.css';

const blog3Translations = {
  en: {
    title: "Stories of Hope & Resilience",
    section1Title: "Rising from the Ashes – Overcoming Adversity",
    section1Desc: "These stories highlight individuals who faced immense challenges—loss, illness, failure, or tragedy—but refused to be defined by them. Through courage, perseverance, and the support of others, they found a way forward.",
    stories1: [
      {
        title: "A Cancer Survivor's Journey",
        text: "After battling stage 4 cancer, Maria founded a nonprofit to support patients with rare diseases."
      },
      {
        title: "From Refugee to Community Leader",
        text: "Ahmed fled war-torn Syria and now runs a mentorship program for young immigrants."
      }
    ],
    section2Title: "Small Acts, Big Impact – Everyday Heroes",
    section2Desc: "Resilience isn't always about grand triumphs; sometimes, it's found in quiet strength and kindness. This section celebrates ordinary people whose hope and determination made a difference.",
    stories2: [
      {
        title: "The Teacher Who Changed Lives",
        text: "Mr. Thompson turned an underfunded school into a hub of creativity and success."
      },
      {
        title: "A Mother's Sacrifice",
        text: "Working three jobs, Lila ensured her daughter became the first in their family to graduate college."
      }
    ]
  },
  ar: {
    title: "قصص الأمل والصمود",
    section1Title: "النهوض من الرماد – التغلب على الشدائد",
    section1Desc: "تسلط هذه القصص الضوء على أشخاص واجهوا تحديات هائلة—فقدان، مرض، فشل أو مأساة—لكنهم رفضوا أن يعرفوا بها. من خلال الشجاعة والمثابرة ودعم الآخرين، وجدوا طريقًا للمضي قدمًا.",
    stories1: [
      {
        title: "رحلة ناجية من السرطان",
        text: "بعد معركة مع سرطان المرحلة الرابعة، أسست ماريا جمعية لدعم مرضى الأمراض النادرة."
      },
      {
        title: "من لاجئ إلى قائد مجتمعي",
        text: "أحمد هرب من سوريا التي مزقتها الحرب ويشرف الآن على برنامج إرشاد للشباب المهاجرين."
      }
    ],
    section2Title: "أعمال صغيرة، تأثير كبير – أبطال الحياة اليومية",
    section2Desc: "الصمود ليس دائمًا انتصارات عظيمة؛ أحيانًا يوجد في القوة واللطف الهادئ. هذا القسم يحتفي بأشخاص عاديين أحدثوا فرقًا بالأمل والإصرار.",
    stories2: [
      {
        title: "المعلم الذي غير حياة الطلاب",
        text: "حول السيد طومسون مدرسة فقيرة إلى مركز للإبداع والنجاح."
      },
      {
        title: "تضحية أم",
        text: "عملت ليلى في ثلاث وظائف لتضمن أن تصبح ابنتها أول من يتخرج من الجامعة في الأسرة."
      }
    ]
  },
  he: {
    title: "סיפורי תקווה וחוסן",
    section1Title: "לקום מהאפר – להתגבר על קשיים",
    section1Desc: "הסיפורים הללו מדגישים אנשים שהתמודדו עם אתגרים עצומים—אובדן, מחלה, כישלון או טרגדיה—אך סירבו להיות מוגדרים על פיהם. בעזרת אומץ, התמדה ותמיכת אחרים, הם מצאו דרך להמשיך.",
    stories1: [
      {
        title: "מסע של ניצולת סרטן",
        text: "אחרי מאבק בסרטן שלב 4, מריה הקימה עמותה לתמיכה בחולים במחלות נדירות."
      },
      {
        title: "מפליט למנהיג קהילתי",
        text: "אחמד ברח מסוריה מוכת המלחמה וכיום מנהל תוכנית חונכות למהגרים צעירים."
      }
    ],
    section2Title: "מעשים קטנים, השפעה גדולה – גיבורי היומיום",
    section2Desc: "חוסן אינו תמיד ניצחונות גדולים; לפעמים הוא נמצא בכוח ובנדיבות שקטה. החלק הזה מוקדש לאנשים רגילים שהתקווה והנחישות שלהם עשו שינוי.",
    stories2: [
      {
        title: "המורה ששינה חיים",
        text: "מר תומפסון הפך בית ספר חסר תקציב למרכז יצירתיות והצלחה."
      },
      {
        title: "הקרבה של אם",
        text: "לילה עבדה בשלוש עבודות כדי שבתה תהיה הראשונה במשפחה שתסיים תואר."
      }
    ]
  }
};

const rtlLanguages = ["ar", "he"];

const Blog3 = () => {
  const { language } = useContext(LanguageContext);

  // RTL detection
  const isRTL = rtlLanguages.includes(language);
  const t = blog3Translations[language] || blog3Translations['en'];
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme') || 'light';
      setTheme(savedTheme);
    }
  }, []);

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
    <div
      style={{
        direction: isRTL ? "rtl" : "ltr",
        textAlign: isRTL ? "right" : "left",
      }}
      className={`stories-container ${theme}`}
    >
      <div className="content-wrapper">
        <h1>{t.title}</h1>
        
        {/* Section 1: Rising from the Ashes */}
        <section className="section">
          <h2>{t.section1Title}</h2>
          <p className="section-description">{t.section1Desc}</p>
          {t.stories1.map((story, idx) => (
            <div className="story-card" key={idx}>
              <h3>{story.title}</h3>
              <p>{story.text}</p>
            </div>
          ))}
        </section>

        {/* Section 2: Small Acts, Big Impact */}
        <section className="section">
          <h2>{t.section2Title}</h2>
          <p className="section-description">{t.section2Desc}</p>
          {t.stories2.map((story, idx) => (
            <div className="story-card" key={idx}>
              <h3>{story.title}</h3>
              <p>{story.text}</p>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
};

export default Blog3;