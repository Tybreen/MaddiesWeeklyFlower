/*
Name: Maddie's Weekly Flower

Maddie's favorite flower: Chrysanthemum

Date created: 10/18/22
Given to Maddie: ?????

Last Updated to GitHub: 2/13/23

*/

// Vars:

var image1;
var image2;

var currentImage = 0;

var Now = new Date();

var DarkMode = false;

var toggleText = false;

/* Notes:
/ The month is 0-indexed: AKA: month -1 /
/ Year, Month, Day, Hour, Minute, Seconds /
*/
var transitionDay = new Date(2023, 3, 30, 0, 0, 0);

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

        console.log("Now:                    " + Now.toLocaleString());
        console.log("Transition Day:   " + transitionDay.toLocaleString());
        console.log("Drawed Image " + currentImage);

        
        displayBackground();
        displayImage();

        if(toggleText)
        {
            textAlign(RIGHT);
            textSize(height / 40);

            if(DarkMode) fill(255);
            else fill(0);

            text("To Maddie", width - 10, height - (height / 12));
            text("Who is more Beautiful then these Flowers", width - 10, height - (height / 20));
            text("Love, Tyler", width - 10, height - (height / 60));
        }

    }, 1000);

    

}

var i = 0;
    
function draw()
{

    if(i < 5)
    {
        i = frameCount;

        displayBackground();
        displayImage();
        
    }

    //console.log("Playing");
    //console.log("frameCount:" + i);
    
}

function mousePressed()
{
    toggleText = true;
    setTimeout(() => { toggleText = false }, 6000);
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
