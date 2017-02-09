function pow(number, power) {
	var powResult = 1;

	for (var i = 0; i < Math.abs(power); i++) {
		powResult *= number;
	};

	if (power < 0) {
		powResult = 1 / powResult;
	};

	return powResult;

}