// eslint-disable-next-line
import React, { Component } from 'react';
import { NavLink } from 'react-router-dom'
import PropTypes from 'prop-types'
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

class DropdownSelect extends Component {
  state = {
    dropdownOpen: false,
  } 

  toggle = this.toggle.bind(this);

  toggle(event) {
    this.setState({ dropdownOpen: !this.state.dropdownOpen })
  } 

  render() {
    const { items, onClick, currentItem } = this.props,
      { dropdownOpen } = this.state,
      dropdownTitle = currentItem ? currentItem : 'Genres',
      list = items
        .map((item, index) => 
          <NavLink 
            key={ index } 
            to={ `/genre/${ item }` } 
            className="dropdown-item" 
            activeClassName="active" 
            onClick={ this.toggle 
            }
          >
            { item }
          </NavLink>        
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
  onClick: PropTypes.func,
  currentItem: PropTypes.string  
}

DropdownSelect.defaultProps = {
  currentItem: 'Genres'
}

export default DropdownSelect;