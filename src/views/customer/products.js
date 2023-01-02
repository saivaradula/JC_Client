import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from "react-redux"
import axios from 'axios';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip'
import {
    CButton,
    CFormSelect, CFormInput, CCardBody, CCardHeader, CCol,
    CFormLabel, CForm, CCard, CRow
} from '@coreui/react'
import Modal from 'react-bootstrap/Modal'
import AddProduct from './addProduct'

const ViewProducts = ({ customer }) => {

    const { user } = useSelector(state => state.auth)
    const [seasons, setSeasons] = useState(() => [])
    const [brands, setBrands] = useState(() => [])
    const [collections, setCollections] = useState(() => [])
    const [moulds, setMoulds] = useState(() => [])
    const [components, setComponents] = useState(() => [])

    const [products, setProducts] = useState(() => [])
    const [showAddModal, setShowAddModal] = useState(() => false)

    const [validated, setValidated] = useState(false)
    const [formData, updateFormData] = React.useState({
        'created_by': user.id,
        'customer_id': customer.id,
        'brand': 0,
        'season': 0,
        'collection': 0,
        'mould': 0,
        'component': 0,
        'product_skucode': '',
        'product_images': []
    });

    const getUserProducts = async (
        id,
        brandId = 0,
        seasonId = 0,
        collectionId = 0,
        mould = 0,
        component = 0) => {
        id = id ? id : customer.id
        let api = `${process.env.REACT_APP_API_URL}/v1/customers/${id}/products/${brandId}/${seasonId}/${collectionId}/${mould}/${component}`;
        setProducts(await (await axios.get(api)).data.data)
    }

    const handleChange = (e) => {
        updateFormData({
            ...formData,
            [e.target.name]: e.target.value.trim()
        });
    };

    const handleBrandChange = (e) => {
        handleChange(e)
        getUserSeasons(customer.id, e.target.value.trim())
        getUserCollections(customer.id, formData.brand, formData.season)
        getUserProducts(customer.id, e.target.value.trim(), formData.season, formData.collection, formData.mould, formData.component)
    }

    const handleSeasonChange = (e) => {
        handleChange(e)
        getUserCollections(customer.id, formData.brand, e.target.value.trim())
        getUserProducts(customer.id, formData.brand, e.target.value.trim(), formData.collection, formData.mould, formData.component)
    }

    const handleCollectionChange = (e) => {
        handleChange(e)
        getUserProducts(customer.id, formData.brand, formData.season, e.target.value.trim(), formData.mould, formData.component)
    }

    const handleMouldChange = (e) => {
        handleChange(e)
        getUserProducts(customer.id, formData.brand, formData.season, formData.collection, e.target.value.trim(), formData.component)
    }

    const handleComponentChange = (e) => {
        handleChange(e)
        getUserProducts(customer.id, formData.brand, formData.season, formData.collection, formData.mould, e.target.value.trim())
    }

    const getUserBrands = async id => {
        let api = `${process.env.REACT_APP_API_URL}/v1/customers/${id}/brands`
        setBrands(await (await axios.get(api)).data.data)
    }

    const getUserSeasons = async (id, brandId = 0) => {
        let api = `${process.env.REACT_APP_API_URL}/v1/customers/${id}/seasons/${brandId}`;
        setSeasons(await (await axios.get(api)).data.data)
    }

    const getUserCollections = async (id, brandId = 0, seasonId = 0) => {
        let api = `${process.env.REACT_APP_API_URL}/v1/customers/${id}/collections/${brandId}/${seasonId}`;
        setCollections(await (await axios.get(api)).data.data)
    }

    const getUserMoulds = async (id, brandId = 0, seasonId = 0, collectionId = 0) => {
        let api = `${process.env.REACT_APP_API_URL}/v1/customers/${id}/moulds/${brandId}/${seasonId}/${collectionId}`;
        setMoulds(await (await axios.get(api)).data.data)
    }

    const getUserComponents = async (id, brandId = 0, seasonId = 0, collectionId = 0) => {
        let api = `${process.env.REACT_APP_API_URL}/v1/customers/${id}/components/${brandId}/${seasonId}/${collectionId}`;
        setComponents(await (await axios.get(api)).data.data)
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault()
            event.stopPropagation()
            return;
        }
        setShowAddModal(() => true)
    }

    useEffect(() => {
        getUserBrands(customer.id)
        getUserSeasons(customer.id)
        getUserCollections(customer.id)
        getUserMoulds(customer.id)
        getUserComponents(customer.id)

        getUserProducts(customer.id)
    }, [customer.id])

    const loadInputForm = () => {
        return (
            <>
                <CForm
                    className="row g-3 needs-validation"
                    noValidate
                    validated={validated}
                    onSubmit={(e) => handleSubmit(e)}
                >
                    <CRow>
                        <div className="mt-2"></div>
                        <div className="col-sm-1">
                            <CFormLabel className="col-form-label">
                                Filters
                            </CFormLabel>
                        </div>
                        <div className="col-sm-2">
                            <CFormSelect onChange={handleBrandChange}
                                id="brand" name="brand"
                            >
                                <option value="0">Select Brand</option>
                                {brands.map(b => <option key={b.id} value={b.id}>{b.brand_name}</option>)}
                            </CFormSelect>
                        </div>
                        <div className="col-sm-2">
                            <CFormSelect onChange={handleSeasonChange}
                                id="season" name="season"
                            >
                                <option value="0">Select Season</option>
                                {seasons.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                            </CFormSelect>
                        </div>
                        <div className="col-sm-2">
                            <CFormSelect onChange={handleCollectionChange}
                                id="collection" name="collection"
                            >
                                <option value="0">Select Collection</option>
                                {collections.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                            </CFormSelect>
                        </div>
                        <div className="col-sm-2">
                            <CFormSelect onChange={handleMouldChange}
                                id="mould" name="mould"
                            >
                                <option value="0">Select Moulds</option>
                                {moulds.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                            </CFormSelect>
                        </div>
                        <div className="col-sm-2">
                            <CFormSelect onChange={handleComponentChange}
                                id="component" name="component"
                            >
                                <option value="0">Select Components</option>
                                {components.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                            </CFormSelect>
                        </div>
                    </CRow>
                    <div>
                        <CCol xs={12}>
                            <CCard className="mt-2">
                                <CCardHeader>
                                    <div className="col-sm-2"> <strong>Add Products</strong></div>
                                </CCardHeader>
                                <CCardBody>
                                    <CRow className="mb-2">
                                        <div className="col-sm-1">
                                            <CFormLabel htmlFor="product_name"
                                                className="col-form-label">
                                                Name
                                            </CFormLabel>
                                        </div>
                                        <div className="col-sm-9">
                                            <CFormInput
                                                type="text"
                                                autoComplete="off"
                                                name="product_name"
                                                className="form-control"
                                                id="product_name"
                                                onChange={handleChange}
                                                placeholder="Please specify the Product Name"
                                            />
                                        </div>

                                        <div className="col-sm-2">
                                            <button type="submit" className="btn btn-primary">
                                                Proceed to Add
                                            </button>
                                        </div>
                                    </CRow>
                                </CCardBody>
                            </CCard>
                        </CCol>
                    </div>
                </CForm>
            </>
        )
    }

    const NoDataFound = () => {
        return (
            <CRow>
                <CCol xs={12}>
                    <CCard className="mb-2 mt-2">
                        <CCardHeader>
                            <strong>List of Products</strong>
                        </CCardHeader>
                        <CCardBody>No Products found</CCardBody>
                    </CCard>
                </CCol >
            </CRow >
        )
    }

    const dataActions = (brand) => {

    }

    const listData = () => {
        return (
            <>
                <CRow>
                    <CCol xs={12}>
                        <CCard className="mb-2 mt-2">
                            <CCardHeader>
                                <strong>List of Products</strong>
                            </CCardHeader>
                            <CCardBody>
                                <CRow className="">
                                    <table className="table table-striped table-responsive">
                                        <thead>
                                            <tr>
                                                <th width="3%">#</th>
                                                <th width="12%">Name</th>
                                                <th width="12%">Brand</th>
                                                <th width="12%">Season</th>
                                                <th width="15%">Collection</th>
                                                <th width="37%">Notes</th>
                                                <th width="10%" className='text-center'>Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                products.map((s, i) => (
                                                    (
                                                        <tr key={i}>
                                                            <td>{i + 1}</td>
                                                            <td>{s.name}</td>
                                                            <td>{s?.brand_name || 'N/A'}</td>
                                                            <td>{s?.sname || 'N/A'}</td>
                                                            <td>{s?.cname || 'N/A'}</td>
                                                            <td>{s.notes}</td>
                                                            <td>{dataActions(s)}</td>
                                                        </tr>
                                                    )
                                                ))
                                            }
                                        </tbody>
                                    </table>
                                </CRow>
                            </CCardBody>
                        </CCard>
                    </CCol>
                </CRow>
            </>
        )
    }

    const closeModal = () => {
        setShowAddModal(false)
    }

    const newProductModal = () => {
        return (
            <CRow>
                <Modal show={showAddModal} onHide={() => setShowAddModal(false)} size="xl">
                    <Modal.Header closeButton>
                        <Modal.Title>
                            Adding New Product
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <AddProduct closeModal={closeModal} cb={getUserProducts} customer={customer} componentData={formData} />
                    </Modal.Body>
                    <Modal.Footer></Modal.Footer>
                </Modal>
            </CRow>
        )
    }

    return (
        <>
            {loadInputForm()}
            {products && products.length ? listData() : NoDataFound()}
            {newProductModal()}
        </>
    )
}

ViewProducts.defaultProps = {
    customer: []
};

ViewProducts.propTypes = {
    customer: PropTypes.object,
};

export default ViewProducts