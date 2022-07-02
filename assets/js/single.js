var issueContainerEl = document.querySelector("#issues-container");
var getRepoIssues = function(repo) {

    var apiUrl = "https://api.github.com/repos/" + repo + "/issues?direction=asc";

    fetch(apiUrl).then(function(response) {
        if (response.ok) {
            response.json().then(function(data) {
                // pass the data to the dom (left-hand-side)
                displayIssues(data);
            })
        } else {
            alert("there was a problem!")
        }
    });
};

var displayIssues = function(issues) {

    if (issues.length === 0) {
        issueContainerEl.textContent = "This repo has no open issues!"
    }

    for (var i=0; i < issues.length; i++) {
    // create a link element to take users to the issue on github
    var issueEl = document.createElement("a");
    issueEl.classList = "list-item flex-row justify-space-between align-center";
    issueEl.setAttribute("href", issues[i].html_url);
    issueEl.setAttribute("target", "_blank");

    var titleEl = document.createElement("span");
    titleEl.textContent = issues[i].title;

    // append to container

    issueEl.appendChild(titleEl);

    //create a type element
    var typeEl = document.createElement("span");

    // check to see if issue is a issue or pr

    if (issues[i].pull_request) {
        typeEl.textContent = "(Pull Request)";
    } else {
        typeEl.textContent = "(Issue)"
    }

    // append to container

    issueEl.appendChild(typeEl);
    issueContainerEl.appendChild(issueEl);
};
}
getRepoIssues("eclevela-1234/git-it-done");