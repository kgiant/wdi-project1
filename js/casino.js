$(()=>{

  const $balance = $('#balance');
  const $images = $('.image');
  const $msgScreen = $('.msgScreen');
  const $select = $('select.wager');
  const $selectWM = $('select.winMult');
  const $button = $('.bet');
  let pickArray = [];
  const $form = $('form');
  let credit = 1000;
  let wager = 5;  //initial value
  let winMult = 2; //initial value
  let totalBet = 0;
  let totatWin = 0;
  let spinIndex = 0;
  let cardPicked = '';
  let clickCount = 0;
  let gameRunning = false;
  let dOnStatus = false;
  let doubleBet = 0;

  // set of images - increase the number of array values to increase difficulty
  const cardArray = [
    'img1.png',
    'img2.png',
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

  // bet and play
  $form.on('submit', () => {
    $images.attr('src', 'images/img9.png');
    $msgScreen.html('Lets play!');
    event.preventDefault();
    totalBet = wager * winMult;
    if (totalBet > credit){
      $msgScreen.html('Insufficient credit for this bet. Please change your selection or add credits');
      return; // exit
    } else {
      gameRunning = true;
      $images.css('background-image', 'images/img9.png');    // add a standard image over all boxes
      pickArray = [];
    }
  });

  $images.on('click', (e) => {
    console.log('clicked image');
    if (gameRunning === true){
      clickCount +=1;
      spinIndex = Math.floor(Math.random()*(cardArray.length));
      // fade away clicked grey image
      //add image to pickArray
      pickArray.push(spinIndex);
      cardPicked = cardArray[spinIndex];
      const $clickedImage = $(e.target);
      $clickedImage.attr('src', `images/${cardPicked}`);
      if (clickCount === 3){
        gameRunning = false;
        checkSelect();
      }
    }
  });

  function checkSelect(){
    if (pickArray[0] === pickArray[1] && pickArray[1] === pickArray [2]){
      totalWin = totalBet * cardValue[spinIndex];
      $msgScreen.html(`Congratulations, you have won ${totalWin}GBP!`);
      credit = credit + totalWin;
      $balance.html(credit);
      clickCount = 0;
    } else {
      // const totalLoss = totalBet;
      $msgScreen.html('Sorry! Maybe next time. Have another go!');
      credit = credit - totalBet;
      $balance.html(credit);
      clickCount = 0;
    }
  }

  // THE FOLOWING SECTION RELATES TO THE NEXT GAME LEVEL OFFERING A WINNER THE OPTION
  // TO DOUBLE DOWN ON ITS WIN
  // function doubleIt(){
  // // change class
  // // get wager amount
  //
  // if (noDoub === true){
  //   credit = credit + totalWin;
  //   $balance.html(credit);
  //   clickCount = 0;
  // }
  // if (yesDoub === true) {
  //     doubleBet = totalWin;
  //     play(); // need to adapt the form function and find a way to adjust
  // the bet amount by shifting some commands to an external function
  // }
  //
  // $('#noDoub').on('submit', (e) => {});
  //
  // $('doubleOrnothing goaway').removeClass('goaway');
  // });
  // $('#yesDoub').on('submit', (e) => {
  //
  // });

  // // }
  //
  //
  // function reset(){
  //   $msgScreen.html(msg);
  //   $balance.html(credit);
  //   clickCount = 0;
  // }

});
