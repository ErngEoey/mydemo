import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router';
import { useQuery, useQueryClient } from 'react-query';
import { getProfile } from '../../services';

export default function Index() {
  const router = useRouter();
  const [token, setToken] = useState(undefined);

  useEffect(() => {
    setToken(JSON.parse(localStorage.getItem("token")));
    if (!JSON.parse(localStorage.getItem("token"))) {
      router.push('/signin')
    }
  }, [])

  const { data, isLoading, isError } = useQuery(token ? "getUser" : undefined, token ? () => getProfile(token?.access_token) : undefined)
  console.log(data);

  return (
    <body>
      {isLoading ? <></> : <> <main className="main-home">
        <div className="container">
          <div className="section">
            <div className="row align-items-center">
              <div className="col-6 h-left text-center">
                <img className="img-home" src="../img/travel.jpg" alt="" />
              </div>
              <div className="col-6 h-right">
                <article style={{ color: 'white' }}>
                  <h1>Hello! {data?.data?.data?.firstname} {data?.data?.data?.lastname}</h1>
                  {
                    data?.data?.data?.type_of_person_id == 'google' ?
                      <p> You log in with google. <br />
                        Your email is {data?.data?.data?.email}
                      </p>
                      :
                      <p> You log in normally. <br />
                        Your email is {data?.data?.data?.email} <br />
                        Your username is {data?.data?.data?.username}
                      </p>
                  }
                </article>
              </div>
            </div>
          </div>
        </div>
      </main>
        <footer className="footer">
          <div className="bottom">
            <p className="copy-right">@ 2021 Tenfuse.</p>
          </div>
        </footer></>}
    </body>
  )
}
