// components/FilterComponent.tsx

import React, {useState} from 'react';
import {ListingType} from '../useListingsData';

type FilterComponentProps = {
  listings: ListingType[];
  onFilterChange: (filteredListings: ListingType[]) => void;
};

const numberFormatter = new Intl.NumberFormat('en-US', {
  style: 'decimal',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

export const Filter: React.FC<FilterComponentProps> = ({
  listings,
  onFilterChange,
}) => {
  const [bedrooms, setBedrooms] = useState<number | ''>('');
  const [maxPrice, setMaxPrice] = useState<number | ''>('');
  const [bathrooms, setBathrooms] = useState<number | ''>('');
  const [parking, setParking] = useState<number | ''>('');

  const handleFilter = () => {
    const filteredListings = listings.filter(
      (listing) =>
        (maxPrice === '' || listing['Sale Price'] <= Number(maxPrice)) &&
        (bedrooms === '' || listing.Bedrooms <= Number(bedrooms)) &&
        (bathrooms === '' || listing.Bathrooms <= Number(bathrooms)) &&
        (parking === '' || listing.Parking <= Number(parking))
    );

    onFilterChange(filteredListings);
  };

  return (
    <div className="grid md:grid-cols-2 sm:grid-cols-1 lg:grid-cols-4 gap-4">
      <div className="mb-2">
        <label htmlFor="bathrooms" className="mr-2">
          Bathrooms:
        </label>
        <input
          type="number"
          id="bathrooms"
          value={bathrooms}
          onChange={(e) => setBathrooms(e.target.value)}
          className="border rounded-md p-2"
        />
      </div>

      <div className="mb-2">
        <label htmlFor="bedrooms" className="mr-2">
          Bedrooms:
        </label>
        <input
          type="number"
          id="bedrooms"
          value={bedrooms}
          onChange={(e) => setBedrooms(e.target.value)}
          className="border rounded-md p-2"
        />
      </div>

      <div className="mb-2">
        <label htmlFor="parking" className="mr-2">
          Parking:
        </label>
        <input
          type="number"
          id="parking"
          value={parking}
          onChange={(e) => setParking(e.target.value)}
          className="border rounded-md p-2"
        />
      </div>

      <div className="mb-2">
        <label htmlFor="priceRange" className="mr-2">
          Price Range ($): {numberFormatter.format(+maxPrice)}
        </label>

        <input
          type="range"
          id="priceRange"
          min="10000"
          max="1000000"
          step="1000"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          className="border rounded-md p-2"
        />
      </div>

      <div className="mb-2">
        <button
          onClick={handleFilter}
          className="bg-blue-500 text-white p-2 rounded-md"
        >
          Apply Filters
        </button>
      </div>
    </div>
  );
};
