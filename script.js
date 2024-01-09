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


window.onload = function () {
    const page = document.querySelector('body');
    const search = document.getElementById('search');

    search.addEventListener('input', (event) => {
        const searchText = event.target.value;
        const regex = new RegExp(searchText, 'gi');
        let text = page.innerHTML;
        text = text.replace(/(<mark class="highlight">|<\/mark>)/gim, '');

        const newText = text.replace(regex, '<mark class="highlight">$&</mark>');
        page.innerHTML = newText;
    });
}