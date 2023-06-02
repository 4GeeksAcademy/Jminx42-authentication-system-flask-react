import React, { useContext, useState } from 'react';
import { Context } from "../store/appContext";
import { Link, useNavigate } from "react-router-dom";

export const Navbar = () => {
	const { store, actions } = useContext(Context);
	const navigate = useNavigate();
	const handleClick = () => {
		actions.logout()
		navigate('/')
	}
	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container">
				<Link to="/">
					<span className="navbar-brand mb-0 h1">Home</span>
				</Link>
				<div className="ml-auto">
					{!store.token ?
						<div>
							<Link to="/login">
								<button className="btn btn-primary me-2">Login</button>
							</Link>
							<Link to="/signup">
								<button className='btn btn-success'>Sign up</button>
							</Link>

						</div>


						:

						<button className="btn btn-primary" onClick={handleClick}>Log out</button>

					}

				</div>
			</div>
		</nav>
	);
};
