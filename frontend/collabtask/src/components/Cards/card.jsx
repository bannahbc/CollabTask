import React from "react";


const Card = ({ title, description, imageUrl,email }) => {
  return (
    <div className="max-w-sm w-full bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 ease-in-out overflow-hidden">
      {imageUrl && (
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-48 object-cover"
        />
      )}
      <div className="p-4">
        <h2 className="text-xl text-gray-800 font-bold">{title}</h2>
        <hr />
        <p className="mt-2 text-gray-600 text-sm">{description}</p>
        <p className="mt-2 text-gray-600 text-sm">{email}</p>
      </div>
    </div>
  );
};
export default Card;