'use client';

import { useState, useEffect } from "react";
import { personalData } from "@/utils/data/personal-data";
import AboutSection from "./components/homepage/about";
import Blog from "./components/homepage/blog";
import ContactSection from "./components/homepage/contact";
import Education from "./components/homepage/education";
import Experience from "./components/homepage/experience";
import HeroSection from "./components/homepage/hero-section";
import Projects from "./components/homepage/projects";
import Skills from "./components/homepage/skills";

// Function to fetch data
async function getData() {
  try {
    const res = await fetch(
      `https://dev.to/api/articles?username=${personalData.devUsername}`
    );

    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }

    const data = await res.json();

    // Filter and sort data
    const filtered = data
      .filter((item) => item?.cover_image)
      .sort(() => Math.random() - 0.2);

    return filtered;
  } catch (error) {
    console.error("Error fetching blog data:", error);
    return [];
  }
}

// Main Home Component
export default function Home() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch data on component mount
  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const fetchedBlogs = await getData();
      setBlogs(fetchedBlogs);
      setLoading(false);
    }
    fetchData();
  }, []);

  return (
    <>
      <HeroSection />
      <AboutSection />
      <Experience />
      <Skills />
      <Projects />
      <Education />
      {/* Blog Section with Loading and Error Handling */}
      {loading ? (
        <p>Loading blogs...</p>
      ) : blogs.length > 0 ? (
        <Blog blogs={blogs} />
      ) : (
        <p>No blogs available at the moment.</p>
      )}
      <ContactSection />
    </>
  );
}
