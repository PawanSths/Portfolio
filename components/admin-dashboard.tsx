"use client";

import { ArrowDown, ArrowUp, Eye, ImagePlus, LogOut, Plus, Save, Trash2 } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import type { Achievement, Certification, PortfolioContent, Project, Skill, SocialLink, TimelineEntry } from "@/types/content";
import { ThemeToggle } from "@/components/theme-toggle";

type Tab = "profile" | "projects" | "skills" | "education" | "experience" | "achievements" | "certifications" | "socials" | "settings" | "media";
type EditableItem = Project | Skill | TimelineEntry | Achievement | Certification | SocialLink;

const tabs: { id: Tab; label: string }[] = [
  { id: "profile", label: "Profile" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "education", label: "Education" },
  { id: "experience", label: "Experience" },
  { id: "achievements", label: "Achievements" },
  { id: "certifications", label: "Certifications" },
  { id: "socials", label: "Socials" },
  { id: "settings", label: "Settings" },
  { id: "media", label: "Media" }
];

export function AdminDashboard() {
  const [content, setContent] = useState<PortfolioContent | null>(null);
  const [activeTab, setActiveTab] = useState<Tab>("profile");
  const [selectedId, setSelectedId] = useState<string>("");
  const [status, setStatus] = useState("Loading dashboard...");
  const [login, setLogin] = useState({ email: "admin@pawan.dev", password: "" });
  const [authed, setAuthed] = useState(false);

  useEffect(() => {
    loadContent();
  }, []);

  async function loadContent() {
    const response = await fetch("/api/admin/content");
    if (response.status === 401) {
      setStatus("Please log in to manage the portfolio.");
      return;
    }
    const data = (await response.json()) as PortfolioContent;
    setContent(data);
    setAuthed(true);
    setStatus("Dashboard ready.");
  }

  async function submitLogin(event: React.FormEvent) {
    event.preventDefault();
    setStatus("Checking credentials...");
    const response = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(login)
    });

    if (!response.ok) {
      setStatus("Invalid credentials. Check .env for ADMIN_EMAIL and ADMIN_PASSWORD.");
      return;
    }

    await loadContent();
  }

  async function save() {
    if (!content) return;
    setStatus("Saving changes...");
    const response = await fetch("/api/admin/content", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(content)
    });

    if (!response.ok) {
      setStatus("Save failed. Check required fields and URL formats.");
      return;
    }

    setContent((await response.json()) as PortfolioContent);
    setStatus("Saved. Public portfolio now uses the updated published content.");
  }

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    setAuthed(false);
    setContent(null);
    setStatus("Logged out.");
  }

  if (!authed || !content) {
    return (
      <main className="admin-layout">
        <div className="container section">
          <form className="panel contact-form" onSubmit={submitLogin} style={{ maxWidth: 460, margin: "0 auto" }}>
            <div className="nav-actions" style={{ justifyContent: "flex-end", marginBottom: 8 }}>
              <ThemeToggle />
            </div>
            <p className="eyebrow">Portfolio Admin</p>
            <h1>Login</h1>
            <p className="notice">{status}</p>
            <Field label="Email" value={login.email} onChange={(value) => setLogin({ ...login, email: value })} />
            <Field label="Password" type="password" value={login.password} onChange={(value) => setLogin({ ...login, password: value })} />
            <button className="button primary" type="submit">
              Login
            </button>
          </form>
        </div>
      </main>
    );
  }

  const stats = [
    ["Projects", content.projects.length],
    ["Skills", content.skills.length],
    ["Timeline", content.education.length + content.experience.length],
    ["Certs", content.certifications.length],
    ["Media", content.media.length]
  ];

  return (
    <main className="admin-layout">
      <div className="admin-shell">
        <aside className="admin-sidebar">
          <div className="brand">
            <span className="brand-mark">PS</span>
            <span>Admin</span>
          </div>
          <div className="admin-tabs">
            {tabs.map((tab) => (
              <button className={`button admin-tab ${activeTab === tab.id ? "active" : ""}`} key={tab.id} onClick={() => setActiveTab(tab.id)}>
                {tab.label}
              </button>
            ))}
          </div>
        </aside>

        <section className="admin-main">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Content Studio</p>
              <h1>{content.profile.name}</h1>
            </div>
            <div className="nav-actions">
              <ThemeToggle />
              <a className="button" href="/" target="_blank">
                <Eye size={18} /> Preview
              </a>
              <button className="button primary" onClick={save}>
                <Save size={18} /> Save
              </button>
              <button className="icon-button" onClick={logout} aria-label="Log out" title="Log out">
                <LogOut size={18} />
              </button>
            </div>
          </div>
          <p className="notice">{status}</p>
          <div className="dashboard-grid">
            {stats.map(([label, value]) => (
              <div className="stat" key={label}>
                <strong>{value}</strong>
                <span>{label}</span>
              </div>
            ))}
          </div>
          <AdminPanel content={content} setContent={setContent} activeTab={activeTab} selectedId={selectedId} setSelectedId={setSelectedId} setStatus={setStatus} />
        </section>
      </div>
    </main>
  );
}

function AdminPanel({
  content,
  setContent,
  activeTab,
  selectedId,
  setSelectedId,
  setStatus
}: {
  content: PortfolioContent;
  setContent: (content: PortfolioContent) => void;
  activeTab: Tab;
  selectedId: string;
  setSelectedId: (id: string) => void;
  setStatus: (status: string) => void;
}) {
  if (activeTab === "profile") {
    return (
      <div className="panel form-grid">
        {Object.entries(content.profile).map(([key, value]) => (
          <Field
            key={key}
            label={labelize(key)}
            value={String(value)}
            multiline={key === "bio" || key === "shortBio"}
            onChange={(next) => setContent({ ...content, profile: { ...content.profile, [key]: next } })}
          />
        ))}
      </div>
    );
  }

  if (activeTab === "settings") {
    return (
      <div className="panel form-grid">
        <Field label="Site title" value={content.settings.siteTitle} onChange={(value) => setContent({ ...content, settings: { ...content.settings, siteTitle: value } })} />
        <Field label="Meta description" value={content.settings.metaDescription} multiline onChange={(value) => setContent({ ...content, settings: { ...content.settings, metaDescription: value } })} />
        <Field label="Section order" value={content.settings.sectionOrder.join(", ")} multiline onChange={(value) => setContent({ ...content, settings: { ...content.settings, sectionOrder: value.split(",").map((item) => item.trim()).filter(Boolean) } })} />
        <div className="field">
          <label>Theme preference</label>
          <select value={content.settings.theme} onChange={(event) => setContent({ ...content, settings: { ...content.settings, theme: event.target.value as PortfolioContent["settings"]["theme"] } })}>
            <option value="system">System</option>
            <option value="light">Light</option>
            <option value="dark">Dark</option>
          </select>
        </div>
      </div>
    );
  }

  if (activeTab === "media") {
    return <MediaPanel content={content} setContent={setContent} setStatus={setStatus} />;
  }

  const items = content[activeTab] as EditableItem[];
  const selected = items.find((item) => item.id === selectedId) || items[0];

  return (
    <div className="editor-grid">
      <div className="panel">
        <div className="nav-actions" style={{ justifyContent: "space-between", marginBottom: 14 }}>
          <h2>{labelize(activeTab)}</h2>
          <button className="icon-button" onClick={() => addItem(activeTab, content, setContent, setSelectedId)} aria-label="Add item" title="Add item">
            <Plus size={18} />
          </button>
        </div>
        <div className="editor-list">
          {items.map((item, index) => (
            <div className="nav-actions" key={item.id}>
              <button className={`button list-button ${selected?.id === item.id ? "active" : ""}`} onClick={() => setSelectedId(item.id)}>
                {getTitle(item)}
              </button>
              <button className="icon-button" onClick={() => moveItem(activeTab, index, -1, content, setContent)} aria-label="Move up" title="Move up">
                <ArrowUp size={16} />
              </button>
              <button className="icon-button" onClick={() => moveItem(activeTab, index, 1, content, setContent)} aria-label="Move down" title="Move down">
                <ArrowDown size={16} />
              </button>
            </div>
          ))}
        </div>
      </div>
      <div className="panel">
        {selected ? (
          <ItemForm
            item={selected}
            onChange={(item) => updateItem(activeTab, item, content, setContent)}
            onDelete={() => deleteItem(activeTab, selected.id, content, setContent, setSelectedId)}
          />
        ) : (
          <p className="notice">No items yet. Add one to start editing.</p>
        )}
      </div>
    </div>
  );
}

function ItemForm({ item, onChange, onDelete }: { item: EditableItem; onChange: (item: EditableItem) => void; onDelete: () => void }) {
  const fields = useMemo(() => Object.entries(item).filter(([key]) => key !== "id"), [item]);

  return (
    <div className="form-grid">
      {fields.map(([key, value]) => {
        if (typeof value === "boolean") {
          return (
            <label className="field" key={key}>
              {labelize(key)}
              <select value={String(value)} onChange={(event) => onChange({ ...item, [key]: event.target.value === "true" })}>
                <option value="true">Yes</option>
                <option value="false">No</option>
              </select>
            </label>
          );
        }

        if (key === "status") {
          return (
            <label className="field" key={key}>
              Status
              <select value={String(value)} onChange={(event) => onChange({ ...item, status: event.target.value as "published" | "draft" })}>
                <option value="published">Published</option>
                <option value="draft">Draft</option>
              </select>
            </label>
          );
        }

        return (
          <Field
            key={key}
            label={labelize(key)}
            value={Array.isArray(value) ? value.join(", ") : String(value)}
            multiline={["summary", "description", "quote", "excerpt"].includes(key)}
            type={typeof value === "number" ? "number" : "text"}
            onChange={(next) => onChange({ ...item, [key]: Array.isArray(value) ? next.split(",").map((part) => part.trim()).filter(Boolean) : typeof value === "number" ? Number(next) : next })}
          />
        );
      })}
      <button className="button" type="button" onClick={onDelete}>
        <Trash2 size={18} /> Delete
      </button>
    </div>
  );
}

function MediaPanel({ content, setContent, setStatus }: { content: PortfolioContent; setContent: (content: PortfolioContent) => void; setStatus: (status: string) => void }) {
  async function upload(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);
    setStatus("Uploading media...");
    const response = await fetch("/api/admin/media", { method: "POST", body: formData });
    if (!response.ok) {
      setStatus("Upload failed. Use PNG, JPG, WEBP, SVG, or PDF under 4MB.");
      return;
    }
    const asset = await response.json();
    setContent({ ...content, media: [asset, ...content.media] });
    setStatus("Media uploaded. Use its URL in image or resume fields.");
  }

  return (
    <div className="panel">
      <label className="button">
        <ImagePlus size={18} /> Upload file
        <input type="file" accept="image/png,image/jpeg,image/webp,image/svg+xml,application/pdf" onChange={upload} hidden />
      </label>
      <div className="editor-list" style={{ marginTop: 18 }}>
        {content.media.map((asset) => (
          <div className="notice" key={asset.id}>
            <strong>{asset.name}</strong>
            <p>{asset.url}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function Field({ label, value, onChange, type = "text", multiline = false }: { label: string; value: string; onChange: (value: string) => void; type?: string; multiline?: boolean }) {
  return (
    <label className={`field ${multiline ? "full" : ""}`}>
      {label}
      {multiline ? <textarea value={value} onChange={(event) => onChange(event.target.value)} /> : <input type={type} value={value} onChange={(event) => onChange(event.target.value)} />}
    </label>
  );
}

function addItem(tab: Tab, content: PortfolioContent, setContent: (content: PortfolioContent) => void, setSelectedId: (id: string) => void) {
  const id = crypto.randomUUID();
  const item = blankItem(tab, id);
  const next = { ...content, [tab]: [item, ...((content[tab] as EditableItem[]) || [])] } as PortfolioContent;
  setContent(next);
  setSelectedId(id);
}

function updateItem(tab: Tab, item: EditableItem, content: PortfolioContent, setContent: (content: PortfolioContent) => void) {
  const nextItems = (content[tab] as EditableItem[]).map((existing) => (existing.id === item.id ? item : existing));
  setContent({ ...content, [tab]: nextItems } as PortfolioContent);
}

function deleteItem(tab: Tab, id: string, content: PortfolioContent, setContent: (content: PortfolioContent) => void, setSelectedId: (id: string) => void) {
  const nextItems = (content[tab] as EditableItem[]).filter((item) => item.id !== id);
  setContent({ ...content, [tab]: nextItems } as PortfolioContent);
  setSelectedId(nextItems[0]?.id || "");
}

function moveItem(tab: Tab, index: number, direction: -1 | 1, content: PortfolioContent, setContent: (content: PortfolioContent) => void) {
  const items = [...(content[tab] as EditableItem[])];
  const nextIndex = index + direction;
  if (nextIndex < 0 || nextIndex >= items.length) return;
  [items[index], items[nextIndex]] = [items[nextIndex], items[index]];
  setContent({ ...content, [tab]: items } as PortfolioContent);
}

function blankItem(tab: Tab, id: string): EditableItem {
  const baseStatus = { id, status: "draft" as const };
  if (tab === "projects") return { ...baseStatus, title: "New project", summary: "Replace this project summary.", description: "Replace this project description.", stack: ["Python"], image: "/images/project-cms.svg", liveUrl: "", repoUrl: "", featured: false };
  if (tab === "skills") return { ...baseStatus, name: "New skill", category: "Languages", level: 70, featured: false };
  if (tab === "education" || tab === "experience") return { ...baseStatus, title: "New entry", organization: "Organization", location: "Location", startDate: "2026", endDate: "Present", summary: "Replace this timeline summary." };
  if (tab === "achievements") return { ...baseStatus, title: "New achievement", summary: "Replace this achievement summary.", year: "2026" };
  if (tab === "certifications") return { ...baseStatus, title: "New certification", issuer: "Issuer", date: "2026", credentialUrl: "https://example.com", summary: "Replace this certification summary." };
  return { id, label: "New link", url: "https://example.com", icon: "link" };
}

function getTitle(item: EditableItem) {
  if ("title" in item) return item.title;
  if ("name" in item) return item.name;
  if ("label" in item) return item.label;
  return "Untitled";
}

function labelize(value: string) {
  return value.replace(/([A-Z])/g, " $1").replace(/^./, (char) => char.toUpperCase());
}
