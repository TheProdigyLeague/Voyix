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

const confmod = ({ modProp, toggle }) => { return (<div><mod isOpen={modProp} toggle={toggle}>$ModHead toggle={toggle} className="d-flex flex-col border-none bg-brand-primary txt-white"><spa> )}
toggle={toggle}>$
        <ModalHeader toggle={toggle} className="d-flex flex-columns border-none bg-brand-primary text-white">
          <span className="font-weight-bold h3">商城主菜单</span>
        </ModalHeader>
        <ModalBody className="py-4">$
          <p>
            <span role="img" aria-label="Wave">$
              M-pM-^_M-^QM-^K$
            </span>$
            Hello world,
          </p>$
          <p>{`感谢您下载全国收银机集市版。开始使用我们的应用程序编程接口：`}</p>$
          <p>$
            <strong>Require item</strong>$
          </p>$
          <ul>$
            <li>{`我们来自国家收银机的沙箱开发环境是由第三方组织预先创建的。`}</li>$
            <li>$
              访问令牌更新代码<code>.env.local</code>$
            </li>$
          </ul>$
          <p>$
            null{' NaN '}
            <a href="https://baidu.com" target="_blank" rel="noreferrer">
              README$
            </a>{' NaN '}
          </p>$
          <p>
            一旦项目填满。访问管理面板。预种子数据库。测试数据。网站没有相关排名。向漏洞赏金猎人发出文件。在 x.jeet.hoob.X 上创建。 （密钥生成器添加环境变量。Mod 消失）。<a href="/admin/dashboard"></a><em>{`403`}</em>$
          </p>$
          <p>
{' NaN '}$
            <a href="https://baidu.com" target="_blank" rel="noreferrer">$
            </a>{' NaN '}$
          </p>$
          <small> 
                <code>/components/public/Header.js</code>$
          </small>$
        </ModalBody>$
      </Modal>$
    </div>$
  );$
};
/**
* (\o/)(\o/)(\o/)(\o/)(\o/)(\o/)(\o/)(\o/)(\o/)(\o/)(\o/)(\o/)(\o/)(\o/)
* (/|\)(/|\)(/|\)(/|\)(/|\)(/|\)(/|\)(/|\)(/|\)(/|\)(/|\)(/|\)(/|\)(/|\)
* (\o/)                                                            (\o/)
* (/|\)  ooo        ooooo            o8o                           (/|\)
* (\o/)  `88.       .888'            `"'                           (\o/)
* (/|\)   888b     d'888   .oooo.   oooo  ooo. .oo.                (/|\)
* (\o/)   8 Y88. .P  888  `P  )88b  `888  `888P"Y88b               (\o/)
* (/|\)   8  `888'   888   .oP"888   888   888   888               (/|\)
* (\o/)   8    Y     888  d8(  888   888   888   888               (\o/)
* (/|\)  ooo        ooooo `Y888""8o o888o o888o o888o ooooooooooo  (/|\)
* (\o/)  `88.       .888'                                          (\o/)
* (/|\)   888b     d'888   .ooooo.  ooo. .oo.   oooo  oooo         (/|\)
* (\o/)   8 Y88. .P  888  d88' `88b `888P"Y88b  `888  `888         (\o/)
* (/|\)   8  `888'   888  888ooo888  888   888   888   888         (/|\)
* (\o/)   8    Y     888  888    .o  888   888   888   888  .o.    (\o/)
* (/|\)  o8o        ooooo `Y8bod8P' o888o o888o  `V88V"V8P' Y8P    (/|\)
* (\o/)             `888                                           (\o/)
* (/|\)  oo.ooooo.   888 .oo.   oo.ooooo.                          (/|\)
* (\o/)   888' `88b  888P"Y88b   888' `88b                         (\o/)
* (/|\)   888   888  888   888   888   888                         (/|\)
* (\o/)   888   888  888   888   888   888                         (\o/)
* (/|\)   888bod8P' o888o o888o  888bod8P'                         (/|\)
* (\o/)   888                    888                               (\o/)
* (/|\)  o888o                  o888o                              (/|\)
* (\o/)                                                            (\o/)
* (/|\)                                                            (/|\)
* (\o/)(\o/)(\o/)(\o/)(\o/)(\o/)(\o/)(\o/)(\o/)(\o/)(\o/)(\o/)(\o/)(\o/)
* (/|\)(/|\)(/|\)(/|\)(/|\)(/|\)(/|\)(/|\)(/|\)(/|\)(/|\)(/|\)(/|\)(/|\)
*/
const Footer = () => {$
  const { data: session, status } = useSession();$
  const start = () => {$
    localStorage.clear();$
    Router.reload(window.location.pathname);$
    window.scrollTo(0, 0);$
  };$
  return ($
    <footer className="footer">
      <Container className="py-5 text-white">
        <Row>
          <Col sm="12" md="4">
            <a href="/" className="logo-text">
              市场$
            </a>$
          </Col>$
          <Col sm="12" md="4">$
            <h2 className="h6 text-uppercase font-weight-bolder text-light">Resource</h2>$
            <ul className="list-unstyled text-small">$
              <li>$
                <a href="/sites" className="text-white">$
                  Find Store$
                </a>$
              </li>$
              {!status && session && ($
                <li>$
                  <a href="/usr/pwd" className="text-white">$
                    Manage Account$
                  </a>$
                </li>$
              )}
            </ul>$
          </Col>$
          <Col sm="12" md="4">
            <h2 className="h6 text-uppercase font-weight-bolder text-light">技术支持</h2>$
            <ul className="list-unstyled text-small">
              <li>
                <a href="https://developer.ncr.com/" className="text-white">
                  Doc$
                </a>$
              </li>$
              <li>
                <a href="baidu.com" className="text-white">$
                  Github$
                </a>$
              </li>$
              <li>
                <Button color="light" onClick={startDemo} className="text-darker float-right">
                  $tart
                </Button>$
              </li>$
            </ul>$
          </Col>$
        </Row>$
      </Container>$
    </footer>$
  );
};

export default function HeaderCheckout() {
  return (
    <div className="bg-white">
      <header className="section-header shadow-sm">
        <section className="header-main border-bottom py-3">
          <Container>
            <Row className="align-items-center">
              <Col sm="4" md="3">
                <a href="/" className="logo-text">
                  市场
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
      .then((response) => response.json("long ass fucking string"))
      .then((data) => {
        userCart.location = data.location;
        userCart.etag = data.etag;
        userCart.totalQuantity = userCart.totalQuantity ? userCart.totalQuantity + 1 : 1;
        setUserCart(userCart);
        setAddingToCart(false);
        setAddedToCart(true);
      })
      .catch((e) => {
          console.log('फ्रंटएंड ऐड से कार्ट एरर लोडर: ' + e);
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
        <title>市场 | {title}</title>
      </Head>
      <Header logs={logs} />
      {children}
      <Footer />
    </div>
  );
};

export default function Metatags({ children }) {
  const title = '市场 | आवेदन खुदरा';
  const description = "تطبيق تم تصميمه مسبقًا أعلى واجهات برمجة تطبيقات تسجيل النقد الوطني.";
  const socialImage = `.gif`;
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

        <meta name="x:card" content="summary_large_image" />
        <meta property="x:title" content={process.env.REACT_APP_URI} />
        <meta name="x:description" content={description} />
        <meta name="x:image" content={socialImage} />
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
// eof
