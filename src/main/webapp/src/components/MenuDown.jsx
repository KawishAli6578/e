import { Box, Button, Checkbox, Menu, MenuItem } from '@mui/material';
import PropTypes from 'prop-types';
import { FaChevronDown } from 'react-icons/fa';
import React, { useState } from 'react';

const MenuDown = ({
  menuType = 'single',
  titleIcon,
  title,
  options,
  labelKey,
  imgKey,
  valKey,
  selectedItems,
  setSelectedFilters,
  filterKey,
  onSelectionChange,
  fullWidth = false,
  variant = 'contained' // Optional callback to notify parent component of changes
}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const openMenu = Boolean(anchorEl);

  const handleMenuItemClick = (fieldVal, fieldLabel) => {
    const flterItemObj = { name: filterKey, label: fieldLabel, value: fieldVal };

    setSelectedFilters((prev) => {
      if (menuType === 'multiple') {
        const exists = prev.some((item) => item.name === flterItemObj.name && item.value === flterItemObj.value);

        return exists
          ? prev.filter((item) => !(item.name === flterItemObj.name && item.value === flterItemObj.value))
          : [...prev, flterItemObj];
      } else {
        // Single selection mode
        const newFilters = prev.filter((item) => item.name !== filterKey);
        return [...newFilters, flterItemObj];
      }
    });

    // Update selectedItems (e.g., storeIds or platform) based on selection
    let updatedSelectedItems = [...selectedItems];
    if (selectedItems.includes(fieldVal)) {
      updatedSelectedItems = selectedItems.filter((val) => val !== fieldVal);
    } else {
      if (menuType === 'single') {
        updatedSelectedItems = [fieldVal];
      } else {
        updatedSelectedItems.push(fieldVal);
      }
    }

    // Optionally notify the parent component
    if (onSelectionChange) {
      onSelectionChange(updatedSelectedItems);
    }

    if (menuType === 'single') {
      setAnchorEl(null);
    }
  };

  return (
    <Box>
      <Button
        id="basic-button"
        variant={variant}
        aria-controls={openMenu ? 'basic-menu' : undefined}
        aria-haspopup="true"
        fullWidth={fullWidth}
        aria-expanded={openMenu ? 'true' : undefined}
        onClick={(event) => setAnchorEl(event.currentTarget)}
        sx={{ display: 'flex', alignItems: 'center', gap: '5px', whiteSpace: 'nowrap', justifyContent: 'space-between' }}
      >
        {titleIcon}
        {title}
        <FaChevronDown />
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={openMenu}
        onClose={() => setAnchorEl(null)}
        MenuListProps={{ 'aria-labelledby': 'basic-button' }}
      >
        {options?.map((option, index) => {
          const fieldVal = option[valKey];
          const fieldLabel = option[labelKey];
          const fieldImg = option[imgKey];

          return (
            <MenuItem
              key={`ship-menu-${index}`}
              sx={{ gap: 1, display: 'flex', alignItems: 'center' }}
              onClick={() => handleMenuItemClick(fieldVal, fieldLabel)}
            >
              <div style={{ display: 'flex', alignItems: 'center' }}>
                {menuType !== 'single' && <Checkbox checked={selectedItems?.includes(fieldVal)} />}
                {fieldImg && <img style={{ width: 40 }} src={fieldImg} alt={fieldLabel} />}
              </div>
              {fieldLabel}
            </MenuItem>
          );
        })}
      </Menu>
    </Box>
  );
};

MenuDown.propTypes = {
  menuType: PropTypes.string,
  titleIcon: PropTypes.any,
  title: PropTypes.string,
  options: PropTypes.array.isRequired,
  labelKey: PropTypes.string.isRequired,
  imgKey: PropTypes.string,
  valKey: PropTypes.string.isRequired,
  selectedItems: PropTypes.array.isRequired,
  setSelectedFilters: PropTypes.func.isRequired,
  filterKey: PropTypes.string.isRequired,
  onSelectionChange: PropTypes.func // Optional prop to notify parent component
};

export default MenuDown;
