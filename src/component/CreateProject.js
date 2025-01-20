import React, { useState } from "react";
import axios from "axios";

const CreateProject = () => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [loading, setLoading] = useState(false);

    const handleCreateProject = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        setSuccess("");

        try {
            const token = localStorage.getItem("token"); // Replace with your token retrieval logic
            const response = await axios.post(
                "http://localhost:5000/api/projects",
                { name, description },
                {
                    headers: {
                        Authorization: `Bearer ${token}`, // Add the token in headers
                    },
                }
            );

            if (response.status === 201) {
                setSuccess("Project created successfully!");
                setName(""); // Clear the form
                setDescription("");
            } else {
                setError("Failed to create the project. Please try again.");
            }
        } catch (err) {
            console.error(err);
            setError(err.response?.data?.error || "Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-8 col-lg-6">
                    <h3 className="text-center mb-4">Create a New Project</h3>
                    {error && <div className="alert alert-danger">{error}</div>}
                    {success && <div className="alert alert-success">{success}</div>}
                    <form onSubmit={handleCreateProject} className="needs-validation" noValidate>
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">
                                Project Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                className="form-control"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Enter project name"
                                required
                            />
                            <div className="invalid-feedback">Please provide a project name.</div>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="description" className="form-label">
                                Project Description
                            </label>
                            <textarea
                                id="description"
                                className="form-control"
                                rows="3"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="Enter project description"
                                required
                            ></textarea>
                            <div className="invalid-feedback">Please provide a project description.</div>
                        </div>
                        <button type="submit" className="btn btn-primary w-100" disabled={loading}>
                            {loading ? "Creating..." : "Create Project"}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CreateProject;
