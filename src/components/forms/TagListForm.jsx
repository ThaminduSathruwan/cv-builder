import React, {
  useImperativeHandle,
  forwardRef,
  useState,
  useEffect,
} from "react";

const TagListForm = forwardRef(({ title, icon, onSave, initialData }, ref) => {
  console.log(initialData);
  const [inputValue, setInputValue] = useState((initialData || []).join(", "));

  const [items, setItems] = useState(initialData || []);

  useEffect(() => {
    setInputValue((initialData || []).join(", "));
    setItems(initialData || []);
  }, [initialData]);

  useImperativeHandle(ref, () => ({
    submit() {
      if (onSave) {
        onSave({ items });
      }
    },
  }));

  const handleInputChange = (event) => {
    const value = event.target.value;
    setInputValue(value);

    const tags = value
      .split(",")
      .map((tag) => tag.trim())
      .filter((tag) => tag.length > 0);

    setItems(tags);
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">
        <i className={`icon-${icon} mr-2`} />
        {title}
      </h2>
      <textarea
        className="w-full p-2 border border-gray-300 rounded"
        placeholder="Enter tags separated by commas"
        value={inputValue}
        onChange={handleInputChange}
      />
      {/* <ul className="mt-4">
        {items.map((item, index) => (
          <li key={index} className="mb-2">
            <span className="bg-gray-200 px-2 py-1 rounded">{item}</span>
          </li>
        ))}
      </ul> */}
    </div>
  );
});

export default TagListForm;
