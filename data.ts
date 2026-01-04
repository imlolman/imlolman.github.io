import { ProfileData } from './types';

export const profileData: ProfileData = {
  name: "Satyam Gupta",
  handle: "imlolman",
  titles: ["Technical Lead", "Senior Software Engineer", "Cyber Security Enthusiast"],
  location: "India",
  summary: "Technical Lead with 8+ years of experience driving technical excellence and building scalable platforms. Proven track record of architecting and scaling systems to handle millions of messages daily. Thinks in systems with an automation-first mindset and is AWS Certified Developer with expertise in microservices architecture, cloud infrastructure, and full-stack development.",
  socials: [
    { name: "Email", url: "satyamforwork@gmail.com", badgeUrl: "https://img.shields.io/badge/Email-D14836?style=for-the-badge&logo=gmail&logoColor=white" },
    { name: "Resume", url: "https://imlolman.github.io/Satyam%20Gupta%20Resume.pdf", badgeUrl: "https://img.shields.io/badge/Resume-EC1C24?style=for-the-badge&logo=readdotcv&logoColor=white" },
    { name: "LinkedIn", url: "https://linkedin.com/in/imlolman", badgeUrl: "https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white" },
    { name: "Portfolio", url: "https://imlolman.github.io", badgeUrl: "https://img.shields.io/badge/Portfolio-255E63?style=for-the-badge&logo=googlechrome&logoColor=white" },
    { name: "Medium", url: "https://medium.com/@satyam.gupta756", badgeUrl: "https://img.shields.io/badge/Medium-12100E?style=for-the-badge&logo=medium&logoColor=white" },
    { name: "Stack Overflow", url: "https://stackoverflow.com/users/6081232", badgeUrl: "https://img.shields.io/badge/Stack_Overflow-FE7A16?style=for-the-badge&logo=stackoverflow&logoColor=white" },
    { name: "GitHub", url: "https://github.com/imlolman", badgeUrl: "https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white" }
  ],
  currentWork: {
    company: "Brandzzy SoftTech Pvt. Ltd.",
    role: "Founder & CTO",
    period: "Jan 2021 - Present",
    stats: [
      { label: "Websites", value: "10K+", icon: "https://img.shields.io/badge/Websites-10K+-success?style=flat-square&logo=google-chrome" },
      { label: "MRR", value: "$10K+", icon: "https://img.shields.io/badge/MRR-$10K+-success?style=flat-square&logo=dollar" },
      { label: "Team", value: "15+", icon: "https://img.shields.io/badge/Team-15+-blue?style=flat-square&logo=users" },
      { label: "Notifications", value: "Millions Daily", icon: "https://img.shields.io/badge/Notifications-Millions_Daily-orange?style=flat-square&logo=bell" }
    ],
    description: [
      "Leading technical strategy and architecture for multiple SaaS products: LaraPush, ZeroCLI, and AdsGrab.",
      "Architected and scaled push notification platform to handle millions of messages daily with microservices infrastructure.",
      "Achieved $10k+ MRR through scalable SaaS growth strategies.",
      "Built comprehensive migration system importing subscribers from OneSignal, Feedify, iZooto, Truepush, and Notix.",
      "Implemented double-layer Free CDN (GitHub Pages + Cloudflare) ensuring 99.9% uptime."
    ]
  },
  certifications: [
    { name: "AWS Certified Developer – Associate", issuer: "Amazon Web Services", date: "July 2022", badgeUrl: "https://img.shields.io/badge/AWS_Certified_Developer-232F3E?style=for-the-badge&logo=amazonaws&logoColor=white" },
    { name: "AWS Certified Cloud Practitioner", issuer: "Amazon Web Services", date: "April 2021", badgeUrl: "https://img.shields.io/badge/AWS_Cloud_Practitioner-232F3E?style=for-the-badge&logo=amazonaws&logoColor=white" }
  ],
  achievements: [
    "Google Bug Bounty - $1,600 (2025) - Discovered vulnerability in Firebase Cloud Messaging",
    "WordCamp Delhi 2024 Speaker - Selected as youngest speaker, presented on push notification growth strategies",
    "Scaled Platform - LaraPush serving 10,000+ websites with millions of notifications daily",
    "Built 100+ Tools - Created Lolman.Tools with privacy-focused, browser-based utilities",
    "Open Source Contributor - Active contributions to Maccy and 15+ open source projects"
  ],
  projects: [
    {
      title: "LaraPush",
      url: "https://larapush.com",
      description: "A self-hosted push notification platform powering over 10,000 websites. Architected and built solo for the first two years, handling backend, frontend, analytics, payment gateway integration, and automated migration systems. The platform delivers millions of notifications daily.",
      techStack: ["Laravel", "PHP", "TypeScript", "JavaScript", "Docker", "MySQL", "Redis", "BullMQ", "Bash", "Linux"]
    },
    {
      title: "Lolman.Tools",
      url: "https://lolman.tools",
      description: "Developed and scaled 100+ free, fast, and privacy-focused tools that run entirely in-browser. Built custom framework for AI-based, Wasm-based, and browser-powered utilities while maintaining consistent UI.",
      techStack: ["Svelte", "TypeScript", "JavaScript", "WebAssembly", "AI Integration"]
    },
    {
      title: "WAPI - WhatsApp Unofficial API",
      url: "https://wapi.to",
      description: "A SAAS product that allows users to programmatically send and receive WhatsApp messages via API. Features include rate limiting, queue management, and anti-spam protection.",
      techStack: ["Laravel", "PHP", "JavaScript", "Docker", "WhatsApp"]
    },
    {
      title: "Learn Bharat App",
      url: "",
      description: "Complete MLM platform with React Native app, Laravel backend, and admin panel. Features payment gateway integration, social media APIs, and performance-based reward systems.",
      techStack: ["Laravel", "React Native", "PHP", "JavaScript"]
    }
  ],
  skills: [
    { name: "JavaScript", category: "Language", badgeUrl: "https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" },
    { name: "TypeScript", category: "Language", badgeUrl: "https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" },
    { name: "PHP", category: "Language", badgeUrl: "https://img.shields.io/badge/PHP-777BB4?style=for-the-badge&logo=php&logoColor=white" },
    { name: "Python", category: "Language", badgeUrl: "https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white" },
    { name: "Bash", category: "Language", badgeUrl: "https://img.shields.io/badge/Bash-4EAA25?style=for-the-badge&logo=gnu-bash&logoColor=white" },
    { name: "SQL", category: "Language", badgeUrl: "https://img.shields.io/badge/SQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white" },
    { name: "Laravel", category: "Framework", badgeUrl: "https://img.shields.io/badge/Laravel-FF2D20?style=for-the-badge&logo=laravel&logoColor=white" },
    { name: "Node.js", category: "Framework", badgeUrl: "https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" },
    { name: "React Native", category: "Framework", badgeUrl: "https://img.shields.io/badge/React_Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" },
    { name: "Express.js", category: "Framework", badgeUrl: "https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white" },
    { name: "Puppeteer", category: "Framework", badgeUrl: "https://img.shields.io/badge/Puppeteer-40B5A4?style=for-the-badge&logo=puppeteer&logoColor=white" },
    { name: "AWS", category: "DevOps", badgeUrl: "https://img.shields.io/badge/AWS-232F3E?style=for-the-badge&logo=amazonaws&logoColor=white" },
    { name: "Docker", category: "DevOps", badgeUrl: "https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white" },
    { name: "Proxmox", category: "DevOps", badgeUrl: "https://img.shields.io/badge/Proxmox-E57000?style=for-the-badge&logo=proxmox&logoColor=white" },
    { name: "Google Cloud", category: "DevOps", badgeUrl: "https://img.shields.io/badge/Google_Cloud-4285F4?style=for-the-badge&logo=google-cloud&logoColor=white" },
    { name: "MySQL", category: "Database", badgeUrl: "https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white" },
    { name: "Redis", category: "Database", badgeUrl: "https://img.shields.io/badge/Redis-DC382D?style=for-the-badge&logo=redis&logoColor=white" },
    { name: "Firebase", category: "Database", badgeUrl: "https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=black" }
  ],
  specializations: [
    "Microservices Architecture & Distributed Systems",
    "Push Notifications - Firebase FCM, VAPID, Web Push, Mobile Push",
    "Payment Gateway Integration - Stripe, PhonePe, BillDesk, Razorpay",
    "AI Integration - OpenAI, Gemini, Claude in Existing Platforms",
    "Web Scraping & Automation",
    "SAAS Platform Development",
    "Virtualization & Server Management - Proxmox",
    "Anything Tech that has Research Involved :)"
  ],
  interests: [
    "Building scalable SAAS platforms",
    "Automation and productivity tools",
    "Security research and bug bounties",
    "AI integration and working with automation tools",
    "Chrome extensions and browser tools"
  ],
  openSource: {
    projects: {
      title: "Open Source",
      subtitle: "Contributions to the community",
      categories: [
        {
          name: "PHP SDKs & Payment Gateways",
          items: [
            { name: "PhonePe PHP SDK", url: "https://github.com/imlolman/phonepe-php-sdk", description: "Unofficial PHP SDK for PhonePe payment gateway" },
            { name: "BillDesk PHP SDK", url: "https://github.com/imlolman/billdesk-php-sdk", description: "Built from latest v2 documentation" },
            { name: "ZohoBooks PHP SDK", url: "https://github.com/imlolman/ZohoBooks", description: "Generated using custom PHP SDK Generator" },
            { name: "PayU PHP SDK", url: "https://github.com/imlolman/payu-php-sdk", description: "PayU payment gateway integration" },
            { name: "CCAvenue PHP SDK", url: "https://github.com/imlolman/CCAvenue-php-sdk", description: "CCAvenue payment gateway integration" },
            { name: "Firebase PHP SDK", url: "https://github.com/imlolman/firebase-php", description: "Unofficial Firebase Admin SDK for PHP" },
          ]
        },
        {
          name: "Development Tools",
          items: [
            { name: "PHP SDK Generator", url: "https://github.com/imlolman/php-sdk-generator-from-postman-sdk", description: "Generate PHP SDKs from Postman Collections" },
            { name: "Backup to Drive", url: "https://github.com/imlolman/Backup-to-drive", description: "Automated backup solution with retention management" },
            { name: "Proxmox Snippets API", url: "https://github.com/imlolman/proxmox-snippets-api", description: "API for managing Proxmox snippets" },
          ]
        },
        {
          name: "Web Tools & Extensions",
          items: [
            { name: "WhatsApp Chat Widget", url: "https://github.com/imlolman/Whatsapp-Chat-Widget", description: "JavaScript SDK for website integration" },
            { name: "WhatsApp Suggestion Chips", url: "https://github.com/imlolman/Whatsapp-Suggestion-Chips", description: "Chrome extension with OpenAI-powered response suggestions" },
            { name: "WSS Tester", url: "https://github.com/imlolman/WSS-Tester", description: "WebSocket testing and debugging tool" }
          ]
        }
      ]
    },
    maccy: {
      title: "Maccy",
      subtitle: "Open Source Contribution",
      project: { name: "Maccy", url: "https://github.com/imlolman/Maccy", description: "Contributing to lightweight clipboard manager for macOS" }
    }
  },
  videos: [
    {
      title: "This AI story teller writes er*tica aswell 🥺",
      url: "https://www.youtube.com/watch?v=f3pqZGdUlkQ",
      thumbnail: "https://i.ytimg.com/vi/f3pqZGdUlkQ/hqdefault.jpg",
      views: "131 views",
      date: "3 years ago",
      description: ""
    },
    {
      title: "Typing Very Fast, Can you Guess the Speed. #short",
      url: "https://www.youtube.com/watch?v=U_mIylynIlM",
      thumbnail: "https://i.ytimg.com/vi/U_mIylynIlM/hqdefault.jpg",
      views: "60 views",
      date: "5 years ago",
      description: ""
    },
    {
      title: "My Automatic 8D Music Creater and Uploader | Project 8D",
      url: "https://www.youtube.com/watch?v=EdBZLoOeTw8",
      thumbnail: "https://i.ytimg.com/vi/EdBZLoOeTw8/hqdefault.jpg",
      views: "94 views",
      date: "5 years ago",
      description: ""
    },
    {
      title: "Degrees | CS50'sIntroduction to AI with Python Submission",
      url: "https://www.youtube.com/watch?v=C0HdWflYxpU",
      thumbnail: "https://i.ytimg.com/vi/C0HdWflYxpU/hqdefault.jpg",
      views: "274 views",
      date: "5 years ago",
      description: ""
    },
    {
      title: "Knights | CS50'sIntroduction to AI with Python Submission",
      url: "https://www.youtube.com/watch?v=Uo7q3fWGecE",
      thumbnail: "https://i.ytimg.com/vi/Uo7q3fWGecE/hqdefault.jpg",
      views: "35 views",
      date: "5 years ago",
      description: ""
    },
    {
      title: "AI Plays Minesweeper | CS50's Intro to AI with Python Submission",
      url: "https://www.youtube.com/watch?v=Nx90Vu3xOAA",
      thumbnail: "https://i.ytimg.com/vi/Nx90Vu3xOAA/hqdefault.jpg",
      views: "1.1K views",
      date: "5 years ago",
      description: ""
    },
    {
      title: "Plan/Demo/Prototype for New Project. Discord Registration Bot.",
      url: "https://www.youtube.com/watch?v=ZkE7cTOpUD8",
      thumbnail: "https://i.ytimg.com/vi/ZkE7cTOpUD8/hqdefault.jpg",
      views: "85 views",
      date: "6 years ago",
      description: ""
    },
    {
      title: "I have build a Dominoes 2D Simulation | Very Satisfactory to Watch 🔥",
      url: "https://www.youtube.com/watch?v=8YVhD6s9gKs",
      thumbnail: "https://i.ytimg.com/vi/8YVhD6s9gKs/hqdefault.jpg",
      views: "65 views",
      date: "6 years ago",
      description: ""
    },
    {
      title: "Easiest DVD Logo Animation in P5.js Made in 15  Minutes | Awesome Basic Coding Challange",
      url: "https://www.youtube.com/watch?v=xQWyLKx2lyo",
      thumbnail: "https://i.ytimg.com/vi/xQWyLKx2lyo/hqdefault.jpg",
      views: "197 views",
      date: "6 years ago",
      description: ""
    },
    {
      title: "Wrote a Python Script to Download Thousands of HD Wallpapers. 🔥🔥",
      url: "https://www.youtube.com/watch?v=oM7sml_0Ugw",
      thumbnail: "https://i.ytimg.com/vi/oM7sml_0Ugw/hqdefault.jpg",
      views: "252 views",
      date: "6 years ago",
      description: ""
    },
    {
      title: "Ringzer0team Easy Web CTF Challanges Writeup",
      url: "https://www.youtube.com/watch?v=5kuzLE2jTgQ",
      thumbnail: "https://i.ytimg.com/vi/5kuzLE2jTgQ/hqdefault.jpg",
      views: "2.6K views",
      date: "6 years ago",
      description: ""
    },
    {
      title: "Ringzer0ctf Various Very Easy Javascript CTF Writups.",
      url: "https://www.youtube.com/watch?v=vvvb6htcDFw",
      thumbnail: "https://i.ytimg.com/vi/vvvb6htcDFw/hqdefault.jpg",
      views: "504 views",
      date: "6 years ago",
      description: ""
    },
    {
      title: "Ringzer0ctf Ascii Art - Programming CTF Writup, Quick and Easy",
      url: "https://www.youtube.com/watch?v=dxiTkY8ZpUM",
      thumbnail: "https://i.ytimg.com/vi/dxiTkY8ZpUM/hqdefault.jpg",
      views: "666 views",
      date: "6 years ago",
      description: ""
    },
    {
      title: "Automatic Email Verification using Python | Unlimited Refferals or Signups  | Module/Script",
      url: "https://www.youtube.com/watch?v=ycUlGjmdrac",
      thumbnail: "https://i.ytimg.com/vi/ycUlGjmdrac/hqdefault.jpg",
      views: "14K views",
      date: "6 years ago",
      description: ""
    },
    {
      title: "Crypto (RSA 3) Unpadded RSA CTF | Amrita Inctf Challenges | Easy CTF Writups..",
      url: "https://www.youtube.com/watch?v=efKSmUX2VoI",
      thumbnail: "https://i.ytimg.com/vi/efKSmUX2VoI/hqdefault.jpg",
      views: "612 views",
      date: "7 years ago",
      description: ""
    },
    {
      title: "4 Hours Code+Documentation in 10 minutes | Simple Collage School HTML Project",
      url: "https://www.youtube.com/watch?v=YK6fDii5GzU",
      thumbnail: "https://i.ytimg.com/vi/YK6fDii5GzU/hqdefault.jpg",
      views: "141 views",
      date: "7 years ago",
      description: ""
    },
    {
      title: "Tutorial and install Guide to Gdrive CLI for Automation and Projects | prasmussen/gdrive",
      url: "https://www.youtube.com/watch?v=iZ16v__TpXU",
      thumbnail: "https://i.ytimg.com/vi/iZ16v__TpXU/hqdefault.jpg",
      views: "2.5K views",
      date: "7 years ago",
      description: ""
    },
    {
      title: "Crypto (RSA 2)  CTF | Amrita Inctf Challenges | Solved By Python | Easy CTF Writeups..",
      url: "https://www.youtube.com/watch?v=HaHdzhO_z-M",
      thumbnail: "https://i.ytimg.com/vi/HaHdzhO_z-M/hqdefault.jpg",
      views: "1.3K views",
      date: "7 years ago",
      description: ""
    },
    {
      title: "Forensics (True Freedom)  CTF | Amrita Inctf Challenges | Easy CTF Writeups..",
      url: "https://www.youtube.com/watch?v=F1_T2nCkwDM",
      thumbnail: "https://i.ytimg.com/vi/F1_T2nCkwDM/hqdefault.jpg",
      views: "365 views",
      date: "7 years ago",
      description: ""
    },
    {
      title: "Crypto (RSA 1) Basic CTF | Amrita Inctf Challenges | Solved By Python | Easy CTF Writeups..",
      url: "https://www.youtube.com/watch?v=9mooUgH9SOo",
      thumbnail: "https://i.ytimg.com/vi/9mooUgH9SOo/hqdefault.jpg",
      views: "2K views",
      date: "7 years ago",
      description: ""
    },
    {
      title: "Crypto (Ancient Message, Hashit and more..) CTF | Amrita Inctf | Easy CTF Writeups..",
      url: "https://www.youtube.com/watch?v=NDZytGyLNcM",
      thumbnail: "https://i.ytimg.com/vi/NDZytGyLNcM/hqdefault.jpg",
      views: "222 views",
      date: "7 years ago",
      description: ""
    },
    {
      title: "Crypto (AES Encryption)  CTF | Amrita Inctf Challenges | Easy CTF Writeups..",
      url: "https://www.youtube.com/watch?v=l5XfF5pI38U",
      thumbnail: "https://i.ytimg.com/vi/l5XfF5pI38U/hqdefault.jpg",
      views: "250 views",
      date: "7 years ago",
      description: ""
    },
    {
      title: "Forensics (Mind Your Zip and more...) CTF | Amrita Inctf Challenges | Easy CTF Writeups..",
      url: "https://www.youtube.com/watch?v=NlPiB-J6x-A",
      thumbnail: "https://i.ytimg.com/vi/NlPiB-J6x-A/hqdefault.jpg",
      views: "1.1K views",
      date: "7 years ago",
      description: ""
    },
    {
      title: "Crypto (AES Encryption)  CTF | Amrita Inctf Challenges | Easy CTF Writeups..",
      url: "https://www.youtube.com/watch?v=LxEV97FP0c4",
      thumbnail: "https://i.ytimg.com/vi/LxEV97FP0c4/hqdefault.jpg",
      views: "2.9K views",
      date: "7 years ago",
      description: ""
    },
    {
      title: "Web Section ( Admin Access, Insecure Js and more....) | Amrita Inctf Challange | Easy CTF Writeups..",
      url: "https://www.youtube.com/watch?v=VoOhUf3gGKo",
      thumbnail: "https://i.ytimg.com/vi/VoOhUf3gGKo/hqdefault.jpg",
      views: "625 views",
      date: "7 years ago",
      description: ""
    },
    {
      title: "Crypto (Easy XOR) CTF | Amrita Inctf Challenges | Easy CTF Writeups..",
      url: "https://www.youtube.com/watch?v=d_KqJ2M-8RM",
      thumbnail: "https://i.ytimg.com/vi/d_KqJ2M-8RM/hqdefault.jpg",
      views: "3.3K views",
      date: "7 years ago",
      description: ""
    },
    {
      title: "Boring School CTF | Amrita Inctf Challenges | Solved by python | Easy CTF Writeups..",
      url: "https://www.youtube.com/watch?v=86sipq2zY_4",
      thumbnail: "https://i.ytimg.com/vi/86sipq2zY_4/hqdefault.jpg",
      views: "231 views",
      date: "7 years ago",
      description: ""
    },
    {
      title: "Ringzer0ctf Writeup for  Hash Breaker",
      url: "https://www.youtube.com/watch?v=UXuT3Fv850c",
      thumbnail: "https://i.ytimg.com/vi/UXuT3Fv850c/hqdefault.jpg",
      views: "280 views",
      date: "7 years ago",
      description: ""
    },
    {
      title: "Ringzer0ctf Writeup for I Hate Mathematics Challange!",
      url: "https://www.youtube.com/watch?v=FfMOXIilQV0",
      thumbnail: "https://i.ytimg.com/vi/FfMOXIilQV0/hqdefault.jpg",
      views: "166 views",
      date: "7 years ago",
      description: ""
    },
    {
      title: "Ringzer0ctf HashMe, HashMeReloaded CTF Writup!",
      url: "https://www.youtube.com/watch?v=g9R_faL0NJg",
      thumbnail: "https://i.ytimg.com/vi/g9R_faL0NJg/hqdefault.jpg",
      views: "1.4K views",
      date: "7 years ago",
      description: ""
    },
    {
      title: "Small Instabot to Follow/unfollow Users.",
      url: "https://www.youtube.com/watch?v=YcIVPHg41rk",
      thumbnail: "https://i.ytimg.com/vi/YcIVPHg41rk/hqdefault.jpg",
      views: "122 views",
      date: "7 years ago",
      description: ""
    },
    {
      title: "Flat UI Intro/Profile Tutorial with Android Studio.",
      url: "https://www.youtube.com/watch?v=8MV4hHJV7BY",
      thumbnail: "https://i.ytimg.com/vi/8MV4hHJV7BY/hqdefault.jpg",
      views: "702 views",
      date: "7 years ago",
      description: ""
    },
    {
      title: "The minor Project, Clipy the Clipboard.",
      url: "https://www.youtube.com/watch?v=pCA0mVuWeoU",
      thumbnail: "https://i.ytimg.com/vi/pCA0mVuWeoU/hqdefault.jpg",
      views: "61 views",
      date: "7 years ago",
      description: ""
    },
    {
      title: "Another Paytm Transaction Faker App by Me",
      url: "https://www.youtube.com/watch?v=8boCcrNki3Q",
      thumbnail: "https://i.ytimg.com/vi/8boCcrNki3Q/hqdefault.jpg",
      views: "157 views",
      date: "7 years ago",
      description: ""
    },
    {
      title: "-1 Flaw in a Shopping Website (Already Patched) Cart Manipulation",
      url: "https://www.youtube.com/watch?v=DwsTras2qgc",
      thumbnail: "https://i.ytimg.com/vi/DwsTras2qgc/hqdefault.jpg",
      views: "28 views",
      date: "7 years ago",
      description: ""
    },
    {
      title: "Copied Paytm Payment UI Few Months Back For Fun Stuff. 😊",
      url: "https://www.youtube.com/watch?v=PkZExvVBQCM",
      thumbnail: "https://i.ytimg.com/vi/PkZExvVBQCM/hqdefault.jpg",
      views: "49 views",
      date: "8 years ago",
      description: ""
    },
    {
      title: "An Google Assistant Bot with All My Classmates Information 😎",
      url: "https://www.youtube.com/watch?v=DCXzJiOS8wk",
      thumbnail: "https://i.ytimg.com/vi/DCXzJiOS8wk/hqdefault.jpg",
      views: "73 views",
      date: "8 years ago",
      description: ""
    },
    {
      title: "Emoji World, Best chrome Emoji Extension. 😜",
      url: "https://www.youtube.com/watch?v=HlUazxX_C_Y",
      thumbnail: "https://i.ytimg.com/vi/HlUazxX_C_Y/hqdefault.jpg",
      views: "73 views",
      date: "8 years ago",
      description: ""
    },
    {
      title: "Php starter Project Personal Clipboard in 2x 5minutes.",
      url: "https://www.youtube.com/watch?v=qMUKJCjJjcI",
      thumbnail: "https://i.ytimg.com/vi/qMUKJCjJjcI/hqdefault.jpg",
      views: "49 views",
      date: "8 years ago",
      description: ""
    },
    {
      title: "Android Studio Project With Slider, All Subjects Included part-1.",
      url: "https://www.youtube.com/watch?v=AsycGJTwT5c",
      thumbnail: "https://i.ytimg.com/vi/AsycGJTwT5c/hqdefault.jpg",
      views: "30 views",
      date: "8 years ago",
      description: ""
    },
    {
      title: "Python Project, Web Scrapping. Bitcoin Accurate Value(Changes Per Second) Calculated in inr.",
      url: "https://www.youtube.com/watch?v=Bb0s2iXIo4w",
      thumbnail: "https://i.ytimg.com/vi/Bb0s2iXIo4w/hqdefault.jpg",
      views: "160 views",
      date: "8 years ago",
      description: ""
    },
    {
      title: "Davv Result Arrangement Ascending Order, Web Scraping using Php. Real Life Application.",
      url: "https://www.youtube.com/watch?v=hjFmAZOUC08",
      thumbnail: "https://i.ytimg.com/vi/hjFmAZOUC08/hqdefault.jpg",
      views: "1K views",
      date: "8 years ago",
      description: ""
    },
    {
      title: "Android Studio Project, DCE Conversations.  #lolman",
      url: "https://www.youtube.com/watch?v=2-oaEvZJpdc",
      thumbnail: "https://i.ytimg.com/vi/2-oaEvZJpdc/hqdefault.jpg",
      views: "23 views",
      date: "8 years ago",
      description: ""
    },
    {
      title: "Transferred Google's Game in a new Android App.",
      url: "https://www.youtube.com/watch?v=k3SFeILGR_0",
      thumbnail: "https://i.ytimg.com/vi/k3SFeILGR_0/hqdefault.jpg",
      views: "14 views",
      date: "8 years ago",
      description: ""
    },
    {
      title: "Dictionary Made in Java. #fastAF",
      url: "https://www.youtube.com/watch?v=WZcHuZwjlV4",
      thumbnail: "https://i.ytimg.com/vi/WZcHuZwjlV4/hqdefault.jpg",
      views: "59 views",
      date: "8 years ago",
      description: ""
    },
    {
      title: "Project 559",
      url: "https://www.youtube.com/watch?v=K3IhLJQ2sCY",
      thumbnail: "https://i.ytimg.com/vi/K3IhLJQ2sCY/hqdefault.jpg",
      views: "27 views",
      date: "8 years ago",
      description: ""
    },
    {
      title: "When I automated the Download of DAVV's Examination form of all students.",
      url: "https://www.youtube.com/watch?v=VmxHMvnRbzI",
      thumbnail: "https://i.ytimg.com/vi/VmxHMvnRbzI/hqdefault.jpg",
      views: "9.5K views",
      date: "8 years ago",
      description: ""
    },
    {
      title: "New Project Page",
      url: "https://www.youtube.com/watch?v=e377juq0SX4",
      thumbnail: "https://i.ytimg.com/vi/e377juq0SX4/hqdefault.jpg",
      views: "19 views",
      date: "8 years ago",
      description: ""
    },
    {
      title: "Animated Dashboard.",
      url: "https://www.youtube.com/watch?v=yVFQ6rFtgCU",
      thumbnail: "https://i.ytimg.com/vi/yVFQ6rFtgCU/hqdefault.jpg",
      views: "312 views",
      date: "8 years ago",
      description: ""
    },
    {
      title: "Java Basics Part-2. Eclipse Easy Tutorial",
      url: "https://www.youtube.com/watch?v=WfI0AUrbI3s",
      thumbnail: "https://i.ytimg.com/vi/WfI0AUrbI3s/hqdefault.jpg",
      views: "10 views",
      date: "8 years ago",
      description: ""
    },
    {
      title: "Solving \"java was started but returned exit code 13 while installing eclips\"",
      url: "https://www.youtube.com/watch?v=oG827dC5Cqk",
      thumbnail: "https://i.ytimg.com/vi/oG827dC5Cqk/hqdefault.jpg",
      views: "723 views",
      date: "8 years ago",
      description: ""
    },
    {
      title: "When My Name Was Announced For Winning Max Teweeting Competition TCSITWiz",
      url: "https://www.youtube.com/watch?v=JlY3j00Rl3w",
      thumbnail: "https://i.ytimg.com/vi/JlY3j00Rl3w/hqdefault.jpg",
      views: "109 views",
      date: "9 years ago",
      description: ""
    },
    {
      title: "I Don't Usually Spam But When i Do, I Kill it.",
      url: "https://www.youtube.com/watch?v=2vLzxtmSs-c",
      thumbnail: "https://i.ytimg.com/vi/2vLzxtmSs-c/hqdefault.jpg",
      views: "342 views",
      date: "9 years ago",
      description: ""
    }
  ],
  articles: [
    {
      title: "Security Researcher Earns $1,600 Google Bug Bounty for Firebase Vulnerability Discovery",
      source: "Tech Security News",
      date: "Jan 2025",
      url: "#",
      snippet: "Indian developer Satyam Gupta with his friend Nandan T has been awarded a $1,600 bounty by Google's Security Team after discovering a critical vulnerability in Firebase Cloud Messaging."
    },
    {
      title: "Developer Creates 100+ Privacy-Focused Browser Tools Using Custom Framework",
      source: "IndieHackers",
      date: "Feb 2025",
      url: "https://lolman.tools",
      snippet: "Software developer Satyam Gupta has launched Lolman.Tools, a collection of over 100 privacy-focused utilities that run entirely in the browser. The platform leverages WebAssembly and AI integration while maintaining a consistent user experience across all tools."
    },
    {
      title: "Young Tech Lead Makes History as Youngest Speaker at WordCamp Delhi 2024",
      source: "WordPress News India",
      date: "Dec 2024",
      url: "#",
      snippet: "In an inspiring turn of events, Satyam Gupta became the youngest speaker at WordCamp Delhi 2024, sharing insights on push notification growth strategies."
    },
    {
      title: "Indian Entrepreneur Details Journey of Scaling SaaS Platform to 10,000+ Users",
      source: "Tech Founders Daily",
      date: "Jun 2023",
      url: "#",
      snippet: "Founder Satyam Gupta shares the technical journey behind LaraPush, detailing how he architected and scaled a push notification platform from zero to handling millions of messages daily."
    },
    {
      title: "Satyam Achieves AWS Developer Certification, Expands Cloud Expertise",
      source: "Satyam Gupta Blog",
      date: "Jul 2022",
      url: "#",
      snippet: "After months of preparation and hands-on experience with AWS services, I'm excited to share that I've earned my AWS Certified Developer Associate certification."
    },
    {
      title: "Satyam Begins Cloud Journey with AWS Cloud Practitioner Certification",
      source: "Satyam Gupta Blog",
      date: "Apr 2021",
      url: "#",
      snippet: "I'm thrilled to announce that I've successfully earned my AWS Cloud Practitioner certification! This foundational certification marks the beginning of my cloud computing journey and demonstrates my commitment to building and deploying scalable cloud-based applications."
    }
  ],
  images: [
    {
      title: "Satyam on Regular Day",
      url: "/images/me-on-regular-day.jpg",
      source: "Personal",
      contextLink: "https://imlolman.github.io"
    },
    {
      title: "Satyam Speaking at WordCamp",
      url: "/images/me-on-stage.jpeg",
      source: "WordCamp Delhi",
      contextLink: "https://imlolman.github.io"
    },
    {
      title: "Focused on Stage",
      url: "/images/me-on-stage-focus.jpg",
      source: "WordCamp Delhi",
      contextLink: "https://imlolman.github.io"
    },
    {
      title: "Speaking at Event",
      url: "/images/me-on-small-stage.jpg",
      source: "Tech Event",
      contextLink: "https://imlolman.github.io"
    },
    {
      title: "With LaraPush Team",
      url: "/images/me-with-larapush-team.jpeg",
      source: "Brandzzy",
      contextLink: "https://larapush.com"
    },
    {
      title: "WordCamp Sponsorship",
      url: "/images/we-sponsered-wordcamp.jpg",
      source: "WordCamp Delhi",
      contextLink: "https://larapush.com"
    },
    {
      title: "Team Outing",
      url: "/images/me-on-team-outing.jpg",
      source: "Brandzzy",
      contextLink: "https://brandzzy.com"
    },
    {
      title: "Visiting Bhutan",
      url: "/images/me-visiting-bhutan.jpg",
      source: "Personal",
      contextLink: "https://imlolman.github.io"
    }
  ]
};