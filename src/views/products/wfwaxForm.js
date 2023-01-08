import React, { useEffect } from 'react';
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

const WFWaxFormComponent = ({ SETWAX_TOWF }) => {

    const [wax, setWax, refWax] = useState({
        numbers: 0,
        charge_pm: 0,
        total: 0,
        notes: ''
    })

    const handleChange = (event) => {
        switch (event.target.name) {
            case 'wf_wax_number': {
                setWax({
                    ...wax,
                    'numbers': event.target.value.trim(),
                    'total': refWax.current.charge_pm * event.target.value.trim()
                });

                break;
            }
            case 'wf_wax_charge_pm': {
                setWax({
                    ...wax,
                    'charge_pm': event.target.value.trim(),
                    'total': refWax.current.numbers * event.target.value.trim()
                });
                break;
            }
            case 'wf_wax_notes': {
                setWax({
                    ...wax,
                    'notes': event.target.value
                });
                break;
            }
        }
        SETWAX_TOWF(refWax.current)
    }

    return (
        <>
            <CRow className="row mb-3">
                <div className="col-sm-2">
                    <h6><span>Wax</span></h6>
                </div>
            </CRow>
            <CRow className="row mb-3">
                <div className="col-sm-2 text-right">
                    <label htmlFor=""
                        className="col-form-label">
                        Number of Wax
                    </label>
                </div>
                <div className="col-sm-2">
                    <input
                        onChange={e => handleChange(e)}
                        value={refWax.current.numbers}
                        type="text" placeholder="Number of Wax"
                        name="wf_wax_number" className="form-control"
                    />
                </div>
                <div className="col-sm-2 text-right">
                    <label htmlFor=""
                        className="col-form-label">
                        Charge Per Mould
                    </label>
                </div>
                <div className="col-sm-2">
                    <input
                        onChange={e => handleChange(e)}
                        type="text" placeholder="Charge"
                        value={refWax.current.charge}
                        name="wf_wax_charge_pm" className="form-control"
                    />
                </div>
                <div className="col-sm-1 text-right">
                    <label htmlFor=""
                        className="col-form-label">
                        Total
                    </label>
                </div>
                <div className="col-sm-2">
                    <input
                        readOnly disabled={true}
                        value={refWax.current.total}
                        type="text" placeholder="Total"
                        name="wf_wax_total" className="form-control"
                    />
                </div>
            </CRow>
            <CRow>
                <div className="col-sm-1 text-right">
                    <label htmlFor=""
                        className="col-form-label">
                        Notes
                    </label>
                </div>
                <div className="col-sm-8">
                    <input
                        onChange={e => handleChange(e)}
                        value={refWax.current.notes}
                        type="text" placeholder="Notes"
                        name="wf_wax_notes" className="form-control"
                    />
                </div>
            </CRow>
        </>
    )
}

export default WFWaxFormComponent;