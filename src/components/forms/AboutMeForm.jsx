import React, { forwardRef, useImperativeHandle, useState } from "react";

const AboutMeForm = forwardRef(({ onSave, initialData }, ref) => {
  const [aboutMe, setAboutMe] = useState(initialData || "");

  useImperativeHandle(ref, () => ({
    submit() {
      handleSubmit();
    },
  }));

  const handleChange = (e) => {
    setAboutMe(e.target.value);
  };

  const handleSubmit = () => {
    onSave(aboutMe);
  };

  return (
    <div className="space-y-6 max-w-xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <div>
        <label className="block text-sm font-medium text-gray-700">
          About Me
        </label>
        <textarea
          name="aboutMe"
          value={aboutMe}
          onChange={handleChange}
          placeholder="Tell something about yourself..."
          className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          rows="20"
        />
        <p className="text-sm text-gray-500 mt-2">You can use **bold** text.</p>
      </div>
    </div>
  );
});

export default AboutMeForm;
