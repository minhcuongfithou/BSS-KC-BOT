'use client';

import { UserContext } from './UserContext';

export default function UserProvider({ session, children }) {
  return (
    <UserContext.Provider value={session}>
      {children}
    </UserContext.Provider>
  );
}
