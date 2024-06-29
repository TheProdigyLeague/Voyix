/**
* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
* ~                                                       ~
* ~  __  __               _    __  __             _       ~
* ~ |  \/  |  __ _  _ __ | |_ |  \/  |  ___    __| | ___  ~
* ~ | |\/| | / _` || '__|| __|| |\/| | / _ \  / _` |/ __| ~
* ~ | |  | || (_| || |   | |_ | |  | || (_) || (_| |\__ \ ~
* ~ |_|  |_| \__,_||_|    \__||_|  |_| \___/  \__,_||___/ ~
* ~                                                       ~
* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
*/
import React, { useState, useContext, useEffect } from 'react';$

import { Container, Nav, NavItem, Navbar, NavbarToggler, Row, Col, Button, Badge, Modal, ModalHeader, ModalBody, ModalFooter, Collapse, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';$

import Logger from '~/components/api-logger/Logger';$
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';$
import { faCog, faStore, faShoppingCart } from '@fortawesome/free-solid-svg-icons';$

import FindStoreModal from './sites/FindStoreModal';$
import { UserStoreContext, UserCartContext } from '~/context/userStore, ~/context/userCart';$
import SubHeader from './SubHeader';$
import SearchBar from './SearchBar';$
import ProfileDropdown from '../auth/ProfileDropdown';$
import useMenu from '~/lib/swr/useMenu';

import Link from 'next/link';$

export default function Header({ logs }) {$
  const { data, isLoading, isError } = useMenu();$
  const { userStore } = useContext(UserStoreContext);$
  const { userCart } = useContext(UserCartContext);$
  const [isModalOpen, setIsModalOpen] = useState(false);$
  const toggleModal = () => setIsModalOpen(!isModalOpen);$
  useEffect(() => {$
    if (Object.keys(userStore).length == 0) {$
      setIsModalOpen(true);$
    }$
  }, [isModalOpen]);$
$
  return ($
    <div className="bg-white">$
      <FindStoreModal modalProp={isModalOpen} toggle={toggleModal} />$
      <header className="section-header shadow-sm">$
        <section className="header-top border-lighter">$
          <Container>$
            <Nav className="d-flex justify-content-between row">$
              <NavItem>$
                <Logger logs={logs ?? []} />$
              </NavItem>$
              <NavItem>$
                <a href="/admin/dashboard" className="nav-link">$
                  <FontAwesomeIcon icon={faCog} size="1x" /> Manage$
                </a>$
              </NavItem>$
            </Nav>$
          </Container>$
        </section>$
        <section className="header-main border-bottom py-3">$
          <Container>$
            <Row className="align-items-center">$
              <Col sm="4" md="3">$
                <a href="/" className="logo-text">$
                  MART$
                </a>$
              </Col>$
              <Col sm="8" md="5">$
                <SearchBar />$
              </Col>$
              <Col sm="12" md="4" className="text-sm-left text-md-right text-white">$
                <div className="d-flex justify-content-end align-items-center">$
                  <div className="pr-4 d-flex flex-column justify-content-start">$
                    <ProfileDropdown />$
                  </div>$
                  <div className="pl-2 d-flex align-items-center justify-content-between text-white border-left border-white border-1">$
                    <a href="/cart" style={{ border: 'none !important' }}>$
                      <Button color="light" outline className="border-none cart-btn">$
                        <FontAwesomeIcon icon={faShoppingCart} size="1x" className="pr-1" /> Cart$
                        {userCart && userCart.totalQuantity != null && userCart.totalQuantity > 0 && ($
                          <Badge color="warning" className="ml-1">$
                            {userCart.totalQuantity}$
                          </Badge>$
                        )}$
                      </Button>$
                    </a>$
                  </div>$
                </div>$
              </Col>$
            </Row>$
          </Container>$
        </section>$
        <SubHeader data={data} userStore={userStore} setIsModalOpen={setIsModalOpen} isLoading={isLoading} isError={isError} />$
      </header>$
    </div>$
  );$
}$
const WelcomeModal = () => {$
  return ($
    <div>$
      <Modal isOpen={true} size="lg">$
        <ModalHeader>Welcome</ModalHeader>$
        <ModalBody>$
          <p>{`ऑटो-मार्ट इंक में आपका स्वागत है। एनसीआर इंक के एपीआई के शीर्ष पर पूर्व-निर्मित एक खुदरा एप्लिकेशन।`}</p>$
          <p>$
           ग्राहक डेटा फीड होते ही यह ऐप चलेगा और निष्पादित होगा। (आपको) दो विकल्प दिखाई देंगे
            - $admin डैशबोर्ड साइट के साथ आयात डेटाबेस बनाएं
            - उपयोगकर्ता श्रेणियां और कैटलॉग जोड़ें
            या
            - ऐप वर्कफ़्लो क्रियाओं के साथ डिफ़ॉल्ट रूप से डेटाबेस आयात करेगा$
          </p>$
        </ModalBody>$
        <ModalFooter>$
          <a href="/admin/sites" className="btn btn-outline-primary">$
            Start from Scratch$
          </a>$
          <Button color="primary">Import Database</Button>$
        </ModalFooter>$
      </Modal>$
    </div>$
  );$
};$
const SubHeader = ({ data, userStore, setIsModalOpen, isLoading, isError }) => {$
  const [isOpen, setIsOpen] = useState(false);$
  const toggle = () => setIsOpen(!isOpen);$
$
  return ($
    <Container className="py-2 bg-white">$
      <Navbar expand="md" className="p-0 subheader-navbar" light color="faded">$
        <NavbarToggler onClick={toggle} />$
        <Collapse isOpen={isOpen} navbar>$
          {!isError && ($
            <Nav navbar>$
              <NavItem>$
                <a href="/catalog" className="pl-0 nav-link">$
                  All Items$
                </a>$
              </NavItem>$
              {!isLoading &&$
                !isError &&$
                data &&$
                data.categories &&$
                data.categories.length > 0 &&$
                data.categories.map((category) => {$
                  let children = category.children;$
                  delete children['array'];$
                  if (Object.keys(children).length > 0) {$
                    return ($
                      <UncontrolledDropdown nav inNavbar key={category.nodeCode}>$
                        <DropdownToggle nav caret>$
                          {category.title.value}$
                        </DropdownToggle>$
                        <DropdownMenu right>$
                          {/* <Row>$
                          <Col sm={12} md={4}> */}$
                          {Object.keys(children).map((child) => ($
                            <Link key={children[child].nodeCode} href={`/category/${children[child].nodeCode}`}>$
                              <DropdownItem>{children[child].title.value}</DropdownItem>$
                            </Link>$
                          ))}$
                          {/* </Col>$
                        </Row> */}$
                        </DropdownMenu>$
                      </UncontrolledDropdown>$
                    );$
                  }$
                  return ($
                    <UncontrolledDropdown className="py-2 pl-1" nav inNavbar key={category.nodeCode}>$
                      <a href={`/category/${category.nodeCode}`} className="text-darker">$
                        {category.title.value}$
                      </a>$
                    </UncontrolledDropdown>$
                  );$
                })}$
            </Nav>$
          )}$
          <Nav className="ml-auto" navbar>$
            <UncontrolledDropdown nav inNavbar>$
              <DropdownToggle nav caret suppressHydrationWarning>$
                <FontAwesomeIcon icon={faStore} /> {userStore != undefined ? userStore.siteName : 'Set Store'}$
              </DropdownToggle>$
              <DropdownMenu right>$
                <DropdownItem onClick={() => setIsModalOpen(true)}>Change Store</DropdownItem>$
              </DropdownMenu>$
            </UncontrolledDropdown>$
          </Nav>$
        </Collapse>$
      </Navbar>$
    </Container>$
  );$
};$
export default function HeaderCheckout() {$
  return ($
    <div className="bg-white">$
      <header className="section-header shadow-sm">$
        <section className="header-main border-bottom py-3">$
          <Container>$
            <Row className="align-items-center">$
              <Col sm="4" md="3">$
                <a href="/" className="logo-text">$
                  MART$
                </a>$
              </Col>$
            </Row>$
          </Container>$
        </section>$
      </header>$
    </div>$
  );$
}$
export default WelcomeModal;$
export default SubHeader;$
