import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux"
import axios from 'axios';
import { Link } from "react-router-dom";
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip'
import CIcon from '@coreui/icons-react'
import { cilSun, cilBookmark, cilViewStream, cilInbox, cilShareBoxed } from '@coreui/icons'
import { CButton, CCard, CCardBody, CCardHeader, CCol, CRow } from '@coreui/react'
import Modal from 'react-bootstrap/Modal'
import ViewBrand from './brand'
import ViewSeason from './season'
import ViewCollection from './collection'
import ViewProducts from './products'
import ViewMoulds from './moulds'
import ViewComponents from './components'

const ListCustomer = (props) => {
    const [customers, setCustomers] = useState(() => [])
    const [isLoaded, setIsLoaded] = useState(() => false)
    const [customerForDetails, setCustomerForDetails] = useState(() => [])
    const [brandShow, setBrandShow] = useState(() => false)
    const [seasonShow, setSeasonShow] = useState(() => false)
    const [collectionShow, setCollectionShow] = useState(() => false)
    const [productShow, setProductShow] = useState(() => false)
    const [mouldShow, setMouldShow] = useState(() => false)
    const [componentShow, setComponentShow] = useState(() => false)

    const getCustomers = async () => {
        let api = `${process.env.REACT_APP_API_URL}/v1/customers/list`
        setCustomers(await (await axios.get(api)).data.data)
        setIsLoaded(true)
    }

    useEffect(() => {
        getCustomers()
    }, [isLoaded])

    const customerActions = (customer) => {
        return (
            <>
                <CRow>
                    <div className="col">
                        <OverlayTrigger
                            placement="top"
                            overlay={
                                <Tooltip id="button-tooltip-2">
                                    Brand data
                                </Tooltip>
                            }
                        >
                            <button className="btn border"
                                onClick={() => openModal('brand', customer, 'lg')}>
                                <CIcon size={'sm'} icon={cilBookmark} />
                            </button>
                        </OverlayTrigger>
                        &nbsp;&nbsp;&nbsp;
                        <OverlayTrigger
                            placement="top"
                            overlay={
                                <Tooltip id="button-tooltip-2">
                                    Seasons data
                                </Tooltip>
                            }
                        >
                            <button className="btn border"
                                onClick={() => openModal('season', customer, 'lg')}>
                                <CIcon size={'sm'} icon={cilSun} />
                            </button>
                        </OverlayTrigger>
                        &nbsp;&nbsp;&nbsp;
                        <OverlayTrigger
                            placement="top"
                            overlay={
                                <Tooltip id="button-tooltip-2">
                                    Collections data
                                </Tooltip>
                            }
                        >
                            <button className="btn border"
                                onClick={() => openModal('collection', customer, 'lg')}>
                                <CIcon size={'sm'} icon={cilInbox} />
                            </button>
                        </OverlayTrigger>

                        &nbsp;&nbsp;&nbsp;
                        <OverlayTrigger
                            placement="top"
                            overlay={
                                <Tooltip id="button-tooltip-2">
                                    Moulds
                                </Tooltip>
                            }
                        >
                            <button className="btn border"
                                onClick={() => openModal('mould', customer, 'lg')}>
                                <CIcon size={'sm'} icon={cilViewStream} />
                            </button>
                        </OverlayTrigger>

                        &nbsp;&nbsp;&nbsp;
                        <OverlayTrigger
                            placement="top"
                            overlay={
                                <Tooltip id="button-tooltip-2">
                                    Products
                                </Tooltip>
                            }
                        >
                            <button className="btn border"
                                onClick={() => openModal('product', customer, 'lg')}>
                                <CIcon size={'sm'} icon={cilShareBoxed} />
                            </button>
                        </OverlayTrigger>
                    </div>
                </CRow>
            </>
        )
    }

    const listCustomers = () => {
        return (
            <>
                <CRow className="mb-4">
                    <table className="table table-striped table-responsive">
                        <thead>
                            <tr>
                                <th width="3%">#</th>
                                <th width="15%">Customer Id</th>
                                <th width="15%">Name</th>
                                <th width="15%">Customer Type</th>
                                <th width="15%">Contact(p)</th>
                                <th width="15%">Email</th>
                                <th width="35%" className='text-center'>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                customers.map((c, i) => {
                                    return (
                                        <tr key={i}>
                                            <td>{i + 1}</td>
                                            <td>{c.customer_id}</td>
                                            <td>{c.company_name}</td>
                                            <td>{c.customer_type}</td>
                                            <td>{c.primary_contact_name}</td>
                                            <td>{c.primary_email}</td>
                                            <td colSpan="2">
                                                {customerActions(c)}
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </CRow>
            </>
        )
    }

    const openModal = (compName, customer) => {

        switch (compName) {
            case 'brand': {
                setBrandShow(true)
                break;
            }
            case 'season': {
                setSeasonShow(true)
                break;
            }
            case 'collection': {
                setCollectionShow(true)
                break;
            }

            case 'product': {
                setProductShow(true)
                break;
            }

            case 'mould': {
                setMouldShow(true)
                break;
            }

            case 'component': {
                setComponentShow(true);
                break;
            }
        }
        setCustomerForDetails(customer)
    }


    const brandModal = () => {
        return (
            <CRow>
                <Modal show={brandShow} onHide={() => setBrandShow(false)} size="xl">
                    <Modal.Header closeButton>
                        <Modal.Title>
                            Brand details for {customerForDetails.name}
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <ViewBrand customer={customerForDetails} />
                    </Modal.Body>
                    <Modal.Footer>
                        <button className="btn btn-secondary" onClick={() => setBrandShow(false)}>
                            Close
                        </button>
                    </Modal.Footer>
                </Modal>
            </CRow>
        )
    }

    const seasonModal = () => {
        return (
            <CRow>
                <Modal show={seasonShow} onHide={() => setSeasonShow(false)} size="xl">
                    <Modal.Header closeButton>
                        <Modal.Title>
                            Season details for {customerForDetails.name}
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <ViewSeason customer={customerForDetails} />
                    </Modal.Body>
                    <Modal.Footer>
                        <button className="btn btn-secondary" onClick={() => setSeasonShow(false)}>
                            Close
                        </button>
                    </Modal.Footer>
                </Modal>
            </CRow>
        )
    }

    const collectionModal = () => {
        return (
            <CRow>
                <Modal show={collectionShow} onHide={() => setCollectionShow(false)} size="xl">
                    <Modal.Header closeButton>
                        <Modal.Title>
                            Collection details for {customerForDetails.name}
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <ViewCollection customer={customerForDetails} />
                    </Modal.Body>
                    <Modal.Footer>
                        <button className="btn btn-secondary"
                            onClick={() => setCollectionShow(false)}>
                            Close
                        </button>
                    </Modal.Footer>
                </Modal>
            </CRow>
        )
    }

    const productModal = () => {
        return (
            <CRow>
                <Modal show={productShow} onHide={() => setProductShow(false)} size="xl">
                    <Modal.Header closeButton>
                        <Modal.Title>
                            Products details for {customerForDetails.name}
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <ViewProducts customer={customerForDetails} />
                    </Modal.Body>
                    <Modal.Footer>
                        <button className="btn btn-secondary"
                            onClick={() => setProductShow(false)}>
                            Close
                        </button>
                    </Modal.Footer>
                </Modal>
            </CRow>
        )
    }

    const mouldModal = () => {
        return (
            <CRow>
                <Modal show={mouldShow} onHide={() => setMouldShow(false)} size="xl">
                    <Modal.Header closeButton>
                        <Modal.Title>
                            Mould details for {customerForDetails.name}
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <ViewMoulds customer={customerForDetails} />
                    </Modal.Body>
                    <Modal.Footer>
                        <button className="btn btn-secondary"
                            onClick={() => setMouldShow(false)}>
                            Close
                        </button>
                    </Modal.Footer>
                </Modal>
            </CRow>
        )
    }

    const componentModal = () => {
        return (
            <CRow>
                <Modal show={componentShow} onHide={() => setComponentShow(false)} size="xl">
                    <Modal.Header closeButton>
                        <Modal.Title>
                            Component details for {customerForDetails.name}
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <ViewComponents customer={customerForDetails} />
                    </Modal.Body>
                    <Modal.Footer>
                        <button className="btn btn-secondary"
                            onClick={() => setComponentShow(false)}>
                            Close
                        </button>
                    </Modal.Footer>
                </Modal>
            </CRow>
        )
    }

    return (
        <>
            <CRow>
                <CCol xs={12}>
                    <CCard className="mb-4">
                        <CCardHeader>
                            <strong>List of Customers</strong>
                        </CCardHeader>
                        <CCardBody>
                            {customers && customers.length ? listCustomers() : <>No Customers Found. <Link to="/customer/add">Add New Customers</Link></>}
                        </CCardBody>
                    </CCard>
                </CCol>
            </CRow>
            {
                customerForDetails.id ?
                    <>
                        {brandModal()}
                        {seasonModal()}
                        {collectionModal()}
                        {productModal()}
                        {mouldModal()}
                        {componentModal()}
                    </>
                    : <></>
            }
        </>
    )
}

export default ListCustomer;