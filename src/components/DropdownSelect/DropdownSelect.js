// eslint-disable-next-line
import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { Dropdown, DropdownToggle } from 'reactstrap';

class DropdownSelect extends Component {
  state = {
    dropdownOpen: false,
  } 

  toggle = this.toggle.bind(this);

  toggle(event) {
    this.setState({ dropdownOpen: !this.state.dropdownOpen })
  } 

  renderChildren() {
    return React.Children
      .map(this.props.children, child => {
        return child.type.name === 'GenreDropdownMenu' ?
          React.cloneElement(child, {
            onClick: this.toggle
          }) 
          :
          child
      })
  }  

  render() {
    const { caret, title, icon, classes } = this.props,
      { dropdownOpen } = this.state
         
    return <Dropdown className={ classes } isOpen={ dropdownOpen } toggle={ this.toggle }>
      <DropdownToggle caret={ caret }>
        { title !== '' ? title : '' }
        { icon }
      </DropdownToggle>
      { this.renderChildren() }
    </Dropdown>
  }  
}

DropdownSelect.propTypes = {
  caret: PropTypes.bool,
  classes: PropTypes.string,
  children: PropTypes.object,
  title: PropTypes.string,
  icon: PropTypes.object  
}

DropdownSelect.defaultProps = {
  title: ''
}

export default DropdownSelect;