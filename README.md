# GTD Flow

A modern task management web application that implements David Allen's Getting Things Done® (GTD) methodology. Built with React and Vite, GTD Flow helps you organize tasks, manage projects, and maintain a clear mind through structured organization.

Website: https://gtd-teal.vercel.app/
Data only store your browser local storage.


## Features

- **Task Management**: Capture and organize tasks with contexts and priorities
- **Projects View**: Track and manage multi-step outcomes
- **Waiting For**: Monitor delegated tasks and dependencies
- **Someday/Maybe List**: Store ideas and potential future projects
- **Weekly Review**: Systematic process to keep your GTD system current and relevant
- **Reference Filing**: Organize reference materials and resources
- **Built-in Timer**: Focus timer to help with task execution
- **Context-based Organization**: Group tasks by context for efficient execution

## Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn

### Docker

#### Prerequisites
- Docker
- Docker Compose (optional, for development environment)

#### Using Docker

1. Build the Docker image:
    ```bash
    docker build -t gtd-flow .
    ```

2. Run the container:
    ```bash
    docker run -p 8080:80 gtd-flow
    ```

### Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/yourusername/gtd-flow.git
    cd gtd-flow
    ```

2. Install dependencies:
    ```bash
    npm install
    # or
    yarn
    ```

3. Start the development server:
    ```bash
    npm run dev
    # or
    yarn dev
    ```

Visit `http://localhost:5173` in your browser to see the application.

## Project Structure

The project follows a modular organization with clear separation of concerns:

### Source Directory (`src/`)

#### Components (`components/`)
React components that make up the application interface:

- **Task Management**
  - `Inbox.jsx` - Capture and process new inputs
  - `NextActions.jsx` - View and manage next actionable items
  - `Projects.jsx` - Handle multi-step outcomes
  - `Someday.jsx` - Store future possibilities
  - `WaitingFor.jsx` - Track delegated items

- **Support Tools**
  - `Timer.jsx` - Focus timer for task execution
  - `Reference.jsx` - Reference material organization
  - `WeeklyReview.jsx` - Weekly review process
  - `ProcessTask.jsx` - Task processing workflow
  - `Navigation.jsx` - Application navigation

#### State Management (`context/`)
- `GTDContext.jsx` - Global state management using Context API

#### Styling (`styles/`)
- `components/` - Component-specific styles
  - `Timer.styles.js`
  - `Reference.styles.js`
  - `WeeklyReview.styles.js`
- `shared.js` - Shared styling utilities

#### Type Definitions (`types/`)
- `gtd.ts` - TypeScript interfaces and types

#### Entry Point
- `main.jsx` - Application initialization
- `index.css` - Global styles

### Configuration Files

- `vite.config.js` - Vite configuration
- `package.json` - Project dependencies and scripts
- `.gitignore` - Git ignore rules
- `.dockerignore` - Docker ignore rules
- `vercel.json` - Vercel deployment configuration
- `LICENSE` - Project license

Each component and module is designed to be self-contained while maintaining clear interactions with other parts of the system through the GTD Context.

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm test` - Run tests (if configured)

### Tech Stack

- **React**: UI library
- **Vite**: Build tool and development server
- **TypeScript**: Type definitions
- **Context API**: State management
- **CSS-in-JS**: Styling solution

## GTD Methodology Implementation

This application follows David Allen's GTD® methodology:

1. **Capture**: Quick task entry system
2. **Clarify**: Process inbox items into actionable tasks
3. **Organize**: Sort tasks into appropriate lists
4. **Reflect**: Weekly review functionality
5. **Engage**: Timer and task execution support

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Coding Standards

- AI only
