'use client'

import React, { use, useEffect, useState } from 'react'
import ListItem from './ListItem'
import { ListingType, useListingsData } from '../hooks/useListingsData'
import { Filter } from './Filters'

const List = () => {
  const [filteredListings, setFilteredListings] = useState<ListingType[]>([])

  const { loading, listings } = useListingsData()

  useEffect(() => {
    setFilteredListings(listings)
  }, [listings])

  if (loading) {
    return <div>Loading...</div>
  }

  const handleFilterChange = (filteredListings: ListingType[]) => {
    setFilteredListings(filteredListings)
  }

  return (
    <div className="container mx-auto my-96">
      <Filter listings={listings} onFilterChange={handleFilterChange} key={1} />
      <div className="grid md:grid-cols-2 sm:grid-cols-1 lg:grid-cols-4 gap-4">
        {filteredListings.map((listing) => (
          <ListItem key={listing.Id} listing={listing} />
        ))}
      </div>
    </div>
  )
}

export default List
