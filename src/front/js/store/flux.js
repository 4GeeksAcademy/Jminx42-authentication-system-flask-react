const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			token: "",
			message: "",

		},
		actions: {
			syncTokenFromSessionStore: () => {
				const token = sessionStorage.getItem("token");
				console.log("Application just loaded -- checking for token")
				if (token && token !== "" && token !== undefined) setStore({ token: token });
			},

			logout: () => {
				sessionStorage.removeItem("token");
				console.log("Logging out");
				setStore({ token: "" });
			},

			signup: async (email, password) => {
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
					const resp = await fetch('https://jminx42-super-duper-guacamole-4pxqv5795pwhxxr-3001.preview.app.github.dev/api/signup', opts)
					if (resp.status !== 200) {
						const responseText = await resp.json();
						console.log(
							`HTTP error! Status: ${resp.status}, Message: ${responseText.msg}`);
						alert("There has been some error connecting with the api");
						return false;
					}
					console.log("user has been added")
					return true;
				}
				catch (error) {
					console.error("There has been an error signing up")
				}

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
					const resp = await fetch('https://jminx42-super-duper-guacamole-4pxqv5795pwhxxr-3001.preview.app.github.dev/api/token', opts)
					if (resp.status !== 200) {
						alert("There has been some error connecting with the api");
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
						"Authorization": "Bearer " + sessionStorage.getItem("token"),
						"Content-Type": "application/json"
					}
				}
				try {
					const resp = await fetch("https://jminx42-super-duper-guacamole-4pxqv5795pwhxxr-3001.preview.app.github.dev/api/hello", opts)
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
