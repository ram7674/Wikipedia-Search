let searchInputEl = document.getElementById("searchInput");
let searchResultsEl = document.getElementById("searchResults");
let SpinnerEl = document.getElementById("spinner");

function createAndAppendSearchResult(result){

    let {description, link, title} = result;

    //create <div> containet-----result-Item
    let resultItemEl = document.createElement("div");
    resultItemEl.classList.add("result-item");
    searchResultsEl.appendChild(resultItemEl);

    //create anchor <a> element --------- result-title
    let resultTitleEl = document.createElement("a");
    resultTitleEl.classList.add("result-title");
    resultTitleEl.textContent = title;
    resultTitleEl.href = link;
    resultTitleEl.target = "_blank";
    resultItemEl.appendChild(resultTitleEl);

    //create break element ---- <br />
    let titlebreakEl = document.createElement("br");
    resultItemEl.appendChild(titlebreakEl);

    //create anchor element --------- result-url
    let urlEl = document.createElement("a");
    urlEl.classList.add("result-url");
    urlEl.href = link;
    urlEl.target = "_blank";
    urlEl.textContent = link;
    resultItemEl.appendChild(urlEl);

    //create break element ---- <br />
    let lineBreakEl = document.createElement("br");
    resultItemEl.appendChild(lineBreakEl);

    //create paragraph <p> element ------- description
    let DescriptionEl = document.createElement("p");
    DescriptionEl.classList.add("link-description");
    DescriptionEl.textContent = description;
    resultItemEl.appendChild(DescriptionEl);
}

function displayResults(searchResults){

    SpinnerEl.classList.toggle("d-none");

    for (let result of searchResults){
        createAndAppendSearchResult(result);

    }
}

function searchWikipedia(event){

    if(event.key === "Enter"){

        searchResultsEl.textContent = "";   // this is the prvies data has cleared.

        SpinnerEl.classList.toggle("d-none");

        let searchInputValue = searchInputEl.value;

        let options = {       //this is the request configuration
            method: "GET"
        }
        let url = "https://apis.ccbp.in/wiki-search?search=" + searchInputValue;

        fetch(url, options)
        .then(function(Response){
            return Response.json();
        })
        .then(function(jsonData){
            let {search_results} = jsonData;                  //object destucturing
            displayResults(search_results);
        })
    }
}

searchInputEl.addEventListener("keydown", searchWikipedia);
