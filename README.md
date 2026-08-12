# 🏨 Hotel Management System

A full-stack Hotel Management System built using **C#, ASP.NET Core Web API, Entity Framework Core, SQL Server, HTML, CSS, and JavaScript**.

The application provides user registration and login, room management, room booking, payments, contact messages, and a protected admin area for managing hotel rooms.

---

## 🚀 Features

### 👤 User Features

- User Registration
- User Login
- User Logout
- View Available Rooms
- View Room Details
- Book Rooms
- View Booking Information
- Make Payments
- Submit Contact Messages
- Login-based navigation

### 🔐 Admin Features

- Separate Admin Login
- Static Admin Credentials
- JWT-based Admin Authentication
- Protected Room Management
- Add Rooms
- View Rooms
- Update Rooms
- Delete Rooms
- Admin Logout
- Unauthorized users cannot access the Room Management page directly

### 🏨 Room Management

Admin can add:

- Room Number
- Room Type
- Capacity
- Price
- Image URL
- Availability Status

### 📅 Booking Management

Bookings contain:

- User ID
- Room ID
- Check-in Date
- Check-out Date
- Total Amount
- Booking Status

### 💳 Payment Management

Payments contain:

- Booking ID
- Payment Date
- Amount
- Payment Method
- Payment Status

### 📩 Contact Management

Users can submit:

- Name
- Email
- Message
- Created Date

---

# 🛠️ Technologies Used

## Frontend

- HTML5
- CSS3
- JavaScript
- Fetch API
- LocalStorage
- SessionStorage

## Backend

- C#
- ASP.NET Core Web API
- .NET 8
- Entity Framework Core
- REST API
- JWT Authentication
- Swagger / OpenAPI

## Database

- Microsoft SQL Server
- SQL Server LocalDB
- Entity Framework Core

## Tools

- Visual Studio
- SQL Server Object Explorer
- Postman
- Git
- GitHub

---

# 📂 Project Structure

```text
hotel-management-system/
│
├── Controllers/
│   ├── AdminController.cs
│   ├── AuthController.cs
│   ├── BookingsController.cs
│   ├── ContactMessagesController.cs
│   ├── PaymentsController.cs
│   ├── RoomsController.cs
│   └── UsersController.cs
│
├── Data/
│   └── HotelDbContext.cs
│
├── Models/
│   ├── Booking.cs
│   ├── ContactMessage.cs
│   ├── Payment.cs
│   ├── Room.cs
│   └── User.cs
│
├── Migrations/
│
├── Frontend/
│   ├── index.html
│   ├── rooms.html
│   ├── booking.html
│   ├── payment.html
│   ├── contact.html
│   ├── login.html
│   ├── register.html
│   ├── adminLogin.html
│   │
│   ├── api.js
│   ├── script.js
│   ├── room.js
│   ├── booking.js
│   ├── payment.js
│   └── style.css
│
├── Program.cs
├── appsettings.json
└── README.md
```

---

# ⚙️ Application Architecture

The project follows a basic full-stack architecture:

```text
Frontend
HTML + CSS + JavaScript
        |
        | HTTP / REST API
        ↓
ASP.NET Core Web API
        |
        ↓
Controllers
        |
        ↓
Entity Framework Core
        |
        ↓
SQL Server LocalDB
```

---

# 🔗 API Endpoints

The frontend communicates with the ASP.NET Core Web API through JavaScript `fetch()` requests.

The main endpoints are:

```text
GET    /api/Rooms
POST   /api/Rooms
PUT    /api/Rooms/{id}
DELETE /api/Rooms/{id}

POST   /api/Auth/login

POST   /api/Admin/login

GET    /api/Bookings
POST   /api/Bookings

GET    /api/Payments
POST   /api/Payments

POST   /api/ContactMessages

POST   /api/Users
```

---

# 🔐 Admin Authentication

The Room Management section is protected using Admin authentication.

When the user clicks **View Rooms**, the application redirects to:

```text
adminLogin.html
```

The administrator must provide the configured Admin credentials.

After successful login:

1. The frontend sends the credentials to the backend.
2. `AdminController` validates the credentials.
3. The backend generates a JWT token.
4. The JWT token is returned to the frontend.
5. The token is stored in `sessionStorage`.
6. The user is redirected to `rooms.html`.
7. The token is sent with protected API requests.

Example:

```http
Authorization: Bearer <JWT_TOKEN>
```

---

# 👑 Admin Login Credentials

Use the following credentials to access the Admin Room Management section.

### Admin Email

```text
admin1hotel@gmail.com
```

### Admin Password

```text
5*6!7@Admin@1&2*3
```

> **Note:** These credentials are included for this portfolio/demo project. Do not use these credentials in a production application.

---

# 🔄 Admin Login Flow

```text
Home Page
    ↓
View Rooms
    ↓
Admin Login
    ↓
Enter Admin Email & Password
    ↓
POST /api/Admin/login
    ↓
AdminController
    ↓
Credentials Validated
    ↓
JWT Token Generated
    ↓
Token Stored in SessionStorage
    ↓
rooms.html
    ↓
Room Management
```

---

# 🛡️ Protected Room Management

The Room Management page checks whether an Admin session exists.

If a user attempts to directly open:

```text
rooms.html
```

without logging in as an Admin, the application displays an access denied message and redirects the user to:

```text
adminLogin.html
```

The Admin token is also sent with room management API requests.

---

# 🗄️ Database Setup

The project uses **SQL Server LocalDB**.

The database itself is **not included in this GitHub repository**.

Anyone cloning this project should create their own local database using the SQL table definitions provided below.

You can create a database with a name such as:

```text
hotelManDB
```

The database contains the following tables:

```text
Users
Rooms
Bookings
Payments
ContactMessages
__EFMigrationsHistory
```

---

# 📊 Database Schema

## Users Table

```sql
CREATE TABLE [dbo].[Users] (
    [UserId]       INT            IDENTITY (1, 1) NOT NULL,
    [Fullname]     NVARCHAR (MAX) NOT NULL,
    [Email]        NVARCHAR (MAX) NOT NULL,
    [PasswordHash] NVARCHAR (MAX) NOT NULL,
    [Role]         NVARCHAR (MAX) NOT NULL,
    CONSTRAINT [PK_Users] PRIMARY KEY CLUSTERED ([UserId] ASC)
);
```

---

## Rooms Table

```sql
CREATE TABLE [dbo].[Rooms] (
    [RoomId]      INT             IDENTITY (1, 1) NOT NULL,
    [RoomNO]      NVARCHAR (MAX)  NOT NULL,
    [RoomType]    NVARCHAR (MAX)  NOT NULL,
    [Price]       DECIMAL (18, 2) NOT NULL,
    [Capacity]    INT             NOT NULL,
    [IsAvailable] BIT             NOT NULL,
    [ImageUrl]    NVARCHAR (MAX)  NOT NULL,
    CONSTRAINT [PK_Rooms] PRIMARY KEY CLUSTERED ([RoomId] ASC)
);
```

---

## Bookings Table

```sql
CREATE TABLE [dbo].[Bookings] (
    [BookingId]     INT             IDENTITY (1, 1) NOT NULL,
    [UserId]        INT             NOT NULL,
    [RoomId]        INT             NOT NULL,
    [CheckInDate]   DATETIME2 (7)   NOT NULL,
    [CheckOutDate]  DATETIME2 (7)   NOT NULL,
    [TotalAmount]   DECIMAL (18, 2) NOT NULL,
    [BookingStatus] NVARCHAR (MAX)  NOT NULL,
    CONSTRAINT [PK_Bookings] PRIMARY KEY CLUSTERED ([BookingId] ASC)
);
```

---

## Payments Table

```sql
CREATE TABLE [dbo].[Payments] (
    [PaymentId]     INT             IDENTITY (1, 1) NOT NULL,
    [BookingId]     INT             NOT NULL,
    [PaymentDate]   DATETIME2 (7)   NOT NULL,
    [Amount]        DECIMAL (18, 2) NOT NULL,
    [PaymentMethod] NVARCHAR (MAX)  NOT NULL,
    [PaymentStatus] NVARCHAR (MAX)  NOT NULL,
    CONSTRAINT [PK_Payments] PRIMARY KEY CLUSTERED ([PaymentId] ASC)
);
```

---

## ContactMessages Table

```sql
CREATE TABLE [dbo].[ContactMessages] (
    [MessageId] INT            IDENTITY (1, 1) NOT NULL,
    [Name]      NVARCHAR (MAX) NOT NULL,
    [Email]     NVARCHAR (MAX) NOT NULL,
    [Message]   NVARCHAR (MAX) NOT NULL,
    [CreatedAt] DATETIME2 (7)  NOT NULL,
    CONSTRAINT [PK_ContactMessages] PRIMARY KEY CLUSTERED ([MessageId] ASC)
);
```

---

## Entity Framework Migrations Table

```sql
CREATE TABLE [dbo].[__EFMigrationsHistory] (
    [MigrationId]    NVARCHAR (150) NOT NULL,
    [ProductVersion] NVARCHAR (32)  NOT NULL,
    CONSTRAINT [PK___EFMigrationsHistory] PRIMARY KEY CLUSTERED ([MigrationId] ASC)
);
```

---

# 🔌 Database Connection String

The connection string is stored in:

```text
appsettings.json
```

Do **not** upload your personal connection string to GitHub.

Your LocalDB connection string may contain your Windows username and local file path.

For example:

```text
C:\Users\YourName\Documents\hotelManDB.mdf
```

Instead, use your own connection string.

Example:

```json
{
  "ConnectionStrings": {
    "DefaultConnection": "YOUR_CONNECTION_STRING_HERE"
  }
}
```

Example LocalDB connection string:

```text
Data Source=(LocalDB)\MSSQLLocalDB;AttachDbFilename=C:\Users\YourName\Documents\hotelManDB.mdf;Integrated Security=True;Connect Timeout=30;Encrypt=True
```

Replace:

```text
YourName
```

with your own Windows username and use the location of your own `.mdf` database file.

---

# 📦 Required NuGet Packages

Install the required Entity Framework Core packages:

```powershell
Install-Package Microsoft.EntityFrameworkCore.SqlServer
```

```powershell
Install-Package Microsoft.EntityFrameworkCore.Tools
```

For JWT authentication, use a version compatible with .NET 8:

```powershell
Install-Package Microsoft.AspNetCore.Authentication.JwtBearer -Version 8.0.XX
```

> Replace `8.0.XX` with the appropriate available .NET 8 version.

Do not install the .NET 10 version of the JWT package into a .NET 8 project.

---

# ▶️ Running the Backend

Open the project in **Visual Studio**.

Restore packages:

```powershell
dotnet restore
```

Build the project:

```powershell
dotnet build
```

Run the backend:

```powershell
dotnet run
```

The API should run at the configured HTTPS address, for example:

```text
https://localhost:7138
```

---

# 📖 Swagger

Swagger is included for testing the API.

Open:

```text
https://localhost:7138/swagger
```

From Swagger you can test the available API endpoints.

---

# 🌐 Running the Frontend

The frontend is a static HTML/CSS/JavaScript application.

You can run it using **VS Code Live Server** or another local web server.

Example:

```text
http://127.0.0.1:5500
```

Make sure the ASP.NET Core backend is running before using the frontend.

---

# 🔄 Frontend API Communication

The frontend uses JavaScript helper functions:

```javascript
getData()
postData()
putData()
deleteData()
```

These functions communicate with the ASP.NET Core Web API using the browser Fetch API.

Example:

```javascript
const API = "https://localhost:7138/api";
```

For Admin requests, the JWT token is added to the request:

```javascript
headers["Authorization"] = `Bearer ${token}`;
```

---

# 🏨 Room Management Flow

```text
Admin Login
     ↓
Room Management
     ↓
Enter Room Information
     ↓
Add Room
     ↓
POST /api/Rooms
     ↓
RoomsController
     ↓
Entity Framework Core
     ↓
SQL Server LocalDB
```

Rooms can be retrieved using:

```text
GET /api/Rooms
```

---

# 📅 Booking Flow

```text
User Login
     ↓
View Available Rooms
     ↓
Select Room
     ↓
Booking Page
     ↓
Enter Booking Information
     ↓
POST /api/Bookings
     ↓
SQL Server Database
```

---

# 💳 Payment Flow

```text
Booking
     ↓
Payment
     ↓
Enter Payment Information
     ↓
POST /api/Payments
     ↓
SQL Server Database
```

---

# 📩 Contact Flow

```text
User
     ↓
Contact Form
     ↓
POST /api/ContactMessages
     ↓
SQL Server Database
```

---

# 🧪 API Testing

You can test the API using Swagger or Postman.

Main endpoints:

```text
POST /api/Admin/login

GET /api/Rooms
POST /api/Rooms
PUT /api/Rooms/{id}
DELETE /api/Rooms/{id}

POST /api/Auth/login

GET /api/Bookings
POST /api/Bookings

GET /api/Payments
POST /api/Payments

POST /api/ContactMessages
POST /api/Users
```

---

# 🔒 Security Notes

This project uses JWT authentication to protect the Admin section.

However, this is primarily a learning and portfolio project.

For a production application, the following improvements are recommended:

- Store Admin accounts in the database
- Hash passwords securely
- Use ASP.NET Core Identity
- Store secrets using environment variables or a secret manager
- Use refresh tokens
- Implement proper role-based authorization
- Add server-side validation
- Add rate limiting
- Use secure token storage
- Add stronger input validation
- Avoid hard-coded credentials

The static Admin credentials included in this README are intended only for this demo project.

---

# ⚠️ GitHub Security

Do not commit personal secrets or private configuration files.

Avoid uploading:

```text
appsettings.json
```

when it contains your personal connection string or JWT secret.

Instead, create:

```text
appsettings.example.json
```

Example:

```json
{
  "ConnectionStrings": {
    "DefaultConnection": "YOUR_CONNECTION_STRING_HERE"
  },
  "Jwt": {
    "Key": "YOUR_JWT_SECRET_HERE",
    "Issuer": "HotelManagementSystem",
    "Audience": "HotelManagementSystemUsers"
  }
}
```

Then each developer can create their own:

```text
appsettings.json
```

with their local configuration.

---

# 👨‍💻 Author

**Manikandan A.R**

Computer Science Engineering Graduate

### Skills Demonstrated

```text
C#
ASP.NET Core Web API
Entity Framework Core
SQL Server
HTML
CSS
JavaScript
REST API
JWT Authentication
Git
GitHub
```

---

# 📜 License

This project is intended for educational, learning, and portfolio purposes.

You are free to study and modify the project for your own learning and development.
