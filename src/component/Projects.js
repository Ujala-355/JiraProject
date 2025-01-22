import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

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

  const deleteProject = async (projectId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this project?");
    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("Authentication token not found. Please log in again.");
        return;
      }

      await axios.delete(`http://localhost:5000/api/projects/${projectId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setProjects((prevProjects) => prevProjects.filter((project) => project.id !== projectId));
    } catch (err) {
      setError("Failed to delete the project. Please try again later.");
      console.error("Error deleting project:", err);
    }
  };

  const goToTasks = (projectId) => {
    navigate(`/tasks/${projectId}`);
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Projects</h2>
      {loading && <div className="text-center text-secondary">Loading projects...</div>}
      {error && <div className="alert alert-danger">{error}</div>}
      <div className="row g-4">
        {projects.map((project) => (
          <div key={project.id} className="col-md-6 col-lg-4">
            <div className="card h-100 shadow-sm border-0">
              <div className="card-header bg-primary text-white text-center">
                <h5 className="mb-0">{project.name}</h5>
              </div>
              <div className="card-body">
                <p className="card-text text-muted">{project.description}</p>
                <p className="small text-muted">
                  <strong>Created At:</strong> {new Date(project.createdAt).toLocaleDateString()}
                </p>
                <div className="mt-3">
                  <strong>Team Members:</strong>
                  <ul className="list-group list-group-flush">
                    {project.teamMembers.map((member, index) => (
                      <li
                        key={index}
                        className="list-group-item small text-secondary"
                      >
                        {member}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="card-footer d-flex justify-content-between">
                <button
                  className="btn btn-primary btn-sm"
                  onClick={() => goToTasks(project.id)}
                >
                  <i className="bi bi-list-task"></i> View Tasks
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => deleteProject(project.id)}
                >
                  <i className="bi bi-trash"></i> Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {projects.length === 0 && !loading && !error && (
        <div className="text-center mt-5">
          <h5 className="text-muted">No projects available. Create a new one!</h5>
        </div>
      )}
    </div>
  );
};

export default Projects;
