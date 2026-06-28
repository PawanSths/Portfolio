import type { PortfolioContent } from "@/types/content";

export const defaultContent: PortfolioContent = {
  profile: {
    name: "Pawan Shrestha",
    headline: "Computer Engineering Graduate | AI & Data Science Enthusiast",
    shortBio: "Recently graduated from Nepal Engineering College with a Bachelor's in Computer Engineering. Passionate about building intelligent systems with Python, machine learning, and data-driven software.",
    bio: "I'm Pawan Shrestha, a Computer Engineering graduate from Nepal Engineering College. I love exploring technology and solving problems through code. My interests include Artificial Intelligence, Machine Learning, Data Science, and Software Development. I enjoy working on projects that help me learn new skills and create useful solutions. I am eager to begin my professional journey and contribute to innovative and impactful projects. Currently seeking opportunities in Software Engineering, AI/ML, and Data Science to grow my skills and gain industry experience.",
    avatar: "/images/pawan-avatar.svg",
    resumeUrl: "/resume/pawan-shrestha-resume.pdf",
    email: "pawan.shrestha@example.com",
    location: "Kathmandu, Nepal",
    availability: "Open to junior software, AI, and data science opportunities"
  },
  settings: {
    siteTitle: "Pawan Shrestha | AI & Software Portfolio",
    metaDescription: "Portfolio for Pawan Shrestha, a computer engineering graduate interested in AI, machine learning, Python, and data science.",
    theme: "system",
    sectionOrder: [
      "hero",
      "about",
      "skills",
      "projects",
      "education",
      "experience",
      "certifications",
      "achievements",
      "contact"
    ]
  },
  socials: [
    { id: "github", label: "GitHub", url: "https://github.com/", icon: "github" },
    { id: "linkedin", label: "LinkedIn", url: "https://www.linkedin.com/", icon: "linkedin" },
    { id: "email", label: "Email", url: "mailto:pawan.shrestha@example.com", icon: "mail" }
  ],
  skills: [
    { id: "javascript", name: "JavaScript", category: "Languages", level: 75, featured: true, status: "published" },
    { id: "python", name: "Python", category: "Languages", level: 92, featured: true, status: "published" },
    { id: "html", name: "HTML", category: "Languages", level: 80, featured: true, status: "published" },
    { id: "css", name: "CSS", category: "Languages", level: 75, featured: true, status: "published" },
    { id: "react", name: "React", category: "Frameworks & Libraries", level: 74, featured: true, status: "published" },
    { id: "pandas", name: "Pandas", category: "Frameworks & Libraries", level: 88, featured: true, status: "published" },
    { id: "numpy", name: "NumPy", category: "Frameworks & Libraries", level: 85, featured: true, status: "published" },
    { id: "sql", name: "SQL", category: "Databases", level: 78, featured: true, status: "published" },
    { id: "vscode", name: "VS Code", category: "Developer Tools", level: 90, featured: true, status: "published" },
    { id: "git", name: "Git", category: "Developer Tools", level: 82, featured: true, status: "published" },
    { id: "github", name: "GitHub", category: "Developer Tools", level: 82, featured: true, status: "published" },
    { id: "notebook", name: "Jupyter Notebook", category: "Developer Tools", level: 86, featured: true, status: "published" },
    { id: "ml", name: "Machine Learning", category: "Concepts", level: 82, featured: true, status: "published" },
    { id: "data-science", name: "Data Science", category: "Concepts", level: 84, featured: true, status: "published" },
    { id: "rest-apis", name: "REST APIs", category: "Concepts", level: 80, featured: true, status: "published" }
  ],
  projects: [
    {
      id: "traffic-vision",
      title: "Traffic Pattern Vision Lab",
      summary: "A computer vision dashboard for exploring traffic density trends from video frames.",
      description: "Prototype combining Python analysis, model inference, and a clean dashboard to visualize congestion patterns.",
      stack: ["Python", "OpenCV", "Pandas", "React"],
      image: "/images/project-traffic.svg",
      liveUrl: "",
      repoUrl: "https://github.com/",
      featured: true,
      status: "published"
    },
    {
      id: "student-risk",
      title: "Student Success Predictor",
      summary: "An ML model that identifies at-risk students early using academic data with explainable results.",
      description: "A practical ML workflow using cleaned tabular data, model comparison, and interpretable feature importance.",
      stack: ["Python", "scikit-learn", "SQL", "Streamlit"],
      image: "/images/project-student.svg",
      liveUrl: "",
      repoUrl: "https://github.com/",
      featured: true,
      status: "published"
    }
  ],
  education: [
    {
      id: "nec-bce",
      title: "Bachelor's in Computer Engineering",
      organization: "Nepal Engineering College",
      location: "Bhaktapur, Nepal",
      startDate: "2019",
      endDate: "2024",
      summary: "Graduated with coursework across software engineering, algorithms, databases, computer networks, AI foundations, and engineering practice.",
      status: "published"
    }
  ],
  experience: [
    {
      id: "placeholder-internship",
      title: "Software Engineering Intern",
      organization: "Placeholder Organization",
      location: "Kathmandu, Nepal",
      startDate: "2024",
      endDate: "2024",
      summary: "Placeholder experience entry. Replace with a real internship, project work, or freelance engagement.",
      status: "published"
    }
  ],
  achievements: [
    {
      id: "capstone",
      title: "Engineering Capstone Ready",
      summary: "Prepared to showcase final-year engineering work, experiments, and measurable outcomes.",
      year: "2024",
      status: "published"
    },
    {
      id: "learning-track",
      title: "AI and Data Science Focus",
      summary: "Built a learning path around Python, data analysis, machine learning workflows, and modern software engineering practices.",
      year: "2025",
      status: "published"
    }
  ],
  certifications: [
    {
      id: "placeholder-cert",
      title: "Example Certification",
      issuer: "Coursera",
      date: "2025",
      credentialUrl: "https://coursera.org/",
      summary: "Replace with a real certification from a recognized platform.",
      status: "published"
    }
  ],
  media: []
};
