import React, { forwardRef, useImperativeHandle, useState } from "react";

const PersonalDataForm = forwardRef(({ onSave, initialData }, ref) => {
  const [formData, setFormData] = useState(initialData);

  useImperativeHandle(ref, () => ({
    submit() {
      handleSubmit();
    },
  }));

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (upload) => {
        setFormData((prev) => ({
          ...prev,
          image: upload.target.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = () => {
    onSave(formData);
  };

  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      className="space-y-6 max-w-xl mx-auto p-6 bg-white shadow-lg rounded-lg"
    >
      <div>
        <label className="block text-sm font-medium text-gray-700">Name</label>
        <input
          type="text"
          name="name"
          value={formData.name || ""}
          onChange={handleChange}
          placeholder="John Doe"
          className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Title</label>
        <input
          type="text"
          name="title"
          value={formData.title || ""}
          onChange={handleChange}
          placeholder="Senior Software Developer"
          className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Upload Image
        </label>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm"
        />
        {formData.image && (
          <div className="mt-4">
            <img
              src={formData.image}
              alt="Uploaded preview"
              className="w-full h-auto object-cover rounded-md"
            />
          </div>
        )}
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Email</label>
        <input
          type="email"
          name="email"
          value={formData.email || ""}
          onChange={handleChange}
          placeholder="john@example.com"
          className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Phone</label>
        <input
          type="tel"
          name="phone"
          value={formData.phone || ""}
          onChange={handleChange}
          placeholder="+00 (123) 456 78 90"
          className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Website
        </label>
        <input
          type="url"
          name="website"
          value={formData.website || ""}
          onChange={handleChange}
          placeholder="https://yourwebsite.com"
          className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          LinkedIn
        </label>
        <input
          type="url"
          name="linkedin"
          value={formData.linkedin || ""}
          onChange={handleChange}
          placeholder="https://linkedin.com/in/yourprofile"
          className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Twitter
        </label>
        <input
          type="url"
          name="twitter"
          value={formData.twitter || ""}
          onChange={handleChange}
          placeholder="https://twitter.com/yourhandle"
          className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          GitHub
        </label>
        <input
          type="url"
          name="github"
          value={formData.github || ""}
          onChange={handleChange}
          placeholder="https://github.com/yourusername"
          className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>
    </form>
  );
});

export default PersonalDataForm;
