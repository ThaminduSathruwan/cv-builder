import React, { useState, forwardRef, useImperativeHandle } from "react";
import { FaTrashAlt } from "react-icons/fa";

const MajorInvolvementsForm = forwardRef(({ onSave, initialData }, ref) => {
  const [involvements, setInvolvements] = useState(
    initialData || [{ description: "" }]
  );

  useImperativeHandle(ref, () => ({
    submit() {
      if (onSave) {
        onSave(involvements);
      }
    },
  }));

  const handleInputChange = (index, event) => {
    const newInvolvements = [...involvements];
    newInvolvements[index].description = event.target.value;
    setInvolvements(newInvolvements);
  };

  const addInvolvement = () => {
    setInvolvements([...involvements, { description: "" }]);
  };

  const removeInvolvement = (index) => {
    const newInvolvements = [...involvements];
    newInvolvements.splice(index, 1);
    setInvolvements(newInvolvements);
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Major Involvements</h2>
      {involvements.map((involvement, index) => (
        <div key={index} className="mb-4 flex items-center">
          <textarea
            className="w-full p-2 border border-gray-300 rounded"
            placeholder={`Involvement ${index + 1}`}
            value={involvement.description}
            onChange={(e) => handleInputChange(index, e)}
          />
          {involvements.length > 1 && (
            <button
              type="button"
              onClick={() => removeInvolvement(index)}
              className="text-red-500 ml-2"
            >
              <FaTrashAlt />
            </button>
          )}
        </div>
      ))}
      <button
        type="button"
        onClick={addInvolvement}
        className="py-2 px-4 bg-blue-600 text-white rounded-md shadow-sm hover:bg-blue-700"
      >
        Add Another Involvement
      </button>
    </div>
  );
});

export default MajorInvolvementsForm;
