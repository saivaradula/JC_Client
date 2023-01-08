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

const WFMouldFormComponent = ({ SETMOULD_TOWF }) => {

    const [moulds, setMoulds, refMoulds] = useState({
        numbers: 0,
        charge_pm: 0,
        total: 0,
        notes: ''
    })

    const handleChange = (event) => {
        switch (event.target.name) {
            case 'wf_moulds_number': {
                setMoulds({
                    ...moulds,
                    'numbers': event.target.value.trim(),
                    'total': refMoulds.current.charge_pm * event.target.value.trim()
                });

                break;
            }
            case 'wf_moulds_charge_pm': {
                setMoulds({
                    ...moulds,
                    'charge_pm': event.target.value.trim(),
                    'total': refMoulds.current.numbers * event.target.value.trim()
                });
                break;
            }
            case 'wf_moulds_notes': {
                setMoulds({
                    ...moulds,
                    'notes': event.target.value
                });
                break;
            }
        }
        SETMOULD_TOWF(refMoulds.current)
    }

    return (
        <>
            <CRow className="row mb-3">
                <div className="col-sm-2">
                    <h6><span>Mould</span></h6>
                </div>
            </CRow>
            <CRow className="row mb-3">
                <div className="col-sm-2 text-right">
                    <label htmlFor=""
                        className="col-form-label">
                        Number of Moulds
                    </label>
                </div>
                <div className="col-sm-2">
                    <input
                        onChange={e => handleChange(e)}
                        value={refMoulds.current.numbers}
                        type="text" placeholder="Number of Moulds"
                        name="wf_moulds_number" className="form-control"
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
                        value={refMoulds.current.charge}
                        name="wf_moulds_charge_pm" className="form-control"
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
                        value={refMoulds.current.total}
                        type="text" placeholder="Total"
                        name="wf_moulds_total" className="form-control"
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
                        value={refMoulds.current.notes}
                        type="text" placeholder="Notes"
                        name="wf_moulds_notes" className="form-control"
                    />
                </div>
            </CRow>
        </>
    )
}

export default WFMouldFormComponent;