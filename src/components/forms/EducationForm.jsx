import React, { forwardRef, useImperativeHandle, useState } from "react";
import { FaTrashAlt } from "react-icons/fa";

const EducationForm = forwardRef(({ onSave, initialData }, ref) => {
  const [educationList, setEducationList] = useState(
    initialData || [
      { title: "", authority: "", datesBetween: "", description: "" },
    ]
  );

  useImperativeHandle(ref, () => ({
    submit() {
      handleSubmit();
    },
  }));

  const handleChange = (index, field, value) => {
    const updatedList = [...educationList];
    updatedList[index][field] = value;
    setEducationList(updatedList);
  };

  const addEducation = () => {
    setEducationList([
      ...educationList,
      { title: "", authority: "", datesBetween: "", description: "" },
    ]);
  };

  const removeEducation = (index) => {
    if (educationList.length > 1) {
      setEducationList(educationList.filter((_, i) => i !== index));
    }
  };

  const handleSubmit = () => {
    onSave(educationList);
  };

  return (
    <div className="space-y-6 max-w-xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      {educationList.map((education, index) => (
        <div
          key={index}
          className="relative space-y-4 p-4 bg-gray-100 rounded-lg shadow-sm"
        >
          {educationList.length > 1 && (
            <button
              onClick={() => removeEducation(index)}
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
              value={education.title}
              onChange={(e) => handleChange(index, "title", e.target.value)}
              placeholder="Computer Engineering (BS)"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Authority
            </label>
            <input
              type="text"
              value={education.authority}
              onChange={(e) => handleChange(index, "authority", e.target.value)}
              placeholder="University of Stanford"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Date Range
            </label>
            <input
              type="text"
              value={education.datesBetween}
              onChange={(e) =>
                handleChange(index, "datesBetween", e.target.value)
              }
              placeholder="2017 Nov - Present"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Description (optional)
            </label>
            <textarea
              value={education.description}
              onChange={(e) =>
                handleChange(index, "description", e.target.value)
              }
              placeholder="Describe your education experience..."
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              rows="4"
            />
          </div>

          {index === educationList.length - 1 && (
            <button
              onClick={addEducation}
              className="mt-4 py-2 px-4 bg-blue-600 text-white rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              Add Another Education
            </button>
          )}

          {index < educationList.length - 1 && (
            <hr className="my-6 border-t border-gray-300" />
          )}
        </div>
      ))}
    </div>
  );
});

export default EducationForm;
