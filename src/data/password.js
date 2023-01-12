import input from "../components/input/input.js";
import objectRender from "../utils/objectRender.js";

let dataPassword = "";

const inputDataPassword = {
	oldPassword: {
		title: "Старый пароль",
		type: "password",
		inputName: "password",
	},
	password: {
		title: "Новый пароль",
		type: "oldPassword",
		inputName: "password",
	},
	newPassword: {
		title: "Повторите новый пароль",
		type: "password",
		inputName: "newPassword",
	},
};

dataPassword = objectRender(inputDataPassword, input);

export default dataPassword;