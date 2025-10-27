import { createContext, useContext, useEffect, useState } from 'react';

export const LoginContext = createContext();

export function LoginContextProvider({ children }) {
  const [logindata, setlogindata] = useState({});
  const [loading, setLoading] = useState(true);

  function setlogininfo(info) {
    setlogindata(info);
  }

  useEffect(() => {
    const token = localStorage.getItem('token');

    console.log(token);

    if (!token) {
      setLoading(false);
      return;
    }

    fetch('http://localhost:5000/User/verify', {
      headers: {
        Authorization: `${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data?.user) {
          setlogindata(data);
        } else {
          localStorage.removeItem('token');
        }
      })
      .catch(() => {
        localStorage.removeItem('token');
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <LoginContext.Provider value={{ logindata, setlogininfo, loading }}>
      {children}
    </LoginContext.Provider>
  );
}

export const useLogincontext = () => useContext(LoginContext);
