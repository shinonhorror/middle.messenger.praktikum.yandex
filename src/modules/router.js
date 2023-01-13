import routes from "./templatorPages";

const resolveRoute = (route) => {
	try {
		return routes[route];
	} catch (e) {
		console.log(e);
		throw new Error(`Route ${route} not found`);
	}
};

const router = () => {
	let url = window.location.hash.slice(1) || "/";
	let route = resolveRoute(url);
	route();
};

export default router;
