import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types'
import { useSelector } from "react-redux"
import axios from 'axios';
import {
    CButton,
    CFormSelect, CFormInput, CCardBody, CCardHeader, CCol,
    CFormLabel, CForm, CCard, CRow
} from '@coreui/react'

import Swal from 'sweetalert2';
import 'sweetalert2/src/sweetalert2.scss';

const ViewSeason = ({ customer }) => {

    const { user } = useSelector(state => state.auth)
    const [seasons, setSeasons] = useState(() => [])

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

    const getUserSeasons = async (id, brandId = 0) => {
        let api = `${process.env.REACT_APP_API_URL}/v1/customers/${id}/seasons`;
        setSeasons(await (await axios.get(api)).data.data)
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault()
            event.stopPropagation()
        }
        let api = `${process.env.REACT_APP_API_URL}/v1/customers/${customer.id}/seasons/add`;
        await axios.post(api, formData).then(response => {
            if (response.status === 200) {
                Swal.fire({
                    icon: 'success',
                    title: 'New Season added',
                    text: 'New Season added successfully',
                    footer: ''
                })
                getUserSeasons(customer.id)
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Season adding failed',
                    text: 'Could not add Season',
                    footer: ''
                })
            }
        });
    }

    useEffect(() => {
        getUserSeasons(customer.id)
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

                    </CRow>
                    <div>
                        <CCol xs={12}>
                            <CCard className="mt-2">
                                <CCardHeader>
                                    <div className="col-sm-2"> <strong>Add Seasons</strong></div>
                                </CCardHeader>
                                <CCardBody>
                                    <CRow className="mb-2">
                                        <div className="col-sm-1">
                                            <CFormLabel htmlFor="season_name"
                                                className="col-form-label">
                                                Name
                                            </CFormLabel>
                                        </div>
                                        <div className="col-sm-4">
                                            <CFormInput
                                                type="text"
                                                required
                                                autoComplete="off"
                                                name="season_name"
                                                className="form-control"
                                                id="season_name"
                                                onChange={handleChange}
                                                placeholder="Please specify the Season Name"
                                            />
                                        </div>
                                        <div className="col-sm-1 text-right">
                                            <CFormLabel htmlFor="season_notes" className="col-form-label">
                                                Notes
                                            </CFormLabel>
                                        </div>
                                        <div className="col-sm-5">
                                            <CFormInput
                                                type="text"
                                                autoComplete="off"
                                                name="season_notes"
                                                className="form-control"
                                                id="season_notes"
                                                onChange={handleChange}
                                                placeholder="Please specify the Season Notes"
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
                            <strong>List of Seasons</strong>
                        </CCardHeader>
                        <CCardBody>No Seasons found</CCardBody>
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
                        <CCard className="mt-2">
                            <CCardHeader>
                                <strong>List of Seasons</strong>
                            </CCardHeader>
                            <CCardBody>
                                <CRow>
                                    <table className="jctable table table-striped table-responsive">
                                        <thead>
                                            <tr>
                                                <th width="5%">S.No</th>
                                                <th width="15%">Name</th>
                                                <th width="15%">Brand</th>
                                                <th width="45%">Notes</th>
                                                <th width="15%" className='text-center'>Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                seasons.map((s, i) => {
                                                    return (
                                                        <tr key={i}>
                                                            <td>{i + 1}</td>
                                                            <td>{s.name}</td>
                                                            <td>{s?.brand_name || 'N/A'}</td>
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
            {seasons && seasons.length ? listData() : NoDataFound()}
        </>
    )
}

ViewSeason.defaultProps = {
    customer: []
};

ViewSeason.propTypes = {
    customer: PropTypes.object,
};

export default ViewSeason