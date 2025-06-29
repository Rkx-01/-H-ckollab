import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";

const UserProfileForm = () => {
  const navigate = useNavigate();
  const { saveProfile, loading, profileData } = useAppContext();

  const [formData, setFormData] = useState({
    name: "",
    bio: "",
    availability: "",
    academicYear: "",
    branch: "",
    frontendSkills: "",
    backendSkills: "",
    dbSkills: "",
    customSkills: "",
    interests: "",
    github: "",
    otherLinks: "",
    projects: [{ title: "", tech: "", link: "" }],
  });

  // Pre-populate form with existing data if available
  useEffect(() => {
    if (profileData) {
      setFormData({
        ...profileData,
        projects:
          profileData.projects && profileData.projects.length > 0
            ? profileData.projects
            : [{ title: "", tech: "", link: "" }],
      });
    }
  }, [profileData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleProjectChange = (index, e) => {
    const updated = [...formData.projects];
    updated[index][e.target.name] = e.target.value;
    setFormData((prev) => ({ ...prev, projects: updated }));
  };

  const addProject = () => {
    setFormData((prev) => ({
      ...prev,
      projects: [...prev.projects, { title: "", tech: "", link: "" }],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Filter out empty projects
    const filteredProjects = formData.projects.filter(
      (project) =>
        project.title.trim() !== "" ||
        project.tech.trim() !== "" ||
        project.link.trim() !== ""
    );

    const profileData = {
      ...formData,
      projects: filteredProjects,
    };

    saveProfile(profileData);

    // Redirect to profile page after saving
    setTimeout(() => {
      navigate("/profile");
    }, 1000);
  };

  const inputClass =
    "w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500";

  const sectionClass =
    "space-y-6 bg-gray-950 p-6 rounded-xl border border-gray-800";

  return (
    <div className="min-h-screen px-6 py-12 bg-black text-white">
      <div className="max-w-5xl mx-auto space-y-10">
        {/* Header */}
        <div>
          <h1 className="text-4xl font-bold">Create Your Profile</h1>
          <p className="text-gray-400 mt-1">Tell us more about you.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-10">
          {/* Basic Information */}
          <div className={sectionClass}>
            <h2 className="text-2xl font-semibold mb-4">Basic Information</h2>

            <div>
              <label className="block mb-1">Full Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={inputClass}
                placeholder="Enter full name"
              />
            </div>

            <div>
              <label className="block mb-1">Bio</label>
              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                className={inputClass}
                rows={3}
                placeholder="Write a short bio..."
              />
            </div>

            <div>
              <label className="block mb-1">Availability Status</label>
              <select
                name="availability"
                value={formData.availability}
                onChange={handleChange}
                className={inputClass}
              >
                <option value="">Select</option>
                <option>Available for work</option>
                <option>Open to Collaborate</option>
                <option>Not available</option>
              </select>
            </div>
          </div>

          {/* Academic Information */}
          <div className={sectionClass}>
            <h2 className="text-2xl font-semibold mb-4">
              Academic Information
            </h2>

            <div>
              <label className="block mb-1">Academic Year</label>
              <input
                type="text"
                name="academicYear"
                value={formData.academicYear}
                onChange={handleChange}
                className={inputClass}
                placeholder="1st, 2nd, etc."
              />
            </div>

            <div>
              <label className="block mb-1">Branch</label>
              <input
                type="text"
                name="branch"
                value={formData.branch}
                onChange={handleChange}
                className={inputClass}
                placeholder="CSE, AI/ML, etc."
              />
            </div>
          </div>

          {/* Skills */}
          <div className={sectionClass}>
            <h2 className="text-2xl font-semibold mb-4">Technical Skills</h2>

            <div>
              <label className="block mb-1">Frontend</label>
              <input
                type="text"
                name="frontendSkills"
                value={formData.frontendSkills}
                onChange={handleChange}
                className={inputClass}
                placeholder="HTML, React..."
              />
            </div>

            <div>
              <label className="block mb-1">Backend</label>
              <input
                type="text"
                name="backendSkills"
                value={formData.backendSkills}
                onChange={handleChange}
                className={inputClass}
                placeholder="Node.js, Express..."
              />
            </div>

            <div>
              <label className="block mb-1">Database</label>
              <input
                type="text"
                name="dbSkills"
                value={formData.dbSkills}
                onChange={handleChange}
                className={inputClass}
                placeholder="MongoDB, PostgreSQL..."
              />
            </div>

            <div>
              <label className="block mb-1">Add Custom Skill</label>
              <input
                type="text"
                name="customSkills"
                value={formData.customSkills}
                onChange={handleChange}
                className={inputClass}
                placeholder="Any other skills..."
              />
            </div>
          </div>

          {/* Interests */}
          <div className={sectionClass}>
            <h2 className="text-2xl font-semibold mb-4">
              Concepts & Interests
            </h2>
            <input
              type="text"
              name="interests"
              value={formData.interests}
              onChange={handleChange}
              className={inputClass}
              placeholder="e.g. AI, Web3, UI/UX..."
            />
          </div>

          {/* Social Links */}
          <div className={sectionClass}>
            <h2 className="text-2xl font-semibold mb-4">Social Links</h2>

            <div>
              <label className="block mb-1">GitHub</label>
              <input
                type="url"
                name="github"
                value={formData.github}
                onChange={handleChange}
                className={inputClass}
                placeholder="https://github.com/yourname"
              />
            </div>

            <div>
              <label className="block mb-1">Other Links</label>
              <input
                type="url"
                name="otherLinks"
                value={formData.otherLinks}
                onChange={handleChange}
                className={inputClass}
                placeholder="LinkedIn, portfolio, etc."
              />
            </div>
          </div>

          {/* Projects */}
          <div className={sectionClass}>
            <h2 className="text-2xl font-semibold mb-4">Featured Projects</h2>
            {formData.projects.map((proj, idx) => (
              <div
                key={idx}
                className="space-y-4 border border-gray-700 p-4 rounded-lg bg-gray-900"
              >
                <div>
                  <label className="block mb-1">Project Title</label>
                  <input
                    type="text"
                    name="title"
                    value={proj.title}
                    onChange={(e) => handleProjectChange(idx, e)}
                    className={inputClass}
                    placeholder="Project name"
                  />
                </div>
                <div>
                  <label className="block mb-1">Tech Used</label>
                  <input
                    type="text"
                    name="tech"
                    value={proj.tech}
                    onChange={(e) => handleProjectChange(idx, e)}
                    className={inputClass}
                    placeholder="React, Firebase..."
                  />
                </div>
                <div>
                  <label className="block mb-1">Project Link</label>
                  <input
                    type="url"
                    name="link"
                    value={proj.link}
                    onChange={(e) => handleProjectChange(idx, e)}
                    className={inputClass}
                    placeholder="https://project.link"
                  />
                </div>
              </div>
            ))}
            <button
              type="button"
              onClick={addProject}
              className="text-blue-400 text-sm mt-3 hover:underline"
            >
              + Add another project
            </button>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg text-white font-semibold text-lg transition-all duration-200 ${
              loading ? "opacity-50 cursor-not-allowed" : "hover:opacity-90"
            }`}
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                {profileData ? "Updating Profile..." : "Creating Profile..."}
              </div>
            ) : profileData ? (
              "Update Profile"
            ) : (
              "Create Profile"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UserProfileForm;
