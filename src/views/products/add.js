import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux"
import axios from 'axios';
import Swal from 'sweetalert2';
import 'sweetalert2/src/sweetalert2.scss';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip'
import Modal from 'react-bootstrap/Modal'
import WFDSFormComponent from './wfdsForm'

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

const AddProduct = (props) => {

    const [formName, setFormName] = useState(() => 'po')
    const wfitems = [
        { id: 'wf_ds', name: 'Design studio' },
        { id: 'wf_mould', name: 'Mould' },
        { id: 'wf_wax', name: 'Wax' },
        { id: 'wf_casting', name: 'Casting' },
        { id: 'wf_ws', name: 'WorkShop' },
        { id: 'wf_plating', name: 'Plating' },
        { id: 'wf_os', name: 'Outsource' },
        { id: 'wf_customer', name: 'Customer' }
    ]

    const { user } = useSelector(state => state.auth)
    const [customers, setCustomers] = useState(() => [])
    const [brands, setBrands] = useState(() => [])
    const [seasons, setSeasons] = useState(() => [])
    const [collections, setCollections] = useState(() => [])
    const [productTypes, setProductTypes] = useState(() => [])
    const [metals, setMetals] = useState(() => [])
    const [waxGroupsNumbers, setWaxGroupsNumbers] = useState([{
        wax_weight: 0,
        wax_image: '',
        wax_metal: '',
        metal_weight: 0
    }])

    const [prodMoulds, setProdMoulds] = useState([{
        'is_exists': false,
        'source': '',
        'image': '',
        'id': '',
        'name': '',
        'do_store': ''
    }])

    const [isLoaded, setIsLoaded] = useState(() => false)
    const [validated, setValidated] = useState(false)

    const [formData, updateFormData] = useState({
        'created_by': user.id,
        'customer_id': '',
        'waxCount': 0,
        'mouldCount': 0,
        'components': [],
        'moulds': [],
        'findings': [],
        'workflow': [{
            'pre_production': ''
        }]
    });

    const [workFlowItems, setWorkFlowItems] = useState(() => [])
    const [wfForm, setWFForm] = useState(() => [])


    // for workflow.
    // design Studio items. 
    const [dsItems, setDSItems] = useState(() => [])
    const [ds3ditems, setds3ditems] = useState(() => [])
    const [dscaditems, setdscaditems] = useState(() => [])

    const addDSItemsToWF = async () => {
        let a = workFlowItems;
        if (ds3ditems.is_checked) { dsItems.push(ds3ditems) }
        if (dscaditems.is_checked) { dsItems.push(dscaditems) }
        a.push({ 'name': 'Studio Design', 'items': dsItems })
        setWorkFlowItems(a)
        setDSItems(() => [])
        a = [];

        updateFormData({
            ...formData,
            ['workflow']: workFlowItems
        });

        setds3ditems([])
        setdscaditems([])

        setShowWFDS(false)
        setWFSelectionModal(false)
    }

    const goto = (page) => {
        setFormName(page)
    }

    const getCustomers = async () => {
        let api = `${process.env.REACT_APP_API_URL}/v1/customers/list`
        setCustomers(await (await axios.get(api)).data.data)
        setIsLoaded(true)
    }

    const getBrands = async () => {
        let api = `${process.env.REACT_APP_API_URL}/v1/customers/${formData.customer_id}/brands`
        setBrands(await (await axios.get(api)).data.data)
    }

    const getSeasons = async () => {
        let api = `${process.env.REACT_APP_API_URL}/v1/customers/${formData.customer_id}/seasons`
        setSeasons(await (await axios.get(api)).data.data)
    }

    const getCollections = async () => {
        let api = `${process.env.REACT_APP_API_URL}/v1/customers/${formData.customer_id}/collections`
        setCollections(await (await axios.get(api)).data.data)
    }

    useEffect(() => {
        getCustomers()
    }, [isLoaded])

    useEffect(() => {
        getBrands()
        getSeasons()
        getCollections()
    }, [formData.customer_id])

    const handleChange = (e) => {
        updateFormData({
            ...formData,
            [e.target.name]: e.target.value.trim()
        });
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const form = event.currentTarget;

        console.log("form is ", form.checkValidity())

        if (form.checkValidity() === false) {
            event.preventDefault()
            event.stopPropagation()
        }
        setValidated(true)
        console.log(formData)

        // proceed.

        if (form.checkValidity() === true) {
            switch (formName) {
                case 'po': setFormName('wf'); break;
                case 'wf': break;
                default: break;
            }
        }
    }

    const handleMouldChanges = (i, e) => {
        let a = prodMoulds[i];
        if (e.target.name === 'is_exists' || e.target.name === 'do_store') {
            a[e.target.name] = e.target.checked
        } else {
            a[e.target.name] = e.target.value.trim()
        }

        setProdMoulds[i] = a
        updateFormData({
            ...formData,
            ['mouldCount']: a.length,
            ['moulds']: prodMoulds
        });
    }

    const [wfSelectionModal, setWFSelectionModal] = useState(false)
    const [showWFDS, setShowWFDS] = useState(false)

    const openModal = () => {
        setWFSelectionModal(true)
    }

    const selectWF = (event) => {
        setShowWFDS(false)
        switch (event.target.value) {
            case 'wf_ds': {
                setShowWFDS(true)
                break;
            }
        }
    }

    const wfdsForm = () => {
        return <WFDSFormComponent
            SETDS3DITEMS_C={setds3ditems}
            SETDSCADITEMS_C={setdscaditems} />
    }

    const WFSelectionModalContent = () => {
        return (
            <CRow>
                <Modal show={wfSelectionModal}
                    onHide={() => setWFSelectionModal(false)} size="xl">
                    <Modal.Header closeButton>
                        <Modal.Title>
                            Select Workflow
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <CRow className="mb-4">
                            <div style={{ margin: 'auto' }} className="col-sm-6">
                                <CFormSelect className="form-control" onChange={(e) => selectWF(e)}>
                                    <option value="">Select</option>
                                    {
                                        wfitems.map((item, index) => (
                                            <option key={index} value={item.id}>
                                                {item.name}
                                            </option>
                                        ))
                                    }
                                </CFormSelect>
                            </div>
                        </CRow>
                        {(showWFDS) ? wfdsForm() : <></>}
                    </Modal.Body>
                    <Modal.Footer>
                        {
                            (showWFDS) ?
                                <button onClick={addDSItemsToWF} className="btn btn-primary">
                                    Add to WorkFlow
                                </button>
                                : <></>
                        }
                    </Modal.Footer>
                </Modal>
            </CRow>
        )
    }

    const handleWaxChanges = (i, e) => {
        let a = waxGroupsNumbers[i];
        a[e.target.name] = e.target.value.trim()
        waxGroupsNumbers[i] = a
        updateFormData({
            ...formData,
            ['waxCount']: a.length,
            ['wax']: waxGroupsNumbers
        });
    }

    const addNewWax = () => {
        let a = waxGroupsNumbers;
        a.push({
            wax_weight: 0,
            wax_image: '',
            wax_metal: '',
            metal_weight: 0
        })
        setWaxGroupsNumbers(a)
        updateFormData({
            ...formData,
            ['waxCount']: a.length
        });
    }

    const removeWax = (i) => {
        let a = waxGroupsNumbers;
        a.splice(i, 1)
        setWaxGroupsNumbers(a)
        updateFormData({
            ...formData,
            ['waxCount']: a.length
        });
    }

    const addNewMould = () => {
        let a = prodMoulds;
        a.push({
            'is_exists': false,
            'source': '',
            'image': '',
            'id': '',
            'name': '',
            'do_store': ''
        })
        setProdMoulds(a)
        updateFormData({
            ...formData,
            ['mouldCount']: a.length
        });
    }

    const waxGroups = () => {
        return (
            <>
                {
                    waxGroupsNumbers.map((w, i) => (
                        <CRow className='mb-3' key={i}>
                            <div className="col-sm-1 text-right">
                                {
                                    (i === 0) ?
                                        <CFormLabel className="col-form-label">
                                            WAX
                                        </CFormLabel>
                                        : <></>
                                }

                            </div>
                            <div className="col-sm-3">
                                <CFormInput
                                    type="text"
                                    name="wax_weight"
                                    value={w.wax_weight}
                                    onChange={(e) => handleWaxChanges(i, e)}
                                    className="form-control"
                                    placeholder={`Weight of the WAX ( Enter in grams )`}
                                />
                            </div>
                            <div className="col-sm-3">
                                <input type="file"
                                    onChange={(e) => handleWaxChanges(i, e)}
                                    name="wax_image" />
                            </div>
                            <div className="col-sm-2">
                                <CFormSelect
                                    onChange={(e) => handleWaxChanges(i, e)}
                                    name="wax_metal"
                                >
                                    <option value="">Metals</option>
                                    {
                                        metals.map(c => (
                                            <option key={c.id} value={c.id}>
                                                {`${c.name}`}
                                            </option>
                                        ))
                                    }
                                </CFormSelect>
                            </div>
                            <div className="col-sm-2">
                                <CFormInput
                                    type="text"
                                    name="metal_weight"
                                    onChange={(e) => handleWaxChanges(i, e)}
                                    value=""
                                    className="form-control"
                                    placeholder={`Estimated Metail Weight`}
                                />
                            </div>
                            {
                                (i === (waxGroupsNumbers.length - 1) && (waxGroupsNumbers.length < 5)) ?
                                    <div className="col-sm-1">
                                        <button type="button"
                                            onClick={addNewWax}
                                            title="Add more Wax" className="btn btn-primary">+</button>
                                    </div>
                                    :
                                    <div className="col-sm-1">
                                        {/* <button type="button"
                                            onClick={() => removeWax(i)}
                                            title="Remove this Wax" className="btn btn-secondary">-</button> */}
                                    </div>
                            }
                        </CRow>
                    ))
                }

            </>
        )
    }

    const moulds = () => {
        return (
            <>
                <hr />
                <CRow>
                    <div className="col-sm-5">
                        <CFormLabel
                            className="col-form-label">
                            <h6>Mould Details</h6>
                        </CFormLabel>
                    </div>
                </CRow>
                {
                    prodMoulds.map((m, i) => (
                        <div key={i}>
                            <CRow className="mb-3">
                                <div className="col-sm-2 text-right">
                                    <CFormLabel
                                        className="col-form-label">
                                        <strong>{i + 1}</strong>. Mould Already Exists ?
                                    </CFormLabel>
                                </div>
                                <div className="col-sm-1">
                                    <input
                                        type="checkbox"
                                        name="is_exists"
                                        onChange={(e) => handleMouldChanges(i, e)}
                                        style={{ marginTop: '13px' }}
                                    />
                                </div>
                                <div className="col-sm-2 text-right">
                                    <CFormLabel
                                        className="col-form-label">
                                        Mould Source
                                    </CFormLabel>
                                </div>
                                <div className="col-sm-2 text-right">
                                    <CFormSelect
                                        onChange={(e) => handleMouldChanges(i, e)}
                                        name="source"
                                    >
                                        <option value="">Select Source</option>
                                        <option value="">Source One</option>
                                    </CFormSelect>
                                </div>
                                <div className="col-sm-2 text-right">
                                    <CFormLabel
                                        className="col-form-label">
                                        Mould Image
                                    </CFormLabel>
                                </div>
                                <div className="col-sm-3">
                                    <input type="file"
                                        onChange={(e) => handleMouldChanges(i, e)}
                                        name="image" />
                                </div>
                            </CRow>
                            <CRow className="mb-3">
                                <div className="col-sm-1 text-right">
                                    <CFormLabel
                                        className="col-form-label">
                                        Mould Id
                                    </CFormLabel>
                                </div>
                                <div className="col-sm-2 text-right">
                                    <CFormInput
                                        type="text"
                                        name="id"
                                        onChange={(e) => handleMouldChanges(i, e)}
                                        className="form-control"
                                        placeholder={`Mould Id`}
                                    />
                                </div>
                                <div className="col-sm-2 text-right">
                                    <CFormLabel
                                        className="col-form-label">
                                        Mould Name
                                    </CFormLabel>
                                </div>
                                <div className="col-sm-2 text-right">
                                    <CFormInput
                                        type="text"
                                        name="name"
                                        onChange={(e) => handleMouldChanges(i, e)}
                                        className="form-control"
                                        placeholder={`Mould Name`}
                                    />
                                </div>
                                <div className="col-sm-2 text-right">
                                    <CFormLabel
                                        className="col-form-label">
                                        Store Mould ?
                                    </CFormLabel>
                                </div>

                                <div className="col-sm-1">
                                    <input
                                        type="checkbox"
                                        name='do_store'
                                        onChange={(e) => handleMouldChanges(i, e)}
                                        style={{ marginTop: '13px' }}
                                    />
                                </div>
                                {
                                    (i === (prodMoulds.length - 1) && (prodMoulds.length < 5)) ?
                                        <div className="col-sm-1">
                                            <button type="button"
                                                onClick={addNewMould}
                                                title="Add New Mould" className="btn btn-primary">+</button>
                                        </div>
                                        :
                                        <div className="col-sm-1">
                                            {/* <button type="button"
                                            onClick={() => removeWax(i)}
                                            title="Remove this Wax" className="btn btn-secondary">-</button> */}
                                        </div>
                                }
                            </CRow>
                            <hr />
                        </div>
                    ))
                }
            </>
        )
    }

    const handleWFUpdate = (i, event) => {

    }

    const workflow = () => {
        return (
            <>
                <CCard className="mb-4">
                    <CCardHeader>
                        <strong>Workflow</strong>
                    </CCardHeader>
                    <CCardBody>
                        <CRow className="mb-4">
                            <div className="col-sm-2 text-right">
                                <CFormLabel htmlFor="pre_production"
                                    className="col-form-label">
                                    Pre Production
                                </CFormLabel>
                            </div>
                            <div className="col-sm-9">
                                <textarea className="form-control" required
                                    placeholder="Pre Production Notes. Enter details only if opted for pre production"
                                    name="pre_production" id="pre_production"
                                    onChange={handleChange}
                                    rows="1"></textarea>
                            </div>
                        </CRow>
                        <hr />
                        <CRow className="mb-4">
                            {
                                workFlowItems.map((f, i) => (
                                    (f.name === 'Studio Design') ?
                                        <>
                                            <CRow key={i} className="mb-3">
                                                <div className="col-sm-1 text-right">
                                                    <CFormLabel className="col-form-label">
                                                        {i + 1}
                                                    </CFormLabel>
                                                </div>
                                                <div className="col-sm-2">
                                                    <CFormLabel className="col-form-label">
                                                        {f.name}
                                                    </CFormLabel>
                                                </div>
                                            </CRow>
                                            {
                                                f.items.map((item, index) => (
                                                    <>
                                                        <CRow className="mb-3">
                                                            <div className="col-sm-3">&nbsp;</div>
                                                            <div className="col-sm-2">
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
                                                                    onChange={(e) => handleWFUpdate(i, e)}
                                                                />
                                                            </div>
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
                                                                    onChange={(e) => handleWFUpdate(i, e)}
                                                                />
                                                            </div>
                                                        </CRow>
                                                    </>
                                                ))
                                            }

                                        </>
                                        : <></>
                                ))
                            }
                        </CRow>
                        <CRow>
                            <div className="mb-4">
                                <OverlayTrigger
                                    placement="top"
                                    overlay={
                                        <Tooltip id="button-tooltip-2">
                                            Collections data
                                        </Tooltip>
                                    }
                                >
                                    <button className="btn btn-secondary"
                                        onClick={() => openModal()}
                                    >
                                        Add WorkFlow
                                    </button>
                                </OverlayTrigger>
                            </div>
                        </CRow>
                    </CCardBody>
                </CCard>
            </>
        )
    }

    const productOverview = () => {
        return (
            <>
                <CCard className="mb-4">
                    <CCardHeader>
                        <strong>Product Overview</strong>
                    </CCardHeader>
                    <CCardBody>
                        <CRow className="mb-4">
                            <div className="col-sm-2 text-right">
                                <CFormLabel htmlFor="product_name"
                                    className="col-form-label">
                                    Product Name
                                </CFormLabel>
                            </div>
                            <div className="col-sm-4">
                                <CFormInput
                                    type="text" required
                                    name="product_name"
                                    value={formData.product_name}
                                    onChange={handleChange}
                                    className="form-control" id="product_name"
                                    placeholder={`Enter Product Name`}
                                />
                            </div>
                            <div className="col-sm-2 text-right">
                                <CFormLabel htmlFor="product_sku"
                                    className="col-form-label">
                                    SKU/Reference No.
                                </CFormLabel>
                            </div>
                            <div className="col-sm-3">
                                <CFormInput
                                    type="text" required
                                    name="product_sku"
                                    value={formData.product_sku}
                                    onChange={handleChange}
                                    className="form-control" id="product_sku"
                                    placeholder={`Enter Product SKU`}
                                />
                            </div>
                        </CRow>
                        <CRow className="mb-4">
                            <div className="col-sm-2 text-right">
                                <CFormLabel htmlFor="product_brand"
                                    className="col-form-label">
                                    Brand
                                </CFormLabel>
                            </div>
                            <div className="col-sm-3">
                                <CFormSelect
                                    onChange={handleChange}
                                    value={formData.product_brand}
                                    id="product_brand" name="product_brand"
                                >
                                    <option value="">Select</option>
                                    {
                                        brands.map(c => (
                                            <option key={c.id} value={c.id}>
                                                {`${c.brand_name}`}
                                            </option>
                                        ))
                                    }
                                </CFormSelect>
                            </div>
                            <div className="col-sm-1 text-right">
                                <CFormLabel htmlFor="product_season"
                                    className="col-form-label">
                                    Season
                                </CFormLabel>
                            </div>
                            <div className="col-sm-2">
                                <CFormSelect
                                    onChange={handleChange}
                                    value={formData.product_season}
                                    id="product_season" name="product_season"
                                >
                                    <option value="">Select</option>
                                    {
                                        seasons.map(c => (
                                            <option key={c.id} value={c.id}>
                                                {`${c.name}`}
                                            </option>
                                        ))
                                    }
                                </CFormSelect>
                            </div>
                            <div className="col-sm-1 text-right">
                                <CFormLabel htmlFor="product_collection"
                                    className="col-form-label">
                                    Collections
                                </CFormLabel>
                            </div>
                            <div className="col-sm-2">
                                <CFormSelect
                                    onChange={handleChange}
                                    value={formData.product_collection}
                                    id="product_collection" name="product_collection"
                                >
                                    <option value="">Select</option>
                                    {
                                        collections.map(c => (
                                            <option key={c.id} value={c.id}>
                                                {`${c.name}`}
                                            </option>
                                        ))
                                    }
                                </CFormSelect>
                            </div>
                        </CRow>
                        <CRow className="mb-3">
                            <div className="col-sm-2 text-right">
                                <CFormLabel htmlFor="product_image"
                                    className="col-form-label">
                                    Product Image
                                </CFormLabel>
                            </div>
                            <div className="col-sm-3">
                                <input type="file"
                                    onChange={handleChange}
                                    value={formData.product_image}
                                    name="product_image" id="product_image" />

                            </div>
                            <div className="col-sm-1 text-right">
                                <CFormLabel htmlFor="product_type"
                                    className="col-form-label">
                                    Product Type
                                </CFormLabel>
                            </div>
                            <div className="col-sm-2">
                                <CFormSelect
                                    onChange={handleChange}
                                    value={formData.product_type}
                                    id="product_type" name="product_type"
                                >
                                    <option value="">Select Product Type</option>
                                    {
                                        productTypes.map(c => (
                                            <option key={c.id} value={c.id}>
                                                {`${c.name}`}
                                            </option>
                                        ))
                                    }
                                </CFormSelect>
                            </div>
                            <div className="col-sm-3">
                                <CFormInput
                                    type="text"
                                    name="product_type_new"
                                    value={formData.product_type_new}
                                    onChange={handleChange}
                                    className="form-control" id="product_type_new"
                                    placeholder={`Or Add New Type`}
                                />
                            </div>
                        </CRow>
                        <CRow className="mb-3">
                            <div className="col-sm-2 text-right">
                                <CFormLabel htmlFor="product_desc"
                                    className="col-form-label">
                                    Description
                                </CFormLabel>
                            </div>
                            <div className="col-sm-9">
                                <textarea className="form-control"
                                    value={formData.product_desc}
                                    placeholder="Product Description"
                                    name="product_desc" id="product_desc"
                                    onChange={handleChange}
                                    rows="3"></textarea>
                            </div>
                        </CRow>
                        <hr />
                        {waxGroups()}
                        {moulds()}
                    </CCardBody>
                </CCard>
            </>
        )
    }

    return (
        <>
            <CForm
                // encType="multipart/form-data"
                className="row g-3 needs-validation"
                noValidate
                validated={validated}
                onSubmit={(e) => handleSubmit(e)}
            >
                <CRow>
                    <CCol xs={12}>
                        <CCard className="mb-4">
                            <CCardHeader>
                                <strong>Add New Product</strong>
                            </CCardHeader>
                            <CCardBody>
                                <CRow className="mb-3">
                                    <div className="col-sm-2 text-right">
                                        <CFormLabel htmlFor="customer_id"
                                            className="col-form-label">
                                            Select Customer
                                        </CFormLabel>
                                    </div>
                                    <div className="col-sm-4">
                                        <CFormSelect required
                                            onChange={handleChange}
                                            id="customer_id" name="customer_id"
                                        >
                                            <option value="">Select</option>
                                            {
                                                customers.map(c => (
                                                    <option key={c.id} value={c.id}>
                                                        {`${c.name} - ${c.customer_id} - (${c.customer_type})`}
                                                    </option>
                                                ))
                                            }
                                        </CFormSelect>
                                    </div>
                                </CRow>
                                <hr />
                                {
                                    (formData.customer_id !== '' && formName == 'po') ?
                                        productOverview()
                                        :
                                        <></>
                                }
                                {
                                    (formData.customer_id !== '' && formName == 'wf') ?
                                        workflow()
                                        :
                                        <></>
                                }
                                {WFSelectionModalContent()}
                                <CRow className="mb-3">

                                    {
                                        (formData.customer_id !== '' && formName == 'po') ?
                                            <>
                                                <div className="col-sm-10"></div>
                                                <div className="col-sm-2 text-right">
                                                    <button type="submit" className="btn btn-primary">
                                                        Product WorkFlow
                                                    </button>
                                                </div></>
                                            :
                                            <></>
                                    }
                                    {
                                        (formData.customer_id !== '' && formName == 'wf') ?
                                            <>
                                                <div className="col-sm-9"></div>
                                                <div className="col-sm-2 text-right">
                                                    <button type="button"
                                                        onClick={() => goto('po')}
                                                        className="btn btn-primary">
                                                        Product Overview
                                                    </button>
                                                </div>
                                                <div className="col-sm-1 text-right">
                                                    <button type="submit"
                                                        className="btn btn-primary">
                                                        Save Info
                                                    </button>
                                                </div>
                                            </>
                                            :
                                            <></>
                                    }
                                </CRow>
                            </CCardBody>
                        </CCard>
                    </CCol>
                </CRow>
            </CForm>
        </>
    )
}

export default AddProduct;
