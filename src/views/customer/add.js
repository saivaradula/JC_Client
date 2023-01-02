import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux"
import axios from 'axios';
import Swal from 'sweetalert2';
import 'sweetalert2/src/sweetalert2.scss';
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

const AddCustomer = (props) => {
    const { user } = useSelector(state => state.auth)
    const [validated, setValidated] = useState(false)
    const [NumberOfBrands, setNumberOfBrands] = useState([1])

    const [formData, updateFormData] = React.useState({
        'created_by': user.id,
        'customer_id': 'JC_',
        'customer_type': '',
        'brandsCount': 1,
    });

    let nCustomer = {
        customer_type: '',
        customer_type_other: ''
    }

    const [customer, setCustomer] = useState(() => nCustomer)
    const updateText = (event) => {
        switch (event.target.id) {
            case 'customer_type': setCustomer({ ...customer, cutomer_type: event.target.value }); break;
            case 'customer_type_other': setCustomer({ ...customer, cutomer_type_other: event.target.value }); break;
        }
    }

    const getFC = (text) => {
        let matches = text.match(/\b(\w)/g);
        return matches.join('').toUpperCase();
    }

    const handleCTChange = (event) => {
        if (event.target.value !== '') {
            let fc = getFC(event.target.value);
            const d = new Date();
            let nowDate = `${d.getFullYear()}-${d.getMonth()}${d.getHours()}-${d.getMinutes()}${d.getSeconds()}${d.getMilliseconds()}`
            fc = `JC_${fc}-${nowDate}`;
            setNumberOfBrands([1])
            updateFormData({
                ...formData,
                ['customer_id']: fc,
                [event.target.name]: event.target.value.trim()
            });
        } else {
            setNumberOfBrands([1])
            updateFormData({
                'created_by': user.id,
                'customer_id': 'JC_',
                'customer_type': '',
                'brandsCount': 0,
            });
        }
    }

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
        setValidated(true)
        // console.log(document.getElementsByName('bname'))
        if (form.checkValidity()) {
            console.log(formData)
            axios.post(`${process.env.REACT_APP_API_URL}/v1/customer/add`, formData).then((response) => {
                if (response.status === 200) {
                    Swal.fire({
                        icon: 'success',
                        title: 'New Customer added',
                        text: 'New Customer with details added successfully',
                        footer: ''
                    })
                    // history.push('/customers/list')
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Customer adding failed',
                        text: 'Could not add customer',
                        footer: ''
                    })
                }
            })
        }

    }

    const cancelOperation = () => {
        // history.push('/customers/list')
    }

    const addNewBrand = () => {
        let a = NumberOfBrands;
        a.push(a.length + 1)
        setNumberOfBrands(a)
        updateFormData({
            ...formData,
            ['brandsCount']: a.length
        });
    }

    const displayIndividualFields = () => {
        return (
            <>
                <h6><span>Details</span></h6>
                <hr />
                <CRow className="mb-3">
                    <div className="col-sm-1 text-right">
                        <CFormLabel htmlFor="pcn" className="col-form-label">
                            Contact Name
                        </CFormLabel>
                    </div>
                    <div className="col-sm-3">
                        <CFormInput
                            type="text"
                            name="pcn" required
                            onChange={handleChange}
                            className="form-control" id="pcn"
                            placeholder={`Contact Name`}
                        />
                    </div>
                    <div className="col-sm-1 text-right">
                        <CFormLabel htmlFor="cnp" className="col-form-label">
                            Contact
                        </CFormLabel>
                    </div>
                    <div className="col-sm-2">
                        <CFormInput
                            type="text"
                            name="cnp" required
                            onChange={handleChange}
                            className="form-control" id="cnp"
                            placeholder={`Contact number`}
                        />
                    </div>
                    <div className="col-sm-1 text-right">
                        <CFormLabel htmlFor="email" className="col-form-label">
                            Email
                        </CFormLabel>
                    </div>
                    <div className="col-sm-3">
                        <CFormInput
                            type="mobile"
                            name="email"
                            onChange={handleChange}
                            className="form-control" id="email"
                            placeholder={`Email address`}
                        />
                    </div>
                </CRow>
                <CRow className="mb-3">
                    <div className="col-sm-2 text-right">
                        <CFormLabel htmlFor="daddress"
                            className="col-form-label">
                            Delivery Address
                        </CFormLabel>
                    </div>
                    <div className="col-sm-4">
                        <textarea className="form-control" required
                            placeholder="Delivery Address"
                            name="daddress" id="daddress"
                            onChange={handleChange}
                            rows="3"></textarea>
                    </div>
                    <div className="col-sm-1 text-right">
                        <CFormLabel htmlFor="source" className="col-form-label">
                            Source
                        </CFormLabel>
                    </div>
                    <div className="col-sm-3">
                        <CFormSelect required onChange={handleChange}
                            id="source" name="source"
                        >
                            <option value="">Select</option>
                            <option value="Internet Search">Internet Search</option>
                            <option value="Trade Show">Trade Show</option>
                            <option value="Referral">Referral</option>
                            <option value="Walk-in">Walk-in</option>
                            <option value="Previous Client">Previous Client</option>
                        </CFormSelect>
                    </div>
                </CRow>
            </>
        )
    }

    const displayStudentFields = () => {
        return (
            <>
                {displayIndividualFields()}
                <CRow className="mb-3">
                    <div className="col-sm-2 text-right">
                        <CFormLabel htmlFor="university" className="col-form-label">
                            College/University Attended
                        </CFormLabel>
                    </div>
                    <div className="col-sm-4">
                        <CFormInput
                            type="text"
                            name="university" required
                            onChange={handleChange}
                            className="form-control" id="university"
                            placeholder={`University Name`}
                        />
                    </div>
                    <div className="col-sm-1 text-right">
                        <CFormLabel htmlFor="course" className="col-form-label">
                            Course
                        </CFormLabel>
                    </div>
                    <div className="col-sm-2">
                        <CFormInput
                            type="text"
                            name="course" required
                            onChange={handleChange}
                            className="form-control" id="course"
                            placeholder={`Course Name`}
                        />
                    </div>
                    <div className="col-sm-1 text-right">
                        <CFormLabel htmlFor="tutor" className="col-form-label">
                            Tutor
                        </CFormLabel>
                    </div>
                    <div className="col-sm-2">
                        <CFormInput
                            type="text"
                            name="tutor"
                            onChange={handleChange}
                            className="form-control" id="tutor"
                            placeholder={`Tutor Name`}
                        />
                    </div>
                </CRow>
            </>
        )
    }

    const displayBAndBFields = () => {
        let entity = (formData?.customer_type === 'Brand') ? `Brand` : `Bussiness`;
        return (
            <>
                <h6><span>Company details</span></h6>
                <hr />
                <CRow className="mb-3">
                    <div className="col-sm-2 text-right">
                        <CFormLabel htmlFor="company_name"
                            className="col-form-label">
                            Company Name
                        </CFormLabel>
                    </div>
                    <div className="col-sm-3">
                        <CFormInput
                            type="text"
                            onChange={handleChange}
                            name="company_name" required
                            className="form-control" id="company_name"
                            placeholder={`Company Name`}
                        />
                    </div>
                    <div className="col-sm-1 text-right">
                        <CFormLabel htmlFor="company_reg_no"
                            className="col-form-label">
                            RegNo.
                        </CFormLabel>
                    </div>
                    <div className="col-sm-3">
                        <CFormInput
                            type="text"
                            onChange={handleChange}
                            name="company_reg_no" required
                            className="form-control" id="company_reg_no"
                            placeholder={`Company Registration Number`}
                        />
                    </div>
                    <div className="col-sm-1 text-right">
                        <CFormLabel htmlFor="company_vat"
                            className="col-form-label">
                            VAT
                        </CFormLabel>
                    </div>
                    <div className="col-sm-2">
                        <CFormInput
                            type="text"
                            onChange={handleChange}
                            name="company_vat"
                            className="form-control" id="company_vat"
                            placeholder={`VAT`}
                        />
                    </div>
                </CRow>
                <CRow className="mb-3">
                    <div className="col-sm-2 text-right">
                        <CFormLabel htmlFor="summary"
                            className="col-form-label">
                            Summary
                        </CFormLabel>
                    </div>
                    <div className="col-sm-4">
                        <textarea className="form-control"
                            placeholder="Summary Notes"
                            name="summary" id="summary"
                            onChange={handleChange}
                            rows="3"></textarea>
                    </div>
                    <div className="col-sm-2 text-right">
                        <CFormLabel htmlFor="daddress"
                            className="col-form-label">
                            Delivery Address
                        </CFormLabel>
                    </div>
                    <div className="col-sm-4">
                        <textarea className="form-control"
                            placeholder="Delivery Address"
                            name="daddress" id="daddress"
                            onChange={handleChange}
                            rows="3"></textarea>
                    </div>
                </CRow>
                <CRow className="mb-3">
                    <div className="col-sm-2 text-right">
                        <CFormLabel htmlFor="cterms"
                            className="col-form-label">
                            Credit Terms
                        </CFormLabel>
                    </div>
                    <div className="col-sm-4">
                        <textarea className="form-control"
                            placeholder="Credit Terms - if any"
                            name="cterms" id="cterms"
                            onChange={handleChange}
                            rows="3"></textarea>
                    </div>
                    <div className="col-sm-2 text-right">
                        <CFormLabel htmlFor="billname"
                            className="col-form-label">
                            Billing Name
                        </CFormLabel>
                    </div>
                    <div className="col-sm-4">
                        <textarea className="form-control"
                            placeholder="Billing Name/Address"
                            name="billname" id="billname"
                            onChange={handleChange}
                            rows="3"></textarea>
                    </div>
                </CRow>
                <CRow className="mb-3">
                    <div className="col-sm-2 text-right">
                        <CFormLabel htmlFor="apn" className="col-form-label">
                            A/C Payable Name
                        </CFormLabel>
                    </div>
                    <div className="col-sm-4">
                        <CFormInput
                            type="text"
                            name="apn"
                            onChange={handleChange}
                            className="form-control" id="apn"
                            placeholder={`Account Payable Name`}
                        />
                    </div>
                </CRow>
                <CRow className="mb-4">
                    <div className="col-sm-2 text-right">
                        <CFormLabel htmlFor="ape" className="col-form-label">
                            A/C Payable email address
                        </CFormLabel>
                    </div>
                    <div className="col-sm-4">
                        <CFormInput
                            type="text"
                            onChange={handleChange}
                            name="ape"
                            className="form-control" id="ape"
                            placeholder={`Account Payable email address`}
                        />
                    </div>

                    <div className="col-sm-2 text-right">
                        <CFormLabel htmlFor="cape" className="col-form-label">
                            Confirm email address
                        </CFormLabel>
                    </div>
                    <div className="col-sm-4">
                        <CFormInput
                            type="text"
                            name="cape"
                            onChange={handleChange}
                            className="form-control" id="cape"
                            placeholder={`Confirm Account Payable email address`}
                        />
                    </div>
                </CRow>
                <hr />
                <CRow>
                    <div className="col-sm-2 text-right">
                        <CFormLabel htmlFor="bname" className="col-form-label">
                            {entity} Name
                        </CFormLabel>
                    </div>
                    {
                        NumberOfBrands.map(i => (
                            <div key={i} className="col-sm-2">
                                <CFormInput
                                    type="text"
                                    onChange={handleChange}
                                    name={`bname_${i}`}
                                    // name={`bname_${i}`} 
                                    required
                                    className="form-control"
                                    placeholder={`${entity} Name`}
                                />
                            </div>
                        ))
                    }
                    {
                        NumberOfBrands.length < 3 && formData?.customer_type === 'Brand' ?
                            <div className="col-sm-1">
                                <button type="button"
                                    onClick={addNewBrand}
                                    title="Add more brands" className="btn btn-primary">+</button>
                            </div> : <></>
                    }
                </CRow>
                <hr />
                <h6><span>Contact details</span></h6>
                <hr />
                <CRow className="mb-3">
                    <div className="col-sm-1 text-right">
                        <CFormLabel htmlFor="pcn" className="col-form-label">
                            Contact Name
                        </CFormLabel>
                    </div>
                    <div className="col-sm-2">
                        <CFormInput
                            type="text"
                            name="pcn" required
                            onChange={handleChange}
                            className="form-control" id="pcn"
                            placeholder={`Primary Contact Name`}
                        />
                    </div>
                    <div className="col-sm-2 text-right">
                        <CFormLabel htmlFor="cnp" className="col-form-label">
                            Contact (Primary)
                        </CFormLabel>
                    </div>
                    <div className="col-sm-2">
                        <CFormInput
                            type="text"
                            name="cnp" required
                            onChange={handleChange}
                            className="form-control" id="cnp"
                            placeholder={`Primary contact number`}
                        />
                    </div>
                    <div className="col-sm-2 text-right">
                        <CFormLabel htmlFor="cns" className="col-form-label">
                            Contact (Secondary)
                        </CFormLabel>
                    </div>
                    <div className="col-sm-2">
                        <CFormInput
                            type="text"
                            name="cns"
                            onChange={handleChange}
                            className="form-control" id="cns"
                            placeholder={`Secondary contact number`}
                        />
                    </div>
                </CRow>
                <CRow className="mb-3">
                    <div className="col-sm-1 text-right">
                        <CFormLabel htmlFor="email" className="col-form-label">
                            Email
                        </CFormLabel>
                    </div>
                    <div className="col-sm-3">
                        <CFormInput
                            type="mobile"
                            name="email"
                            onChange={handleChange}
                            className="form-control" id="email"
                            placeholder={`Email address`}
                        />
                    </div>
                    <div className="col-sm-1 text-right">
                        <CFormLabel htmlFor="cemail" className="col-form-label">
                            Confirm Email
                        </CFormLabel>
                    </div>
                    <div className="col-sm-3">
                        <CFormInput
                            type="mobile"
                            name="cemail"
                            onChange={handleChange}
                            className="form-control" id="cemail"
                            placeholder={`Confirm Email address`}
                        />
                    </div>
                    <div className="col-sm-1 text-right">
                        <CFormLabel htmlFor="website" className="col-form-label">
                            Website
                        </CFormLabel>
                    </div>
                    <div className="col-sm-3">
                        <CFormInput
                            type="mobile"
                            name="website"
                            onChange={handleChange}
                            className="form-control" id="website"
                            placeholder={`Website URL/address`}
                        />
                    </div>
                </CRow>
                <CRow className="mb-3">
                    <div className="col-sm-1 text-right">
                        <CFormLabel htmlFor="social" className="col-form-label">
                            Social Media
                        </CFormLabel>
                    </div>
                    <div className="col-sm-7">
                        <CFormInput
                            type="mobile"
                            name="social"
                            onChange={handleChange}
                            className="form-control" id="social"
                            placeholder={`Social Media`}
                        />
                    </div>
                    <div className="col-sm-1 text-right">
                        <CFormLabel htmlFor="source" className="col-form-label">
                            Source
                        </CFormLabel>
                    </div>
                    <div className="col-sm-3">
                        <CFormSelect onChange={handleChange}
                            id="source" name="source"
                        >
                            <option value="">Select</option>
                            <option value="Internet Search">Internet Search</option>
                            <option value="Trade Show">Trade Show</option>
                            <option value="Referral">Referral</option>
                            <option value="Walk-in">Walk-in</option>
                            <option value="Previous Client">Previous Client</option>
                        </CFormSelect>
                    </div>
                </CRow>
            </>
        )
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
                    <CCol xs={12}>
                        <CCard className="mb-4">
                            <CCardHeader>
                                <strong>Add New Customer Details</strong>
                            </CCardHeader>
                            <CCardBody>
                                <CRow className="mb-4">
                                    <div className="col-sm-2 text-right">
                                        <CFormLabel htmlFor="customer_id"
                                            className="col-form-label">
                                            Customer Id
                                        </CFormLabel>
                                    </div>
                                    <div className="col-sm-3">
                                        <CFormInput
                                            type="text"
                                            autoComplete="off"
                                            name="customer_id"
                                            className="form-control"
                                            id="customer_id"
                                            value={formData.customer_id}
                                            onChange={handleChange}
                                            placeholder="JC-00001"
                                        />
                                    </div>
                                    &nbsp;&nbsp;&nbsp;&nbsp;
                                    <div className="col-sm-2 text-right">
                                        <CFormLabel htmlFor="customer_type"
                                            className="col-form-label">
                                            Customer Type
                                        </CFormLabel>
                                    </div>
                                    <div className="col-sm-2">
                                        <CFormSelect required onChange={handleCTChange}
                                            id="customer_type" name="customer_type"
                                        >
                                            <option value="">Select</option>
                                            <option value="Brand">Brand</option>
                                            <option value="Corporate">Corporate</option>
                                            <option value="Individual">Individual</option>
                                            <option value="Student">Student</option>
                                            <option value="Other">Other</option>
                                        </CFormSelect>
                                    </div>
                                    {
                                        (formData.customer_type === 'Other') ?
                                            <>
                                                <div className="col-sm-2">
                                                    <CFormInput
                                                        type="text"
                                                        autoComplete="off"
                                                        name="customer_type_other"
                                                        className="form-control"
                                                        id="customer_type_other"
                                                        onChange={handleChange}
                                                        placeholder="Other type"
                                                    />
                                                </div>
                                            </> : <></>
                                    }
                                </CRow>

                                <hr />

                                <div>
                                    {
                                        (formData?.customer_type !== '') ?
                                            (
                                                formData?.customer_type === 'Brand'
                                                ||
                                                formData?.customer_type === 'Corporate'
                                            ) ?
                                                displayBAndBFields()
                                                :
                                                formData?.customer_type === 'Individual' ?
                                                    displayIndividualFields()
                                                    :
                                                    displayStudentFields()
                                            : <></>
                                    }
                                </div>


                            </CCardBody>
                        </CCard>
                    </CCol>
                </CRow>
                <CRow>
                    <CCol>
                        <CRow className="mb-4">
                            <div className="col-sm-12 text-right">
                                {
                                    (formData?.customer_type !== '') ?
                                        <button type="submit" className="btn btn-primary">
                                            Add Customer</button> :
                                        <button type="button" disabled className="btn btn-primary">
                                            Add Customer</button>
                                }
                                &nbsp;&nbsp;&nbsp;
                                <button className="btn btn-secondary"
                                    onClick={() => cancelOperation()}>
                                    Cancel
                                </button>
                            </div>
                        </CRow>
                    </CCol>
                </CRow>
            </CForm>
        </>
    )
}

export default AddCustomer;