/*
Name: Maddie's Weekly Flower

Maddie's favorite flower: Chrysanthemum

Date created: 10/18/22
Finished: 2/13/23
Given to Maddie: ?????

Last Updated: 2/13/23

*/

// Vars:

var image1;
var image2;

var Now = new Date();

/* Notes:
/ The month is 0-indexed: AKA: month - 1 /
/ Year, Month, Day, Hour, Minute, Seconds /
*/
var transitionDay = new Date(2023, 1, 13, 20, 35, 0);

// Horizontal : Vertical //
var photoStyle1 = "Vertical";
var photoStyle2 = "Horizontal";

// DeBug:
var imageSelect = false;

function preload()
{

    image1 = loadImage("Flowers/Chrysanthemum - 11:6-11:12.jpg");
    image2 = loadImage("Flowers/Chrysanthemum - 11:13-11:19.png");

}

function setup() 
{
    createCanvas(windowWidth, windowHeight);

    setInterval(function() 
    { 
        Now = new Date();

        console.log("Now:                    " + Now.toLocaleString());
        console.log("Transition Day:   " + transitionDay.toLocaleString());
        
        background(255);
        displayImage();

    }, 1000);

}

var i = 0;
    
function draw()
{

    if(i < 60)
    {
        i = frameCount;

        background(255);
        displayImage();
        
    }

    //console.log("Playing");
    //console.log("frameCount:" + i);
    
}

function displayImage()
{
    imageMode(CENTER);
    
    if(transitionDay.getTime() > Date.now() || imageSelect == 1)
    {
        image(image1, width / 2, height / 2, 0, 0);

        if(photoStyle1 == "Horizontal") image1.resize(width, 0);
        else if(photoStyle1 == "Vertical") image1.resize(0, height);

        console.log("Drawed Image 1");
    }
    
    else if(transitionDay.getTime() < Date.now() || imageSelect == 2)
    {
        image(image2, width / 2, height / 2, 0, 0);

        if(photoStyle2 == "Horizontal") image2.resize(width, 0);
        else if(photoStyle2 == "Vertical") image2.resize(0, height);

        console.log("Drawed Image 2");
    }
    
}
