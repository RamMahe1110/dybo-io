import React, { Component } from 'react'
import { primaryColors } from '../colorUtility'
import axios from 'axios'
import validator from 'validator'
import OutsideClickHandler from 'react-outside-click-handler'
import Loader from 'react-loader-spinner'
import close from '../assets/close.png'
import FormField from '../components/FormField'

const createUserUrl = 'http://13.235.55.43/test/api/create_user'

class RegisterPage extends Component {
  state = {
    currPlaceColor: null,

    formData: {
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
      linkedinUrl: '',
    },

    formErrors: {
      firstNameErr: '',
      lastNameErr: '',
      emailErr: '',
      phoneNumberErr: '',
      linkedinUrlErr: '',
    },
    loader: false,
    upperMsg: false,
    userInfo: null,
  }

  componentDidMount() {
    const currPlace = this.props.match.params.place

    if (primaryColors[currPlace]) {
      this.setState({
        currPlaceColor: primaryColors[currPlace],
      })
    } else {
      this.setState({
        currPlaceColor: 'red',
      })
    }
  }

  validateForm = () => {
    const {
      firstName,
      lastName,
      email,
      phoneNumber,
      linkedinUrl,
    } = this.state.formData

    const formErrors = { ...this.state.formErrors }

    let isValid = true

    // First Name Validation
    if (!firstName.length) {
      isValid = false
      formErrors.firstNameErr = 'First name is required'
    } else {
      formErrors.firstNameErr = ''
    }

    // Last Name Validation
    if (!lastName.length) {
      isValid = false
      formErrors.lastNameErr = 'Last name is required'
    } else {
      formErrors.lastNameErr = ''
    }

    // Email  Validation
    if (!email.length || !validator.isEmail(email)) {
      isValid = false
      if (!email.length) {
        formErrors.emailErr = 'Email is required'
      } else {
        formErrors.emailErr = 'Email is invalid'
      }
    } else {
      formErrors.emailErr = ''
    }

    // Phone Number Validation
    if (
      !phoneNumber.length ||
      !(validator.isNumeric(phoneNumber) && phoneNumber.length === 10)
    ) {
      isValid = false
      if (!phoneNumber.length) {
        formErrors.phoneNumberErr = 'Phone Number is required'
      } else {
        if (!validator.isNumeric(phoneNumber)) {
          formErrors.phoneNumberErr = 'Phone Number should only contain digits'
        } else {
          formErrors.phoneNumberErr = 'Phone Number should be 10 digits long'
        }
      }
    } else {
      formErrors.phoneNumberErr = ''
    }

    // Linkedin URL Validation
    if (
      !linkedinUrl.length ||
      !validator.isURL(linkedinUrl, {
        protocols: ['https'],
        require_protocol: true,
      })
    ) {
      isValid = false
      if (!linkedinUrl.length) {
        formErrors.linkedinUrlErr = 'Linkedin Profile URL is required'
      } else {
        formErrors.linkedinUrlErr = 'URL is invalid'
      }
    } else {
      formErrors.linkedinUrlErr = ''
    }

    this.setState({
      formErrors,
    })

    return isValid
  }

  onFormInputChange = (e) => {
    const { name, value } = e.target
    const formData = { ...this.state.formData }
    formData[name] = value
    this.setState({
      formData,
    })
  }

  onFormSubmit = (e) => {
    e.preventDefault()
    const {
      firstName,
      lastName,
      email,
      phoneNumber,
      linkedinUrl,
    } = this.state.formData

    if (this.validateForm()) {
      this.setState({
        loader: true,
      })
      axios
        .post(createUserUrl, {
          first_name: firstName,
          last_name: lastName,
          email: email,
          phone: phoneNumber,
          linkedInProfile: linkedinUrl,
        })
        .then((res) => {
          this.setState({
            userInfo: res.data,
            loader: false,
            upperMsg: true,
            formData: {
              firstName: '',
              lastName: '',
              email: '',
              phoneNumber: '',
              linkedinUrl: '',
            },
          })
          setTimeout(() => {
            this.setState({
              upperMsg: false,
            })
          }, 5000)
        })
        .catch((err) => {
          alert('Error! Something Went Wrong')
        })
    }
  }

  render() {
    const {
      currPlaceColor,
      formErrors,
      formData,
      userInfo,
      loader,
      upperMsg,
    } = this.state

    if (currPlaceColor === null) {
      return <div className="loader">Loading</div>
    }

    return (
      <div
        className="register-page"
        style={{ backgroundColor: currPlaceColor }}
      >
        <div className="register-form-content">
          <form onSubmit={this.onFormSubmit} className="register-form">
            <FormField
              onChange={this.onFormInputChange}
              currPlaceColor={currPlaceColor}
              name={'firstName'}
              placeholder={'First Name'}
              value={formData.firstName}
              err={formErrors.firstNameErr}
            />

            <FormField
              onChange={this.onFormInputChange}
              currPlaceColor={currPlaceColor}
              name={'lastName'}
              placeholder={'Last Name'}
              value={formData.lastName}
              err={formErrors.lastNameErr}
            />

            <FormField
              onChange={this.onFormInputChange}
              currPlaceColor={currPlaceColor}
              name={'email'}
              placeholder={'Email'}
              value={formData.email}
              err={formErrors.emailErr}
            />
            <FormField
              onChange={this.onFormInputChange}
              currPlaceColor={currPlaceColor}
              name={'phoneNumber'}
              placeholder={'Phone Number'}
              value={formData.phoneNumber}
              err={formErrors.phoneNumberErr}
            />
            <FormField
              onChange={this.onFormInputChange}
              currPlaceColor={currPlaceColor}
              name={'linkedinUrl'}
              placeholder={'Linkedin Profile URL'}
              value={formData.linkedinUrl}
              err={formErrors.linkedinUrlErr}
            />

            <button
              style={{
                border: `1px solid ${currPlaceColor}`,
                color: `${currPlaceColor}`,
              }}
              type="submit"
              className="submit-btn"
            >
              {loader ? (
                <Loader
                  className="loader"
                  type="Oval"
                  color={currPlaceColor}
                  height={25}
                  width={25}
                />
              ) : null}
              <span className={`${loader ? 'hide' : ''}`}>Submit</span>
            </button>
          </form>
        </div>
        {userInfo ? (
          <div className="success-content">
            <OutsideClickHandler
              onOutsideClick={() => {
                this.setState({
                  userInfo: null,
                  upperMsg: false,
                })
              }}
            >
              <div className="user-info-card">
                <div className="top">
                  <div className="user-img-cont">
                    <img
                      src={userInfo.data.picture}
                      alt="UserImage"
                      className="user-image"
                    />
                  </div>
                  <div className="status">
                    <span className="text">{userInfo.STATUS}</span>
                  </div>
                </div>
                <h2 className="user-name">
                  {userInfo.data.first_name} {userInfo.data.last_name}
                </h2>
                <h4 className="user-mail">{userInfo.data.email}</h4>
                <span
                  className="close"
                  onClick={() => {
                    this.setState({
                      userInfo: null,
                      upperMsg: false,
                    })
                  }}
                >
                  <img src={close} alt="close" />
                </span>
              </div>
            </OutsideClickHandler>
          </div>
        ) : null}
        {upperMsg ? (
          <div className="upper-msg">
            <span className="text">
              Successfully {userInfo.STATUS} the user{' '}
            </span>
          </div>
        ) : null}
      </div>
    )
  }
}

export default RegisterPage
