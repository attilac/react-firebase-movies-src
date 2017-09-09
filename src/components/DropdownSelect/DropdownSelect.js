// eslint-disable-next-line
import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

class DropdownSelect extends Component {
  state = {
    dropdownOpen: false,
  } 

  toggle = this.toggle.bind(this);

  toggle() {
    this.setState({ dropdownOpen: !this.state.dropdownOpen })
  } 

  render() {
    const { items, onClick, currentItem } = this.props,
      { dropdownOpen } = this.state,
      dropdownTitle = currentItem ? currentItem : 'Genres',
      list = items
        .map((item, index) => 
          <DropdownItem key={ index } onClick={ onClick } active={ item === currentItem }>{ item }</DropdownItem>
        ); 

    return <Dropdown className="mr-3" isOpen={ dropdownOpen } toggle={ this.toggle }>
      <DropdownToggle caret>
        { dropdownTitle }
      </DropdownToggle>
      <DropdownMenu>
        { list }
      </DropdownMenu>
    </Dropdown>
  }  
}

DropdownSelect.propTypes = {
  items: PropTypes.arrayOf(PropTypes.string).isRequired,
  onClick: PropTypes.func.isRequired,
  currentItem: PropTypes.string  
}

DropdownSelect.defaultProps = {
  currentItem: 'Genres'
}

export default DropdownSelect;