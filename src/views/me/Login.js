import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import {
  CButton, CCard, CCardBody, CCardGroup, CCol,
  CContainer, CForm, CFormInput, CInputGroup,
  CInputGroupText, CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import actions from '../../constants/actionTypes'
import Swal from 'sweetalert2'
import 'sweetalert2/src/sweetalert2.scss'


const Login = () => {

  const dispatch = useDispatch();
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, showErrorMessage] = useState(false);
  const { isLoggedIn } = useSelector(state => state.auth);

  if (isLoggedIn) {
    // history.push('/dashboard')
  }

  const onChangeEvent = (e, type) => {
    showErrorMessage(false)
    e.preventDefault();
    if (type === 'userName') setUserName(e.target.value); else setPassword(e.target.value);
  }

  const signIn = async (e) => {
    e.preventDefault();
    let payLoad = {
      u: userName,
      p: password
    }
    let response = await axios.post(`${process.env.REACT_APP_API_URL}/v1/auth/login`, payLoad)
    let user = response.data.data[0];
    console.log(user)
    if (user) {
      localStorage.setItem("user", JSON.stringify(user))
      dispatch({
        type: actions.LOGIN_SUCCESS,
        payload: { user: user }
      });
    } else {
      showErrorMessage(true);
      setUserName('');
      setPassword('');
      Swal.fire({
        icon: 'error',
        title: 'Login Failed',
        text: 'Invalid Username or Password!',
        footer: 'Try with different credientials'
      })
      dispatch({
        type: actions.LOGIN_FAILED,
      });
    }
  }

  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={8}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm>
                    <h1>Login</h1>
                    <p className="text-medium-emphasis">Sign In to your account</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput
                        placeholder="Enter Username"
                        autoComplete="username"
                        value={userName}
                        onChange={(e) => onChangeEvent(e, 'userName')}
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        type="password"
                        placeholder="Enter Password"
                        autoComplete="current-password"
                        onChange={(e) => onChangeEvent(e, 'password')}
                      />
                    </CInputGroup>
                    <CRow>
                      <CCol xs={6}>
                        <CButton color="primary" className="px-4"
                          onClick={(e) => signIn(e)}
                        >
                          Login
                        </CButton>
                      </CCol>
                      <CCol xs={6} className="text-right">
                        <CButton color="link" className="px-0">
                          Forgot password?
                        </CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
              <CCard className="text-white bg-primary py-5" style={{ width: '44%' }}>
                <CCardBody className="text-center">
                  <div>
                    <h2>Sign up</h2>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                      tempor incididunt ut labore et dolore magna aliqua.
                    </p>
                    <Link to="/register">
                      <CButton color="primary" className="mt-3" active tabIndex={-1}>
                        Register Now!
                      </CButton>
                    </Link>
                  </div>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login
