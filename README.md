# html-css-js-project-boilerplate

# Meal Planner Website

This project is a meal planner website that generates personalized meal plans based on user input and provides recipe details for each meal. It consists of three main files: `index.html`, `style.css`, and `App.js`.

## Files

### 1. index.html

The `index.html` file is the main HTML file that defines the structure and content of the meal planner website. It contains the HTML elements, including form inputs, meal cards, and sections for displaying recipe details. The file also includes the necessary CSS and JavaScript file references.

### 2. style.css

The `style.css` file contains the CSS code that defines the visual styling of the meal planner website. It includes styles for the navbar, sections, form inputs, meal cards, and other elements. The CSS code is responsible for the layout, colors, fonts, and animations of the website.

### 3. App.js

The `App.js` file contains the JavaScript code that handles the functionality of the meal planner website. It interacts with the HTML elements, makes API requests to generate meal plans, and updates the UI with the generated meals and recipe details. The JavaScript code includes event listeners, functions for data processing, and API requests to retrieve meal and recipe information.

## Functionality

The meal planner website offers the following functionality:

1. User Input: Users can enter their height, weight, age, gender, and activity level in the provided form.

2. Meal Plan Generation: When the form is submitted, the JavaScript code in `App.js` makes an API request to generate a personalized meal plan based on the user's input. The target calorie count is calculated, and the API returns breakfast, lunch, and dinner meals for the day.

3. Meal Card Display: The generated meals are displayed in separate meal cards on the website. Each meal card shows the meal title and calorie count.

4. Recipe Details: Each meal card includes a "Get Recipe" button. When the button is clicked, the JavaScript code makes another API request to retrieve the recipe details for the corresponding meal. The recipe details, including ingredients, steps, and utensils, are displayed in a designated section of the website.

## Screenshots

Here are some screenshots of the meal planner website:

![Meal Planner Website - Home Page](./assets/Screenshot%20from%202023-06-04%2022-40-10.png)
_Description: The home page of the meal planner website with the user input form._

![Meal Planner Website - Generated Meal Plan](./assets/Screenshot%20from%202023-06-04%2022-43-29.png)
_Description: The generated meal plan displayed in separate meal cards._

![Meal Planner Website - Recipe Details](./assets/Screenshot%20from%202023-06-04%2022-44-01.png)
_Description: The recipe details displayed when the "Get Recipe" button is clicked._

## Technologies Used

- HTML
- CSS
- JavaScript
- Spoonacular API

## Getting Started

To run the meal planner website locally, follow these steps:

1. Clone the repository or download the files.
2. Open the `index.html` file in a web browser.

Note: You need a valid Spoonacular API key to make the API requests for generating meal plans and retrieving recipe details. Replace the placeholder API key in the `App.js` file with your own API key.

Feel free to modify and enhance the code according to your project requirements.

## Acknowledgements

This project utilizes the [Spoonacular API](https://spoonacular.com/food-api) for generating meal plans and retrieving recipe details.
