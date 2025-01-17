import  { useState } from "react";

const ActivePostcode = () => {
  const [showPostcodeDiv, setShowPostcodeDiv] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const[postCode,setPostCode]=useState([])
  const handleData = () => {
    const value = inputValue.trim();
    if (value) {
      setPostCode((prev) => [...(prev || []), value]);
      setInputValue(""); 
    }
  };

  const handleShowDiv = () => {
    setShowPostcodeDiv(true);
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100 p-6">
      <h1 className="text-2xl font-bold text-blue-600 mb-4">
        Manage Your Postcodes
      </h1>
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Enter Postcode:
        </label>
        <div className="flex">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Enter postcode"
            className="flex-grow border border-gray-300 rounded-l-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            onClick={handleData}
            className="bg-blue-600 text-white px-4 py-2 rounded-r-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-400"
          >
            Add
          </button>
        </div>
        <button
          className="mt-4 bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 focus:ring-2 focus:ring-green-400 w-full"
          onClick={handleShowDiv}
        >
          Show Postcodes
        </button>
      </div>

      {showPostcodeDiv && postCode?.length > 0 && (
        <div className="bg-white shadow-lg rounded-lg p-6 mt-6 w-full max-w-md">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Your Postcodes
          </h2>
          <ul className="divide-y divide-gray-300">
            {postCode.map((item, index) => (
              <li key={index} className="py-2 text-gray-700">
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ActivePostcode;
