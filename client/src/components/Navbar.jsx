import React,{useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {assets} from '../assets/assets'
import {MenuIcon, SearchIcon, TicketPlus, XIcon} from 'lucide-react'


import {useClerk, UserButton, useUser} from '@clerk/clerk-react'
import { useAppContext } from '../context/appContext'

const Navbar = () => {
  const {favoriteMovies} = useAppContext();
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const {isSignedIn,user,isLoaded} = useUser()
  const {openSignIn} = useClerk();
  //The useUser() hook provides access to the current user's
  // User object, which contains all the data for a single user in your application
  return (
		<nav className="fixed top-0 left-0 w-full flex items-center justify-between px-6 md:pd-6 lg:px-36 py-5 z-50 bg-[#09090B] text-shadow-md">
			<div className="flex items-center gap-2">
				<Link to="/" className="max-md:flex-1">
					<img src={assets.logo} alt="icon" className="w-36 h-auto" />
				</Link>
			</div>

			<div
				className={`max-md:absolute max-md:top-0 max-md:left-0 max-md:font-medium max-md:text-lg z-50 flex flex-col md:flex-row items-center max-md:justify-center gap-8 min-md:px-8 py-3 max-md:h-screen min-md:rounded-full backdrop-blur bg-black/70 md:bg-white/10 md:border border-gray-300/20 overflow-hidden transistion-[width] duration-300 z-50 ${
					isOpen ? "max-md:w-full" : "max-md:w-0"
				}`}
			>
				<XIcon
					className="md:hidden absolute top-6 right-6 w-6 h-6 cursor-pointer"
					onClick={() => setIsOpen(!isOpen)}
				/>
				<Link
					onClick={() => {
						scrollTo(0, 0);
						setIsOpen(!isOpen);
					}}
					to="/"
				>
					{" "}
					Home{" "}
				</Link>
				<Link
					onClick={() => {
						scrollTo(0, 0);
						setIsOpen(!isOpen);
					}}
					to="/movies"
				>
					{" "}
					Movies{" "}
				</Link>
				<Link
					onClick={() => {
						scrollTo(0, 0);
						setIsOpen(!isOpen);
					}}
					to="/"
				>
					{" "}
					Theaters{" "}
				</Link>
				<Link
					onClick={() => {
						scrollTo(0, 0);
						setIsOpen(!isOpen);
					}}
					to="/"
				>
					{" "}
					Releases{" "}
				</Link>
				{favoriteMovies.length>0?<Link
					onClick={() => {
						scrollTo(0, 0);
						setIsOpen(!isOpen);
					}}
					to="/favorites"
				>
					{" "}
					Favorites{" "}
				</Link>:""}
			</div>

			<div className="flex items-center gap-10">
				<SearchIcon className="max-md:hidden w-6 h-6 cursor-pointer" />

				{!user ? (
					<button
						onClick={openSignIn}
						className="px-4 py-1 sm:px-7 sm:py-2 bg-primary hover:bg-primary-dull transition rounded-full font-medium cursor-pointer"
					>
						Login
					</button>
				) : (
					<UserButton>
						<UserButton.MenuItems>
							<UserButton.Action
								label="My Bookings"
								labelIcon={<TicketPlus className="w-4" />}
								onClick={() => {
									navigate("/my-bookings");
								}}
							/>
						</UserButton.MenuItems>
					</UserButton>
				)}
			</div>

			<MenuIcon
				className="max-md:ml-4 md:hidden w-8 h-8 cursor-pointer"
				onClick={() => setIsOpen(!isOpen)}
			/>
		</nav>
  );
}

export default Navbar