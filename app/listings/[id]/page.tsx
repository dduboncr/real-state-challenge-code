'use client'
import { ListingType, useListingsData } from '@/app/hooks/useListingsData'
import Image from 'next/image'
import { useParams } from 'next/navigation'
import React, { useState, useEffect } from 'react'

const ListingCard = ({ listing }: { listing: ListingType }) => {
  return (
    <div className="max-w-lg p-8 bg-white shadow-md rounded-md border">
      <div className="flex justify-between mb-4">
        <div className="text-xl font-bold">{listing.Title}</div>
        <div className="text-xl font-bold">${listing['Sale Price']}</div>
      </div>

      <div className="flex justify-between mb-2">
        <div className="text-sm text-gray-500">{listing.Location}</div>
        <div className="text-sm text-gray-500">{listing.DateListed}</div>
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

const ContactForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    comments: '',
  })

  const [successMessage, setSuccessMessage] = useState('')

  const [validationMessages, setValidationMessages] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    comments: '',
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })

    setValidationMessages({ ...validationMessages, [name]: '' })
  }

  const validateForm = () => {
    let isValid = true
    const newValidationMessages: {
      fullName?: string
      email?: string
      phoneNumber?: string
      comments?: string
    } = {}

    if (formData.fullName.trim() === '') {
      newValidationMessages.fullName = 'Full Name is required'
      isValid = false
    }

    if (formData.email.trim() === '') {
      newValidationMessages.email = 'Email is required'
      isValid = false
    } else if (!isValidEmail(formData.email)) {
      newValidationMessages.email = 'Invalid email format'
      isValid = false
    }

    if (formData.phoneNumber.trim() === '') {
      newValidationMessages.phoneNumber = 'Phone Number is required'
      isValid = false
    } else if (!isValidPhoneNumber(formData.phoneNumber)) {
      newValidationMessages.phoneNumber = 'Invalid phone number format'
      isValid = false
    }

    if (formData.comments.trim() === '') {
      newValidationMessages.comments = 'Comments are required'
      isValid = false
    }

    setValidationMessages(newValidationMessages)

    if (isValid) {
      setSuccessMessage('Form submitted successfully')
    }

    return isValid
  }

  const isValidEmail = (email: string) => {
    // Simple email validation. You can replace this with a more robust solution if needed.
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const isValidPhoneNumber = (phoneNumber: string) => {
    const phoneRegex = /^(\d{8}|\d{10}|\d{11}|\d{12})$/

    return phoneRegex.test(phoneNumber)
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const isValid = validateForm()

    console.log({ isValid })

    if (isValid) {
      console.log('Form Submitted:', formData)
    }
  }

  return (
    <div className="max-w-md p-8 bg-gray-100 rounded-md">
      <h2 className="text-xl font-bold mb-4">Contact Agent</h2>
      <form onSubmit={handleSubmit}>
        {successMessage && (
          <p className="text-green-500 text-sm mt-4">{successMessage}</p>
        )}
        <div className="mb-4">
          <label
            htmlFor="fullName"
            className="block text-sm font-medium text-gray-600"
          >
            Full Name
          </label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            className={`mt-1 p-2 w-full border rounded-md ${
              validationMessages.fullName ? 'border-red-500' : ''
            }`}
          />
          {validationMessages.fullName && (
            <p className="text-red-500 text-sm mt-1">
              {validationMessages.fullName}
            </p>
          )}
        </div>

        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-600"
          >
            Email
          </label>
          <input
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`mt-1 p-2 w-full border rounded-md ${
              validationMessages.email ? 'border-red-500' : ''
            }`}
          />
          {validationMessages.email && (
            <p className="text-red-500 text-sm mt-1">
              {validationMessages.email}
            </p>
          )}
        </div>

        <div className="mb-4">
          <label
            htmlFor="phoneNumber"
            className="block text-sm font-medium text-gray-600"
          >
            Phone Number
          </label>
          <input
            id="phoneNumber"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            className={`mt-1 p-2 w-full border rounded-md ${
              validationMessages.phoneNumber ? 'border-red-500' : ''
            }`}
          />
          {validationMessages.phoneNumber && (
            <p className="text-red-500 text-sm mt-1">
              {validationMessages.phoneNumber}
            </p>
          )}
        </div>

        <div className="mb-4">
          <label
            htmlFor="comments"
            className="block text-sm font-medium text-gray-600"
          >
            Comments
          </label>
          <textarea
            id="comments"
            name="comments"
            value={formData.comments}
            onChange={handleChange}
            rows="4"
            className={`mt-1 p-2 w-full border rounded-md ${
              validationMessages.comments ? 'border-red-500' : ''
            }`}
          />
          {validationMessages.comments && (
            <p className="text-red-500 text-sm mt-1">
              {validationMessages.comments}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Contact Now
        </button>
      </form>
    </div>
  )
}

const ListingDetails = () => {
  const { listings, loading } = useListingsData()

  const listingId = useParams().id

  const listing = listings.find((listing) => listing.Id === +listingId)

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
          {/* Move the "Save Listing" button to the right */}
          <div className="flex justify-end">
            <button className="bg-blue-500 text-white p-2 rounded-md m-2 cursor-pointer">
              Save Listing
            </button>
          </div>

          <ContactForm />
        </div>
      </div>
    </div>
  )
}

export default ListingDetails
