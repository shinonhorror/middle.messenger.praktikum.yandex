import pages from "../data/pages";

let routes = {};
let templates = {};

const route = (path, template) => {
	if (typeof template === "string") {
		return (routes[path] = templates[template]);
	} else {
		return;
	}
};

const template = (name, templateFunction) => {
	return (templates[name] = templateFunction);
};

for (let page of Object.keys(pages)) {
	template(pages[page].name, function () {
		pages[page].call();
	});
	route(pages[page].href, pages[page].name);
}

export default routes;
