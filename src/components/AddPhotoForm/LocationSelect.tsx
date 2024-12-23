import React from 'react';

interface LocationSelectProps {
  label: string;
  options: { id: string; name: string }[];
  selected: string;
  newValue: string;
  setSelected: (value: string) => void;
  setNewValue: (value: string) => void;
}

const LocationSelect: React.FC<LocationSelectProps> = ({
  label,
  options,
  selected,
  newValue,
  setSelected,
  setNewValue,
}) => {
  return (
    <div>
      <label>{label}:</label>
      <select
        value={selected}
        onChange={(e) => {
          setSelected(e.target.value);
          setNewValue('');
        }}
      >
        <option value="">Выбрать</option>
        {options.map((option) => (
          <option key={option.id} value={option.id}>
            {option.name}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder={`Новый ${label.toLowerCase()}`}
        value={newValue}
        onChange={(e) => setNewValue(e.target.value)}
        disabled={!!selected}
      />
    </div>
  );
};

export default LocationSelect;
