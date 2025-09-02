import React from 'react';
import './WomenEmpowerment.css';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import { LanguageContext } from '../components/Header'; // adjust path if needed

const rtlLanguages = ["ar", "he"];

const WomenEmpowerment = () => {
    const navigate = useNavigate();
    const handleGetStarted = (path) => {
        navigate(path);
    }
    const [theme, setTheme] = useState('light');
    const { language } = useContext(LanguageContext);

    // RTL detection
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

    const womenTranslations = {
        en: {
            heroTitle: "Empowering Women, Transforming Communities",
            heroDesc: "Join us in creating equal opportunities for women worldwide through education, economic support, and leadership development",
            heroBtn: "Donate Now",
            promoTitle: "Empowered Women Empower the World",
            promoDesc: `When women are given opportunities to learn, lead, and thrive, they become catalysts for transformative change. An educated woman invests in her family's health. A financially independent woman boosts her community's economy. A woman in leadership paves the way for others to follow. By breaking barriers and challenging stereotypes, empowered women don't just change their own lives—they create a ripple effect that lifts entire generations. Together, we can build a world where every woman has the tools, confidence, and support to rise, inspire, and lead. Because when she succeeds, society succeeds.
            When women rise, entire communities transform. Empowered women significantly contribute to economic development. Studies indicate that advancing gender equality could add up to $12 trillion to global GDP by 2025. In India, initiatives like the Digital Entrepreneurship Conference in Madurai highlight the growing role of women in technology and entrepreneurship. The conference emphasized inclusive growth and the importance.`,
            promoBtn: "Donate Now",
            stats: [
                { number: "25,000+", label: "Women educated annually" },
                { number: "15,000+", label: "Small businesses launched" },
                { number: "80%", label: "Increase in family incomes" },
                { number: "200+", label: "Communities transformed" }
            ],
            programsTitle: "Our Empowerment Programs",
            programs: [
                { icon: "🎓", title: "Education Initiative", desc: "Scholarships and vocational training for women and girls" },
                { icon: "💼", title: "Economic Empowerment", desc: "Micro-loans and business training programs" },
                { icon: "🏥", title: "Health & Wellness", desc: "Reproductive health education and services" },
                { icon: "🗳️", title: "Leadership Development", desc: "Training for women in community leadership" }
            ],
            storyTitle: "From Struggle to Strength",
            storyHeading: "Meet Amina – A Ripple Effect of Change",
            storyDesc: `Amina, a seamstress in rural Kenya, once struggled to feed her children.
            With a small loan from our Women's Entrepreneurship Program, she bought a second sewing machine and trained three other women in her village.
            Today, their collective business employs 12 women, funds a local girls' scholarship, and has become a hub for empowerment.`,
            storyQuote: `"I didn't just learn to sew—I learned I could lead. Now, my daughters see what's possible."`,
            metrics: [
                { icon: "♾️", title: "Multiplier Effect", desc: "Every woman Amina empowered now mentors others" },
                { icon: "🔓", title: "Breaking Cycles", desc: "Profits fund education for girls in her community" },
                { icon: "🌱", title: "Sustainable Change", desc: "Skills + opportunity = lasting impact" },
                { icon: "🏘️", title: "Community Impact", desc: "Created a safe space for women to gather and learn" }
            ],
            partnersTitle: "Trusted By",
            partners: [
                "Global Women's Fund",
                "Empower Her Initiative",
                "UN Women",
                "Women's World Banking"
            ],
            ctaTitle: "Your Support Changes Lives",
            ctaDesc: "Every donation helps break the cycle of poverty through women's empowerment",
            ctaDonate: "Make a Donation",
            ctaVolunteer: "Become a Volunteer"
        },
        ar: {
            heroTitle: "تمكين المرأة، تحويل المجتمعات",
            heroDesc: "انضم إلينا في خلق فرص متساوية للنساء حول العالم من خلال التعليم والدعم الاقتصادي وتطوير القيادة",
            heroBtn: "تبرع الآن",
            promoTitle: "المرأة المُمَكَّنة تمكّن العالم",
            promoDesc: `عندما تحصل المرأة على فرص للتعلم والقيادة والنجاح، تصبح محفزًا للتغيير التحولي. المرأة المتعلمة تستثمر في صحة أسرتها. المرأة المستقلة ماليًا تعزز اقتصاد مجتمعها. المرأة القيادية تمهد الطريق للآخرين. من خلال كسر الحواجز وتحدي الصور النمطية، لا تغير المرأة المُمَكَّنة حياتها فقط—بل تخلق تأثيرًا يرفع أجيالًا كاملة. معًا، يمكننا بناء عالم تمتلك فيه كل امرأة الأدوات والثقة والدعم للارتقاء والإلهام والقيادة. لأن نجاحها هو نجاح المجتمع.
            عندما تنهض المرأة، تتحول المجتمعات بأكملها. تساهم النساء المُمَكَّنات بشكل كبير في التنمية الاقتصادية. تشير الدراسات إلى أن تعزيز المساواة بين الجنسين يمكن أن يضيف ما يصل إلى 12 تريليون دولار إلى الناتج المحلي الإجمالي العالمي بحلول عام 2025. في الهند، تبرز مبادرات مثل مؤتمر ريادة الأعمال الرقمية في مادوراي الدور المتزايد للمرأة في التكنولوجيا وريادة الأعمال.`,
            promoBtn: "تبرع الآن",
            stats: [
                { number: "25,000+", label: "نساء تم تعليمهن سنويًا" },
                { number: "15,000+", label: "مشاريع صغيرة أُطلقت" },
                { number: "80%", label: "زيادة في دخل الأسر" },
                { number: "200+", label: "مجتمعات تغيرت" }
            ],
            programsTitle: "برامجنا للتمكين",
            programs: [
                { icon: "🎓", title: "مبادرة التعليم", desc: "منح دراسية وتدريب مهني للنساء والفتيات" },
                { icon: "💼", title: "التمكين الاقتصادي", desc: "قروض صغيرة وبرامج تدريب على الأعمال" },
                { icon: "🏥", title: "الصحة والعافية", desc: "تثقيف وخدمات الصحة الإنجابية" },
                { icon: "🗳️", title: "تطوير القيادة", desc: "تدريب النساء على القيادة المجتمعية" }
            ],
            storyTitle: "من الكفاح إلى القوة",
            storyHeading: "تعرف على أمينة – تأثير التغيير",
            storyDesc: `أمينة، خياطة في ريف كينيا، كانت تكافح لإطعام أطفالها.
            بفضل قرض صغير من برنامج ريادة الأعمال النسائية، اشترت ماكينة خياطة ثانية ودربت ثلاث نساء أخريات في قريتها.
            اليوم، يعمل مشروعهن الجماعي على توظيف 12 امرأة، ويمول منحة للفتيات، وأصبح مركزًا للتمكين.`,
            storyQuote: `"لم أتعلم الخياطة فقط—بل تعلمت أنني أستطيع القيادة. الآن، ترى بناتي ما هو ممكن."`,
            metrics: [
                { icon: "♾️", title: "تأثير مضاعف", desc: "كل امرأة مكنتها أمينة أصبحت الآن تُمَكِّن أخريات" },
                { icon: "🔓", title: "كسر الدوائر", desc: "الأرباح تمول تعليم الفتيات في مجتمعها" },
                { icon: "🌱", title: "تغيير مستدام", desc: "المهارات + الفرصة = تأثير دائم" },
                { icon: "🏘️", title: "تأثير مجتمعي", desc: "أنشأت مساحة آمنة لتجمع النساء وتعلمهن" }
            ],
            partnersTitle: "موثوق به من قبل",
            partners: [
                "صندوق المرأة العالمي",
                "مبادرة تمكينها",
                "هيئة الأمم المتحدة للمرأة",
                "بنك المرأة العالمي"
            ],
            ctaTitle: "دعمك يغير الحياة",
            ctaDesc: "كل تبرع يساعد في كسر دائرة الفقر من خلال تمكين المرأة",
            ctaDonate: "تبرع الآن",
            ctaVolunteer: "كن متطوعًا"
        },
        he: {
            heroTitle: "העצמת נשים, שינוי קהילות",
            heroDesc: "הצטרפו אלינו ליצירת הזדמנויות שוות לנשים ברחבי העולם באמצעות חינוך, תמיכה כלכלית ופיתוח מנהיגות",
            heroBtn: "תרום עכשיו",
            promoTitle: "נשים מועצמות מעצימות את העולם",
            promoDesc: `כאשר נשים מקבלות הזדמנויות ללמוד, להוביל ולהצליח, הן הופכות למנועי שינוי. אישה משכילה משקיעה בבריאות משפחתה. אישה עצמאית כלכלית מחזקת את כלכלת הקהילה שלה. אישה מנהיגה סוללת דרך לאחרות. על ידי שבירת מחסומים ואתגר סטריאוטיפים, נשים מועצמות לא רק משנות את חייהן—הן יוצרות אפקט אדווה שמרים דורות שלמים. יחד, נוכל לבנות עולם שבו לכל אישה יש את הכלים, הביטחון והתמיכה לצמוח, להוביל ולהשפיע. כי כשהיא מצליחה, החברה מצליחה.
            כשנשים מתקדמות, קהילות שלמות משתנות. נשים מועצמות תורמות משמעותית לפיתוח הכלכלה. מחקרים מראים שקידום שוויון מגדרי יכול להוסיף עד 12 טריליון דולר לתמ"ג העולמי עד 2025. בהודו, יוזמות כמו כנס יזמות דיגיטלית במדוראי מדגישות את תפקידן הגדל של נשים בטכנולוגיה ויזמות.`,
            promoBtn: "תרום עכשיו",
            stats: [
                { number: "25,000+", label: "נשים חונכו בשנה" },
                { number: "15,000+", label: "עסקים קטנים שהוקמו" },
                { number: "80%", label: "עלייה בהכנסות המשפחתיות" },
                { number: "200+", label: "קהילות שהשתנו" }
            ],
            programsTitle: "תוכניות ההעצמה שלנו",
            programs: [
                { icon: "🎓", title: "יוזמת חינוך", desc: "מלגות והכשרה מקצועית לנשים ונערות" },
                { icon: "💼", title: "העצמה כלכלית", desc: "הלוואות קטנות ותוכניות הדרכה עסקית" },
                { icon: "🏥", title: "בריאות ורווחה", desc: "חינוך ושירותי בריאות רבייתית" },
                { icon: "🗳️", title: "פיתוח מנהיגות", desc: "הכשרת נשים למנהיגות קהילתית" }
            ],
            storyTitle: "ממאבק לעוצמה",
            storyHeading: "הכירו את אמינה – אפקט אדווה של שינוי",
            storyDesc: `אמינה, תופרת בכפר קניה, התקשתה להאכיל את ילדיה.
            בעזרת הלוואה קטנה מתוכנית יזמות נשים, רכשה מכונת תפירה שנייה והכשירה שלוש נשים נוספות בכפרה.
            היום, העסק המשותף שלהן מעסיק 12 נשים, מממן מלגה לבנות, והפך למרכז העצמה.`,
            storyQuote: `"לא רק שלמדתי לתפור—למדתי שאני יכולה להוביל. עכשיו, הבנות שלי רואות מה אפשרי."`,
            metrics: [
                { icon: "♾️", title: "אפקט מכפיל", desc: "כל אישה שאמינה העצימה מדריכה אחרות" },
                { icon: "🔓", title: "שבירת מעגלים", desc: "הרווחים מממנים חינוך לבנות בקהילה שלה" },
                { icon: "🌱", title: "שינוי בר קיימא", desc: "כישורים + הזדמנות = השפעה מתמשכת" },
                { icon: "🏘️", title: "השפעה קהילתית", desc: "יצרה מרחב בטוח לנשים להתאסף וללמוד" }
            ],
            partnersTitle: "שותפים לדרך",
            partners: [
                "קרן הנשים העולמית",
                "יוזמת העצמה שלה",
                "נשים באו\"ם",
                "בנק הנשים העולמי"
            ],
            ctaTitle: "התרומה שלך משנה חיים",
            ctaDesc: "כל תרומה עוזרת לשבור את מעגל העוני באמצעות העצמת נשים",
            ctaDonate: "תרום עכשיו",
            ctaVolunteer: "הפוך למתנדב"
        }
    };

    const t = womenTranslations[language] || womenTranslations.en;

    return (
        <div
            className={`women-empowerment ${theme}`}
            style={{
                direction: isRTL ? "rtl" : "ltr",
                textAlign: isRTL ? "right" : "left",
            }}
        >
            {/* Section 1: Hero Banner */}
            <section className="empowerment-hero" style={{ backgroundImage: 'url(/Images/women-back.jpg)' }}>
                <div className="hero-content-women">
                    <h1>{t.heroTitle}</h1>
                    <p>{t.heroDesc}</p>
                    <button className="hero-cta" onClick={() => handleGetStarted("/contact")}>{t.heroBtn}</button>
                </div>
            </section>
            
            {/* Second section */}
            <div className="promo-container-women">
                <div className="image-side-women">
                    <img src="/Images/women-back.jpg" alt="Healing Hands" />
                </div>
                <div className="content-side-women">
                    <div className="emotional-appeal-women">
                        <h2>{t.promoTitle}</h2>
                        <p style={{ textAlign: "justify" }}>{t.promoDesc}</p>
                        <button className="donate-button" onClick={() => handleGetStarted("/contact")}>{t.promoBtn}</button>
                    </div>
                </div>
            </div>

            {/* Section 2: Stats Showcase */}
            <section className="stats-section">
                <div className="stats-container">
                    {t.stats.map((stat, index) => (
                        <div className="stat-card" key={index}>
                            <h3>{stat.number}</h3>
                            <p>{stat.label}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Section 3: Programs Grid */}
            <section className="programs-section">
                <h2 className="section-title">{t.programsTitle}</h2>
                <div className="programs-grid">
                    {t.programs.map((program, index) => (
                        <div className="program-card" key={index}>
                            <div className="program-icon">{program.icon}</div>
                            <h3>{program.title}</h3>
                            <p>{program.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            <section className="women-story">
                <div className="story-wrapper">
                    <h2 className="story-section-title">{t.storyTitle}</h2>
                    <h3 className="story-main-heading" style={{ textAlign: 'center' }}>{t.storyHeading}</h3>

                    <div className="story-content-grid">
                        <div className="story-text-block">
                            <p style={{ textAlign: "justify",color:"black" }}>
                                {t.storyDesc}
                            </p>
                            <blockquote className="story-quote" style={{ textAlign: 'center' }}>
                                {t.storyQuote}
                            </blockquote>
                        </div>

                        <div className="impact-metrics">
                            {t.metrics.map((metric, index) => (
                                <div className="metric-card" key={index}>
                                    <div className="metric-icon">{metric.icon}</div>
                                    <h4>{metric.title}</h4>
                                    <p style={{ color: "white" }}>{metric.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Section 6: Partners */}
            <section className="partners-section">
                <h2 className="section-title">{t.partnersTitle}</h2>
                <div className="partners-grid">
                    {t.partners.map((partner, index) => (
                        <div className="partner-logo" key={index}>{partner}</div>
                    ))}
                </div>
            </section>
            
            {/* Section 5: Call to Action */}
            <section className="cta-section">
                <div className="cta-container">
                    <div className="cta-text">
                        <h2>{t.ctaTitle}</h2>
                        <p>{t.ctaDesc}</p>
                    </div>
                    <div className="cta-buttons">
                        <button className="cta-primary" onClick={() => handleGetStarted("/contact")}>{t.ctaDonate}</button>
                        <button className="cta-secondary" onClick={() => handleGetStarted("/contact")}>{t.ctaVolunteer}</button>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default WomenEmpowerment;