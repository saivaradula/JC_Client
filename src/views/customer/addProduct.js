import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from "react-redux"
import axios from 'axios';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip'
import {
    CFormSelect, CFormInput, CCardBody, CCardHeader, CCol,
    CFormLabel, CForm, CCard, CRow, CFormTextarea
} from '@coreui/react'

import Swal from 'sweetalert2';
import 'sweetalert2/src/sweetalert2.scss';

const AddProduct = ({ closeModal, customer, componentData, cb, moulds, components }) => {
    const [validated, setValidated] = useState(false)
    const [formData, updateFormData] = React.useState(() => componentData);
    const [images, setImages] = useState([]);

    const handleSubmit = async event => {
        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault()
            event.stopPropagation()
            return;
        }
        let api = `${process.env.REACT_APP_API_URL}/v1/customers/${customer.id}/products/add`;
        console.log(formData)
        var data = new FormData();
        data.append(`files`, images)
        await axios.post(api, data).then(response => {
            if (response.status === 200) {
                Swal.fire({
                    icon: 'success',
                    title: 'New Product added',
                    text: 'New Product added successfully',
                    footer: ''
                })
                cb();
                closeModal();
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Product adding failed',
                    text: 'Could not add Product',
                    footer: ''
                })
            }
        });
    }

    const getFirstLetter = (words) => {
        let matches = words.match(/\b(\w)/g);
        return matches.join('').toUpperCase();
    }

    const handleChange = (e) => {
        updateFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleImages = (event) => {
        console.log(event.target.files)
        setImages(event.target.files);
    }

    const calCulateSKU = () => {
        let d = new Date();
        let n = getFirstLetter(customer.name) + getFirstLetter(formData.product_name) + d.getDate() + d.getHours() + d.getMilliseconds()
        updateFormData({
            ...formData,
            'product_skucode': n
        });
    }

    useEffect(() => {
        calCulateSKU()
    }, [customer.id])

    return (
        <>
            <CForm
                className="row g-3 needs-validation"
                noValidate
                validated={validated}
                onSubmit={(e) => handleSubmit(e)}
            >
                <CRow>
                    <CCol xs={12}>
                        <CCard className="mt-2">
                            <CCardBody>
                                <CRow className="mb-3">
                                    <div className="col-sm-2 text-right">
                                        <CFormLabel htmlFor="product_name"
                                            className="col-form-label">
                                            Name
                                        </CFormLabel>
                                    </div>
                                    <div className="col-sm-8">
                                        <CFormInput
                                            required
                                            type="text"
                                            autoComplete="off"
                                            name="product_name"
                                            className="form-control"
                                            id="product_name"
                                            onChange={handleChange}
                                            onBlur={calCulateSKU}
                                            value={formData.product_name}
                                            placeholder="Please specify the Product Name"
                                        />
                                    </div>
                                </CRow>
                                <CRow className="mb-3">
                                    <div className="col-sm-2 text-right">
                                        <CFormLabel htmlFor="product_desc"
                                            className="col-form-label">
                                            Description
                                        </CFormLabel>
                                    </div>
                                    <div className="col-sm-8">
                                        <CFormTextarea
                                            required
                                            rows={4}
                                            onChange={handleChange}
                                            autoComplete="off"
                                            name="product_desc"
                                            className="form-control"
                                            id="product_desc"
                                            placeholder="Please specify the Product Description"
                                        />
                                    </div>
                                </CRow>
                                <CRow className="mb-3">
                                    <div className="col-sm-2 text-right">
                                        <CFormLabel htmlFor="product_skucode"
                                            className="col-form-label">
                                            SKU Code
                                        </CFormLabel>
                                    </div>
                                    <div className="col-sm-8">
                                        <CFormInput
                                            required
                                            type="text"
                                            autoComplete="off"
                                            name="product_skucode"
                                            className="form-control"
                                            id="product_skucode"
                                            onChange={handleChange}
                                            value={formData.product_skucode}
                                            placeholder="Please specify the Product SKU"
                                        />
                                    </div>
                                </CRow>
                                <CRow className="mb-3">
                                    <div className="col-sm-2 text-right">
                                        <CFormLabel htmlFor="product_type"
                                            className="col-form-label">
                                            Product Type
                                        </CFormLabel>
                                    </div>
                                    <div className="col-sm-8">
                                        <CFormInput
                                            required
                                            type="text"
                                            autoComplete="off"
                                            name="product_type"
                                            className="form-control"
                                            id="product_type"
                                            onChange={handleChange}
                                            placeholder="Ex: Ring/Necklace"
                                        />
                                    </div>
                                </CRow>
                                <CRow className="mb-3">
                                    <div className="col-sm-2 text-right">
                                        <CFormLabel htmlFor="product_dimension"
                                            className="col-form-label">
                                            Product Dimension
                                        </CFormLabel>
                                    </div>
                                    <div className="col-sm-8">
                                        <CFormInput
                                            required
                                            type="text"
                                            autoComplete="off"
                                            name="product_dimension"
                                            className="form-control"
                                            id="product_dimension"
                                            onChange={handleChange}
                                            placeholder="Product size"
                                        />
                                    </div>
                                </CRow>
                                <CRow className="mb-3">
                                    <div className="col-sm-2 text-right">
                                        <CFormLabel htmlFor="product_dimension"
                                            className="col-form-label">
                                            Image(s)
                                        </CFormLabel>
                                    </div>
                                    <div className="col-sm-8">
                                        <CFormInput
                                            required
                                            type="file"
                                            multiple={true}
                                            autoComplete="off"
                                            name="images"
                                            className="form-control"
                                            id="images"
                                            onChange={handleImages}
                                            placeholder="Product size"
                                        />
                                    </div>
                                </CRow>
                                <CRow>
                                    <div className="col-sm-12 text-right">
                                        <button className="btn btn-secondary"
                                            type="button" onClick={() => closeModal()}>
                                            Close
                                        </button>
                                        &nbsp;&nbsp;&nbsp;
                                        <button type="submit" className="btn btn-primary">
                                            Add Product
                                        </button>
                                    </div>
                                </CRow>
                            </CCardBody>
                        </CCard>
                    </CCol>
                </CRow>
            </CForm>
        </>
    )
}

AddProduct.defaultProps = {
    customer: [],
    componentData: [],
    cb: [],
    closeModal: [],
    moulds: [],
    components: []
};

AddProduct.propTypes = {
    customer: PropTypes.object,
    componentData: PropTypes.object,
    cb: PropTypes.func,
    closeModal: PropTypes.func,
    moulds: PropTypes.object,
    components: PropTypes.object
};

export default AddProduct