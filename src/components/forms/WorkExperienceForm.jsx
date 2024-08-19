import React, { forwardRef, useImperativeHandle, useState } from "react";
import { FaTrashAlt } from "react-icons/fa";

const WorkExperienceForm = forwardRef(({ onSave, initialData }, ref) => {
  const [workExperienceList, setWorkExperienceList] = useState(
    initialData || [
      {
        title: "",
        company: "",
        companyWebsite: "",
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
    const updatedList = [...workExperienceList];
    if (field === "descriptionTags") {
      updatedList[index][field] =
        typeof value === "string"
          ? value.split(",").map((tag) => tag.trim())
          : [];
    } else {
      updatedList[index][field] = value;
    }
    setWorkExperienceList(updatedList);
  };

  const addWorkExperience = () => {
    setWorkExperienceList([
      ...workExperienceList,
      {
        title: "",
        company: "",
        companyWebsite: "",
        description: "",
        datesBetween: "",
        descriptionTags: [],
      },
    ]);
  };

  const removeWorkExperience = (index) => {
    setWorkExperienceList(workExperienceList.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    onSave(workExperienceList);
  };

  return (
    <div className="space-y-6 max-w-xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      {workExperienceList.map((work, index) => (
        <div
          key={index}
          className="relative space-y-4 p-4 bg-gray-100 rounded-lg shadow-sm"
        >
          {workExperienceList.length > 1 && (
            <button
              onClick={() => removeWorkExperience(index)}
              className="absolute top-2 right-2 p-2 bg-red-600 text-white rounded-full hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
            >
              <FaTrashAlt />
            </button>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Title
            </label>
            <input
              type="text"
              value={work.title}
              onChange={(e) => handleChange(index, "title", e.target.value)}
              placeholder="Lead Software Developer"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Company
            </label>
            <input
              type="text"
              value={work.company}
              onChange={(e) => handleChange(index, "company", e.target.value)}
              placeholder="Some Company Example INC"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Company Website
            </label>
            <input
              type="url"
              value={work.companyWebsite}
              onChange={(e) =>
                handleChange(index, "companyWebsite", e.target.value)
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
              value={work.datesBetween}
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
              value={work.description}
              onChange={(e) =>
                handleChange(index, "description", e.target.value)
              }
              placeholder="Describe your work experience..."
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
                Array.isArray(work.descriptionTags)
                  ? work.descriptionTags.join(", ")
                  : ""
              }
              onChange={(e) =>
                handleChange(index, "descriptionTags", e.target.value)
              }
              placeholder="Javascript, React"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {index === workExperienceList.length - 1 && (
            <button
              onClick={addWorkExperience}
              className="mt-4 py-2 px-4 bg-blue-600 text-white rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              Add Another Work Experience
            </button>
          )}

          {index < workExperienceList.length - 1 && (
            <hr className="my-6 border-t border-gray-300" />
          )}
        </div>
      ))}
    </div>
  );
});

export default WorkExperienceForm;
