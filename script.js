/*function readingTime() {
    const text = document.getElementById("article").innerText;
    const wpm = 225;
    const words = text.trim().split(/\s+/).length;
    const time = Math.ceil(words / wpm);
    document.getElementById("time").innerText = time;
}

window.onload = (function () { readingTime() });*/

function readingTime() {
    const text = document.getElementById("article").innerText;
    const wpm = 225;
    const words = text.trim().split(/\s+/).length;
    const time = Math.ceil(words / wpm);
    document.getElementById("time").innerText = time;
}

if (document.readyState !== "loading") {
    readingTime();
} else {
    document.addEventListener("DOMContentLoaded", readingTime);
}


/*window.onload = function () {
    const page = document.querySelector('main');
    const search = document.getElementById('search');

    search.addEventListener('input', (event) => {
        const searchText = event.target.value;
        const regex = new RegExp(searchText, 'gi');
        let text = page.innerHTML;
        text = text.replace(/(<mark class="highlight">|<\/mark>)/gim, '');

        const newText = text.replace(regex, '<mark class="highlight">$&</mark>');
        page.innerHTML = newText;
    });
}*/

document.addEventListener("DOMContentLoaded", function () {
    document.getElementById('search').addEventListener('input', function () {
        const searchValue = this.value.trim();
        const content = document.querySelector('main');

        // Remove previous highlights
        const spans = content.querySelectorAll('.highlight');
        spans.forEach(span => {
            span.replaceWith(...span.childNodes);
        });

        if (searchValue !== '') {
            const regex = new RegExp(searchValue, 'gi');
            const matches = content.textContent.match(regex);

            if (matches) {
                matches.forEach(match => {
                    const span = document.createElement('span');
                    span.className = 'highlight';
                    span.appendChild(document.createTextNode(match));
                    content.innerHTML = content.innerHTML.replace(match, span.outerHTML);
                });
            }
        }
    })
});