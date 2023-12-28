'use client'
import { ContactForm } from '@/app/components/ContactForm'
import { Modal } from '@/app/components/Model'
import { ListingType, useListingsData } from '@/app/hooks/useListingsData'
import Image from 'next/image'
import { useParams } from 'next/navigation'
import React, { useState, useEffect } from 'react'

let storedListings: ListingType[] = []
if (typeof window !== 'undefined') {
  // Perform localStorage action

  storedListings = JSON.parse(localStorage.getItem('savedListings') || '') || []
}

const ListingCard = ({ listing }: { listing: ListingType }) => {
  return (
    <div className="max-w-lg p-8 bg-white shadow-md rounded-md border">
      <div className="flex justify-between mb-4">
        <div className="text-xl font-bold">{listing.Title}</div>
        <div className="text-xl font-bold">${listing['Sale Price']}</div>
      </div>

      <div className="flex justify-between mb-2">
        <div className="text-sm text-gray-500">
          Location: {listing.Location}
        </div>
        <div className="text-sm text-gray-500">
          Date Listed: {listing.DateListed}
        </div>
      </div>
      <Image
        width={100}
        height={100}
        className="w-full mb-4"
        src={listing.ThumbnailURL}
        alt="Listing"
      />
      <div className="grid grid-cols-4 gap-4 mb-4 border">
        <div className="col-span-1 text-center">
          <div className="text-lg font-bold">{listing.Bedrooms}</div>
          <div className="text-sm">BED</div>
        </div>
        <div className="col-span-1 text-center">
          <div className="text-lg font-bold">{listing.Bathrooms}</div>
          <div className="text-sm">BATH</div>
        </div>
        <div className="col-span-1 text-center">
          <div className="text-lg font-bold">{listing.Parking}</div>
          <div className="text-sm">PARK</div>
        </div>
        <div className="col-span-1 text-center">
          <div className="text-lg font-bold">{listing.Sqft}</div>
          <div className="text-sm">SQFT</div>
        </div>
      </div>

      {/* Listing Description */}
      <div className="text-sm text-gray-600 mt-4">{listing.Description}</div>
    </div>
  )
}

const ListingDetails = () => {
  const [savedListings, setSavedListings] =
    useState<ListingType[]>(storedListings)

  const [showModal, setShowModal] = useState(false)

  const handleSaveListing = (listing: ListingType) => {
    const isListingAlreadySaved = savedListings.some(
      (savedListing) => savedListing.Id === listing?.Id
    )

    if (!isListingAlreadySaved) {
      setSavedListings([...savedListings, listing])
      setShowModal(true)
    }

    setShowModal(true)
  }

  const closeModal = () => {
    setShowModal(false)
  }

  const { listings, loading } = useListingsData()

  const listingId = useParams().id

  const listing = listings.find((listing) => listing.Id === +listingId)

  useEffect(() => {
    try {
      const storedListings =
        JSON.parse(localStorage.getItem('savedListings') || '') || []
      setSavedListings(storedListings)
    } catch (error) {}
  }, [])

  useEffect(() => {
    localStorage.setItem('savedListings', JSON.stringify(savedListings))
  }, [savedListings])

  if (loading) {
    return <div>Loading...</div>
  }

  if (!listing) {
    return <div>Listing not found</div>
  }

  return (
    <div className="flex justify-center items-center h-screen w-full">
      <div className="flex space-x-8 max-w-screen-xl mx-auto">
        <ListingCard listing={listing} />

        <div className="h-1/2 flex flex-col justify-between">
          <div className="flex justify-end">
            <button
              onClick={() => handleSaveListing(listing)}
              className="bg-blue-500 text-white p-2 rounded-md m-2 cursor-pointer"
            >
              Save Listing
            </button>
          </div>

          <ContactForm />

          {showModal && (
            <Modal onClose={closeModal}>
              <h2 className="text-xl font-bold mb-4">Saved Listings</h2>
              <ul>
                {savedListings.map((savedListing, index) => (
                  <li key={index}>{savedListing.Title}</li>
                ))}
              </ul>
            </Modal>
          )}
        </div>
      </div>
    </div>
  )
}

export default ListingDetails
