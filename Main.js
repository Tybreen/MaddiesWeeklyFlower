/* 

Name: Maddie's Weekly Flower

Maddie's favorite flower: Chrysanthemum

Date created: 10/18/22
Given to Maddie: 4/21/23
*/

// Vars:

let image1;
let image2;

let currentImage = 0;

let howLongWeHaveBeenDating = [];
let howLongTilEvent = [];

let darkMode = false;

let toggleText = false;

let i = 0;

/*
/ The month is 0-indexed: AKA: month -1 /
/ Year, Month, Day, Hour, Minute, Seconds /
*/
//* Here
const transitionDay = new Date(2024, 10, 3, 0, 0, 0);

const eventName = `your birthday!!!`;
const eventDate = new Date(2024, 10, 7, 0, 0, 0);

const dayWeStartedDating = new Date(2022, 9, 22, 17, 30, 0);

//* Here
const quote = `I love you so much! I'm so happy I get to be your boyfriend! Only in a couple days is your birthday and I sure did get you a great gift! I really hope you like it. I put a lot of work and thought into it! No matter how good your gift is, it will still never show how much I love you, nothing will ever do THAT!`;

// Horizontal : Vertical //
//* Here
const photoStyle1 = "Vertical";
const photoStyle2 = "Vertical";

// DeBug:
//* Here
const imageSelect = false; // Default: false

function preload() {
	//* Here
	image1 = loadImage("./Flowers/Week 79.jpeg");
	image2 = loadImage("./Flowers/Week 81.jpg");
}

function setup() {
	createCanvas(windowWidth, windowHeight);

	displayBackground();

	setInterval(function () {
		displayImage();
	}, 1000);
}

function draw() {
	if (i < 5) {
		i = frameCount;

		displayBackground();
		displayImage();
	}

	if (toggleText) displayText();
}

function mousePressed() {
	if (!toggleText) {
		toggleText = true;
	} else {
		toggleText = false;
		displayBackground();
		displayImage();
	}
}

function displayText() {
	howLongWeHaveBeenDating = dateDifference(dayWeStartedDating.getTime(), Date.now());

	if (Date.now() < eventDate.getTime()) {
		howLongTilEvent = dateDifference(Date.now(), eventDate.getTime());
	} else {
		howLongTilEvent = [0, 0, 0, 0, 0, 0];
	}

	displayBackground();

	textAlign(LEFT);
	textSize(height / 40);

	if (darkMode) fill(255);
	else fill(0);

	text(
		`We've been dating:\n${howLongWeHaveBeenDating[0]} Years\n${howLongWeHaveBeenDating[1]} Months\n${howLongWeHaveBeenDating[2]} Days\n${howLongWeHaveBeenDating[3]} Hours\n${howLongWeHaveBeenDating[4]} Minutes\n${howLongWeHaveBeenDating[5]} Seconds\n`,
		10,
		height / 30
	);

	printSplittedSentences(quote, ((width / 2) * 2.9) / (height / 40), 10, height - height / 60, height / 40);

	textAlign(RIGHT);

	text(
		`Until ${eventName}: ${howLongTilEvent[1] !== 0 ? `\n${howLongTilEvent[1]} Months` : ``}\n${howLongTilEvent[2]} Days\n${
			howLongTilEvent[3]
		} Hours\n${howLongTilEvent[4]} Minutes\n${howLongTilEvent[5]} Seconds\n`,
		width - 10,
		height / 30
	);

	text("To Maddie", width - 10, height - height / 20);
	text("Love, Tyler", width - 10, height - height / 60);
}

function displayBackground() {
	if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
		background(0);
		darkMode = true;
	} else {
		background(255);
		darkMode = false;
	}
}

function displayImage() {
	imageMode(CENTER);

	if (imageSelect == 1 || (imageSelect == false && transitionDay.getTime() > Date.now())) {
		image(image1, width / 2, height / 2, 0, 0);

		if (photoStyle1 == "Horizontal") image1.resize(width, 0);
		else if (photoStyle1 == "Vertical") image1.resize(0, height);

		currentImage = 1;
	} else if (imageSelect == 2 || (imageSelect == false && transitionDay.getTime() < Date.now())) {
		image(image2, width / 2, height / 2, 0, 0);

		if (photoStyle2 == "Horizontal") image2.resize(width, 0);
		else if (photoStyle2 == "Vertical") image2.resize(0, height);

		currentImage = 2;
	}
}

function printSplittedSentences(str, chr, X, Y, size) {
	lst = splitSentence(str, chr);

	textSize(size);

	for (var i = 1; i <= lst.length; i++) {
		text(lst[lst.length - i], X, Y - (i - 1) * (size * 1.25));
	}
}

// not my code.
function splitSentence(str, chr) {
	// Split up the string and use `reduce`
	// to iterate over it
	const temp = str.split(" ").reduce(
		(acc, c) => {
			// Get the number of nested arrays
			const currIndex = acc.length - 1;

			// Join up the last array and get its length
			const currLen = acc[currIndex].join(" ").length;

			// If the length of that content and the new word
			// in the iteration exceeds 20 chars push the new
			// word to a new array
			if (currLen + c.length > chr) {
				acc.push([c]);

				// otherwise add it to the existing array
			} else acc[currIndex].push(c);

			return acc;
		},
		[[]]
	);

	// Join up all the nested arrays
	const out = temp.map((arr) => arr.join(" "));

	return out;
}

function dateDifference(startDate, endDate) {
	// Convert to Date objects if they are strings
	if (!(startDate instanceof Date)) {
		startDate = new Date(startDate); // Attempt to convert if it's a string
	}
	if (!(endDate instanceof Date)) {
		endDate = new Date(endDate); // Attempt to convert if it's a string
	}

	// Check if dates are valid
	if (isNaN(startDate) || isNaN(endDate)) {
		throw new Error("Invalid Date. Unable to calculate difference.");
	}

	let years = endDate.getFullYear() - startDate.getFullYear();
	let months = endDate.getMonth() - startDate.getMonth();
	let days = endDate.getDate() - startDate.getDate();
	let hours = endDate.getHours() - startDate.getHours();
	let minutes = endDate.getMinutes() - startDate.getMinutes();
	let seconds = endDate.getSeconds() - startDate.getSeconds();

	// Adjust negative values
	if (seconds < 0) {
		seconds += 60;
		minutes--;
	}
	if (minutes < 0) {
		minutes += 60;
		hours--;
	}
	if (hours < 0) {
		hours += 24;
		days--;
	}
	if (days < 0) {
		let previousMonth = new Date(endDate.getFullYear(), endDate.getMonth(), 0).getDate();
		days += previousMonth;
		months--;
	}
	if (months < 0) {
		months += 12;
		years--;
	}

	return [years, months, days, hours, minutes, seconds];
}
