import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from "react-redux"
import axios from 'axios';

import {
    CButton,
    CFormSelect, CFormInput, CCardBody, CCardHeader, CCol,
    CFormLabel, CForm, CCard, CRow
} from '@coreui/react'

import Swal from 'sweetalert2';
import 'sweetalert2/src/sweetalert2.scss';

const ViewCollection = ({ customer }) => {

    const { user } = useSelector(state => state.auth)
    // const [seasons, setSeasons] = useState(() => [])
    // const [brands, setBrands] = useState(() => [])
    const [collections, setCollections] = useState(() => [])

    const [validated, setValidated] = useState(false)
    const [formData, updateFormData] = React.useState({
        'created_by': user.id,
        'customer_id': customer.id,
        'brand': 0,
        'season': 0
    });

    // const handleBrandChange = (e) => {
    //     handleChange(e)
    //     getUserSeasons(customer.id, e.target.value.trim())
    //     getUserCollections(customer.id, e.target.value.trim(), formData.season)
    // }

    // const handleSeasonChange = (e) => {
    //     handleChange(e)
    //     getUserCollections(customer.id, formData.brand, e.target.value.trim())
    // }

    const handleChange = (e) => {
        updateFormData({
            ...formData,
            [e.target.name]: e.target.value.trim()
        });
    };

    // const getUserBrands = async id => {
    //     let api = `${process.env.REACT_APP_API_URL}/v1/customers/${id}/brands`
    //     setBrands(await (await axios.get(api)).data.data)
    // }

    // const getUserSeasons = async (id, brandId = 0) => {
    //     let api = `${process.env.REACT_APP_API_URL}/v1/customers/${id}/seasons/${brandId}`;
    //     setSeasons(await (await axios.get(api)).data.data)
    // }

    const getUserCollections = async (id, brandId = 0, seasonId = 0) => {
        let api = `${process.env.REACT_APP_API_URL}/v1/customers/${id}/collections`;
        setCollections(await (await axios.get(api)).data.data)
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault()
            event.stopPropagation()
        }
        let api = `${process.env.REACT_APP_API_URL}/v1/customers/${customer.id}/collections/add`;
        await axios.post(api, formData).then(response => {
            if (response.status === 200) {
                Swal.fire({
                    icon: 'success',
                    title: 'New Collection added',
                    text: 'New Collection added successfully',
                    footer: ''
                })
                getUserCollections(customer.id)
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Collection adding failed',
                    text: 'Could not add Collection',
                    footer: ''
                })
            }
        });
    }

    useEffect(() => {
        // getUserBrands(customer.id)
        // getUserSeasons(customer.id)
        getUserCollections(customer.id)
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
                        {/* <div className="col-sm-3">
                            <CFormSelect onChange={handleBrandChange}
                                id="brand" name="brand"
                            >
                                <option value="0">Select Brand</option>
                                {brands.map(b => <option key={b.id} value={b.id}>{b.brand_name}</option>)}
                            </CFormSelect>
                        </div>
                        <div className="col-sm-3">
                            <CFormSelect onChange={handleSeasonChange}
                                id="season" name="season"
                            >
                                <option value="0">Select Season</option>
                                {seasons.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                            </CFormSelect>
                        </div> */}
                    </CRow>
                    <div>
                        <CCol xs={12}>
                            <CCard className="mt-2">
                                <CCardHeader>
                                    <div className="col"> <strong>Add Customer Collections</strong></div>
                                </CCardHeader>
                                <CCardBody>
                                    <CRow className="mb-2">
                                        <div className="col-sm-1">
                                            <CFormLabel htmlFor="collection_name"
                                                className="col-form-label">
                                                Name
                                            </CFormLabel>
                                        </div>
                                        <div className="col-sm-4">
                                            <CFormInput
                                                type="text"
                                                autoComplete="off"
                                                name="collection_name"
                                                className="form-control"
                                                id="collection_name"
                                                onChange={handleChange}
                                                placeholder="Please specify the Collection Name"
                                            />
                                        </div>
                                        <div className="col-sm-1 text-right">
                                            <CFormLabel htmlFor="collection_notes"
                                                className="col-form-label">
                                                Notes
                                            </CFormLabel>
                                        </div>
                                        <div className="col-sm-5">
                                            <CFormInput
                                                type="text"
                                                autoComplete="off"
                                                name="collection_notes"
                                                className="form-control"
                                                id="collection_notes"
                                                onChange={handleChange}
                                                placeholder="Please specify the Collection Notes"
                                            />
                                        </div>
                                        <div className="col-sm-1">
                                            <button type="submit" className="btn btn-primary">
                                                Add
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
                            <strong>List of Collections</strong>
                        </CCardHeader>
                        <CCardBody>No Collections found</CCardBody>
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
                                <strong>List of Collections</strong>
                            </CCardHeader>
                            <CCardBody>
                                <CRow className="mb-4">
                                    <table className="jctable table table-striped table-responsive">
                                        <thead>
                                            <tr>
                                                <th width="5%">S.No</th>
                                                <th width="15%">Name</th>
                                                <th width="15%">Brand</th>
                                                <th width="15%">Season</th>
                                                <th width="45%">Notes</th>
                                                <th width="15%" className='text-center'>Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                collections.map((s, i) => {
                                                    return (
                                                        <tr key={i}>
                                                            <td>{i + 1}</td>
                                                            <td>{s.name}</td>
                                                            <td>{s?.brand_name || 'N/A'}</td>
                                                            <td>{s?.sname || 'N/A'}</td>
                                                            <td>{s.notes}</td>
                                                            <td>{dataActions(s)}</td>
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
            {collections && collections.length ? listData() : NoDataFound()}
        </>
    )
}

ViewCollection.defaultProps = {
    customer: []
};

ViewCollection.propTypes = {
    customer: PropTypes.object,
};

export default ViewCollection