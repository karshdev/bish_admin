import { useState } from "react";
import { AlertCircle, Loader2, Trash2, MapPin } from "lucide-react";
import PropTypes from 'prop-types';
import { useCreateAddressMutation, useGetAddressQuery, useDeleteAddressMutation } from "../store/api";

const ErrorMessage = ({ message }) => (
  <div className="flex items-center gap-2 text-red-600 text-sm mt-2">
    <AlertCircle className="h-4 w-4" />
    <span>{message}</span>
  </div>
);

ErrorMessage.propTypes = {
  message: PropTypes.string.isRequired,
};

const PostcodeCard = ({ postcode, onDelete, isDeleting }) => (
  <li className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg group transition-colors">
    <div className="flex items-center gap-3">
      <MapPin className="h-5 w-5 text-blue-500" />
      <span className="text-gray-700 font-medium">{postcode}</span>
    </div>
    <button
      onClick={onDelete}
      disabled={isDeleting}
      className="text-gray-400 hover:text-red-500 transition-colors p-2 rounded-full hover:bg-red-50 focus:ring-2 focus:ring-red-200 disabled:opacity-50"
      title="Delete postcode"
    >
      {isDeleting ? (
        <Loader2 className="h-5 w-5 animate-spin" />
      ) : (
        <Trash2 className="h-5 w-5" />
      )}
    </button>
  </li>
);

PostcodeCard.propTypes = {
  postcode: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
  isDeleting: PropTypes.bool.isRequired,
};

const ActivePostcode = () => {
  const [inputValue, setInputValue] = useState("");
  const [validationError, setValidationError] = useState("");
  const [deletingIds, setDeletingIds] = useState(new Set());

  const [createAddress, { isLoading: isCreating, error: createError }] = useCreateAddressMutation();
  const [deleteAddress] = useDeleteAddressMutation();
  const { 
    data: postcodes, 
    isLoading: isLoadingPostcodes,
    error: fetchError 
  } = useGetAddressQuery(undefined, {
    pollingInterval: 0,
  });

  const validatePostcode = (postcode) => {
    const ukPostcodeRegex = /^[A-Z]{1,2}[0-9]{1,2}$/;
    return ukPostcodeRegex.test(postcode);
  };

  const handleData = async () => {
    const value = inputValue.trim().toUpperCase();
    setValidationError("");

    if (!validatePostcode(value)) {
      setValidationError("Postal code must match the UK format (e.g., W2, E4, SE3)");
      return;
    }

    try {
      await createAddress({ postalCode: value }).unwrap();
      setInputValue("");
      setValidationError("");
    } catch (error) {
      if (error.data?.message) {
        setValidationError(error.data.message);
      } else {
        setValidationError("Failed to add postcode. Please try again.");
      }
    }
  };

  const handleDelete = async (id) => {
    setDeletingIds(prev => new Set([...prev, id]));
    try {
      await deleteAddress(id).unwrap();
    } catch (error) {
      console.error('Failed to delete postcode:', error);
    } finally {
      setDeletingIds(prev => {
        const newSet = new Set(prev);
        newSet.delete(id);
        return newSet;
      });
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !isCreating && inputValue.trim()) {
      handleData();
    }
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
            onChange={(e) => {
              setInputValue(e.target.value.toUpperCase());
              setValidationError(""); 
            }}
            onKeyPress={handleKeyPress}
            placeholder="Enter postcode (e.g., W2, SE3)"
            className={`flex-grow border rounded-l-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 ${
              validationError ? 'border-red-500' : 'border-gray-300'
            }`}
            disabled={isCreating}
          />
          <button
            onClick={handleData}
            disabled={isCreating || !inputValue.trim()}
            className="bg-blue-600 text-white px-4 py-2 rounded-r-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-400 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {isCreating ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Adding...
              </>
            ) : (
              'Add'
            )}
          </button>
        </div>

        {validationError && <ErrorMessage message={validationError} />}
        {createError && (
          <ErrorMessage message="Failed to add postcode. Please try again." />
        )}
      </div>

      <div className="bg-white shadow-lg rounded-lg p-6 mt-6 w-full max-w-md">
        <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
          Your Postcodes
          {postcodes?.data?.length > 0 && (
            <span className="text-sm font-normal text-gray-500">
              ({postcodes.data.length})
            </span>
          )}
        </h2>
        
        {isLoadingPostcodes ? (
          <div className="flex justify-center items-center py-4">
            <Loader2 className="h-6 w-6 animate-spin text-blue-600" />
          </div>
        ) : fetchError ? (
          <ErrorMessage message="Failed to load postcodes. Please refresh the page." />
        ) : postcodes?.data?.length > 0 ? (
          <ul className="space-y-2">
            {postcodes.data.map((item) => (
              <PostcodeCard
                key={item._id}
                postcode={item.postalCode}
                onDelete={() => handleDelete(item._id)}
                isDeleting={deletingIds.has(item._id)}
              />
            ))}
          </ul>
        ) : (
          <div className="text-center py-8">
            <MapPin className="h-12 w-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500">No postcodes added yet</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ActivePostcode;