
Built by https://www.blackbox.ai

---

# South African Soul DJs

## Project Overview
The **South African Soul DJs** project is a web application designed to showcase DJs specializing in South African soul music. The application allows users to view information about various DJs, including their bios, booking details, and audio samples. Users can also register new DJs through a registration form, which supports file uploads for profile pictures and audio sets.

## Installation

To set up the project locally, follow these steps:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/south-african-soul-djs.git
   cd south-african-soul-djs
   ```

2. **Install dependencies:**
   Ensure you have Node.js installed, then run:
   ```bash
   npm install
   ```

3. **Start the server:**
   Run the following command to start the application:
   ```bash
   node server.js
   ```
   The server will start on `http://localhost:3000`.

## Usage

After starting the server, navigate to `http://localhost:3000` in your web browser. You will see the main application interface where you can:

- View a list of available DJs.
- Click on individual DJs to see more details.
- Use the registration section to add new DJs to the database by filling out the form and uploading files.

## Features

- **DJs Listing:** See details for each DJ including their name, bio, booking fee, social media links, and upcoming events.
- **Register DJ:** Submit a form to add new DJs, which includes file uploads for audio samples and profile pictures.
- **Responsive Design:** The application is designed to work on both desktop and mobile devices.

## Dependencies

The project uses the following dependencies, as defined in `package.json`:

- **express**:  A minimal and flexible Node.js web application framework.
- **multer**: A middleware for handling `multipart/form-data`, which is used for uploading files.

## Project Structure

Here’s an overview of the project’s structure:

```
south-african-soul-djs/
│
├── public/
│   ├── index.html         # Main HTML file for the application
│   ├── styles.css         # CSS file for styling the application
│   ├── uploads/           # Directory for uploaded files (created on upload)
│   └── script.js          # JavaScript file for client-side functionality
│
├── server.js              # Main server file
├── data.json              # JSON file holding in-memory DJ data
└── package.json           # File defining project dependencies and scripts
```

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.