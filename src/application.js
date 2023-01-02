import React, { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Spinner from './shared/Spinner'


// Containers
const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'))

// Pages
const Login = React.lazy(() => import('./views/me/Login'))
// const Register = React.lazy(() => import('./views/pages/register/Register'))
const Page404 = React.lazy(() => import('./views/common/Page404'))
const Page500 = React.lazy(() => import('./views/common/Page500'))

const JCComponents = (props) => {
    const [state, setState] = useState(props)
    const { isLoggedIn } = useSelector((state) => state.auth)
    return (
        <>
            {
                (!isLoggedIn) ?
                    <Login />
                    :
                    <Routes>
                        <Route exact path="/login" name="Login Page" element={<Login />} />
                        <Route exact path="/404" name="Page 404" element={<Page404 />} />
                        <Route exact path="/500" name="Page 500" element={<Page500 />} />
                        <Route path="*" name="Home" element={<DefaultLayout />} />
                    </Routes>
            }
        </>
    )
}

export default JCComponents;
