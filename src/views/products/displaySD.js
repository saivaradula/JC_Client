import React, { useEffect } from 'react'
import useState from 'react-usestateref'
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

const DisplaySD = ({ incr, data, handleWFUpdate }) => {
    return (
        <>
            <CRow className="mb-3">
                <div className="col-sm-1 text-right">
                    <CFormLabel className="col-form-label">
                        {incr + 1}
                    </CFormLabel>
                </div>
                <div className="col-sm-3">
                    <CFormLabel className="col-form-label">
                        <strong>{data.name}</strong>
                    </CFormLabel>
                </div>
            </CRow>
            {
                data.items.map((item, index) => (
                    <>
                        <CRow className="mb-3">
                            <div className="col-sm-2">&nbsp;</div>
                            <div className="col-sm-1">
                                <CFormLabel className="col-form-label">
                                    {item.service}
                                </CFormLabel>
                            </div>
                            <div className="col-sm-1 text-right">
                                <CFormLabel className="col-form-label">
                                    Price
                                </CFormLabel>
                            </div>
                            <div className="col-sm-1">
                                <CFormInput required
                                    type="text"
                                    className="form-control"
                                    value={item.price}
                                    onChange={(e) => handleWFUpdate(incr, e)}
                                />
                            </div>
                            {
                                (item.notes !== undefined) ?
                                    <>
                                        <div className="col-sm-1 text-right">
                                            <CFormLabel className="col-form-label">
                                                Notes
                                            </CFormLabel>
                                        </div>
                                        <div className="col-sm-4">
                                            <CFormInput required
                                                type="text"
                                                className="form-control"
                                                value={item.notes}
                                                onChange={(e) => handleWFUpdate(incr, e)}
                                            />
                                        </div>
                                    </>
                                    : <></>
                            }
                        </CRow>
                        <CRow className="mb-3">
                            {
                                (item.material !== undefined) ?
                                    <>
                                        <div className="col-sm-5">&nbsp;</div>
                                        <div className="col-sm-1 text-right">
                                            <CFormLabel className="col-form-label">
                                                Material
                                            </CFormLabel>
                                        </div>
                                        <div className="col-sm-2">
                                            <CFormSelect
                                                onChange={e => handleWFUpdate(incr, e)}
                                                name="material" value={item.material}
                                                className="form-control"
                                            >
                                                <option value="">Select Material</option>
                                                <option value="mone">Material One</option>
                                            </CFormSelect>
                                        </div>
                                    </>
                                    : <></>
                            }

                            {
                                (item.quantity !== undefined) ?
                                    <>
                                        <div className="col-sm-1 text-right">
                                            <CFormLabel className="col-form-label">
                                                Quantity
                                            </CFormLabel>
                                        </div>
                                        <div className="col-sm-1">
                                            <CFormInput required
                                                type="text"
                                                className="form-control"
                                                value={item.quantity}
                                                onChange={(e) => handleWFUpdate(incr, e)}
                                            />
                                        </div>
                                    </>
                                    : <></>
                            }

                            {
                                (item.total !== undefined) ?
                                    <>
                                        <div className="col-sm-1 text-right">
                                            <CFormLabel className="col-form-label">
                                                Total
                                            </CFormLabel>
                                        </div>
                                        <div className="col-sm-1">
                                            <CFormInput required
                                                type="text"
                                                className="form-control"
                                                value={item.total}
                                                onChange={(e) => handleWFUpdate(incr, e)}
                                            />
                                        </div>
                                    </>
                                    : <></>
                            }
                        </CRow>
                    </>
                ))
            }
        </>
    )
}

export default DisplaySD