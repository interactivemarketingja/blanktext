const parishes = [
  "Kingston",
  "St. Andrew",
  "St. Catherine",
  "Clarendon",
  "Manchester",
  "St. Elizabeth",
  "Westmoreland",
  "Hanover",
  "St. James",
  "Trelawny",
  "St. Ann",
  "St. Mary",
  "Portland",
  "St. Thomas",
];

const communities = [
  "Music & Dancehall",
  "Small Business Market",
  "School & Youth",
  "Parish Events",
  "Sports Corner",
  "Tourism & Food",
];

const trendingTags = [
  "#ReggaeMonth",
  "#RoadSafetyJA",
  "#YardFood",
  "#StartupJA",
  "#BeachCleanup",
];

const seedPosts = [
  {
    author: "Aaliyah",
    parish: "St. James",
    content: "Pop-up craft market in Montego Bay this Saturday. Local creators only!",
    createdAt: new Date(Date.now() - 1000 * 60 * 26).toISOString(),
  },
  {
    author: "Devon",
    parish: "Kingston",
    content: "Any football teams looking for a friendly match this weekend?",
    createdAt: new Date(Date.now() - 1000 * 60 * 91).toISOString(),
  },
];

const state = {
  posts: JSON.parse(localStorage.getItem("yardlink-posts") || "null") || seedPosts,
};

const feedEl = document.getElementById("feed");
const formEl = document.getElementById("post-form");
const parishEl = document.getElementById("parish");
const communitiesEl = document.getElementById("communities");
const trendingEl = document.getElementById("trending");

function timeAgo(isoDate) {
  const diffMinutes = Math.max(1, Math.floor((Date.now() - new Date(isoDate).getTime()) / 60000));
  if (diffMinutes < 60) return `${diffMinutes}m ago`;
  const hours = Math.floor(diffMinutes / 60);
  if (hours < 24) return `${hours}h ago`;
  return `${Math.floor(hours / 24)}d ago`;
}

function renderList(container, items) {
  container.innerHTML = "";
  items.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = item;
    container.appendChild(li);
  });
}

function renderParishes() {
  parishes.forEach((name) => {
    const option = document.createElement("option");
    option.value = name;
    option.textContent = name;
    parishEl.appendChild(option);
  });
}

function renderFeed() {
  feedEl.innerHTML = "";
  state.posts
    .slice()
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .forEach((post) => {
      const article = document.createElement("article");
      article.className = "post";
      article.innerHTML = `
        <div class="post-header">
          <strong>${post.author}</strong>
          <span>${timeAgo(post.createdAt)}</span>
        </div>
        <div class="post-parish">${post.parish}</div>
        <p class="post-content">${post.content}</p>
      `;
      feedEl.appendChild(article);
    });
}

formEl.addEventListener("submit", (event) => {
  event.preventDefault();
  const author = document.getElementById("author").value.trim();
  const parish = parishEl.value;
  const content = document.getElementById("content").value.trim();

  if (!author || !parish || !content) return;

  state.posts.push({
    author,
    parish,
    content,
    createdAt: new Date().toISOString(),
  });

  localStorage.setItem("yardlink-posts", JSON.stringify(state.posts));
  formEl.reset();
  renderFeed();
});

renderParishes();
renderList(communitiesEl, communities);
renderList(trendingEl, trendingTags);
renderFeed();
