import type { PortfolioContent } from "@/types/content";

export const defaultContent: PortfolioContent = {
  profile: {
    name: "Pawan Shrestha",
    headline: "Computer engineer. I build models and software that measure the real world.",
    shortBio: "Computer Engineering graduate who trains computer-vision models on satellite imagery and ships full-stack apps. Most recent work: a U-Net that predicts urban expansion in Nepali cities with 85% accuracy.",
    bio: "I'm Pawan Shrestha, a Computer Engineering graduate from Nepal Engineering College. I spent my final year training a U-Net on satellite imagery to forecast urban sprawl across Kathmandu, Lalitpur, and Bhaktapur — it hit 85% accuracy on land-classification. I also build practical web apps end to end: a complaint-reporting platform for city maintenance and a music-sharing social app. I write Python and TypeScript daily, and I care about models that hold up outside a Jupyter notebook: real data pipelines, real APIs, real deployments. I'm looking for a junior role in software engineering, ML, or data science where I can do that work for a product with users.",
    avatar: "/images/pawan-avatar.jpeg",
    resumeUrl: "/resume/Pawan_Shrestha_CV.pdf",
    email: "pawan.shrestha@example.com",
    location: "Kathmandu, Nepal",
    availability: "Open to junior software, AI, and data science opportunities"
  },
  settings: {
    siteTitle: "Pawan Shrestha — Computer Engineer",
    metaDescription: "I train computer-vision models on satellite imagery and ship the full-stack apps that use them. Built a U-Net forecasting urban sprawl in Nepali cities at 85% accuracy.",
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
      id: "urban-sprawl",
      title: "Urban Sprawl Prediction",
      summary: "A U-Net that forecasts where Kathmandu, Lalitpur, and Bhaktapur will grow by 2030.",
      description: "Trained a U-Net on Landsat satellite imagery to classify built-up vs non-built-up land, reaching 85% accuracy across the three cities. Chained into a ConvLSTM that extends classifications forward to produce 2030 sprawl maps at 78% precision.",
      stack: ["Python", "TensorFlow", "Pandas", "Scikit-learn"],
      image: "/images/project-urban.png",
      liveUrl: "",
      repoUrl: "https://github.com/PawanSths/UrbanSprawlPrediction",
      featured: true,
      status: "published"
    },
    {
      id: "cleancity",
      title: "CleanCity",
      summary: "A civic reporting platform where a photo and GPS pin log a city issue for officials to resolve.",
      description: "Residents upload a photo of a problem — garbage, a pothole, a blocked drain — with their location. An AI model classifies the issue type to route it to the right department, and officials track and close complaints in an admin dashboard.",
      stack: ["Next.js", "React", "TypeScript", "Supabase"],
      image: "/images/project-cleancity.png",
      liveUrl: "",
      repoUrl: "https://github.com/PawanSths/Cleancity",
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
      summary: "Final-year thesis was the urban sprawl U-Net. Core coursework covered algorithms, databases, OS, networks, and AI — and I pulled most of it into hands-on projects rather than leaving it in lectures.",
      status: "published"
    }
  ],
  experience: [
    {
      id: "placeholder-internship",
      title: "Web Development Intern",
      organization: "Aramex",
      location: "Kathmandu, Nepal",
      startDate: "2025",
      endDate: "2025",
      summary: "Shipped and maintained features on the company website, ran functional testing, and integrated frontend components with the backend team's REST endpoints.",
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
