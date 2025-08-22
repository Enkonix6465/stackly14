import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import './AboutUs.css';

const AboutUs = () => {
  const [theme, setTheme] = useState('light');

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

  const milestones = [
    {
        year: "1998",
        title: "Foundation of Hope",
        description: "Established by a group of teachers and social workers to address childhood hunger in Bengaluru slums. Started with a single community kitchen serving 50 meals daily.",
        icon: "🏠"
    },
    {
        year: "2001",
        title: "School Nutrition Program",
        description: "Partnered with 5 government schools to launch our flagship mid-day meal initiative, benefiting 1,200 children daily with balanced meals.",
        icon: "🏫"
    },
    {
        year: "2005",
        title: "State-Wide Expansion",
        description: "Expanded operations across Karnataka, reaching 50 schools and 10,000 children. Introduced nutrition monitoring systems.",
        icon: "🗺"
    },
    {
        year: "2009",
        title: "Nutrition Research Unit",
        description: "Established research collaboration with NIMHANS to develop specialized meals for malnourished children, improving recovery rates by 62%.",
        icon: "🔬"
    },
    {
        year: "2012",
        title: "National Recognition",
        description: "Received the National Child Welfare Award for innovative 'Food + Education' model that increased school attendance by 45% in partner schools.",
        icon: "🏆"
    },
    {
        year: "2016",
        title: "Disaster Response Initiative",
        description: "Launched emergency feeding programs during floods in Chennai and Kerala, serving over 500,000 meals to affected families.",
        icon: "🚨"
    },
    {
        year: "2020",
        title: "Pandemic Relief Efforts",
        description: "Distributed 3.2 million meal kits during COVID-19 lockdowns through our 'No Child Hungry' campaign, supported by 2,000 volunteers.",
        icon: "❤"
    },
    {
        year: "2023",
        title: "Sustainable Farming Project",
        description: "Established 12 organic farms to source 40% of our ingredients locally, creating 150 jobs while reducing costs by 25%.",
        icon: "🌱"
    }
  ];

  const teamMembers = [
    {
        name: "Dr. Priya Sharma",
        role: "Founder & CEO",
        bio: "Pediatric nutrition specialist with 20+ years fighting childhood hunger"
    },
    {
        name: "Rahul Kapoor",
        role: "Program Director",
        bio: "Leads our school meal initiatives across 5 states"
    },
    {
        name: "Ananya Patel",
        role: "Community Outreach",
        bio: "Connects with local communities to identify needs"
    },
  ];

  return (
    <>
        {/* Hero Section */}
        <section className={`hero ${theme === 'dark' ? 'dark-theme' : ''}`}>
            <div className="hero-overlay">
                <h1 className={theme === 'dark' ? 'text-white' : ''}>Join Hands for a Brighter Tomorrow.</h1>
                <p className={theme === 'dark' ? 'text-gray-300' : ''}>We believe that real change begins when we come together.</p>
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
                    Our Journey of Compassion
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
                {/* <div className="section-image-container">
                    <img src="/Images/our-mission.jpg" alt="Children receiving meals" />
                </div> */}
                <div className={`section-content-container ${theme === 'dark' ? 'dark-theme' : ''}`}>
                    <div className="section-header">
                        <h2 className={theme === 'dark' ? 'text-white' : ''}>Our Mission</h2>
                        <div className="section-underline"></div>
                    </div>
                    <div className="section-text">
                        <p className={theme === 'dark' ? 'text-gray-300' : ''} style={{ textAlign: "justify" }}>
                            Our mission is to empower underserved children by nourishing their bodies, inspiring their minds, and nurturing their potential. Through community‑centered nourishment programs, we deliver nutritious meals, educational support, and health awareness—creating pathways to growth and opportunity. We believe that every child deserves the strength to learn, the confidence to dream, and a brighter tomorrow.
                        </p>
                        <ul className={`section-list ${theme === 'dark' ? 'dark-theme' : ''}`}>
                            <li className={theme === 'dark' ? 'text-gray-300' : ''}>Daily school meal programs</li>
                            <li className={theme === 'dark' ? 'text-gray-300' : ''}>Nutrition education initiatives</li>
                            <li className={theme === 'dark' ? 'text-gray-300' : ''}>Community food security projects</li>
                            <li className={theme === 'dark' ? 'text-gray-300' : ''}>Emergency hunger relief</li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Vision Section */}
            <div className={`split-section vision-section ${theme === 'dark' ? 'dark-theme' : ''}`}>
                <div className={`section-content-container ${theme === 'dark' ? 'dark-theme' : ''}`}>
                    <div className="section-header">
                        <h2 className={theme === 'dark' ? 'text-white' : ''}>Our Vision</h2>
                        <div className="section-underline"></div>
                    </div>
                    <div className="section-text">
                        <p className={theme === 'dark' ? 'text-gray-300' : ''} style={{ textAlign: "justify" }}>
                            We envision a world where every child has equal opportunities to thrive—where hunger is no barrier to education and where communities are empowered to sustain their own nourishment. Through our holistic approach, we aim to break the cycle of poverty by fostering healthy bodies, curious minds, and resilient spirits.
                        </p>
                        <ul className={`section-list ${theme === 'dark' ? 'dark-theme' : ''}`}>
                            <li className={theme === 'dark' ? 'text-gray-300' : ''}>Nationwide access to school meals</li>
                            <li className={theme === 'dark' ? 'text-gray-300' : ''}>Education-first community development</li>
                            <li className={theme === 'dark' ? 'text-gray-300' : ''}>Sustainable local food systems</li>
                            <li className={theme === 'dark' ? 'text-gray-300' : ''}>Child-focused policy advocacy</li>
                        </ul>
                    </div>
                </div>
                {/* <div className="section-image-container">
                    <img src="/Images/vision.jpg" alt="Happy children learning" />
                </div> */}
            </div>
        </div>
        
        {/* Team Section */}
        <div className={`team-section ${theme === 'dark' ? 'dark-theme' : ''}`}>
            {/* Full-width colored header */}
            <div className={`team-header-bg ${theme === 'dark' ? 'dark-theme' : ''}`}>
                <div className="team-header-content">
                    <h2 className={theme === 'dark' ? 'text-white' : ''}>The Faces Behind Our Mission</h2>
                    <div className="section-underline"></div>
                    <p className={theme === 'dark' ? 'text-gray-300' : ''}>Meet the dedicated team making change possible</p>
                </div>
            </div>

            {/* Full-width team grid */}
            <div className={`team-grid-bg ${theme === 'dark' ? 'dark-theme' : ''}`}>
                <div className="team-grid-container">
                    {teamMembers.map((member, index) => (
                        <div key={index} className={`team-card ${theme === 'dark' ? 'dark-theme' : ''}`}>
                            {/* <div className="team-image-wrapper">
                                <img src={member.image} alt={member.name} />
                            </div> */}
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
                    <h3 className={theme === 'dark' ? 'text-white' : ''}>Join Our Volunteer Family</h3>
                    <p className={theme === 'dark' ? 'text-gray-300' : ''}>500+ volunteers help us deliver meals daily across India</p>
                    <button className="cta-button">Become a Volunteer</button>
                </div>
            </div>
        </div>
    </>
  );
};

export default AboutUs;