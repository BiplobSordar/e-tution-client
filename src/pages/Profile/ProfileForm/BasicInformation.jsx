import React from 'react';
import { FaUser, FaUpload } from 'react-icons/fa';

const BasicInformation = ({
  register,
  errors,
  avatarPreview,
  handleAvatarUpload, uploadAvatarLoading
}) => (
  <div className="card">
    <h3 className="text-lg font-semibold mb-6 flex items-center text-text-primary">
      <FaUser className="w-5 h-5 mr-2 text-primary" />
      Basic Information
    </h3>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

    

      <div className="md:col-span-2">
        <label className="form-label">Profile Picture</label>

        <div className="flex items-center space-x-6">
          <div className="relative">
            <AvatarPreview preview={avatarPreview} />

         
            <input
              type="file"
              id="avatar-upload"
              accept="image/*"
              onChange={handleAvatarUpload}
              disabled={uploadAvatarLoading}
              className="hidden"
            />

           
            <label
              htmlFor={!uploadAvatarLoading ? "avatar-upload" : undefined}
              className={`absolute bottom-0 right-0 p-2 rounded-full cursor-pointer 
          transition-all
          ${uploadAvatarLoading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-primary hover:bg-primary-hover"
                } text-white`}
            >
              {uploadAvatarLoading ? (
                <svg
                  className="animate-spin w-4 h-4"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                  />
                </svg>
              ) : (
                <FaUpload className="w-4 h-4" />
              )}
            </label>
          </div>

          <div className="flex-1">
            <p className="text-sm text-text-secondary mb-2">
              Upload a clear profile picture. Recommended size: 400x400px
            </p>

            <input type="hidden" {...register("avatarUrl")} />
          </div>
        </div>
      </div>



      <FormField
        label="Full Name *"
        name="name"
        register={register}
        error={errors.name}
        placeholder="Enter your full name"
        required
      />


      <FormField
        label="Email Address *"
        name="email"
        register={register}
        error={errors.email}
        type="email"
        placeholder="Enter your email"
        required
      />


      <FormField
        label="Phone Number"
        name="phone"
        register={register}
        error={errors.phone}
        type="tel"
        placeholder="+1 234 567 8900"
      />


      <FormField
        label="Date of Birth"
        name="dateOfBirth"
        register={register}
        error={errors.dateOfBirth}
        type="date"
      />
    </div>
  </div>
);

const AvatarPreview = ({ preview }) => (
  <div className="w-24 h-24 rounded-full border-4 border-border overflow-hidden">
    {preview ? (
      <img
        src={preview}
        alt="Profile preview"
        className="w-full h-full object-cover"
      />
    ) : (
      <div className="w-full h-full bg-hover-bg flex items-center justify-center">
        <FaUser className="w-12 h-12 text-text-secondary" />
      </div>
    )}
  </div>
);

const FormField = ({
  label,
  name,
  register,
  error,
  type = 'text',
  placeholder,
  required = false
}) => (
  <div>
    <label className="form-label">
      {label}
      {required && <span className="text-error"> *</span>}
    </label>
    <input
      type={type}
      {...register(name)}
      className="form-input"
      placeholder={placeholder}
    />
    {error && (
      <p className="text-error text-sm mt-1">{error.message}</p>
    )}
  </div>
);

export default BasicInformation;