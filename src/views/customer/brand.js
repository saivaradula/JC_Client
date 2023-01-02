import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from "react-redux"
import axios from 'axios';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip'
import { CButton, CFormInput, CFormLabel, CForm, CCard, CCardBody, CCardHeader, CCol, CRow } from '@coreui/react'
import Modal from 'react-bootstrap/Modal'

const ViewBrand = ({ customer }) => {

    const { user } = useSelector(state => state.auth)
    const [brands, setBrands] = useState(() => [])
    const [validated, setValidated] = useState(false)
    const [formData, updateFormData] = React.useState({
        'created_by': user.id,
        'customer_id': customer.id
    });

    const handleChange = (e) => {
        updateFormData({
            ...formData,
            [e.target.name]: e.target.value.trim()
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault()
            event.stopPropagation()
        }
    }

    const getUserBrands = async id => {
        let api = `${process.env.REACT_APP_API_URL}/v1/customers/${id}/brands`
        setBrands(await (await axios.get(api)).data.data)
    }

    useEffect(() => {
        getUserBrands(customer.id)
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
                    <div>
                        <CCol xs={12}>
                            <CCard className="mb-2 mt-2">
                                <CCardHeader>
                                    <strong>Add Brands</strong>
                                </CCardHeader>
                                <CCardBody>
                                    <CRow className="mb-2">
                                        <div className="col-sm-1">
                                            <CFormLabel htmlFor="brand_name" className="col-form-label">
                                                Name
                                            </CFormLabel>
                                        </div>
                                        <div className="col-sm-4">
                                            <CFormInput
                                                type="text"
                                                autoComplete="off"
                                                name="brand_name"
                                                className="form-control"
                                                id="brand_name"
                                                onChange={handleChange}
                                                placeholder="Please specify the Brand Name"
                                            />
                                        </div>
                                        <div className="col-sm-1 text-right">
                                            <CFormLabel htmlFor="brand_notes" className="col-form-label">
                                                Notes
                                            </CFormLabel>
                                        </div>
                                        <div className="col-sm-5">
                                            <CFormInput
                                                type="text"
                                                autoComplete="off"
                                                name="brand_notes"
                                                className="form-control"
                                                id="brand_notes"
                                                onChange={handleChange}
                                                placeholder="Please specify the Brand Notes"
                                            />
                                        </div>
                                        <div className="col-sm-1">
                                            <button type="submit" className="btn btn-primary">
                                                Save
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
                            <strong>List of Brands</strong>
                        </CCardHeader>
                        <CCardBody>No Brands found</CCardBody>
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
                                <strong>List of Brands</strong>
                            </CCardHeader>
                            <CCardBody>
                                <CRow className="mb-4">
                                    <table className="jctable table table-striped table-responsive">
                                        <thead>
                                            <tr>
                                                <th width="5%">S.No</th>
                                                <th width="25%">Name</th>
                                                <th width="50%">Notes</th>
                                                <th width="20%" className='text-center'>Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                brands.map((b, i) => {
                                                    return (
                                                        <tr key={i}>
                                                            <td>{i + 1}</td>
                                                            <td>{b.brand_name}</td>
                                                            <td>{b.notes}</td>
                                                            <td>{dataActions(b)}</td>
                                                        </tr>
                                                    )
                                                })
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

    return (
        <>
            {loadInputForm()}
            {brands && brands.length ? listData() : NoDataFound()}
        </>
    )
}

ViewBrand.defaultProps = {
    customer: []
};

ViewBrand.propTypes = {
    customer: PropTypes.object,
};

export default ViewBrand