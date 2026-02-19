import { useState, useRef, useEffect } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import header_image from "../assets/svg/logo.svg";
import { Search, Bell } from "lucide-react";
import useScreenSize from "../utils/useScreenSize";
import { auth } from "../utils/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import "./Header.css";
import { useDispatch, useSelector } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice";
import { DEFAULT_USER_AVATAR } from "../utils/constant";

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
              `text-sm transition-colors duration-300 ${
                isActive ? "text-white font-bold" : "text-[#e5e5e5] hover:text-[#b3b3b3]"
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
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  // State for Scroll Effect
  const [isScrolled, setIsScrolled] = useState(false);
  
  const [open, setOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const inputRef = useRef(null);
  const timerRef = useRef(null);
  const { width } = useScreenSize();
  const user = useSelector((store) => store.user);

  // ARCHITECT NOTE: Efficient Scroll Listener
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Cleanup function to prevent memory leaks
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleEnter = () => {
    clearTimeout(timerRef.current);
    setOpen(true);
  };

  const handleLeave = () => {
    timerRef.current = setTimeout(() => {
      setOpen(false);
    }, 300);
  };

  const handleSearchClick = () => {
    setSearchOpen(true);
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  };

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {})
      .catch((error) => {
        navigate("/error");
      });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName, photoURL } = user;
        dispatch(addUser({ uid, email, displayName, photoURL }));
        navigate("/browse");
      } else {
        dispatch(removeUser());
        navigate("/");
      }
    });

    return () => unsubscribe();
  }, []);

  // Dynamic Background Class
  const headerBackgroundClass = isScrolled 
    ? "bg-[#141414] shadow-md" 
    : "bg-gradient-to-b from-black/80 to-transparent";

  return (
    <>
      {isLoginPage ? (
        <header className="absolute top-0 left-0 w-full z-10 px-8 py-4 bg-gradient-to-b from-black/50 to-transparent">
          <Link to="" className="header_logo_div">
            <img className="w-36 md:w-44" src={header_image} alt="Netflix logo" />
          </Link>
        </header>
      ) : (
        <div
          className={`
            fixed top-0 left-0 right-0 z-[999] 
            flex items-center justify-between 
            px-[4%] py-2 h-[68px]
            transition-colors duration-500 ease-in-out
            ${headerBackgroundClass}
          `}
        >
          {/* Left Section: Logo & Nav */}
          <div className="flex items-center gap-8">
            <Link to="/browse">
              <img className="h-[25px] md:h-[30px]" src={header_image} alt="Netflix logo" />
            </Link>

            {width >= 768 && (
              <ul className="flex items-center gap-5">
                <NavLinks />
              </ul>
            )}

            {/* Mobile Menu Trigger */}
            {width < 768 && (
              <div className="relative text-white">
                <p
                  className="text-xs font-bold flex items-center gap-1 cursor-pointer"
                  onClick={() => setMobileMenuOpen((prev) => !prev)}
                >
                  Browse
                  <span className={`material-icons transition-transform ${mobileMenuOpen ? "rotate-180" : ""}`}>
                    arrow_drop_down
                  </span>
                </p>
                {/* Mobile Dropdown Logic (omitted for brevity, same as yours) */}
                {mobileMenuOpen && (
                  <div className="absolute mt-[1.5rem] right-0 w-40 bg-[#141414] rounded shadow-lg">
                    <span className="material-icons absolute left-[65%] -top-3.5 text-[#e5e5e5] ">
                      arrow_drop_up
                    </span>
                    <ul className="flex items-center  gap-4 flex-col  border-t-2  border-t-[#e5e5e5]">
                      <NavLinks/>
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Right Section: Search, Bell, Profile */}
          <div className="flex items-center gap-4 text-white">
            
            {/* Search Bar */}
            <div className={`flex items-center transition-all duration-300 ${searchOpen ? "bg-black/80 border border-white px-2 py-1" : ""}`}>
              <Search 
                className="w-6 h-6 cursor-pointer" 
                onClick={handleSearchClick} 
              />
              <input
                ref={inputRef}
                onBlur={() => !inputRef.current.value && setSearchOpen(false)}
                type="text"
                placeholder="Titles, people, genres"
                className={`
                  bg-transparent text-sm text-white outline-none ml-2
                  transition-all duration-300 ease-in-out
                  ${searchOpen ? "w-48 sm:w-60 opacity-100" : "w-0 opacity-0 pointer-events-none"}
                `}
              />
            </div>

            <button className="relative">
              <Bell className="w-6 h-6 cursor-pointer" />
              <span className="absolute -top-1 -right-1 bg-red-600 text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                3
              </span>
            </button>

            {/* Profile Dropdown */}
            <div className="relative" onMouseEnter={handleEnter} onMouseLeave={handleLeave}>
              <div className="flex items-center gap-1 cursor-pointer">
                <img
                  className="w-8 h-8 rounded"
                  src={user?.photoURL || DEFAULT_USER_AVATAR}
                  alt="Profile"
                />
                <span className={`material-icons transition-transform ${open ? "rotate-180" : ""}`}>
                  arrow_drop_down
                </span>
              </div>
              
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