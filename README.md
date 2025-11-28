Social Anti-Fake News Platform

Group Name: project-02-anti-fakenews-cn-jjongmozzi

Team Members: Project Leader: Chen Han, Student ID: 20232079, GitHub: chenhan20232079 Project Member: Li YiHeng, Student ID: 20232047 Project Member: Huang QiuYue, Student ID: 20232047

Contributions (Including Coding / Deployment / Git Operations):

Chen Han (Team Leader) – Student ID: 20232079 (90% workload) Project Architecture and Foundation Initialized the backend project structure using vanilla JavaScript and Express. Configured core dependencies (Express, sqlite3, jsonwebtoken, yup, multer, cors, dotenv). Designed the database schema with raw SQL tables for User, News, Comment, and Vote. Built basic API routing and implemented environment variable management via .env. Core Function Development Backend: Developed all RESTful API endpoints including user authentication, news CRUD (with role-based access), voting logic (with optional comment and image upload), and admin controls (user promotion, content deletion). Implemented JWT-based authentication middleware and role authorization (READER, MEMBER, ADMIN). Handled file uploads using Multer and served static images from the uploads/ directory. Deployment and Git Operations Set up local deployment instructions (npm start) without Docker or VMs. Managed the GitHub repository (branch protection, PR reviews, conflict resolution). Wrote comprehensive README documentation and conducted end-to-end testing. Global Optimization & Auxiliary Functions Unified error response format across all routes. Implemented input validation using Yup to replace DTO-like structures. Added search (by title/content) and status filtering (fake/non-fake) for news listings.

Project Member: Li YiHeng – Student ID: 20232047 (5% workload) Developed the comment submission and retrieval logic in votes.controller.js. Assisted in implementing auxiliary features such as pagination and input sanitization.

Project Member: Huang QiuYue – Student ID: 20232047 (5% workload) Implemented the voting interaction logic (isFake true/false) and real-time vote count aggregation. Supported frontend-backend coordination for UI consistency and loading/error states.

Project Overview: This project is a social anti-fake news platform that enables users to browse news articles, vote on their authenticity (“credible” or “not credible”), and post comments—optionally with image attachments—to foster community-driven fact-checking. The backend is built entirely with vanilla JavaScript and serves a responsive frontend. All data is stored in a local SQLite database, ensuring simplicity and portability.

Technology Stack: Frontend: Vue 3 (Composition API), Pinia, Vue Router, Axios, Vite (hosted on Vercel) Backend: Node.js, Express, SQLite (via sqlite3 driver), JWT (jsonwebtoken), Multer (file upload), Yup (validation) Language: Vanilla JavaScript (.js files only) Deployment: Backend runs directly via node server.js; no Docker, Prisma, or TypeScript used Code Hosting: GitHub

Core Features: News Module: List news with pagination, search (title/content), and status filtering; view detailed news with vote statistics. Voting Module: Submit authenticity votes (credible/not credible); optionally attach a comment and image. Comment & Image Support: Users can post text comments with optional image uploads (JPEG/PNG, ≤5MB). Role-Based Access Control: • READER: View news, vote, comment • MEMBER: All READER permissions + submit new news • ADMIN: All MEMBER permissions + delete news/comments, upgrade users to MEMBER Global Features: Standardized JSON error responses, JWT authentication, static file serving for images, and input validation.

Deployment and Access: Online Deployment URL: https://project-01-anti-fakenews-cn-jjongmo.vercel.app GitHub Repository URL of frontend: https://github.com/chartchai-class/project-01-anti-fakenews-cn-jjongmozzi.git GitHub Repository URL of backend: https://github.com/chartchai-class/project-02-anti-fakenews-cn-jjongmozzi.git Presentation video URL:https://pan.baidu.com/s/1BTxPkioLtWSg-ExP1MdeNQ?pwd=dpe3  If you need to enter the extraction code to view the video, the video extraction code is: dpe3



