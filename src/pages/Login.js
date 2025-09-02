import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const translations = {
  en: {
    welcome: "Welcome to",
    appName: "STACKLY",
    loginSubtext: "Welcome back, Please login into an account",
    email: "Your Username",
    password: "Enter Password",
    forgot: "Forgot password?",
    loginBtn: "Login",
    signupBtn: "Sign Up",
    dontHave: "Don't have an account? Sign Up",
    alreadyHave: "Already have an account? Login",
    firstName: "First Name",
    lastName: "Last Name",
    resetTitle: "Reset Password",
    resetPlaceholder: "Enter your registered email",
    resetBtn: "Send Reset Link",
    backToLogin: "Back to Login",
    signupSuccess: "Signup successful! Please login.",
    invalid: "Invalid email or password.",
    exists: "User already exists with this email.",
    noUser: "No user found with this email.",
    resetMsg: "User found. Please check your email for password reset instructions. (Simulation)"
  },
  ar: {
    welcome: "مرحبًا في",
    appName: "STACKLY",
    loginSubtext: "مرحبًا بعودتك، يرجى تسجيل الدخول إلى حسابك",
    email: "اسم المستخدم",
    password: "أدخل كلمة المرور",
    forgot: "نسيت كلمة المرور؟",
    loginBtn: "تسجيل الدخول",
    signupBtn: "إنشاء حساب",
    dontHave: "ليس لديك حساب؟ أنشئ حساب",
    alreadyHave: "لديك حساب بالفعل؟ تسجيل الدخول",
    firstName: "الاسم الأول",
    lastName: "اسم العائلة",
    resetTitle: "إعادة تعيين كلمة المرور",
    resetPlaceholder: "أدخل بريدك الإلكتروني المسجل",
    resetBtn: "إرسال رابط إعادة التعيين",
    backToLogin: "العودة لتسجيل الدخول",
    signupSuccess: "تم التسجيل بنجاح! يرجى تسجيل الدخول.",
    invalid: "البريد الإلكتروني أو كلمة المرور غير صحيحة.",
    exists: "يوجد مستخدم بهذا البريد الإلكتروني.",
    noUser: "لا يوجد مستخدم بهذا البريد الإلكتروني.",
    resetMsg: "تم العثور على المستخدم. يرجى التحقق من بريدك الإلكتروني للحصول على تعليمات إعادة تعيين كلمة المرور. (محاكاة)"
  },
  he: {
    welcome: "ברוכים הבאים ל",
    appName: "STACKLY",
    loginSubtext: "ברוך שובך, אנא התחבר לחשבון שלך",
    email: "שם משתמש",
    password: "הזן סיסמה",
    forgot: "שכחת סיסמה?",
    loginBtn: "התחבר",
    signupBtn: "הרשמה",
    dontHave: "אין לך חשבון? הרשמה",
    alreadyHave: "יש לך חשבון? התחבר",
    firstName: "שם פרטי",
    lastName: "שם משפחה",
    resetTitle: "איפוס סיסמה",
    resetPlaceholder: "הזן את האימייל הרשום שלך",
    resetBtn: "שלח קישור לאיפוס",
    backToLogin: "חזרה להתחברות",
    signupSuccess: "ההרשמה הצליחה! אנא התחבר.",
    invalid: "אימייל או סיסמה לא נכונים.",
    exists: "משתמש כבר קיים עם אימייל זה.",
    noUser: "לא נמצא משתמש עם אימייל זה.",
    resetMsg: "משתמש נמצא. בדוק את האימייל שלך להוראות איפוס סיסמה. (סימולציה)"
  }
};

const Login = () => {
  const navigate = useNavigate();

  const [language, setLanguage] = useState("en");
  const t = translations[language];

  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [signUpData, setSignUpData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");
  const [resetMessage, setResetMessage] = useState("");

  React.useEffect(() => {
    if (language === "ar" || language === "he") {
      document.body.dir = "rtl";
    } else {
      document.body.dir = "ltr";
    }
  }, [language]);

  const handleLoginChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem("users")) || [];

    if (loginData.email === "admin@enkonix.in" && loginData.password === "admin123") {
      setError("");
      localStorage.setItem("loggedInUserEmail", loginData.email);
      const logins = JSON.parse(localStorage.getItem("userLogins")) || {};
      logins[loginData.email] = new Date().toISOString();
      localStorage.setItem("userLogins", JSON.stringify(logins));
      navigate("/admin");
      return;
    }

    const user = users.find(
      (user) => user.email === loginData.email && user.password === loginData.password
    );

    if (user) {
      setError("");
      localStorage.setItem("loggedInUserEmail", user.email);
      const logins = JSON.parse(localStorage.getItem("userLogins")) || {};
      logins[user.email] = new Date().toISOString();
      localStorage.setItem("userLogins", JSON.stringify(logins));
      navigate("/home");
    } else {
      setError(t.invalid);
    }
  };

  const handleSignUpChange = (e) => {
    setSignUpData({ ...signUpData, [e.target.name]: e.target.value });
  };

  const handleSignUpSubmit = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem("users")) || [];

    if (users.find((user) => user.email === signUpData.email)) {
      setError(t.exists);
      return;
    }

    users.push(signUpData);
    localStorage.setItem("users", JSON.stringify(users));
    setError("");
    alert(t.signupSuccess);
    setSignUpData({ firstName: "", lastName: "", email: "", password: "" });
    setIsLogin(true);
  };

  const handleForgotPasswordChange = (e) => {
    setForgotEmail(e.target.value);
  };

  const handleForgotPasswordSubmit = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem("users")) || [];

    const user = users.find((user) => user.email === forgotEmail);

    if (!user) {
      setError(t.noUser);
      setResetMessage("");
    } else {
      setError("");
      setResetMessage(t.resetMsg);
    }
  };

  return (
    <>
      <style>{`
        body {
          background: linear-gradient(135deg, #00CAE0 0%, #00CAE0 100%);
        }
        .welcome-center-box {
          min-width: 440px;
          max-width: 540px;
          width: 100%;
          background: #fff;
          border-radius: 14px;
          box-shadow: 0 8px 32px rgba(10,3,67,0.15);
          padding: 40px 32px;
          margin: auto;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
        .language-dropdown {
          margin-bottom: 18px;
          align-self: flex-end;
        }
        @media (max-width: 600px) {
          .welcome-center-box {
            padding: 24px 8px;
            min-width: unset;
            max-width: 98vw;
          }
        }
      `}</style>
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "Arial, sans-serif",
          background: "linear-gradient(135deg, #00CAE0 0%, #00CAE0 100%)",
        }}
      >
        <div className="welcome-center-box">
          <select
            className="language-dropdown"
            value={language}
            onChange={e => setLanguage(e.target.value)}
          >
            <option value="en">English</option>
            <option value="ar">العربية</option>
            <option value="he">עברית</option>
          </select>
          {!isForgotPassword ? (
            <>
              <h1 style={styles.welcomeHeading}>
                {t.welcome} <span style={styles.highlight}>{t.appName}</span>
              </h1>
              <p style={styles.welcomeSubtext}>
                {t.loginSubtext}
              </p>
              {isLogin ? (
                <form onSubmit={handleLoginSubmit} style={styles.form}>
                  <input
                    style={styles.input}
                    type="email"
                    name="email"
                    placeholder={t.email}
                    value={loginData.email}
                    onChange={handleLoginChange}
                    required
                  />
                  <input
                    style={styles.input}
                    type="password"
                    name="password"
                    placeholder={t.password}
                    value={loginData.password}
                    onChange={handleLoginChange}
                    required
                  />
                  <p
                    style={styles.forgotPassword}
                    onClick={() => {
                      setError("");
                      setIsForgotPassword(true);
                      setResetMessage("");
                    }}
                  >
                    {t.forgot}
                  </p>
                  <button type="submit" style={styles.loginButton}>
                    <span role="img" aria-label="user-lock" style={{ marginRight: 8 }}>👤🔒</span> {t.loginBtn}
                  </button>
                  <p
                    style={styles.toggle}
                    onClick={() => {
                      setError("");
                      setIsLogin(false);
                    }}
                  >
                    {t.dontHave}
                  </p>
                </form>
              ) : (
                <form onSubmit={handleSignUpSubmit} style={styles.form}>
                  <input
                    style={styles.input}
                    type="text"
                    name="firstName"
                    placeholder={t.firstName}
                    value={signUpData.firstName}
                    onChange={handleSignUpChange}
                    required
                  />
                  <input
                    style={styles.input}
                    type="text"
                    name="lastName"
                    placeholder={t.lastName}
                    value={signUpData.lastName}
                    onChange={handleSignUpChange}
                    required
                  />
                  <input
                    style={styles.input}
                    type="email"
                    name="email"
                    placeholder={t.email}
                    value={signUpData.email}
                    onChange={handleSignUpChange}
                    required
                  />
                  <input
                    style={styles.input}
                    type="password"
                    name="password"
                    placeholder={t.password}
                    value={signUpData.password}
                    onChange={handleSignUpChange}
                    required
                  />
                  <button type="submit" style={styles.loginButton}>
                    {t.signupBtn}
                  </button>
                  <p
                    style={styles.toggle}
                    onClick={() => {
                      setError("");
                      setIsLogin(true);
                    }}
                  >
                    {t.alreadyHave}
                  </p>
                </form>
              )}

              {error && <p style={styles.errorMsg}>{error}</p>}
              {resetMessage && <p style={{ color: "green", marginTop: 10 }}>{resetMessage}</p>}
            </>
          ) : (
            <>
              <h2 style={styles.welcomeHeading}>{t.resetTitle}</h2>
              <form onSubmit={handleForgotPasswordSubmit} style={styles.form}>
                <input
                  style={styles.input}
                  type="email"
                  placeholder={t.resetPlaceholder}
                  value={forgotEmail}
                  onChange={handleForgotPasswordChange}
                  required
                />
                <button type="submit" style={styles.loginButton}>
                  {t.resetBtn}
                </button>
                <p
                  style={styles.toggle}
                  onClick={() => {
                    setError("");
                    setResetMessage("");
                    setIsForgotPassword(false);
                  }}
                >
                  {t.backToLogin}
                </p>
              </form>
              {error && <p style={styles.errorMsg}>{error}</p>}
              {resetMessage && <p style={{ color: "green", marginTop: 10 }}>{resetMessage}</p>}
            </>
          )}
        </div>
      </div>
    </>
  );
};

const styles = {
  welcomeHeading: {
    fontSize: "28px",
    fontWeight: "bold",
    marginBottom: "10px",
  },
  highlight: {
    color: "#00CAE0",
  },
  welcomeSubtext: {
    marginBottom: "30px",
    color: "#666",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  input: {
    padding: "12px 15px",
    fontSize: "16px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    outline: "none",
    transition: "border-color 0.3s",
  },
  loginButton: {
    backgroundColor: "#00CAE0",
    color: "#fff",
    fontWeight: "bold",
    border: "none",
    padding: "12px",
    borderRadius: "6px",
    cursor: "pointer",
    marginTop: "10px",
  },
  forgotPassword: {
    textAlign: "right",
    color: "#00CAE0",
    cursor: "pointer",
    fontSize: "14px",
    marginTop: "-10px",
  },
  toggle: {
    cursor: "pointer",
    color: "#00CAE0",
    marginTop: "15px",
    textAlign: "center",
    userSelect: "none",
  },
  errorMsg: {
    color: "red",
    marginTop: "10px",
  },
};

export default Login;
