import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const translations = {
  en: {
    login: "Login",
    signup: "Sign Up",
    email: "Email",
    password: "Password",
    firstName: "First Name",
    lastName: "Last Name",
    loginBtn: "Login",
    signupBtn: "Sign Up",
    dontHaveAccount: "Don't have an account? Sign Up",
    alreadyHaveAccount: "Already have an account? Login",
    invalid: "Invalid email or password.",
    exists: "User already exists with this email.",
    signupSuccess: "Signup successful! Please login.",
  },
  ar: {
    login: "تسجيل الدخول",
    signup: "إنشاء حساب",
    email: "البريد الإلكتروني",
    password: "كلمة المرور",
    firstName: "الاسم الأول",
    lastName: "اسم العائلة",
    loginBtn: "تسجيل الدخول",
    signupBtn: "إنشاء حساب",
    dontHaveAccount: "ليس لديك حساب؟ أنشئ حسابًا",
    alreadyHaveAccount: "لديك حساب بالفعل؟ تسجيل الدخول",
    invalid: "البريد الإلكتروني أو كلمة المرور غير صحيحة.",
    exists: "يوجد مستخدم بهذا البريد الإلكتروني.",
    signupSuccess: "تم إنشاء الحساب بنجاح! يرجى تسجيل الدخول.",
  },
  he: {
    login: "התחברות",
    signup: "הרשמה",
    email: "אימייל",
    password: "סיסמה",
    firstName: "שם פרטי",
    lastName: "שם משפחה",
    loginBtn: "התחבר",
    signupBtn: "הרשם",
    dontHaveAccount: "אין לך חשבון? הרשם",
    alreadyHaveAccount: "כבר יש לך חשבון? התחבר",
    invalid: "אימייל או סיסמה שגויים.",
    exists: "משתמש כבר קיים עם האימייל הזה.",
    signupSuccess: "ההרשמה הצליחה! אנא התחבר.",
  },
};

const rtlLanguages = ["ar", "he"];

const Login = () => {
  const navigate = useNavigate();

  const [language, setLanguage] = useState("en");
  const t = translations[language];
  const isRTL = rtlLanguages.includes(language);

  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [signUpData, setSignUpData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [isLogin, setIsLogin] = useState(true);

  const handleLoginChange = (e) =>
    setLoginData({ ...loginData, [e.target.name]: e.target.value });

  const handleSignUpChange = (e) =>
    setSignUpData({ ...signUpData, [e.target.name]: e.target.value });

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem("users")) || [];

    if (
      loginData.email === "admin@enkonix.in" &&
      loginData.password === "admin123"
    ) {
      setError("");
      localStorage.setItem("loggedInUserEmail", loginData.email);
      const logins = JSON.parse(localStorage.getItem("userLogins")) || {};
      logins[loginData.email] = new Date().toISOString();
      localStorage.setItem("userLogins", JSON.stringify(logins));
      navigate("/admin");
      return;
    }

    const user = users.find(
      (user) =>
        user.email === loginData.email &&
        user.password === loginData.password
    );

    if (user) {
      setError("");
      localStorage.setItem("loggedInUserEmail", JSON.stringify(user));
      const logins = JSON.parse(localStorage.getItem("userLogins")) || {};
      logins[user.email] = new Date().toISOString();
      localStorage.setItem("userLogins", JSON.stringify(logins));
      navigate("/home");
    } else {
      setError(t.invalid);
    }
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

  return (
    <div
      style={{
        ...styles.container,
        direction: isRTL ? "rtl" : "ltr",
        textAlign: isRTL ? "right" : "center",
      }}
    >
      <div style={{ marginBottom: "15px", textAlign: isRTL ? "right" : "left" }}>
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          style={{
            padding: "8px",
            borderRadius: "5px",
            border: "1px solid #00CAE0",
            background: "#111",
            color: "#fff",
            fontWeight: "bold",
          }}
        >
          <option value="en">English</option>
          <option value="ar">العربية</option>
          <option value="he">עברית</option>
        </select>
      </div>
      <h2 style={styles.heading}>{isLogin ? t.login : t.signup}</h2>

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
            dir={isRTL ? "rtl" : "ltr"}
          />
          <input
            style={styles.input}
            type="password"
            name="password"
            placeholder={t.password}
            value={loginData.password}
            onChange={handleLoginChange}
            required
            dir={isRTL ? "rtl" : "ltr"}
          />
          <button type="submit" style={styles.button}>
            {t.loginBtn}
          </button>
          <p
            style={styles.toggle}
            onClick={() => {
              setError("");
              setIsLogin(false);
            }}
          >
            {t.dontHaveAccount}
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
            dir={isRTL ? "rtl" : "ltr"}
          />
          <input
            style={styles.input}
            type="text"
            name="lastName"
            placeholder={t.lastName}
            value={signUpData.lastName}
            onChange={handleSignUpChange}
            required
            dir={isRTL ? "rtl" : "ltr"}
          />
          <input
            style={styles.input}
            type="email"
            name="email"
            placeholder={t.email}
            value={signUpData.email}
            onChange={handleSignUpChange}
            required
            dir={isRTL ? "rtl" : "ltr"}
          />
          <input
            style={styles.input}
            type="password"
            name="password"
            placeholder={t.password}
            value={signUpData.password}
            onChange={handleSignUpChange}
            required
            dir={isRTL ? "rtl" : "ltr"}
          />
          <button type="submit" style={styles.button}>
            {t.signupBtn}
          </button>
          <p
            style={styles.toggle}
            onClick={() => {
              setError("");
              setIsLogin(true);
            }}
          >
            {t.alreadyHaveAccount}
          </p>
        </form>
      )}

      {error && <p style={styles.errorMsg}>{error}</p>}
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "400px",
    margin: "80px auto",
    padding: "30px",
    borderRadius: "10px",
    backgroundColor: "#000",
    color: "#fff",
    fontFamily: "Arial, sans-serif",
    textAlign: "center",
    boxShadow: "0 0 15px rgba(0, 202, 224, 0.5)",
  },
  heading: {
    marginBottom: "20px",
    color: "#00CAE0",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  input: {
    padding: "12px",
    fontSize: "14px",
    borderRadius: "5px",
    border: "1px solid #00CAE0",
    backgroundColor: "#111",
    color: "#fff",
  },
  inputFocus: {
    borderColor: "#00CAE0",
    boxShadow: "0 0 5px #00CAE0",
  },
  button: {
    padding: "12px",
    backgroundColor: "#00CAE0",
    color: "#000",
    fontWeight: "bold",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "background-color 0.3s, color 0.3s",
  },
  buttonHover: {
    backgroundColor: "#fff",
    color: "#00CAE0",
  },
  toggle: {
    marginTop: "10px",
    color: "#00CAE0",
    cursor: "pointer",
  },
  errorMsg: {
    color: "red",
    marginTop: "10px",
  },
};

export default Login;
