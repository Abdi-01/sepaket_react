/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import {
  DropdownItem,
  Nav,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
} from "reactstrap";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logoutUser } from "../redux/actions/user";
import { getCartData } from "../redux/actions/cart";

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.bundle";
import Avatar from "../assets/images/avatar2.png";
import Logo3 from "../assets/images/Logo4.png";
import "../assets/styles/navbarStyles.css";

class MyNavbar extends React.Component {
  renderNavAdmin = () => {
    return (
      <div>
        <Nav navbar>
          <UncontrolledDropdown nav inNavbar>
            <DropdownToggle nav caret>
              Products
            </DropdownToggle>
            <DropdownMenu right>
              <DropdownItem>
                <Link to="/admin/manageproducts">Manage Products</Link>
              </DropdownItem>
              <DropdownItem>
                <Link to="/admin/restockproducts">Restock Products</Link>
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
          <UncontrolledDropdown nav inNavbar>
            <DropdownToggle nav caret>
              Parcels
            </DropdownToggle>
            <DropdownMenu right>
              <DropdownItem>
                <Link to="/admin/addparcel">Add Parcel</Link>
              </DropdownItem>
              <DropdownItem>
                <Link to="/admin/manageparcel">Manage Parcel</Link>
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
          <UncontrolledDropdown nav inNavbar>
            <DropdownToggle nav caret>
              Categories
            </DropdownToggle>
            <DropdownMenu right>
              <DropdownItem>Manage Category</DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
          <UncontrolledDropdown nav inNavbar>
            <DropdownToggle nav caret>
              Transactions
            </DropdownToggle>
            <DropdownMenu right>
              <DropdownItem>
                <Link to="/admin/managetransaction">Manage Transaction</Link>
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
          <UncontrolledDropdown nav inNavbar>
            <DropdownToggle nav caret>
              Report
            </DropdownToggle>
            <DropdownMenu right>
              <DropdownItem>
                <Link to="/admin/profitloss">Profit/Loss Report</Link>
              </DropdownItem>
              <DropdownItem>
                <Link to="/admin/salesreport">Sales Report</Link>
              </DropdownItem>
              <DropdownItem>
                <Link to="/admin/revenue">Revenue</Link>
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
          <UncontrolledDropdown nav inNavbar>
            <DropdownToggle nav caret>
              <img src={Avatar} alt="avatar" height="30" /> Hello,{" "}
              {this.props.userGlobal.username}{" "}
            </DropdownToggle>
            <DropdownMenu right>
              <DropdownItem>
                <Link onClick={this.props.logoutUser} to="/">
                  Log Out
                </Link>
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </Nav>
      </div>
    );
  };
  renderNavUser = () => {
    return (
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
          <li className="nav-item">
            <Link to="/home">
              <button class="btn" type="btn" id="btn-regis">
                Choose Parcel
              </button>
            </Link>
          </li>
          <li class="nav-item dropdown">
            <a
              class="nav-link dropdown-toggle"
              href="#"
              id="navbarDropdownMenuLink"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <img src={Avatar} alt="avatar" height="30" /> Hello,
              {this.props.userGlobal.username}
            </a>
            <ul class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
              <li>
                <Link class="dropdown-item" to="/Profile">
                  {" "}
                  Edit Profile{" "}
                </Link>
              </li>
              <li>
                <Link class="dropdown-item" to="/cart">
                  {" "}
                  Cart ({this.props.cartGlobal.cartList.length})
                </Link>
              </li>
              <li>
                <Link class="dropdown-item" to="/transaction">
                  Transaction
                </Link>
              </li>
              <li>
                <hr class="dropdown-divider" />
              </li>
              <li>
                <a
                  class="dropdown-item"
                  onClick={this.props.logoutUser}
                  href="#"
                >
                  Log Out
                </a>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    );
  };

  renderNavNon = () => {
    return (
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
          <li class="nav-item dropdown me-2">
            <a
              class="nav-link dropdown-toggle"
              href="#"
              id="navbarDropdown"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              {" "}
              About Us{" "}
            </a>
            <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
              <li>
                <a class="dropdown-item" href="#about">
                  About Us
                </a>
              </li>
              <li>
                <a class="dropdown-item" href="#contact">
                  Contact Us
                </a>
              </li>
              <li>
                <hr class="dropdown-divider" />
              </li>
              <li>
                <a class="dropdown-item" href="#faq">
                  FAQ
                </a>
              </li>
            </ul>
          </li>
        </ul>
        <div class="d-flex">
          <Link to="/Login">
            <button class="btn border-start" type="btn" id="btn-login">
              {" "}
              Login{" "}
            </button>
          </Link>
          <Link to="/Register">
            <button class="btn" type="btn" id="btn-regis">
              {" "}
              Register{" "}
            </button>
          </Link>
        </div>
      </div>
    );
  };
  render() {
    return (
      <div>
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
          <div class="container-fluid mx-4">
            <Link to="/">
              {" "}
              <img src={Logo3} alt="" height="70" />
            </Link>
            <button
              class="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span class="navbar-toggler-icon"></span>
            </button>

            {this.props.userGlobal.username
              ? this.props.userGlobal.role === "admin"
                ? this.renderNavAdmin()
                : this.renderNavUser()
              : this.renderNavNon()}
          </div>
        </nav>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userGlobal: state.user,
    cartGlobal: state.cart,
  };
};

const mapDispatchToProps = {
  logoutUser,
  getCartData,
};

export default connect(mapStateToProps, mapDispatchToProps)(MyNavbar);
