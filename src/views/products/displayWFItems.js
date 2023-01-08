import React, { useEffect } from 'react'
import useState from 'react-usestateref'

import DisplaySD from './displaySD'
import DisplayMould from './displayMould'
import DisplayWax from './displayWax'

const DisplayWorkFlowItems = ({
  wfData, incr, handleWFUpdate
}) => {
  console.log("WFDATA", wfData)
  return (
    <>
      {

        (wfData.name === 'Studio Design') ?
          <DisplaySD incr={incr} data={wfData} handleWFUpdate={handleWFUpdate} />
          :
          (wfData.name === 'Mould') ?
            <DisplayMould incr={incr} data={wfData} handleWFUpdate={handleWFUpdate} />
            :
            (wfData.name === 'Wax') ?
              <DisplayWax incr={incr} data={wfData} handleWFUpdate={handleWFUpdate} />
              :
              <></>
      }
    </>
  )
}

export default DisplayWorkFlowItems
