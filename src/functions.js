"USE STRICT";

function addPlaceholderListElements (htmlObject, startingNumberOfElements, mustBeDivisibleBy) {
    
    if ( startingNumberOfElements % mustBeDivisibleBy !== 0 ) {

        for ( let numberOfElements = startingNumberOfElements; numberOfElements % mustBeDivisibleBy !== 0; numberOfElements++ ) {
        
            htmlObject += `<li class="placeholder"></li>`; 
    
        }

    }

    return htmlObject;

}



// check if two arrays have at least one matching value between them
function arrayContains(arr1, arr2) {

    return arr2.some(function(v) {

        return arr1.indexOf(v) >= 0;

    });

}

// check if all array values are in another array
function arrayContainsArray(superset, subset) {

    if (0 === subset.length) {

        return false;

    }

    return subset.every(function (value) {

        return (superset.indexOf(value) >= 0);

    });
}

// get method for filtering tags
function getFilterTagMethod() {

    let radios = document.getElementsByName("tags-method");
    let value = false;
    
    
    for ( let n = 0; n < radios.length; n++ ) {
    
        if ( radios[n].checked ) {
    
            value = radios[n].value;
    
        }
    
    }

    return value;

}

// http get function
function get(src) {

    return new Promise(function(resolve, reject) {

        let xhttp = new XMLHttpRequest();

        xhttp.onreadystatechange = function() {

            if (this.readyState == 4) {

                if (this.status == 200) {

                resolve(this.responseText);

                } else {

                reject(Error(this.status));

                }

            }

        }

        xhttp.onerror = function() {

            reject(Error("Network Error"));

        }

        xhttp.open('GET', src, true);
        xhttp.send();

    });

}

// build DOM
function buildDOM(data) {
        
    let categoriesContainer   = document.getElementById("filter-categories"),
        originsContainer = document.getElementById("filter-origins"),
        tagsContainer    = document.getElementById("filter-tags");

    let categoriesHTML = originsHTML = tagsHTML = "";

    // build categories
    for ( let i = 0; i < data.categories.length; i++ ) {

        categoriesHTML += `<li class="active" data-type="categories" tabIndex="0">${data.categories[i]}</li>`;
        
    }
    categoriesContainer.children[2].innerHTML = addPlaceholderListElements(categoriesHTML, data.categories.length, 5);

    // build origins
    for ( let i = 0; i < data.origins.length; i++ ) {

        originsHTML += `<li class="active" data-type="origins" tabIndex="0">${data.origins[i]}</li>`;

    }
    originsContainer.children[2].innerHTML = addPlaceholderListElements(originsHTML, data.origins.length, 5);

    // build tags
    for ( let i = 0; i < data.tags.length; i++ ) {

        tagsHTML += `<li data-type="tags" tabIndex="0">${data.tags[i]}</li>`;

    }
    tagsContainer.children[2].innerHTML = addPlaceholderListElements(tagsHTML, data.tags.length, 5);

}

// add "active" class toggle to li click events
function applyListeners() {
    let filters = document.getElementsByClassName("filter");
    for ( let i = 0; i < filters.length; i++ ) {
        
        let fc = filters[i].children[2].children;

        for ( let n = 0; n < fc.length; n++ ) {

            fc[n].addEventListener("click", function(){

                toggleFilter(this);
                this.blur();

            })

            fc[n].addEventListener("keydown", function(event){

                if ( event.keyCode == 13 || event.keyCode == 32 ) {
                
                    toggleFilter(this);
                    this.blur();

                }

            })

        }
    }

    
    // add keyboard support for tag method radio buttons
    document.getElementById("tags-method-1-label").addEventListener("keydown", function(event){
        
        if ( event.keyCode == 13 || event.keyCode == 32 ) {
            
            this.blur();
            this.click();
            console.log("Test 1");

        }

    })
    document.getElementById("tags-method-2-label").addEventListener("keydown", function(event){
        
        if ( event.keyCode == 13 || event.keyCode == 32 ) {
            
            this.blur();
            this.click();
            console.log("Test 2");

        }

    })
}

// toggle filter
function toggleFilter(el) {

    let existingIndex = null;
    let filterType = el.dataset.type;
    let filterName = el.innerText;
    let existingFilter = null;

    switch ( filterType ) {

        case "categories":
            existingFilter = categoriesFilter;
            break;

        case "origins":
            existingFilter = originsFilter;
            break;

        case "tags":
            existingFilter = tagsFilter;
            break;

        default:
            console.log("Invalid filter type.");
            return false;
    }

    
    existingIndex = existingFilter.indexOf(filterName);
    if ( existingIndex !== -1 ) {

        if ( filterType === "categories" && existingFilter.length <= 1 ) {

            c_alert("Error", "You must have at least one category selected.");

        } else {
        
            existingFilter.splice(existingIndex, 1);
            el.classList.toggle("active");

        }

    } else {

        existingFilter.push(filterName);
        el.classList.toggle("active");

    }

}

// custom alert function
function c_alert(title, msg) {

    // check for existing alert element and remove it
    let oldEl = document.getElementById("c_alert");
    if (oldEl !== null) {
        oldEl.remove();
    }

    // create new alert element using provided title and msg variables
    let el = document.createElement('div');
    el.id = "c_alert";
    el.innerHTML =
        `<h1>${title}</h1>` +
        `<p>${msg}</p>` +
        `<input type="button" id="c_alert_close" onclick="slideUp(this.parentElement, 250)" value="CLOSE">`;

    // append alert to document body
    document.body.appendChild(el);

    // animate slide down
    slideDown(el, 250);

}

// get meal
function getMeal() {

    let result = document.getElementById("result");
    let resultName = document.getElementById("result-name");
    let resultDescription = document.getElementById("result-description");
    let resultSource = document.getElementById("result-source");
    let resultSearch = document.getElementById("result-search");
    let resultSearchVariationsContainer = document.getElementById("result-search-variations-container");
    let resultSearchVariations = document.getElementById("result-search-variations");

    resultName.innerHTML = "";
    resultDescription.innerHTML = "";
    resultSearch.innerHTML = "";
    resultSource.innerHTML = "";
    resultSearchVariations.innerHTML = "";
    resultSearchVariationsContainer.style.display = "none";
    

    let possibleMeals = [];
    let theFinalMeal = {};
    let filterTagMethod = getFilterTagMethod();

    result.style.display = "none";

    // validate at least one category is selected
    if ( categoriesFilter.length === 0 ) {

        c_alert("Error", "There must be at least one category selected.")

    } else {

        for ( let i = 0; i < meals.length; i++ ) {

            // check categories
            if ( arrayContains(meals[i].categories, categoriesFilter) ) {

                // check origins
                if ( originsFilter.length <= 0 || (originsFilter.length > 0 && arrayContains(meals[i].origins, originsFilter)) ) {

                    // check tags
                    if ( tagsFilter.length > 0 ) {

                        // filtering all tags
                        if ( filterTagMethod === "all" ) {

                            if ( arrayContainsArray(meals[i].tags, tagsFilter) ) {

                                possibleMeals.push(meals[i]);

                            }

                        }

                        // filtering any tags
                        if ( filterTagMethod === "any" ) {

                            if ( arrayContains(meals[i].tags, tagsFilter) ) {

                                possibleMeals.push(meals[i]);

                            }

                        }


                    } else {

                        possibleMeals.push(meals[i]);

                    }

                }

            }

        }
        
    }

    // check if there is at least one possible meal based on chosen filters
    if ( possibleMeals.length === 0 ) {

        resultName.innerText = "Just Order Takeout";
        resultDescription.innerHTML = "<p>No meals were found using those particular filters :(</p><p>Try opening up your search a bit or <a href='https://github.com/shnibble/SomethingToCook#contributing' target='_BLANK'>contribute</a> more recipes to the repository.</p>";
        resultSource.innerHTML = "<p>None</p>";

    } else {

        // pick a random final meal from the possible options
        let i = Math.floor((Math.random() * possibleMeals.length), + 0);
        theFinalMeal = possibleMeals[i];

        // populate final meal name
        resultName.innerText = theFinalMeal.name;

        // check if source is from Wikipedia
        if ( theFinalMeal.source === "wikipedia" ) {

            // retrieve description from Wikipedia
            let fetchTitle = theFinalMeal.description.split("/");
            fetchTitle = fetchTitle[fetchTitle.length-1];
            let fetchUrl =  "https://en.wikipedia.org/w/api.php?format=json&action=query&origin=*&prop=extracts&exintro&explaintext&redirects=1&titles=" + fetchTitle;
            fetch(
                fetchUrl,
            {
                method: "GET"
            }
            )
            .then(response => response.json())
            .then(json => {

                let key = Object.keys(json.query.pages)[0];
                let extract = json.query.pages[key].extract;
                resultDescription.innerHTML = `<p>${extract}</p>`;

            })
            .catch(error => {

                c_alert(error.message);

            });
            
            // populate final meal source
            let srcUrl = theFinalMeal.description;
            let srcLink = document.createElement("a");
            srcLink.href = srcUrl;
            srcLink.target = "_BLANK";
            srcLink.innerText = "Wikipedia";
            resultSource.appendChild(srcLink);


        // all other non-Wikipedia sources
        } else {

            resultDescription.innerHTML = theFinalMeal.description;
            resultSource.innerHTML = `<p>${theFinalMeal.source}</p>`;

        }
        
        // populate final meal search query
        let l = document.createElement("a");
        let url = `http://www.google.com/search?q=${theFinalMeal.name.replace(" ", "+")}+recipe`;
        l.href = url;
        l.className = "search-recipe"
        l.target = "_BLANK";
        l.innerText = `Find "${theFinalMeal.name}" Recipes`;
        resultSearch.appendChild(l);

        // populate final meal search query variations
        if ( theFinalMeal.variations.length > 0 ) {

            for (let n = 0; n < theFinalMeal.variations.length; n++ ) {

                let c = document.createElement("a");
                let url = "http://www.google.com/search?q=" + theFinalMeal.variations[n].replace(" ", "+") + "+" + theFinalMeal.name.replace(" ", "+") + "+recipe";
                c.href = url;
                c.className = "search-recipe-variation"
                c.target = "_BLANK";
                c.innerText = theFinalMeal.variations[n];
                resultSearchVariations.appendChild(c);

            }

            resultSearchVariationsContainer.style.display = "block";

        }

    }

    slideDown(result, 500);

}