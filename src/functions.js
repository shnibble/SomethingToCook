"USE STRICT";

function addPlaceholderListElements (htmlObject, startingNumberOfElements, mustBeDivisibleBy) {
    
    if ( startingNumberOfElements % mustBeDivisibleBy !== 0 ) {

        for ( let numberOfElements = startingNumberOfElements; numberOfElements % mustBeDivisibleBy !== 0; numberOfElements++ ) {
        
            htmlObject += `<li class="placeholder"></li>`; 
    
        }

    }

    return htmlObject;

}
