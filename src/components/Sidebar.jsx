import { useState } from 'react';
import { HiOutlineMenu } from 'react-icons/hi';
import { RiCloseLine } from 'react-icons/ri';
import { NavLink } from 'react-router-dom';
import { links } from '../assets/constants';

const NavLinks = ({ handleClick }) => (
  <div className="mt-10">
    {
      links.map((item) => (
        <NavLink
          key={item.name}
          to={item.to}
          className="flex flex-row justify-start text-gray-400 hover:text-cyan-400 my-8 items-center text-sm font-medium"
          onClick={() => handleClick && handleClick()}
        >
          <item.icon className="w-6 h-6 mr-2" />
          {item.name}
        </NavLink>
      ))
    }
  </div>
);

const Sidebar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <div className="md:flex hidden flex-col w-[240px] py-10 px-4 bg-[#191624]">
        <h2 className="text-white text-2xl font-bold text-center">Music4All</h2>
        <NavLinks />
      </div>

      {/* MOBILE SIDEBAR */}
      <div className="absolute md:hidden block top-6 right-3">
        {
          mobileMenuOpen
            ? (
              <RiCloseLine
                className="h-6 w-6 text-white mr-2"
                onClick={() => setMobileMenuOpen(false)}
              />
            )
            : (
              <HiOutlineMenu
                className="h-6 w-6 text-white mr-2"
                onClick={() => setMobileMenuOpen(true)}
              />
            )
        }
      </div>
      <div className={`absolute top-0 h-screen w-2/3 bg-gradient-to-tl from-white/10 to-[#483d8b] backdrop-blur-lg z-10 p-6 md:hidden smoot-transition ${mobileMenuOpen ? 'left-0' : '-left-full'}`}>
        <h2 className="text-white text-2xl font-bold text-center">Music4All</h2>
        <NavLinks handleClick={() => setMobileMenuOpen(false)} />
      </div>
    </>
  );
};

export default Sidebar;
