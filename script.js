//READING TIME
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


//HIGHLIGHT INPUT TEXT

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

/*document.addEventListener("DOMContentLoaded", function () {
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
});*/

/*document.addEventListener("DOMContentLoaded", function () {
    document.getElementById('search').addEventListener('input', function () {
        var searchTerm = this.value.toLowerCase();
        var articleContent = document.getElementById('article').innerHTML;

        // Check if the search term is not empty
        if (searchTerm !== "") {
            // Use the RegExp constructor to create a dynamic regex pattern
            var regex = new RegExp('(' + searchTerm + ')', 'ig');

            // Use the replace method with a callback function to highlight search results
            var highlightedContent = articleContent.replace(regex, function (match) {
                return '<span class="highlight">' + match + '</span>';
            });

            // Update the article content with the highlighted version
            document.getElementById('article').innerHTML = highlightedContent;
        } else {
            // If the search term is empty, revert to the original content
            document.getElementById('article').innerHTML = articleContent;
        }
    })
});*/

/*function highlight(text) {
    var inputText = document.getElementById("inputText");
    var innerHTML = inputText.innerHTML;
    var index = innerHTML.indexOf(text);
    if (index >= 0) {
        innerHTML = innerHTML.substring(0, index) + "<span class='highlight'>" + innerHTML.substring(index, index + text.length) + "</span>" + innerHTML.substring(index + text.length);
        inputText.innerHTML = innerHTML;
    }
}*/


window.onload = function () {
    // Create an instance of mark.js and pass an argument containing
    // the DOM object of the context (where to search for matches)
    var markInstance = new Mark(document.querySelector("main"));
    // Cache DOM elements
    var keywordInput = document.querySelector("input[name='search']");
    var optionInputs = document.querySelectorAll("input[name='opt[]']");

    function performMark() {

        // Read the keyword
        var keyword = keywordInput.value;

        // Determine selected options
        var options = {};
        /*[].forEach.call(optionInputs, function(opt) {
          options[opt.value] = opt.checked;
        });*/

        // Remove previous marked elements and mark
        // the new keyword inside the context
        markInstance.unmark({
            done: function () {
                markInstance.mark(keyword, options);
            }
        });
    };

    // Listen to input and option changes
    keywordInput.addEventListener("input", performMark);
    for (var i = 0; i < optionInputs.length; i++) {
        optionInputs[i].addEventListener("change", performMark);
    }
}



//API CALL
// Function to fetch data from the API
async function fetchUsers() {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        const users = await response.json();
        return users;
    } catch (error) {
        console.error('Error fetching user data:', error);
    }
}

// Function to insert random user info after the article
async function insertRandomUserInfo() {
    const users = await fetchUsers();

    if (users) {
        // Choose a random user from the list
        const randomUser = users[Math.floor(Math.random() * users.length)];

        // Create a new div element for the user info
        const userInfoDiv = document.createElement('div');
        userInfoDiv.className = 'author-info';

        // Display user information
        userInfoDiv.innerHTML = `
        <p>Szerző:</p>
        <p>Név: ${randomUser.name}</p>
        <p>E-mail: <a href="mailto:${randomUser.email}">${randomUser.email}</a></p>
        <p>Telefon: ${randomUser.phone}</p>
        <p>Cég: ${randomUser.company.name}</p>
      `;

        // Append the user info after the article
        const article = document.getElementById('article');
        article.appendChild(userInfoDiv);
    }
}

/* Call the function when the page is loaded
window.onload = insertRandomUserInfo;*/

if (document.readyState !== "loading") {
    insertRandomUserInfo();
} else {
    document.addEventListener("DOMContentLoaded", insertRandomUserInfo);
}