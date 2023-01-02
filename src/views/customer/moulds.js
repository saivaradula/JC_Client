import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from "react-redux"
import axios from 'axios';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip'
import {
    CFormSelect, CFormInput, CCardBody, CCardHeader, CCol,
    CFormLabel, CForm, CCard, CRow
} from '@coreui/react'

import Swal from 'sweetalert2';
import 'sweetalert2/src/sweetalert2.scss';

const ViewMoulds = ({ customer }) => {

    const { user } = useSelector(state => state.auth)
    const [seasons, setSeasons] = useState(() => [])
    const [brands, setBrands] = useState(() => [])
    const [collections, setCollections] = useState(() => [])
    const [moulds, setMoulds] = useState(() => [])

    const [validated, setValidated] = useState(false)
    const [formData, updateFormData] = React.useState({
        'created_by': user.id,
        'customer_id': customer.id,
        'brand': 0,
        'season': 0,
        'collection': 0
    });

    const handleBrandChange = (e) => {
        handleChange(e)
        getUserSeasons(customer.id, e.target.value.trim())
        getUserCollections(customer.id, e.target.value.trim(), formData.season)
        getUserMoulds(customer.id, e.target.value.trim(), formData.season, formData.collection, formData.product)
    }

    const handleSeasonChange = (e) => {
        handleChange(e)
        getUserCollections(customer.id, formData.brand, e.target.value.trim())
        getUserMoulds(customer.id, formData.brand, e.target.value.trim(), formData.collection, formData.product)
    }

    const handleCollectionChange = (e) => {
        handleChange(e)
        getUserMoulds(customer.id, formData.brand, formData.season, e.target.value.trim(), formData.product)
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

    const handleChange = (e) => {
        updateFormData({
            ...formData,
            [e.target.name]: e.target.value.trim()
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault()
            event.stopPropagation()
        }
        let api = `${process.env.REACT_APP_API_URL}/v1/customers/${customer.id}/moulds/add`;
        await axios.post(api, formData).then(response => {
            if (response.status === 200) {
                Swal.fire({
                    icon: 'success',
                    title: 'New Mould is added',
                    text: 'New Mould is been added successfully',
                    footer: ''
                })
                getUserMoulds(customer.id)
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Mould adding failed',
                    text: 'Could not add Mould',
                    footer: ''
                })
            }
        });

    }

    useEffect(() => {
        getUserBrands(customer.id)
        getUserSeasons(customer.id)
        getUserCollections(customer.id)
        getUserMoulds(customer.id)
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
                    </CRow>
                    <div>
                        <CCol xs={12}>
                            <CCard className="mt-2">
                                <CCardHeader>
                                    <div className="col"> <strong>Add Customer Moulds</strong></div>
                                </CCardHeader>
                                <CCardBody>
                                    <CRow className="mb-2">
                                        <div className="col-sm-1">
                                            <CFormLabel htmlFor="mould_name"
                                                className="col-form-label">
                                                Name
                                            </CFormLabel>
                                        </div>
                                        <div className="col-sm-4">
                                            <CFormInput
                                                type="text"
                                                autoComplete="off"
                                                name="mould_name"
                                                className="form-control"
                                                id="mould_name"
                                                onChange={handleChange}
                                                placeholder="Please specify the Mould Name"
                                            />
                                        </div>
                                        <div className="col-sm-1 text-right">
                                            <CFormLabel htmlFor="mould_notes" className="col-form-label">
                                                Notes
                                            </CFormLabel>
                                        </div>
                                        <div className="col-sm-5">
                                            <CFormInput
                                                type="text"
                                                autoComplete="off"
                                                name="mould_notes"
                                                className="form-control"
                                                id="mould_notes"
                                                onChange={handleChange}
                                                placeholder="Please specify the Mould Notes"
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
                            <strong>List of Moulds</strong>
                        </CCardHeader>
                        <CCardBody>No Moulds found</CCardBody>
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
                                <strong>List of Moulds</strong>
                            </CCardHeader>
                            <CCardBody>
                                <CRow className="">
                                    <table className="jctable table table-striped table-responsive">
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
                                                moulds.map((s, i) => (
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

    return (
        <>
            {loadInputForm()}
            {moulds && moulds.length ? listData() : NoDataFound()}
        </>
    )
}

ViewMoulds.defaultProps = {
    customer: []
};

ViewMoulds.propTypes = {
    customer: PropTypes.object,
};

export default ViewMoulds