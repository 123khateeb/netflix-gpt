import { useState, useRef } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import header_image from "../assets/svg/logo.svg";
import { Search, Bell } from "lucide-react";
import useScreenSize from "../utils/useScreenSize";
import { auth } from "../utils/firebase";
import { signOut } from "firebase/auth";
import "./Header.css";
import { useSelector } from "react-redux";

const NavLinks = () => {
  const navItems = [
    { label: "Home", path: "/browse" },
    { label: "Shows", path: "/shows" },
    { label: "Movies", path: "/movies" },
    { label: "Games", path: "/games" },
    { label: "News & Popular", path: "/news" },
    { label: "My List", path: "/my-list" },
  ];
  return (
    <>
      {navItems.map((item, index) => (
        <li key={index}>
          <NavLink
            to={item.path}
            className={({ isActive }) =>
              `text-sm  transition-all duration-200 hover:text-[#b3b3b3] ${
                isActive
                  ? "text-white text-base font-bold"
                  : "text-[#e5e5e5] font-medium"
              }`
            }
          >
            {item.label}
          </NavLink>
        </li>
      ))}
    </>
  );
};

const Header = ({ isLoginPage = false }) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const inputRef = useRef(null);
  const timerRef = useRef(null);
  const { width } = useScreenSize();
  const user = useSelector((store) => store.user);


  const handleEnter = () => {
    clearTimeout(timerRef.current); // stop closing
    setOpen(true);
  };

  const handleLeave = () => {
    timerRef.current = setTimeout(() => {
      setOpen(false);
    }, 300); // 200–300ms perfect UX
  };

  const handleSearchClick = () => {
    setSearchOpen(true);
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  };

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        navigate("/");
      })
      .catch((error) => {
        // An error happened.
        navigate("/error");
      });
  };

  return (
    <>
      {isLoginPage ? (
        <header className="">
          <Link to="" className="header_logo_div">
            <img
              className="header_logo"
              src={header_image}
              alt="Netflix logo"
            />
          </Link>
        </header>
      ) : (
        <div className="w-full h-[68px] py-3 px-[4%] flex items-center justify-between">
          <div className="flex items-center gap-5 ">
            <Link to="" className="header_logo_div">
              <img className="h-[30px]" src={header_image} alt="Netflix logo" />
            </Link>

            {width >= 768 && (
              <ul className="flex items-center gap-4 ">
                <NavLinks/>
              </ul>
            )}
            {width <= 768 && (
              <div className="relative">
                <p
                  className="text-sm flex items-center gap-1 cursor-pointer"
                  onClick={() => setMobileMenuOpen((prev) => !prev)}
                >
                  Browse
                  <span
                    className={`material-icons transition-transform ${
                      mobileMenuOpen ? "rotate-180" : ""
                    }`}
                  >
                    arrow_drop_down
                  </span>
                </p>

                {mobileMenuOpen && (
                  <div className="absolute mt-[1.5rem] right-0 w-40 bg-[#141414] rounded shadow-lg">
                    <span className="material-icons absolute left-[65%] -top-2 text-[#e5e5e5] ">
                      arrow_drop_up
                    </span>
                    <ul className="flex items-center gap-4 flex-col mt-2 border-t-2  border-t-[#e5e5e5]">
                      <NavLinks/>
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>
          <div className="flex items-center gap-4">
            {/* <div
              className={`flex items-center gap-2 overflow-hidden transition-transform ${searchOpen ? "border-white border  px-4 p-1 absolute right-[121px] bg-black" : ""}`}
            >
              <Search className="cursor-pointer" onClick={handleSearchClick} />
              <input
                ref={inputRef}
                onBlur={() => setSearchOpen(false)}
                type="text"
                placeholder="Titles, people, genres"
                className={`bg-transparent text-sm  outline-none text-white
                        transition-all duration-300 ease-out
                        ${
                          searchOpen
                            ? "w-48 opacity-100 translate-x-0"
                            : "w-0 opacity-0 translate-x-6 pointer-events-none"
                        }
                      `}
              />
            </div> */}

            <div className="relative w-[36px] h-[32px] overflow-visible">
              <div
                className={`absolute right-0 top-1/2 -translate-y-1/2
                  flex items-center gap-2 bg-black  rounded px-3 py-1
                  transition-all duration-300 ease-out
                  ${
                    searchOpen
                      ? "w-64 sm:w-56 opacity-100 translate-x-0 border border-white"
                      : "w-[36px] opacity-100 translate-x-0"
                  }
                `}
              >
                <Search
                  className="cursor-pointer shrink-0"
                  onClick={handleSearchClick}
                />

                <input
                  ref={inputRef}
                  onBlur={() => setSearchOpen(false)}
                  type="text"
                  placeholder="Titles, people, genres"
                  className={`bg-transparent text-sm text-white outline-none transition-all duration-300
                    ${searchOpen ? "w-full opacity-100" : "w-0 opacity-0 pointer-events-none"}
                  `}
                />
              </div>
            </div>

            {width >= 768 && <p className="text-sm">{user?.displayName}</p>}
            <button className=" notification_bell_div">
              <span className="">7</span>
              <Bell className="cursor-pointer" />
            </button>
            <div
              className=" dropdown relative"
              onMouseEnter={handleEnter}
              onMouseLeave={handleLeave}
            >
              <button className="flex items-center gap-1 text-white cursor-pointer">
                <img
                  className="rounded-md max-w-[30px] md:max-w-[50px]"
                  src={
                    user?.photoURL ||
                    "https://occ-0-6245-2164.1.nflxso.net/dnm/api/v6/vN7bi_My87NPKvsBoib006Llxzg/AAAABXYofKdCJceEP7pdxcEZ9wt80GsxEyXIbnG_QM8znksNz3JexvRbDLr0_AcNKr2SJtT-MLr1eCOA-e7xlDHsx4Jmmsi5HL8.png?r=1d4"
                  }
                  alt=""
                />
                {/* <ChevronDown
                  className={`transition-transform ${open ? "rotate-180" : ""}`}
                  size={18}
                /> */}
                <span
                  className={`material-icons cursor-pointer transition-transform ${open ? "rotate-180" : ""}`}
                >
                  arrow_drop_down
                </span>
              </button>
              {open && (
                <div className="absolute mt-[1.5rem] right-[0] w-40 bg-[#141414] rounded shadow-lg ">
                  <span className="material-icons cursor-pointer absolute right-[18px] -top-[16px]">
                    arrow_drop_up
                  </span>
                  <p
                    onClick={handleSignOut}
                    className="px-4 py-2 hover:bg-[#222] cursor-pointer text-sm"
                  >
                    Sign Out
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
