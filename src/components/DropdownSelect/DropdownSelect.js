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
    //console.log(this.props.children.props)
    return React.Children
      .map(this.props.children, child => {
        //console.log(child.type.name)
        if(child.type.name === 'GenreDropdownMenu') {
          return React.cloneElement(child, {
            onClick: (event) => {
              this.toggle(event)
              this.props.children.props.onClick(event)
            }
          }) 
        } else if(child.type.name === 'UserDropdownMenu') {
          return React.cloneElement(child, {
            onClick: (event) => {
              this.toggle(event)
            }
          }) 
        } else {
          return child
        }
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