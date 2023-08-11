/*
Name: Maddie's Weekly Flower

Maddie's favorite flower: Chrysanthemum

Date created: 10/18/22
Given to Maddie: 4/21/23
*/

/*Here*/
var lastPublishedToGitHub = "Last Published to GitHub: 8/11/23";

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

/*
/ The month is 0-indexed: AKA: month -1 /
/ Year, Month, Day, Hour, Minute, Seconds /
*/
/*Here*/
var transitionDay = new Date(2023, 7, 10, 0, 0, 0);
var nextTransitionDay = new Date(2023, 7, 20, 0, 0, 0);

var dayWeStartedDating = new Date(2022, 10, 22, 17, 30, 0);

/*Here*/
var quote = "You are so Beautiful. Your hair, your eyes, your face, your body. (Trying not to be weird) How you act is very attractive. The little esxpressions you make, and you being YOU. You have a good sense of humor and you laugh at my jokes. (Good OR Bad) In general, you have a great personally and a sweet heart. I will always tell you how beautiful you are, because you deserve it. I love you very much, and if ever you need me to remind you how beautiful you are, OR how smart you are, OR how much I love you... I gladly will. ❤️";

// Horizontal : Vertical //
/*Here*/
var photoStyle1 = "Horizontal";
var photoStyle2 = "Vertical";

// DeBug:
/*Here*/
var imageSelect = false; // Default: false

function preload()
{

    /*Here*/
    image1 = loadImage("Flowers/Week 15.jpg");
    image2 = loadImage("Flowers/Week 16:17.jpg");

}

function setup() 
{
    createCanvas(windowWidth, windowHeight);

    console.log(lastPublishedToGitHub);

    displayBackground();    

    setInterval(function() 
    { 
        Now = new Date();

        /*console.log("Now:                    " + Now.toLocaleString());
        console.log("Transition Day:   " + transitionDay.toLocaleString());
        console.log("Drawed Image " + currentImage);*/

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
    howLongWeHaveBeenDating[1] += 1;

    if(transitionDay.getTime() > Date.now()) howLongTilNextPic = dateDifference(Date.now(), transitionDay.getTime());

    else howLongTilNextPic = dateDifference(Date.now(), nextTransitionDay.getTime());

    displayBackground();

    textAlign(LEFT);
    textSize(height / 40);

    if(DarkMode) fill(255);
    else fill(0);

    text(`We’ve been dating:\n${howLongWeHaveBeenDating[1]} Months\n${howLongWeHaveBeenDating[2]} Days\n${howLongWeHaveBeenDating[3]} Hours\n${howLongWeHaveBeenDating[4]} Minutes\n${howLongWeHaveBeenDating[5]} Seconds\n`, 10, height / 30);

    printSplittedSentences(quote, ((width / 2) * 2.9) / (height / 40), 10, height - (height / 60), height / 40);

    textAlign(RIGHT);

    text(`Until Next Picture:\n${howLongTilNextPic[2]} Days\n${howLongTilNextPic[3]} Hours\n${howLongTilNextPic[4]} Minutes\n${howLongTilNextPic[5]} Seconds\n`, width - 10, height / 30);
    
    text("To Maddie", width - 10, height - (height / 20));
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


// not mine.
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
    if (currLen + c.length > chr) {
        acc.push([c]);

    // otherwise add it to the existing array
    } else {
        acc[currIndex].push(c);
    }

    return acc;

    }, [[]]);

    // Join up all the nested arrays
    const out = temp.map(arr => arr.join(' '));

    return out;
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
  
  /*Here*/

  /*
    Quotes:
    
        "Who is more Beautiful then these Flowers"
        "Who is the Thing I can't stop thinking about"
        "Roses are Red, Violets are Blue, and You're gorgeous too"
        "When I spell flowers they take my breath away. You also, take MY breath away"  <-- SPELL!?! Oops.
        "An apple a day, keeps the doctor away.  Maddie a day, keeps my heart beating all day."
        "Some say love is like a fire. I think it could be like Nuclear Fission, one little neutron ramming it’s self into a Uranium-235 Isotope creating huge amounts of power... But OUR love is more like Nuclear Fusion, smashing a Deuterium Isotope and a Tritium Isotope together making an indescribable amount of power. And that's how much I love you!"
        "Although you’ve graduated you will still say silly things, but I know you are VERY smart. I love the silly things you say and the smart things you say. But of course I love you!!! 🥰"
        "This flower is called The Yellow Jessamine, also known as the Carolina Jessamine. It is the South Carolina state flower. Although Michigan has a state flower, it is not my flower... You are my flower. My Beautiful Maddie."
        "Maddie, I had an absolute blast with you in Myrtle Beach! I had so much fun! I miss seeing your beautiful face at breakfast and throughout the day."
        "I miss you... I always do. I wish I could spend all of my time with you. Obviously, that's not realistic. A guy can dream. But only one guy can love you as much as I do.     (Hint: It's me)"
        "I have so much fun with you, Maddie. You are so fun. You make me so happy. Every moment is a joy. You are my best-er-est friend!!! I can even kiss you! And I can love you very much, which I do."
        "Maddie, I'm so glad can have hard conversations. It shows maturity in us, as individuals and as a couple. It means even when the goings get tough, we can make it though. We all miss up in life, even me, but that doesn’t mean your a bad person. You are the most amazing person in world. (As least to me)  Both of us will make more mistakes, (but NOT certain ones) but even through it all, I will love you, very much!"
        "Maddie you are amazing! I can't say it enough. I know you don't believe it sometimes, but you should. Just thinking of you brightens my day. Everything thing about you is incredible! Your Smarts, your Beauty, your Quirks, your Funniness, your Smile, your Laugh, your Personality... Yourself..... I will get into how beautiful you are, and why, next week."
        "You are so Beautiful. Your hair, your eyes, your face, your body. (Trying not to be weird) How you act is very attractive. The little esxpressions you make, and you being YOU. You have a good sense of humor and you laugh at my jokes. (Good OR Bad) In general, you have a great personally and a sweet heart. I will always tell you how beautiful you are, because you deserve it. I love you very much, and if ever you need me to remind you how beautiful you are, OR how smart you are, OR how much I love you... I gladly will. ❤️"

  */