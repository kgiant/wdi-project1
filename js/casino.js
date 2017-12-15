$(()=>{

  const $balance = $('#balance');
  const $images = $('.image');
  const $msgScreen = $('.msgScreen');
  const $select = $('select.wager');
  const $selectWM = $('select.winMult');
  const $noDoub = $('#noDoub');  //for second level
  const $yesDoub = $('#yesDoub');  //for second level
  let pickArray = [];
  const $form = $('form');
  let credit = 1000;
  let wager = 5;
  let winMult = 2;
  let totalBet = 0;
  let totalWin = 0;
  let spinIndex = 0;
  let cardPicked = '';
  let clickCount = 0;
  let gameRunning = false;
  let dOnStatus = false; //for second level

  // set of images - increase the number of array values to increase difficulty
  const cardArray = [
    'img1.png',
    // 'img2.png',
    // 'img3.png',
    // 'img4.png',
    // 'img5.png',
    // 'img6.png',
    'img7.png'
  ];
  // this is the value of each card, say Sevens give you a bigger win multiple than Oranges
  const cardValue = [
    // 1,
    // 2,
    // 3,
    5,
    // 8,
    15
  ];

  $balance.html(credit);
  $msgScreen.html('Hi there, ready to play?');

  // get wager amount
  $select.on('change', (e) => {
    wager = parseInt($(e.target).val());
  });

  // get wager multiple
  $selectWM.on('change', (e) => {
    winMult = parseInt($(e.target).val());
  });

  $noDoub.on('click', () => {
    credit = credit + totalWin;
    $balance.html(credit);
    clickCount = 0;
    gameRunning = false;
  });

  $yesDoub.on('click', () => {
    credit = credit + totalWin;
    totalBet = totalWin;
    dOnStatus = true;
    play();
    dOnStatus = false;
  });

  // bet and play
  $form.on('submit', () => {
    totalBet = wager * winMult;
    play();
  });

  // play function was taken out of the form so that it can be used in second level
  function play(){
    clickCount = 0;
    $images.attr('src', 'images/img9.png');
    $msgScreen.html('Lets play!');
    event.preventDefault();
    if (totalBet > credit){
      $msgScreen.html('Insufficient credit for this bet. Please change your selection or add credits');
      return; // exit
    } else {
      gameRunning = true;
      $images.css('background-image', 'images/img9.png');    // adds a standard image "Q" over all boxes
      pickArray = [];
    }
  }

// selecting squares from the grid
  $images.on('click', (e) => {
    console.log('clicked image');
    if (gameRunning === true){
      clickCount +=1;
      spinIndex = Math.floor(Math.random()*(cardArray.length));
      pickArray.push(spinIndex);
      cardPicked = cardArray[spinIndex];
      const $clickedImage = $(e.target);
      $clickedImage.attr('src', `images/${cardPicked}`);
      $clickedImage.toggleClass('rubberBand');
      if (clickCount === 3){
        gameRunning = false;
        checkResults();
      }
    }
  });

// check if the three picks are of the same type
  function checkResults(){
    if (pickArray[0] === pickArray[1] && pickArray[1] === pickArray [2]){
      // totalWin = totalBet * cardValue[spinIndex];
      const temp = false; // remove when the popup is added
      const roundWin = totalBet * cardValue[spinIndex];
      totalWin = temp === true? roundWin * 2: roundWin; //replace temp with dOnStatus
      $msgScreen.html(`Congratulations, you have won ${totalWin}GBP!`);
      credit = credit + totalWin;
      $balance.html(credit);
      clickCount = 0;
    } else {
      $msgScreen.html('Sorry! Maybe next time. Have another go!');
      credit = credit - totalBet;
      $balance.html(credit);
      clickCount = 0;
    }
  }

});
