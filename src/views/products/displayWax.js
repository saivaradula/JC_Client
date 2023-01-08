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

const DisplayWax = ({ incr, data, handleWFUpdate }) => {
    return (
        <>
            <CRow className="mb-3">
                <div className="col-sm-1 text-right">
                    <CFormLabel className="col-form-label">
                        {incr + 1}
                    </CFormLabel>
                </div>
                <div className="col-sm-1">
                    <CFormLabel className="col-form-label">
                        <strong>{data.name}</strong>
                    </CFormLabel>
                </div>
                <div className="col-sm-1 text-right">
                    <CFormLabel className="col-form-label">
                        #Wax
                    </CFormLabel>
                </div>
                <div className="col-sm-1">
                    <CFormInput required
                        type="text"
                        className="form-control"
                        value={data.items.numbers}
                        onChange={(e) => handleWFUpdate(incr, e)}
                    />
                </div>
                <div className="col-sm-1 text-right">
                    <CFormLabel className="col-form-label">
                        Charge PM
                    </CFormLabel>
                </div>
                <div className="col-sm-1">
                    <CFormInput required
                        type="text"
                        className="form-control"
                        value={data.items.charge_pm}
                        onChange={(e) => handleWFUpdate(incr, e)}
                    />
                </div>
                <div className="col-sm-1 text-right">
                    <CFormLabel className="col-form-label">
                        Total
                    </CFormLabel>
                </div>
                <div className="col-sm-1">
                    <CFormInput required
                        type="text"
                        className="form-control"
                        value={data.items.total}
                        readOnly disabled
                    />
                </div>
                <div className="col-sm-4">
                    <CFormInput
                        type="text"
                        className="form-control"
                        value={data.items.notes}
                        onChange={(e) => handleWFUpdate(incr, e)}
                    />
                </div>
            </CRow>
        </>
    )
}

export default DisplayWax