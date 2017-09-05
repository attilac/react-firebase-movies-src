// eslint-disable-next-line
import React, { Component } from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

function DropdownSelect(props) {
  const { dropdownOpen, toggle, items, onClick, genre } = props,
    currentGenre = genre ? genre : 'Genres',
    list = items
      .map((item, index) => 
        <DropdownItem key={ index } onClick={ onClick } active={ item === genre }>{ item }</DropdownItem>
      ); 

  return <Dropdown className="mr-3" isOpen={ dropdownOpen } toggle={ toggle }>
    <DropdownToggle caret>
      { currentGenre }
    </DropdownToggle>
    <DropdownMenu>
      { list }
    </DropdownMenu>
  </Dropdown>
}

export default DropdownSelect;