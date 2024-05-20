// Dropdown.tsx
import React, { ChangeEvent } from "react";

interface DropdownProps {
  onChange: (value: string) => void;
}

const Dropdown: React.FC<DropdownProps> = ({ onChange }) => {
  const handleSortChange = (e: ChangeEvent<HTMLSelectElement>) => {
    onChange(e.target.value);
  };

  return (
    <select onChange={handleSortChange}>
      <option value="desc">จากใหม่ไปเก่า</option>
      <option value="asc">จากเก่าไปใหม่</option>
    </select>
  );
};

export default Dropdown;
