import React,{useEffect} from "react";
import {
  Navbar,
  Collapse,
  IconButton,
  Button
} from "@material-tailwind/react";
import { NavLink, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useLogout from "../hooks/useLogout";
import useRefreshToken from "../hooks/useRefreshToken";
 
const AppNavbar = () => {
  const [openNav, setOpenNav] = React.useState(false);
  const logout = useLogout();

  const { persist, accessToken,setAccessToken } = useAuth();

  const refresh = useRefreshToken();

  const navigate = useNavigate();

  const logoutHandle = async()=>{
    setOpenNav(false);
      try {
          await logout();
          navigate('/');
      } catch (error) {
          console.log(error);
      }
  }

  useEffect(() => {
    const verifyRefreshToken = async () => {
          try {
              const res = await refresh();
              setAccessToken(res);
          }
          catch (err) {
            setAccessToken(null);
          }
      }
      !accessToken  && verifyRefreshToken();
    }, [])

 
  useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false),
    );
  }, []);
 
  const navList = (
    <ul 
      className="mt-3 ml-1.5 mb-1.5 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6"
    >
      <NavLink
        to='/features'
        size="sm"
        className="mr-3"
        style={{ color: '#000' }}
        onClick={() => setOpenNav(false)}
      >
        Services
      </NavLink>
    </ul>
  );
 
  return (
      <Navbar className="sticky top-0 z-10 h-max max-w-full rounded-none px-4 py-2 lg:px-8 lg:py-4">
        <div className="flex items-center justify-between text-blue-gray-900">
        <NavLink
          to='/'
          size="sm"
          className="mr-3"
          style={
            { 
              color: '#000' ,
              fontSize : '1.5rem'
            } 
          }
        >
          FinanceFriend
        </NavLink>
          <div className="flex items-center gap-4">
          <div className="mr-4 hidden lg:block">{navList}</div>
          {
            (accessToken || persist) ? (
                <div className="hidden lg:inline-block mr-4 ">
                  <NavLink
                    to='/dashboard'
                    size="sm"
                    className="mr-8"
                    style={{ color: '#000' }}
                  >
                    Dash Board
                  </NavLink>
                  <Button
                    variant="gradient"
                    size="sm"
                    className="hidden lg:inline-block mr-4"
                    onClick={logoutHandle}
                  >
                    Log Out
                  </Button>
                </div>
            ) : (
              <div className="flex items-center gap-2">
                <NavLink
                  to='/login'
                  size="sm"
                  className="hidden lg:inline-block mr-8"
                  style={{ color: '#000' }}
                >
                  Log In
                </NavLink>
                <NavLink
                  to='/signup'
                  size="sm"
                  className="hidden lg:inline-block mr-4 bg-black text-white py-2 px-2 rounded-lg"
                >
                  Sign up
                </NavLink>
            </div>
            ) 
          }
            <IconButton
              variant="text"
              className="h-6 w-10 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
              onClick={() => {
                setOpenNav(!openNav);
                if (openNav) {
                  setOpenNav(false); 
                }
              }}
            >
              {openNav ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  className="h-6 w-6"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </IconButton>
          </div>
        </div>
        <Collapse open={openNav}>
        {navList}
          {
            accessToken || persist ? (
              <div className="flex items-center gap-2">
                  <NavLink
                    to='/dashboard'
                    size="sm"
                    className="mr-3"
                    style={{ color: '#000' }}
                    onClick={() => setOpenNav(false)}
                  >
                  Dash Board
                </NavLink>
                  <Button
                    variant="gradient"
                    size="sm"
                    className="mr-4 bg-black text-white py-2 px-2 rounded-lg"
                    onClick={logoutHandle}
                  >
                    Log Out
                  </Button>
              </div>
            ) : (
              <div className="flex flex-col gap-2">
                  <NavLink
                    to='/login'
                    size="sm"
                    className="mr-4 text-black py-2 px-2 rounded-lg"
                    onClick={() => setOpenNav(false)}
                  >
                  Log In
                  </NavLink>
                  <NavLink
                    to='/signup'
                    size="sm"
                    className="mr-4 bg-black text-white py-2 px-2 rounded-lg w-[19vw]"
                    onClick={() => setOpenNav(false)}
                  >
                    Sign up
                  </NavLink>
              </div>
            )
          }
          
        </Collapse>
      </Navbar>
   
  );
}

export default AppNavbar;

