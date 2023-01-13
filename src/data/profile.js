import input from "../components/input/input.js";
import buttonLink from "../components/linkButton/index.js";
import objectRender from "../utils/objectRender.js";

let dataProfile = "";
let buttonProfile = "";

const inputDataProfile = {
	email: {
		title: "Почта",
		type: "email",
		value: "pochta@yandex.ru",
		disabled: "disabled",
		inputName: "email",
	},
	login: {
		title: "Логин",
		type: "text",
		value: "ivanivanov",
		disabled: "disabled",
		inputName: "login",
	},
	inputName: {
		title: "Имя",
		type: "text",
		value: "Иван",
		disabled: "disabled",
		inputName: "first_name",
	},
	lastName: {
		title: "Фамилия",
		type: "text",
		value: "Иванов",
		disabled: "disabled",
		inputName: "second_name",
	},
	chatName: {
		title: "Имя в чате",
		type: "text",
		value: "Иван",
		disabled: "disabled",
		inputName: "login",
	},
	phone: {
		title: "Телефон",
		type: "phone",
		value: "+7(909)9673030",
		disabled: "disabled",
		inputName: "phone",
	},
};

const a = "button__profile exit";

const linkButton = {
	set: {
		buttonClass: "button__profile",
		linkClass: "button__profile-link",
		href: "#/settings",
		title: "Изменить данные",
	},
	passwords: {
		buttonClass: "button__profile",
		linkClass: "button__profile-link",
		href: "#/password",
		title: "Изменить пароль",
	},
	exit: {
		buttonClass: "button__profile-exit",
		linkClass: "button__profile-link",
		href: "#/login",
		title: "Выйти",
	},
};

dataProfile = objectRender(inputDataProfile, input);
buttonProfile = objectRender(linkButton, buttonLink);

export default { dataProfile, buttonProfile };
