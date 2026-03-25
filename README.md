# AS 2026 Cambridge Dashboard (Zone 4)

A specialized academic tracking and resource platform designed for students in Administrative Zone 4 preparing for the May/June 2026 Cambridge International AS Level examinations. The project focuses on centralizing critical exam data and high-yield study resources into a single, high-performance interface.
## Desktop View
  https://github.com/user-attachments/assets/8444c79d-c942-46ff-80f6-3223b5b99e1b

## Mobile View
  https://github.com/user-attachments/assets/069eebd8-2861-4af6-948d-a7970df297bf
## Core Features

  * **Zone-Specific Examination Tracker:** Real-time countdowns for paper-specific variants (Zone 4) including Mathematics (9709), Physics (9702), Chemistry (9701), and Computer Science (9618).
  * **Dynamic Syllabus Integration:** Interactive modals that fetch and display bolded subtopics and paper-specific requirements directly from the dashboard.
  * **Curated Resource Repository:** A centralized hub linking to a comprehensive archive of past papers and marking schemes (2000–2025).
  * **Productivity Framework:** Built-in "Active Break" menus and cognitive focus strategies (e.g., Brown Noise and Novelty Reset) specifically tailored for long-form study sessions.
  * **Responsive Scheduling:** Adaptive layouts that ensure the examination roadmap is accessible across mobile and desktop devices.

## Architecture & Ingenuity

The platform is engineered for speed, reliability, and zero-cost maintenance:

  * **Frontend:** Pure HTML5, CSS3, and Vanilla JavaScript (ES6+), avoiding heavy frameworks to maintain a near-instantaneous Load-to-Interactive (LTI) time.
  * **Serverless Deployment:** Hosted 24/7 via **Firebase Hosting**. The deployment utilizes a global CDN and custom URL rewriting (`firebase.json`) to handle clean routing without a backend server.
  * **Zero-Cost Infrastructure:** By leveraging Firebase's static hosting tier and externalized resource linking, the website operates with 100% uptime at no operational expense.
  * **Localized Logic:** The countdown engine is hardcoded to Pakistan Standard Time (UTC+5) to ensure precise timing for local candidates.

## Development

The project is an independent educational initiative developed to streamline the revision workflow for private and school-based candidates.

  * **Lead Developer:** Ibrahim Haroon

## View it live here

[https://cambridgeoverview.web.app](https://www.google.com/search?q=https://cambridgeoverview.web.app)
