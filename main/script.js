
// Main site behavior
const toggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('.nav');

if (toggle && nav) {
  toggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(isOpen));
  });

  nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });
}

const year = document.getElementById('year');
if (year) year.textContent = new Date().getFullYear();

const form = document.getElementById('interestForm');
const formNote = document.getElementById('formNote');

if (form) {
  form.addEventListener('submit', event => {
    event.preventDefault();
    if (formNote) {
      formNote.textContent = 'Thanks! The layout is ready. Next, connect this form to email, Square, Calendly or another booking service.';
      formNote.style.color = '#3f7c52';
      formNote.style.fontWeight = '800';
    }
  });
}
const eventInquiryForm = document.getElementById("eventInquiryForm");
const eventFormNote = document.getElementById("eventFormNote");
if (eventInquiryForm) {
  eventInquiryForm.addEventListener("submit", (event) => {
    event.preventDefault();
    if (eventFormNote) {
      eventFormNote.textContent = "Thanks! This demo form is working. Connect it to your preferred email, CRM or Square workflow before launch.";
      eventFormNote.style.color = "#3f7c52";
      eventFormNote.style.fontWeight = "800";
    }
  });
}
const SITE_CONFIG = {
  squareUrl: "https://squareup.com/appointments/book/learning-with-ms-karen-demo"
};

const CLASS_DATA = [
  {
    id: "move-play-learn-2026-09-08",
    title: "Move, Play & Learn",
    date: "2026-09-08",
    time: "10:00 AM",
    location: "Middletown, DE",
    locationKey: "middletown",
    ageLabel: "Toddlers + caregiver",
    ageKey: "toddler",
    typeLabel: "Music & movement",
    typeKey: "music",
    description: "Music, movement and interactive play for active toddlers and their grown-ups.",
    keywords: "toddler toddlers music movement play dancing rhythm caregiver middletown"
  },
  {
    id: "little-learners-2026-09-12",
    title: "Little Learners",
    date: "2026-09-12",
    time: "9:30 AM",
    location: "Odessa, DE",
    locationKey: "odessa",
    ageLabel: "Babies + caregiver",
    ageKey: "baby",
    typeLabel: "Sensory & play",
    typeKey: "sensory",
    description: "Gentle songs, sensory activities and bonding experiences for babies and their caregivers.",
    keywords: "baby babies sensory songs music caregiver bonding odessa"
  },
  {
    id: "ready-set-grow-2026-09-19",
    title: "Ready, Set, Grow!",
    date: "2026-09-19",
    time: "11:00 AM",
    location: "Townsend, DE",
    locationKey: "townsend",
    ageLabel: "Preschoolers + caregiver",
    ageKey: "preschool",
    typeLabel: "Preschool enrichment",
    typeKey: "preschool",
    description: "Early-learning activities focused on creativity, confidence and school-readiness skills.",
    keywords: "preschool preschoolers early literacy numbers school readiness learning townsend"
  },
  {
    id: "family-popup-2026-09-26",
    title: "Saturday Family Pop-Up",
    date: "2026-09-26",
    time: "10:30 AM",
    location: "Middletown, DE",
    locationKey: "middletown",
    ageLabel: "All ages 0–5",
    ageKey: "allages",
    typeLabel: "Family pop-up",
    typeKey: "family",
    description: "A playful weekend class for families with children across the 0–5 age range.",
    keywords: "family pop-up saturday all ages music movement play siblings middletown"
  }
];

document.querySelectorAll("[data-square-link]").forEach(link => {
  link.href = SITE_CONFIG.squareUrl;
});

const monthNames = ["January","February","March","April","May","June","July","August","September","October","November","December"];
const shortMonthNames = ["JAN","FEB","MAR","APR","MAY","JUN","JUL","AUG","SEP","OCT","NOV","DEC"];

function parseDateParts(dateString) {
  const [year, month, day] = dateString.split("-").map(Number);
  return { year, month: month - 1, day };
}

function formatShortDate(dateString) {
  const { month, day } = parseDateParts(dateString);
  return `${shortMonthNames[month][0] + shortMonthNames[month].slice(1).toLowerCase()} ${day}`;
}

function renderSearchCards() {
  const container = document.getElementById("classSearchResults");
  if (!container) return;
  container.innerHTML = CLASS_DATA.map(item => `
    <article class="search-class-card"
      data-title="${item.title}"
      data-age="${item.ageKey}"
      data-location="${item.locationKey}"
      data-type="${item.typeKey}"
      data-keywords="${item.keywords}">
      <div class="search-class-top">
        <span class="search-class-date">${formatShortDate(item.date)}</span>
        <span class="search-class-age">${item.ageLabel}</span>
      </div>
      <h3>${item.title}</h3>
      <p>${item.description}</p>
      <div class="search-class-meta">
        <span>📍 ${item.location}</span>
        <span>🕘 ${item.time}</span>
      </div>
      <a class="btn btn-primary" href="${SITE_CONFIG.squareUrl}" target="_blank" rel="noopener">Book This Class</a>
    </article>
  `).join("");
}

function renderUpcomingEvents() {
  const container = document.getElementById("eventList");
  if (!container) return;
  container.innerHTML = CLASS_DATA.map(item => {
    const { month, day } = parseDateParts(item.date);
    return `
      <article class="event-card" data-event-date="${item.date}">
        <div class="event-date"><strong>${day}</strong><span>${shortMonthNames[month]}</span></div>
        <div class="event-info">
          <span>${item.ageLabel}</span>
          <h4>${item.title}</h4>
          <p>${item.time} • ${item.location}</p>
          <a href="${SITE_CONFIG.squareUrl}" target="_blank" rel="noopener">Book this class →</a>
        </div>
      </article>
    `;
  }).join("");
}

const firstScheduledClass = CLASS_DATA
  .map(item => item.date)
  .sort()[0];
const initialCalendarDate = firstScheduledClass
  ? parseDateParts(firstScheduledClass)
  : { year: new Date().getFullYear(), month: new Date().getMonth() };
let calYear = initialCalendarDate.year;
let calMonth = initialCalendarDate.month;
const grid = document.getElementById("calendarGrid");
const monthLabel = document.getElementById("calendarMonth");

function keyFor(y,m,d) {
  return `${y}-${String(m+1).padStart(2,"0")}-${String(d).padStart(2,"0")}`;
}

function renderCalendar() {
  if (!grid || !monthLabel) return;
  monthLabel.textContent = `${monthNames[calMonth]} ${calYear}`;
  grid.innerHTML = "";

  const first = new Date(Date.UTC(calYear, calMonth, 1)).getUTCDay();
  const days = new Date(Date.UTC(calYear, calMonth + 1, 0)).getUTCDate();
  const eventMap = new Map(CLASS_DATA.map(item => [item.date, item]));

  for (let i = 0; i < first; i++) {
    const empty = document.createElement("div");
    empty.className = "calendar-day empty";
    grid.appendChild(empty);
  }

  for (let d = 1; d <= days; d++) {
    const key = keyFor(calYear, calMonth, d);
    const item = eventMap.get(key);
    const cell = document.createElement(item ? "button" : "div");
    cell.className = "calendar-day" + (item ? " has-event" : "");

    if (item) {
      cell.type = "button";
      cell.setAttribute("aria-label", `${item.title}, ${monthNames[calMonth]} ${d}`);
      cell.addEventListener("click", () => {
        document.querySelectorAll(".calendar-day.selected").forEach(x => x.classList.remove("selected"));
        cell.classList.add("selected");
        document.querySelectorAll(".event-card").forEach(card => {
          const match = card.dataset.eventDate === key;
          card.classList.toggle("highlight", match);
          if (match) card.scrollIntoView({ behavior: "smooth", block: "nearest" });
        });
      });
    }

    cell.textContent = d;
    grid.appendChild(cell);
  }
}

document.getElementById("prevMonth")?.addEventListener("click", () => {
  calMonth--;
  if (calMonth < 0) { calMonth = 11; calYear--; }
  renderCalendar();
});
document.getElementById("nextMonth")?.addEventListener("click", () => {
  calMonth++;
  if (calMonth > 11) { calMonth = 0; calYear++; }
  renderCalendar();
});

renderSearchCards();
renderUpcomingEvents();
renderCalendar();

const classSearchText = document.getElementById("classSearchText");
const classAgeFilter = document.getElementById("classAgeFilter");
const classLocationFilter = document.getElementById("classLocationFilter");
const classTypeFilter = document.getElementById("classTypeFilter");
const clearClassSearch = document.getElementById("clearClassSearch");
const classResultCount = document.getElementById("classResultCount");
const noClassResults = document.getElementById("noClassResults");

function updateClassSearch() {
  const cards = Array.from(document.querySelectorAll(".search-class-card"));
  const text = (classSearchText?.value || "").trim().toLowerCase();
  const age = classAgeFilter?.value || "all";
  const location = classLocationFilter?.value || "all";
  const type = classTypeFilter?.value || "all";
  let visible = 0;

  cards.forEach(card => {
    const haystack = [card.dataset.title || "", card.dataset.keywords || "", card.textContent || ""].join(" ").toLowerCase();
    const show =
      (!text || haystack.includes(text)) &&
      (age === "all" || card.dataset.age === age) &&
      (location === "all" || card.dataset.location === location) &&
      (type === "all" || card.dataset.type === type);

    card.hidden = !show;
    if (show) visible++;
  });

  if (classResultCount) classResultCount.textContent = `${visible} ${visible === 1 ? "class" : "classes"} found`;
  if (noClassResults) noClassResults.hidden = visible !== 0;
}

[classSearchText, classAgeFilter, classLocationFilter, classTypeFilter].forEach(control => {
  control?.addEventListener(control === classSearchText ? "input" : "change", updateClassSearch);
});

clearClassSearch?.addEventListener("click", () => {
  if (classSearchText) classSearchText.value = "";
  if (classAgeFilter) classAgeFilter.value = "all";
  if (classLocationFilter) classLocationFilter.value = "all";
  if (classTypeFilter) classTypeFilter.value = "all";
  updateClassSearch();
});

updateClassSearch();

