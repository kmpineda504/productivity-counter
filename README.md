# Productivity Counter

A lightweight productivity tracking application designed for operational teams such as Cargo, Reservations, and Customer Care.

The app allows users to track completed tasks throughout the day, monitor productivity against predefined targets, and quickly access frequently used communication templates.

## Features

### Productivity Tracking
- Increment and decrement task counters
- Department-specific productivity monitoring
- Automatic progress calculation based on productive minutes
- Visual progress bar with performance indicators
- Daily productivity target tracking

### Multi-Department Support
- Cargo Unit
- Reservations Unit
- Customer Care Unit

Each department can have its own set of tasks, counters, and productivity values.

### Communication Templates
- Built-in template library
- Categorized templates by department
- One-click copy to clipboard
- Designed to speed up repetitive operational communications

### Data Persistence
- Automatic saving using browser Local Storage
- Session recovery after page refresh
- Last saved timestamp tracking
- Backup and restore functionality

### User Experience
- Responsive interface
- Dark Mode and Light Mode
- Slide-out navigation menu
- Quick access template panel
- Clean card-based design

## Technologies Used

- HTML5
- CSS3
- Vanilla JavaScript
- Browser Local Storage
- Font Awesome Icons

## Project Structure

```text
/
├── index.html
├── styles.css
├── script.js
└── data/
    ├── departments.js
    ├── productivity.js
    └── templates/
        └── cargo.js
```

## How It Works

1. Select a department.
2. Increase counters as tasks are completed.
3. The application automatically calculates productive minutes.
4. Progress is measured against a daily target of 435 productive minutes.
5. Data is automatically saved in the browser.
6. Use the Templates panel to quickly copy frequently used messages.

## Backup and Restore

### Backup
Click **Backup Data** to copy all productivity data to your clipboard.

### Restore
Click **Import Data** and paste a previously saved backup to restore your counters.

## Future Improvements

- Cloud synchronization
- User authentication
- Historical productivity reports
- Dashboard analytics
- Export to Excel
- Custom department creation
- Mobile application version

## Author

Kevin Pineda Palacio

Built to simplify productivity tracking and communication workflows for customer operations
