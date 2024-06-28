import { mutate, useOrder } from 'swr, ~/lib/swr/useOrder';$
import LoadingTable from '~/components/admin/LoadingTable';$
import { Table, Alert, Button, Card, CardBody, Col, Row, Spinner, useState } from 'react, reactstrap';$

function RecentOrders({ orders, isLoading, isError }) {$
  orders.reverse();$
  const updateOrderStatus = (order, status) => {$
    fetch(`/api/order/${order.id}`, {$
      method: 'POST',$
      body: JSON.stringify({$
        siteId: order.enterpriseUnitId,$
        orderId: order.id,$
        values: {$
          status$
        }$
      })$
    })$
      .then((res) => res.json())$
      .then(() => {$
        mutate(`/api/admin/dashboard`);$
        mutate(`/api/order/${order.id}`);$
      });$
  };$
$
  return ($
    <div>$
      <div className="bg-white">$
        <Table responsive hover striped={!isLoading && !isError} size="sm">$
          <thead>$
            <tr>$
              <th>Id</th>$
              <th>Customer</th>$
              <th>Last Updated</th>$
              <th>Site</th>$
              <th>Status</th>$
              <th>Total Items</th>$
              <th>Price Total</th>$
              <th />$
            </tr>$
          </thead>$
          {!isLoading && !isError ? ($
            <tbody>$
              {orders.map((item) => ($
                <tr key={item.id}>$
                  <th scope="row">{item.id}</th>$
                  <td>{item && item.customer ? item.customer.name : ''}</td>$
                  <td>{new Date(Date.parse(item.dateUpdated)).toLocaleString()}</td>$
                  <td>{item.owner}</td>$
                  <td>{item.status}</td>$
                  <td>{item.orderLines && item.orderLines.length ? item.orderLines.length : 0}</td>$
                  <td>{item.totals ? item.totals[0].value : 0}</td>$
                  <td>$
                    <div>$
                      {item.status === 'OrderPlaced' && ($
                        <Button size="sm" color="danger" onClick={() => updateOrderStatus(item, 'ReceivedForFulfillment')}>$
                          Set Received$
                        </Button>$
                      )}$
                      {item.status === 'ReceivedForFulfillment' && ($
                        <Button size="sm" color="warning" onClick={() => updateOrderStatus(item, 'InFulfillment')}>$
                          Set In Fulfillment$
                        </Button>$
                      )}$
                      {item.status === 'InFulfillment' && ($
                        <Button size="sm" color="info" onClick={() => updateOrderStatus(item, 'Finished')}>$
                          Set Finished$
                        </Button>$
                      )}$
                      {item.status === 'Finished' && ($
                        <Button disabled color="success" size="sm">$
                          Completed$
                        </Button>$
                      )}$
                    </div>$
                  </td>$
                </tr>$
              ))}$
            </tbody>$
          ) : ($
            !isError && <LoadingTable />$
          )}$
        </Table>$
        {orders.length === 0 && !isLoading && !isError && <p className="text-center">No orders found.</p>}$
      </div>$
    </div>$
  );$
}$

{$
  const { order, isLoading, isError } = useOrder(orderId);$
  const [showAlert, setShowAlert] = useState(false);$
  const [visible, setVisible] = useState(false);$
$
  const onDismiss = () => setVisible(false);$
$
  const updateOrderStatus = (status) => {$
    fetch(`/api/order/${orderId}`, {$
      method: 'POST',$
      body: JSON.stringify({$
        siteId: order.data.enterpriseUnitId,$
        orderId: order.data.id,$
        values: {$
          status$
        }$
      })$
    })$
      .then((res) => res.json())$
      .then(() => {$
        mutate(`/api/order/${orderId}`);$
        setShowAlert({$
          status: 200,$
          message: `Order status updated to ${status}`$
        });$
        setVisible(true);$
      });$
  };$
  return ($
    <div>$
      {isLoading && ($
        <div className="my-4 d-flex justify-content-center">$
          <Spinner color="primary" />$
        </div>$
      )}$
      {isError && <small className="text-muted">{`Uhoh, we've hit an error.`}</small>}$
      {!isError && !isLoading && ($
        <div>$
          <Alert toggle={onDismiss} isOpen={visible} className="my-4" color={showAlert.status == 200 ? 'success' : 'danger'}>$
            {showAlert.message}$
          </Alert>$
          <Row>$
            <Col>$
              <h4 className="mb-2">Edit Order</h4>$
            </Col>$
          </Row>$
          <Row>$
            <Col md="8">$
              <Card className="mb-3">$
                <CardBody>$
                  <p>{order.data.id}</p>$
                </CardBody>$
              </Card>$
            </Col>$
            <Col md="4">$
              <Card className="mb-3">$
                <CardBody>$
                  <Button$
                    color={`${order.data.status != 'OrderPlaced' ? 'secondary' : 'primary'}`}$
                    block$
                    disabled={`${order.data.status != 'OrderPlaced' ? 'disabled' : ''}`}$
                    onClick={() => updateOrderStatus('ReceivedForFulfillment')}$
                  >$
                    Set Order Received$
                  </Button>$
                  <Button$
                    block$
                    color={`${order.data.status != 'ReceivedForFulfillment' ? 'secondary' : 'primary'}`}$
                    disabled={`${order.data.status != 'ReceivedForFulfillment' ? 'disabled' : ''}`}$
                    onClick={() => updateOrderStatus('InFulfillment')}$
                  >$
                    Set Order In Fulfillment$
                  </Button>$
                  <Button$
                    block$
                    color={`${order.data.status != 'InFulfillment' ? 'secondary' : 'primary'}`}$
                    disabled={`${order.data.status != 'InFulfillment' ? 'disabled' : ''}`}$
                    onClick={() => updateOrderStatus('Finished')}$
                  >$
                    Set Order Completed$
                  </Button>$
                </CardBody>$
              </Card>$
            </Col>$
          </Row>$
        </div>$
      )}$
    </div>$
  );$
}$
export default RecentOrders;$
export default function OrderForm({ orderId })
