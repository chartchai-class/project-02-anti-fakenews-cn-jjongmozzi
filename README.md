Social Anti-Fake News Platform(this is the second half of the project,backend) the repository url of frontend is provided below

Group Name: project-02-anti-fakenews-cn-jjongmozzi

Team Members:
Project Leader: Chen Han, Student ID: 20232079, GitHub: chenhan20232079
Project Member: Li YiHeng, Student ID: 20232047
Project Member: Huang QiuYue, Student ID: 20232047


Contributions (Including Coding / Deployment / Git Operations):

Chen Han (Team Leader) – Student ID: 20232079 (90% workload)
1. Project Architecture and Foundation
Frontend: Initialized a Vue 3 + TypeScript project using Vite; configured core dependencies (Vue Router, Pinia, Axios); designed global type definitions (e.g., News, Comment, Vote interfaces); implemented basic routing and layout components (App.vue, Layout.vue).
Backend: Set up the backend project structure using vanilla JavaScript and Express; configured essential dependencies (Express, sqlite3, jsonwebtoken, yup, multer, cors, dotenv); designed the database schema using raw SQL for tables User, News, Comment, and Vote; implemented API routing and environment variable management via .env.
2. Core Function Development
Frontend:
Led development of the entire news module: implemented NewsList.vue with pagination and NewsDetailView.vue for detailed rendering;
Built state management (newsStore.ts) and encapsulated API services (newsService.ts);
Implemented interactive features such as pull-to-refresh, filtering, and loading indicators.
Backend:
Developed all RESTful API endpoints, including:
User authentication (registration/login with JWT);
News CRUD operations with role-based access control;
Voting functionality (submit “credible”/“not credible” votes with optional comments and image uploads);
Admin controls (promote users to MEMBER, delete news or comments).
Implemented JWT-based authentication middleware and role authorization (READER, MEMBER, ADMIN);
Handled image uploads using Multer and served static files from the uploads/ directory.
3. Deployment and Git Operations
Frontend: Configured Vercel deployment (optimized vite.config.ts, set build commands), and deployed the live site.
Backend: Provided clear local deployment instructions (npm start); no Docker, VMs, or containerization used, fully compliant with course requirements.
Collaboration: Created and managed the GitHub repository; set up branch protection rules; resolved merge conflicts and dependency issues; merged team contributions; wrote comprehensive documentation; and conducted end-to-end testing and final launch.
4. Global Optimization & Auxiliary Features
Frontend: Enforced consistent code style, fixed TypeScript errors, optimized page load performance, and ensured cross-browser compatibility.
Backend: Standardized error responses across all routes ({ success: false, status, message }); implemented input validation using Yup (replacing DTO-like structures); added search (by title/content) and status filtering (“fake”/“not fake”) for news listings.
5. Additional Contributions
Assisted in comment module design and integration;
Supported voting interaction logic implementation;
Contributed to UI/UX consistency and auxiliary features (e.g., pagination, input sanitization).


Li YiHeng – Student ID: 20232047 (5% workload)
Helped implement comment submission and paginated retrieval logic in votes.controller.js;
Assisted in developing auxiliary features such as input sanitization and pagination.


Huang QiuYue – Student ID: 20232047 (5% workload)
Supported frontend-backend coordination to ensure consistent UI behavior for loading states and error handling;
Contributed to user experience optimizations, including interactive feedback and visual refinements.



Project Overview:
This project is a social anti-fake news platform that enables users to browse news articles, vote on their authenticity (“credible” or “not credible”), and post comments—optionally with image attachments—to foster community-driven fact-checking. The backend is built entirely with vanilla JavaScript and serves a responsive frontend. All data is stored in a local SQLite database, ensuring simplicity and portability.


Technology Stack:
Frontend: Vue 3 (Composition API), Pinia, Vue Router, Axios, Vite (hosted on Vercel)
Backend: Node.js, Express, SQLite (via sqlite3 driver), JWT (jsonwebtoken), Multer (file upload), Yup (validation)
Language: Vanilla JavaScript (.js files only)
Deployment: Backend runs directly via node server.js; no Docker, Prisma, or TypeScript used
Code Hosting: GitHub


Core Features:
News Module: List news with pagination, search (title/content), and status filtering; view detailed news with vote statistics.
Voting Module: Submit authenticity votes (credible/not credible); optionally attach a comment and image.
Comment & Image Support: Users can post text comments with optional image uploads (JPEG/PNG, ≤5MB).
Role-Based Access Control:
• READER: View news, vote, comment
• MEMBER: All READER permissions + submit new news
• ADMIN: All MEMBER permissions + delete news/comments, upgrade users to MEMBER
Global Features: Standardized JSON error responses, JWT authentication, static file serving for images, and input validation.


Deployment and Access:
Online Deployment URL: https://project-01-anti-fakenews-cn-jjongmo.vercel.app
GitHub Repository URL of frontend: https://github.com/chartchai-class/project-01-anti-fakenews-cn-jjongmozzi.git
GitHub Repository URL of backend: https://github.com/chartchai-class/project-02-anti-fakenews-cn-jjongmozzi.git
Presentation video URL:https://pan.baidu.com/s/1BTxPkioLtWSg-ExP1MdeNQ?pwd=dpe3 
If you need to enter the extraction code to view the video, the video extraction code is: dpe3





