Social Anti-Fake News Platform

Group Name：project-02-anti-fakenews-cn-jjongmozzi

project leader: Chen Han  20232079
github username: chenhan20232079

Contributions (Including Coding/Deployment/Git Operations)：

Chen Han (Team Leader) - Student ID: 20232079 (90% workload)
1. Project Architecture and Foundation
Initialized frontend (Vue + TypeScript) and backend project structures
Configured core dependencies (frontend: Vue Router, Pinia, Axios; backend: Express, Prisma, JWT) and environment variables
Designed global type systems (frontend: News, Comment, Vote interfaces; backend: role/enum types)
Built basic routing (frontend: page routes; backend: API routes) and layout components (App.vue, Layout.vue)
2. Core Function Development
Frontend:
Implemented news module (list/pagination in NewsList.vue, detail rendering in NewsDetailView.vue)
Developed voting module (authenticity vote submission, real-time result display)
Built comment module (post comments, view paginated comment lists)
Managed state via Pinia (newsStore.ts, voteStore.ts) and encapsulated API services (newsService.ts, authService.ts)
Backend:
Developed API interfaces (news CRUD, voting logic, comment management, user role control)
Implemented role permissions (READER: view/vote/comment; MEMBER: +submit news; ADMIN: +delete content/upgrade roles)
Built data models (Prisma schema for User, News, Comment, Vote) and mock data for testing
3. Deployment and Git Operations
Frontend: Configured Vercel deployment (vite.config.ts optimization, build commands)
Backend: Set up Docker deployment (docker-compose.yml for database + service) and VM deployment preparation
Managed GitHub repository (initialized project, set branch protection, resolved dependency conflicts)
Wrote deployment documentation and conducted final testing/launch
4. Global Optimization & Auxiliary Functions
Unified code specifications, fixed type checking issues, and optimized page loading performance
Handled cross-browser compatibility and global error handling (frontend: toast prompts; backend: standardized error responses)
Implemented auxiliary features (news search by title/detail/reporter, status filtering for fake/non-fake news)


Project Member:Li YiHeng  Student ID:20232047(10% workload)
5.Comment Function Development
6.Auxiliary Function Implementation


Project Member:Huang QiuYue  Student ID；20232047(10% workload)
7.Voting and Interaction Function Development
8.UI and Experience Optimization



Here are the details of our project:

Project Overview：
This project is a social anti-fake news platform that integrates news browsing, authenticity voting, and comment interaction. Users can access news, participate in judging news authenticity, post comments to exchange opinions, and jointly resist the spread of false information. The platform supports responsive design, adapting to various devices (desktops, tablets, mobile phones).


Technology Stack：
Frontend:Core Framework: Vue 3 (Composition API); State Management: Pinia; Routing: Vue Router; Type Checking: TypeScript; HTTP Client: Axios; Build Tool: Vite
Backend:Core Framework: Express; ORM: Prisma; Authentication: JWT; Database: PostgreSQL; Deployment: Docker; Language: TypeScript
Deployment:Frontend: Vercel; Backend: Docker/VM; Code Hosting: GitHub

Core Features：
News Module: News list display, detail viewing, category filtering
Voting Module: credible/not credible voting for news authenticity and result display
Comment Module: Post comments, view comment lists, and comment interaction
Global Features: Page navigation, loading status prompts, error handling


Deployment and Access
Online Deployment URL: https://project-01-anti-fakenews-cn-jjongmo.vercel.app
GitHub Repository URL of frontend: https://github.com/chartchai-class/project-01-anti-fakenews-cn-jjongmozzi.git
GitHub Repository URL of backend: https://github.com/chartchai-class/project-02-anti-fakenews-cn-jjongmozzi.git
Presentation video URL:https://pan.baidu.com/s/1BTxPkioLtWSg-ExP1MdeNQ?pwd=dpe3 
If you need to enter the extraction code to view the video, the video extraction code is: dpe3





