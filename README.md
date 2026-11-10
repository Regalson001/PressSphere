# 🌍 PressSphere — Global News Discovery & Intelligence Platform

**Discover more. Understand better.**

PressSphere is a modern, responsive global news discovery and search platform designed to bring news reporting from different publishers into one streamlined experience.

Built with HTML5, CSS3, JavaScript and Node.js, PressSphere allows readers to explore international news, search topics, discover stories, refine results and save articles for later reading.

The platform focuses on delivering a clean editorial experience, intuitive navigation and a foundation for future AI-powered news intelligence capabilities.

---

## 🚀 Project Overview

In an increasingly connected world, news is published across thousands of websites and media organisations. Finding relevant information and exploring different perspectives can be challenging.

PressSphere addresses this challenge by providing a centralised news discovery experience where users can search and explore articles from multiple publishers.

Rather than simply displaying headlines, the platform is designed to evolve into an intelligent news research environment.

### Core Objectives

- Simplify global news discovery.
- Make information easier to search and explore.
- Provide access to reporting from multiple publishers.
- Improve the reading and discovery experience.
- Establish a foundation for AI-powered news intelligence.

---

## ✨ Key Features

### 1. Global News Search
- Search news articles using keywords and topics.
- Discover reporting from multiple publishers.
- Search international news through an external news API.
- Display article headlines, descriptions, publishers and publication dates.

### 2. Advanced Search and Filtering
- Filter articles by language.
- Filter by publication date.
- Sort results by newest, relevance or popularity.
- Navigate search results using pagination.
- Reset filters when needed.

### 3. Topic Discovery
Quickly explore different areas of reporting, including:

- World News
- Politics
- Technology
- Artificial Intelligence
- Business
- Science
- Health
- Sports
- Africa

### 4. Personal Reading List
- Save interesting articles.
- Remove bookmarked articles.
- View saved stories in a dedicated section.
- Retain bookmarks using browser local storage.

### 5. Modern User Interface
- Premium editorial-inspired design.
- Responsive desktop and mobile layouts.
- Light and dark themes.
- Interactive article cards.
- Smooth transitions and animations.
- Clean navigation and search experience.

### 6. Backend API Integration
- Node.js and Express backend.
- Secure server-side API key handling.
- News API integration.
- Search parameter validation.
- Error handling and API response processing.

---

## 🛠️ Technology Stack

| Technology | Purpose |
|---|---|
| HTML5 | Application structure |
| CSS3 | Styling and responsive design |
| JavaScript | Frontend functionality |
| Node.js | Backend runtime |
| Express.js | Backend API and routing |
| NewsAPI | External news data provider |
| Local Storage | Saved articles and theme preferences |
| Git & GitHub | Version control and source management |

---

## 🏗️ Application Architecture

PressSphere follows a simple client-server architecture.

```text
                 USER
                   |
                   v
          PRESSSPHERE FRONTEND
                   |
          HTML + CSS + JavaScript
                   |
                   v
           EXPRESS BACKEND
                   |
             /api/news
                   |
                   v
              NEWS API
                   |
                   v
          EXTERNAL NEWS SOURCES
                   |
                   v
          PROCESSED NEWS RESULTS
                   |
                   v
          ARTICLE DISPLAY
                   |
                   v
           USER INTERACTION
```

The frontend communicates with the Express backend, which handles requests to the external news provider. API credentials remain on the server rather than being exposed in browser JavaScript.

---

## 📂 Project Structure

```text
PressSphere/
│
├── public/
│   ├── index.html
│   ├── styles.css
│   └── app.js
│
├── server.js
├── package.json
├── package-lock.json
├── .env
├── .gitignore
└── README.md
```

### File Responsibilities

| File | Description |
|---|---|
| `index.html` | Main application interface |
| `styles.css` | Visual design and responsive styling |
| `app.js` | Search, filtering, bookmarks and UI interactions |
| `server.js` | Express server and news API integration |
| `package.json` | Dependencies and application scripts |
| `.env` | Private environment configuration |
| `.gitignore` | Excludes sensitive and unnecessary files |

---

## ⚙️ Installation and Setup

Follow these instructions to run PressSphere locally.

### Prerequisites

Install the following:

- [Node.js](https://nodejs.org/)
- [Git](https://git-scm.com/)
- [Visual Studio Code](https://code.visualstudio.com/)

You will also need a NewsAPI key.

### Step 1: Clone the Repository

```bash
git clone https://github.com/Regalson001/PressSphere.git
```

### Step 2: Navigate into the Project

```bash
cd PressSphere
```

### Step 3: Install Dependencies

```bash
npm install
```

### Step 4: Configure Environment Variables

Create a `.env` file in the project's root directory.

Add:

```env
NEWS_API_KEY=YOUR_NEWS_API_KEY
PORT=3000
```

Get your API key from:

https://newsapi.org/

**Important:** Replace `YOUR_NEWS_API_KEY` with your actual API key.

### Step 5: Start the Application

```bash
npm start
```

### Step 6: Open PressSphere

Visit:

```text
http://localhost:3000
```

Your application should now be running locally.

---

## 🔐 Security Considerations

PressSphere uses environment variables to protect external API credentials.

Security practices include:

- Keeping API keys outside frontend JavaScript.
- Excluding `.env` from Git commits.
- Processing external API requests through the backend.
- Validating and limiting search parameters.
- Handling failed API requests.

Never publish private API credentials in a public repository.

---

## 🌐 API Integration

PressSphere currently integrates with **NewsAPI**.

The application uses the Everything endpoint to retrieve articles based on user search queries.

Example endpoint:

```text
https://newsapi.org/v2/everything
```

The backend processes search parameters such as:

- Search query
- Language
- Publication date
- Sorting preference
- Page number
- Page size

The returned article information is processed and formatted before being delivered to the frontend.

**Provider limitations:** Available results, historical coverage, request limits and production usage depend on the NewsAPI subscription. Development access may have restrictions.

---

## 🔮 Future Development Roadmap

PressSphere is designed to grow beyond traditional news aggregation.

The following features represent potential future development milestones.

### Phase 2 — AI-Powered News Intelligence

- AI-powered article summarisation.
- Automatic topic classification.
- Duplicate article detection.
- Intelligent keyword extraction.
- AI-generated daily news briefings.

### Phase 3 — Advanced News Analytics

- Compare how different publishers report the same event.
- Identify differences in article framing.
- Analyse reporting trends across countries.
- Visualise topic popularity over time.
- Build source transparency and publisher information tools.

### Phase 4 — Personalisation

- User registration and authentication.
- Personalised news recommendations.
- Cloud-synchronised reading lists.
- Custom news categories.
- Personalised news alerts.

### Phase 5 — Scalable Infrastructure

- PostgreSQL database integration.
- Redis caching.
- Background processing.
- Real-time notifications.
- Cloud deployment.
- Monitoring and performance optimisation.

---

## 🎯 Project Goals

The long-term vision is to develop PressSphere into a comprehensive news intelligence platform that combines:

- Global news discovery.
- Artificial intelligence.
- Natural language processing.
- Data analytics.
- Information retrieval.
- Intelligent content recommendations.

The goal is to help users move beyond simply reading headlines and towards understanding the wider context of global events.

---

## 👨‍💻 Developer

**Stephen Oyugi Nyarangi**

AI Automation Engineer | Workflow Integration Specialist | Aspiring Software Engineer

GitHub: https://github.com/Regalson001

---

## 📜 License

This project is currently intended for educational, development and portfolio purposes.

A formal open-source license can be added when the project's distribution terms are established.

---

## ⭐ Support the Project

If you find PressSphere interesting, consider giving the repository a star on GitHub.

Your feedback, suggestions and contributions are welcome.

**PressSphere — Discover more. Understand better.**
