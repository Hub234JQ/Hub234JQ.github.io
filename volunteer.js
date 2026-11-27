/*
  Volunteering content. Home page "Beyond the code" cards and each detail page
  (volunteer.html?id=...) are built from this list.
  - Photos live in images/volunteer/<id>/01.jpg, 02.jpg ...  (set `photos` to how many there are)
  - Card cover: images/volunteer/<id>.jpg
  - captions: optional, one per photo (same order); leave "" for none
*/
const VOLUNTEER = [
  {
    id: "ndp",
    title: "NDP Motivator",
    since: "Since 2023",
    org: "National Day Parade · with ITE and NYP",
    colors: ["#ef4444", "#f97316"],
    summary: "With ITE and NYP, I lead crowd engagement for thousands of spectators at the National Day Parade. It's where I learned to lead, adapt fast and literally shine in the dark.",
    story: [
      "Joining the NDP Motivators is one of the best decisions I've made. As a Motivator, I'm out in front of the spectator stands, getting thousands of people cheering, singing and waving their light-up props during the parade's biggest moments.",
      "Behind the fun is a lot of discipline: rehearsals over many weekends, cues that have to land on time, and staying calm and energetic when the weather, the crowd or the programme doesn't go to plan.",
    ],
    learned: [
      "<strong>Leading a crowd:</strong> keeping energy high for thousands of people at once.",
      "<strong>Crisis management:</strong> adapting quickly when things change on the night.",
      "<strong>Teamwork:</strong> I've met amazing people from different schools across Singapore.",
    ],
    next: "After graduating in 2028, I want to step into leadership roles: mentoring new Motivator teams and helping run larger operations.",
    photos: 14,
    captions: ["", "Rehearsal formation on the parade floor", "", "", "", "", "", "", "", "", "", "", "", "The NDP Motivators recruitment poster"],
  },
  {
    id: "community",
    title: "Community Service",
    since: "Since 2022",
    org: "ITE · Youth Corps · community clubs",
    colors: ["#ec4899", "#a78bfa"],
    summary: "From Mission X outreach to low-income families and an elderly outing at Gardens by the Bay, to migrant worker engagement, beach clean-ups and neighbourhood recycling drives.",
    story: [
      "My very first volunteering activity in 2022 was teaching seniors how to take selfies and use photo filters. Seeing how happy a small thing made them is what kept me coming back.",
      "Since then I've joined a range of programmes: Mission X with ITE, an elderly outing at Gardens by the Bay, befriending migrant workers and residents at a home for persons with disabilities, a mass beach clean-up, and a neighbourhood recycling drive where I also handled the data collection.",
    ],
    learned: [
      "<strong>Empathy:</strong> Mission X showed me how hard life can be for low-income families.",
      "<strong>Initiative:</strong> stepping up instead of waiting to be told, from my team at Mission X to the recycling drive's data work.",
      "<strong>Purpose:</strong> it's why I want to build technology that supports people who need it most.",
    ],
    photos: 14,
    captions: [
      "Helping run the Ignite Skills 2023 competition at ITE East",
      "Elderly outing at Gardens by the Bay",
      "Looking after my assigned senior for the day",
      "Games and conversation with migrant workers",
      "A mass beach clean-up",
      "Visiting a home for persons with disabilities",
      "Spending the afternoon with residents",
      "A colouring my partner and I did together",
      "Neighbourhood recycling drive at Ang Mo Kio CC",
      "Collecting recyclables from residents' homes",
      "Handling the data collection for the drive",
      "My first volunteering activity: teaching seniors to take selfies",
      "Mission X with ITE",
      "Team Aqua at Mission X",
    ],
  },
  {
    id: "purple-parade",
    title: "Purple Parade",
    since: "Since 2024",
    org: "The Purple Parade",
    colors: ["#7c3aed", "#c084fc"],
    summary: "Promoting awareness and inclusion of persons with disabilities, celebrating abilities and building a more inclusive Singapore.",
    story: [
      "The Purple Parade is Singapore's movement to support the inclusion of persons with disabilities and celebrate their abilities. I've volunteered with it since 2024.",
      "It connects with my earlier volunteering at a home for persons with disabilities, and with my goal of building inclusive technology.",
    ],
    learned: [
      "<strong>Inclusion in practice:</strong> designing activities, and later products, that everyone can take part in.",
    ],
    photos: 1,
    captions: [""],
  },
];
