
const state = {
    query: "world",
    page: 1,
    pageSize: 12,
    total: 0,
    articles: [],
    saved: JSON.parse(
        localStorage.getItem("presssphere:saved") || "[]"
    )
};

const $ = selector => document.querySelector(selector);

const els = {
    form: $("#searchForm"),
    input: $("#searchInput"),
    grid: $("#articleGrid"),
    loading: $("#loadingState"),
    error: $("#errorState"),
    empty: $("#emptyState"),
    status: $("#resultsStatus"),
    heading: $("#resultsHeading"),
    count: $("#resultCount"),
    page: $("#pageNumber"),
    prev: $("#prevPage"),
    next: $("#nextPage"),
    language: $("#languageFilter"),
    from: $("#fromDate"),
    sort: $("#sortFilter"),
    template: $("#articleTemplate"),
    savedGrid: $("#savedGrid"),
    savedCount: $("#savedCount")
};

// FORMAT DATE
function readableDate(dateString) {
    if (!dateString) return "DATE UNAVAILABLE";

    const date = new Date(dateString);

    if (Number.isNaN(date.getTime())) {
        return "DATE UNAVAILABLE";
    }

    return new Intl.DateTimeFormat(undefined, {
        day: "numeric",
        month: "short",
        year: "numeric"
    }).format(date);
}

// LOADING STATE
function setLoading(isLoading) {
    els.loading.hidden = !isLoading;

    els.grid.style.opacity = isLoading ? ".35" : "1";

    els.status.textContent = isLoading
        ? "Searching..."
        : `${state.total.toLocaleString()} results found`;
}

// MAIN SEARCH FUNCTION
async function searchNews() {

    const query =
        els.input.value.trim() || state.query || "world";

    state.query = query;

    els.heading.textContent = `Results for "${query}"`;

    els.error.hidden = true;
    els.empty.hidden = true;

    setLoading(true);

    const params = new URLSearchParams({
        q: query,
        page: String(state.page),
        pageSize: String(state.pageSize),
        language: els.language.value,
        sortBy: els.sort.value
    });

    if (els.from.value) {
        params.set(
            "from",
            new Date(
                `${els.from.value}T00:00:00`
            ).toISOString()
        );
    }

    try {

        const response = await fetch(
            `/api/news?${params}`
        );

        const data = await response.json();

        if (!response.ok) {
            throw new Error(
                data.message || "News search failed."
            );
        }

        state.articles = data.articles || [];
        state.total = data.totalResults || 0;

        renderArticles();

        els.empty.hidden =
            state.articles.length > 0;

        els.count.textContent =
            `${state.total.toLocaleString()} matching articles`;

        els.page.textContent =
            `Page ${state.page}`;

        els.prev.disabled =
            state.page <= 1;

        els.next.disabled =
            state.page * state.pageSize >= state.total ||
            state.articles.length === 0;

    } catch (error) {

        els.grid.innerHTML = "";

        els.error.textContent =
            error.message.includes("Failed to fetch")
                ? "Cannot connect to PressSphere. Check that your server is running."
                : error.message;

        els.error.hidden = false;

        els.count.textContent = "Search unavailable";

        els.prev.disabled = true;
        els.next.disabled = true;

    } finally {

        setLoading(false);

    }
}

// CHECK SAVED ARTICLES
function isSaved(article) {

    return state.saved.some(
        item => item.url === article.url
    );

}

// CREATE ARTICLE CARD
function articleCard(article) {

    const fragment =
        els.template.content.cloneNode(true);

    const image =
        fragment.querySelector(".article-image");

    const imageWrap =
        fragment.querySelector(".article-image-wrap");

    const bookmark =
        fragment.querySelector(".bookmark-button");

    fragment.querySelector(".source-name").textContent =
        article.source || "Unknown publisher";

    fragment.querySelector(".article-date").textContent =
        readableDate(article.publishedAt);

    fragment.querySelector(".article-title").textContent =
        article.title;

    fragment.querySelector(".article-description").textContent =
        article.description ||
        "Open the original report to read the full story.";

    const link =
        fragment.querySelector(".read-link");

    link.href = article.url;

    link.setAttribute(
        "aria-label",
        `Read ${article.title} at ${article.source}`
    );

    // ARTICLE IMAGE
    if (article.image) {

        image.src = article.image;
        image.alt = article.title;

        image.addEventListener(
            "load",
            () => imageWrap.classList.add("has-image"),
            { once: true }
        );

        image.addEventListener(
            "error",
            () => image.remove(),
            { once: true }
        );

    }

    // BOOKMARK STATUS
    const saved = isSaved(article);

    bookmark.classList.toggle("saved", saved);

    bookmark.textContent = saved ? "♥" : "♡";

    bookmark.addEventListener("click", () => {
        toggleSaved(article);
    });

    return fragment;

}

// DISPLAY ARTICLES
function renderArticles() {

    els.grid.innerHTML = "";

    state.articles.forEach(article => {

        els.grid.appendChild(
            articleCard(article)
        );

    });

    renderSaved();

}

// SAVE OR REMOVE ARTICLE
function toggleSaved(article) {

    if (isSaved(article)) {

        state.saved = state.saved.filter(
            item => item.url !== article.url
        );

    } else {

        state.saved.unshift(article);

    }

    localStorage.setItem(
        "presssphere:saved",
        JSON.stringify(state.saved)
    );

    renderArticles();

    renderSaved();

}

// DISPLAY SAVED ARTICLES
function renderSaved() {

    els.savedCount.textContent =
        state.saved.length;

    els.savedGrid.innerHTML = "";

    if (!state.saved.length) {

        els.savedGrid.innerHTML = `
            <p class="saved-empty">
                Your bookmarked stories will appear here.
                Save an article using the heart icon.
            </p>
        `;

        return;

    }

    state.saved.forEach(article => {

        els.savedGrid.appendChild(
            articleCard(article)
        );

    });

}

// SEARCH SHORTCUT
function runSearch(query) {

    if (typeof query === "string") {
        els.input.value = query;
    }

    state.page = 1;

    searchNews();

    $("#discover").scrollIntoView({
        behavior: "smooth",
        block: "start"
    });

}

// SEARCH FORM
els.form.addEventListener("submit", event => {

    event.preventDefault();

    runSearch(els.input.value.trim());

});

// QUICK SEARCH BUTTONS
document.querySelectorAll("[data-query]").forEach(button => {

    button.addEventListener("click", () => {

        runSearch(button.dataset.query);

    });

});

// FILTER CHANGES
[
    els.language,
    els.from,
    els.sort
].forEach(control => {

    control.addEventListener("change", () => {

        state.page = 1;

        searchNews();

    });

});

// RESET FILTERS
$("#clearFilters").addEventListener("click", () => {

    els.language.value = "en";

    els.from.value = "";

    els.sort.value = "publishedAt";

    state.page = 1;

    searchNews();

});

// PREVIOUS PAGE
els.prev.addEventListener("click", () => {

    if (state.page > 1) {

        state.page--;

        searchNews();

    }

});

// NEXT PAGE
els.next.addEventListener("click", () => {

    state.page++;

    searchNews();

});

// CLEAR SAVED ARTICLES
$("#clearSaved").addEventListener("click", () => {

    if (!state.saved.length) return;

    if (!confirm("Remove all saved articles?")) return;

    state.saved = [];

    localStorage.removeItem("presssphere:saved");

    renderSaved();

    renderArticles();

});

// DARK AND LIGHT MODE
$("#themeToggle").addEventListener("click", () => {

    const dark =
        document.documentElement.dataset.theme !== "dark";

    document.documentElement.dataset.theme =
        dark ? "dark" : "light";

    localStorage.setItem(
        "presssphere:theme",
        dark ? "dark" : "light"
    );

    $("#themeToggle").textContent =
        dark ? "☀" : "☾";

});

// RESTORE THEME
const savedTheme =
    localStorage.getItem("presssphere:theme");

if (savedTheme === "dark") {

    document.documentElement.dataset.theme = "dark";

    $("#themeToggle").textContent = "☀";

}

// ABOUT DIALOG
$("#aboutButton").addEventListener("click", () => {

    $("#aboutDialog").showModal();

});

$("#closeDialog").addEventListener("click", () => {

    $("#aboutDialog").close();

});

// FOOTER YEAR
$("#year").textContent =
    new Date().getFullYear();

// INITIALIZE APPLICATION
renderSaved();

searchNews();
