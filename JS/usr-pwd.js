/** %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%@%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%%%%%%%%%%%%%%%%%%%%%%%%%%@@%%%%%%@%%%%@%%%%%%%%%%%%%%%%%%%%%%%%@@%%%#%@@%%%%%%%%%%%%%%%%%%%%%%%%%%%
%%%%%%%%%%%%%%%%%%%%%@%@@#+=========+*%@%%%%%%%%%%%%%%%%%%%%@%*===========#@%%%%%%%%%%%%%%%%%%%%%%%%
%%%%%%%%%%%%%%%%%%%%%%@%+===============+%@%%%%%%%%%%%%%%@%+===============+@%@%%%%%%%%%%%%%%%%%%%%%
%%%%%%%%%%%%%%%%%%%%%%%===-+%@%%@%%*+======+%%@%%%%%%@@%+======+#%@%%%@%+====%%%%%%%%%%%%%%%%%%%%%%%
%%%%%%%%%%%%%%%%%%%%%@+===*%%%%%%%%%%@%+======#%%%%%@#======*%%%%%%%%%%@%+===*@%%%%%%%%%%%%%%%%%%%%%
%%%%%%%%%%%%%%%%%%%%@%====@%%%%%%%%%%%%%@%+=====#@@#=====+%@%%@%%%%%%%%%%@====%%%%%%%%%%%%%%%%%%%%%%
%%%%%%%%%%%%%%%%%%%%@*===*%%%%%%%%%%%%%%%%%@+========-=+%%%@%%%@%%%%%%%%%@+===#%%%%%%%%%%%%%%%%%%%%%
%%%%%%%%%%%%%%%%%%%%@+===#%%%%%%%%%%%%%%%%%%%%*======*%%%%@%%%%%%%%%%%%%%%*===+%%%%%%%%%%%%%%%%%%%%%
%%%%%%%%%%%%%%%%%%%%%+==-#%%%%%%%%%%%%%%%%@%%%+=======%%%%%%%%%%%%%%%%%@%%#===+%%%%%%%%%%%%%%%%%%%%%
%%%%%%%%%%%%%%%%%%%%%+===#%%%%%%%%%%%%%%%%%@*=====+====*@%%%%%%%%%%%%%%%%%#===+@%%%%%%%%%%%%%%%%%%%%
%%%%%%%%%%%%%%%%%%%%@*===*%%@%%%%%%%%%%%%%%=====#%%#=====%%%%%%%%%%%%%%%%%*===*%%%%%%%%%%%%%%%%%%%%%
%%%%%%%%%%%%%%%%%%%%%#===+@%%%%%%%%%%%%%@#====+%%%%%%+====#%%%%%%%%%%%%%%@+===#%%%%%%%%%%%%%%%%%%%%%
%%%%%%%%%%%%%%%%%%%%%%====%%%%%%%%%%%%%@+====#@@@@@@@@#====+%%%%%%%%%%%%%@====%%%%%%%%%%%%%%%%%%%%%%
%%%%%%%%%%%%%%%%%%%%%@*===#@%@@@%%%#**+======================+**##%%%@@@@#===+%%%%%%%%%%%%%%%%%%%%%%
%%%%%%%%%%%%%%%%%%%%%@#====+============================================+====#@%%%%%%%%%%%%%%%%%%%%%
%%%%%%%%%%%%%%%%@%%#+====================*##%%%%%%%%%%%%%#*====================+#%%%%%%%%%%%%%%%%%%%
%%%%%%%%%%%@%@#+============#%%@%%%*====%%%%@%%%%%%%%%%@%%%%====*%%@@%##============*%@%@%%%%%%%%%%%
%%%%%%%%%@@*=======-=#%@+===#%%%%@+====%%@%%%%%%%%%%%%%@@%@%%====+%%%%@#====@%*=========#@%%%%%%%%%%
%%%%%%%@%======-*%@%%%%@#====%%@@+===+%%%@%%%%%@@@@@%%%@%%%@%%====+@@%%===-#@%%%@@#+-======%%%%%%%%%
%%%%%@#======#@%%%@%%%%%@*===+@@+====%%%%@%%@%+======+%@%%%%%%@====+%@+===*%%%%%%%%%%%*======%%%%%%%
%%%%@+===-*%%%%%%%%%%%%%%%====#====+%%%%%%@#============#@%%%@%@+===+*====%%%%%%%%%%%%@%%+====+%%%%%
%%%%+====%%%%%%%%%%%%%%%%@%=======+%%%%%%@*==============*@%%%%%@+=======%%%%%%%%%%%%%%%%%%=====%%%%
%%@+===+@%%%%%%%%%%%%%%%%%%#======%%%%%%%%================%%%%%%%%=====-#%%%%%%%%%%%%%%%%%%@+===*@%%
%@%+==-#%%%%%%%%%%%%%%%%%%%@+====%%%%%%%@#================#%%%%%%%%====+%%%%%%%%%%%%%%%%%%%@%====%%%
%%@+===*@%%%%%%%%%%%%%%%%%%#======%%%%%%%%================%%%%%%%@======#%%%%%%%%%%%%%%%%%%@*===*%%%
%%%%====+%%%%%%%%%%%%%%%%%@=======+%%%%%%%*==============*@%%%%%@+=======%%%%%%%%%%%%%%%%@@=====%%%%
%%%%%+====*%%%%%%%%%%%%%%@====*====+%%%%%%@#===========-#@%%%%%@+====*====%%%%%%%%%%%%%%@*====+%%%%%
%%%%%%#=====+%%%%%%%%%%%@#===+%@+===+%@%%@%%@#========#@%%%%%%@+===+%@*===*%%%%%%@%%%@#=====-%%%%%%%
%%%%%%%@#=====-+#@%%%%%@%===-%%@%====+%@%@%%@@%%%%%%%%%%%%@%%%+====%%%%====#@%%%%@@#=======%%%%%%%%%
%%%%%%%%%%%+-=======*%@@+==-*%%%%%+====%%@%%%%%%%%%%%%%%%%@%%+===+%%@%%#====@@%+-======-*%%%%%%%%%%%
%%%%%%%%%%%%%%*======+=====+%@@@%%%+====%%%%%%%%%%%%%%%%%%%%====+%%@@@@%+==========-=#@%@%%%%%%%%%%%
%%%%%%%%%%%%%%%%%%#+==============++=====#%%@@@@@@@@@@@%@%#=====+=============-=*#%%%%%%%%%%%%%%%%%%
%%%%%%%%%%%%%%%%%%%%%@#===-============================================-=====*@%%%%%%%%%%%%%%%%%%%%%
%%%%%%%%%%%%%%%%%%%%%@+===#@%%%%#**++=========================++*###%%@@@%===+%%%%%%%%%%%%%%%%%%%%%%
%%%%%%%%%%%%%%%%%%%%%@====%%%%%%%%%%%%@%+====#@%%%%@%@%====+%%%%%%%%%%%%%@+===%%%%%%%%%%%%%%%%%%%%%%
%%%%%%%%%%%%%%%%%%%%%#===+@%%%%%%%%%%%%%@#====+%%%%%@*===-*%%%%%%%%%%%%%%%*===*%%%%%%%%%%%%%%%%%%%%%
%%%%%%%%%%%%%%%%%%%%@*===*%%%%%%%%%%%%%%%%%===+=%@%%+===-#%%%%%%%%%%%%%%%%#===+%%%%%%%%%%%%%%%%%%%%%
%%%%%%%%%%%%%%%%%%%%@+===#%%%%%%%%%%%%%%%%%@*====+*====+@%@%%%%%%%%%%%%%%%%====%%%%%%%%%%%%%%%%%%%%%
%%%%%%%%%%%%%%%%%%%%%+===#%%%%%%%%%%%%%%@%%%%%=======-%%%%%%%%%%%%%%%%%%%%%====%%%%%%%%%%%%%%%%%%%%%
%%%%%%%%%%%%%%%%%%%%@+===#%%%%%%%%%%%%%%%%%%%%%======#%%%%%%%%%%%%%%%%%%%%#===+%%%%%%%%%%%%%%%%%%%%%
%%%%%%%%%%%%%%%%%%%%@+===*%%%%%%%%%%@%%%%%%@%========-=*@@%%%%%@%%%%%%%@%%*===*%%%%%%%%%%%%%%%%%%%%%
%%%%%%%%%%%%%%%%%%%%%%===+@%%%%%%%%%%%%%@@#====-+%%*=====+@@%%%%%%%%%%%%%@====%%%%%%%%%%%%%%%%%%%%%%
%%%%%%%%%%%%%%%%%%%%%@+===#%%%%%%%%%%%@#+====-+%%%%%%*======#@%%%%%%%%%%@*===+%%%%%%%%%%%%%%%%%%%%%%
%%%%%%%%%%%%%%%%%%%%%%%-===*%@%%%@@%*=======#@%%%%%%%%@#=======*%@%%%%@@+===-%@%%%%%%%%%%%%%%%%%%%%%
%%%%%%%%%%%%%%%%%%%%%@%%======+==========*%%%%%%%%%%%%%%%%*=================%%%%%%%%%%%%%%%%%%%%%%%%
%%%%%%%%%%%%%%%%%%%%%%%%@#===========+#%%%%%%%%%%%%%%%%%%%%%%#+=========-=#%%%%%%%%%%%%%%%%%%%%%%%%%
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%####%%@@%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%#**#%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% **/
import React from 'react';
import { useState, useEffect } from 'react';$

import { Modal, ModalHeader, Button, Spinner, Dropdown, DropdownMenu, DropdownItem, DropdownToggle, Row, Card, CardBody, CardTitle, Col, CardFooter, UncontrolledCollapse, Container } from 'reactstrap';

import { useSession, getSession, signIn, signOut } from 'next-auth/react';

import toast, { Toaster } from 'react-hot-toast';$

import dynamic from 'next/dynamic';$
import Link from 'next/link';
import { useRouter } from 'next/router';

import _ from 'lodash';$
import styles from './Logger.module.scss';$

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';$
import { faChartLine, faUser, faChevronDown } from '@fortawesome/free-solid-svg-icons';$

import LoginForm from './LoginForm';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import RegisterForm from './RegisterForm';$
$
const Logger = ({ logs }) => {$
  const [isActive, setIsActive] = useState(false);$
  const [width, setWidth] = useState(0);$
  const [height, setHeight] = useState(0);$
$
  const DynamicReactJSON = dynamic(import('react-json-view'), { ssr: false });$
$
  let sortedLogs = _.sortBy(logs, (l) => {$
    if (l != null && l.req) {$
      return l.req.request.headers['Date'];$
    }$
  });$
$
  useEffect(() => {$
    setWidth(window.innerWidth);$
    setHeight(window.innerHeight);$
  }, []);$
$
  const toggleActive = () => {$
    setIsActive(!isActive);$
  };$
  return ($
    <div>$
      <Button color="link" className="nav-link" onClick={toggleActive}>$
        <FontAwesomeIcon icon={faChartLine} size="1x" /> API Requests$
      </Button>$
      {isActive && ($
        <div$
          style={{$
            width: `${width}px`,$
            height: `${height}px`,$
            position: 'fixed',$
            left: 0,$
            top: 0,$
            background: '#eee',$
            zIndex: 100$
          }}$
        >$
          <Button color="primary" onClick={toggleActive}>$
            Close$
          </Button>$
          <Container className={styles.container} fluid>$
            <div className={styles.scroll}>$
              <h4 className="handle pointer-grab">HTTP Requests</h4>$
              {sortedLogs &&$
                sortedLogs.length > 0 &&$
                sortedLogs.map((log, key) => ($
                  <div key={key}>$
                    {log && log.req && log.res && ($
                      <Card className="mb-2" style={{ fontFamily: 'monospace' }}>$
                        <CardBody>$
                          <CardTitle>$
                            <strong>$
                              {log.req.request.method} {log.req.url}$
                            </strong>$
                          </CardTitle>$
                          <p className="text-muted">{log.req.request.headers['Date']}</p>$
                          <a className="btn btn-link pl-0" id={`req-toggler${key}`}>$
                            View Request$
                          </a>$
                          <a className="btn btn-link" id={`res-toggler${key}`}>$
                            View Response$
                          </a>$
                          <UncontrolledCollapse toggler={`#req-toggler${key}`}>$
                            <Card>$
                              <CardBody>$
                                <DynamicReactJSON src={log.req} style={{ fontSize: '12px' }} />$
                              </CardBody>$
                            </Card>$
                          </UncontrolledCollapse>$
                          <UncontrolledCollapse toggler={`#res-toggler${key}`}>$
                            <Card>$
                              <CardBody>$
                                <DynamicReactJSON src={log.res} style={{ fontSize: '12px' }} />$
                              </CardBody>$
                            </Card>$
                          </UncontrolledCollapse>$
                        </CardBody>$
                      </Card>$
                    )}$
                  </div>$
                ))}$
            </div>$
          </Container>$
        </div>$
      )}$
    </div>$
  );$
};$
$
const LoginModal = (props) => {
  const { modalProp, toggle, toggleRegister, title } = props;

  const showRegisterModal = () => {
    toggle();
    toggleRegister();
  };
  return (
    <Modal isOpen={modalProp} toggle={toggle} size="sm">
      {title && <ModalHeader>{title}</ModalHeader>}
      <LoginForm toggle={toggle} showRegisterModal={showRegisterModal} />
    </Modal>
  );
};

const initialValues = {
  username: '',
  password: ''
};

const createConsumerSchema = Yup.object().shape({
  username: Yup.string().required('Username is required.'),
  password: Yup.string().required('Password is required.')
});

export default function Login({ query = false }) {
  const router = useRouter();
  const [loginRequest, setLoginRequest] = useState(false);

  const handleSubmit = async (values) => {
    setLoginRequest(true);
    signIn('login', {
      json: true,
      username: values.username,
      password: values.password,
      redirect: false
    }).then(async () => {
      let status = await getSession();
      setLoginRequest(false);
      if (status == null) {
        toast.error('Invalid Login. Please try again');
      } else {
        router.push({
          pathname: query && query.redirect ? query.redirect : '/'
        });
      }
    });
  };

  return (
    <Formik initialValues={initialValues} validationSchema={createConsumerSchema} onSubmit={handleSubmit}>
      {(formik) => {
        const { errors, touched, isValid, dirty } = formik;
        return (
          <Form>
            <Toaster />
            <Row>
              <Col>
                <Card>
                  <CardBody>
                    <CardTitle tag="h4">Login</CardTitle>
                    <Row>
                      <Col>
                        <div className="form-group">
                          <label htmlFor="username">
                            Username* <small>[tester00]</small>
                          </label>
                          <Field name="username" id="username" className={`${errors.username && touched.username ? 'is-invalid' : null} form-control`} />
                          <ErrorMessage name="username" component="div" className="invalid-feedback" />
                        </div>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <div className="form-group">
                          <label htmlFor="password">
                            Password* <small>[testing!12]</small>
                          </label>
                          <Field name="password" type="password" id="password" className={`${errors.password && touched.password ? 'is-invalid' : null} form-control`} />
                          <ErrorMessage name="password" component="div" className="invalid-feedback" />
                        </div>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <Button block color="primary" type="submit" className={`${!(dirty && isValid) ? 'disabled' : ''}`} disabled={!(dirty && isValid)}>
                          {loginRequest ? <Spinner color="light" size="sm" /> : <span>Login</span>}
                        </Button>
                      </Col>
                    </Row>
                  </CardBody>
                  <CardFooter className="bg">
                    <p className="text-muted mb-0">
                      Need have an account?{' '}
                      <a href="/auth/register" className="link p-0 m-0">
                        Register
                      </a>
                    </p>
                  </CardFooter>
                </Card>
              </Col>
            </Row>
          </Form>
        );
      }}
    </Formik>
  );
}

const LoginModal = (props) => {
  const { modalProp, toggle, toggleRegister, title } = props;

  const showRegisterModal = () => {
    toggle();
    toggleRegister();
  };
  return (
    <Modal isOpen={modalProp} toggle={toggle} size="sm">
      {title && <ModalHeader>{title}</ModalHeader>}
      <LoginForm toggle={toggle} showRegisterModal={showRegisterModal} />
    </Modal>
  );
};

function ProfileDropdown() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggle = () => setDropdownOpen(!dropdownOpen);
  return (
    <div className="d-inline-block">
      {status == 'unauthenticated' ? (
        <Link href="/auth/login">
          <Button color="link" className="text-light py-0 px-2 text-left d-flex flex-column justify-content-start text-decoration-none">
            <span>
              <small>Signup / Login</small>
            </span>
            <span>
              My Account
              <FontAwesomeIcon icon={faChevronDown} size="1x" className="pl-1" />
            </span>
          </Button>
        </Link>
      ) : status == 'loading' ? (
        <Button color="link" className="text-light p-0 text-left d-flex flex-column justify-content-start text-decoration-none">
          <span>
            <Spinner color="light" size="sm" />
          </span>
        </Button>
      ) : (
        <div className="nav">
          <Dropdown isOpen={dropdownOpen} toggle={toggle}>
            <DropdownToggle tag="a" caret className="text-white text-decoration-none pointer">
              <FontAwesomeIcon icon={faUser} /> {session.user.name}
            </DropdownToggle>
            <DropdownMenu>
              <DropdownItem
                onClick={() =>
                  router.push({
                    pathname: '/user/profile'
                  })
                }
              >
                Profile
              </DropdownItem>
              <DropdownItem
                onClick={() =>
                  router.push({
                    pathname: '/user/orders'
                  })
                }
              >
                Orders
              </DropdownItem>
              <DropdownItem onClick={() => signOut({ callbackUrl: '/' })}>Logout</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
      )}
    </div>
  );
}
const RegisterConsumerModal = (props) => {$
  const { modalProp, toggle, toggleLogin } = props;$
$
  const showLoginModal = () => {$
    toggle();$
    toggleLogin();$
  };$
$
  return ($
    <Modal isOpen={modalProp} toggle={toggle} size="sm">$
      <RegisterForm showLoginModal={showLoginModal} />$
    </Modal>$
  );$
};$
const initialValues = {$
  firstName: '',$
  lastName: '',$
  emailAddress: '',$
  password: ''$
};$
$
const createConsumerSchema = Yup.object().shape({$
  username: Yup.string().required('Username is required.'),$
  firstName: Yup.string().required('First name is required.'),$
  lastName: Yup.string().required('Last name is required.'),$
  emailAddress: Yup.string().email().required('Email address is required.'),$
  password: Yup.string().required('Password is required.')$
});$
$
export default function Register() {$
  const router = useRouter();$
  const [registering, setRegistering] = useState(false);$
  const handleSubmit = async (values) => {$
    setRegistering(true);$
    const { username, emailAddress, firstName, lastName, password } = values;$
    signIn('register', {$
      username,$
      emailAddress,$
      firstName,$
      lastName,$
      password,$
      redirect: false$
    }).then(async (data) => {$
      let status = await getSession();$
      setRegistering(false);$
      if (status === null) {$
        toast.error(data.error);$
      } else {$
        router.push({$
          pathname: '/'$
        });$
      }$
    });$
  };$
  return ($
    <Formik initialValues={initialValues} validationSchema={createConsumerSchema} onSubmit={handleSubmit}>$
      {(formik) => {$
        const { errors, touched, isValid, dirty } = formik;$
        return ($
          <Form>$
            <Toaster />$
            <Row>$
              <Col>$
                <Card>$
                  <CardBody>$
                    <CardTitle tag="h4">Sign Up</CardTitle>$
                    <Row>$
                      <Col>$
                        <div className="form-group">$
                          <label htmlFor="firstName">First Name*</label>$
                          <Field name="firstName" id="firstName" className={`${errors.firstName && touched.firstName ? 'is-invalid' : null} form-control`} />$
                          <ErrorMessage name="firstName" component="div" className="invalid-feedback" />$
                        </div>$
                      </Col>$
                    </Row>$
                    <Row>$
                      <Col>$
                        <div className="form-group">$
                          <label htmlFor="lastName">Last Name*</label>$
                          <Field name="lastName" id="lastName" className={`${errors.lastName && touched.lastName ? 'is-invalid' : null} form-control`} />$
                          <ErrorMessage name="lastName" component="div" className="invalid-feedback" />$
                        </div>$
                      </Col>$
                    </Row>$
                    <Row>$
                      <Col>$
                        <div className="form-group">$
                          <label htmlFor="username">Username*</label>$
                          <Field name="username" id="username" className={`${errors.username && touched.username ? 'is-invalid' : null} form-control`} />$
                          <ErrorMessage name="username" component="div" className="invalid-feedback" />$
                        </div>$
                      </Col>$
                    </Row>$
                    <Row>$
                      <Col>$
                        <div className="form-group">$
                          <label htmlFor="emailAddress">Email*</label>$
                          <Field name="emailAddress" id="emailAddress" className={`${errors.emailAddress && touched.emailAddress ? 'is-invalid' : null} form-control`} />$
                          <ErrorMessage name="emailAddress" component="div" className="invalid-feedback" />$
                        </div>$
                      </Col>$
                    </Row>$
                    <Row>$
                      <Col>$
                        <div className="form-group">$
                          <label htmlFor="password">Password*</label>$
                          <Field name="password" type="password" id="password" className={`${errors.password && touched.password ? 'is-invalid' : null} form-control`} />$
                          <ErrorMessage name="password" component="div" className="invalid-feedback" />$
                        </div>$
                      </Col>$
                    </Row>$
                    <Row>$
                      <Col>$
                        <Button block color="primary" type="submit" className={`${!(dirty && isValid) ? 'disabled' : ''}`} disabled={!(dirty && isValid)}>$
                          {registering ? <Spinner color="light" size="sm" /> : <span>Sign Up</span>}$
                        </Button>$
                      </Col>$
                    </Row>$
                  </CardBody>$
                  <CardFooter className="bg">$
                    <p className="text-muted mb-0">$
                      Already have an account?{' '}$
                      <a href="/auth/login" className="link p-0 m-0">$
                        Login$
                      </a>$
                    </p>$
                  </CardFooter>$
                </Card>$
              </Col>$
            </Row>$
          </Form>$
        );$
      }}$
    </Formik>$
  );$
}$
export default Logger;$
export default LoginModal;
export default ProfileDropdown;
export default RegisterConsumerModal;$
