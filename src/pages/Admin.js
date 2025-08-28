import React, { useEffect, useState } from "react";
import { Bar, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

// Translations
const translations = {
  en: {
    userTable: "User Data Table",
    name: "Name",
    email: "Email",
    loginDate: "Login Date/Time",
    loginGraph: "Login Activity Graph",
    loginsPerDay: "User Logins Per Day",
    signupTrends: "User Signup Trends",
    signupGraph: "User Signup Trends",
    activeUsers: "Active Users",
    inactiveUsers: "Inactive Users",
    loggedInLast: "Logged in last 30 days",
    notLoggedIn: "Not logged in in 30 days",
    recentLogin: "Recent Login Activity",
    signupGrowth: "Signup Growth This Week",
    compared: "compared to previous week",
    noUsers: "No users found.",
  },
  ar: {
    userTable: "جدول بيانات المستخدمين",
    name: "الاسم",
    email: "البريد الإلكتروني",
    loginDate: "تاريخ/وقت تسجيل الدخول",
    loginGraph: "رسم بياني لنشاط تسجيل الدخول",
    loginsPerDay: "تسجيلات الدخول اليومية",
    signupTrends: "اتجاهات تسجيل المستخدمين",
    signupGraph: "اتجاهات تسجيل المستخدمين",
    activeUsers: "المستخدمون النشطون",
    inactiveUsers: "المستخدمون غير النشطين",
    loggedInLast: "تم تسجيل الدخول خلال آخر 30 يومًا",
    notLoggedIn: "لم يتم تسجيل الدخول خلال 30 يومًا",
    recentLogin: "نشاط تسجيل الدخول الأخير",
    signupGrowth: "نمو التسجيل هذا الأسبوع",
    compared: "مقارنة بالأسبوع السابق",
    noUsers: "لم يتم العثور على مستخدمين.",
  },
  he: {
    userTable: "טבלת נתוני משתמשים",
    name: "שם",
    email: "אימייל",
    loginDate: "תאריך/שעת התחברות",
    loginGraph: "גרף פעילות התחברות",
    loginsPerDay: "התחברויות ליום",
    signupTrends: "מגמות הרשמת משתמשים",
    signupGraph: "מגמות הרשמה",
    activeUsers: "משתמשים פעילים",
    inactiveUsers: "משתמשים לא פעילים",
    loggedInLast: "התחברו ב-30 הימים האחרונים",
    notLoggedIn: "לא התחברו ב-30 ימים",
    recentLogin: "פעילות התחברות אחרונה",
    signupGrowth: "צמיחת הרשמות השבוע",
    compared: "בהשוואה לשבוע הקודם",
    noUsers: "לא נמצאו משתמשים.",
  },
};

const rtlLanguages = ["ar", "he"];

// Styles & Animations
const fadeInUp = {
  animation: "fadeInUp 0.8s ease forwards",
  opacity: 0,
  transform: "translateY(20px)",
};

const styles = {
  keyframes: `
  @keyframes fadeInUp {
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  `,
};

const Admin = () => {
  const [language, setLanguage] = useState("en");
  const t = translations[language];
  const isRTL = rtlLanguages.includes(language);

  const [allUserData, setAllUserData] = useState([]);
  const [loginStats, setLoginStats] = useState({ labels: [], data: [] });
  const [signupStats, setSignupStats] = useState({ labels: [], data: [] });
  const [userStatus, setUserStatus] = useState({ activeUsers: 0, inactiveUsers: 0 });
  const [recentLogins, setRecentLogins] = useState([]);
  const [signupGrowth, setSignupGrowth] = useState({ percent: 0, isGrowth: true });

  useEffect(() => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const logins = JSON.parse(localStorage.getItem("userLogins")) || {};

    const usersWithLogin = users.map((u) => ({
      name: `${u.firstName} ${u.lastName}`,
      email: u.email,
      loginTime: logins[u.email] || "N/A",
      signupDate: u.signupDate || "N/A",
    }));
    setAllUserData(usersWithLogin);

    // Process login stats
    const counts = {};
    const timestamps = [];
    Object.entries(logins).forEach(([email, ts]) => {
      if (ts && ts !== "N/A") {
        const date = new Date(ts).toLocaleDateString();
        counts[date] = (counts[date] || 0) + 1;
        timestamps.push({ email, dateTime: ts });
      }
    });
    const sortedDates = Object.keys(counts).sort((a, b) => new Date(a) - new Date(b));
    setLoginStats({ labels: sortedDates, data: sortedDates.map((d) => counts[d]) });

    // Recent logins (latest 5)
    const recent = timestamps
      .sort((a, b) => new Date(b.dateTime) - new Date(a.dateTime))
      .slice(0, 5);
    setRecentLogins(recent);

    // Signup stats
    const sCounts = {};
    users.forEach((u) => {
      if (u.signupDate) {
        const date = new Date(u.signupDate).toLocaleDateString();
        sCounts[date] = (sCounts[date] || 0) + 1;
      }
    });
    const sDates = Object.keys(sCounts).sort((a, b) => new Date(a) - new Date(b));
    setSignupStats({ labels: sDates, data: sDates.map((d) => sCounts[d]) });

    // Signup growth calculation
    const lastWeek = signupStats.data.slice(-7).reduce((a, b) => a + b, 0);
    const prevWeek = signupStats.data.slice(-14, -7).reduce((a, b) => a + b, 0);
    const growth = prevWeek ? ((lastWeek - prevWeek) / prevWeek) * 100 : lastWeek > 0 ? 100 : 0;
    setSignupGrowth({ percent: Math.abs(growth.toFixed(1)), isGrowth: growth >= 0 });

    // Active / Inactive calculation
    const now = Date.now();
    const threshold = 30 * 24 * 60 * 60 * 1000;
    let active = 0, inactive = 0;
    usersWithLogin.forEach((u) => {
      if (u.loginTime !== "N/A") {
        const diff = now - new Date(u.loginTime).getTime();
        diff <= threshold ? active++ : inactive++;
      } else inactive++;
    });
    setUserStatus({ activeUsers: active, inactiveUsers: inactive });
  }, [signupStats.data]);

  if (!allUserData.length) {
    return (
      <div
        style={{
          direction: isRTL ? "rtl" : "ltr",
          textAlign: isRTL ? "right" : "center",
          marginTop: 40,
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
        <p style={{ color: "#001f4d", fontSize: 18 }}>
          {t.noUsers}
        </p>
      </div>
    );
  }

  const loginChartData = {
    labels: loginStats.labels,
    datasets: [
      {
        label: t.loginGraph,
        data: loginStats.data,
        backgroundColor: "rgba(0,31,77,0.8)",
        borderRadius: 4,
      },
    ],
  };

  const signupChartData = {
    labels: signupStats.labels,
    datasets: [
      {
        label: t.signupGraph,
        data: signupStats.data,
        fill: false,
        borderColor: "rgba(0,31,77,0.9)",
        backgroundColor: "rgba(0,31,77,0.5)",
        tension: 0.3,
        pointRadius: 6,
      },
    ],
  };

  const baseOptions = {
    responsive: true,
    plugins: {
      legend: { labels: { color: "#000" }, position: "top" },
      title: { display: true, font: { size: 22, weight: "bold" }, color: "#000" },
      tooltip: { mode: "index", intersect: false },
    },
    scales: {
      x: { ticks: { color: "#001f4d", maxRotation: 90, minRotation: 45 }, grid: { color: "#e0e0e0" } },
      y: { ticks: { color: "#001f4d" }, grid: { color: "#e0e0e0" }, beginAtZero: true },
    },
  };

  return (
    <>
      <style>{styles.keyframes}</style>
      <div
        style={{
          maxWidth: 1000,
          margin: "40px auto",
          padding: 20,
          fontFamily: "'Segoe UI', sans-serif",
          backgroundColor: "#f5f8fc",
          color: "#001f4d",
          borderRadius: 10,
          boxShadow: "0 6px 20px rgba(0,31,77,0.15)",
          direction: isRTL ? "rtl" : "ltr",
          textAlign: isRTL ? "right" : "left",
        }}
      >
        {/* Language Dropdown */}
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

        {/* User Table */}
        <section style={{ ...fadeInUp, marginBottom: 60, padding: 20, backgroundColor: "#fff", borderRadius: 12, boxShadow: "0 4px 15px rgba(0,31,77,0.1)" }}>
          <h2 style={{ marginBottom: 20, color: "#001f4d", fontWeight: 700 }}>{t.userTable}</h2>
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 600, fontSize: 16, color: "#001f4d" }}>
              <thead>
                <tr style={{ backgroundColor: "#001f4d", color: "#fff", userSelect: "none" }}>
                  <th style={{ padding: 14, borderBottom: "3px solid #004080", textAlign: "left" }}>{t.name}</th>
                  <th style={{ padding: 14, borderBottom: "3px solid #004080", textAlign: "left" }}>{t.email}</th>
                  <th style={{ padding: 14, borderBottom: "3px solid #004080", textAlign: "left" }}>{t.loginDate}</th>
                </tr>
              </thead>
              <tbody>
                {allUserData.map((u, idx) => (
                  <tr key={idx} style={{ borderBottom: "1px solid #cbd5e1", backgroundColor: idx % 2 === 0 ? "#fff" : "#e6f0ff", transition: "background-color 0.3s, color 0.3s" }}>
                    <td style={{ padding: 12 }}>{u.name}</td>
                    <td style={{ padding: 12 }}>{u.email}</td>
                    <td style={{ padding: 12 }}>{u.loginTime !== "N/A" ? new Date(u.loginTime).toLocaleString() : "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Login Chart */}
        <section style={{ ...fadeInUp, marginBottom: 60, padding: 20, backgroundColor: "#fff", borderRadius: 12, boxShadow: "0 4px 15px rgba(0,31,77,0.1)" }}>
          <h2 style={{ marginBottom: 20, color: "#001f4d", fontWeight: 700 }}>{t.loginGraph}</h2>
          <Bar data={loginChartData} options={{ ...baseOptions, plugins: { ...baseOptions.plugins, title: { ...baseOptions.plugins.title, text: t.loginsPerDay } } }} />
        </section>

        {/* Signup Chart */}
        <section style={{ ...fadeInUp, marginBottom: 60, padding: 20, backgroundColor: "#e6f0ff", borderRadius: 12, boxShadow: "0 4px 15px rgba(0,31,77,0.1)" }}>
          <h2 style={{ marginBottom: 20, color: "#001f4d", fontWeight: 700 }}>{t.signupTrends}</h2>
          <Line data={signupChartData} options={{ ...baseOptions, plugins: { ...baseOptions.plugins, title: { ...baseOptions.plugins.title, text: t.signupGraph } } }} />
        </section>

        {/* Active / Inactive Cards */}
        <section style={{ ...fadeInUp, marginBottom: 40, display: "flex", justifyContent: "space-around", padding: 20, backgroundColor: "#fff", borderRadius: 12, boxShadow: "0 4px 20px rgba(0,31,77,0.12)", gap: 20 }}>
          <div style={{ flex: 1, padding: 24, backgroundColor: "#001f4d", color: "#fff", borderRadius: 12, textAlign: "center", boxShadow: "0 6px 18px rgba(0,31,77,0.4)" }}>
            <h3 style={{ marginBottom: 12, fontWeight: 700 }}>{t.activeUsers}</h3>
            <p style={{ margin: 0, fontSize: 36 }}>{userStatus.activeUsers}</p>
            <small style={{ fontWeight: 500 }}>{t.loggedInLast}</small>
          </div>
          <div style={{ flex: 1, padding: 24, backgroundColor: "#000", color: "#00CAE0", borderRadius: 12, textAlign: "center", boxShadow: "0 6px 18px rgba(0,170,255,0.5)" }}>
            <h3 style={{ marginBottom: 12, fontWeight: 700 }}>{t.inactiveUsers}</h3>
            <p style={{ margin: 0, fontSize: 36 }}>{userStatus.inactiveUsers}</p>
            <small style={{ fontWeight: 500 }}>{t.notLoggedIn}</small>
          </div>
        </section>

        {/* Recent Logins */}
        <section style={{ ...fadeInUp, marginBottom: 60, padding: 40, backgroundColor: "#fff", borderRadius: 12, boxShadow: "0 4px 15px rgba(0,31,77,0.1)" }}>
          <h2 style={{ marginBottom: 12, fontWeight: 700, color: "#001f4d" }}>{t.recentLogin}</h2>
          <div style={{ maxHeight: 200, overflowY: "auto" }}>
            {recentLogins.map((e, idx) => (
              <div key={idx} style={{ padding: 12, borderBottom: "1px solid #e0e0e0", display: "flex", justifyContent: "space-between" }}>
                <span>{e.email}</span>
                <span>{new Date(e.dateTime).toLocaleString()}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Signup Growth */}
        <section style={{ ...fadeInUp, padding: 24, borderRadius: 12, backgroundColor: signupGrowth.isGrowth ? "#f0fdfd" : "#fdf0f0", textAlign: "center", marginBottom: 60, boxShadow: `0 4px 12px rgba(${signupGrowth.isGrowth ? "0,170,0" : "170,0,0"}, 0.4)` }}>
          <h3 style={{ marginBottom: 12, fontWeight: 700 }}>{t.signupGrowth}</h3>
          <p style={{ margin: 0, fontSize: 36 }}>{signupGrowth.isGrowth ? "▲" : "▼"} {signupGrowth.percent}%</p>
          <small style={{ fontWeight: 500 }}>{t.compared}</small>
        </section>
      </div>
    </>
  );
};

export default Admin;
