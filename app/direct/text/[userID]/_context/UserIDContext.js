import {createContext, useContext} from 'react';
const userIDContext = createContext({});
function UserIdProvider({children, id, messagesRef, chatID}) {
  return (
    <userIDContext.Provider value={{userID: id, messagesRef, chatID}}>
      {children}
    </userIDContext.Provider>
  );
}
function useUserIDContext() {
  const context = useContext(userIDContext);
  if (!context) return;
  return context;
}

export {UserIdProvider, useUserIDContext};
