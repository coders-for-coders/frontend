"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { TeamMember, BlogPost } from "@/types";

interface DataContextType {
  members: TeamMember[];
  blogs: BlogPost[];
  addMember: (member: Omit<TeamMember, "id">) => Promise<void>;
  updateMember: (id: string, member: Partial<TeamMember>) => Promise<void>;
  deleteMember: (id: string) => Promise<void>;
  addBlog: (blog: Omit<BlogPost, "id">) => Promise<void>;
  updateBlog: (id: string, blog: Partial<BlogPost>) => Promise<void>;
  deleteBlog: (id: string) => Promise<void>;
  refresh: () => Promise<void>;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider = ({ children }: { children: React.ReactNode }) => {
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchMembers = async () => {
    try {
      const res = await fetch("/api/members");
      const data = await res.json();
      if (Array.isArray(data)) setMembers(data);
    } catch (err) {
      console.error("Failed to fetch members:", err);
    }
  };

  const fetchBlogs = async () => {
    try {
      const res = await fetch("/api/blogs");
      const data = await res.json();
      if (Array.isArray(data)) setBlogs(data);
    } catch (err) {
      console.error("Failed to fetch blogs:", err);
    }
  };

  const refresh = async () => {
    setIsLoading(true);
    await Promise.all([fetchMembers(), fetchBlogs()]);
    setIsLoading(false);
  };

  useEffect(() => {
    refresh();
  }, []);

  const addMember = async (m: Omit<TeamMember, "id">) => {
    try {
      const res = await fetch("/api/members", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(m),
      });
      const newMember = await res.json();
      setMembers(prev => [...prev, newMember]);
    } catch (err) {
      console.error("Error adding member:", err);
    }
  };

  const updateMember = async (id: string, m: Partial<TeamMember>) => {
    try {
      await fetch(`/api/members/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(m),
      });
      setMembers(prev => prev.map(member => member.id === id ? { ...member, ...m } : member));
    } catch (err) {
      console.error("Error updating member:", err);
    }
  };

  const deleteMember = async (id: string) => {
    try {
      await fetch(`/api/members/${id}`, { method: "DELETE" });
      setMembers(prev => prev.filter(m => m.id !== id));
    } catch (err) {
      console.error("Error deleting member:", err);
    }
  };

  const addBlog = async (b: Omit<BlogPost, "id">) => {
    try {
      const res = await fetch("/api/blogs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(b),
      });
      const newBlog = await res.json();
      setBlogs(prev => [...prev, newBlog]);
    } catch (err) {
      console.error("Error adding blog:", err);
    }
  };

  const updateBlog = async (id: string, b: Partial<BlogPost>) => {
    try {
      await fetch(`/api/blogs/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(b),
      });
      setBlogs(prev => prev.map(blog => blog.id === id ? { ...blog, ...b } : blog));
    } catch (err) {
      console.error("Error updating blog:", err);
    }
  };

  const deleteBlog = async (id: string) => {
    try {
      await fetch(`/api/blogs/${id}`, { method: "DELETE" });
      setBlogs(prev => prev.filter(b => b.id !== id));
    } catch (err) {
      console.error("Error deleting blog:", err);
    }
  };

  return (
    <DataContext.Provider value={{
      members, blogs,
      addMember, updateMember, deleteMember,
      addBlog, updateBlog, deleteBlog,
      refresh
    }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) throw new Error("useData must be used within a DataProvider");
  return context;
};
