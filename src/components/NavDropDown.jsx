import PropTypes from "prop-types";
import React from "react";
import { Dropdown } from "react-bootstrap";
import Category from "./Category";

class NavDropDown extends React.Component {
  render() {
    const { title } = this.props; // Destructuring props in the render method (optional)
    return (
      <Dropdown>
        <Dropdown.Toggle variant="tertiary" id="nav-dropdown">
          {title}
        </Dropdown.Toggle>

        <Dropdown.Menu>{title === "Category" && <Category />}</Dropdown.Menu>
      </Dropdown>
    );
  }
}

NavDropDown.propTypes = {
  title: PropTypes.node.isRequired, // Validate title prop as a node and make it required
};

export default NavDropDown;
