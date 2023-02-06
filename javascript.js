$("#instruction").show();
var playing = false;
var score;
var live;
var step;
var action;
var bombcount;
var fruits = ['apple', 'pineapple', 'orange', 'grapes', 'peach', 'strawberry', 'banana', 'watermelon', 'bomb'];

$(function () {
    //click on start/reset button
    $("#startreset").click(function () {
        //if we are already playing
        if (playing == true) {
            //then reset everything
            location.reload();
        }

        //if we are not playing
        else {
            //then set bomb count to 0
            bombcount = 0;

            //and hide instructions
            $("#instruction").hide();

            //and show screen
            $("#screen").show();

            //and initaite game by setting playing to true
            playing = true;

            //and set score to zero
            score = 0;
            $("#scorecount").html(score);

            //and show lives counter and set it to 3
            $("#live").show();
            live = 3;
            setlive();

            //and show score
            $("#score").show();

            //and change button text to reset
            $("#startreset").html("Reset Game");

            //and finally start the action
            dropfruits();
        }
    });

    //cut items with mouse
    $("#fruit1").mouseover(function () {
        //if you touch a bomb
        var s = $("#fruit1").attr('src');
        if (s == 'images/bomb.png') {   //then lose a life
            live--;
            setlive();
            //also if it was your last life
            if (live == 0) {
                //then end the game
                endgame();
            }
        }
        //if you cut a fruit
        else {   //then score will increase
            score += 5;
        }
        //touching any item will play a sound effect
        $("#sound")[0].play();

        //update score
        $("#scorecount").html(score);

        //stop that item that you just touched
        clearInterval(action);
        $("#fruit1").hide();

        //throw new items
        setTimeout(dropfruits(), 500);
    });

    //function to update lives counter
    function setlive() {
        $("#live").empty();
        for (i = 0; i < live; i++) {
            $("#live").append('<img src="images/heart.png" class = "life">');
        }
    }

    //main function to drop fruits
    function dropfruits() {

        $("#fruit1").show();
        //choose a fruit or bomb randomly
        chooseFruit();

        //set it to a random place
        $("#fruit1").css({ 'left': Math.round(480 * Math.random()), 'top': -100 });
        step = 1 + Math.round(7 * Math.random());

        //drop it from that place
        action = setInterval(function () {
            $("#fruit1").css('top', $("#fruit1").position().top + step);

            //check if the item reaches the bottom
            if ($("#fruit1").position().top > $("#screen").height()) {

                $("#fruit1").show();
                //then again choose random fruit
                chooseFruit();
                //and again set it to a random place
                $("#fruit1").css({ 'left': Math.round(480 * Math.random()), 'top': -100 });
                step = 1 + Math.round(7 * Math.random());
            }
        }, 10);
    }

    //function to choose a random fruit
    function chooseFruit() {
        var i = Math.round(8 * Math.random());
        $("#fruit1").attr('src', 'images/' + fruits[i] + '.png');
    }

    //function to end the game
    function endgame() {
        $("#losesound")[0].play();
        $("#screen").hide();
        $("#live").hide();
        $("#score").hide();
        $("#gameover").show();
        $("#okay").show();
        $("#startreset").hide();
        $("#gameover").html('<br/><br/>GAME OVER!<br/>YOUR SCORE IS ' + score);
        clearInterval(action);
        $("#fruit1").hide();
    }

    //when click on ok button, window restarts
    $("#okay").click(function () {
        location.reload();
    });
});