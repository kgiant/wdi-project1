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
  // let totatWin = 0;
  // let totalLoss = 0;
  let spinIndex = 0;
  let cardPicked = '';
  // let msg = 'Hi there, ready to play?';
  let clickCount = 0;
  let gameRunning = false;
  // let message = '';

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
  // this is the value of each card, say Aces give you a bigger win multiple than 3s
  // const cardValue = {
  //   card1: 1,
  //   card2: 2,
  //   card3: 3,
  //   card4: 5,
  //   card5: 8,
  //   card6: 15
  // };

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
    console.log(wager, winMult, totalBet);
    $images.attr('src', 'images/img9.png');
    $msgScreen.html('Lets play!');
    event.preventDefault();
    totalBet = wager * winMult;
    // console.log(wager, winMult, totalBet, totalBet < credit);
    if (totalBet > credit){
      // msg = 'You have insufficient credit for this bet. Please change your selection or add additional credits';
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
      // console.log($(e.target));
      cardPicked = cardArray[spinIndex];
      const $clickedImage = $(e.target);
      $clickedImage.attr('src', `images/${cardPicked}`);
      // $image.css('background-image', `images/${cardPicked}`);
      if (clickCount === 3){
        gameRunning = false;
        checkSelect();
      }
    }
  });

  function checkSelect(){
    if (pickArray[0] === pickArray[1] && pickArray[1] === pickArray [2]){
      // totalWin = totalBet;    //* cardValue(...need to identify);
      // msg = `Congratulations! You have won ${totalWin}`; // check {}format
      $msgScreen.html(`Congratulations! You have won ${totalBet}GBP`);
      credit = credit + totalBet;
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

// function doubleIt(){
//         $msgScreen.html(`Congratulations! You have won ${totalBet}GBP. Now, want to play double or nothing?`);
//
// }


  // function reset(){
  //   $msgScreen.html(msg);
  //   $balance.html(credit);
  //   clickCount = 0;
  // }

});
