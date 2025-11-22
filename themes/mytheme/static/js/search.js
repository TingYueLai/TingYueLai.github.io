document.addEventListener('DOMContentLoaded', function () {
    const searchInput = document.getElementById('search-input');
    const searchResults = document.getElementById('search-results');

    if (!searchInput || !searchResults) {
        return;
    }

    let articles = [];

    // Fetch the JSON feed
    fetch('/feeds/all.json')
        .then(response => response.json())
        .then(data => {
            articles = data.items; // Pelican's JSON feed puts items in 'items' array
        })
        .catch(error => console.error('Error fetching search feed:', error));

    searchInput.addEventListener('input', function () {
        const query = this.value.toLowerCase();
        searchResults.innerHTML = '';

        if (query.length < 2) {
            searchResults.style.display = 'none';
            return;
        }

        const filtered = articles.filter(article => {
            return article.title.toLowerCase().includes(query) ||
                (article.summary && article.summary.toLowerCase().includes(query));
        });

        if (filtered.length > 0) {
            searchResults.style.display = 'block';
            filtered.forEach(article => {
                const item = document.createElement('div');
                item.className = 'search-result-item';
                item.innerHTML = `<a href="${article.url}">${article.title}</a>`;
                searchResults.appendChild(item);
            });
        } else {
            searchResults.style.display = 'none';
        }
    });

    // Hide results when clicking outside
    document.addEventListener('click', function (e) {
        if (!searchInput.contains(e.target) && !searchResults.contains(e.target)) {
            searchResults.style.display = 'none';
        }
    });
});
