import React, { useState, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'

const Togglable = React.forwardRef((props, ref) => {
  const [show, setShow] = useState(false)

  const toggleShow = () => setShow(!show)

  useImperativeHandle(ref, () => {
    return { toggleShow }
  })

  return (
    <>
      <button className='togglableButton' onClick={toggleShow}>{!show ? props.textShow : props.textHide }</button>
      {show && props.children}
    </>
  )
})

Togglable.propTypes = {
  textShow: PropTypes.string.isRequired,
  textHide: PropTypes.string.isRequired
}

Togglable.displayName = 'Togglable'

export default Togglable
