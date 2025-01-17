import { createContext, useContext, useState } from "react";

const PostCodeContext = createContext(); // Corrected variable name
export const usePostCodeContext = () => { // Corrected function name
  return useContext(PostCodeContext); // Corrected usage
};

export const PostCodeProvider = ({ children }) => {
  const [postCode, setPostCode] = useState([]); // Fixed camel case naming for consistency

  return (
    <PostCodeContext.Provider value={{ postCode, setPostCode }}> {/* Corrected variable name */}
      {children}
    </PostCodeContext.Provider>
  );
};
