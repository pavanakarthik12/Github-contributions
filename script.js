const contributorsGrid = document.getElementById("contributorsGrid");
const statusText = document.getElementById("status");
const jsonFileCount = document.getElementById("jsonFileCount");
const cardCount = document.getElementById("cardCount");

const DATA_DIR = "data";
const DEFAULT_JSON_FILES = [
  "karthik.json",
  "Laasya.json",
  "mohitha.json",
  "rahul.json",
  "rishi.json",
];
const AUTO_REFRESH_INTERVAL_MS = 20000;

let lastRenderSignature = "";

function normalizeJsonFileName(fileName) {
  return String(fileName || "").trim().split("/").pop() || "";
}

function isJsonFile(fileName) {
  return fileName.toLowerCase().endsWith(".json");
}

function getGitHubRepoContext() {
  const host = window.location.hostname;
  if (!host.endsWith(".github.io")) {
    return null;
  }

  const owner = host.split(".")[0];
  const pathParts = window.location.pathname.split("/").filter(Boolean);
  const repo = pathParts.length > 0 ? pathParts[0] : `${owner}.github.io`;

  if (!owner || !repo) {
    return null;
  }

  return { owner, repo };
}

async function discoverJsonFilesFromGitHubApi() {
  const repoContext = getGitHubRepoContext();
  if (!repoContext) {
    return [];
  }

  try {
    const apiUrl = `https://api.github.com/repos/${repoContext.owner}/${repoContext.repo}/contents/${DATA_DIR}`;
    const response = await fetch(apiUrl, { cache: "no-store" });
    if (!response.ok) {
      return [];
    }

    const entries = await response.json();
    if (!Array.isArray(entries)) {
      return [];
    }

    return entries
      .filter((entry) => entry && entry.type === "file" && isJsonFile(entry.name))
      .map((entry) => normalizeJsonFileName(entry.name));
  } catch (error) {
    return [];
  }
}

function escapeHTML(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function buildCard(contributor) {
  const card = document.createElement("article");
  card.className = "card";

  const fallbackPortfolio = `portfolios/${contributor.slug}.html`;
  const portfolioPath = contributor.portfolio || fallbackPortfolio;

  card.innerHTML = `
    <h3>${escapeHTML(contributor.name)}</h3>
    <p class="year">${escapeHTML(contributor.year)}</p>
    <p class="intro">${escapeHTML(contributor.intro)}</p>
    <a href="${escapeHTML(portfolioPath)}" aria-label="View ${escapeHTML(contributor.name)} portfolio">View Portfolio</a>
  `;

  return card;
}

function inferSlugFromFile(fileName) {
  return fileName.replace(/\.json$/i, "");
}

function normalizePortfolioPath(rawPath, slug) {
  const fallbackPath = `portfolios/${slug}.html`;
  const value = String(rawPath || "").trim();

  if (!value) {
    return fallbackPath;
  }

  if (value.toLowerCase().startsWith("portfolios/") && value.toLowerCase().endsWith(".html")) {
    return value;
  }

  if (value.toLowerCase().endsWith(".html")) {
    return `portfolios/${value.split("/").pop()}`;
  }

  return fallbackPath;
}

async function discoverJsonFiles() {
  const discovered = new Set();

  try {
    const directoryResponse = await fetch(`${DATA_DIR}/`, { cache: "no-store" });
    if (directoryResponse.ok) {
      const directoryHtml = await directoryResponse.text();
      const matches = directoryHtml.matchAll(/href=["']([^"']+\.json)["']/gi);
      for (const match of matches) {
        const filePath = match[1].split("?")[0].split("#")[0];
        const file = normalizeJsonFileName(filePath);
        if (file && isJsonFile(file)) {
          discovered.add(file);
        }
      }
    }
  } catch (error) {
    // Some static hosts do not expose directory listings; fallback handles this.
  }

  if (discovered.size === 0) {
    const apiDiscoveredFiles = await discoverJsonFilesFromGitHubApi();
    apiDiscoveredFiles.forEach((file) => discovered.add(file));
  }

  if (discovered.size === 0) {
    DEFAULT_JSON_FILES.forEach((file) => discovered.add(file));
  }

  return Array.from(discovered).sort((a, b) => a.localeCompare(b));
}

async function loadContributors() {
  const files = await discoverJsonFiles();

  const results = await Promise.allSettled(
    files.map(async (file) => {
      const response = await fetch(`${DATA_DIR}/${file}`, { cache: "no-store" });
      if (!response.ok) {
        throw new Error(`Unable to read ${file}`);
      }

      const data = await response.json();
      return {
        slug: inferSlugFromFile(file),
        name: data.name || "Unknown Contributor",
        year: data.year || "Year not provided",
        intro: data.intro || "No intro added yet.",
        portfolio: normalizePortfolioPath(data.portfolio, inferSlugFromFile(file)),
      };
    })
  );

  const validContributors = results
    .filter((item) => item.status === "fulfilled")
    .map((item) => item.value)
    .filter((item) => item.name && item.slug)
    .sort((a, b) => a.name.localeCompare(b.name));

  return {
    contributors: validContributors,
    discoveredFileCount: files.length,
    invalidFileCount: Math.max(files.length - validContributors.length, 0),
  };
}

function animateReveals() {
  const revealElements = document.querySelectorAll(".reveal, .card");
  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  revealElements.forEach((element, index) => {
    if (element.classList.contains("card")) {
      element.style.transitionDelay = `${Math.min(index * 70, 340)}ms`;
    }
    observer.observe(element);
  });
}

function buildRenderSignature({ contributors, discoveredFileCount, invalidFileCount }) {
  const contributorKey = contributors
    .map((contributor) => `${contributor.slug}:${contributor.name}:${contributor.portfolio}`)
    .join("|");

  return `${discoveredFileCount}::${invalidFileCount}::${contributorKey}`;
}

function renderContributorCards({ contributors, discoveredFileCount, invalidFileCount }) {
  contributorsGrid.innerHTML = "";

  if (jsonFileCount) {
    jsonFileCount.textContent = `JSON Files: ${discoveredFileCount}`;
  }

  if (cardCount) {
    cardCount.textContent = `Cards Shown: ${contributors.length}`;
  }

  if (contributors.length === 0) {
    statusText.textContent = "No contributors found yet. Add JSON files in the data folder.";
    return;
  }

  const cards = contributors.map((contributor) => buildCard(contributor));
  cards.forEach((card) => contributorsGrid.appendChild(card));

  if (invalidFileCount > 0) {
    statusText.textContent = `Showing ${contributors.length} contributor${contributors.length > 1 ? "s" : ""}. ${invalidFileCount} JSON file${invalidFileCount > 1 ? "s were" : " was"} skipped due to invalid data. Auto-refresh runs every 20 seconds.`;
  } else {
    statusText.textContent = `Showing ${contributors.length} contributor${contributors.length > 1 ? "s" : ""}. Auto-refresh runs every 20 seconds.`;
  }

  animateReveals();
}

async function renderContributors({ isAutoRefresh = false } = {}) {
  try {
    const renderState = await loadContributors();
    const nextSignature = buildRenderSignature(renderState);

    if (isAutoRefresh && nextSignature === lastRenderSignature) {
      return;
    }

    renderContributorCards(renderState);
    lastRenderSignature = nextSignature;
  } catch (error) {
    statusText.textContent = "Unable to load contributors. Make sure you are running with a local server.";
    contributorsGrid.innerHTML = "";

    if (jsonFileCount) {
      jsonFileCount.textContent = "JSON Files: 0";
    }

    if (cardCount) {
      cardCount.textContent = "Cards Shown: 0";
    }

    lastRenderSignature = "";
  }
}

function startAutoRefresh() {
  window.setInterval(() => {
    renderContributors({ isAutoRefresh: true });
  }, AUTO_REFRESH_INTERVAL_MS);
}

animateReveals();
renderContributors();
startAutoRefresh();
