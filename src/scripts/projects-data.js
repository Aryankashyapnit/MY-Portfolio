/* =========================================================
   PROJECTS DATA STORE (Authentic Details for Project Overlay)
   ========================================================= */

export const projectsData = {
  'bihareduconnect': {
    id: 'bihareduconnect',
    number: '01',
    title: 'BiharEduConnect',
    tagline: 'Admission intelligence for Bihar engineering counselling',
    category: 'Counselling Intelligence',
    year: '2026',
    status: 'Active / Deployed',
    role: 'Lead Architect & Full-Stack Developer',
    heroImage: '/assets/bihareduconnect-preview.png',
    summary: 'A unified digital platform helping Bihar engineering aspirants analyze historical cutoff trends, predict admission chances across 44+ nodal government colleges, and make informed choices during UGEAC & BCECE counselling.',
    whatIsIt: 'BiharEduConnect is a dedicated engineering admission intelligence platform designed for students navigating Bihar BCECE / UGEAC state counselling. It brings together cutoff records, category-specific seat matrices, and college comparison tools into a fast, transparent interface.',
    whyBuilt: 'State counselling in Bihar traditionally relied on dense, unsearchable 80+ page PDF merit lists published across different rounds. Students and parents struggled to know which government colleges or branches they qualified for based on their JEE Main / BCECE rank. I built BiharEduConnect to replace manual guesswork with instant, algorithmic cutoff matching.',
    howItWorks: [
      'Rank-Based Predictor: Matches candidate rank, category (General, BC, EBC, SC, ST, RCG, EWS), and gender against official opening/closing cutoff archives.',
      '44+ Government Engineering Colleges: Explore campus details, branch allotments (CSE, ECE, Civil, Mechanical, etc.), and intake statistics across all nodal institutes in Bihar.',
      'Dual-Claim RCG Quota Logic: Automatically accounts for reservation nuances including girl quota allocations and category-specific cutoff splits.',
      'Live Counselling Updates: Instant access to round announcements, document verification lists, and allotment notifications.'
    ],
    techStack: ['Next.js 14', 'TypeScript', 'Supabase', 'Tailwind CSS', 'PostgreSQL', 'Vercel'],
    liveUrl: 'https://bihareduconnect.in',
    githubUrl: 'https://github.com/Aryankashyapnit/BiharEduConnect',
    metrics: 'Covers all 44+ Bihar government engineering institutes with verified multi-round cutoff records.'
  },

  'decide': {
    id: 'decide',
    number: '02',
    title: 'Decide',
    tagline: 'An AI thinking partner for difficult choices',
    category: 'Conversational AI / Mobile',
    year: '2026',
    status: 'In Active Development',
    heroImage: '/assets/decide-preview.png',
    secondaryImage: '/assets/decide-physics.png',
    whatIsIt: 'Decide is a personal AI thinking partner that turns overwhelming, multi-variable dilemmas into clear, structured decisions. It does not simply give advice; it prompts users to unpack assumptions, identify trade-offs, and commit to immediate action.',
    whyBuilt: 'When faced with hard choices (career moves, project directions, technical architectures), people often spin in circles overthinking or get paralyzed by competing priorities. Decide was created to act as a calm, non-judgmental thinking space that enforces clarity through structured mental models.',
    howItWorks: [
      'Decision Capture: Conversational prompt flows that articulate the core dilemma, stakes, and emotional barriers.',
      'Trade-Off & Principle Matrix: Compare options side-by-side against personal values and weighted priorities.',
      'Synthesis Engine: Generates concise summaries of potential upside vs. irreversible risks.',
      'Actionable Step One: Formulates an immediate low-friction first step to break decision inertia.',
      'Reflection & History: Long-term timeline to review past decisions and calibrate intuition.'
    ],
    techStack: ['Flutter', 'Dart', 'Provider / Riverpod', 'FastAPI', 'Gemini AI API', 'SQLite / Hive'],
    liveUrl: null,
    githubUrl: 'https://github.com/Aryankashyapnit/decide',
    metrics: 'Built as a native cross-platform mobile application with private local-first conversation storage.'
  },

  'polytechnickarle': {
    id: 'polytechnickarle',
    number: '03',
    title: 'PolytechnicKarle',
    tagline: 'Bihar DCECE counselling and college prediction',
    category: 'State Admissions',
    year: '2026',
    status: 'Active',
    role: 'Full-Stack Developer',
    heroImage: '/assets/polytechnickarle-preview.png',
    summary: 'A specialized admission forecaster and institute explorer dedicated to Bihar DCECE diploma aspirants seeking government polytechnic seats.',
    whatIsIt: 'PolytechnicKarle is a dedicated counselling companion for diploma candidates in Bihar. It indexes seat matrix data, category reservation cutoffs, and institute profiles across all government polytechnics in the state.',
    whyBuilt: 'Polytechnic admissions in Bihar see lakhs of rural and semi-urban aspirants with limited access to private career counsellors. PolytechnicKarle was created to provide free, transparent access to historical admission data so students can confidently select college preferences.',
    howItWorks: [
      'DCECE Rank Estimator: Filter colleges by diploma branch (Mechanical, Electrical, Civil, CS) and candidate category.',
      'Nodal Institute Directory: Full breakdown of 44+ government polytechnic colleges with location and seat capacity.',
      'Demo Candidate Simulation: Instant preview of admission probabilities without mandatory sign-up hurdles.'
    ],
    techStack: ['React', 'JavaScript', 'Node.js', 'PostgreSQL', 'Tailwind CSS'],
    liveUrl: null,
    githubUrl: 'https://github.com/Aryankashyapnit/Polytechnickarle',
    metrics: 'Serving Bihar diploma candidates with accurate historical DCECE round data.'
  },

  'beucampus': {
    id: 'beucampus',
    number: '04',
    title: 'BEUCampus / CampusMesh',
    tagline: 'An academic operating system for engineering students',
    category: 'Academic Ecosystem',
    year: '2026',
    status: 'In Active Development',
    role: 'Android Engineer & Backend Architect',
    heroImage: '/assets/campusmesh-dashboard.png',
    secondaryImage: '/assets/campusmesh-academics.png',
    summary: 'A complete academic mobile operating system designed for Bihar Engineering University students, combining PYQ repositories, attendance tracking, syllabus navigation, and AI tutoring.',
    whatIsIt: 'BEUCampus (CampusMesh) is a native Android application and student ecosystem that aggregates everything an engineering undergraduate needs: semester syllabi, curated notes, previous years questions (PYQs), attendance calculations, and university notices.',
    whyBuilt: 'State engineering university resources are often scattered across unofficial Telegram channels, Google Drive links, and outdated bulletin boards. BEUCampus unifies the academic lifecycle into a fast, offline-capable app with clean Jetpack Compose UI.',
    howItWorks: [
      'Curated Notes & PYQ Library: Searchable past question papers and lecture notes indexed by branch, semester, and subject.',
      'Attendance Intelligence: Real-time calculation of classes attended vs. required 75% thresholds with safe bunk forecasting.',
      'AI Question Solver: Instant step-by-step breakdown for complex engineering problems.',
      'Verified University Notices: Real-time push notifications for exam dates, form fills, and academic calendars.'
    ],
    techStack: ['Kotlin', 'Jetpack Compose', 'Supabase / PostgreSQL', 'Room Database', 'Coroutines & Flow', 'KSP'],
    liveUrl: null,
    githubUrl: 'https://github.com/Aryankashyapnit/CampusMesh',
    metrics: 'Comprehensive native Android companion covering all B.Tech engineering semesters.'
  },

  'raksha-ai': {
    id: 'raksha-ai',
    number: '05',
    title: 'Raksha-AI',
    tagline: 'AI-powered women safety and emergency response companion',
    category: 'Safety & Geotracking',
    year: '2026',
    status: 'Prototype / Experimental',
    role: 'Product Designer & Frontend Engineer',
    heroImage: '/assets/raksha-ai-preview.png',
    summary: 'An emergency safety platform featuring one-touch SOS triggering, AI route risk auditing, live guardian tracking, and simulated fake calls.',
    whatIsIt: 'Raksha-AI is a high-contrast, emergency-first mobile interface designed to provide immediate safety tools and proactive risk auditing for women commuters.',
    whyBuilt: 'Safety tools must be operable under extreme stress. Raksha-AI was designed with bold, mistake-proof physical triggers, automated location broadcasting, and AI navigation that audits safe walking paths based on lighting and transit hubs.',
    howItWorks: [
      'One-Touch SOS: Hold-to-activate emergency protocol that broadcasts live GPS coordinates to guardians and authorities.',
      'Safe Route Navigator: AI route selection preferring well-lit, populated roads over isolated shortcuts.',
      'Simulated Fake Call: Triggers an incoming call screen to help users exit uncomfortable situations safely.',
      'Trusted Guardians Network: Synchronized status updates indicating battery level and location.'
    ],
    techStack: ['Flutter / React Native', 'FastAPI', 'Geolocation API', 'WebSockets', 'Tailwind CSS'],
    liveUrl: null,
    githubUrl: 'https://github.com/Aryankashyapnit/-Raksha-AI',
    metrics: 'High-contrast emergency UI with sub-second SOS dispatch architecture.'
  },

  'collegeachiver': {
    id: 'collegeachiver',
    number: '06',
    title: 'CollegeAchiever',
    tagline: 'AI-powered JoSAA admission forecasting engine',
    category: 'AI Admissions',
    year: '2026',
    status: 'Active',
    role: 'Lead Developer',
    heroImage: '/assets/collegeachiver-preview.png',
    summary: 'Nationwide JoSAA rank predictor analyzing closing ranks across IITs, NITs, and IIITs to give engineering aspirants clear admission odds.',
    whatIsIt: 'CollegeAchiever is a web application that indexes over 17,000+ JoSAA cutoff records across 6 historical rounds to help JEE Main and JEE Advanced candidates choose their college preferences.',
    whyBuilt: 'JoSAA seat allocation involves over 100 institutes and thousands of seat combinations. CollegeAchiever organizes this vast dataset into an instant, filterable search engine.',
    howItWorks: [
      'Enter JEE rank and category to view matching IITs, NITs, and IIITs.',
      'Filter by preferred branches, state quotas (Home State vs. Other State), and gender pools.',
      'Side-by-side cutoff comparison across rounds.'
    ],
    techStack: ['Next.js', 'React', 'Node.js', 'JoSAA Data Engine', 'Tailwind CSS'],
    liveUrl: null,
    githubUrl: 'https://github.com/Aryankashyapnit/collegeachiver',
    metrics: 'Indexes 17,000+ JoSAA cutoff records across 6 admission rounds.'
  },

  'zameen-calculator': {
    id: 'zameen-calculator',
    number: '07',
    title: 'Zameen Calculator',
    tagline: 'Bihar regional land unit converter and measurement tool',
    category: 'Regional Utility',
    year: '2026',
    status: 'Active',
    role: 'Creator & Developer',
    heroImage: null,
    summary: 'A fast, accurate regional land measurement calculator converting traditional Bihar units (Katha, Bigha, Dhur) into Square Feet, Square Meters, and Acres.',
    whatIsIt: 'A specialized converter tailored to Eastern Indian regional land metrics where 1 Bigha = 20 Katha, 1 Katha = 20 Dhur, and standard standardizations vary by district.',
    whyBuilt: 'Standard online unit converters lack traditional Indian land units like Katha and Dhur, making property estimation confusing for local landowners and buyers. This micro-tool eliminates manual calculation errors.',
    howItWorks: [
      'Instant conversion between Katha, Dhur, Bigha, and Square Feet.',
      'District standard configuration (e.g. 1 Katha = 1361.25 sq. ft standard in Bihar).',
      'Lightweight offline-first utility.'
    ],
    techStack: ['TypeScript', 'HTML5', 'CSS3', 'Web Standards'],
    liveUrl: null,
    githubUrl: 'https://github.com/Aryankashyapnit/Zameen-calculator',
    metrics: 'Lightweight regional math engine with instant zero-latency conversions.'
  },

  'memesoundboard': {
    id: 'memesoundboard',
    number: '08',
    title: 'MemeSoundboard',
    tagline: 'Interactive audio meme soundboard with keyboard triggers',
    category: 'Audio Playground',
    year: '2026',
    status: 'Active',
    role: 'Creator & Developer',
    heroImage: null,
    summary: 'A responsive, keyboard-accessible web audio soundboard with synthesized and sampled sound effects.',
    whatIsIt: 'A fun, lightweight audio interface allowing instant playback of popular sound effects using tactile buttons or keyboard hotkeys.',
    whyBuilt: 'An experiment in low-latency Web Audio API synthesis, audio context state management, and keyboard event routing.',
    howItWorks: [
      'Web Audio synthesizer triggers for low latency.',
      'Dynamic visual wave feedback on button press.',
      'Keyboard binding support (Keys 1-9 for instant triggers).'
    ],
    techStack: ['Web Audio API', 'JavaScript', 'CSS Grid', 'Tailwind CSS'],
    liveUrl: null,
    githubUrl: 'https://github.com/Aryankashyapnit/MemeSoundboard',
    metrics: 'Sub-10ms audio triggering with pure Web Audio synthesis.'
  },

  'git-connect': {
    id: 'git-connect',
    number: '09',
    title: 'Git Connect',
    tagline: 'Developer networking and repository collaboration bridge',
    category: 'Dev Tool',
    year: '2026',
    status: 'Active',
    role: 'Developer',
    heroImage: null,
    summary: 'A developer collaboration platform connecting student coders based on shared GitHub languages, active repositories, and project interests.',
    whatIsIt: 'Git Connect leverages the GitHub REST API to help university developers discover peers building in similar tech stacks (e.g. Flutter, Kotlin, Next.js).',
    whyBuilt: 'Finding open-source collaborators within a college campus is often difficult. Git Connect visualizes developer skills directly from authentic commit histories.',
    howItWorks: [
      'GitHub OAuth and profile fetching.',
      'Tech stack matching algorithm based on repo language breakdowns.',
      'Project showcase feed.'
    ],
    techStack: ['React', 'Node.js', 'GitHub REST API', 'Express'],
    liveUrl: null,
    githubUrl: 'https://github.com/Aryankashyapnit/git-connect',
    metrics: 'Automated GitHub profile and repository synergy matching.'
  },

  'smartkitchen': {
    id: 'smartkitchen',
    number: '10',
    title: 'SmartKitchen',
    tagline: 'Pantry inventory tracking and recipe recommendation assistant',
    category: 'Smart Utility',
    year: '2026',
    status: 'Active',
    role: 'Developer',
    heroImage: null,
    summary: 'An intelligent pantry assistant that logs grocery ingredients, monitors expiry timelines, and recommends recipes based on available stock.',
    whatIsIt: 'A practical utility helping individuals and hostel students minimize food waste by turning leftover pantry items into easy recipes.',
    whyBuilt: 'Managing groceries and deciding daily meals creates unnecessary friction. SmartKitchen automates pantry logging and provides recipe suggestions using only on-hand ingredients.',
    howItWorks: [
      'Ingredient inventory logging with expiry badges.',
      'Recipe generator matching ingredients to meal ideas.',
      'Grocery shopping checklist auto-generator.'
    ],
    techStack: ['React', 'JavaScript', 'Local Storage', 'Tailwind CSS'],
    liveUrl: null,
    githubUrl: 'https://github.com/Aryankashyapnit/SmartKitchen',
    metrics: 'Offline-ready inventory tracker with ingredient-to-recipe mapping.'
  },

  'labease': {
    id: 'labease',
    number: '11',
    title: 'LabEase',
    tagline: 'Digital laboratory manual and experiment tracking portal',
    category: 'Academic Tool',
    year: '2026',
    status: 'Active',
    role: 'Developer',
    heroImage: null,
    summary: 'A centralized portal for engineering students to access laboratory manuals, circuit diagrams, code samples, and viva questions.',
    whatIsIt: 'LabEase digitizes practical lab coursework for engineering branches, eliminating the need to photocopies old physical lab files.',
    whyBuilt: 'Laboratory experiments in engineering colleges often have scarce documentation or outdated physical manuals. LabEase provides clean, searchable experiment code and step-by-step procedures.',
    howItWorks: [
      'Department-wise experiment indexing (ECE, CSE, EE, ME).',
      'Circuit schematics, code snippets, and observation tables.',
      'Viva voce preparation question sets.'
    ],
    techStack: ['HTML5', 'CSS3', 'JavaScript', 'Markdown Engine'],
    liveUrl: null,
    githubUrl: 'https://github.com/Aryankashyapnit/LabEase',
    metrics: 'Standardized digital lab manuals across multiple engineering semesters.'
  }
};
