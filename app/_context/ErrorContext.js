import {createContext, useContext, useState} from 'react';
const ErrorContext = createContext({});

function ErrorContextProvider({children}) {
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  return (
    <ErrorContext.Provider
      value={{error, setError, errorMsg, setErrorMsg}}>
      {children}
    </ErrorContext.Provider>
  );
}

function useErrorContext() {
  const context = useContext(ErrorContext);
  if (!context) {
    throw new Error('useErrorContext must be used within an ErrorContextProvider');
  }
  return context;
}

export {useErrorContext, ErrorContextProvider};