'use strict';

//======================= Variables ================================================
var itemsArray =[];
var totalClicks = 0;
var maxClicks = 5;

//======================= Constructor's =============================================
function Item(imageSrc, caption)
{
  this.imageSrc = imageSrc;
  this.caption = caption;
  this.clicks = 0;
  this.shown = 0;
  itemsArray.push(this);
}

new Item('img/bag.jpg', 'R2-D2 Luggage');
new Item('img/banana.jpg', 'Banana Slicer');
new Item('img/bathroom.jpg', 'Potty Tablet Holder');
new Item('img/boots.jpg', 'Open Toe Rain Boots');
new Item('img/breakfast.jpg', 'All in One Breakfast Maker');
new Item('img/bubblegum.jpg', 'Bubblegum Flavored Meatballs');

//======================= Event Listeners ============================================

var targetId = document.getElementById('pics'); // Targeting section with pics for event listener
targetId.addEventListener('click', handleClickOnImg); //adding eventListener
//======================= Functions =================================================

function handleClickOnImg(event)
{
  if(event.target.tagName === 'IMG') // checks if click happened on a item
  {
    totalClicks++; //                   track of clicks
    if(totalClicks === maxClicks) //    run code when max clicks is reached
    {
      targetId.removeEventListener('click', handleClickOnImg); // removes listenere
      
      var favItemList = document.getElementById('itemTotals'); // get target for ul
      for(var i in itemsArray) //        run through all items in item array
      {
        var listItem = document.createElement('li');
        listItem.textContent = itemsArray[i].caption + ' was shown ' + itemsArray[i].shown + ' and was selected ' + itemsArray[i].clicks;
        favItemList.appendChild(listItem);
      }
    }

    var src = event.target.getAttribute('src'); //gets src from img clicked
    for (var i in itemsArray) //                 cycles though items in array
    {
      if(itemsArray[i].imageSrc === src) //      compares clicked img with array img
      {
        itemsArray[i].clicks++; //               tracks clicks on image
      }
    }
  }
  randomPic();
}
//---------------------------------------------------------------------------
function randomPic()
{
  var firstNum = randomizerForPics(0, itemsArray.length);
  var secondNum = randomizerForPics(0, itemsArray.length);
  var thirdNum = randomizerForPics(0, itemsArray.length);
  var img1 = document.getElementById('img1');
  var img2 = document.getElementById('img2');
  var img3 = document.getElementById('img3');
  var cap1 = document.getElementById('cap1');
  var cap2 = document.getElementById('cap2');
  var cap3 = document.getElementById('cap3');
  var tempCombo = [];
  var lastPicCombo = [];

  //wrap everything in a loop to test combos with last combos
  while(firstNum === secondNum || firstNum === thirdNum || secondNum === thirdNum || thirdNum === firstNum)
  {
    firstNum = randomizerForPics(0, itemsArray.length);
    secondNum = randomizerForPics(0, itemsArray.length);
    thirdNum = randomizerForPics(0, itemsArray.length);
  }
  //keeps track of times shown
  itemsArray[firstNum].shown++;
  itemsArray[secondNum].shown++;
  itemsArray[thirdNum].shown++;
  //changes image and caption
  img1.src = itemsArray[firstNum].imageSrc;
  img2.src = itemsArray[secondNum].imageSrc;
  img3.src = itemsArray[thirdNum].imageSrc;
  cap1.src = itemsArray[firstNum].caption;
  cap2.src = itemsArray[secondNum].caption;
  cap3.src = itemsArray[thirdNum].caption;
}

//---------------------------------------------------------------------------
function randomizerForPics(min ,max)
{
  return Math.floor(Math.random() * (max - min) + min); //returns a number between min and one less then max
}

randomPic();