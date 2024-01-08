/* 

Name: Maddie's Weekly Flower

Maddie's favorite flower: Chrysanthemum

Date created: 10/18/22
Given to Maddie: 4/21/23
*/

//* Here
var lastPublishedToGitHub = "Last Published to GitHub: 1/8/23";

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
//* Here
var transitionDay = new Date(2023, 0, 7, 0, 0, 0);
var nextTransitionDay = new Date(2024, 0, 14, 0, 0, 0);

var dayWeStartedDating = new Date(2022, 9, 22, 17, 30, 0);

//* Here
var quote = "I'm sorry I missed updating your website last week (AGAIN!). It was a big week. But now that I am back into my regular rhythm, I do better. You are such good company! I always love hanging out with you. Playing Smash with you so much fun. I never feel nervous with you anymore. I'm so happy for that. I love you so much Sweetheart!";

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
    image1 = loadImage("Flowers/Week 37.jpg.webp");
    image2 = loadImage("Flowers/Week 38.jpg");

}

function setup() 
{
    createCanvas(windowWidth, windowHeight);

    console.log(lastPublishedToGitHub);

    displayBackground();    

    setInterval( function() 
    { 
        Now = new Date();

        // console.log("Now:                    " + Now.toLocaleString());
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

    if(DarkMode) fill(255);
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
  
  //* Here

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
        "I can't believe our dating anniversary is just around the corner! Although it's only two months in a little bit, I can't wait for it to be here, because that means I just spent two MORE months with YOU! Every second of being your Special Someone has been an absolute joy. I regret nothing. I love you crazy much!!!"
        "You are incredible. Absolutely amazing. Such a joy to spend time with you. My best friend. My confidant. My ONLY Love.  All these attributes describe only one person... You! I hope you believe each and everyone of them."
        "So... what I want to do this time is as soon as you read this, you text me and ask me to tell you how much I love you and why, and I will answer you as soon as I can. 😊"   Answer: Well, where do I start... (I will ramble, so I'm sorry) ... Maddie you are the most amazing thing in my life. I am so glad I worked up the courage to ask you out. I can say I had so much anxiety about you not liking me or me not cutting out for you. I liked you for a long time by then and I knew you for a few months. I was very scared, but I finally worked up the courage to ask you and you said yes, but I was still crazy nervous because I've never done dating before. You don't realize how amazing you are… I don't want to lose you after just just realizing that you liked me too. For the first few (or more than a few) dates, I made so much attention to detail on how I looked, what we would you do, what would I talk about if there is a lull in the conversation, when to hold your hand or not, or when weather to give you a first kiss. Again, I was terrified... I don't feel terrified with you anymore. You are my best friend. I enjoy so much spending time with you. You make me so happy inside I wish you knew how I felt when I am with you. I wish I could show you how much I love you but words can't describe it. I remember a text message that I said "you were my first ____ " and went on for a little bit. That was me telling you that I loved you without actually saying those three words. I've never love someone like I do you. You are amazing, you are beautiful, you are so kind, so funny.  You are so special and you are so special in my heart. We have gone through some sticky situations and I believe that's only made our relationship stronger. It was hard going through that. I was scared, but afterwards it just made me love you even more.       I hope I explained how much I love you and why. If ever you need reminding please just ask. I'll try my best and fail miserably because I love you that much and I could never describe. ❤️         I got a little emotional... because I love you so much.
        "I love you.     I think that is all that is needed to say this week."
        "You Fascinate me... You are a mystery. Every single day I wonder what you're doing. Anything I learn about you I try to remember to heart. (Although I'm terrible at remembering things) Someday I hope I know everything about you, but I will always want you to be a mystery. I love you, Maddie!"
        "I know this will be (OR has been) my best birthday ever. One of the biggest reasons is because I get to have you. I am so lucky to have you. I hope I can show you, as much as I can, how much I love you. I love you Maddie. ❤️"
        "I miss you. I adore you. I love you... I will miss you, always. I will adore you, always. I will love you, always."
        "I missed you so much. You are so fun to be around. I enjoy every second I am with you. You are truly amazing. I love that we can share tea together. I can't wait to see you!"
        "Your voice is so amazing! I love hearing it and it makes me smile so much. Sammy has a great voice too but I think yours is better. But I know I'm biased by that. 😁 I love your voice, but I love you more."
        "1 YEAR!!! Wow! I can't believe it! It's been an absolute joy to be dating you and in your life for one whole year. I can't wait for the next one! I love so very much!"
        "You're a stinker... Yeah I said it. You are! You drive me crazy, but even still, I'm so happy you're my best friend and my kissing coach. 💋"
        "You are my light at the end of the tunnel, I will always want to get to it."
        "Hi Love... you're silly, and I love it. But guess what I love more..... I'll wait.......... Fine! I'll tell you, yeesh... YOU!!!!! 😘  You're sus too."
        "Maddie, I love you. Never, EVER, doubt that I don't."
        "I am so thankful of you! You make me so happy. Just the sight of you makes me happy. A single word from your mouth makes me happy. A single touch from you makes me happy. I could keep going on forever, but the long and short of it is, You, Maddie, make me so happy! I love you so much!"
        "I have shown you 33 pictures of flowers and I have never regreted it. You make my life so happy. I hope every little flower I send you makes you a little more happy. I love you Sweetheart."
        "I think this week's flower is really unique, just like you! You really are something. You're beautiful, you're nerdy, you're sus, you're funny. You don't normally find all those qualities in a girl. I really did hit the jackpot!!!"
        "You're here! In Myrtle Beach! We are going to have so much fun! You know why? Because you are so fun! I love you so much!"
        "I miss you. I hope you enjoyed Myrtle Beach. I know I did! I love my watch so much! I can't wait to show you it, on my arm. I love you so much!!!";
        "I'm sorry I missed updating your website last week. Hey, 37 weeks isn't bad. I can't wait to get to 52 weeks! That will be a day. Anyway, I love you. You mean the world to me! And... I guess I'll keep you. 😉"
        "I'm sorry I missed updating your website last week (AGAIN!). It was a big week. But now that I am back into my regular rhythm, I do better. You are such good company! I always love hanging out with you. Playing Smash with you so much fun. I never feel nervous with you anymore. I'm so happy for that. I love you so much Sweetheart!"
        
  */