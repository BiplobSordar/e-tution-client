import React, { useState } from 'react';
import { FaCheckCircle, FaTrash, FaTimes } from 'react-icons/fa';

const ArrayInput = ({ 
  title, 
  icon, 
  items, 
  setItems, 
  placeholder, 
  itemClassName = '',
  listStyle = false 
}) => {
  const [newItem, setNewItem] = useState('');

  const addItem = () => {
    if (newItem.trim()) {
      setItems([...items, newItem.trim()]);
      setNewItem('');
    }
  };

  const removeItem = (index) => {
    setItems(items.filter((_, i) => i !== index));
  };

  return (
    <div className="card">
      <h3 className="text-lg font-semibold mb-4 flex items-center text-text-primary">
        {icon}
        {title}
      </h3>
      
      <div className="space-y-4">
        <div className="flex gap-2">
          <input
            type="text"
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
            className="form-input flex-1"
            placeholder={placeholder}
            onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addItem())}
          />
          <button
            type="button"
            onClick={addItem}
            className="btn-secondary"
          >
            Add
          </button>
        </div>
        
        {listStyle ? (
          <div className="space-y-2">
            {items.map((item, index) => (
              <ListItem 
                key={index} 
                item={item} 
                index={index} 
                removeItem={removeItem} 
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-wrap gap-2">
            {items.map((item, index) => (
              <PillItem 
                key={index} 
                item={item} 
                index={index} 
                removeItem={removeItem}
                className={itemClassName}
              />
            ))}
          </div>
        )}
        
        {items.length === 0 && (
          <p className="text-text-secondary italic">No items added yet</p>
        )}
      </div>
    </div>
  );
};

const ListItem = ({ item, index, removeItem }) => (
  <div className="flex items-center justify-between p-3 bg-hover-bg rounded-lg">
    <div className="flex items-center">
      <FaCheckCircle className="w-4 h-4 text-success mr-3" />
      <span>{item}</span>
    </div>
    <button
      type="button"
      onClick={() => removeItem(index)}
      className="text-error hover:text-error/80"
    >
      <FaTrash className="w-4 h-4" />
    </button>
  </div>
);

const PillItem = ({ item, index, removeItem, className }) => (
  <div className={`px-3 py-2 rounded-full flex items-center ${className}`}>
    <span>{item}</span>
    <button
      type="button"
      onClick={() => removeItem(index)}
      className="ml-2 hover:opacity-80"
    >
      <FaTimes className="w-3 h-3" />
    </button>
  </div>
);

export default ArrayInput;