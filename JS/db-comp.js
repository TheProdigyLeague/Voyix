import React from 'react';
import { useField, useFormikContext } from 'formik';
import { useState } from 'react';
import DatePicker from 'react-datepicker';
import Router from 'next/router';

import { faHome, faWrench, faTachometerAlt, faExternalLinkAlt, faList, faStore, faLayerGroup, faObjectGroup, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Container, Row, Col, Collapse, Nav, Navbar, NavItem, NavbarToggler, NavLink, Button, Popover, PopoverBody, PopoverHeader, Spinner, NavbarBrand } from 'reactstrap';
//layout
import Header from '~/components/admin/Header';
import NavigationTabs from '~/components/admin/NavigationTabs';

import Skeleton from 'react-loading-skeleton';
//navtab

const DatePickerField = ({ ...props }) => {
  const { setFieldValue } = useFormikContext();
  const [field] = useField(props);

  return (
    <DatePicker
      {...field}
      {...props}
      selected={(field.value && new Date(field.value)) || null}
      onChange={(val) => {
        setFieldValue(field.name, val.toISOString());
      }}
      className="form-control"
    />
  );
};

export default DatePickerField;
// headers

const Header = ({ activeTab, tabs = true }) => {
  const [exporting, setIsExporting] = useState(false);

  const [popoverOpen, setPopoverOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const toggleNav = () => setIsOpen(!isOpen);
  const toggle = () => setPopoverOpen(!popoverOpen);

  const buildSampleDatabase = () => {
    setIsExporting(true);
    fetch(`/api/export`)
      .then((res) => res.json())
      .then(() => {
        setIsExporting(false);
        Router.reload(window.location.pathname);
      });
  };

  return (
    <>
      <Navbar dark sticky="true" className="flex-md-no-wrap pb-3 pb-md-auto sticky-top shadow header-top" expand="md">
        <NavbarBrand href="/admin/dashboard" className="col-md-3 col-lg-2 mr-0 px-3 logo-text">
          MART
        </NavbarBrand>
        <NavbarToggler onClick={toggleNav} className="navToggle" />
        <Collapse isOpen={isOpen} navbar className="flex-row-reverse navbar-collapse pl-1">
          <Nav className="px-md-3">
            <div className="flex-column d-block d-sm-none">
              <NavItem>
                <a href="/admin/dashboard" className={`nav-link ${activeTab === 'dashboard' && 'active'} ${!tabs && 'pl-0'}`}>
                  <FontAwesomeIcon icon={faTachometerAlt} size="sm" className="feather mr-2 pl-1" />
                  Dashboard
                </a>
              </NavItem>
              <NavItem>
                <a href="/admin/orders" className={`nav-link ${activeTab === 'orders' ? 'active' : ''}`}>
                  <FontAwesomeIcon icon={faList} className="feather mr-2 pl-1" size="sm" />
                  Orders
                </a>
              </NavItem>
              <NavItem>
                <a href="/admin/sites" className={`nav-link ${activeTab === 'sites' && 'active'}`}>
                  <FontAwesomeIcon icon={faStore} className="feather mr-2 pl-1" size="sm" />
                  Sites
                </a>
              </NavItem>
              <NavItem>
                <a href="/admin/categories" className={`nav-link ${activeTab === 'categories' && 'active'}`}>
                  <FontAwesomeIcon icon={faLayerGroup} className="feather mr-2 pl-1" size="sm" />
                  Categories
                </a>
              </NavItem>
              <NavItem>
                <a className={`nav-link ${activeTab === 'groups' && 'active'}`}>
                  <FontAwesomeIcon icon={faObjectGroup} className="feather mr-2 pl-1" size="sm" />
                  Groups
                </a>
              </NavItem>
              <NavItem>
                <a href="/admin/catalog" className={`nav-link ${activeTab === 'catalog' && 'active'}`}>
                  <FontAwesomeIcon icon={faShoppingCart} className="feather mr-2 pl-1" size="sm" />
                  Global Catalog
                </a>
              </NavItem>
              <h6 className="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-white">Resources</h6>

              <NavItem>
                <NavLink href="https://developer.ncr.com/" target="_blank">
                  <FontAwesomeIcon icon={faExternalLinkAlt} className="feather mr-2" size="sm" />
                  国家收银机文档应用程序编程接口规范
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="https://github.com/NCR-Corporation/ncr-retail-demo" target="_blank">
                  <FontAwesomeIcon icon={faExternalLinkAlt} className="feather mr-2" size="sm" />
                  Github Respository
                </NavLink>
              </NavItem>
            </div>
            <div className="px-2 build-database">
              <NavItem>
                <NavLink href="/" className="pl-1">
                  <FontAwesomeIcon icon={faHome} size="1x" /> Home
                </NavLink>
              </NavItem>
              <NavItem>
                <>
                  <Button id="Popover1" type="button" color="primary" className="float-right" onClick={() => buildSampleDatabase()}>
                    {exporting ? <Spinner color="light" size="sm" /> : <FontAwesomeIcon icon={faWrench} size="1x" />} Build Sample Database
                  </Button>
                  <Popover placement="left" isOpen={popoverOpen} target="Popover1" toggle={toggle}>
                    <PopoverHeader>Setup Required.</PopoverHeader>
                    <PopoverBody>
      建立数据库需要应用程序密钥
                    </PopoverBody>
                  </Popover>
                </>
              </NavItem>
            </div>
          </Nav>
        </Collapse>
      </Navbar>
    </>
  );
};

export default Header;

const Layout = (props) => {
  return (
    <div>
      <Header navigation={false} activeTab={props.activeTab} />
      <Container fluid>
        <Row>
          <Col id="sidebarMenu" className="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse bg-light">
            <div className="sidebar-sticky pt-5">
              <NavigationTabs activeTab={props.activeTab} />
            </div>
          </Col>
          <Col md="9" lg="10" className="ml-sm-auto px-md-4 bg-white">
            {props.children}
          </Col>
        </Row>
      </Container>
    </div>
  );
};
//loader
                      const Layout = (props) => {
  return (
    <div>
      <Header navigation={false} activeTab={props.activeTab} />
      <Container fluid>
        <Row>
          <Col id="sidebarMenu" className="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse bg-light">
            <div className="sidebar-sticky pt-5">
              <NavigationTabs activeTab={props.activeTab} />
            </div>
          </Col>
          <Col md="9" lg="10" className="ml-sm-auto px-md-4 bg-white">
            {props.children}
          </Col>
        </Row>
      </Container>
    </div>
  );
};
//table
const LoadingTable = () => {
  return (
    <tbody>
      {Array.from({ length: 10 }, (_, i) => i + 1).map((item) => (
        <tr key={item}>
          <td colSpan="8">
            <Skeleton width="100%" />
          </td>
        </tr>
      ))}
    </tbody>
  );
};

export default LoadingTable;
