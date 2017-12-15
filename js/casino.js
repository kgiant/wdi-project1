$(()=>{

  const $balance = $('#balance');
  const $images = $('.image');
  const $msgScreen = $('.msgScreen');
  const $select = $('select.wager');
  const $selectWM = $('select.winMult');
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

  let gameCount = 0;

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

  $select.on('change', (e) => {  // get wager amount
    wager = parseInt($(e.target).val());
  });

  $selectWM.on('change', (e) => {  // get wager multiple
    winMult = parseInt($(e.target).val());
  });

  $form.on('submit', () => {    // bet and play
    totalBet = wager * winMult;
    console.log(totalBet);
    play();
  });

  function play(){   // play function was taken out of the form so that it can be used in second level
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

  $images.on('click', (e) => {    // selecting squares from the grid
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
        gameCount +=1;
        checkResults();
      }
    }
  });  //need to add a controler that prevents clicking on the same element more than one time

  // checks if the three picks are of the same type
  function checkResults(){
    if (pickArray[0] === pickArray[1] && pickArray[1] === pickArray [2]){
      if (gameCount > 1){  //checks if this is the second level, if yes credits account and resets
        totalWin = totalBet * cardValue[spinIndex] * 2;
        resetWin();
        // dOnStatus = false;
      } else {    // since first round win, asks for double down and either starts another round or credits account and resets
        const temp = confirm('Congratulations, You have won! Are you up to a challenge? Pick another winning set and we will double your winnings!');
        if (temp === true){
          credit = credit + totalWin;
          totalBet = totalWin;
          $balance.html(credit);
          play();
        } else {
          resetWin();
        }
      }
    } else {    // when loosing debits account and resets
      $msgScreen.html('Sorry! Maybe next time. Have another go!');
      credit = credit - totalBet;
      $balance.html(credit);
      clickCount = 0;
      gameCount = 0;
    }
  }

  function resetWin(){
    $msgScreen.html(`Congratulations, you have won ${totalWin}GBP!`);
    credit = credit + totalWin;
    $balance.html(credit);
    clickCount = 0;
    gameCount = 0;
  }
});
