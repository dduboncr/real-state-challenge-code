// components/ListingDetailsView.tsx

import React from 'react';
import { ListingType } from '../hooks/useListingsData';

type ListingDetailsViewProps = {
  listing: ListingType;
  onClose: () => void;
};

const ListingDetailsView: React.FC<ListingDetailsViewProps> = ({ listing, onClose }) => {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-75">
      <div className="bg-white p-4 rounded-md">
        <h2 className="text-xl font-bold">{listing.Title}</h2>
        <p className="text-gray-500">{listing.Location}</p>
        <p className="mt-2 text-gray-500">
          {listing.Bedrooms} beds | {listing.Bathrooms} baths
        </p>
        <p className="mt-2 text-gray-500">{listing.Parking} parking</p>
        <p className="mt-2">${listing['Sale Price']}</p>
        <p className="mt-2">{listing.Description}</p>
        <p className="mt-2">Year Built: {listing.YearBuilt}</p>
        <button onClick={onClose} className="bg-blue-500 text-white p-2 rounded-md mt-2 cursor-pointer">
          Close
        </button>
      </div>
    </div>
  );
