---
permalink: /index.html
---

# SomethingToCook
A minimalistic application for helping cooks decide what to make for dinner.

## Contributing
Simply add `categories`, `origins`, `tags` and `meals` to the /src/data.json file following the below format and requirements. The site will load all of its variables for the UI based on the `data.json` values.

### Categories
The `categories` object contains an array of strings that correspond with searchable categories of meals. These should be the primary proteins or focus of the meal and be limited to very broad terms. Ideally this list remains short and easy to look through in a few seconds so as not to overwhelm the user with too many options.

To add a category, simply add a string to the `categories` object found in the `data.json` file. Here are example strings for Chicken and Beef:

```
    "categories": [
        "Chicken",
        "Beef"
    ],
```

Note that each string in the list should be followed by a comma `,` except for the last one.

### Origins
The `origins` object contains an array of strings that correspond to various localities around the world that serve as the origins of certain meals. These should be any relevant locations that make sense in the world of food without going into too much detail. For example: we would definitely have "French" as an origin but not "Paris" as that is too detailed and would result in a massive list that isn't user friendly.

To add an origin, simply add a string to the `origins` object found in the `data.json` file in alphabetical order with the other entries. Here are example strings for French and German:

```
    "origins": [
        "French", 
        "German"
    ],
```

Note that each string in the list should be followed by a comma `,` except for the last one.

### Tags
The `tags` object contains an array of strings that correspond to terms that help define a meal or its accompaniments such as "Tortillas" with a mexican dish or "Ground Meat" and "Tomato Sauce" for Meatballs. This list should define anything that comes to mind when thinking of a particular meal and that helps a user find that dish.

To add a tag, simply add a string to the `tags` object found in the `data.json` file in alphabetical order with the other entries. Here are example strings for Ground Meat, Tomato Sauce and Tortillas:

```
    "tags": [
        "Ground Meat", 
        "Tomato Sauce",
        "Tortillas"
    ],
```

Note that each string in the list should be followed by a comma `,` except for the last one.

### Meals
The `meals` array contains a list of objects that represent a dish. Each dish should have a title and corresponding Wikipedia article (even if it is a generic version of the dish) to provide the user with a description of the meal. Meals should be relatively open-ended and not specific to a single recipe; the goal is to give users an *idea* of what to cook and let them find their own recipes. Try to limit the `categories` to the primary focus and options for a traditional version of the dish (this is almost always provided in the Wikipedia article summary). The `origins` should also be limited to where the dish truly came from (e.g. "Pizza" originated in Italy despite being popular and widely served in New York). The `tags` can be any number of terms that make you think of this dish or its common accompaniments with the goal of helping users find this particular meal.


To add a meal, insert a set of squiggly brackets `{}` to the `meals` object found in the `data.json` file in alphabetical order with the other entries. Be sure that there is a comma `,` separating each set of brackets. Here is an example object for Meatballs:

```
{
    "name": "Meatballs", 
    "wikipedia": "https://en.wikipedia.org/wiki/Meatballs",
    "categories": ["Pork", "Beef"], 
    "origins": ["Italian"], 
    "tags": ["Pasta", "Ground Meat", "Tomato Sauce"] 
},
```

Note that a `meal` object can have any type of category, origin or tag but those same categories, origins or tags need to also be listed in the corresponding `data.json` objects for them to actually be searchable. Simply adding them to the `meal` object will not add them to the search filters. See above for details.