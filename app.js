'use strict';

//======================= Variables ================================================
var itemsArray = [];
// Item.itemsArray = [];
var totalClicks = 0;
var maxClicks = 10;
//var picCombosUsed = [];
//var arrayIndex = 0;
var lastNumbers = [];

//======================= Constructor's =============================================
function Item(imageSrc, caption)
{
  this.imageSrc = imageSrc;
  this.caption = caption;
  this.clicks = 0;
  this.shown = 0;
  itemsArray.push(this);
  //Item.itemsArray.push(this);
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

//======================= Event Listeners ============================================

var targetId = document.getElementById('pics'); // Targeting section with pics for event listener
targetId.addEventListener('click', handleClickOnImg); //adding eventListener
//======================= Functions =================================================

function handleClickOnImg(event)
{
  totalClicks++; //                   tracks total number of clicks
  // console.log(event);
  var src = event.target.getAttribute('src'); //gets src from img clicked
  for (var j in itemsArray) //                 cycles though items in array
  {
    if(itemsArray[j].imageSrc === src) //      compares clicked img with array img
    {
      itemsArray[j].clicks++; //               tracks clicks on image
    }
  }

  if(event.target.tagName === 'IMG') // checks if click happened on a item
  {
    if(totalClicks === maxClicks) //    run code when max clicks is reached
    {
      targetId.removeEventListener('click', handleClickOnImg); // removes listenere
      document.getElementById('img1').style.display='none';
      document.getElementById('img2').style.display='none';
      document.getElementById('img3').style.display='none';
      document.getElementById('cap1').style.display='none';
      document.getElementById('cap2').style.display='none';
      document.getElementById('cap3').style.display='none';
      document.getElementById('theH1').textContent ='The Results of Your Clicking: ';

      var favItemList = document.getElementById('itemTotals'); // get target for ul
      for(var i in itemsArray) //        run through all items in item array
      {
        var listItem = document.createElement('li');
        listItem.textContent = itemsArray[i].caption + ' was shown ' + itemsArray[i].shown + ' and had ' + itemsArray[i].clicks + ' votes.';
        favItemList.appendChild(listItem);
      }
    }
  }
  randomPic();
}
//---------------------------------------------------------------------------
function randomPic()
{
  // var firstNum = randomizerForPics(0, itemsArray.length); // Get random numbers
  // var secondNum = randomizerForPics(0, itemsArray.length);
  // var thirdNum = randomizerForPics(0, itemsArray.length);
  var img1 = document.getElementById('img1'); // get target id's for images and captions
  var img2 = document.getElementById('img2');
  var img3 = document.getElementById('img3');
  var cap1 = document.getElementById('cap1');
  var cap2 = document.getElementById('cap2');
  var cap3 = document.getElementById('cap3');
  //debugger;
  var newNumbs = [];

  newNumbs = getNumbers(lastNumbers);
  lastNumbers = newNumbs;
  // newNumbs = checkForDoubles(firstNum, secondNum, thirdNum); // check for doubles
  // newNumbs = checkIfUsed(newNumbs[0], newNumbs[1], newNumbs[2]); //check if combination of numbers has been used
  // picCombosUsed[arrayIndex] = [newNumbs[0], newNumbs[1], newNumbs[2]]; //add combination used to array
  // console.log('picCombosUsed..', picCombosUsed);
  // arrayIndex++; // increase arry index for above array
  //keeps track of times shown
  itemsArray[newNumbs[0]].shown++;
  itemsArray[newNumbs[1]].shown++;
  itemsArray[newNumbs[2]].shown++;
  //changes image and caption
  img1.src = itemsArray[newNumbs[0]].imageSrc;
  img2.src = itemsArray[newNumbs[1]].imageSrc;
  img3.src = itemsArray[newNumbs[2]].imageSrc;
  // changes picture captions
  cap1.textContent = itemsArray[newNumbs[0]].caption;
  cap2.textContent = itemsArray[newNumbs[1]].caption;
  cap3.textContent = itemsArray[newNumbs[2]].caption;
  console.log(newNumbs[0], newNumbs[1], newNumbs[2]);


  //============= Not completely confident enough to get rid of code below yet==================================
  //===========================================================================================================
  // while(firstNum === secondNum || firstNum === thirdNum || secondNum === thirdNum || thirdNum === firstNum)
  // {
  //   firstNum = randomizerForPics(0, itemsArray.length);
  //   secondNum = randomizerForPics(0, itemsArray.length);
  //   thirdNum = randomizerForPics(0, itemsArray.length);
  // }
 
  // Creates a array of array for double checking if picture combo has been ran
  // picCombosUsed[arrayIndex] = [firstNum, secondNum, thirdNum,];
  
  // for (var k in picCombosUsed)
  // {
  //   if((firstNum === picCombosUsed[k][0] || firstNum === picCombosUsed[k][1], firstNum === picCombosUsed[k][2]) && (secondNum === picCombosUsed[k][0] || secondNum === picCombosUsed[k][1], secondNum === picCombosUsed[k][2]) && (thirdNum === picCombosUsed[k][0] || thirdNum === picCombosUsed[k][1] || thirdNum === picCombosUsed[k][2] ))
  //   {

  //     do
  //     {
  //       firstNum = randomizerForPics(0, itemsArray.length);
  //       secondNum = randomizerForPics(0, itemsArray.length);
  //       thirdNum = randomizerForPics(0, itemsArray.length);
  //     }
  //     while(firstNum === secondNum || firstNum === thirdNum || secondNum === thirdNum || thirdNum === firstNum);
  //   }
  // }
}
//--------------------------------------------------------
//https://www.tutorialrepublic.com/faq/how-to-check-if-a-value-exists-in-an-array-in-javascript.php
function getNumbers(lastNums)
{
  do
  {
    var num1 = randomizerForPics(0, itemsArray.length);
  }while(lastNums.includes(num1));

  do
  {
    var num2 = randomizerForPics(0, itemsArray.length);
  }while(num2 === num1 || lastNums.includes(num2));
  do
  {
    var num3 = randomizerForPics(0, itemsArray.length);
  }while(num3 === num1 || num3 === num2 || lastNums.includes(num3));
  return [num1, num2, num3];
}


// function getNumbers(lastNums)
// {
//   do
//   {
//     var num1 = randomizerForPics(0, itemsArray.length); // Get random numbers
//     var num2 = randomizerForPics(0, itemsArray.length);
//     var num3 = randomizerForPics(0, itemsArray.length);
//     var allNumbers = [num1, num2, num3];
//     for(var i = 0; i < allNumbers.length; i++)
//     {
//       while(lastNums.includes(allNumbers[i]))
//       {
//         allNumbers[i] = randomizerForPics(0, itemsArray.length);
//       }
//     }
//   } while(allNumbers[0] === allNumbers[1] || allNumbers[0] === allNumbers[2] || allNumbers[1] === allNumbers[2]);
//   return allNumbers;
// }

// var otherFruits = ['grapes', 'kiwi', 'pinapple','Apple'];
// var fruits = ["Apple", "Banana", "Mango", "Orange", "Papaya"];
// if (fruits.includes(fruits[1]))
// {
//   console.log('found bananas');
// }
// if (fruits.includes(otherFruits[3]))
// {
//   console.log('found apples');
// }
//--------------------------------------------------------------------------
// function checkIfUsed(num1, num2, num3)
// {
//   //debugger;
//   for (var k in picCombosUsed)
//   {
//     if((num1 === picCombosUsed[k][0] || num1 === picCombosUsed[k][1] || num1 === picCombosUsed[k][2]) &&
//     (num2 === picCombosUsed[k][0] || num2 === picCombosUsed[k][1] || num2 === picCombosUsed[k][2]) &&
//     (num3 === picCombosUsed[k][0] || num3 === picCombosUsed[k][1] || num3 === picCombosUsed[k][2] )) // check numbers against array
//     {// if number combo has been used get and make sure they aren't doubles
//       do
//       {
//         num1 = randomizerForPics(0, itemsArray.length);
//         num2 = randomizerForPics(0, itemsArray.length);
//         num3 = randomizerForPics(0, itemsArray.length);
//       }
//       while(num1 === num2 || num1 === num3 || num2 === num3 || num3 === num1);
//       checkIfUsed(num1, num2, num3); // check if new numbers have been used
//     }
//     else
//     {
//       return [num1, num2, num3]; // return if numbers havn't been used
//     }
//   }
//   return [num1, num2, num3]; // return if picCombosUsed array is empty
// }
//--------------------------------------------------------------------------
// function checkForDoubles(num1, num2, num3)
// {
//   while(num1 === num2 || num1 === num3 || num2 === num3)
//   {
//     num1 = randomizerForPics(0, itemsArray.length);
//     num2 = randomizerForPics(0, itemsArray.length);
//     num3 = randomizerForPics(0, itemsArray.length);
//   }
//   return [num1, num2, num3];
// }

//---------------------------------------------------------------------------
function randomizerForPics(min ,max)
{
  return Math.floor(Math.random() * (max - min) + min); //returns a number between min and one less then max
}

//======================== chart.js ================================================
var ctx = document.getElementById('clickChart').getContext('2d');
var myChart = new Chart(ctx,
  {
    type: 'bar',
    data: {
      labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
      datasets: [{
        label: '# of Votes',
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1
      }]
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


// if (fruits.includes(fruit[1]))
// {
//   console.log('found bananas');
// }
// if(fruits.includes())
// if(fruits.includes())
// alert(fruits.includes("Banana")); // Outputs: true
// alert(fruits.includes("Coconut")); // Outputs: false
// alert(fruits.includes("Orange")); // Outputs: true
// alert(fruits.includes("Cherry")); // Outputs: false

randomPic();
