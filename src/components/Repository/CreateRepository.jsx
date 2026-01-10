import React, { useState } from "react";
import API_BASE_URL from "../../config";
import Navbar from "../Navbar";
import "./createRepo.css";

const CreateRepository = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [visibility, setVisibility] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleCreate = async (e) => {
    e.preventDefault();

    const owner = localStorage.getItem("userId");
    if (!owner) {
      alert("User not logged in");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(`${API_BASE_URL}/repo/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          description,
          visibility,
          owner,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.error || "Failed to create repository");
        setLoading(false);
        return;
      }

      alert("Repository created successfully!");
      window.location.href = "/";
    } catch (err) {
      console.error("Create repository error:", err);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <div className="create-repo">
        <div className="create-repo-container">
          <h2>Create a new repository</h2>

          <form onSubmit={handleCreate}>
            <input
              type="text"
              placeholder="Repository name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />

            <textarea
              placeholder="Description (optional)"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />

            <select
              value={visibility}
              onChange={(e) => setVisibility(e.target.value === "true")}
            >
              <option value="true">Public</option>
              <option value="false">Private</option>
            </select>

            <button type="submit" disabled={loading}>
              {loading ? "Creating..." : "Create Repository"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default CreateRepository;
