/* 

Name: Maddie's Weekly Flower

Maddie's favorite flower: Chrysanthemum

Date created: 10/18/22
Given to Maddie: 4/21/23
*/

//* Here
const lastPublishedToGitHub = "Last Published to GitHub: 6/11/24";

// Vars:

let image1;
let image2;

let currentImage = 0;

let now = new Date();
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
const transitionDay = new Date(2024, 5, 23, 0, 0, 0);
const nextTransitionDay = new Date(2024, 5, 30, 0, 0, 0);

const eventName = `Imagine Dragons`;
const eventDate = new Date(2024, 7, 12, 20, 0, 0);

const dayWeStartedDating = new Date(2022, 9, 22, 17, 30, 0);

//* Here
const quote = `I'm excited to see you! It doesn't matter when I last saw you, I'm always so excited to see you! I also miss you! You are the love of my life. My heart hurts when your not here. I love you! I hope that everyday I smother you with my love! ❤️‍🔥`;

// Horizontal : Vertical //
//* Here
const photoStyle1 = "Vertical";
const photoStyle2 = "Vertical";

// DeBug:
//* Here
const imageSelect = false; // Default: false

function preload() {
	//* Here
	image1 = loadImage("./Flowers/Week 61.jpg");
	image2 = loadImage("./Flowers/Week 62.jpeg");
}

function setup() {
	createCanvas(windowWidth, windowHeight);

	console.log(lastPublishedToGitHub);

	displayBackground();

	setInterval(function () {
		now = new Date();

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
		`Until ${eventName}:\n${howLongTilEvent[1]} Months\n${howLongTilEvent[2]} Days\n${howLongTilEvent[3]} Hours\n${howLongTilEvent[4]} Minutes\n${howLongTilEvent[5]} Seconds\n`,
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

// not my code.
function dateDifference(start, end) {
	// Copy date objects so don't modify originals
	var s = new Date(+start);
	var e = new Date(+end);
	var timeDiff, years, months, days, hours, minutes, seconds;

	// Get estimate of year difference
	years = e.getFullYear() - s.getFullYear();

	// Add difference to start, if greater than end, remove one year
	// Note start from restored start date as adding and subtracting years
	// may not be symmetric
	s.setFullYear(s.getFullYear() + years);
	if (s > e) {
		--years;
		s = new Date(+start);
		s.setFullYear(s.getFullYear() + years);
	}
	// Get estimate of months
	months = e.getMonth() - s.getMonth();
	months += months < 0 ? 12 : 0;

	// Add difference to start, adjust if greater
	s.setMonth(s.getMonth() + months);
	if (s > e) {
		--months;
		s = new Date(+start);
		s.setFullYear(s.getFullYear() + years);
		s.setMonth(s.getMonth() + months);
	}

	// Get remaining time difference, round to next full second
	timeDiff = ((e - s + 999) / 1e3) | 0;
	days = (timeDiff / 8.64e4) | 0;
	hours = ((timeDiff % 8.64e4) / 3.6e3) | 0;
	minutes = ((timeDiff % 3.6e3) / 6e1) | 0;
	seconds = timeDiff % 6e1;

	return [years, months, days, hours, minutes, seconds];
}
