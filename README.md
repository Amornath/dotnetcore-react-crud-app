# dotnetcore-react-crud-app

This repository contains the code for the API and client site of the dotnetcore-react-crud-app project.

## Folder Structure

- `ContactAPI/`: This folder contains the code for the .NET Core API of the project. It includes all backend logic, controllers, models, services, and any other necessary files for the API.
- `ClientApp/`: This folder contains the code for the client site of the project. It includes all frontend components, stylesheets, assets, and any other necessary files for the client site.

## Getting Started

To run the API and client site locally, follow these steps:

1. **API Setup:**

   - Navigate to the `ContactAPI/` directory.
   - Ensure you have .NET Core SDK installed on your machine.
   - Update the `appsettings.json` file in the `ContactAPI/` directory with your SQL Server connection string.
   - Run the database migrations using `dotnet ef database update`.
   - Install dependencies using `dotnet restore`.
   - Start the API server using `dotnet run`.

2. **Client Site Setup:**

   - Navigate to the `ClientApp/` directory.
   - Install Node.js and npm on your machine.
   - Install dependencies using `npm install` or `yarn install`.
   - Start the client site using `npm run dev` or `yarn run dev`.

3. **Accessing the Application:**
   - Once both the API and client site are running, you can access the application by opening it in your web browser. The API endpoints will be accessible at `https://localhost:7107/swagger/index.html`, and the client site will be accessible at `http://127.0.0.1:5173/`.

## Database Configuration

Ensure that you have a SQL Server instance running and update the `appsettings.json` file in the `api/` directory with the correct connection string.

```json
"ConnectionStrings": {
  "DefaultConnection": "Server=your_server;Database=your_database;"
}
```
