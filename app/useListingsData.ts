'use client';

import {useState, useEffect} from 'react';

export type ListingType = {
  Id: number;
  DateListed: string;
  Title: string;
  Description: string;
  'Sale Price': number;
  ThumbnailURL: string;
  PictureURL: string;
  Location: string;
  Sqft: number;
  Bedrooms: number;
  Bathrooms: number;
  Parking: number;
  YearBuilt: number;
};

export const useListingsData = () => {
  const [listings, setListings] = useState<ListingType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/listings', {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
        });

        console.log(response);

        const data = await response.json();
        setListings(data);
      } catch (error: any) {
        console.log(error);
        setError(error.message || 'An error occurred while fetching data.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []); // Empty dependency array to ensure the effect runs once on mount

  return {listings, loading, error};
};
