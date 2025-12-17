import { Outlet } from "react-router";
import Navbar from "../Component/Header/Navbar";

export default function Root() {
  return (
   <>
    <Navbar></Navbar>
    <Outlet></Outlet>
   </>
  )
}
