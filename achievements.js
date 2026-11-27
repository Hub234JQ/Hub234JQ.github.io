/*
  Achievements page content (achievements.html).
  Certificate photos: images/achievements/01.jpg … (same order as `certificates`).
  Only list awards that are backed by a certificate, the resume or the old portfolio.
*/
const ACHIEVEMENTS = {
  title: "Achievements",
  summary: "From needing extra tutoring in primary school to earning an award every year since: scholarships, bursaries, the EAGLES leadership award, and a national game-design prize.",
  story: [
    "I wasn't always a top student. In primary school I was slow to pick up new topics and needed several kinds of tuition just to keep up. After I failed my Primary 5 exams I was moved to a foundation class, and at the time it felt heartbreaking.",
    "It turned out to be my turning point. The change of environment helped everything click, and I finished in the top 5 of my class. Since then I've earned an award every year, first at Sembawang Secondary School and then at ITE College Central.",
    "I'm grateful to my family, my teachers and my friends for supporting me when I felt powerless. It's why I believe that with the right support and a never-give-up attitude, any challenge can be overcome.",
  ],
  // Grouped list shown on the page (newest info first in each line).
  awards: [
    { name: "3rd place, national Scratch game competition", detail: "Secondary school · my first game", years: "" },
    { name: "Edusave Scholarship", detail: "Sembawang Secondary School", years: "2019 · 2020" },
    { name: "EAGLES Award for Achievement, Good Leadership and Service", detail: "Secondary school and ITE", years: "2021 · 2023" },
    { name: "Edusave Merit Bursary", detail: "Secondary school and ITE", years: "2018 · 2021 · 2022 · 2023" },
    { name: "Edusave Certificate of Academic Achievement", detail: "Secondary school and ITE", years: "2018 · 2022 · 2023" },
  ],
  certifications: [
    "Anthropic — AI Fluency: Framework & Foundations",
    "Alibaba Cloud — AI Journey with Alibaba Cloud",
    "AWS Training & Certification",
    "WTH 2025 — Participant",
  ],
  certificates: [
    "Edusave Certificate of Academic Achievement and Merit Bursary 2018",
    "Edusave Scholarship 2019, Sembawang Edusave Awards Ceremony",
    "Edusave Scholarship 2020, with the adviser's message",
    "EAGLES Award and Merit Bursary 2021",
    "Edusave Merit Bursary 2022 at ITE, Sembawang Central awards",
    "Edusave Certificate of Academic Achievement 2022",
    "EAGLES Award 2023 for leadership, service and good conduct",
    "Edusave Certificate of Academic Achievement 2023",
    "Edusave Merit Bursary 2023",
  ],
};
