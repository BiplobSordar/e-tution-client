import React, { useState } from 'react';
import { FaClock, FaTrash } from 'react-icons/fa';

const AvailabilityInput = ({ availability, setAvailability }) => {
  const [newSlot, setNewSlot] = useState({ day: 0, from: '09:00', to: '17:00' });

  const addSlot = () => {
    setAvailability([...availability, { ...newSlot }]);
    setNewSlot({ day: 0, from: '09:00', to: '17:00' });
  };

  const removeSlot = (index) => {
    setAvailability(availability.filter((_, i) => i !== index));
  };

  const getDayName = (dayNumber) => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return days[dayNumber];
  };

  return (
    <div className="card">
      <h3 className="text-lg font-semibold mb-4 flex items-center text-text-primary">
        <FaClock className="w-5 h-5 mr-2 text-primary" />
        Availability Schedule
      </h3>
      
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          <div>
            <label className="form-label">Day</label>
            <select
              value={newSlot.day}
              onChange={(e) => setNewSlot({ ...newSlot, day: parseInt(e.target.value) })}
              className="form-input"
            >
              {['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map((day, index) => (
                <option key={index} value={index}>{day}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="form-label">From</label>
            <input
              type="time"
              value={newSlot.from}
              onChange={(e) => setNewSlot({ ...newSlot, from: e.target.value })}
              className="form-input"
            />
          </div>
          
          <div>
            <label className="form-label">To</label>
            <input
              type="time"
              value={newSlot.to}
              onChange={(e) => setNewSlot({ ...newSlot, to: e.target.value })}
              className="form-input"
            />
          </div>
          
          <div className="flex items-end">
            <button
              type="button"
              onClick={addSlot}
              className="btn-secondary w-full"
            >
              Add Slot
            </button>
          </div>
        </div>
        
        <div className="space-y-2">
          {availability.map((slot, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 bg-hover-bg rounded-lg"
            >
              <div>
                <p className="font-medium">{getDayName(slot.day)}</p>
                <p className="text-sm text-text-secondary">{slot.from} - {slot.to}</p>
              </div>
              <button
                type="button"
                onClick={() => removeSlot(index)}
                className="text-error hover:text-error/80"
              >
                <FaTrash className="w-4 h-4" />
              </button>
            </div>
          ))}
          {availability.length === 0 && (
            <p className="text-text-secondary italic">No availability slots added yet</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AvailabilityInput;