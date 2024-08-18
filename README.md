# Olympic Games Dashboard

This project is a web application designed to display and explore data from past Olympic Games. It is built using Angular and includes various features to visualize and navigate the Olympic data.

## Prerequisites

- Install dependencies using `npm install`.

## Development Server

Run `ng serve` to start the development server. Navigate to `http://localhost:4200/`.

## Build

Run `ng build` to compile the project. The build files will be stored in the `dist/` directory.

## Project Structure

- **components/**: Reusable components used across the application.
- **pages/**: Components linked to specific routes.
- **core/**: Contains business logic, including `services` and `models`.
  
## Important Files

- `app-routing.module.ts`: Handles the routing configuration.
- `olympic.service.ts`: Manages data fetching and business logic.

## Features

- **Dashboard**: Displays the number of medals by country.
- **Country Detail**: Detailed view of each country’s participation in the Olympic Games.

## Enhancements

- **Responsive Design**: Ensure the application is fully responsive.
- **Routing Guard**: Forward invalid country IDs / invalid URL in general to a 404 page.

Enjoy my project!
