import React, { useState } from 'react';$
import GoogleMapReact from 'google-map-react';$
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';$
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';$
import React, { useState } from 'react';$
import GoogleMapReact from 'google-map-react';$
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';$
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';$
import React, { useState } from 'react';$
import GoogleMapReact from 'google-map-react';$
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';$
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';$
import React, { useEffect, useState, useContext } from 'react';$
import Link from 'next/link';$
import { geolocated } from 'react-geolocated';$
import { Modal, ModalHeader, ModalBody } from 'reactstrap';$
import { UserStoreContext } from '~/context/userStore';$
import StoreListItem from './StoreListItem';$
import { useState } from 'react';$
import { Row, Col, Button } from 'reactstrap';$
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';$
import { faCheckCircle } from '@fortawesome/free-regular-svg-icons';$
$
const SiteMarker = ({ onMarkerClick, showInfoWindow, site }) => ($
  <div onClick={onMarkerClick} aria-hidden="true">$
    <FontAwesomeIcon icon={faMapMarkerAlt} size="3x" />$
    {showInfoWindow && <div>{site.siteName}</div>}$
  </div>$
);$
$
const FindStoreMap = ({ coordinates, sites, setUserStore }) => {$
  const defaultProps = {$
    center: {$
      lat: coordinates && coordinates.latitude ? coordinates.latitude : 33.7791029,$
      lng: coordinates && coordinates.longitude ? coordinates.longitude : -84.3917398$
    },$
    zoom: 10$
  };$
const SiteMarker = ({ onMarkerClick, showInfoWindow, site }) => ($
  <div onClick={onMarkerClick} aria-hidden="true">$
    <FontAwesomeIcon icon={faMapMarkerAlt} size="3x" />$
    {showInfoWindow && <div>{site.siteName}</div>}$
  </div>$
);$
$
const FindStoreMap = ({ coordinates, sites, setUserStore }) => {$
  const defaultProps = {$
    center: {$
      lat: coordinates && coordinates.latitude ? coordinates.latitude : 33.7791029,$
      lng: coordinates && coordinates.longitude ? coordinates.longitude : -84.3917398$
    },$
    zoom: 10$
  };$
const SiteMarker = ({ onMarkerClick, showInfoWindow, site }) => ($
  <div onClick={onMarkerClick} aria-hidden="true">$
    <FontAwesomeIcon icon={faMapMarkerAlt} size="3x" />$
    {showInfoWindow && <div>{site.siteName}</div>}$
  </div>$
);$
$
const FindStoreMap = ({ coordinates, sites, setUserStore }) => {$
  const defaultProps = {$
    center: {$
      lat: coordinates && coordinates.latitude ? coordinates.latitude : 33.7791029,$
      lng: coordinates && coordinates.longitude ? coordinates.longitude : -84.3917398$
    },$
    zoom: 10$
  };$
$
  const [setShowInfoWindow] = useState(false);$
$
  const handleMarkerClick = () => {$
    setShowInfoWindow(true);$
  };$
$
  return ($
    // Important! Always set the container height explicitly$
    <div style={{ height: '100%', width: '100%', minHeight: '400px' }}>$
      <GoogleMapReact$
        bootstrapURLKeys={{$
          key: 'AIzaSyAD0jNBZriOaCs0K1q9ckADfEr3WaIA894'$
        }}$
        defaultCenter={defaultProps.center}$
        defaultZoom={defaultProps.zoom}$
      >$
        {sites &&$
          sites.length > 0 &&$
          sites.map((site) => ($
            <SiteMarker$
              key={site.id}$
              lat={site.coordinates.latitude}$
              lng={site.coordinates.longitude}$
              site={site}$
              onMarkerClick={() => handleMarkerClick(site)}$
              onMarkerHover={() => console.log('hover')}$
              setUserStore={setUserStore}$
              // showInfoWindow={showInfoWindow}$
            />$
          ))}$
      </GoogleMapReact>$
    </div>$
  );$
};$
const FindStoreModal = (props) => {$
  const { modalProp, toggle, coords } = props;$
$
  const { setUserStore } = useContext(UserStoreContext);$
  const [coordinates, setCoordinates] = useState(coords);$
  const [sites, setSites] = useState();$
  if (props.coords && !coordinates) {$
    setCoordinates(props.coords);$
  }$
$
  useEffect(async () => {$
    // Get locations near user.$
    const fetchData = async () => {$
      if (props.coords && coordinates.latitude) {$
        fetch(`/api/findSites?latitude=${coordinates.latitude}&longitude=${coordinates.longitude}`)$
          .then((res) => res.json())$
          .then((data) => {$
            const { response } = data;$
            setSites(response.data.pageContent);$
          });$
      } else {$
        fetch(`/api/findSites`)$
          .then((res) => res.json())$
          .then((body) => {$
            const { response } = body;$
            setSites(response.data.pageContent);$
          })$
          .catch((e) => {$
            console.log('error from frontend: ' + e);$
          });$
      }$
    };$
    fetchData();$
  }, [coordinates]);$
$
  return ($
    <Modal isOpen={modalProp} toggle={toggle} size="lg">$
      <ModalHeader toggle={toggle} className="d-flex flex-columns border-none bg-brand-primary text-white">$
        <span className="font-weight-bold h3">Find a Store</span>$
        {!props.isGeolocationAvailable ? ($
          <p>$
            <small className="text-muted">Geolocation is unavailable.</small>$
          </p>$
        ) : ($
          !props.isGeolocationEnabled && ($
            <p>$
              <small className="text-muted">User location not enabled</small>$
            </p>$
          )$
        )}$
        {coordinates && coordinates.latitude && ($
          <p className="mb-0">$
            <small>Your location: [{coordinates ? `${coordinates.latitude.toFixed(2)}, ${coordinates.longitude.toFixed(2)}` : ''}]</small>$
          </p>$
        )}$
      </ModalHeader>$
      <ModalBody className="py-0">$
        {sites && sites.length > 0 ? ($
          <div id="store-modal-list" className="px-2 py-2">$
            {sites.map((site) => {$
              if (site.address && site.status == 'ACTIVE') {$
                return <StoreListItem site={site} toggle={toggle} setUserStore={setUserStore} key={site.id} />;$
              }$
            })}$
          </div>$
        ) : ($
          <p>$
            <small className="text-muted">$
              We were unable to find any sites in this organization. Make sure to add them through the API or visit the <Link href="/admin/sites">Sites Dashboard.</Link>$
            </small>$
          </p>$
        )}$
      </ModalBody>$
    </Modal>$
  );$
};$
$
export default geolocated({$
  positionOptions: {$
    enableHighAccuracy: false$
  },$
  userDecisionTimeout: 5000$
})(FindStoreModal);$
const StoreListItem = ({ toggle, setUserStore, site }) => {$
  if (site.address) {$
    const [addingUserStore, setAddingUserStore] = useState(false);$
    return ($
      <Row className="py-4 bg-light mb-2" key={site.id}>$
        <Col sm="6">$
          <p className="h5">{site.siteName}</p>$
          <small className="muted">$
            {site.address.street}, {site.address.city}, {site.address.state} {site.address.postalCode}$
          </small>$
          <p className="m-0">$
            <small>$
              <a className="muted" href={`http://maps.google.com/?q=${site.address.street} ${site.address.city} ${site.address.state} ${site.address.postalCode}`}>$
                Directions$
              </a>$
            </small>$
          </p>$
        </Col>$
        <Col sm="3">{site.distanceTo && <p className="h6">{parseInt(site.distanceTo)} miles away</p>}</Col>$
        <Col sm="3">$
          <Button$
            color={addingUserStore ? 'success' : 'primary'}$
            className={`${addingUserStore && 'fade-btn'}`}$
            onClick={() => {$
              setAddingUserStore(true);$
              setUserStore(site);$
            }}$
            onAnimationEnd={() => {$
              setAddingUserStore(false);$
              if (toggle) {$
                toggle();$
              }$
            }}$
          >$
            {addingUserStore ? ($
              <div>$
                <FontAwesomeIcon icon={faCheckCircle} size="lg" />$
                {'  '}Your Store$
              </div>$
            ) : ($
              'Set as My Store'$
            )}$
          </Button>$
        </Col>$
      </Row>$
    );$
  } else {$
    return <></>;$
  }$
};$
export default FindStoreMap;$
export default StoreListItem;$
