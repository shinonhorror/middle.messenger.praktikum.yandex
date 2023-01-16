import pagesFunction from "../modules/pagesFunction";

const pages = {
	home: {
		name: "home",
		href: "/",
		call: pagesFunction.homePage,
	},
	login: {
		name: "login",
		href: "/login",
		call: pagesFunction.loginPage,
	},
	auth: {
		name: "auth",
		href: "/auth",
		call: pagesFunction.authPage,
	},
	chat: {
		name: "chat",
		href: "/chat",
		call: pagesFunction.chatPage,
	},
	profile: {
		name: "profile",
		href: "/profile",
		call: pagesFunction.profilePage,
	},
	settings: {
		name: "settings",
		href: "/settings",
		call: pagesFunction.changeSettings,
	},
	password: {
		name: "password",
		href: "/password",
		call: pagesFunction.changePassword,
	},
	notFound: {
		name: "notFound",
		href: "/404",
		call: pagesFunction.notFoundPage,
	},
	error: {
		name: "error",
		href: "/500",
		call: pagesFunction.errorPage,
	},
};

export default pages;
