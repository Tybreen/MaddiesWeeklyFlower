/*
Name: Maddie's Weekly Flower

Maddie's favorite flower: Chrysanthemum

Date created: 10/18/22
Given to Maddie: ?????

Last Updated to GitHub: 4/17/23

*/

// Vars:

var image1;
var image2;

var currentImage = 0;

var Now = new Date();
var howLongWeHaveBeenDating = [];
var howLongTilNextPic = [];

var DarkMode = false;

var toggleText = false;

var i = 0;

/* Notes:
/ The month is 0-indexed: AKA: month -1 /
/ Year, Month, Day, Hour, Minute, Seconds /
*/
var transitionDay = new Date(2023, 3, 30, 0, 0, 0);
var dayWeStartedDating = new Date(2022, 10, 22, 17, 30, 0);

// Horizontal : Vertical //
var photoStyle1 = "Vertical";
var photoStyle2 = "Horizontal";


// DeBug:
var imageSelect = false; // Default: false

function preload()
{

 
    image1 = loadImage("Flowers/Week 1.jpg");    
    image2 = loadImage("Flowers/Week 2.png");

}

function setup() 
{
    createCanvas(windowWidth, windowHeight);

    setInterval(function() 
    { 
        Now = new Date();

        /*console.log("Now:                    " + Now.toLocaleString());
        console.log("Transition Day:   " + transitionDay.toLocaleString());
        console.log("Drawed Image " + currentImage);*/

        
        displayBackground();
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
    

    //console.log("Playing");
    //console.log("frameCount:" + i);
    
}

function mousePressed()
{
    if(!toggleText) toggleText = true;
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

    howLongWeHaveBeenDating[1] += 1;

    howLongTilNextPic = dateDifference(Date.now(), transitionDay.getTime());

    displayBackground();

    textAlign(LEFT);
    textSize(height / 40);

    if(DarkMode) fill(255);
    else fill(0);

    text(`We’ve been dating:\n${howLongWeHaveBeenDating[1]} Months\n${howLongWeHaveBeenDating[2]} Days\n${howLongWeHaveBeenDating[3]} Hours\n${howLongWeHaveBeenDating[4]} Minutes\n${howLongWeHaveBeenDating[5]} Seconds\n`, 10, height / 30);

    textAlign(RIGHT);

    text(`Until Next Picture:\n${howLongTilNextPic[2]} Days\n${howLongTilNextPic[3]} Hours\n${howLongTilNextPic[4]} Minutes\n${howLongTilNextPic[5]} Seconds\n`, width - 10, height / 30);
    
    text("To Maddie", width - 10, height - (height / 12));
    text("Who is more Beautiful then these Flowers", width - 10, height - (height / 20));
    text("Love, Tyler", width - 10, height - (height / 60));
}

function displayBackground()
{
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        background(0);
        DarkMode = true;
    }
    else 
    {
        background(255);
        DarkMode = false;
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
    
    else if( imageSelect == 2 || (imageSelect == false && transitionDay.getTime() > Date.now()) )
    {
        image(image2, width / 2, height / 2, 0, 0);

        if(photoStyle2 == "Horizontal") image2.resize(width, 0);
        else if(photoStyle2 == "Vertical") image2.resize(0, height);

        currentImage = 2;
    }
    
}

// not mine.
function dateDifference(start, end) {

    // Copy date objects so don't modify originals
    var s = new Date(+start);
    var e = new Date(+end);
    var timeDiff, years, months, days, hours, minutes, seconds;
  
    // Get estimate of year difference
    years = e.getFullYear() - s.getFullYear();
  
    // Add difference to start, if greater than end, remove one year
    // Note start from restored start date as adding and subtracting years
    // may not be symetric
    s.setFullYear(s.getFullYear() + years);
    if (s > e) {
      --years;
      s = new Date(+start);
      s.setFullYear(s.getFullYear() + years);
    }
    // Get estimate of months
    months = e.getMonth() - s.getMonth();
    months += months < 0? 12 : 0;
  
    // Add difference to start, adjust if greater
    s.setMonth(s.getMonth() + months);
    if (s > e) {
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
  