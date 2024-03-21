/* 

Name: Maddie's Weekly Flower

Maddie's favorite flower: Chrysanthemum

Date created: 10/18/22
Given to Maddie: 4/21/23
*/

//* Here
var lastPublishedToGitHub = "Last Published to GitHub: 3/20/24";

// Vars:

var image1;
var image2;

var currentImage = 0;

var now = new Date();
var howLongWeHaveBeenDating = [];
var howLongTilNextPic = [];

var darkMode = false;

var toggleText = false;

var i = 0;

/*
/ The month is 0-indexed: AKA: month -1 /
/ Year, Month, Day, Hour, Minute, Seconds /
*/
//* Here
var transitionDay = new Date(2024, 2, 24, 0, 0, 0);
var nextTransitionDay = new Date(2024, 2, 31, 0, 0, 0);

var dayWeStartedDating = new Date(2022, 9, 22, 17, 30, 0);

//* Here
var quote = `At the time of this writing today was a big day. If things were different, you would be on your second anniversary. I hate saying it, but it's true. But thankfully for both of us, that day never came. Today we celebrate one more day of being each others and loving each other so much. I'm sure you thought about it a lot. I wish I could comfort you better. I wanna tell you that, you are the most amazing person ever. I'm not just saying that is your boyfriend, I'm saying that as your friend and the person that has been laughing and smiling with you for almost a year and a half. Don't be sad about anything, you have many years of smiling ahead of you! I hope someday you will not take a second of your day thinking about him. But until that day comes, I love you all the more, and think nothing differently of you in any way, shape, or form. I hope I never lose you, because I sure wanna get to our 50th anniversary. I love you, Madeline Meeter, never forget that! I'll always be by your side, through thick and thin, through everything. You are my partner in crime and my partner in general. I love you! ❤️`;

// Horizontal : Vertical //
//* Here
var photoStyle1 = "Horizontal";
var photoStyle2 = "Horizontal";

// DeBug:
//* Here
var imageSelect = false; // Default: false

function preload()
{

    //* Here
    image1 = loadImage("./Flowers/Week 47:48.jpg");
    image2 = loadImage("./Flowers/Week 49.jpg");

}

function setup() 
{
    createCanvas(windowWidth, windowHeight);

    console.log(lastPublishedToGitHub);

    displayBackground();    

    setInterval( function() 
    { 
        now = new Date();

        // console.log("now:                    " + now.toLocaleString());
        // console.log("Transition Day:   " + transitionDay.toLocaleString());
        // console.log("Drawed Image " + currentImage);

        displayImage();

    }, 1000);

}


function draw()
{

    if(i < 5)
    {
        i = frameCount;

        displayBackground();
        displayImage();
    }

    if(toggleText) displayText();
    
    // console.log("frameCount:" + i);
    
}

function mousePressed()
{
    if(!toggleText) 
    {
        toggleText = true;
    }

    else 
    {
        toggleText = false;  
        displayBackground();
        displayImage();
    }
}

function displayText()
{

    howLongWeHaveBeenDating = dateDifference(dayWeStartedDating.getTime(), Date.now());

    if(transitionDay.getTime() > Date.now()) howLongTilNextPic = dateDifference(Date.now(), transitionDay.getTime());

    else howLongTilNextPic = dateDifference(Date.now(), nextTransitionDay.getTime());

    displayBackground();

    textAlign(LEFT);
    textSize(height / 40);

    if(darkMode) fill(255);
    else fill(0);

    text(`We’ve been dating:\n${howLongWeHaveBeenDating[0]} Years\n${howLongWeHaveBeenDating[1]} Months\n${howLongWeHaveBeenDating[2]} Days\n${howLongWeHaveBeenDating[3]} Hours\n${howLongWeHaveBeenDating[4]} Minutes\n${howLongWeHaveBeenDating[5]} Seconds\n`, 10, height / 30);

    printSplittedSentences(quote, ((width / 2) * 2.9) / (height / 40), 10, height - (height / 60), height / 40);

    textAlign(RIGHT);

    text(`Until Next Picture:\n${howLongTilNextPic[2]} Days\n${howLongTilNextPic[3]} Hours\n${howLongTilNextPic[4]} Minutes\n${howLongTilNextPic[5]} Seconds\n`, width - 10, height / 30);
    
    text("To Maddie", width - 10, height - (height / 20));
    text("Love, Tyler", width - 10, height - (height / 60));
}

function displayBackground()
{
    if (window.matchMedia('(prefers-color-scheme: dark)').matches)
    {
        background(0);
        darkMode = true;
    }
    else 
    {
        background(255);
        darkMode = false;
    }
}

function displayImage()
{
    imageMode(CENTER);
    
    if( imageSelect == 1 || (imageSelect == false && transitionDay.getTime() > Date.now()) )
    {
        image(image1, width / 2, height / 2, 0, 0);

        if(photoStyle1 == "Horizontal") image1.resize(width, 0);
        else if(photoStyle1 == "Vertical") image1.resize(0, height);

        currentImage = 1;
    }
    
    else if( imageSelect == 2 || (imageSelect == false && transitionDay.getTime() < Date.now()) )
    {
        image(image2, width / 2, height / 2, 0, 0);

        if(photoStyle2 == "Horizontal") image2.resize(width, 0);
        else if(photoStyle2 == "Vertical") image2.resize(0, height);

        currentImage = 2;
    }
    
}

function printSplittedSentences(str, chr, X, Y, size)
{

    lst = splitSentence(str, chr);
    
    textSize(size);

    for(var i = 1; i <= lst.length; i++)
    {
        text(lst[lst.length - i], X, Y - (i - 1) * (size * 1.25));
    }
}


// not my code.
function splitSentence(str, chr)
{    

    // Split up the string and use `reduce`
    // to iterate over it
    const temp = str.split(' ').reduce((acc, c) => {

    // Get the number of nested arrays
    const currIndex = acc.length - 1;

    // Join up the last array and get its length
    const currLen = acc[currIndex].join(' ').length;

    // If the length of that content and the new word
    // in the iteration exceeds 20 chars push the new
    // word to a new array
    if (currLen + c.length > chr)
    {
        acc.push([c]);

        // otherwise add it to the existing array
    }
    else acc[currIndex].push(c);

    return acc;

    }, [[]]);

    // Join up all the nested arrays
    const out = temp.map(arr => arr.join(' '));

    return out;
}




// not my code.
function dateDifference(start, end)
{
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
    if (s > e)
    {
        --years;
        s = new Date(+start);
        s.setFullYear(s.getFullYear() + years);
    }
    // Get estimate of months
    months = e.getMonth() - s.getMonth();
    months += months < 0? 12 : 0;

    // Add difference to start, adjust if greater
    s.setMonth(s.getMonth() + months);
    if (s > e)
    {
        --months;
        s = new Date(+start);
        s.setFullYear(s.getFullYear() + years);
        s.setMonth(s.getMonth() + months);
    }
  
  
    // Get remaining time difference, round to next full second
    timeDiff = (e - s + 999) / 1e3 | 0;
    days     =  timeDiff / 8.64e4 | 0;
    hours    = (timeDiff % 8.64e4) / 3.6e3 | 0;
    minutes  = (timeDiff % 3.6e3) / 6e1 | 0;
    seconds  =  timeDiff % 6e1;
  
    return [years, months, days, hours, minutes, seconds];
}
