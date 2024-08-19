import React, { forwardRef, useImperativeHandle, useState } from "react";
import { FaTrashAlt } from "react-icons/fa";

const ProjectForm = forwardRef(({ onSave, initialData }, ref) => {
  const [projectList, setProjectList] = useState(
    initialData || [
      {
        title: "",
        projectLink: "",
        description: "",
        datesBetween: "",
        descriptionTags: [],
      },
    ]
  );

  useImperativeHandle(ref, () => ({
    submit() {
      handleSubmit();
    },
  }));

  const handleChange = (index, field, value) => {
    const updatedList = [...projectList];
    if (field === "descriptionTags") {
      updatedList[index][field] =
        typeof value === "string"
          ? value.split(",").map((tag) => tag.trim())
          : [];
    } else {
      updatedList[index][field] = value;
    }
    setProjectList(updatedList);
  };

  const addProject = () => {
    setProjectList([
      ...projectList,
      {
        title: "",
        projectLink: "",
        description: "",
        datesBetween: "",
        descriptionTags: [],
      },
    ]);
  };

  const removeProject = (index) => {
    setProjectList(projectList.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    onSave(projectList);
  };

  return (
    <div className="space-y-6 max-w-xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      {projectList.map((project, index) => (
        <div
          key={index}
          className="relative space-y-4 p-4 bg-gray-100 rounded-lg shadow-sm"
        >
          {projectList.length > 1 && (
            <button
              onClick={() => removeProject(index)}
              className="absolute top-2 right-2 p-2 bg-red-600 text-white rounded-full hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
            >
              <FaTrashAlt />
            </button>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Project Title
            </label>
            <input
              type="text"
              value={project.title}
              onChange={(e) => handleChange(index, "title", e.target.value)}
              placeholder="Lead Software Developer"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Project Link
            </label>
            <input
              type="url"
              value={project.projectLink}
              onChange={(e) =>
                handleChange(index, "projectLink", e.target.value)
              }
              placeholder="http://somecompanyexample.com"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Dates Between
            </label>
            <input
              type="text"
              value={project.datesBetween}
              onChange={(e) =>
                handleChange(index, "datesBetween", e.target.value)
              }
              placeholder="2017 Oct - Present"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              value={project.description}
              onChange={(e) =>
                handleChange(index, "description", e.target.value)
              }
              placeholder="Describe your project..."
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              rows="4"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Description Tags (comma separated)
            </label>
            <input
              type="text"
              value={
                Array.isArray(project.descriptionTags)
                  ? project.descriptionTags.join(", ")
                  : ""
              }
              onChange={(e) =>
                handleChange(index, "descriptionTags", e.target.value)
              }
              placeholder="Javascript, React"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {index === projectList.length - 1 && (
            <button
              onClick={addProject}
              className="mt-4 py-2 px-4 bg-blue-600 text-white rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              Add Another Project
            </button>
          )}

          {index < projectList.length - 1 && (
            <hr className="my-6 border-t border-gray-300" />
          )}
        </div>
      ))}
    </div>
  );
});

export default ProjectForm;
