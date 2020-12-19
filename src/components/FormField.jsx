import React, { Component } from 'react'

class FormField extends Component {
  state = {}
  render() {
    const {
      onChange,
      currPlaceColor,
      name,
      value,
      placeholder,
      err,
    } = this.props
    return (
      <div className="form-field">
        <input
          onChange={onChange}
          style={{
            backgroundColor: `${
              currPlaceColor === 'red' ? 'rgba(255,0,0,0.1)' : currPlaceColor + '33'
            }`,
          }}
          placeholder={placeholder}
          className="form-input"
          name={name}
          value={value}
        />
        {err.length ? <span className="err-msg">{err}</span> : null}
      </div>
    )
  }
}

export default FormField
