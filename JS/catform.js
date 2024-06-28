import 'react-datepicker/dist/react-datepicker.css';$
import * as Yup from 'yup';$
import { Row, Col, Card, CardBody, Alert, Spinner, Button, Table, Input, useEffect, useState, useCategory, useCatalogItem, useState } from 'react, reactstrap ~/lib/swr/useCategory, ~/lib/swr/useCatalogItem';$
import { Formik, Form, Field, ErrorMessage } from 'formik';$
import CategorySelect from '../categories/CategorySelect';$
import DatePicker from '../DatePicker';$
import generateGUID from '~/lib/generateGUID';$

import LoadingTable from '~/components/admin/LoadingTable';$
import { faEdit } from '@fortawesome/free-solid-svg-icons';$
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';$
$
const init = {$
  itemId: '',$
  shortDescription: '',$
  longDescription: '',$
  merchandiseCategory: '',$
  status: '',$
  departmentId: 'NA',$
  nonMerchandise: false,$
  price: '',$
  currency: 'USD',$
  effectiveDate: '',$
  endDate: '',$
  imageUrl: '',$
  version: 1,$
  groups: ''$
};$
$
const createItemSchema = Yup.object().shape({$
  itemId: Yup.string().required('Item ID is required'),$
  shortDescription: Yup.string().required('Short description is required'),$
  longDescription: Yup.string().required('Long description is required'),$
  // Need to update this required check to handle hidden field on change$
  merchandiseCategory: Yup.string().required('Merchandise Category is required'),$
  status: Yup.mixed().required('Status is required').oneOf(['INACTIVE', 'ACTIVE', 'DISCONTINUED', 'SEASONAL', 'TO_DISCONTINUE', 'UNAUTHORIZED']),$
  departmentId: Yup.string(),$
  nonMerchandise: Yup.boolean(),$
  price: Yup.number().when('version', {$
    is: (val) => val === 1,$
    then: Yup.number().test($
      'is-decimal',$
      'Input Valid Price',$
      (value) => (value + '').match(/^(?!^0\.00$)(([1-9][\d]{0,6})|([0]))\.[\d]{2}$/) // needs to be updated, doesn't accept an ending 0$
    )$
  }),$
  version: Yup.number().required('Version is required when updating catalog.'),$
  unitOfMeasure: Yup.mixed().required('Unit of Measure is required').oneOf(['EA']),$
  groups: Yup.string()$
});$
$
const CatalogForm = ({ id, categories }) => {$
  const [showAlert, setShowAlert] = useState(false);$
  const [visible, setVisible] = useState(false);$
$
  const onDismiss = () => setVisible(false);$
$
  let { data, isLoading, isError } = useCatalogItem(id);$
  const [initialValues, setInitialValues] = useState(init);$
  if (id && !isLoading && !isError && initialValues.itemId === '') {$
    const { departmentId, itemId, longDescription, nonMerchandise, shortDescription, status, version, groups } = data.catalogItem.data;$
    let catalogValues = {$
      version: version + 1,$
      departmentId: departmentId ?? 'NA',$
      itemId: itemId.itemCode,$
      longDescription: longDescription ? longDescription.values[0].value : '',$
      shortDescription: shortDescription ? shortDescription.values[0].value : '',$
      merchandiseCategory: 'Drinks',$
      nonMerchandise: nonMerchandise ?? false,$
      status,$
      groups$
    };$
    setInitialValues(catalogValues);$
  }$
$
  const [parentCategory, setParentCategory] = useState();$
$
  const handleSubmit = async (values) => {$
    let data = {};$
    for (const key in values) {$
      // Remove empty fields.$
      if (values[key] !== '') {$
        data[key] = values[key];$
      }$
      if (key === 'version') {$
        data['version'] = values[key];$
      }$
    }$
$
    data['dynamicAttributes'] = [$
      {$
        type: 'retail-item',$
        attributes: [$
          {$
            key: 'ITEM_TYPE_CODE',$
            value: '0'$
          }$
        ]$
      }$
    ];$
$
    data['packageIdentifiers'] = [$
      {$
        type: '0',$
        value: data['itemId']$
      }$
    ];$
$
    data['departmentId'] = '02';$
$
    delete data['itemId'];$
    data['itemId'] = { itemCode: values['itemId'] };$
$
    delete data['merchandiseCategory'];$
    data['merchandiseCategory'] = { nodeId: values['merchandiseCategory'] };$
$
    delete data['shortDescription'];$
    data['shortDescription'] = {$
      values: [$
        {$
          locale: 'en-us',$
          value: values['shortDescription']$
        }$
      ]$
    };$
$
    delete data['longDescription'];$
    data['longDescription'] = {$
      values: [$
        {$
          locale: 'en-us',$
          value: values['longDescription']$
        }$
      ]$
    };$
$
    if (id) {$
      delete data['unitOfMeasure'];$
      fetch(`/api/items/${id}`, { method: 'POST', body: JSON.stringify(data) })$
        .then((res) => res.json())$
        .then((data) => {$
          if (data.response.status !== 204) {$
            setShowAlert({$
              status: data.response.status,$
              message: data.response.data.message$
            });$
          } else {$
            setShowAlert({$
              status: 200,$
              message: 'Item successfully updated.'$
            });$
          }$
          setVisible(true);$
        });$
    } else {$
      fetch('/api/items', { method: 'POST', body: JSON.stringify(data) })$
        .then((response) => response.json())$
        .then((data) => {$
          let error = false;$
          for (let key in data) {$
            if (data[key].status !== 204) {$
              if (data[key].status !== undefined) {$
                setShowAlert({$
                  status: data[key].status,$
                  message: `You have encountered an error with status ${data[key].status}`$
                });$
                error = true;$
              }$
              // Add code here to deal with undefined response$
            }$
          }$
          if (!error) {$
            setShowAlert({$
              status: 200,$
              message: 'Item successfully created and added to catalog.'$
            });$
          }$
          setVisible(true);$
        });$
    }$
  };$
$
  return ($
    <Formik enableReinitialize={true} initialValues={initialValues} validationSchema={createItemSchema} onSubmit={handleSubmit}>$
      {(formik) => {$
        const { errors, touched, isValid, dirty, setFieldTouched, setFieldValue } = formik;$
        useEffect(() => {$
          initialValues.merchandiseCategory = parentCategory;$
          setFieldValue('merchandiseCategory', parentCategory);$
          setFieldTouched('merchandiseCategory', true);$
        }, [parentCategory]);$
        return ($
          <main className="my-4">$
            <Form>$
              {id && ($
                <Alert isOpen={true} color="warning">$
                  Item ID, price and attributes are unable to be edited on a global level.$
                </Alert>$
              )}$
              {isLoading && ($
                <div className="my-4 d-flex justify-content-center">$
                  <Spinner color="primary" />$
                </div>$
              )}$
              <Alert toggle={onDismiss} isOpen={visible} className="my-4" color={showAlert.status == 200 ? 'success' : 'danger'}>$
                {showAlert.message}$
              </Alert>$
              <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">$
                <h1 className="h2">{id ? 'Edit' : 'Create'} Item</h1>$
                <div className="form-group float-right">$
                  <button type="submit" className={`${!(dirty && isValid) ? 'disabled' : ''} btn btn-primary`} disabled={`${!(dirty && isValid) ? 'disabled' : ''}`}>$
                    {' '}$
                    {id ? '+ Update' : '+ Create'} Item$
                  </button>$
                </div>$
              </div>$
$
              <Row>$
                <Col md="8">$
                  <Card className="mb-3">$
                    <CardBody>$
                      <div className="form-group">$
                        <label htmlFor="shortDescription">Title*</label>$
                        <Field$
                          name="shortDescription"$
                          id="shortDescription"$
                          placeholder="Item Name"$
                          className={`${errors.shortDescription && touched.shortDescription ? 'is-invalid' : null} form-control`}$
                        />$
                        <ErrorMessage name="shortDescription" component="div" className="invalid-feedback" />$
                      </div>$
                      <div className="form-group">$
                        <label htmlFor="longDescription">Long Description*</label>$
                        <Field$
                          as="textarea"$
                          rows="4"$
                          name="longDescription"$
                          id="longDescription"$
                          className={`${errors.longDescription && touched.longDescription ? 'is-invalid' : null} form-control`}$
                        />$
                        <ErrorMessage name="longDescription" component="div" className="invalid-feedback" />$
                      </div>$
                    </CardBody>$
                  </Card>$
                  <Card className="mb-3">$
                    <CardBody>$
                      <div className="form-group">$
                        <label htmlFor="imageUrl">Image Url</label>$
                        <Field$
                          name="imageUrl"$
                          id="imageUrl"$
                          placeholder="https://..."$
                          className={`${errors.imageUrl && touched.imageUrl ? 'is-invalid' : null} form-control`}$
                          disabled={id ? 'disabled' : ''}$
                        />$
                        <ErrorMessage name="imageUrl" component="div" className="invalid-feedback" />$
                      </div>$
                    </CardBody>$
                  </Card>$
                  <Card className="mb-3">$
                    {!id ? ($
                      <CardBody>$
                        <div className="form-row">$
                          <div className="form-group col-md-4">$
                            <label htmlFor="price">Price</label>$
                            <Field name="price" id="price" className={`${errors.price && touched.price ? 'is-invalid' : null} form-control`} />$
                            <ErrorMessage name="price" component="div" className="invalid-feedback" />$
                          </div>$
                          <div className="form-group">$
                            <label htmlFor="currency">Currency</label>$
                            <Field as="select" name="currency" className={`${errors.currency && touched.currency ? 'is-invalid' : null} form-control`}>$
                              <option value="USD">USD</option>$
                            </Field>$
                          </div>$
                        </div>$
                        <div className="form-row">$
                          <div className="form-group col-md-4">$
                            <label htmlFor="effectiveDate">Effective Date*</label>$
                            <DatePicker name="effectiveDate" />$
                          </div>$
{/*$
                          <div className="form-group col-md-4">$
                            <label htmlFor="endDate">End Date</label>$
                            <DatePicker name="endDate" />$
                          </div>$
*/}$
                        </div>$
                      </CardBody>$
                    ) : ($
                      <CardBody>Price cannot be updated on a global level after creation. Prices are updated on each individual site.</CardBody>$
                    )}$
                  </Card>$
                </Col>$
                <Col md="4">$
                  <Card className="mb-3">$
                    <CardBody>$
                      <div className="form-row">$
                        <div className="form-group col-md-6">$
                          <label htmlFor="version">Version*</label>$
                          <Field name="version" id="version" className={`${errors.version && touched.version ? 'is-invalid' : null} form-control`} />$
                          <ErrorMessage name="version" component="div" className="invalid-feedback" />$
                        </div>$
                      </div>$
                      <div className="form-row">$
                        <div className="form-group col-12">$
                          <label htmlFor="itemId">Item ID*</label>$
                          <Field name="itemId" id="itemId" className={`${errors.itemId && touched.itemId ? 'is-invalid' : null} form-control`} disabled={id ? 'disabled' : ''} />$
                          <ErrorMessage name="itemId" component="div" className="invalid-feedback" />$
                          <Button onClick={() => setFieldValue('itemId', generateGUID())} color="link" className="m-0 p-0">$
                            Generate$
                          </Button>$
                        </div>$
                      </div>$
                      <div className="form-group">$
                        <label htmlFor="status">Status*</label>$
                        <Field as="select" name="status" className={`${errors.status && touched.status ? 'is-invalid' : null} form-control`}>$
                          <option>--</option>$
                          <option value="ACTIVE" label="Active" />$
                          <option value="INACTIVE" label="Inactive" />$
                          <option value="DISCONTINUED" label="Discontinue" />$
                          <option value="SEASONAL" label="Seasonal" />$
                          <option value="TO_DISCONTINUE" label="To Discontinue" />$
                          <option value="UNAUTHORIZED" label="Unauthorized" />$
                        </Field>$
                        <ErrorMessage name="status" component="div" className="invalid-feedback" />$
                      </div>$
                      <div className="form-group">$
                        <label htmlFor="status">Unit of Measure*</label>$
                        <Field as="select" name="unitOfMeasure" className={`${errors.unitOfMeasure && touched.unitOfMeasure ? 'is-invalid' : null} form-control`}>$
                          <option>--</option>$
                          <option value="EA" label="Each" />$
                        </Field>$
                        <ErrorMessage name="status" component="div" className="invalid-feedback" />$
                      </div>$
                    </CardBody>$
                  </Card>$
                  <Card className="mb-3">$
                    <CardBody>$
                      <Field name="merchandiseCategory" id="merchandiseCategory" className="d-none" value={parentCategory || ''} />$
                      <CategorySelect$
                        currentCategory={initialValues.merchandiseCategory}$
                        initialCategory={initialValues.parentCategory ?? ''}$
                        setDisabled={false}$
                        setParentCategory={setParentCategory}$
                        categories={categories}$
                      />$
                    </CardBody>$
                  </Card>$
                  <Card className="mb-3">$
                    <CardBody>$
                      <div className="form-group">$
                        <label htmlFor="groups">Group</label>$
                        <Field name="groups" id="groups" className={`${errors.groups && touched.groups ? 'is-invalid' : null} form-control`} disabled={id ? 'disabled' : ''} />$
                        <ErrorMessage name="groups" component="div" className="invalid-feedback" />$
                      </div>$
                    </CardBody>$
                  </Card>$
                </Col>$
              </Row>$
            </Form>$
          </main>$
        );$
      }}$
    </Formik>$
  );$
};$
function Catalog({ data, isLoading, isError }) {$
  const catalog = data.length == 0 ? data : data.data.pageContent;$
$
  return ($
    <div>$
      <div className="bg-white pb-2">$
        <Table responsive hover striped={!isLoading && !isError} size="sm">$
          <thead>$
            <tr>$
              <th>ID</th>$
              <th>Name</th>$
              <th>Status</th>$
              <th></th>$
            </tr>$
          </thead>$
          {!isError && !isLoading ? ($
            <tbody>$
              {catalog.map((item) => ($
                <tr key={item.itemId.itemCode}>$
                  <th scope="row">{item.itemId.itemCode}</th>$
                  <td>{item.shortDescription.value}</td>$
                  <td>{item.status}</td>$
                  <td>$
                    <>$
                      <a href={`/admin/catalog/${item.itemId.itemCode}`}>$
                        <FontAwesomeIcon icon={faEdit} color="darkslategray" />$
                      </a>$
                    </>$
                  </td>$
                </tr>$
              ))}$
            </tbody>$
          ) : ($
            !isError && <LoadingTable />$
          )}$
        </Table>$
        {catalog.length == 0 && !isLoading && !isError && <p className="text-center">No catalog items found.</p>}$
      </div>$
    </div>$
  );$
}$

function Categories({ categories, isLoading, isError }) {$
  return ($
    <div className="pb-4">$
      <div className="bg-white pb-2">$
        <Table responsive hover striped={!isLoading && !isError} size="sm">$
          <thead>$
            <tr>$
              <th>ID</th>$
              <th>Name</th>$
              <th>Parent</th>$
              <th>Tag</th>$
              <th>Status</th>$
              <th>Department Sale</th>$
              <th>Department Node</th>$
              <th></th>$
            </tr>$
          </thead>$
          {!isLoading && !isError ? ($
            <tbody>$
              {categories &&$
                categories.map((item) => ($
                  <tr key={item.nodeId.nodeId}>$
                    <th scope="row">{item.nodeId.nodeId}</th>$
                    <td>{item.title.value}</td>$
                    <td>{item.parentId && item.parentId.nodeId}</td>$
                    <td>{item.tag}</td>$
                    <td>{item.status}</td>$
                    <td>{`${item.departmentSale}`}</td>$
                    <td>{`${item.departmentNode}`}</td>$
                    <td>$
                      <>$
                        <a href={`/admin/category/${item.nodeId.nodeId}`}>$
                          <FontAwesomeIcon icon={faEdit} color="darkslategray" />$
                        </a>$
                      </>$
                    </td>$
                  </tr>$
                ))}$
            </tbody>$
          ) : ($
            !isError && <LoadingTable />$
          )}$
        </Table>$
        {categories.length == 0 && !isLoading && !isError && <p className="text-center">No categories found.</p>}$
      </div>$
    </div>$
  );$
}$
const init = {$
  title: '',$
  nodeCode: '',$
  tag: '',$
  departmentNode: null,$
  departmentSale: null,$
  status: '',$
  parentCategory: '',$
  version: 1$
};$
$
const createCategorySchema = Yup.object().shape({$
  title: Yup.string().required('Title is required'),$
  nodeCode: Yup.string().required('Node code is required'),$
  tag: Yup.string(),$
  departmentNode: Yup.boolean().nullable(),$
  departmentSale: Yup.boolean().nullable(),$
  status: Yup.mixed().required('Status is required').oneOf(['INACTIVE', 'ACTIVE', 'DISCONTINUED', 'SEASONAL', 'TO_DISCONTINUE', 'UNAUTHORIZED']),$
  parentCategory: Yup.string(), //todo this validation$
  version: Yup.number().required('Version is required when updating category.')$
});$
$
const CategoryForm = ({ categoryId, categoryNodes }) => {$
  const [showAlert, setShowAlert] = useState(false);$
  const [visible, setVisible] = useState(false);$
$
  const onDismiss = () => setVisible(false);$
  let { category, isLoading, isError } = useCategory(categoryId);$
  const [initialValues, setInitialValues] = useState(init);$
  if (categoryId && !isLoading && !isError && initialValues.nodeCode === '') {$
    const { response } = category;$
    const { data } = response;$
    const { departmentNode, departmentSale, nodeCode, status, tag, version, title, parentId } = data;$
    let categoryValues = {$
      version: version + 1,$
      nodeCode,$
      tag: tag ?? '',$
      departmentNode: departmentNode ?? null,$
      departmentSale: departmentSale ?? null,$
      status,$
      title: title.values[0].value, // this should beupdated for locales?$
      parentCategory: parentId ? parentId.nodeId : ''$
    };$
    setInitialValues(categoryValues);$
  }$
  const [parentCategory, setParentCategory] = useState();$
$
  const handleSubmit = async (values) => {$
    if (values['parentCategory'] === '' && parentCategory) {$
      values['parentCategory'] = parentCategory;$
    }$
$
    let data = {};$
    for (const key in values) {$
      // Remove empty fields.$
      if (values[key] !== '') {$
        data[key] = values[key];$
      }$
      if (key === 'version') {$
        data['version'] = values[key];$
      }$
    }$
    let title = data['title'];$
    // Doesn't support multi-lang right now.$
    data['title'] = {$
      values: [$
        {$
          locale: 'en-US',$
          value: title$
        }$
      ]$
    };$
$
    if (data['parentCategory']) {$
      data['parentId'] = {$
        nodeId: data['parentCategory']$
      };$
      delete data['parentCategory'];$
    }$
    data['nodeId'] = {$
      nodeId: data['nodeCode']$
    };$
    let nodes = { nodes: [data] };$
    if (categoryId) {$
      fetch(`/api/category/${categoryId}`, {$
        method: 'PUT',$
        body: JSON.stringify(nodes)$
      })$
        .then((response) => {$
          if (!(response.status === 204 || response.status === 200)) {$
            setShowAlert({$
              status: response.status,$
              message: response.data.message$
            });$
          } else {$
            setShowAlert({$
              status: 200,$
              message: 'Category successfully updated.'$
            });$
          }$
          setVisible(true);$
        });$
    } else {$
      fetch(`/api/category`, { $
        method: 'PUT', $
        body: JSON.stringify(nodes) $
      })$
          .then((response) => {$
            if (response.status !== 204) {$
              setShowAlert({$
                status: response.status, $
                message: response.data.message$
              });$
            } else {$
              setShowAlert({$
                status: 200, $
                message: 'Category successfully created.'$
              });$
            }$
            setVisible(true);$
          });$
    }$
  };$
$
  return ($
    <Formik enableReinitialize={true} initialValues={initialValues} validationSchema={createCategorySchema} onSubmit={handleSubmit}>$
      {(formik) => {$
        const { errors, touched, isValid, dirty, setFieldValue } = formik;$
        return ($
          <Form className="my-4">$
            {isLoading && ($
              <div className="my-4 d-flex justify-content-center">$
                <Spinner color="primary" />$
              </div>$
            )}$
            <Alert toggle={onDismiss} isOpen={visible} className="my-4" color={showAlert.status == 200 ? 'success' : 'danger'}>$
              {showAlert.message}$
            </Alert>$
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">$
              <h1 className="h2">{categoryId ? 'Edit' : 'Create'} Category</h1>$
              <div className="form-group float-right">$
                <button type="submit" className={`${!(dirty && isValid) ? 'disabled' : ''} btn btn-primary`} disabled={`${!(dirty && isValid) ? 'disabled' : ''}`}>$
                  {' '}$
                  {categoryId ? '+ Update' : '+ Create'} Category$
                </button>$
              </div>$
            </div>$
            <div className="row">$
              <div className="col-md-8">$
                <div className="card">$
                  <div className="card-body">$
                    <div className="form-row">$
                      <div className="form-group col-md-6">$
                        <label htmlFor="title">Title*</label>$
                        <Field name="title" id="title" className={`${errors.title && touched.title ? 'is-invalid' : null} form-control`} />$
                        <ErrorMessage name="title" component="div" className="invalid-feedback" />$
                      </div>$
                    </div>$
$
                    <div className="form-group">$
                      <label htmlFor="tag">Tag</label>$
                      <Field name="tag" id="tag" className={`${errors.tag && touched.tag ? 'is-invalid' : null} form-control`} />$
                      <ErrorMessage name="tag" component="div" className="invalid-feedback" />$
                    </div>$
                    <div className="row">$
                      <div className="col-md-6">$
                        <div className="form-group form-check">$
                          <Field type="checkbox" name="departmentNode" id="departmentNode" className={`${errors.departmentNode && touched.departmentNode ? 'is-invalid' : null} form-check-input`} />$
                          <ErrorMessage name="departmentNode" component="div" className="invalid-feedback" />$
                          <label className="form-check-label" htmlFor="departmentNode">$
                            Department Node$
                          </label>$
                          <small id="departmentNode" className="form-text text-muted">$
                            Indicates if this node represents a department$
                          </small>$
                        </div>$
                      </div>$
                      <div className="col-md-6">$
                        <div className="form-group">$
                          <div className="form-check">$
                            <Field type="checkbox" name="departmentSale" id="departmentSale" className={`${errors.departmentSale && touched.departmentSale ? 'is-invalid' : null} form-check-input`} />$
                            <ErrorMessage name="departmentNode" component="div" className="invalid-feedback" />$
                            <label className="form-check-label" htmlFor="departmentSale">$
                              Department Sale$
                            </label>$
                          </div>$
                        </div>$
                      </div>$
                    </div>$
                  </div>$
                </div>$
              </div>$
              <div className="col-md-4">$
                <div className="card">$
                  <div className="card-body">$
                    <div className="form-group">$
                      <label htmlFor="nodeCode">Node Code</label>$
                      <Field name="nodeCode" id="nodeCode" className={`${errors.nodeCode && touched.nodeCode ? 'is-invalid' : null} form-control`} disabled={categoryId ? 'disabled' : ''} />$
                      <ErrorMessage name="nodeCode" component="div" className="invalid-feedback" />$
                      <Button onClick={() => setFieldValue('nodeCode', generateGUID())} color="link" className="m-0 p-0">$
                        Generate$
                      </Button>$
                    </div>$
                    <div className="form-group">$
                      <label htmlFor="version">Version</label>$
                      <Field name="version" id="version" className={`${errors.version && touched.version ? 'is-invalid' : null} form-control`} />$
                      <ErrorMessage name="version" component="div" className="invalid-feedback" />$
                    </div>$
                    <div className="form-group">$
                      <label htmlFor="status" className="h5">$
                        Status$
                      </label>$
                      <Field as="select" name="status" className={`${errors.status && touched.status ? 'is-invalid' : null} form-control`}>$
                        <option value="" label="--" />$
                        <option value="ACTIVE" label="ACTIVE" />$
                        <option value="INACTIVE" label="INACTIVE" />$
                        <option value="DISCONTINUED" label="DISCONTINUED" />$
                        <option value="SEASONAL" label="SEASONAL" />$
                        <option value="TO_DISCONTINUE" label="TO_DISCONTINUE" />$
                        <option value="UNAUTHORIZED" label="UNAUTHORIZED" />$
                      </Field>$
                      <ErrorMessage name="status" component="div" className="invalid-feedback" />$
                    </div>$
                    {categoryNodes.length > 0 && ($
                      <CategorySelect$
                        currentCategory={initialValues.nodeCode}$
                        initialCategory={initialValues.parentCategory ?? ''}$
                        setDisabled={!!(initialValues.parentCategory || categoryId)}$
                        setParentCategory={setParentCategory}$
                        categories={categoryNodes}$
                      />$
                    )}$
                  </div>$
                </div>$
              </div>$
            </div>$
          </Form>$
        );$
      }}$
    </Formik>$
  );$
};$
$ const CategorySelect = ({ currentCategory, initialCategory, setDisabled, setParentCategory, categories }) => {$
  const [selectedCategory, setSelectedCategory] = useState({ nodeCode: '--' });$
  const [childVisible, setChildVisible] = useState(false);$
  const [selectedChild, setSelectedChild] = useState({ nodeCode: '--' });$
  const [selectedGrandChild, setSelectedGrandChild] = useState({$
    nodeCode: '--'$
  });$
  const [categoryChildren, setCategoryChildren] = useState({ nodeCode: '--' });$
  const [grandchildVisible, setGrandChildVisible] = useState(false);$
  const [categoryGrandchildren, setCategoryGrandchildren] = useState({$
    nodeCode: '--'$
  });$
$
  if (initialCategory != '' && selectedCategory.nodeCode == '--') {$
    for (var i = 0; i < categories.length; i++) {$
      let element = categories[i];$
      if (element.nodeId.nodeId == initialCategory) {$
        setSelectedCategory(element);$
        setSelectedChild(element.children[currentCategory]);$
        // setParentCategory(element);$
        break;$
      } else {$
        if (element.children[initialCategory] !== void 0) {$
          setSelectedCategory(element);$
          setCategoryChildren(element.children);$
          setChildVisible(true);$
          if (element.children[initialCategory].children && Object.keys(element.children[initialCategory]).length > 0) {$
            setCategoryGrandchildren(element.children[initialCategory].children);$
            setGrandChildVisible(true);$
            setSelectedGrandChild(element.children[initialCategory].children[currentCategory]);$
          }$
          setSelectedChild(element.children[initialCategory]);$
          break;$
        }$
      }$
    }$
  }$
$
  const handleRootCategoryChange = (e) => {$
    if (e.target.value != '') {$
      let selectedCat;$
      categories.forEach((cat) => {$
        if (cat.nodeCode === e.target.value) {$
          selectedCat = cat;$
          return;$
        }$
      });$
      setCategoryChildren(selectedCat.children);$
      setChildVisible(true);$
      setSelectedCategory(selectedCat);$
      setParentCategory(selectedCat.nodeCode);$
      setGrandChildVisible(false);$
    }$
  };$
$
  const handleChildCategoryChange = (e) => {$
    if (e.target.value != '') {$
      if (e.target.value != '' && selectedCategory.children[e.target.value].children && Object.keys(selectedCategory.children[e.target.value].children).length > 0) {$
        setCategoryGrandchildren(selectedCategory.children[e.target.value].children);$
        setGrandChildVisible(true);$
        // setSelectedChild(selectedCategory.children[e.target.value]);$
      }$
      setSelectedChild(selectedCategory.children[e.target.value]);$
      setParentCategory(selectedCategory.children[e.target.value].nodeCode);$
    } else {$
      setGrandChildVisible(false);$
      setParentCategory(selectedCategory.nodeCode);$
    }$
  };$
$
  const handleGrandChildCategoryChange = (e) => {$
    if (e.target.value != '') {$
      setSelectedGrandChild(selectedCategory.children[selectedChild.nodeCode].children[e.target.value]);$
      setParentCategory(selectedCategory.children[selectedChild.nodeCode].children[e.target.value].nodeCode);$
    } else {$
      setParentCategory(selectedChild.nodeCode);$
    }$
  };$
$
  return ($
    <div>$
      <p>Parent Category*</p>$
      <div className="form-group">$
        <Input disabled={setDisabled ? 'disabled' : ''} type="select" name="select" onChange={(e) => handleRootCategoryChange(e)} value={selectedCategory.nodeCode}>$
          <option value="">--</option>$
          {categories.map((category) => ($
            <option key={category.nodeCode} value={category.nodeCode}>$
              {category.title.value} [{category.nodeCode}]$
            </option>$
          ))}$
        </Input>$
      </div>$
      {childVisible && ($
        <div className="form-group">$
          <Input disabled={setDisabled ? 'disabled' : ''} type="select" name="select" onChange={(e) => handleChildCategoryChange(e)} value={selectedChild.nodeCode}>$
            <option value="">--</option>$
            {Object.keys(categoryChildren).map((key) => {$
              let category = categoryChildren[key];$
              if (key != 'array') {$
                return ($
                  <option key={category.nodeCode} value={category.nodeCode}>$
                    {category.title.value} [{category.nodeCode}]$
                  </option>$
                );$
              }$
            })}$
          </Input>$
        </div>$
      )}$
      {grandchildVisible && ($
        <div className="form-group">$
          <Input disabled={setDisabled ? 'disabled' : ''} type="select" name="select" onChange={(e) => handleGrandChildCategoryChange(e)} value={selectedGrandChild.nodeCode}>$
            <option value="">--</option>$
            {Object.keys(categoryGrandchildren).map((key) => {$
              let category = categoryGrandchildren[key];$
              if (key != 'array') {$
                return ($
                  <option key={category.nodeCode} value={category.nodeCode}>$
                    {category.title.value} [{category.nodeCode}]$
                  </option>$
                );$
              }$
            })}$
          </Input>$
        </div>$
      )}$
    </div>$
  );$
};$
export default CatalogForm;$
export default Catalog;$
export default Categories;$
export default CategoryForm;$
export default CategorySelect;$
