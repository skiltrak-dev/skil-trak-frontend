import React from "react";

export const NoteHeader = () => (
  <div className="flex justify-between">
    <div>
      <h1 className="text-3xl font-bold text-gray-900">Note</h1>
      <p className="text-gray-600 text-sm">create and manage note status checks label</p>
    </div>

    <button className="bg-orange-500 text-white px-4 py-2 mb-4 rounded">
      + Add New
    </button>
  </div>
);