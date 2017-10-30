import React, { Component } from 'react'
import { propTypes as reduxFormPropTypes, reduxForm, Field } from 'redux-form'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { createMuiTheme } from 'material-ui/styles'

import compose from 'recompose/compose'

import { Card, CardActions } from 'material-ui';
import Avatar from 'material-ui/Avatar';
import Button from 'material-ui/Button'
import TextField from 'material-ui/TextField';
import { LockIcon } from 'material-ui/Icon';



import {
  Router,
  Route,
  Link
} from 'react-router-dom'

import { userLogin as userLoginAction } from './actions'


const styles = {
  main: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    minWidth: 300,
  },
  avatar: {
    margin: '1em',
    textAlign: 'center ',
  },
  form: {
    padding: '0 1em 1em 1em',
  },
  input: {
    display: 'flex',
  },
  hint: {
    textAlign: 'center',
    marginTop: '1em',
    color: '#ccc',
  },
}

// see http://redux-form.com/6.4.3/examples/material-ui/
const renderInput = ({ meta: { touched, error } = {}, ...props }) =>
  <TextField
    helperText={touched && error}
    {...props}
    fullWidth
  />

class Login extends Component {

  static PropTypes = {
    ...reduxFormPropTypes,
    // theme: PropTypes.object.isRequired,
  }




  login = ({ username, password }) => {
    const { userLogin, location } = this.props;
    userLogin({ username, password }, location.state ? location.state.nextPathname : '/');
  }

  render() {
    const { handleSubmit, submitting, theme, translate } = this.props;
    const muiTheme = createMuiTheme()

    // return (<Card style={styles.card}></Card>)

    return (
      <MuiThemeProvider theme={muiTheme}>
        <div style={{ ...styles.main, backgroundColor: "#ccc" }}>
          <Card style={styles.card}>
            <div style={styles.avatar}>
              {/* <Avatar backgroundColor={"#fff"} icon={<LockIcon />} size={60} /> */}
            </div>
            <form onSubmit={handleSubmit(this.login)}>
              <div style={styles.form}>
                <div style={styles.input} >
                  <Field
                    name="username"
                    component={renderInput}
                    label={'username'}
                  />
                </div>
                <div style={styles.input}>
                  <Field
                    name="password"
                    component={renderInput}
                    label={'password'}
                    type="password"
                  />
                </div>
              </div>
              <CardActions>
                <Button type="submit" disabled={submitting} children={'Sign In'} />
              </CardActions>
            </form>
          </Card>
        </div>
      </MuiThemeProvider>
    );
  }
}

const enhance = compose(
  reduxForm({
    form: 'login',
    validate: (values, props) => {
      const errors = {}
      if (!values.username) errors.username = 'required'
      if (!values.password) errors.password = 'required'
      return errors
    }
  }),
  connect(null, { userLogin: userLoginAction }),
)

export default enhance(Login)

// enhance(Login)
