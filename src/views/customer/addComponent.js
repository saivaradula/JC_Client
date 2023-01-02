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


const AddCompnent = ({ closeModal, customer, componentData, cb }) => {
    const [validated, setValidated] = useState(false)

    const [formData, updateFormData] = React.useState(() => componentData);

    const handleSubmit = async event => {
        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault()
            event.stopPropagation()
            return;
        }
        let api = `${process.env.REACT_APP_API_URL}/v1/customers/${customer.id}/components/add`;
        console.log(formData)
        await axios.post(api, formData).then(response => {
            if (response.status === 200) {
                Swal.fire({
                    icon: 'success',
                    title: 'New Component added',
                    text: 'New Component added successfully',
                    footer: ''
                })
                cb();
                closeModal();
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Component adding failed',
                    text: 'Could not add Component',
                    footer: ''
                })
            }
        });
    }

    const baseImage = (e) => {
        let img = new Image;
        let canvas = document.getElementById("canvas");
        let ctx = canvas.getContext("2d");
        let maxW = 256;
        let maxH = 256;
        img.onload = () => {
            let iw = img.width;
            let ih = img.height;
            let scale = Math.min((maxW / iw), (maxH / ih));
            let iwScaled = iw * scale;
            let ihScaled = ih * scale;
            canvas.width = iwScaled;
            canvas.height = ihScaled;
            ctx.drawImage(img, 0, 0, iwScaled, ihScaled);
            let imageCode = canvas.toDataURL("image/jpeg", 0.5);
            updateFormData({
                ...formData,
                'component_image': imageCode
            });
        }
        img.src = URL.createObjectURL(e.target.files[0]);
    }

    const handleChange = (e) => {
        updateFormData({
            ...formData,
            [e.target.name]: e.target.value.trim()
        });
    };

    useEffect(() => {
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
                                        <CFormLabel htmlFor="component_name"
                                            className="col-form-label">
                                            Name
                                        </CFormLabel>
                                    </div>
                                    <div className="col-sm-8">
                                        <CFormInput
                                            required
                                            type="text"
                                            autoComplete="off"
                                            name="component_name"
                                            className="form-control"
                                            id="component_name"
                                            onChange={handleChange}
                                            value={formData.component_name}
                                            placeholder="Please specify the Component Name"
                                        />
                                    </div>
                                </CRow>
                                <CRow className="mb-3">
                                    <div className="col-sm-2 text-right">
                                        <CFormLabel htmlFor="component_name"
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
                                            name="component_desc"
                                            className="form-control"
                                            id="component_desc"

                                            placeholder="Please specify the Component Description"
                                        />
                                    </div>
                                </CRow>
                                <CRow className="mb-3">
                                    <div className="col-sm-2 text-right">
                                        <CFormLabel htmlFor="component_category"
                                            className="col-form-label">
                                            Category
                                        </CFormLabel>
                                    </div>
                                    <div className="col-sm-8">
                                        <CFormInput
                                            required
                                            type="text"
                                            autoComplete="off"
                                            name="component_category"
                                            className="form-control"
                                            onChange={handleChange}
                                            id="component_category"
                                            placeholder="Please specify the Component Category"
                                        />
                                    </div>
                                </CRow>
                                <CRow className="mb-3">
                                    <div className="col-sm-2 text-right">
                                        <CFormLabel htmlFor="component_image"
                                            className="col-form-label">
                                            Image
                                        </CFormLabel>
                                    </div>
                                    <div className="col-sm-8">
                                        <input
                                            type="file"
                                            id="component_image"
                                            name="component_image"
                                            multiple={true}
                                            onChange={baseImage}
                                            className="mb-4 mt-4 form-control"
                                        />
                                        <canvas id="canvas" width="64" height="64"></canvas>
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
                                            Add Component
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

AddCompnent.defaultProps = {
    customer: [],
    componentData: [],
    cb: [],
    closeModal: []
};

AddCompnent.propTypes = {
    customer: PropTypes.object,
    componentData: PropTypes.object,
    cb: PropTypes.func,
    closeModal: PropTypes.func
};

export default AddCompnent