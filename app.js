'use strict';
//======================= Variables ================================================
var itemsArray = [];
var totalClicks = 0;
var maxClicks = 25;
var lastNumbers = [];
var images2show = 3;

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
new Item('img/chair.jpg', 'Inverted Chair');
new Item('img/cthulhu.jpg', 'Chulhu Action Figure');
new Item('img/dog-duck.jpg', 'Duckbill for Dogs');
new Item('img/dragon.jpg', 'Dragon Meat');
new Item('img/frosted-cookie.jpg', 'Salmon Cookies!!!');
new Item('img/pen.jpg', 'Pen-ware');
new Item('img/pet-sweep.jpg', 'Pet Sweep');
new Item('img/scissors.jpg', 'Pizza Scissors');
new Item('img/shark.jpg', 'Shark Sleeping Bag');
new Item('img/sweep.png', 'Baby Mop');
new Item('img/tauntaun.jpg', 'Tauntaun Sleeping Bag');
new Item('img/unicorn.jpg', 'Unicorn Meat');
new Item('img/usb.gif', 'USB Tentacle');
new Item('img/water-can.jpg', 'Never Empty Water Can');
new Item('img/wine-glass.jpg', 'AA members Wine Glass');

var itemsFromStorage = localStorage.getItem('itemsInStorage'); //get from locale storage
var newItemsArray = JSON.parse(itemsFromStorage); // unstring

if(newItemsArray)
{
  itemsArray = newItemsArray;
}

//======================= Event Listeners ============================================

var targetId = document.getElementById('pics'); // Targeting section with pics for event listener
targetId.addEventListener('click', handleClickOnImg); //adding eventListener
//======================= Functions =================================================
function handleClickOnImg(event)
{
  if(event.target.tagName === 'IMG') // checks if click happened on a item
  {
    totalClicks++; //                   tracks total number of clicks

    var src = event.target.getAttribute('src'); //gets src from img clicked
    for (var j in itemsArray) //                 cycles though Items in array
    {
      if(itemsArray[j].imageSrc === src) //      compares clicked img with array img
      {
        itemsArray[j].clicks++; //               tracks clicks on image
      }
    }

    var itemsStorage = JSON.stringify(itemsArray); //          covert array to string
    localStorage.setItem('itemsInStorage', itemsStorage); //   send string to local storage

    if(totalClicks === maxClicks) //    run code when max clicks is reached
    {
      targetId.removeEventListener('click', handleClickOnImg); // removes listenere
      // change h1 text
      document.getElementById('theH1').textContent ='The Results of Your Clicking:';

      //https://stackoverflow.com/questions/5780921/how-to-hide-all-images-using-javascript
      var images = document.getElementsByTagName('img'); // clears imgs
      for (var i = 0; i < images.length; i++)
      {
        images[i].style.display = 'none';
      }
      var captions = document.getElementsByTagName('p'); //clears captions
      for (var k = 0; k < images.length; k++)
      {
        captions[k].style.display = 'none';
      }
      makeGraph();
    }else{
      dynamicPics();
    }
  }
}

//--------------------------------------
function dynamicPics()
{
  document.getElementById('pics').innerHTML = ''; // clears old pics

  var newNumbs = getNumbers(); //get random numbers

  for(var i in newNumbs)
  {
    var sec = document.getElementById('pics'); //find section to place images
    var div = document.createElement('div'); // create div to hold img and caption
    var pTag = document.createElement('p'); // create pTag for caption
    pTag.textContent = itemsArray[newNumbs[i]].caption; //put caption for img in pTag
    var img = document.createElement('img'); // create img element
    img.src = itemsArray[newNumbs[i]].imageSrc; // put path to img on element
    div.appendChild(img); // attach img to div
    div.appendChild(pTag); // attach pTag to div
    sec.appendChild(div); // attach div to section

    itemsArray[newNumbs[i]].shown++; // increment number of times img was shown
  }
}
//----------------------------------------------------------------------------------
//https://www.tutorialrepublic.com/faq/how-to-check-if-a-value-exists-in-an-array-in-javascript.php
function getNumbers() //This might be different but is thanks to Matthew Herriges awesome do loop
{
  do{
    var numbers = []; // create array for numbers
    var alreadyUsed = false; // set flag
    for(var i = images2show; i > 0; i--) //get as many numbers as set in images2show
    {
      do{
        var num = randomizerForPics(0, itemsArray.length); //get random #
      }while(numbers.includes(num)); // check for doubles
      numbers.push(num); //add to numbers array
    }

    for(var j in numbers) //loop through each number in array
    {
      if (lastNumbers.includes(numbers[j])) //check if number was used last time
      {
        alreadyUsed = true; // set flag to true if number was found
      }
    }
  }while(alreadyUsed === true); // get new numbers if flag was set to true

  lastNumbers = numbers; //set new numbers to last numbers array
  return numbers;
}

//---------------------------------------------------------------------------
function randomizerForPics(min ,max)
{
  return Math.floor(Math.random() * (max - min) + min); //returns a number between min and one less then max
}
//------------------------------------------------------------------
function makeGraph()
{
  //variables to load with data for chart
  var titles = [];
  var allClicks = [];
  var totalShown = [];

  for(var i in itemsArray)
  { // push data for each item into array
    totalShown.push(itemsArray[i].shown);
    allClicks.push(itemsArray[i].clicks);
    titles.push(itemsArray[i].caption);
  }

  var ctx = document.getElementById('clickChart').getContext('2d');
  var myChart = new Chart(ctx,
    {
      type: 'bar',
      data: {
        labels: titles,
        datasets: [{
          label: 'Clicks',
          data: allClicks,
          backgroundColor: [
            'red','red','red','red','red',
            'red','red','red','red','red',
            'red','red','red','red','red',
            'red','red','red','red','red',
            'red','red','red','red','red',
          ],
          borderColor: [
            'red','red','red','red','red',
            'red','red','red','red','red',
            'red','red','red','red','red',
            'red','red','red','red','red',
            'red','red','red','red','red',
          ],
          borderWidth: 1
        },
        {
          label: 'Shown',
          data: totalShown,
          backgroundColor: [
            'yellow','yellow','yellow','yellow','yellow',
            'yellow','yellow','yellow','yellow','yellow',
            'yellow','yellow','yellow','yellow','yellow',
            'yellow','yellow','yellow','yellow','yellow',
            'yellow','yellow','yellow','yellow','yellow',
          ],
          borderColor: [
            'yellow','yellow','yellow','yellow','yellow',
            'yellow','yellow','yellow','yellow','yellow',
            'yellow','yellow','yellow','yellow','yellow',
            'yellow','yellow','yellow','yellow','yellow',
            'yellow','yellow','yellow','yellow','yellow',
          ],
          borderWidth: 1
        }],
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });
}

dynamicPics();
