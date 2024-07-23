"use client"
import React, { createContext, useContext, useEffect, useState } from 'react';

const SessionContext = createContext();

export const useSession = () => useContext(SessionContext);

export const SessionProvider = ({ children }) => {
  const [session, setSession] = useState(null);

  const fetchSession = async () => {
    try {
      const res = await fetch('/api/auth/session', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (res.ok) {
        const sessionData = await res.json();
        setSession(sessionData);
      } else {
        setSession(null);
      }
    } catch (error) {
      console.error('Error fetching session data:', error);
      setSession(null);
    }
  };

  useEffect(() => {
    fetchSession();
  }, []);

  return (
    <SessionContext.Provider value={session}>
      {children}
    </SessionContext.Provider>
  );
};
