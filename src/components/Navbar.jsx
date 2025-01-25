import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="#242424 ">
            <div className="container mx-auto flex justify-between items-center p-4">
               
                <div className="text-2xl font-bold text-white">
                    <NavLink to="/" className="hover:scale-105 transition-transform ">
                    𝙲𝚘𝚍𝚎 𝚂𝚊𝚟𝚎𝚛
                    </NavLink>
                </div>
              
                <div className="flex gap-8">
                    <NavLink
                        to="/"
                        className={({ isActive }) =>
                            `text-lg font-semibold ${
                                isActive ? 'text-white' :''
                            } font-medium hover:text-white hover:underline underline-offset-4 transition duration-300`
                        }
                    >
                        Home 
                    </NavLink>
                    <NavLink
                        to="/paste"
                        className={({ isActive }) =>
                            `text-lg font-semibold ${
                                isActive ? 'text-white' : ''
                            } font-medium hover:text-white hover:underline underline-offset-4 transition duration-300`
                        }
                    >
                        Pastes
                    </NavLink>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
