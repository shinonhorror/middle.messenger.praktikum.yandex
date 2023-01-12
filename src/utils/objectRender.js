const objectRender = (object, func) => {
	let temp = "";
	for (let item of Object.keys(object)) {
		temp += func(object[item]);
	}
	return temp;
};

export default objectRender;