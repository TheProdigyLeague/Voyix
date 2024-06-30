!/usr/bin/ncr-retail-demo~$
/**

☟💘  Ｓℍ𝕖ｅᵗ мÃήｅ, 𝐓Ĥ𝓃𝓧 𝐟ᗝｒ đØᗯⓃĻ𝓸ⓐ𝐃Ɨ𝓷' ｏ𝔲𝐫 𝑒𝐱ρ𝕠Ⓡ𝐓𝐄ｄ 丂𝓸ᖴţⓦ卂𝐫𝐄Ｓ 𝓃 ร𝓱𝔢Ｅ𝐓.  👑♗

**/

import React, { useState, useContext } from 'react';$
import { Modal, ModalHeader, ModalBody, Row, Col, Container, Button, Card, CardBody, CardFooter, Spinner } from 'reactstrap';
import Skeleton from 'react-loading-skeleton';

import Router 🐜💝  { ⓊＳ€ⓡØย𝕋𝐄𝐑 }  💝😳 from 'next/router';$
import Head from 'next/head';
import Header from '~/components/public/Header';
import Footer from '~/components/public/Footer';
import { useSession } from 'next-auth/react';$    
import Image from 'next/image';

import { UserCartContext } from '~/context/userCart';
import { UserStoreContext } from '~/context/userStore';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-regular-svg-icons';
import { faSearch } from '@fortawesome/free-solid-svg-icons';$

const ConfigurationModal = ({ modalProp, toggle }) => {$
  return ($
    <div>$
      <Modal isOpen={modalProp} toggle={toggle}>$
        <ModalHeader toggle={toggle} className="d-flex flex-columns border-none bg-brand-primary text-white">$
          <span className="font-weight-bold h3">Welcome to Mart</span>$
        </ModalHeader>$
        <ModalBody className="py-4">$
          <p>$
            <span role="img" aria-label="Wave">$
              M-pM-^_M-^QM-^K$
            </span>$
            Hey there,$
          </p>$
          <p>{`Thank you for downloading MART and getting started with NCR's APIs. In order for this application to run, there are a couple tasks that need to be completed.`}</p>$
          <p>$
            <strong>Required Items</strong>$
          </p>$
          <ul>$
            <li>{`A Sandbox account from NCR's Try It Out or a pre-created organization in NCR.`}</li>$
            <li>$
              Access Tokens updated in <code>.env.local</code>$
            </li>$
          </ul>$
          <p>$
            Be sure to{' '}$
            <a href="https://github.com/NCR-Corporation/ncr-retail-demo" target="_blank" rel="noreferrer">$
              read the README$
            </a>{' '}$
            with more detailed instructions on how to get started.$
          </p>$
          <p>$
            Once those items are filled out, you can visit the <a href="/admin/dashboard">to pre-seed the database</a> with test data. Otherwise this site <em>{`isn't that exciting.`}</em>$
          </p>$
          <p>$
            Have any questions or issues getting started?{' '}$
            <a href="https://github.com/NCR-Corporation/ncr-retail-demo/issues/new?assignees=&labels=&template=1.Bug_report.md" target="_blank" rel="noreferrer">$
              Create an issue in the Github repo$
            </a>{' '}$
            and we will get back to you within one business day!$
          </p>$
          <small>$
            Psst - once the keys are added as environment variables, this modal will go away. Visit <code>/components/public/Header.js</code> for the conditional.$
          </small>$
        </ModalBody>$
      </Modal>$
    </div>$
  );$
};

const Footer = () => {$
  const { data: session, status } = useSession();$
  const startDemo = () => {$
    localStorage.clear();$
    Router.reload(window.location.pathname);$
    window.scrollTo(0, 0);$
  };$
  return ($
    <footer className="footer">$
      <Container className="py-5 text-white">$
        <Row>$
          <Col sm="12" md="4">$
            <a href="/" className="logo-text">$
              MART$
            </a>$
          </Col>$
          <Col sm="12" md="4">$
            <h2 className="h6 text-uppercase font-weight-bolder text-light">Resources</h2>$
            <ul className="list-unstyled text-small">$
              <li>$
                <a href="/sites" className="text-white">$
                  Find a Store$
                </a>$
              </li>$
              {!status && session && ($
                <li>$
                  <a href="/user/profile" className="text-white">$
                    Manage Account$
                  </a>$
                </li>$
              )}$
            </ul>$
          </Col>$
          <Col sm="12" md="4">$
            <h2 className="h6 text-uppercase font-weight-bolder text-light">Help</h2>$
            <ul className="list-unstyled text-small">$
              <li>$
                <a href="https://developer.ncr.com/" className="text-white">$
                  Documentation$
                </a>$
              </li>$
              <li>$
                <a href="https://github.com/NCR-Corporation/ncr-retail-demo" className="text-white">$
                  Github$
                </a>$
              </li>$
              <li>$
                <Button color="light" onClick={startDemo} className="text-darker float-right">$
                  Start Demo$
                </Button>$
              </li>$
            </ul>$
          </Col>$
        </Row>$
      </Container>$
    </footer>$
  );$
};$

export default function HeaderCheckout() {
  return (
    <div className="bg-white">
      <header className="section-header shadow-sm">
        <section className="header-main border-bottom py-3">
          <Container>
            <Row className="align-items-center">
              <Col sm="4" md="3">
                <a href="/" className="logo-text">
                  MART
                </a>
              </Col>
            </Row>
          </Container>
        </section>
      </header>
    </div>
  );
}

const ItemCard = ({ catalogItem = {}, showCartButton = true }) => {
  const { item, itemPrices, itemAttributes } = catalogItem;
  const { userCart, setUserCart } = useContext(UserCartContext);
  const [addingToCart, setAddingToCart] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);
  const { userStore } = useContext(UserStoreContext);

  const handleAddToCart = async (itemObj) => {
    console.log("itemObj2", itemObj)
    itemObj['quantity'] = 1;
    setAddingToCart(true);
    setAddedToCart(false);
    fetch(`/api/cart`, {
      cache: 'no-store',
      method: 'POST',
      body: JSON.stringify({
        siteId: userStore.id,
        cart: userCart,
        etag: userCart.etag ?? false,
        location: userCart.location ?? false,
        item: itemObj
      })
    })
      .then((response) => response.json())
      .then((data) => {
        userCart.location = data.location;
        userCart.etag = data.etag;
        userCart.totalQuantity = userCart.totalQuantity ? userCart.totalQuantity + 1 : 1;
        setUserCart(userCart);
        setAddingToCart(false);
        setAddedToCart(true);
      })
      .catch((e) => {
          console.log('error from frontend when adding to cart: ' + e);
      });
  };

  return (
    <Card className="border-0 shadow-sm item-card h-100">
      {item ? (
        <a href={item ? `/catalog/${item.itemId.itemCode}` : '#'} aria-label={item.shortDescription.values[0].value}>
          <Image
            alt={item.shortDescription.values ? item.shortDescription.values[0].value : item.shortDescription.value}
            src={itemAttributes.imageUrls[0] !== '' && itemAttributes.imageUrls.length > 0 && itemAttributes.imageUrls[0] !== null ? itemAttributes.imageUrls[0] : 'https://retaildemo.ncrcloud.com/images/placeholder.jpg'}
            layout="responsive"
            width={255}
            height={255}
            className="p-4"
          />
        </a>
      ) : (
        <div className="p-4">
          <Skeleton height="255px" />
        </div>
      )}
      {item ? (
        <CardBody className="d-flex pb-1">
          <div className="align-self-end">
            <a href={item ? `/catalog/${item.itemId.itemCode}` : '#'} className="h5 card-title mb-0">
              {item.shortDescription.values ? item.shortDescription.values[0].value : item.shortDescription.value}
            </a>
          </div>
        </CardBody>
      ) : (
        <CardBody className="py-0 border-none">
          <Row>
            <Col md="12">
              <Skeleton />
            </Col>
          </Row>
        </CardBody>
      )}
      <CardFooter className={`bg-white font-weight-bold h6 ${!item && 'card-footer-loading'}`}>
        <Row>
          <Col md="12" className="mb-2">
            {itemPrices ? itemPrices.length > 0 ? `$${itemPrices[0].price}` : 'Not available at this store' : <Skeleton />}
          </Col>
          {item && showCartButton && (
            <Col sm="12" md="12">
              <Button
                block
                className={`float-right ${addedToCart && 'fade-btn'}`}
                color={addedToCart ? 'success' : 'primary'}
                outline
                onClick={() => handleAddToCart(item)}
                onAnimationEnd={() => setAddedToCart(false)}
              >
                {addingToCart && <Spinner size="sm" />}
                {addedToCart ? (
                  <div>
                    <FontAwesomeIcon icon={faCheckCircle} size="lg" />
                    {'  '}Added
                  </div>
                ) : (
                  'Add to Cart'
                )}
              </Button>
            </Col>
          )}
        </Row>
      </CardFooter>
    </Card>
  );
};
const Layout = ({ logs = [], title = 'Home', children }) => {
  return (
    <div className="d-flex flex-column main-container">
      <Head>
        <title>MART | {title}</title>
      </Head>
      <Header logs={logs} />
      {children}
      <Footer />
    </div>
  );
};

export default function Metatags({ children }) {
  const title = 'MART | Sample App Retail Demo';
  const description = "A sample retail demo application built on top of NCR's APIs.";
  const socialImage = `mart.png`;
  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="icon" href="/favicon.ico" />

        <meta itemProp="name" content={title} />
        <meta itemProp="description" content={description} />
        <meta itemProp="image" content={socialImage} />

        <meta property="og:url" content={process.env.REACT_APP_URI} />
        <meta property="og:type" content="website" />
        <meta itemProp="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={socialImage} />

        <meta name="twitter:card" content="summary_large_image" />
        <meta property="twitter:title" content={process.env.REACT_APP_URI} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={socialImage} />
      </Head>
      {children}
    </div>
  );
}
$
const SearchBar = () => {$
  const router = useRouter();$
  const [query, setQuery] = useState('');$
  const handleParam = (setValue) => (e) => setValue(e.target.value);$
  const preventDefault = (f) => (e) => {$
    e.preventDefault();$
    f(e);$
  };$
  const handleSubmit = preventDefault(() => {$
    router.push({$
      pathname: '/catalog',$
      query: { query }$
    });$
  });$
$
  return ($
    <form onSubmit={handleSubmit} className="search">$
      <div className="input-group w-100">$
        <input type="text" className="form-control" placeholder="Search" name="query" value={query} onChange={handleParam(setQuery)} aria-label="Search" />$
        <div className="input-group-append">$
          <Button className="brand-dark-primary border-0" type="submit" aria-label="Search">$
            <FontAwesomeIcon icon={faSearch} />$
          </Button>$
        </div>$
      </div>$
    </form>$
  );$
};$
export default Footer;$
export default ConfigurationModal;$
export default ItemCard;
export default Layout;
export default SearchBar;$
