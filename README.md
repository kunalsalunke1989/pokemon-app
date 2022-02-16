# Pokemon App

A React app which uses PokemonAPI to show list of cards that contain details of all Pokemon. 

### Prerequisites

Following should be installed before running the project

```
Node 
```

### Installing

1. Install necessary dependencies

```
npx create-react-app checklist
npm install react-router-dom

```

2. To run the project locally using npm

```
npm start
```
3. Navigate to the following URL to launch app

```
http://localhost:3000
```

# Pokemon App Features
* The "Home" page shows a paginated list of Pokemon in card format.
* The "Prev" and "Next" buttons can be used to navigate through the list.
* Each card contains the Pokemon's image, name, weight, height and abilities.
* Clicking on the Pokemon name in the card will take you to a "Details" page showing a bigger picture that Pokemon, its name and its type. To go back to the "Home" page, click on the "Home"link in the Navbar.
* The number of cards shown on each page can be set using the "Display Pokemon" dropdown.
* The Pokemon can be sorted in Ascending or Descending order using the "Sort" dropdown. To go back to original view, select "None" in the dropdown.
* The "Search" box will search Pokemon based on the name or ability. Note that the Pokemon name or ability has to be an exact match for the search to work. If a Pokemon or a list of Pokemon having same ability is found, you can go back to original view using "Back to Results" button. If input is an invalid value or the Pokemon or ability is not found, then no action will take place.
* The UI uses CSS Grid which makes it responsive on all resolutions.

# Limitations due to time constraints
* No unit tests
* No incremental commits. Commited entire code once after the application was developed.
* Page refresh does not maintain sorting and search related data.
