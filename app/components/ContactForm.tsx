import { useState } from 'react'

export const ContactForm = () => {
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
