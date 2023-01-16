import home from "../../static/index.hbs";
import login from "../pages/login/index.hbs";
import signin from "../pages/signin/index.hbs";
import profile from "../pages/profile/index.hbs";
import chat from "../pages/chat/index.hbs";
import error from "../pages/errors/index.hbs";
import avatar from "../img/avatar.png";
import dataProfile from "../data/profile.js";
import dataPassword from "../data/password.js";
import button from "../components/baseButton/index.js";

const root = document.getElementById("root");

const homePage = () => {
	root.innerHTML = home({
		login: "#/login",
		auth: "#/auth",
		chat: "#/chat",
		profile: "#/profile",
		error: "#/500",
		notFound: "#/404",
	});
};

const loginPage = () => {
	root.innerHTML = login({
		auth: "#/auth",
		chat: "#/chat",
		button: button({
			buttonClass: "button__base",
			href: "#/chat",
			title: "Войти",
		}),
	});
};

const authPage = () => {
	root.innerHTML = signin({
		login: "#/login",
		chat: "#/chat",
		button: button({
			buttonClass: "button__base",
			href: "#/chat",
			title: "Зарегестрироваться",
		}),
	});
};

const chatPage = () => {
	root.innerHTML = chat({
		profile: "#/profile",
	});
};

const profilePage = () => {
	root.innerHTML = profile({
		chat: "#/chat",
		login: "#/login",
		avatar: avatar,
		input: dataProfile.dataProfile,
		button: dataProfile.buttonProfile,
	});
};

const changeSettings = () => {
	root.innerHTML = profile({
		chat: "#/chat",
		settings: "#/settings",
		password: "#/password",
		avatar: avatar,
		input: dataProfile.dataProfile,
		button: button({
			buttonClass: "button__base",
			href: "#/profile",
			title: "Сохранить",
		}),
	});
};

const changePassword = () => {
	root.innerHTML = profile({
		chat: "#/chat",
		settings: "#/settings",
		password: "#/password",
		avatar: avatar,
		input: dataPassword,
		button: button({
			buttonClass: "button__base",
			href: "#/profile",
			title: "Сохранить",
		}),
	});
};

const notFoundPage = () => {
	root.innerHTML = error({
		chat: "#/chat",
		code: "404",
		desc: "Не туда попали",
	});
};

const errorPage = () => {
	root.innerHTML = error({
		chat: "#/chat",
		code: "505",
		desc: "Мы уже фиксим",
	});
};

const pagesFunction = {
	homePage,
	loginPage,
	authPage,
	chatPage,
	profilePage,
	changeSettings,
	changePassword,
	notFoundPage,
	errorPage,
};

export default pagesFunction;
