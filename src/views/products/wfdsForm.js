import React, { useState } from 'react';
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

const WFDSFormComponent = ({ SETDS3DITEMS_C, SETDSCADITEMS_C }) => {
    const [ds3ditems, setds3ditems] = useState(() => [])
    const handleWFDS_TD_Change = (event) => {
        let eventName = '';
        switch (event.target.name) {
            case 'wf_ds_3d_price': eventName = 'price'; break;
            case 'wf_ds_3d_notes': eventName = 'notes'; break;
        }

        if (event.target.name === 'wf_ds_3d_check') {
            if (event.target.checked) {
                setds3ditems({
                    ...ds3ditems,
                    ['is_checked']: event.target.checked,
                    'service': '3D Scan'
                });
            }
        } else {
            setds3ditems({
                ...ds3ditems,
                [eventName]: event.target.value.trim()
            });
        }
        SETDS3DITEMS_C(ds3ditems)
    }

    const [dscaditems, setdscaditems] = useState(() => [])
    const handleWFDS_CAD_Change = (event) => {
        let eventName = '';
        switch (event.target.name) {
            case 'wf_ds_cad_price': eventName = 'price'; break;
            case 'wf_ds_cad_notes': eventName = 'notes'; break;
        }
        if (event.target.name === 'wf_ds_cad_check') {
            if (event.target.checked) {
                setdscaditems({
                    ...dscaditems,
                    ['is_checked']: event.target.checked,
                    'service': 'CAD Designer'
                });
            }
        } else {
            setdscaditems({
                ...dscaditems,
                [eventName]: event.target.value.trim()
            });
        }
        SETDSCADITEMS_C(dscaditems)
    }

    return (
        <>
            <CRow className="row mb-3">
                <div className="col-sm-2">
                    <h6><span>Design Studio</span></h6>
                </div>
            </CRow>
            <CRow className="row mb-3">
                <div className="col-sm-2 text-right">
                    <label htmlFor=""
                        className="col-form-label">
                        Customer Files
                    </label>
                </div>
                <div className="col-sm-3">
                    <input
                        type="file" multiple
                        name="wf_ds_files" required
                        className="form-control" id="wf_ds_files"
                    />
                </div>
            </CRow>
            <CRow className="row mb-3">
                <div className="col-sm-2 text-right">
                    <label htmlFor=""
                        className="col-form-label">
                        Select Services
                    </label>
                </div>
                <div className="col-sm-2">
                    <input
                        onChange={e => handleWFDS_TD_Change(e)}
                        type="checkbox"
                        name="wf_ds_3d_check"
                        style={{ marginTop: '13px' }}
                    /> &nbsp;&nbsp;&nbsp;
                    3D Scan
                </div>
                <div className="col-sm-3">
                    <input
                        onChange={e => handleWFDS_TD_Change(e)}
                        type="text" placeholder="3D Scan price"
                        name="wf_ds_3d_price" className="form-control"
                    />
                </div>
                <div className="col-sm-4">
                    <input
                        onChange={e => handleWFDS_TD_Change(e)}
                        type="text" placeholder="Notes" name="wf_ds_3d_notes" className="form-control"
                    />
                </div>
            </CRow>
            <CRow className="row mb-3">
                <div className="col-sm-2 text-right">
                    &nbsp;
                </div>
                <div className="col-sm-2">
                    <input
                        onChange={e => handleWFDS_CAD_Change(e)}
                        type="checkbox"
                        name="wf_ds_cad_check"
                        style={{ marginTop: '13px' }}
                    /> &nbsp;&nbsp;&nbsp;
                    CAD Design
                </div>
                <div className="col-sm-3">
                    <input
                        onChange={e => handleWFDS_CAD_Change(e)}
                        type="text" placeholder="CAD Design price"
                        name="wf_ds_cad_price" className="form-control"
                    />
                </div>
                <div className="col-sm-4">
                    <input
                        onChange={e => handleWFDS_CAD_Change(e)}
                        type="text" placeholder="CAD Design Notes" name="wf_ds_cad_notes" className="form-control"
                    />
                </div>
            </CRow>
            <hr />
        </>
    )
}

export default WFDSFormComponent;
