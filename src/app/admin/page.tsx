"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Users, FileText, Plus, Trash2, Edit,
  X, Github, LogOut
} from "lucide-react";
import { useData } from "@/context/DataContext";
import { Button } from "@/components/ui/button";
import { TeamMember, BlogPost } from "@/types";
import { useToast } from "@/hooks/use-toast";
import Image from "next/image";

import { verifyAdminPassword } from "@/lib/actions";

export default function AdminDashboard() {
  const {
    members, blogs,
    addMember, updateMember, deleteMember,
    addBlog, updateBlog, deleteBlog
  } = useData();
  const { toast } = useToast();

  // ── Auth ──
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isAuthLoaded, setIsAuthLoaded] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("cfc_admin_auth");
    if (saved === "true") setIsAuthenticated(true);
    setIsAuthLoaded(true);
  }, []);

  useEffect(() => {
    if (isAuthLoaded) {
      localStorage.setItem("cfc_admin_auth", isAuthenticated ? "true" : "false");
    }
  }, [isAuthenticated, isAuthLoaded]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    try {
      const isValid = await verifyAdminPassword(password);
      if (isValid) setIsAuthenticated(true);
      else setError("Wrong key.");
    } catch {
      setError("Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("cfc_admin_auth");
  };

  // ── Panel state ──
  const [activeTab, setActiveTab] = useState<"members" | "blogs">("members");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);

  const [memberForm, setMemberForm] = useState<Omit<TeamMember, "id">>({
    name: "", role: "", roleType: "Developer", avatar: "", bio: "",
    github: "", linkedin: "", twitter: ""
  });

  const [blogForm, setBlogForm] = useState<Omit<BlogPost, "id">>({
    title: "", excerpt: "", content: "", author: "", date: "",
    image: "", tags: []
  });

  useEffect(() => {
    setBlogForm(prev => ({ ...prev, date: new Date().toISOString().split("T")[0] }));
  }, []);

  useEffect(() => {
    setEditingId(null);
    setShowAddForm(false);
  }, [activeTab]);

  // ── Handlers ──
  const resetMemberForm = () => setMemberForm({
    name: "", role: "", roleType: "Developer", avatar: "", bio: "",
    github: "", linkedin: "", twitter: ""
  });

  const resetBlogForm = () => setBlogForm({
    title: "", excerpt: "", content: "", author: "",
    date: new Date().toISOString().split("T")[0], image: "", tags: []
  });

  const handleAddMember = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      updateMember(editingId, memberForm);
      toast({ title: "Updated", description: `${memberForm.name} has been updated.` });
    } else {
      addMember(memberForm);
      toast({ title: "Added", description: `${memberForm.name} joined the roster.` });
    }
    setEditingId(null);
    resetMemberForm();
    setShowAddForm(false);
  };

  const handleAddBlog = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      updateBlog(editingId, blogForm);
      toast({ title: "Updated", description: "Article saved." });
    } else {
      addBlog(blogForm);
      toast({ title: "Published", description: "New article is live." });
    }
    setEditingId(null);
    resetBlogForm();
    setShowAddForm(false);
  };

  const handleEditMember = (member: TeamMember) => {
    setMemberForm({ ...member });
    setEditingId(member.id);
    setShowAddForm(true);
  };

  const handleEditBlog = (blog: BlogPost) => {
    setBlogForm({ ...blog });
    setEditingId(blog.id);
    setShowAddForm(true);
  };

  const openAdd = () => {
    setEditingId(null);
    if (activeTab === "members") resetMemberForm();
    else resetBlogForm();
    setShowAddForm(true);
  };

  // ── Input helper ──
  const inputClass = "w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-sm text-white outline-none focus:border-purple-500 transition-colors placeholder:text-gray-600";
  const labelClass = "block text-[11px] font-semibold uppercase tracking-wider text-gray-500 mb-1.5";

  // ── Screens ──
  if (!isAuthLoaded) return <div className="min-h-screen bg-slate-950" />;

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="w-full max-w-sm"
        >
          <div className="border border-purple-500/30 rounded-2xl bg-gradient-to-br from-black/60 to-black/40 backdrop-blur-xl p-8 shadow-[6px_6px_0px_rgba(168,85,247,0.15)]">
            <h1 className="text-2xl font-extrabold uppercase tracking-tight text-center mb-1 text-white">
              Admin<span className="text-purple-500">.</span>
            </h1>
            <p className="text-gray-500 text-xs text-center uppercase tracking-widest mb-8">
              Restricted access
            </p>

            <form onSubmit={handleLogin} className="space-y-5">
              <div>
                <label className={labelClass}>Secret key</label>
                <input
                  type="password"
                  className={`${inputClass} text-center font-mono tracking-[0.3em]`}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  autoFocus
                />
                {error && (
                  <p className="text-red-400 text-[10px] mt-2 text-center uppercase tracking-widest font-semibold">
                    {error}
                  </p>
                )}
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3.5 bg-purple-600 hover:bg-purple-700 disabled:opacity-40 text-white text-xs font-bold uppercase tracking-widest rounded-lg border border-purple-500 transition-all duration-200 hover:shadow-[4px_4px_0px_rgba(168,85,247,0.3)] hover:translate-y-[-1px]"
              >
                {isLoading ? "Verifying..." : "Enter"}
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    );
  }

  // ── Dashboard ──
  return (
    <div className="min-h-screen bg-slate-950 text-white pt-28 pb-16 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">

        {/* Header row */}
        <div className="flex items-center justify-between mb-10">
          <div>
            <h1 className="text-3xl sm:text-4xl font-extrabold uppercase tracking-tight">
              Admin<span className="text-purple-500">.</span>
            </h1>
            <p className="text-gray-500 text-xs uppercase tracking-widest mt-1">
              {members.length} members · {blogs.length} posts
            </p>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-gray-600 hover:text-red-400 text-xs uppercase tracking-widest font-semibold transition-colors"
          >
            <LogOut size={14} /> Sign out
          </button>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-3 mb-8">
          {(["members", "blogs"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs font-bold uppercase tracking-widest border transition-all duration-200 ${
                activeTab === tab
                  ? "bg-purple-600 border-purple-500 text-white shadow-[4px_4px_0px_rgba(168,85,247,0.25)]"
                  : "bg-transparent border-white/10 text-gray-500 hover:text-white hover:border-white/20"
              }`}
            >
              {tab === "members" ? <Users size={14} /> : <FileText size={14} />}
              {tab}
            </button>
          ))}

          <div className="flex-1" />

          <button
            onClick={openAdd}
            className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs font-bold uppercase tracking-widest bg-white/5 border border-white/10 text-gray-400 hover:text-purple-400 hover:border-purple-500/40 transition-all duration-200"
          >
            <Plus size={14} /> New
          </button>
        </div>

        {/* List */}
        <AnimatePresence mode="wait">
          {activeTab === "members" ? (
            <motion.div
              key="m"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="space-y-3"
            >
              {members.length === 0 && (
                <p className="text-gray-600 text-sm py-16 text-center">No members yet.</p>
              )}
              {members.map((member) => (
                <div
                  key={member.id}
                  className="group flex items-center gap-4 sm:gap-5 p-4 sm:p-5 rounded-xl border border-white/5 bg-white/[0.02] hover:border-purple-500/30 transition-all duration-200"
                >
                  <div className="relative shrink-0">
                    <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-purple-500/20 bg-black">
                      <Image
                        src={member.avatar || "https://github.com/shadcn.png"}
                        alt={member.name}
                        width={48}
                        height={48}
                        className="object-cover w-full h-full"
                        unoptimized
                      />
                    </div>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-sm font-bold truncate">{member.name}</span>
                      <span className={`px-1.5 py-0.5 rounded text-[9px] font-bold uppercase tracking-tight ${
                        member.roleType === "Founder" ? "bg-purple-500/15 text-purple-400" :
                        member.roleType === "OG Member" ? "bg-blue-500/15 text-blue-400" :
                        "bg-white/5 text-gray-500"
                      }`}>
                        {member.roleType}
                      </span>
                    </div>
                    <p className="text-gray-500 text-xs mt-0.5 truncate">{member.role}</p>
                  </div>

                  <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => handleEditMember(member)}
                      className="p-2 rounded-lg text-gray-500 hover:text-white hover:bg-white/5 transition-colors"
                    >
                      <Edit size={15} />
                    </button>
                    <button
                      onClick={() => {
                        deleteMember(member.id);
                        toast({ title: "Removed", description: `${member.name} was removed.` });
                      }}
                      className="p-2 rounded-lg text-gray-500 hover:text-red-400 hover:bg-red-500/5 transition-colors"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="b"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="space-y-3"
            >
              {blogs.length === 0 && (
                <p className="text-gray-600 text-sm py-16 text-center">No posts yet.</p>
              )}
              {blogs.map((blog) => (
                <div
                  key={blog.id}
                  className="group flex items-center gap-5 p-4 sm:p-5 rounded-xl border border-white/5 bg-white/[0.02] hover:border-purple-500/30 transition-all duration-200"
                >
                  {blog.image && (
                    <div className="shrink-0 w-16 h-11 rounded-lg overflow-hidden border border-white/5 bg-black">
                      <img src={blog.image} alt="" className="w-full h-full object-cover" />
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <span className="text-sm font-bold truncate block">{blog.title}</span>
                    <div className="flex items-center gap-3 mt-0.5">
                      <span className="text-gray-600 text-[10px] uppercase tracking-widest">{blog.date}</span>
                      <span className="text-gray-600 text-[10px]">·</span>
                      <span className="text-gray-500 text-[10px] uppercase tracking-widest">{blog.author}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => handleEditBlog(blog)}
                      className="p-2 rounded-lg text-gray-500 hover:text-white hover:bg-white/5 transition-colors"
                    >
                      <Edit size={15} />
                    </button>
                    <button
                      onClick={() => {
                        deleteBlog(blog.id);
                        toast({ title: "Deleted", description: "Post removed." });
                      }}
                      className="p-2 rounded-lg text-gray-500 hover:text-red-400 hover:bg-red-500/5 transition-colors"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ── Modal ── */}
      <AnimatePresence>
        {showAddForm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/70 backdrop-blur-sm"
              onClick={() => { setShowAddForm(false); setEditingId(null); }}
            />
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 16 }}
              transition={{ duration: 0.2 }}
              className="relative w-full max-w-lg max-h-[85vh] overflow-y-auto border border-purple-500/20 rounded-2xl bg-slate-950 p-6 sm:p-8 shadow-[8px_8px_0px_rgba(168,85,247,0.12)]"
            >
              {/* Modal header */}
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-extrabold uppercase tracking-tight">
                  {editingId ? "Edit" : "New"} {activeTab === "members" ? "Member" : "Post"}
                </h2>
                <button
                  onClick={() => { setShowAddForm(false); setEditingId(null); }}
                  className="p-1.5 rounded-lg text-gray-600 hover:text-white hover:bg-white/5 transition-colors"
                >
                  <X size={18} />
                </button>
              </div>

              {activeTab === "members" ? (
                <form onSubmit={handleAddMember} className="space-y-4">
                  {/* Avatar preview – compact */}
                  {memberForm.avatar && (
                    <div className="flex items-center gap-4 p-3 rounded-xl bg-white/[0.03] border border-white/5">
                      <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-purple-500/30 bg-black shrink-0">
                        <img src={memberForm.avatar} alt="" className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-400">Avatar loaded from GitHub</p>
                        <p className="text-[10px] text-gray-600 font-mono mt-0.5 truncate max-w-[250px]">{memberForm.avatar}</p>
                      </div>
                    </div>
                  )}

                  <div>
                    <label className={labelClass}>GitHub profile URL</label>
                    <div className="relative">
                      <Github size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-600" />
                      <input
                        type="url"
                        required
                        className={`${inputClass} pl-10 font-mono text-xs`}
                        placeholder="https://github.com/username"
                        value={memberForm.github}
                        onBlur={(e) => {
                          const url = e.target.value.trim();
                          if (url && url.includes("github.com/")) {
                            const existing = members.find(m => m.github?.toLowerCase() === url.toLowerCase());
                            if (existing && !editingId) {
                              toast({ title: "Already exists", description: `Switched to editing ${existing.name}.` });
                              handleEditMember(existing);
                              return;
                            }
                            const username = url.split("github.com/")[1]?.split("/")[0]?.replace("@", "");
                            if (username) {
                              setMemberForm(prev => ({
                                ...prev,
                                github: url,
                                avatar: `https://github.com/${username}.png`
                              }));
                            }
                          }
                        }}
                        onChange={(e) => setMemberForm({ ...memberForm, github: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className={labelClass}>Name</label>
                      <input
                        type="text" required
                        className={inputClass}
                        placeholder="Full name"
                        value={memberForm.name}
                        onChange={(e) => setMemberForm({ ...memberForm, name: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className={labelClass}>Role type</label>
                      <select
                        className={inputClass}
                        value={memberForm.roleType}
                        onChange={(e) => setMemberForm({ ...memberForm, roleType: e.target.value as any })}
                      >
                        <option value="Founder" className="bg-slate-950">Founder</option>
                        <option value="OG Member" className="bg-slate-950">OG Member</option>
                        <option value="Developer" className="bg-slate-950">Developer</option>
                        <option value="Contributor" className="bg-slate-950">Contributor</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className={labelClass}>Title / Role</label>
                    <input
                      type="text" required
                      className={inputClass}
                      placeholder="e.g. Backend Engineer"
                      value={memberForm.role}
                      onChange={(e) => setMemberForm({ ...memberForm, role: e.target.value })}
                    />
                  </div>

                  <div>
                    <label className={labelClass}>Bio</label>
                    <textarea
                      required rows={2}
                      className={`${inputClass} resize-none`}
                      placeholder="Short description..."
                      value={memberForm.bio}
                      onChange={(e) => setMemberForm({ ...memberForm, bio: e.target.value })}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className={labelClass}>LinkedIn</label>
                      <input className={inputClass} placeholder="URL (optional)" value={memberForm.linkedin} onChange={(e) => setMemberForm({ ...memberForm, linkedin: e.target.value })} />
                    </div>
                    <div>
                      <label className={labelClass}>Twitter</label>
                      <input className={inputClass} placeholder="URL (optional)" value={memberForm.twitter} onChange={(e) => setMemberForm({ ...memberForm, twitter: e.target.value })} />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 mt-2 bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold uppercase tracking-widest rounded-lg border border-purple-500 transition-all duration-200 hover:shadow-[4px_4px_0px_rgba(168,85,247,0.3)] hover:translate-y-[-1px]"
                  >
                    {editingId ? "Save changes" : "Add member"}
                  </button>
                </form>
              ) : (
                <form onSubmit={handleAddBlog} className="space-y-4">
                  <div>
                    <label className={labelClass}>Title</label>
                    <input type="text" required className={inputClass} value={blogForm.title} onChange={(e) => setBlogForm({ ...blogForm, title: e.target.value })} />
                  </div>
                  <div>
                    <label className={labelClass}>Excerpt</label>
                    <textarea rows={2} className={`${inputClass} resize-none`} value={blogForm.excerpt} onChange={(e) => setBlogForm({ ...blogForm, excerpt: e.target.value })} />
                  </div>
                  <div>
                    <label className={labelClass}>Content</label>
                    <textarea rows={4} required className={`${inputClass} resize-none`} value={blogForm.content} onChange={(e) => setBlogForm({ ...blogForm, content: e.target.value })} />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className={labelClass}>Author</label>
                      <input type="text" required className={inputClass} value={blogForm.author} onChange={(e) => setBlogForm({ ...blogForm, author: e.target.value })} />
                    </div>
                    <div>
                      <label className={labelClass}>Cover image URL</label>
                      <input type="url" className={inputClass} value={blogForm.image} onChange={(e) => setBlogForm({ ...blogForm, image: e.target.value })} />
                    </div>
                  </div>
                  <div>
                    <label className={labelClass}>Tags (comma-separated)</label>
                    <input
                      type="text"
                      className={inputClass}
                      placeholder="react, nextjs, tutorial"
                      value={blogForm.tags?.join(", ") || ""}
                      onChange={(e) => setBlogForm({ ...blogForm, tags: e.target.value.split(",").map(t => t.trim()).filter(Boolean) })}
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full py-3.5 mt-2 bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold uppercase tracking-widest rounded-lg border border-purple-500 transition-all duration-200 hover:shadow-[4px_4px_0px_rgba(168,85,247,0.3)] hover:translate-y-[-1px]"
                  >
                    {editingId ? "Save changes" : "Publish post"}
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
