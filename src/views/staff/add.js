import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import actions from '../../constants/actionTypes'
import { useDispatch, useSelector } from "react-redux"
import { Redirect } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { Form } from 'react-bootstrap';
import axios from 'axios'
import Swal from 'sweetalert2'
import 'sweetalert2/src/sweetalert2.scss'

import {
    CButton,
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CForm,
    CFormInput,
    CFormLabel,
    CFormSelect,
    CFormFeedback,
    CRow,
} from '@coreui/react'

const AddStaff = (props) => {
    const dispatch = useDispatch()
    const { user } = useSelector(state => state.auth)
    const [validated, setValidated] = useState(false)

    const handleSubmit = (e) => {
        e.preventDefault()
    }

    const arrayBufferToBase64 = (buffer) => {
        let binary = '';
        let bytes = [].slice.call(new Uint8Array(buffer));
        bytes.forEach((b) => binary += String.fromCharCode(b));
        return window.btoa(binary);
    };

    const create_src = (type, buffer) => {
        let base64Flag = 'data:image/' + type + ';base64,';
        let base64string = arrayBufferToBase64(buffer);
        let result = base64Flag + base64string;
        return result;
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
            // setProfile({ ...profile, profile_image: imageCode });
        }
        img.src = URL.createObjectURL(e.target.files[0]);
    }

    return (
        <>
            <CForm
                className="row g-3 needs-validation"
                noValidate
                validated={validated}
                onSubmit={(e) => handleSubmit(e)}
            >
                <CRow>
                    <CCol xs={7}>
                        <CCard className="mb-4">
                            <CCardHeader>
                                <strong>Add New Staff Member</strong>
                            </CCardHeader>
                            <CCardBody>
                                <CRow className="mb-4">
                                    <div className="col-sm-2">
                                        <CFormLabel htmlFor="fullname" className="col-form-label">
                                            Full Name
                                        </CFormLabel>
                                    </div>
                                    <div className="col-sm-4">
                                        <CFormInput
                                            type="text"
                                            autoComplete="off"
                                            id="fullname"
                                            name="fullname"
                                            placeholder="Enter Full Name"
                                        />
                                    </div>
                                    <div className="col-sm-2">
                                        <CFormLabel htmlFor="nickname" className="col-form-label">
                                            NickName
                                        </CFormLabel>
                                    </div>
                                    <div className="col-sm-4">
                                        <CFormInput
                                            type="text"
                                            autoComplete="off"
                                            id="nickname"
                                            name="nickname"
                                            placeholder="Enter NickName"
                                        />
                                    </div>
                                </CRow>

                                <CRow className="mb-4">
                                    <div className="col-sm-2">
                                        <CFormLabel htmlFor="phoneprimary" className="col-form-label">
                                            Phone (Primary)
                                        </CFormLabel>
                                    </div>
                                    <div className="col-sm-4">
                                        <CFormInput
                                            type="text"
                                            autoComplete="off"
                                            id="phoneprimary"
                                            name="phoneprimary"
                                            maxLength="15"
                                            placeholder="Primary Contact Number"
                                        />
                                    </div>
                                    <div className="col-sm-2">
                                        <CFormLabel htmlFor="secondaryphone"
                                            className="col-form-label">
                                            Phone (Primary)
                                        </CFormLabel>
                                    </div>
                                    <div className="col-sm-4">
                                        <CFormInput
                                            type="text"
                                            autoComplete="off"
                                            id="secondaryphone"
                                            name="secondaryphone"
                                            maxLength="15"
                                            placeholder="Secondary Contact Number"
                                        />
                                    </div>
                                </CRow>
                                <CRow className="mb-4">
                                    <div className="col-sm-2">
                                        <CFormLabel htmlFor="paddress"
                                            className="col-form-label">
                                            Postal Address
                                        </CFormLabel>
                                    </div>
                                    <div className="col-sm-10">
                                        <textarea className="form-control"
                                            placeholder="Add your Postal Address"
                                            name="paddress" id="paddress"
                                            rows="3"></textarea>
                                    </div>
                                </CRow>
                                <CRow className="mb-4">
                                    <div className="col-sm-2">
                                        <CFormLabel htmlFor="contact_email"
                                            className="col-form-label">
                                            Email Id
                                        </CFormLabel>
                                    </div>
                                    <div className="col-sm-4">
                                        <CFormInput
                                            type="text"
                                            autoComplete="off"
                                            id="contact_email"
                                            name="contact_email"
                                            maxLength="15"
                                            placeholder="Enter Email Address"
                                        />
                                    </div>
                                </CRow>
                            </CCardBody>
                        </CCard>
                    </CCol>
                    <CCol xs={5}>
                        <CCard className="mb-4">
                            <CCardHeader>
                                <strong>Profile Picture</strong>
                            </CCardHeader>
                            <CCardBody>
                                <canvas id="canvas" width="64" height="64"></canvas>
                                <input
                                    type="file"
                                    id="input"
                                    name="profileimage"
                                    onChange={baseImage}
                                    className="mb-4 mt-4 form-control"
                                />
                            </CCardBody>
                        </CCard>
                    </CCol>
                </CRow>
                <CRow>
                    <CCol xs={7}>
                        <CCard className="mb-4">
                            <CCardHeader>
                                <strong>Login Details</strong>
                            </CCardHeader>
                            <CCardBody>
                                <CRow className="mb-4">
                                    <div className="col-sm-2">
                                        <CFormLabel htmlFor="login"
                                            className="col-form-label">
                                            Login Username
                                        </CFormLabel>
                                    </div>
                                    <div className="col-sm-4">
                                        <CFormInput
                                            type="text"
                                            autoComplete="off"
                                            id="login"
                                            name="login"
                                            maxLength="15"
                                            placeholder="Enter Email Address"
                                        />
                                    </div>
                                    <div className="col-sm-2">
                                        <CFormLabel htmlFor="usertype"
                                            className="col-form-label">
                                            Login Username
                                        </CFormLabel>
                                    </div>
                                    <div className="col-sm-4">
                                        <CFormSelect required
                                            id="usertype" name="usertype"
                                        >
                                            <option value="">Select</option>
                                            <option value='admin'>Admin User</option>
                                            <option value='standard'>Standard User</option>
                                            <option value='super'>Super User</option>
                                        </CFormSelect>
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

AddStaff.propTypes = {
    doEdit: Boolean,
}

export default AddStaff;