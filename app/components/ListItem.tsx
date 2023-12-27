import React from 'react';
import Link from 'next/link';
import {ListingType} from '../useListingsData';
import Image from 'next/image';

const ListItem = ({listing}: {listing: ListingType}) => {
  return (
    <div className="border p-4 mb-4 rounded-md flex flex-col">
      <div className="relative mb-2">
        <Image
          width={100}
          height={100}
          src={listing.ThumbnailURL}
          alt={listing.Title}
          className="w-full h-32 object-cover rounded-md"
        />
      </div>
      <div className="flex-1">
        <h2 className="text-xl font-bold">{listing.Title}</h2>
        <p className="text-gray-500">{listing.Location}</p>
        <p className="mt-2 text-gray-500">
          {listing.Bedrooms} beds | {listing.Bathrooms} baths
        </p>
        <p className="mt-2 text-gray-500">{listing.Parking} parking</p>
        <p className="mt-2">${listing['Sale Price']}</p>
      </div>
      <Link href={`/listings/${listing.Id}`}>
        <div className="bg-blue-500 text-white p-2 rounded-md mt-2 cursor-pointer">
          View Details
        </div>
      </Link>
    </div>
  );
};

export default ListItem;
