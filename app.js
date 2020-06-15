'use strict';

//======================= Variables ================================================
var itemsArray =[];

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