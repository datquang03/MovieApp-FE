/* eslint-disable react/prop-types */
export const Message = ({ label, placeholder }) => {
  return (
    <div className="text-sm w-full">
      <label className="text-border font-semibold">{label}</label>
      <textarea
        className="w-full border border-border p-2 rounded-md"
        placeholder={placeholder}
      ></textarea>
    </div>
  );
};

export const Select = ({ label, options, onChange }) => {
  return (
    <>
      <div className="text-border font-semibold">{label}</div>
      <select
        className="w-full mt-2 px-6 py-4 border border-border rounded-md"
        onChange={onChange}
      >
        {options.map((o, i) => (
          <option key={i} value={o.value}>
            {o.title}
          </option>
        ))}
      </select>
    </>
  );
};
export const Input = ({ label, placeholder, type, bg }) => {
  return (
    <div className="text-sm w-full">
      <label className="text-border font-semibold">{label}</label>
      <input
        required
        type={type}
        className={`w-full text-sm mt-2 p-5 border border-border rounded-md text-white ${
          bg ? "bg-black" : "bg-gray-500"
        }`}
        placeholder={placeholder}
      />
    </div>
  );
};
