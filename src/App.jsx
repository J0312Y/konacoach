import { useState, useEffect, useRef } from "react";

// ─── MOCK DATA ────────────────────────────────────────────────────────────────
const WORKOUTS = [
  { id: 1, title: "Cardio Brûle-graisses", duration: "30 min", kcal: 420, level: "Débutant", tag: "Sans matériel", category: "Cardio", img: "https://images.unsplash.com/photo-1538805060514-97d9cc17730c?w=400&q=80" },
  { id: 2, title: "Prise de Masse Upper Body", duration: "45 min", kcal: 380, level: "Intermédiaire", tag: "Haltères", category: "Musculation", img: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=400&q=80" },
  { id: 3, title: "HIIT Express", duration: "20 min", kcal: 350, level: "Avancé", tag: "Sans matériel", category: "Cardio", img: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400&q=80" },
  { id: 4, title: "Ramadan — Après Iftâr", duration: "25 min", kcal: 200, level: "Léger", tag: "Après rupture", category: "Ramadan", img: "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=400&q=80" },
  { id: 5, title: "Endurance Course à Pied", duration: "50 min", kcal: 520, level: "Intermédiaire", tag: "Outdoor", category: "Cardio", img: "https://images.unsplash.com/photo-1571008887538-b36bb32f4571?w=400&q=80" },
  { id: 6, title: "Stretching & Récupération", duration: "20 min", kcal: 80, level: "Tous niveaux", tag: "Tapis", category: "Maison", img: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&q=80" },
];

const MEALS = [
  { id: 1, name: "Thiéboudienne", kcal: 520, protein: 32, carbs: 68, fat: 14, tags: ["Riz", "Poisson"], img: "https://images.unsplash.com/photo-1604329760661-e71dc83f8f26?w=400&q=80", desc: "Le plat national sénégalais. Riz au poisson avec légumes mijotés dans une sauce tomate épicée." },
  { id: 2, name: "Poulet Yassa", kcal: 380, protein: 42, carbs: 28, fat: 10, tags: ["Léger", "Protéiné"], img: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=400&q=80", desc: "Poulet mariné dans du jus de citron et oignons caramélisés. Riche en protéines, idéal post-entraînement." },
  { id: 3, name: "Mafé", kcal: 450, protein: 28, carbs: 35, fat: 18, tags: ["Arachide", "Bœuf"], img: "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400&q=80", desc: "Ragoût de bœuf à la pâte d'arachide. Très nourrissant, riche en protéines et bonnes graisses." },
  { id: 4, name: "Thiof Braisé", kcal: 290, protein: 38, carbs: 12, fat: 9, tags: ["Poisson", "Grillé"], img: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=400&q=80", desc: "Mérou braisé aux épices locales. Très faible en calories, excellente source de protéines maigres." },
  { id: 5, name: "Domoda", kcal: 480, protein: 30, carbs: 42, fat: 16, tags: ["Bœuf", "Tomate"], img: "https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?w=400&q=80", desc: "Ragoût de bœuf à la tomate et aux légumes de saison. Complet et équilibré en macronutriments." },
  { id: 6, name: "Ndambé", kcal: 310, protein: 18, carbs: 48, fat: 7, tags: ["Haricots", "Végétarien"], img: "https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?w=400&q=80", desc: "Ragoût de haricots noirs sénégalais. Riche en fibres et protéines végétales, parfait le matin." },
];

const COACHES = [
  { id: 1, name: "Ibrahima Diallo", specialty: "Musculation & Force", location: "Dakar Plateau", rating: 4.9, reviews: 47, experience: "8 ans", price: "15 000 FCFA/séance", img: "https://images.unsplash.com/photo-1567013127542-490d757e51fc?w=200&q=80", verified: true },
  { id: 2, name: "Fatou Ndiaye", specialty: "Yoga & Cardio Féminin", location: "Almadies, Dakar", rating: 5.0, reviews: 23, experience: "5 ans", price: "12 000 FCFA/séance", img: "https://images.unsplash.com/photo-1571731956672-f2b94d7dd0cb?w=200&q=80", verified: true },
  { id: 3, name: "Moussa Seck", specialty: "Football & Endurance", location: "Yoff, Dakar", rating: 4.7, reviews: 31, experience: "6 ans", price: "10 000 FCFA/séance", img: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=200&q=80", verified: false },
];

const GOALS = [
  { id: "poids", label: "Perdre du poids", desc: "Brûler les graisses et affiner ta silhouette avec cardio et nutrition ciblée", img: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&q=80" },
  { id: "muscle", label: "Prendre du muscle", desc: "Musculation progressive, nutrition protéinée et récupération optimale", img: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=300&q=80" },
  { id: "forme", label: "Maintenir la forme", desc: "Rester actif, en bonne santé et plein d'énergie au quotidien", img: "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=300&q=80" },
  { id: "ramadan", label: "Ramadan actif", desc: "Rester en mouvement pendant le mois sacré avec des séances douces", img: "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=300&q=80" },
];

const WEEK = [
  { day: "Lun", date: 15, status: "done" },
  { day: "Mar", date: 16, status: "done" },
  { day: "Mer", date: 17, status: "rest" },
  { day: "Jeu", date: 18, status: "done" },
  { day: "Ven", date: 19, status: "today" },
  { day: "Sam", date: 20, status: "empty" },
  { day: "Dim", date: 21, status: "empty" },
];

const BADGES = [
  { id: 1, name: "7 jours consécutifs", earned: true, img: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=100&q=70" },
  { id: 2, name: "1er mois complet", earned: true, img: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=100&q=70" },
  { id: 3, name: "Nutrition Pro", earned: true, img: "https://images.unsplash.com/photo-1604329760661-e71dc83f8f26?w=100&q=70" },
  { id: 4, name: "50 séances", earned: false, img: "https://images.unsplash.com/photo-1571008887538-b36bb32f4571?w=100&q=70" },
  { id: 5, name: "30 jours de suite", earned: false, img: "https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?w=100&q=70" },
];

// ─── STYLES ───────────────────────────────────────────────────────────────────
const G = {
  g900: "#0A1A0F", g800: "#112016", g700: "#1A3322", g600: "#2D6A4F",
  g500: "#40916C", g400: "#52B788", g300: "#74C69D", g50: "#D8F3DC",
  amber: "#F4A261", coral: "#E76F51", gold: "#D4A017",
};

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700;800&family=DM+Sans:wght@400;500;600&display=swap');
  * { margin:0; padding:0; box-sizing:border-box; -webkit-tap-highlight-color:transparent; }
  body { background:#111; font-family:'DM Sans',sans-serif; overflow:hidden; height:100vh; }
  ::-webkit-scrollbar { display:none; }
  * { scrollbar-width:none; }

  .shell {
    position:fixed; top:50%; left:50%; transform:translate(-50%,-50%);
    width:390px; height:844px;
    background:${G.g900}; border-radius:50px;
    box-shadow: 0 50px 150px rgba(0,0,0,0.7), 0 0 0 10px #0a0a0a, inset 0 0 0 1.5px rgba(255,255,255,0.06);
    overflow:hidden; display:flex; flex-direction:column;
    transition: transform 0.3s ease;
  }

  .sbar {
    flex-shrink:0; height:48px; background:${G.g900};
    display:flex; align-items:flex-end; justify-content:space-between;
    padding:0 26px 8px; position:relative; z-index:100;
  }
  .notch {
    position:absolute; top:0; left:50%; transform:translateX(-50%);
    width:116px; height:32px; background:${G.g900}; border-radius:0 0 18px 18px;
  }
  .sbar-time { font-family:'Sora',sans-serif; font-size:13px; font-weight:700; color:rgba(255,255,255,0.9); }
  .sbar-icons { display:flex; align-items:center; gap:6px; }

  .screens { flex:1; position:relative; overflow:hidden; }
  .screen {
    position:absolute; inset:0; overflow-y:auto; overflow-x:hidden;
    opacity:0; pointer-events:none;
    transition:opacity 0.28s ease, transform 0.28s ease;
    transform:translateX(20px);
  }
  .screen.active { opacity:1; pointer-events:all; transform:translateX(0); }
  .screen.out { opacity:0; transform:translateX(-20px); }

  .bnav {
    flex-shrink:0; height:80px;
    background:rgba(10,26,15,0.98); border-top:1px solid rgba(82,183,136,0.1);
    display:flex; align-items:center; justify-content:space-around;
    padding:0 4px 18px; z-index:100;
  }
  .ni {
    display:flex; flex-direction:column; align-items:center; gap:4px;
    padding:6px 12px; border-radius:10px; cursor:pointer;
    transition:all 0.18s; min-width:52px;
  }
  .ni:active { transform:scale(0.88); }
  .ni span { font-size:9.5px; font-weight:500; color:rgba(255,255,255,0.28); transition:color 0.18s; }
  .ni.on span { color:${G.g400}; }

  .btn-main {
    width:100%; padding:15px; border-radius:12px; border:none; cursor:pointer;
    background:${G.g400}; font-family:'Sora',sans-serif; font-size:15px; font-weight:700;
    color:${G.g900}; transition:all 0.18s; display:flex; align-items:center; justify-content:center; gap:8px;
  }
  .btn-main:active { transform:scale(0.97); background:${G.g300}; }
  .btn-ghost {
    width:100%; padding:13px; border-radius:12px; cursor:pointer;
    background:transparent; border:1.5px solid rgba(255,255,255,0.12);
    font-family:'Sora',sans-serif; font-size:14px; font-weight:600;
    color:rgba(255,255,255,0.6); transition:all 0.18s;
  }
  .btn-ghost:active { background:rgba(255,255,255,0.05); }

  .pbar { height:3.5px; background:rgba(255,255,255,0.07); border-radius:2px; overflow:hidden; }
  .pbar-fill { height:100%; border-radius:2px; transition:width 0.8s ease; }

  @keyframes fadeUp { from { opacity:0; transform:translateY(14px); } to { opacity:1; transform:translateY(0); } }
  @keyframes floatAnim { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-7px)} }
  .fu { animation:fadeUp 0.36s ease forwards; opacity:0; }
  .fu1{animation-delay:0.04s} .fu2{animation-delay:0.10s} .fu3{animation-delay:0.16s}
  .fu4{animation-delay:0.22s} .fu5{animation-delay:0.28s}

  .toast-wrap {
    position:absolute; bottom:92px; left:50%; transform:translateX(-50%);
    background:${G.g400}; color:${G.g900}; padding:9px 20px; border-radius:20px;
    font-size:12px; font-weight:700; font-family:'Sora',sans-serif;
    white-space:nowrap; pointer-events:none; z-index:500;
    transition:opacity 0.22s, transform 0.22s;
  }
`;

// ─── HELPERS ─────────────────────────────────────────────────────────────────
const StarRating = ({ rating, size = 10 }) => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    const filled = i <= Math.round(rating);
    stars.push(
      <svg key={i} width={size} height={size} viewBox="0 0 12 12">
        <polygon
          points="6,1 7.5,4.5 11,4.5 8.5,7 9.5,10.5 6,8.5 2.5,10.5 3.5,7 1,4.5 4.5,4.5"
          fill={filled ? G.gold : "rgba(255,255,255,0.15)"}
        />
      </svg>
    );
  }
  return <span style={{ display: "flex", gap: 2 }}>{stars}</span>;
};

const Img = ({ src, alt, style, ...props }) => {
  const [err, setErr] = useState(false);
  return err ? (
    <div style={{ background: "rgba(255,255,255,0.06)", ...style, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" strokeLinecap="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 16l5-5 4 4 3-3 5 5"/><circle cx="8.5" cy="8.5" r="1.5"/></svg>
    </div>
  ) : (
    <img src={src} alt={alt} style={style} onError={() => setErr(true)} {...props} />
  );
};

const DiffBadge = ({ level }) => {
  const colors = {
    "Débutant": { bg: "rgba(82,183,136,0.12)", color: G.g400 },
    "Intermédiaire": { bg: "rgba(244,162,97,0.12)", color: G.amber },
    "Avancé": { bg: "rgba(231,111,81,0.12)", color: G.coral },
    "Léger": { bg: "rgba(82,183,136,0.12)", color: G.g400 },
    "Tous niveaux": { bg: "rgba(255,255,255,0.07)", color: "rgba(255,255,255,0.5)" },
  };
  const c = colors[level] || colors["Tous niveaux"];
  return (
    <span style={{ background: c.bg, color: c.color, padding: "3px 9px", borderRadius: 20, fontSize: 9.5, fontWeight: 700 }}>
      {level}
    </span>
  );
};

// ─── ICON COMPONENTS ─────────────────────────────────────────────────────────
const IconHome = ({ color }) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
  </svg>
);
const IconDumbbell = ({ color }) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 4v16M18 4v16M4 8h4M16 8h4M4 16h4M16 16h4M8 12h8"/>
  </svg>
);
const IconFood = ({ color }) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 8h1a4 4 0 0 1 0 8h-1M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/>
    <line x1="6" y1="1" x2="6" y2="4"/><line x1="10" y1="1" x2="10" y2="4"/><line x1="14" y1="1" x2="14" y2="4"/>
  </svg>
);
const IconChart = ({ color }) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
  </svg>
);
const IconUser = ({ color }) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
  </svg>
);
const IconCheck = () => (
  <svg width="13" height="10" viewBox="0 0 13 10" fill="none">
    <path d="M1.5 5L5 8.5L11.5 1.5" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);
const IconPlay = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <polygon points="3,2 12,7 3,12" fill={G.g900}/>
  </svg>
);
const IconFire = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill={G.g400}>
    <path d="M12 2C12 2 7 8 7 13a5 5 0 0010 0c0-5-5-11-5-11zm0 14a3 3 0 01-3-3c0-2.5 1.5-5 3-7.5 1.5 2.5 3 5 3 7.5a3 3 0 01-3 3z"/>
  </svg>
);
const IconTarget = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={G.g300} strokeWidth="2" strokeLinecap="round">
    <circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>
  </svg>
);
const IconArrow = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="rgba(255,255,255,0.18)" strokeWidth="2" strokeLinecap="round">
    <path d="M5 3l4 4-4 4"/>
  </svg>
);

// ─── STATUSBAR ────────────────────────────────────────────────────────────────
const StatusBar = () => (
  <div className="sbar">
    <div className="notch" />
    <span className="sbar-time">9:41</span>
    <div className="sbar-icons">
      <svg width="16" height="11" viewBox="0 0 16 11" fill="none">
        <rect x="0" y="5" width="2.5" height="6" rx="1" fill="rgba(255,255,255,0.9)"/>
        <rect x="4" y="3.5" width="2.5" height="7.5" rx="1" fill="rgba(255,255,255,0.9)"/>
        <rect x="8" y="1.5" width="2.5" height="9.5" rx="1" fill="rgba(255,255,255,0.9)"/>
        <rect x="12" y="0" width="2.5" height="11" rx="1" fill="rgba(255,255,255,0.4)"/>
      </svg>
      <svg width="15" height="12" viewBox="0 0 15 12" fill="none">
        <path d="M7.5 9.5a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" fill="rgba(255,255,255,0.9)"/>
        <path d="M4.8 7a3.8 3.8 0 0 1 5.4 0" stroke="rgba(255,255,255,0.9)" strokeWidth="1.4" strokeLinecap="round" fill="none"/>
        <path d="M2.4 4.6a7 7 0 0 1 10.2 0" stroke="rgba(255,255,255,0.9)" strokeWidth="1.4" strokeLinecap="round" fill="none"/>
        <path d="M0 2.2a10 10 0 0 1 15 0" stroke="rgba(255,255,255,0.35)" strokeWidth="1.4" strokeLinecap="round" fill="none"/>
      </svg>
      <svg width="26" height="12" viewBox="0 0 26 12" fill="none">
        <rect x="0.6" y="0.6" width="21.8" height="10.8" rx="3.4" stroke="rgba(255,255,255,0.35)" strokeWidth="1.2"/>
        <rect x="23" y="3.5" width="2" height="5" rx="1" fill="rgba(255,255,255,0.35)"/>
        <rect x="2" y="2" width="15" height="8" rx="2" fill="rgba(255,255,255,0.9)"/>
      </svg>
    </div>
  </div>
);

// ─── SPLASH ───────────────────────────────────────────────────────────────────
const Splash = ({ onStart, onLogin }) => (
  <div style={{ minHeight: "100%", background: `linear-gradient(160deg, ${G.g800} 0%, ${G.g900} 55%)`, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "40px 28px", textAlign: "center", position: "relative" }}>
    <div style={{ width: 88, height: 88, borderRadius: 26, background: `linear-gradient(135deg, ${G.g400}, ${G.g600})`, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 20, boxShadow: `0 12px 40px rgba(82,183,136,0.35)`, animation: "floatAnim 3s ease-in-out infinite" }}>
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
        <path d="M24 5C16 5 7 13 7 22c0 8 5 14 10 17l7 4 7-4c5-3 10-9 10-17C41 13 32 5 24 5z" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" fill="rgba(255,255,255,0.08)"/>
        <path d="M24 12l3 7h7l-5.5 4.5 2 6.5L24 27l-6.5 3 2-6.5L14 19h7z" fill="white"/>
      </svg>
    </div>
    <div style={{ fontFamily: "'Sora',sans-serif", fontSize: 44, fontWeight: 800, color: "#fff", letterSpacing: -1.5, lineHeight: 1 }}>Sama<br/>Coach</div>
    <div style={{ fontSize: 14, color: G.g300, margin: "10px 0 32px", fontWeight: 400 }}>Sport & Nutrition Locale — Sénégal</div>
    <div style={{ display: "flex", flexDirection: "column", gap: 10, width: "100%", maxWidth: 280, marginBottom: 32 }}>
      {[
        { icon: <IconDumbbell color={G.g400} />, text: "Programmes adaptés à ton niveau" },
        { icon: <IconFood color={G.g400} />, text: "Recettes locales (Thiéboudienne, Yassa…)" },
        { icon: <IconUser color={G.g400} />, text: "Coachs & salles près de chez toi" },
      ].map((f, i) => (
        <div key={i} style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 32, height: 32, borderRadius: 9, background: "rgba(82,183,136,0.1)", border: "1px solid rgba(82,183,136,0.18)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>{f.icon}</div>
          <span style={{ fontSize: 13, color: "rgba(255,255,255,0.55)" }}>{f.text}</span>
        </div>
      ))}
    </div>
    <div style={{ width: "100%", maxWidth: 280, display: "flex", flexDirection: "column", gap: 10 }}>
      <button className="btn-main" onClick={onStart}>Commencer gratuitement</button>
      <button className="btn-ghost" onClick={onLogin}>J'ai déjà un compte</button>
    </div>
  </div>
);

// ─── ONBOARDING SLIDES ────────────────────────────────────────────────────────
const slides = [
  { img: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=80", badge: "Entraînement", badgeColor: G.g300, title: "Des séances pensées pour toi", desc: "Programmes maison ou en salle, avec ou sans matériel. Progressifs et structurés pour chaque niveau, du débutant à l'avancé." },
  { img: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80", badge: "Nutrition Locale", badgeColor: G.amber, title: "Mange local, mange sain", desc: "Thiéboudienne, Yassa, Mafé, Ndambé… Tes plats sénégalais préférés adaptés à tes objectifs. Pas de régime importé." },
  { img: "https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?w=800&q=80", badge: "Discipline & Séries", badgeColor: G.gold, title: "La constance crée les résultats", desc: "Séries quotidiennes, badges de progression, rappels intelligents. On t'aide à construire l'habitude qui transforme ton corps." },
  { img: "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=800&q=80", badge: "Communauté", badgeColor: "#60A5FA", title: "Bouge avec l'écosystème local", desc: "Découvre les meilleurs coachs, salles et clubs au Sénégal. Avance avec une communauté qui te comprend." },
];

const Onboarding = ({ onDone }) => {
  const [step, setStep] = useState(0);
  const s = slides[step];
  const isLast = step === slides.length - 1;
  return (
    <div style={{ minHeight: "100%", display: "flex", flexDirection: "column", background: G.g900 }}>
      <div style={{ height: 320, position: "relative", overflow: "hidden", flexShrink: 0 }}>
        <Img src={s.img} alt={s.badge} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
        <div style={{ position: "absolute", inset: 0, background: `linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, ${G.g900} 100%)` }} />
        <div style={{ position: "absolute", top: 16, left: 16, background: "rgba(10,26,15,0.82)", backdropFilter: "blur(10px)", border: `1px solid rgba(255,255,255,0.12)`, borderRadius: 20, padding: "5px 14px", fontSize: 11, fontWeight: 600, color: s.badgeColor }}>
          {s.badge}
        </div>
      </div>
      <div style={{ padding: "22px 24px 32px", flex: 1, display: "flex", flexDirection: "column" }}>
        <div style={{ fontFamily: "'Sora',sans-serif", fontSize: 26, fontWeight: 800, color: "#fff", lineHeight: 1.2, marginBottom: 10 }}>{s.title}</div>
        <p style={{ fontSize: 13.5, color: "rgba(255,255,255,0.48)", lineHeight: 1.7, marginBottom: 24, flex: 1 }}>{s.desc}</p>
        <div style={{ display: "flex", gap: 6, marginBottom: 18 }}>
          {slides.map((_, i) => (
            <div key={i} onClick={() => setStep(i)} style={{ height: 7, borderRadius: 4, background: i === step ? G.g400 : "rgba(255,255,255,0.12)", width: i === step ? 22 : 7, transition: "all 0.3s", cursor: "pointer" }} />
          ))}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
          <button className="btn-main" onClick={() => isLast ? onDone() : setStep(step + 1)}>
            {isLast ? "Choisir mon objectif" : "Suivant"}
          </button>
          {!isLast && <button className="btn-ghost" onClick={onDone}>Passer</button>}
        </div>
      </div>
    </div>
  );
};

// ─── GOAL SELECT ──────────────────────────────────────────────────────────────
const GoalSelect = ({ onDone }) => {
  const [selected, setSelected] = useState(null);
  return (
    <div style={{ minHeight: "100%", background: G.g900, padding: "28px 24px 40px" }}>
      <div style={{ fontSize: 11.5, fontWeight: 600, color: G.g300, marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.06em" }}>Étape finale</div>
      <div style={{ fontFamily: "'Sora',sans-serif", fontSize: 24, fontWeight: 800, color: "#fff", marginBottom: 8, lineHeight: 1.2 }}>Quel est ton objectif principal ?</div>
      <p style={{ fontSize: 13, color: "rgba(255,255,255,0.38)", lineHeight: 1.6, marginBottom: 22 }}>On va personnaliser ton programme, tes recettes et tes rappels en fonction de ta réponse.</p>
      <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 20 }}>
        {GOALS.map((g, i) => {
          const sel = selected === g.id;
          return (
            <div key={g.id} className={`fu fu${i + 1}`} onClick={() => setSelected(g.id)} style={{ display: "flex", alignItems: "center", gap: 14, padding: 16, background: sel ? "rgba(82,183,136,0.1)" : "rgba(255,255,255,0.04)", border: `1.5px solid ${sel ? G.g400 : "rgba(255,255,255,0.07)"}`, borderRadius: 18, cursor: "pointer", transition: "all 0.22s", boxShadow: sel ? `0 0 0 3px rgba(82,183,136,0.08)` : "none" }}>
              <Img src={g.img} alt={g.label} style={{ width: 56, height: 56, borderRadius: 14, objectFit: "cover", flexShrink: 0 }} />
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: "'Sora',sans-serif", fontSize: 14, fontWeight: 700, color: "#fff", marginBottom: 3 }}>{g.label}</div>
                <div style={{ fontSize: 11.5, color: "rgba(255,255,255,0.4)", lineHeight: 1.4 }}>{g.desc}</div>
              </div>
              <div style={{ width: 22, height: 22, borderRadius: "50%", border: sel ? "none" : "1.5px solid rgba(255,255,255,0.12)", background: sel ? G.g400 : "transparent", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, transition: "all 0.2s" }}>
                {sel && <IconCheck />}
              </div>
            </div>
          );
        })}
      </div>
      <button className="btn-main" style={{ opacity: selected ? 1 : 0.35, pointerEvents: selected ? "auto" : "none" }} onClick={() => selected && onDone()}>
        {selected ? `Démarrer — ${GOALS.find(g => g.id === selected)?.label}` : "Sélectionne un objectif"}
      </button>
    </div>
  );
};

// ─── HOME ─────────────────────────────────────────────────────────────────────
const Home = ({ setTab, showToast }) => (
  <div style={{ background: "#0B1810", paddingBottom: 24 }}>
    {/* HEADER */}
    <div style={{ padding: "18px 22px 0", background: `linear-gradient(180deg, rgba(17,32,22,0.98) 0%, transparent 100%)` }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 18 }}>
        <div>
          <div style={{ fontSize: 11, color: G.g300, fontWeight: 600, letterSpacing: "0.03em" }}>Bonjour, Amadou</div>
          <div style={{ fontFamily: "'Sora',sans-serif", fontSize: 20, fontWeight: 800, color: "#fff", marginTop: 2 }}>Prêt à bouger ?</div>
        </div>
        <div onClick={() => setTab("profil")} style={{ width: 42, height: 42, borderRadius: "50%", overflow: "hidden", border: "2px solid rgba(82,183,136,0.3)", cursor: "pointer", flexShrink: 0 }}>
          <Img src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&q=80" alt="Amadou" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        </div>
      </div>
    </div>

    {/* STREAK */}
    <div className="fu fu1" style={{ margin: "0 22px 18px", background: "linear-gradient(135deg,rgba(82,183,136,0.13),rgba(64,145,108,0.06))", border: "1px solid rgba(82,183,136,0.18)", borderRadius: 14, padding: "13px 16px", display: "flex", alignItems: "center", gap: 12 }}>
      <div style={{ width: 40, height: 40, borderRadius: 10, background: "rgba(82,183,136,0.14)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
        <IconFire />
      </div>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 10, color: "rgba(255,255,255,0.38)", fontWeight: 500, marginBottom: 2 }}>Série actuelle</div>
        <div style={{ fontFamily: "'Sora',sans-serif", fontSize: 17, fontWeight: 800, color: G.g400 }}>7 jours consécutifs</div>
      </div>
      <div style={{ background: G.g400, borderRadius: 20, padding: "4px 11px", fontSize: 10, fontWeight: 700, color: G.g900 }}>Record !</div>
    </div>

    {/* TODAY WORKOUT */}
    <div style={{ padding: "0 22px", marginBottom: 8 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
        <span style={{ fontFamily: "'Sora',sans-serif", fontSize: 14, fontWeight: 700, color: "#fff" }}>Séance du jour</span>
        <span onClick={() => setTab("workouts")} style={{ fontSize: 11, color: G.g400, fontWeight: 600, cursor: "pointer" }}>Tout voir</span>
      </div>
    </div>
    <div className="fu fu2" onClick={() => showToast("Séance démarrée !")} style={{ margin: "0 22px 18px", borderRadius: 18, overflow: "hidden", position: "relative", cursor: "pointer", boxShadow: "0 10px 36px rgba(0,0,0,0.35)", minHeight: 200 }}>
      <Img src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=75" alt="Gym" style={{ width: "100%", height: "100%", objectFit: "cover", position: "absolute", inset: 0 }} />
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(5,15,8,0.97) 0%, rgba(5,15,8,0.5) 55%, rgba(5,15,8,0.1) 100%)" }} />
      <div style={{ position: "relative", zIndex: 1, padding: 20 }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 5, background: "rgba(82,183,136,0.18)", border: "1px solid rgba(82,183,136,0.28)", borderRadius: 20, padding: "4px 11px", marginBottom: 10, fontSize: 10.5, fontWeight: 600, color: G.g300 }}>
          Phase 2 · Semaine 3
        </div>
        <div style={{ fontFamily: "'Sora',sans-serif", fontSize: 19, fontWeight: 800, color: "#fff", marginBottom: 6, lineHeight: 1.2 }}>Cardio + Renforcement Musculaire</div>
        <div style={{ display: "flex", gap: 14, marginBottom: 14 }}>
          {[["35 min", "Durée"], ["420 kcal", "Calories"], ["Sans matériel", "Équipement"]].map(([v, l]) => (
            <div key={l}>
              <div style={{ fontSize: 12, color: "#fff", fontWeight: 600 }}>{v}</div>
              <div style={{ fontSize: 9.5, color: "rgba(255,255,255,0.38)" }}>{l}</div>
            </div>
          ))}
        </div>
        <div style={{ marginBottom: 14 }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
            <span style={{ fontSize: 10, color: "rgba(255,255,255,0.38)" }}>Progression de la semaine</span>
            <span style={{ fontSize: 10, color: "rgba(255,255,255,0.38)" }}>3 / 5 séances</span>
          </div>
          <div className="pbar"><div className="pbar-fill" style={{ width: "60%", background: `linear-gradient(90deg,${G.g400},${G.g300})` }} /></div>
        </div>
        <button className="tc-btn" onClick={e => { e.stopPropagation(); showToast("Séance démarrée !"); }} style={{ background: G.g400, border: "none", borderRadius: 10, padding: "12px 20px", fontFamily: "'Sora',sans-serif", fontSize: 13, fontWeight: 700, color: G.g900, display: "flex", alignItems: "center", justifyContent: "center", gap: 7, cursor: "pointer", width: "100%", transition: "all 0.18s" }}>
          <IconPlay /> Commencer la séance
        </button>
      </div>
    </div>

    {/* STATS */}
    <div className="fu fu3" style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, padding: "0 22px", marginBottom: 20 }}>
      {[
        { val: "2 450", label: "Calories brûlées", sub: "cette semaine" },
        { val: "5", label: "Séances", sub: "ce mois" },
        { val: "−1,2 kg", label: "Perdus", sub: "ce mois" },
      ].map(s => (
        <div key={s.label} style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 12, padding: "13px 10px", textAlign: "center" }}>
          <div style={{ fontFamily: "'Sora',sans-serif", fontSize: 18, fontWeight: 800, color: "#fff" }}>{s.val}</div>
          <div style={{ fontSize: 9.5, color: "rgba(255,255,255,0.32)", marginTop: 3, fontWeight: 500 }}>{s.label}</div>
          <div style={{ fontSize: 9, color: G.g400, marginTop: 2, fontWeight: 600 }}>{s.sub}</div>
        </div>
      ))}
    </div>

    {/* MEALS */}
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0 22px", marginBottom: 12 }}>
      <span style={{ fontFamily: "'Sora',sans-serif", fontSize: 14, fontWeight: 700, color: "#fff" }}>Repas locaux suggérés</span>
      <span onClick={() => setTab("nutrition")} style={{ fontSize: 11, color: G.g400, fontWeight: 600, cursor: "pointer" }}>Tout voir</span>
    </div>
    <div className="fu fu4" style={{ display: "flex", gap: 10, padding: "0 22px", overflowX: "auto", marginBottom: 20 }}>
      {MEALS.slice(0, 4).map(m => (
        <div key={m.id} onClick={() => showToast(`Recette : ${m.name}`)} style={{ flexShrink: 0, width: 120, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 12, overflow: "hidden", cursor: "pointer", transition: "all 0.18s" }}>
          <Img src={m.img} alt={m.name} style={{ width: "100%", height: 70, objectFit: "cover", display: "block" }} />
          <div style={{ padding: "8px 9px 10px" }}>
            <div style={{ fontFamily: "'Sora',sans-serif", fontSize: 11, fontWeight: 700, color: "#fff", marginBottom: 3 }}>{m.name}</div>
            <div style={{ fontSize: 10, color: G.amber, fontWeight: 600, marginBottom: 4 }}>{m.kcal} kcal</div>
            <div style={{ fontSize: 9, color: "rgba(255,255,255,0.3)", background: "rgba(255,255,255,0.05)", borderRadius: 4, padding: "2px 6px", display: "inline-block" }}>{m.tags[0]}</div>
          </div>
        </div>
      ))}
    </div>

    {/* COACHES */}
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0 22px", marginBottom: 12 }}>
      <span style={{ fontFamily: "'Sora',sans-serif", fontSize: 14, fontWeight: 700, color: "#fff" }}>Coachs près de toi</span>
      <span onClick={() => showToast("Carte des coachs")} style={{ fontSize: 11, color: G.g400, fontWeight: 600, cursor: "pointer" }}>Voir carte</span>
    </div>
    <div className="fu fu5" style={{ display: "flex", gap: 10, padding: "0 22px", overflowX: "auto", marginBottom: 28 }}>
      {COACHES.map(c => (
        <div key={c.id} onClick={() => showToast(`Profil : ${c.name}`)} style={{ flexShrink: 0, width: 146, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 12, padding: 13, cursor: "pointer", transition: "all 0.18s" }}>
          <div style={{ position: "relative", marginBottom: 9 }}>
            <Img src={c.img} alt={c.name} style={{ width: 42, height: 42, borderRadius: "50%", objectFit: "cover", border: "2px solid rgba(82,183,136,0.25)", display: "block" }} />
            {c.verified && <div style={{ position: "absolute", bottom: -1, right: 56, width: 14, height: 14, background: G.g400, borderRadius: "50%", border: "2px solid #0B1810", display: "flex", alignItems: "center", justifyContent: "center" }}><svg width="7" height="6" viewBox="0 0 7 6"><path d="M1 3L2.8 4.8L6 1.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/></svg></div>}
          </div>
          <div style={{ fontFamily: "'Sora',sans-serif", fontSize: 12, fontWeight: 700, color: "#fff", marginBottom: 2 }}>{c.name}</div>
          <div style={{ fontSize: 10, color: "rgba(255,255,255,0.35)", marginBottom: 6, lineHeight: 1.3 }}>{c.specialty}</div>
          <div style={{ fontSize: 10, color: "rgba(255,255,255,0.25)", marginBottom: 6 }}>{c.location}</div>
          <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
            <StarRating rating={c.rating} size={9} />
            <span style={{ fontSize: 9.5, color: "rgba(255,255,255,0.3)" }}>{c.rating} ({c.reviews})</span>
          </div>
        </div>
      ))}
    </div>
  </div>
);

// ─── WORKOUTS TAB ─────────────────────────────────────────────────────────────
const WorkoutsTab = ({ showToast }) => {
  const [filter, setFilter] = useState("Tous");
  const filters = ["Tous", "Maison", "Cardio", "Musculation", "Ramadan"];
  const filtered = filter === "Tous" ? WORKOUTS : WORKOUTS.filter(w => w.category === filter);
  return (
    <div style={{ background: "#0B1810", paddingBottom: 24 }}>
      <div style={{ fontFamily: "'Sora',sans-serif", fontSize: 22, fontWeight: 800, color: "#fff", padding: "18px 22px 0", marginBottom: 16 }}>Programmes</div>
      <div style={{ display: "flex", gap: 7, padding: "0 22px", overflowX: "auto", marginBottom: 16 }}>
        {filters.map(f => (
          <div key={f} onClick={() => setFilter(f)} style={{ flexShrink: 0, padding: "6px 14px", borderRadius: 20, fontSize: 11.5, fontWeight: 600, cursor: "pointer", transition: "all 0.18s", background: filter === f ? G.g400 : "rgba(255,255,255,0.05)", color: filter === f ? G.g900 : "rgba(255,255,255,0.4)", border: `1px solid ${filter === f ? G.g400 : "rgba(255,255,255,0.07)"}` }}>
            {f}
          </div>
        ))}
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 10, padding: "0 22px" }}>
        {filtered.map(w => (
          <div key={w.id} onClick={() => showToast(`Séance : ${w.title}`)} style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 12, overflow: "hidden", cursor: "pointer", display: "flex", transition: "all 0.18s" }}>
            <Img src={w.img} alt={w.title} style={{ width: 78, height: 78, objectFit: "cover", flexShrink: 0 }} />
            <div style={{ flex: 1, padding: "11px 13px" }}>
              <div style={{ fontFamily: "'Sora',sans-serif", fontSize: 13, fontWeight: 700, color: "#fff", marginBottom: 5 }}>{w.title}</div>
              <div style={{ display: "flex", gap: 5, flexWrap: "wrap", marginBottom: 6 }}>
                {[w.duration, w.tag].map(chip => (
                  <span key={chip} style={{ fontSize: 9.5, color: "rgba(255,255,255,0.32)", background: "rgba(255,255,255,0.05)", borderRadius: 4, padding: "2px 7px" }}>{chip}</span>
                ))}
                <span style={{ fontSize: 9.5, color: G.g400, background: "rgba(82,183,136,0.09)", borderRadius: 4, padding: "2px 7px" }}>{w.kcal} kcal</span>
              </div>
              <DiffBadge level={w.level} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// ─── NUTRITION TAB ────────────────────────────────────────────────────────────
const NutritionTab = ({ showToast }) => {
  const macros = { protein: { cur: 82, max: 120, color: G.g400, label: "Protéines", unit: "g" }, carbs: { cur: 195, max: 260, color: G.amber, label: "Glucides", unit: "g" }, fat: { cur: 54, max: 70, color: G.coral, label: "Lipides", unit: "g" } };
  const calCur = 1680, calMax = 2100;
  const pct = Math.round((calCur / calMax) * 100);
  const radius = 32, circ = 2 * Math.PI * radius;
  const offset = circ - (pct / 100) * circ;
  return (
    <div style={{ background: "#0B1810", paddingBottom: 24 }}>
      <div style={{ fontFamily: "'Sora',sans-serif", fontSize: 22, fontWeight: 800, color: "#fff", padding: "18px 22px 0", marginBottom: 16 }}>Nutrition</div>
      {/* MACROS */}
      <div style={{ margin: "0 22px 18px", background: "rgba(82,183,136,0.07)", border: "1px solid rgba(82,183,136,0.13)", borderRadius: 18, padding: 16 }}>
        <div style={{ fontSize: 10.5, color: "rgba(255,255,255,0.38)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 12 }}>Calories du jour</div>
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div style={{ position: "relative", width: 80, height: 80, flexShrink: 0 }}>
            <svg width="80" height="80" viewBox="0 0 80 80" style={{ transform: "rotate(-90deg)" }}>
              <circle cx="40" cy="40" r={radius} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="6"/>
              <circle cx="40" cy="40" r={radius} fill="none" stroke={G.g400} strokeWidth="6" strokeLinecap="round" strokeDasharray={circ} strokeDashoffset={offset} style={{ transition: "stroke-dashoffset 1s ease" }}/>
            </svg>
            <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
              <div style={{ fontFamily: "'Sora',sans-serif", fontSize: 14, fontWeight: 800, color: "#fff" }}>{calCur.toLocaleString()}</div>
              <div style={{ fontSize: 8, color: "rgba(255,255,255,0.32)", marginTop: 1 }}>/ {calMax.toLocaleString()} kcal</div>
            </div>
          </div>
          <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 9 }}>
            {Object.values(macros).map(m => (
              <div key={m.label}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                  <span style={{ fontSize: 11, color: "rgba(255,255,255,0.42)" }}>{m.label}</span>
                  <span style={{ fontSize: 11, fontWeight: 600, color: m.color }}>{m.cur}{m.unit} / {m.max}{m.unit}</span>
                </div>
                <div className="pbar"><div className="pbar-fill" style={{ width: `${Math.round((m.cur / m.max) * 100)}%`, background: m.color }} /></div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0 22px", marginBottom: 12 }}>
        <span style={{ fontFamily: "'Sora',sans-serif", fontSize: 14, fontWeight: 700, color: "#fff" }}>Plats locaux recommandés</span>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, padding: "0 22px" }}>
        {MEALS.map(m => (
          <div key={m.id} onClick={() => showToast(`Recette : ${m.name}`)} style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 12, overflow: "hidden", cursor: "pointer", transition: "all 0.18s" }}>
            <Img src={m.img} alt={m.name} style={{ width: "100%", height: 90, objectFit: "cover", display: "block" }} />
            <div style={{ padding: 9 }}>
              <div style={{ fontFamily: "'Sora',sans-serif", fontSize: 11.5, fontWeight: 700, color: "#fff", marginBottom: 3 }}>{m.name}</div>
              <div style={{ fontSize: 10, color: G.amber, fontWeight: 600, marginBottom: 4 }}>{m.kcal} kcal · Prot : {m.protein}g</div>
              <div style={{ display: "flex", gap: 3, flexWrap: "wrap" }}>
                {m.tags.map(t => <span key={t} style={{ fontSize: 8.5, color: "rgba(255,255,255,0.3)", background: "rgba(255,255,255,0.05)", borderRadius: 3, padding: "1px 5px" }}>{t}</span>)}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// ─── PROGRESS TAB ─────────────────────────────────────────────────────────────
const ProgressTab = ({ showToast }) => {
  const chartPoints = [[0,70],[42,67],[85,62],[128,58],[171,52],[214,48],[257,43],[300,38]];
  const pathD = chartPoints.map(([x,y], i) => `${i===0?"M":"L"}${x} ${y}`).join(" ");
  const areaD = pathD + ` L300 90 L0 90 Z`;
  return (
    <div style={{ background: "#0B1810", paddingBottom: 24 }}>
      <div style={{ fontFamily: "'Sora',sans-serif", fontSize: 22, fontWeight: 800, color: "#fff", padding: "18px 22px 0", marginBottom: 16 }}>Progression</div>
      {/* STATS GRID */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, padding: "0 22px", marginBottom: 18 }}>
        {[
          { label: "Poids actuel", val: "76,8", unit: " kg", change: "▼ 1,2 kg ce mois", up: false },
          { label: "Séances totales", val: "47", unit: "", change: "▲ +12 ce mois", up: true },
          { label: "Calories brûlées", val: "12 840", unit: "", change: "▲ ce mois", up: true },
          { label: "Meilleure série", val: "14", unit: " jours", change: "Record personnel", gold: true },
        ].map(s => (
          <div key={s.label} style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 12, padding: 14 }}>
            <div style={{ fontSize: 10.5, color: "rgba(255,255,255,0.36)", marginBottom: 5, fontWeight: 500 }}>{s.label}</div>
            <div style={{ fontFamily: "'Sora',sans-serif", fontSize: 22, fontWeight: 800, color: "#fff" }}>{s.val}<span style={{ fontSize: 12, color: "rgba(255,255,255,0.35)" }}>{s.unit}</span></div>
            <div style={{ fontSize: 10.5, fontWeight: 600, marginTop: 4, color: s.gold ? G.gold : s.up ? "#4ade80" : G.coral }}>{s.change}</div>
          </div>
        ))}
      </div>
      {/* WEEK */}
      <div style={{ margin: "0 22px 18px", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 12, padding: 14 }}>
        <div style={{ fontSize: 11, color: "rgba(255,255,255,0.38)", fontWeight: 600, marginBottom: 12 }}>Semaine en cours</div>
        <div style={{ display: "flex", gap: 5 }}>
          {WEEK.map(d => (
            <div key={d.day} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 5 }}>
              <div style={{ fontSize: 8.5, color: "rgba(255,255,255,0.25)", fontWeight: 600, textTransform: "uppercase" }}>{d.day}</div>
              <div style={{ width: 30, height: 30, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 700, background: d.status === "done" ? G.g600 : d.status === "today" ? G.g400 : d.status === "rest" ? "rgba(244,162,97,0.1)" : "rgba(255,255,255,0.04)", color: d.status === "today" ? G.g900 : d.status === "rest" ? G.amber : d.status === "done" ? "#fff" : "rgba(255,255,255,0.2)" }}>
                {d.status === "done" ? <IconCheck /> : d.status === "rest" ? <span style={{ fontSize: 7, fontWeight: 700 }}>REPOS</span> : d.date}
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* CHART */}
      <div style={{ margin: "0 22px 18px", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 12, padding: 14 }}>
        <div style={{ fontFamily: "'Sora',sans-serif", fontSize: 12.5, fontWeight: 700, color: "#fff", marginBottom: 12 }}>Évolution du poids — 8 semaines</div>
        <svg width="100%" viewBox="0 0 300 90" preserveAspectRatio="none">
          <defs>
            <linearGradient id="cg" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#52B788" stopOpacity="0.25"/>
              <stop offset="100%" stopColor="#52B788" stopOpacity="0"/>
            </linearGradient>
          </defs>
          <path d={areaD} fill="url(#cg)"/>
          <path d={pathD} fill="none" stroke={G.g400} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          <circle cx="0" cy="70" r="3.5" fill={G.g400}/>
          <circle cx="300" cy="38" r="3.5" fill={G.g400}/>
          <text x="4" y="86" fontSize="8" fill="rgba(255,255,255,0.28)" fontFamily="DM Sans">78,0 kg</text>
          <text x="240" y="33" fontSize="8" fill="rgba(255,255,255,0.28)" fontFamily="DM Sans">76,8 kg</text>
        </svg>
      </div>
      {/* BADGES */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0 22px", marginBottom: 12 }}>
        <span style={{ fontFamily: "'Sora',sans-serif", fontSize: 14, fontWeight: 700, color: "#fff" }}>Badges obtenus</span>
      </div>
      <div style={{ display: "flex", gap: 10, padding: "0 22px", overflowX: "auto", marginBottom: 28 }}>
        {BADGES.map(b => (
          <div key={b.id} style={{ flexShrink: 0, width: 74, textAlign: "center", background: b.earned ? "rgba(212,160,23,0.05)" : "rgba(255,255,255,0.04)", border: `1px solid ${b.earned ? "rgba(212,160,23,0.3)" : "rgba(255,255,255,0.07)"}`, borderRadius: 12, padding: "12px 6px", opacity: b.earned ? 1 : 0.35 }}>
            <Img src={b.img} alt={b.name} style={{ width: 40, height: 40, borderRadius: 10, objectFit: "cover", margin: "0 auto 7px", display: "block", filter: b.earned ? "none" : "grayscale(1)" }} />
            <div style={{ fontSize: 8.5, color: b.earned ? G.gold : "rgba(255,255,255,0.32)", lineHeight: 1.3 }}>{b.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

// ─── PROFIL TAB ───────────────────────────────────────────────────────────────
const ProfilTab = ({ setTab, showToast, onLogout }) => (
  <div style={{ background: "#0B1810", paddingBottom: 28 }}>
    <div style={{ height: 190, position: "relative", overflow: "hidden" }}>
      <Img src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=70" alt="Background" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
      <div style={{ position: "absolute", inset: 0, background: `linear-gradient(to bottom, rgba(0,0,0,0.2), #0B1810)` }} />
      <div style={{ position: "absolute", bottom: -26, left: "50%", transform: "translateX(-50%)", width: 72, height: 72, borderRadius: "50%", overflow: "hidden", border: "3px solid rgba(82,183,136,0.4)", boxShadow: "0 6px 20px rgba(82,183,136,0.2)" }}>
        <Img src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&q=80" alt="Amadou Mbaye" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
      </div>
    </div>
    <div style={{ padding: "38px 22px 18px", textAlign: "center" }}>
      <div style={{ fontFamily: "'Sora',sans-serif", fontSize: 20, fontWeight: 800, color: "#fff", marginBottom: 3 }}>Amadou Mbaye</div>
      <div style={{ fontSize: 12, color: G.g300, fontWeight: 500, marginBottom: 13 }}>Niveau Intermédiaire · Dakar, Sénégal</div>
      <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "rgba(82,183,136,0.1)", border: "1px solid rgba(82,183,136,0.18)", borderRadius: 20, padding: "5px 14px", fontSize: 11.5, fontWeight: 600, color: G.g300 }}>
        <IconTarget /> Objectif : Perdre du poids
      </div>
    </div>
    <div style={{ display: "flex", borderTop: "1px solid rgba(255,255,255,0.05)", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
      {[{ val: "47", lab: "Séances" }, { val: "7 jours", lab: "Série actuelle" }, { val: "−1,2 kg", lab: "Ce mois" }, { val: "3", lab: "Badges" }].map((s, i, arr) => (
        <div key={s.lab} style={{ flex: 1, textAlign: "center", padding: "15px 6px", borderRight: i < arr.length - 1 ? "1px solid rgba(255,255,255,0.05)" : "none" }}>
          <div style={{ fontFamily: "'Sora',sans-serif", fontSize: 16, fontWeight: 800, color: "#fff" }}>{s.val}</div>
          <div style={{ fontSize: 9.5, color: "rgba(255,255,255,0.3)", marginTop: 3 }}>{s.lab}</div>
        </div>
      ))}
    </div>
    {[
      { title: "Mon programme", items: [
        { label: "Programme actuel", sub: "Perte de poids · Phase 2 / 4", ic: G.g400, bg: "rgba(82,183,136,0.1)", action: () => showToast("Programme Phase 2") },
        { label: "Mes statistiques", sub: "47 séances · 12 840 kcal brûlées", ic: G.gold, bg: "rgba(212,160,23,0.1)", action: () => setTab("prog") },
      ]},
      { title: "Compte", items: [
        { label: "Modifier le profil", sub: "Nom, taille, poids cible", ic: "#60A5FA", bg: "rgba(96,165,250,0.1)", action: () => showToast("Modifier le profil") },
        { label: "Notifications", sub: "Rappels séances · Activé", ic: "#c084fc", bg: "rgba(168,85,247,0.1)", action: () => showToast("Notifications activées") },
        { label: "Langue", sub: "Français / Wolof", ic: G.amber, bg: "rgba(244,162,97,0.1)", action: () => showToast("Langue : Français / Wolof") },
        { label: "Se déconnecter", sub: null, ic: G.coral, bg: "rgba(231,111,81,0.1)", labelColor: G.coral, action: onLogout },
      ]},
    ].map(sec => (
      <div key={sec.title} style={{ padding: "18px 22px 0" }}>
        <div style={{ fontSize: 10.5, color: "rgba(255,255,255,0.25)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 8 }}>{sec.title}</div>
        {sec.items.map((it, i, arr) => (
          <div key={it.label} onClick={it.action} style={{ display: "flex", alignItems: "center", gap: 12, padding: "13px 0", borderBottom: i < arr.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none", cursor: "pointer", transition: "all 0.18s" }}>
            <div style={{ width: 34, height: 34, borderRadius: 9, background: it.bg, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke={it.ic} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="8" cy="6" r="3"/><path d="M2 14c0-3 2.5-5 6-5s6 2 6 5"/>
              </svg>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13.5, color: it.labelColor || "#fff", fontWeight: 500 }}>{it.label}</div>
              {it.sub && <div style={{ fontSize: 10.5, color: "rgba(255,255,255,0.3)", marginTop: 1 }}>{it.sub}</div>}
            </div>
            <IconArrow />
          </div>
        ))}
      </div>
    ))}
  </div>
);

// ─── MAIN APP ─────────────────────────────────────────────────────────────────
const TABS = [
  { id: "home", label: "Accueil", Icon: IconHome },
  { id: "workouts", label: "Séances", Icon: IconDumbbell },
  { id: "nutrition", label: "Nutrition", Icon: IconFood },
  { id: "prog", label: "Progrès", Icon: IconChart },
  { id: "profil", label: "Profil", Icon: IconUser },
];

export default function SamaCoach() {
  const [phase, setPhase] = useState("splash"); // splash | onboarding | goals | main
  const [tab, setTab] = useState("home");
  const [prev, setPrev] = useState(null);
  const [toast, setToast] = useState({ msg: "", visible: false });
  const toastTimer = useRef(null);

  const showToast = (msg) => {
    clearTimeout(toastTimer.current);
    setToast({ msg, visible: true });
    toastTimer.current = setTimeout(() => setToast(t => ({ ...t, visible: false })), 2200);
  };

  const switchTab = (id) => {
    setPrev(tab);
    setTab(id);
  };

  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = css;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  // Scale shell to viewport
  useEffect(() => {
    const scale = () => {
      const sh = document.querySelector(".shell");
      if (!sh) return;
      const s = Math.min(window.innerWidth / 400, window.innerHeight / 860, 1);
      sh.style.transform = `translate(-50%,-50%) scale(${s})`;
    };
    scale();
    window.addEventListener("resize", scale);
    return () => window.removeEventListener("resize", scale);
  }, []);

  const showMain = phase === "main";

  const renderScreen = (id, content) => (
    <div key={id} className={`screen ${showMain && tab === id ? "active" : (prev === id ? "out" : "")}`}>
      {content}
    </div>
  );

  return (
    <div className="shell">
      <StatusBar />
      <div className="screens">
        {/* ONBOARDING FLOW */}
        {phase !== "main" && (
          <>
            <div className={`screen ${phase === "splash" ? "active" : ""}`}>
              <Splash onStart={() => setPhase("onboarding")} onLogin={() => setPhase("main")} />
            </div>
            <div className={`screen ${phase === "onboarding" ? "active" : ""}`}>
              <Onboarding onDone={() => setPhase("goals")} />
            </div>
            <div className={`screen ${phase === "goals" ? "active" : ""}`}>
              <GoalSelect onDone={() => setPhase("main")} />
            </div>
          </>
        )}
        {/* MAIN APP */}
        {showMain && (
          <>
            {renderScreen("home", <Home setTab={switchTab} showToast={showToast} />)}
            {renderScreen("workouts", <WorkoutsTab showToast={showToast} />)}
            {renderScreen("nutrition", <NutritionTab showToast={showToast} />)}
            {renderScreen("prog", <ProgressTab showToast={showToast} />)}
            {renderScreen("profil", <ProfilTab setTab={switchTab} showToast={showToast} onLogout={() => { setPhase("splash"); setTab("home"); }} />)}
          </>
        )}
      </div>
      {/* BOTTOM NAV */}
      {showMain && (
        <div className="bnav">
          {TABS.map(({ id, label, Icon }) => {
            const active = tab === id;
            const color = active ? G.g400 : "rgba(255,255,255,0.28)";
            return (
              <div key={id} className={`ni ${active ? "on" : ""}`} onClick={() => switchTab(id)}>
                <Icon color={color} />
                <span>{label}</span>
              </div>
            );
          })}
        </div>
      )}
      {/* TOAST */}
      <div className="toast-wrap" style={{ opacity: toast.visible ? 1 : 0, transform: `translateX(-50%) translateY(${toast.visible ? 0 : 8}px)` }}>
        {toast.msg}
      </div>
    </div>
  );
}