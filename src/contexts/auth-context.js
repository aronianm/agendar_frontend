import { createContext, useContext, useEffect, useReducer, useRef } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios'
import { toast } from 'react-toastify';

const HANDLERS = {
  INITIALIZE: 'INITIALIZE',
  SIGN_IN: 'SIGN_IN',
  SIGN_OUT: 'SIGN_OUT'
};

const initialState = {
  isAuthenticated: false,
  isLoading: true,
  user: null
};

const handlers = {
  [HANDLERS.INITIALIZE]: (state, action) => {
    const user = action.payload;

    return {
      ...state,
      ...(
        // if payload (user) is provided, then is authenticated
        user
          ? ({
            isAuthenticated: true,
            isLoading: false,
            user
          })
          : ({
            isLoading: false
          })
      )
    };
  },
  [HANDLERS.SIGN_IN]: (state, action) => {
    const user = action.payload;

    return {
      ...state,
      isAuthenticated: true,
      user
    };
  },
  [HANDLERS.SIGN_OUT]: (state) => {
    return {
      ...state,
      isAuthenticated: false,
      user: null
    };
  }
};

const reducer = (state, action) => (
  handlers[action.type] ? handlers[action.type](state, action) : state
);

// The role of this context is to propagate authentication state through the App tree.

export const AuthContext = createContext({ undefined });

export const AuthProvider = (props) => {
  const { children } = props;
  const [state, dispatch] = useReducer(reducer, initialState);
  const initialized = useRef(false);
  const API_URL = "http://localhost:3001"
  const initialize = async () => {
    // Prevent from calling twice in development mode with React.StrictMode enabled
    if (initialized.current) {
      return;
    }

    initialized.current = true;

    let isAuthenticated = false;

    try {
      isAuthenticated = window.sessionStorage.getItem('authenticated') === 'true';
      let user = {}
      if(isAuthenticated){
        const headers = {
          Authorization: `${sessionStorage['token']}`,
          'Content-Type': 'application/json',
        }
        
        await axios.get(`${API_URL}/api/v1/authenticate`, {headers}).then((response) => {
            dispatch({
              type: HANDLERS.INITIALIZE,
              payload: response.data.data
            });
            }).catch((error) => {
              isAuthenticated = false
              delete sessionStorage['token']
              delete sessionStorage['authenticated']
              dispatch({
                type: HANDLERS.INITIALIZE
              });
              
        })


      }else{
        dispatch({
          type: HANDLERS.INITIALIZE
        });
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(
    () => {
      initialize();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const signIn = async (email, password) => {
    const body = {
      user: {
        email,
        password
      }
    }
  
    await axios.post(`${API_URL}/login`, body).then((response) => {
      const {data} = response
      const user = data.status.data.user;
      sessionStorage['authenticated'] = true
      sessionStorage['token'] = response.headers.authorization
      dispatch({
        type: HANDLERS.SIGN_IN,
        payload: user,
        isAuthenticated: true
      });
    }).catch((error) => {

    })
  };

  const signUp = async ({email, fname, lname, password}) => {
    const body = {
      user: {
        email: email,
        fname: fname,
        lname: lname,
        password: password
      }
    }
    let user = {}
    let errorMessage = ""
    await axios.post(`${API_URL}/signup`, body).then((response) => {
        sessionStorage['token'] = response.headers.authorization
        sessionStorage['authenticated'] = true
        dispatch({
          type: HANDLERS.SIGN_IN,
          payload: response.data.data
        });
    }).catch((error) => {
      sessionStorage['errorMessage'] = error.response.data.status.message
    })

    if(user.id === undefined){
      toast.error(errorMessage)
    }
    
  };

  const signOut = () => {
    const body = {
      headers: {
        Authorization: `${sessionStorage['token']}`
      }
    }
    axios.delete(`${API_URL}/logout`, body).then((response) => {
      delete sessionStorage['token']
      delete sessionStorage['authenticated']
      dispatch({
        type: HANDLERS.SIGN_OUT,
        payload: response.data.data
      });
    }).catch((error) => {
      delete sessionStorage['token']
      delete sessionStorage['authenticated']
        sessionStorage['errorMessage'] = error.response.statusText
    })
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        signIn,
        signUp,
        signOut
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node
};

export const AuthConsumer = AuthContext.Consumer;

export const useAuthContext = () => useContext(AuthContext);
