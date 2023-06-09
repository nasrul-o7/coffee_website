import { useState, useEffect } from "react";
import Logo from "../assets/img/logo.png";
import { Menu, X } from "react-feather";
import { motion } from "framer-motion";

const handleScroll = () => {
  const [scrollDirection, setScrollDirection] = useState(null);

  useEffect(() => {
    let lastScrollY = window.pageYOffset;

    const updateScrollDirection = () => {
      const scrollY = window.pageYOffset;
      const direction = scrollY > lastScrollY ? "down" : "up";
      if (
        direction !== scrollDirection &&
        (scrollY - lastScrollY > 10 || scrollY - lastScrollY < -10)
      ) {
        setScrollDirection(direction);
      }
      lastScrollY = scrollY > 0 ? scrollY : 0;
    };

    window.addEventListener("scroll", updateScrollDirection);
    return () => {
      window.removeEventListener("scroll", updateScrollDirection);
    };
  }, [scrollDirection]);

  return scrollDirection;
};

function Navbar() {
  const scrollDirection = handleScroll();
  // toggle hamburger menu
  const [nav, setNav] = useState(false);
  const handleNav = () => setNav(!nav);

  // shadow effect on navbar on scroll
  const [top, setTop] = useState(true);
  useEffect(() => {
    const scrollHandler = () => {
      window.pageYOffset > 10 ? setTop(false) : setTop(true);
    };
    window.addEventListener("scroll", scrollHandler);
    return () => window.removeEventListener("scroll", scrollHandler);
  }, [top]);

  return (
    <nav
      className={`fixed w-full top-0 bg-zinc-900 ${
        !top && `shadow-lg backdrop-blur-lg bg-zinc-900 dark:bg-slate-800`
      } h-[70px] transition-all duration-500 z-[99]`}
    >
      <div className="navbar w-full h-full flex justify-between items-center py-4 px-6 md:px-10 lg:px-20 xl:px-32">
        <div>
          <a className="flex items-center gap-4" href="/">
            <img
              src={Logo}
              alt="DH"
              className="h-10 w-auto hover:opacity-75 transition-all ease-in duration-300 cursor-pointer"
            />
            <p className=" font-extrabold text-[#D38C22]">KONA Kopi</p>
          </a>
        </div>
        {/* NAVBAR AT 768PX & ABOVE */}
        <div>
          <ul className="hidden md:flex md:items-center">
            <li>
              <a href="#" className="mr-6">
                Home
              </a>
            </li>
            <li>
              <a href="#specialty" className="mx-6">
                Specialty
              </a>
            </li>
            <li>
              <a href="#products" className="mx-6">
                Products
              </a>
            </li>
            <li>
              <a href="#premium" className="mx-6">
                Premium
              </a>
            </li>
            <li>
              <a href="#blog" className="mx-6">
                Blog
              </a>
            </li>
          </ul>
        </div>

        {/* HAMBURGER MENU AT 768PX & LOWER */}
        <div
          onClick={handleNav}
          className={`md:hidden transition-all ease-in-out duration-500 z-20`}
        >
          {!nav ? (
            <Menu
              size={30}
              className="hover:text-slate-400 transition-all ease-in duration-3000 cursor-pointer"
            />
          ) : (
            ""
          )}
          {nav ? (
            <motion.div
              className={`fixed ${
                scrollDirection === "down" ? "top-0" : "top-0"
              } right-0 w-full h-screen shadow-lg bg-zinc-900 backdrop-blur-lg z-[1]`}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 100 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="w-full h-[70px] px-6 flex justify-end items-center">
                <X
                  size={30}
                  className="hover:text-slate-400 transition-all ease-in duration-300 cursor-pointer"
                />
              </div>
              <div className="h-full flex flex-col justify-center items-center">
                <a href="#" className="mobile-links">
                  Home
                </a>
                <a href="#specialty" className="mobile-links">
                  Specialty
                </a>
                <a href="#products" className="mobile-links">
                  Products
                </a>
                <a href="#premium" className="mobile-links">
                  Premium
                </a>
                <a href="#blog" className="mobile-links">
                  Blog
                </a>
              </div>
            </motion.div>
          ) : (
            ""
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
