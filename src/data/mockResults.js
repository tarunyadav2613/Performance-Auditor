// Fixed results for specific known sites
export const githubResult = {
  url: "github.com",
  scores: { performance: 78, accessibility: 92, seo: 85, bestPractices: 88 },
  metrics: { lcp: 2.1, cls: 0.05, tbt: 180, fcp: 1.2 },
  issues: [
    { id: 1, category: "Accessibility", severity: "medium", description: "3 images missing alt text" },
    { id: 2, category: "Performance", severity: "low", description: "Unused JavaScript (120KB)" },
    { id: 3, category: "SEO", severity: "medium", description: "Missing meta description" }
  ]
};

export const googleResult = {
  url: "google.com",
  scores: { performance: 95, accessibility: 98, seo: 92, bestPractices: 96 },
  metrics: { lcp: 1.2, cls: 0.02, tbt: 45, fcp: 0.8 },
  issues: [
    { id: 1, category: "Performance", severity: "low", description: "Minify CSS (8KB savings)" }
  ]
};

// Issue templates used for random URLs
const allIssueTemplates = [
  { id: 1, category: "Accessibility", severity: "high", description: "Low color contrast on buttons" },
  { id: 2, category: "Performance", severity: "high", description: "Largest image is 2.1MB" },
  { id: 3, category: "Accessibility", severity: "medium", description: "Skip link missing" },
  { id: 4, category: "SEO", severity: "medium", description: "No structured data found" },
  { id: 5, category: "Performance", severity: "medium", description: "Render‑blocking CSS on initial load" },
  { id: 6, category: "Accessibility", severity: "low", description: "Some form fields missing explicit labels" }
];

// helper: random score 40–99 (so it looks realistic)
const randomScore = () => Math.floor(Math.random() * 60) + 40;

// helper: pick 2–4 random issues each time
const getRandomIssues = () => {
  const count = Math.floor(Math.random() * 3) + 2; // 2–4
  const shuffled = [...allIssueTemplates].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count).map((issue, index) => ({
    ...issue,
    id: index + 1
  }));
};

export const getMockResultForUrl = (url) => {
  const lower = url.toLowerCase();

  // special cases
  if (lower.includes("github")) return githubResult;
  if (lower.includes("google")) return googleResult;

  // all other URLs → fully random, but in realistic ranges
  return {
    url, // show exactly what user entered
    scores: {
      performance: randomScore(),
      accessibility: randomScore(),
      seo: randomScore(),
      bestPractices: randomScore()
    },
    metrics: {
      lcp: +(1 + Math.random() * 4).toFixed(1),      // 1.0–5.0
      cls: +(Math.random() * 0.25).toFixed(2),       // 0.00–0.25
      tbt: Math.floor(50 + Math.random() * 550),     // 50–600
      fcp: +(0.8 + Math.random() * 3.2).toFixed(1)   // 0.8–4.0
    },
    issues: getRandomIssues()
  };
};
