const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			token: "",
			message: "",
		},
		actions: {
			syncTokenFromSessionStore: () => {
				const token = sessionStorage.getItem("token");
				console.log("Application just loaded")
				if (token && token !== "" && token !== undefined) setStore({ token: token });
			},

			logout: () => {
				sessionStorage.removeItem("token");
				console.log("Logging out");
				setStore({ token: "" });
			},

			login: async (email, password) => {
				const opts = {
					method: 'POST',
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify({
						email: email,
						password: password
					})
				};
				try {
					const resp = await fetch('https://jminx42-special-potato-vjxpr9v7959fwjxq-3001.preview.app.github.dev/api/token', opts)
					if (resp.status !== 200) {
						alert("There has been some error");
						return false;
					}
					const data = await resp.json();
					sessionStorage.setItem("token", data.access_token);
					console.log("here is your token " + data.access_token)
					setStore({ token: data.access_token })
					return true;
				}
				catch (error) {
					console.error("There has been an error logging in")
				}

			},

			getMessage: async () => {
				const store = getStore();
				const opts = {
					headers: {
						"Authorization": "Bearer " + store.token,
						"Content-Type": "application/json"
					}
				}
				try {
					const resp = await fetch("https://jminx42-special-potato-vjxpr9v7959fwjxq-3001.preview.app.github.dev/api/hello", opts)
					const data = await resp.json()
					console.log("checking what this does " + process.env.BACKEND_URL + "api/hello")
					setStore({ message: data.message })
				} catch (error) {
					console.log("Error loading message from backend", error)
				}


			}
		}
	};
};

export default getState;
