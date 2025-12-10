import React from 'react';
import { FaHome } from 'react-icons/fa';

const AddressInformation = ({ register }) => (
  <div className="card">
    <h3 className="text-lg font-semibold mb-6 flex items-center text-text-primary">
      <FaHome className="w-5 h-5 mr-2 text-primary" />
      Address Information
    </h3>
    
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <AddressField
        label="Street Address"
        name="address.street"
        register={register}
        placeholder="123 Main Street"
      />
      
      <AddressField
        label="City"
        name="address.city"
        register={register}
        placeholder="Enter city"
      />
      
      <AddressField
        label="State/Province"
        name="address.state"
        register={register}
        placeholder="Enter state"
      />
      
      <AddressField
        label="Country"
        name="address.country"
        register={register}
        placeholder="Enter country"
      />
      
      <AddressField
        label="ZIP/Postal Code"
        name="address.zipCode"
        register={register}
        placeholder="12345"
      />
    </div>
  </div>
);

const AddressField = ({ label, name, register, placeholder }) => (
  <div>
    <label className="form-label">{label}</label>
    <input
      type="text"
      {...register(name)}
      className="form-input"
      placeholder={placeholder}
    />
  </div>
);

export default AddressInformation;