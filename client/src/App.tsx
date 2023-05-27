import { useSelector } from "react-redux"
import { decrement, increment, selectCount } from "./store/post/counter.slice"
import './App.scss'
import { isObjectEmpty } from "./utilities/index"
import { useAppDispatch } from "./store/redux.store";
import { resetUser, selectLoggedIn, selectUser, setUser, userType } from "./store/auth/auth.slice";
import React, { FC, useEffect } from "react";
import { useLoginMutation, useLogoutMutation } from "./services/auth/auth";
import Navbar from "./components/navbar/Navbar.component";
import Counter from "./components/counter/Counter.component";
import { AuthState } from "./store/auth/auth.types";

const App: FC = () => {
  const currentUser:userType = useSelector(selectUser);
  const isLoggedIn = useSelector(selectLoggedIn);
  const [login] = useLoginMutation();
  const [logout] = useLogoutMutation();
  const dispatch = useAppDispatch();



  const handleLogin = async () => {
    const { name, email, isTwofactorAuthenticationEnabled } = await login({}).unwrap();
    dispatch(setUser({ user: { name, email, isTwofactorAuthenticationEnabled }, isLoggedIn: true }))
  }
  const handleLogout = async () => {
    const x = await logout();
    dispatch(resetUser());
  }
  const UserDetails: FC = () => {
    if (!isLoggedIn) {
      return <button onClick={handleLogin}>Login</button>
    }
    return <>
      {currentUser?.name!}
      <br />
      {currentUser?.email!}
      <button onClick={handleLogout}>Log Out</button>
    </>
  }
  return (
    <div className="App w-full  flex flex-column items-center justify-center">
      {/* <Navbar/> */}
      {isLoggedIn && <Counter />}
      <UserDetails />

    </div>
  )
}

export default App
