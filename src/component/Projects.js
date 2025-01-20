import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Hook for navigation

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setError("Authentication token not found. Please log in again.");
          setLoading(false);
          return;
        }

        const response = await axios.get("http://localhost:5000/api/projects", {
          headers: { Authorization: `Bearer ${token}` },
        });

        console.log("Projects Data:", response.data);
        setProjects(response.data);
      } catch (err) {
        setError("Failed to fetch projects. Please try again later.");
        console.error("Error fetching projects:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const goToTasks = (projectId) => {
    navigate(`/tasks/${projectId}`); // Navigate to the Task Page with the project ID
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-center">Projects</h2>
      {loading && <div className="text-center">Loading projects...</div>}
      {error && <div className="alert alert-danger">{error}</div>}
      <div className="row">
        {projects.map((project) => (
          <div key={project.id} className="col-md-6 col-lg-4 mb-4">
            <div className="card shadow-sm h-100">
              <div className="card-body d-flex flex-column">
                <h5 className="card-title text-primary">{project.name}</h5>
                <p className="card-text text-muted">{project.description}</p>
                <p className="card-text">
                  <strong>Created At:</strong>{" "}
                  {new Date(project.createdAt).toLocaleDateString()}
                </p>
                <div className="mt-auto">
                  <strong>Team Members:</strong>
                  <ul className="list-unstyled mt-2">
                    {project.teamMembers.map((member, index) => (
                      <li key={index} className="text-secondary">
                        {member}
                      </li>
                    ))}
                  </ul>
                </div>
                {/* Add Button to Navigate to Tasks */}
                <button
                  className="btn btn-primary mt-3"
                  onClick={() => goToTasks(project.id)}
                >
                  View Tasks
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Projects;
