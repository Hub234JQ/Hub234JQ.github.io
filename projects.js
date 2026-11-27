/*
  ONE place for all project content.
  - Home page cards and project detail pages (project.html?id=...) are both built from this list.
  - To add a project: copy one block, give it a unique `id`, fill in the fields.
  - Images: put a cover at images/projects/<id>.jpg (16:10).
    Optional gallery: add file paths to `gallery`, e.g. "images/projects/mustergo/1.jpg".
  - links: buttons; a relative url like "demos/<id>/" points at a demo hosted in this site
  - github: repo URL (shows a GitHub button on the card and detail page)
  - category: "web" | "data" | "mobile" | "design"
*/
const PROJECTS = [
  {
    id: "mustergo",
    github: "https://github.com/Croptics/VJMDynamics-NYP-x-SCCCI-",
    title: "MusterGo",
    feature: true,
    category: "web",
    year: "2026",
    place: "NYP × SCCCI AI Challenge (FSAD)",
    role: "Admin dashboard, auth & attendance lead",
    team: "Team of 6",
    colors: ["#4f46e5", "#06b6d4"],
    summary: "A live headcount and attendance app for SCCCI overseas delegations, built so that no one gets left behind. Staff track trips on desktop while delegates check in by QR code or face scan on mobile.",
    cardDetail: "I built the <strong>admin dashboard and authentication</strong>, including a 25-key permission system for role-based access. I also built <strong>offline-first attendance sync</strong> for low-connectivity trips, and I <strong>deployed the full stack</strong> to Alibaba Cloud with Nginx and PM2.",
    stack: ["React", "Vite", "Node.js", "Express", "PostgreSQL (Neon)", "JWT", "Alibaba Cloud ECS", "Nginx", "PM2"],
    links: [{ label: "Try the interactive demo", url: "demos/mustergo/" }],
    stats: [
      { value: "25", label: "Permission keys" },
      { value: "6", label: "Feature modules" },
      { value: "Live", label: "Deployed on cloud" }
    ],
    problem: "When SCCCI takes business delegations overseas, staff count heads by hand at every stop: on the coach, at the hotel, at each venue. On a packed itinerary, it's easy for someone to be missed. The challenge was to make sure no one gets left behind, even where the internet connection is poor.",
    solution: "MusterGo is a real-time trip tracking app. Admins and staff run trips from a desktop dashboard, while delegates are checked in by QR code or on-device face recognition on mobile. Anyone missing, late or flagged shows up instantly on both.",
    contributions: [
      "<strong>InsightMetrics admin dashboard:</strong> live KPIs, full delegate management, a reverse-headcount \"Missing\" list, room management, checkpoint history and analytics.",
      "<strong>Authentication and accounts:</strong> signed JWT sessions with one active session per account, a 25-key permission system and named role templates that scope what each staff level can see.",
      "<strong>Multi-checkpoint attendance:</strong> attendance is tracked per stop, not just per day, and each delegate is marked Late or Arrived automatically against that stop's own cutoff time.",
      "<strong>Offline-first sync:</strong> a read and write cache using the outbox pattern, so attendance taken with no signal syncs safely once the device is back online.",
      "<strong>Deployment:</strong> I configured and deployed the full stack to an Alibaba Cloud ECS VM, with Nginx as the reverse proxy and PM2 managing the processes."
    ],
    learned: "This was my first time owning the auth and permissions layer that every teammate's feature depends on. It taught me to design for other developers as well as end users, and to keep the team's Git history honest about who built what.",
    gallery: []
  },
  {
    id: "shopsphere",
    title: "ShopSphere CRM Platform",
    feature: true,
    badge: "In progress",
    category: "data",
    year: "2026",
    place: "NYP · AI Model Deployment (AIM)",
    role: "Client lead & front-end",
    team: "Team of 5",
    colors: ["#059669", "#22d3ee"],
    summary: "A data and ML platform for a simulated global retailer that predicts which customers are drifting away and builds a weekly win-back offer list for the CRM team to approve.",
    cardDetail: "I lead the client relationship and built the <strong>Streamlit staff dashboard</strong>, backed by <strong>160+ automated tests</strong>. I also own three <strong>Airflow data pipelines</strong> end to end, along with their contracts and governance.",
    stack: ["Python", "Streamlit", "Apache Airflow", "PostgreSQL", "Docker", "MLflow", "pytest", "GitLab CI"],
    links: [],
    stats: [
      { value: "160+", label: "Automated tests" },
      { value: "3", label: "Live pipelines I own" },
      { value: "0", label: "Duplicate records on re-run" }
    ],
    problem: "ShopSphere, a simulated retailer operating in 5 countries, is losing customers. Its CRM team needs a weekly list of customers worth winning back, with the right voucher for each, without overspending the budget or contacting the same person twice.",
    solution: "We're building a full platform: data pipelines pull from 17 sources into a governed database, an AutoML model scores how likely each customer is to churn, and a staff dashboard lets CRM review and approve the weekly win-back list.",
    contributions: [
      "<strong>Staff dashboard (Streamlit):</strong> win-back approval within budget with Ready, Skipped and Blocked lists; a customer lookup for service agents; a marketing overview; and a data health page showing live pipeline status.",
      "<strong>Three pipelines, end to end:</strong> support tickets from an API every 5 minutes, the daily customer service roster from files, and the offer catalogue, each with data contracts, quarantine for bad rows and email alerts.",
      "<strong>Data quality and privacy:</strong> cross-field rules, freshness alerts that email once per problem rather than every run, and a privacy scrubber that removes emails, phone numbers, NRICs and card numbers from exports.",
      "<strong>Testing and CI:</strong> 119 front-end and 44 pipeline tests, run on every push in GitLab CI.",
      "<strong>Client lead:</strong> I wrote the requirements and design spec and the team risk register, and I keep the AI-use declaration up to date."
    ],
    learned: "Data work is mostly about trust. A dashboard is only useful if staff can believe its numbers, so I made every number traceable back to the database and every failure visible.",
    gallery: []
  },
  {
    id: "sgen",
    github: "https://github.com/Generic-Inc/SGEN",
    title: "SGEN",
    category: "web",
    year: "2026",
    place: "Nanyang Polytechnic",
    role: "Messaging feature developer",
    colors: ["#7c5cff", "#22d3ee"],
    summary: "A web app that connects Singaporean youths and seniors through shared interests. I built the real-time messaging feature.",
    stack: ["Python", "Flask", "Flask-SocketIO", "HTML/CSS", "JavaScript"],
    links: [{ label: "Try the interactive demo", url: "demos/sgen/" }],
    problem: "Youths and seniors in Singapore often live side by side but rarely connect. SGEN matches them through shared interests, such as cooking, gardening or games, so they can start a conversation.",
    solution: "A web platform where users create profiles, get matched by interest and chat with each other.",
    contributions: [
      "Built the messaging feature with Flask-SocketIO for real-time, two-way chat between matched users.",
      "Reviewed and verified code integration across the team's modules to make sure features worked together, keeping quality high against the rubric as requirements changed."
    ],
    gallery: []
  },
  {
    id: "hospital-ed",
    title: "Hospital ED Data Analysis",
    category: "data",
    year: "2026",
    place: "Nanyang Polytechnic",
    role: "Data analyst",
    colors: ["#0ea5e9", "#34d399"],
    summary: "A Power BI analysis of emergency department patient flow that identifies wait-time bottlenecks, peak demand and arrival patterns.",
    stack: ["Power BI", "Power Query", "Data Cleaning", "Visualisation"],
    links: [],
    problem: "Emergency departments struggle with long waits and bed shortages at peak times. The hospital needed to understand when and why bottlenecks happen.",
    solution: "An interactive Power BI dashboard covering patient visits, outcomes, wait times by urgency, satisfaction, resource use, nurses on shift per hour, and anomaly detection on monthly patient counts.",
    contributions: [
      "Cleaned and transformed the raw healthcare data in Power BI (sorting, filtering, removing bad rows) so the analysis was accurate.",
      "Built visuals mapping peak demand, arrival patterns and wait time by urgency.",
      "Presented the findings in simple, high-impact charts so non-technical stakeholders could act on them."
    ],
    gallery: []
  },
  {
    id: "csc",
    github: "https://github.com/Hub234JQ/UIUX-Assigment",
    title: "Community Service Club Website",
    category: "web",
    year: "2025",
    place: "Nanyang Polytechnic",
    role: "Co-lead developer",
    colors: ["#8b5cf6", "#ec4899"],
    summary: "The club's website, which showcases its events, volunteering initiatives and impact so new members can see what the club does and join in.",
    stack: ["HTML", "CSS", "JavaScript", "UI/UX"],
    links: [{ label: "Visit site", url: "https://hub234jq.github.io/UIUX-Assigment/index.html" }],
    problem: "Prospective members had no easy way to see what the Community Service Club does or how to get involved.",
    solution: "A website that presents the club's featured events, photo highlights and volunteering programmes, with a clear path to join.",
    contributions: [
      "Co-led development and the UI/UX design of the site.",
      "Built the featured events and photo highlight sections.",
      "Wrote content focused on transparency, showing what each initiative achieved."
    ],
    gallery: []
  },
  {
    id: "gpa-calculator",
    github: "https://github.com/Hub234JQ/gpa_calculator",
    title: "GPA Calculator",
    category: "mobile",
    year: "2024",
    place: "ITE College Central",
    role: "Developer",
    colors: ["#2563eb", "#60a5fa"],
    summary: "A cross-platform mobile app built with Flutter. Students enter their modules, credits and grades and get their GPA instantly.",
    stack: ["Flutter", "Dart", "Android / iOS"],
    links: [],
    problem: "Working out a GPA by hand is slow and easy to get wrong, especially when modules carry different credits.",
    solution: "A simple mobile app that calculates a weighted GPA as students add their modules.",
    contributions: [
      "Designed and built the app in Flutter, my first mobile project.",
      "Built the GPA calculation, weighted by module credits."
    ],
    gallery: []
  },
  {
    id: "earsound",
    github: "https://github.com/Hub234JQ/Earbud-E-commerce",
    title: "EarSound Store",
    badge: "Concept",
    category: "web",
    year: "2023",
    place: "ITE · Front-end Web Development",
    role: "Main developer",
    colors: ["#10b981", "#a3e635"],
    summary: "A responsive online store for earphones and headphones, built from my own Adobe XD design, with a working JavaScript cart.",
    stack: ["HTML5", "Bootstrap", "JavaScript", "Adobe XD"],
    links: [{ label: "Visit site", url: "https://hub234jq.github.io/Earbud-E-commerce/" }],
    problem: "The brief: turn my own Adobe XD mockup from an earlier lab into a real, responsive online store, in six weeks (May to June 2023).",
    solution: "A full shopping flow, from the home page to products, cart and order confirmation, that adapts from desktop to mobile using Bootstrap.",
    contributions: [
      "Built every page by hand in HTML5, using Bootstrap's grid to make it responsive.",
      "Built a working cart page in JavaScript and a contact form that sends to email.",
      "Added an order confirmation page with an estimated delivery date, like a real store.",
      "Designed the footer with social links, policy pages and back-to-top navigation."
    ],
    note: "This is a demo store. Nothing is actually for sale.",
    gallery: []
  },
  {
    id: "win11-app",
    title: "Windows 11 Help App",
    category: "design",
    year: "2023",
    place: "ITE · User Experience Development",
    role: "UX designer",
    colors: ["#0284c7", "#38bdf8"],
    summary: "A 28-screen interactive prototype that guides users through common Windows 11 fixes, with tips drawn from my own troubleshooting.",
    stack: ["Adobe XD", "Prototyping", "UX Design"],
    links: [],
    stats: [
      { value: "28", label: "Screens" },
      { value: "4", label: "Tutorials" },
      { value: "6", label: "Tool guides" }
    ],
    problem: "Many Windows 11 users get stuck on common issues, such as failed updates and lost files, and don't know where to start.",
    solution: "A help app prototype with step-by-step tutorials, quick tips and recommended third-party tools, all drawn from fixes I'd used myself.",
    contributions: [
      "Designed 28 screens, including a splash flow, sign-in, home, tutorials, settings, security and contact.",
      "Wrote 4 main tutorials, 4 tip pages and 6 software introduction pages.",
      "Built an animated 5-screen splash sequence and a consistent blue design system."
    ],
    gallery: []
  },
  {
    id: "anime-shirt-store",
    title: "Anime Shirt Store",
    category: "web",
    year: "2023",
    place: "ITE · Web Content Management",
    role: "Site administrator",
    colors: ["#db2777", "#f472b6"],
    summary: "A WordPress e-commerce store for anime apparel, built and hosted on a local server.",
    stack: ["WordPress", "XAMPP", "WPForms", "CMS"],
    links: [],
    problem: "The module brief: create, edit and maintain a website on a local web server using a content management system.",
    solution: "An anime shirt store, a niche I care about personally, built on WordPress and running locally on XAMPP.",
    contributions: [
      "Set up WordPress on a local XAMPP server and managed the whole site.",
      "Built a shop page with product sorting, plus About Us and FAQ pages.",
      "Added a contact form with the WPForms plugin and footer navigation for long pages."
    ],
    gallery: []
  },
  {
    id: "honkai-store",
    github: "https://github.com/Hub234JQ/Honkai-Impact-3rd-by-JQ",
    title: "Game Item Store",
    badge: "Fan concept",
    category: "web",
    year: "2022",
    place: "ITE · Web Development Essentials",
    role: "Main developer",
    colors: ["#f59e0b", "#ef4444"],
    summary: "My first web project: a fan-made in-game item store inspired by Honkai Impact 3rd.",
    stack: ["HTML", "CSS", "Adobe Dreamweaver"],
    links: [{ label: "Visit site", url: "https://hub234jq.github.io/Honkai-Impact-3rd-by-JQ/products.html" }],
    problem: "My first web module: build a multi-page website from scratch. I chose a game I loved so I could be as creative as I wanted.",
    solution: "A store for in-game materials and characters, with plenty of hover animation, built in Dreamweaver using HTML and external CSS.",
    contributions: [
      "Built the full site in HTML and CSS, with shared navigation and a shared footer.",
      "Added hover animations throughout the product pages."
    ],
    note: "An unofficial fan project for learning, not affiliated with HoYoverse. It's due for a redesign.",
    gallery: []
  },
  {
    id: "media",
    title: "Video & Promo Work",
    category: "design",
    year: "2022",
    place: "ITE · Digital Media / Video Social Media",
    role: "Videographer & editor",
    colors: ["#ea580c", "#facc15"],
    summary: "Product commercials and short-form videos, including a speaker ad and a gaming laptop promo.",
    stack: ["Adobe Premiere Rush", "Photoshop", "Lightroom Classic"],
    links: [
      { label: "Speaker commercial", url: "https://youtube.com/shorts/iszwpKTbllY" },
      { label: "Laptop vs PC vs mobile", url: "https://youtube.com/shorts/8YQ3ndTywQ8" },
      { label: "Skateboard reframe", url: "https://youtube.com/shorts/SBcfgFshKmg" }
    ],
    problem: "In my Digital Media modules, I learned to plan, shoot and edit short promotional content.",
    solution: "A set of short-form videos and promos, shot on my phone and laptop and edited with Adobe tools.",
    contributions: [
      "Shot and edited a promo video for my own gaming laptop, plus a speaker commercial.",
      "Made a Lightroom slideshow of Chinatown and short-form edits using auto-reframe and pan-and-zoom."
    ],
    gallery: []
  }
];
