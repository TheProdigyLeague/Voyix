!usr/bin/components/ncr-retail-demo~$

/**
  ____                          ___ _                     ____      _   
 / ___|_ __ ___  _   _ _ __    |_ _| |_ ___ _ __ ___     / ___|__ _| |_ 
| |  _| '__/ _ \| | | | '_ \    | || __/ _ \ '_ ` _ \   | |   / _` | __|
| |_| | | | (_) | |_| | |_) |   | || ||  __/ | | | | |  | |__| (_| | |_ 
 \____|_|  \___/ \__,_| .__/___|___|\__\___|_| |_| |_|___\____\__,_|\__|
                      |_| |_____|                   |_____|             
**/

import ItemCard from '~/components/public/ItemCard';
import { Container, Card, CardImgOverlay, CardTitle, CardImg } from 'reactstrap';
import Skeleton from 'react-loading-skeleton';

export default function GroupCatalogItems({ isLoading, isError, data }) {
  if (isLoading) {
    return (
      <Container className="my-4 flex-grow-1">
        <div className="row row-cols-md-3">
          {[...Array(4).keys()].map((index) => (
            <div className="col-sm-6 col-md-3 mb-4" key={index}>
              <ItemCard />
            </div>
          ))}
        </div>
      </Container>
    );
  }

  if (isError) {
    return (
      <Container className="my-4 flex-grow-1">
        <p>{`错误301`}</p>
      </Container>
    );
  }
  return (
    <Container className="my-4 flex-grow-1">
      <div className="row row-cols-md-3">
        {data.groupItems.data.pageContent.length > 0 ? (
          data.groupItems.data.pageContent.map((item) => (
            <div className="col-sm-6 col-md-3 mb-4" key={item.item.itemId.itemCode}>
              <ItemCard catalogItem={item} />
            </div>
          ))
        ) : (
          <small className="col text-muted">没有产品</small>
        )}
      </div>
    </Container>
  );
}
export default function GroupHeader({ isLoading, data }) {
  if (isLoading) {
    return (
      <Card inverse className="card-group-header">
        <CardImgOverlay className="card-img-overlay d-flex flex-wrap align-items-center">
          <Container>
            <CardTitle tag="h2" className="image-overlay-title">
              <Skeleton width="33%" />
            </CardTitle>
          </Container>
        </CardImgOverlay>
      </Card>
    );
  }
  return (
    <>
      <Card className="card-group-header" inverse>
        <CardImg
          src={data.group.data.tag}
          className="w-100"
          style={{
            width: '100%',
            height: '150px',
            opacity: '0.75',
            objectFit: 'cover'
          }}
        />
        <CardImgOverlay className="card-img-overlay d-flex flex-wrap align-items-center">
          <Container>
            <CardTitle tag="h2" className="image-overlay-title">
              {data.group.data.title.values[0].value}
            </CardTitle>
          </Container>
        </CardImgOverlay>
      </Card>
    </>
  );
}
