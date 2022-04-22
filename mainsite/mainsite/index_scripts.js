$( document ).ready(function() {

    //TODO maybe fix board so can have image.
    //TODO clean and improve code/logic where possible

    //TODO figure out why jquery wont work for setting tableData.
    var pt1_A = document.getElementById("pt1_A");
    var pt2_A = document.getElementById("pt2_A");
    var pt3_A = document.getElementById("pt3_A");
    var pt4_A = document.getElementById("pt4_A");
    var pt5_A = document.getElementById("pt5_A");
    var pt6_A = document.getElementById("pt6_A");
    var pt7_A = document.getElementById("pt7_A");
    var pt8_A = document.getElementById("pt8_A");
    var pt9_A = document.getElementById("pt9_A");
    var pt10_A = document.getElementById("pt10_A");
    var pt1_B = document.getElementById("pt1_B");
    var pt2_B = document.getElementById("pt2_B");
    var pt3_B = document.getElementById("pt3_B");
    var pt4_B = document.getElementById("pt4_B");
    var pt5_B = document.getElementById("pt5_B");
    var pt6_B = document.getElementById("pt6_B");
    var pt7_B = document.getElementById("pt7_B");
    var pt8_B = document.getElementById("pt8_B");
    var pt9_B = document.getElementById("pt9_B");
    var pt10_B = document.getElementById("pt10_B");

    // put each element in list for easy access.
    var tableDataCells = [ pt1_A, pt2_A, pt3_A, pt4_A, pt5_A, pt6_A, pt7_A, pt8_A, pt9_A, pt10_A,
        pt1_B, pt2_B, pt3_B, pt4_B, pt5_B, pt6_B, pt7_B, pt8_B, pt9_B, pt10_B ];


    /*
alert( localStorage.getItem("currentGameId") );
alert(localStorage.getItem("currentPlayerOne") );
alert(localStorage.getItem("currentPlayerTwo") );

 */

    /*
    var playerData3 = [];

    $.ajax({ //start ajax call
        dataType: 'json',
        type: 'POST',
        url: 'get_game_by_id.php',
        success: function (data1) { // start ajax success function
            //playerTableData = data;
            alert(JSON.stringify(data1));
            playerData3 = data1;
        },
    });

    alert(playerData3);
     */


    /*
     * script to use the current game id var set through the login.
     * get value from local storage and return/set player names.
     */
    $.ajax({
        dataType: 'json',
        type: 'POST',
        url: 'get_game_by_id.php',
        data: {
            currentGameId: localStorage.getItem("currentGameId")
        },
        success: function (data) {
            //alert(data[0].p1 + data[0].p2);
            //alert("game created");
            $("#player_a").html( data[0].p1 );
            $("#player_b").html( data[0].p2 );

        }


    });

    if (isFiveOrTenafterRemove() === 0){
        $('#kill_shot_btn_container_left').height( 0 );
        $('#kill_shot_btn_container_right').height( 0 );
        $('#switch_sides_btn').css("visibility","hidden");
        $('.real_killshot_button').css("visibility","hidden");
        $('.declare_winner_btn').css("visibility","hidden");
        $('.decide_winner_btn_container').height( 0 );
        $("#submit_scores_btn").css("visibility","hidden");
    }



    /*
    * script to get scores of current game for each player.
    *
    */

    $.ajax({
        dataType: 'json',
        type: 'POST',
        url: 'set_player_scores.php',
        data: {
            currentGameId: localStorage.getItem("currentGameId")
        },
        success: function (data) {
            //alert("loading scores");
            //alert(data[0].P1T1 + " " + data[0].P2T1);
            //$("#player_a").html( data[0].p1 );
            //$("#player_b").html( data[0].p2 );

            var index = 0;

            for (var m in data[0]) {
                if (data[0][m] === " "){
                    tableDataCells[index].innerText = null
                } else {
                    //alert(data[0][m])
                    //tableDataCells[index].html(data[0][m]);
                    tableDataCells[index].innerText = data[0][m]
                }

                index++;

            }

            if (isFiveOrTen() >= 10){
                switchSides();
            }



            calculateTotalScore();
            getCurrentScores();

            if (isFiveOrTenafterRemove() === 10){
                $('#switch_sides_btn').css("visibility","visible");
                $('#switch_sides_btn').prop("disabled", false);
            }

        }

    });



    // SCRIPTS TO HANDLE CLICKING AND SCORING INPUT
    $("#circle_point_1_A").click(function(){

        $(this).animate({
            backgroundColor: "#a68765"

        }, 100 ).animate({backgroundColor: "#bd9b75"}, 400);

        $("#circle_point_2_A").css("background-color", "#bd9b75");
        $("#circle_kill_left_A, #circle_kill_left_B").css("background-color", "#bd9b75");

    });

    $("#circle_point_2_A").click(function(){

        $(this).animate({
            backgroundColor: "#a68765"

        }, 100 ).animate({backgroundColor: "#bd9b75"}, 400);

        $("#circle_point_3_A").css("background-color", "#bd9b75");

    });

    $("#circle_point_3_A").click(function(){

        $(this).animate({
            backgroundColor: "#a68765"

        }, 100 ).animate({backgroundColor: "#bd9b75"}, 400);

        $("#circle_point_4_A").css("background-color", "#bd9b75");

    });

    $("#circle_point_4_A").click(function(){

        $(this).animate({
            backgroundColor: "#a68765"

        }, 100 ).animate({backgroundColor: "#bd9b75"}, 400);

        $("#circle_point_6_A").css("background-color", "#bd9b75");

    });

    $("#circle_point_6_A").click(function(){

        $(this).animate({
            backgroundColor: "#a68765"

        }, 100 ).animate({backgroundColor: "#bd9b75"}, 400);


    });

    $("#circle_kill_left_A, #circle_kill_left_B").click(function(){

        $(this).animate({
            backgroundColor: "#a68765"

        }, 100 ).animate({backgroundColor: "#bd9b75"}, 400);

        $("#circle_point_1_A").css("background-color", "#bd9b75");

    });


    // SCRIPTS TO HANDLE CLICKING AND SCORING INPUT
    $("#circle_point_1_B").click(function(){

        $(this).animate({
            backgroundColor: "#a68765"

        }, 100 ).animate({backgroundColor: "#bd9b75"}, 400);

        $("#circle_point_2_B").css("background-color", "#bd9b75");
        $("#circle_kill_right_A, #circle_kill_right_B").css("background-color", "#bd9b75");

    });

    $("#circle_point_2_B").click(function(){

        $(this).animate({
            backgroundColor: "#a68765"

        }, 100 ).animate({backgroundColor: "#bd9b75"}, 400);

        $("#circle_point_3_B").css("background-color", "#bd9b75");

    });

    $("#circle_point_3_B").click(function(){

        $(this).animate({
            backgroundColor: "#a68765"

        }, 100 ).animate({backgroundColor: "#bd9b75"}, 400);

        $("#circle_point_4_B").css("background-color", "#bd9b75");

    });

    $("#circle_point_4_B").click(function(){

        $(this).animate({
            backgroundColor: "#a68765"

        }, 100 ).animate({backgroundColor: "#bd9b75"}, 400);

        $("#circle_point_6_B").css("background-color", "#bd9b75");

    });

    $("#circle_point_6_B").click(function(){

        $(this).animate({
            backgroundColor: "#a68765"

        }, 100 ).animate({backgroundColor: "#bd9b75"}, 400);


    });

    $("#circle_kill_right_A, #circle_kill_right_B").click(function(){

        $(this).animate({
            backgroundColor: "#a68765"

        }, 100 ).animate({backgroundColor: "#bd9b75"}, 400);

        $("#circle_point_1_B").css("background-color", "#bd9b75");

    });

    $(".button1").click(function(){

        $(this).animate({
            backgroundColor: "#a68765"

        }, 100 ).animate({backgroundColor: "#bd9b75"}, 400);

    });

    // Add scoring functionality to board
    /*let elements = document.querySelectorAll("div.scoreContainer>div");

    for (let i = 0; i < elements.length; i++) {
        elements[i].addEventListener("click", function () {
            addPoint(this);
        });
    }*/
    $('div.scoreContainer>div').on('click', function() {
        addPoint(this);
    });

    // Add score functionality to buttons
    $('.button1').on('click', function() {
        addPoint(this);
    });

    // Attach functionality to switch sides button
    $('.button3').on('click', function() {
        switchSides();
    });

    // Add remove point functionality to scoreboard
    $('.A').on('click', function() {
        removePoint(this);
    });

    $('.B').on('click', function() {
        removePoint(this);
    });

    // Add kill shot functionality to kill shot button
    $('#killshot_button_left').on('click', function() {
        p_one_killshot = true;
        $(".circle_k1").html("8");
        $(".circle1").html("0");
        $(".circle2").html("0");
        $(".circle3").html("0");
        $(".circle4").html("0");
        $(".circle5").html("0");
    });

    // Add kill shot functionality to kill shot button
    $('#killshot_button_right').on('click', function() {
        p_two_killshot = true;
        $(".circle_k1_R").html("8");
        $(".circle1_R").html("0");
        $(".circle2_R").html("0");
        $(".circle3_R").html("0");
        $(".circle4_R").html("0");
        $(".circle5_R").html("0");
    });

    // Show an alert when declare winner buttons are pressed
    $('#declare_winner_left').on('click', function() {
        let submit_scores_btn = $("#submit_scores_btn");
        let player_A_win_banner = $(".win_alert_p1");

        player_A_win_banner.css("visibility", "visible");
        submit_scores_btn.css("visibility", "visible");

        gameWinner = localStorage.getItem("currentPlayerOne");
        if ( submit_scores_btn.prop("disabled",true) ){
            submit_scores_btn.prop("disabled",false);
        }

    });

    $('#declare_winner_right').on('click', function() {
        let submit_scores_btn = $("#submit_scores_btn");
        let player_B_win_banner = $(".win_alert_p2");

        player_B_win_banner.css("visibility", "visible");
        submit_scores_btn.css("visibility", "visible");

        gameWinner = localStorage.getItem("currentPlayerTwo");
        if ( submit_scores_btn.prop("disabled",true) ){
            submit_scores_btn.prop("disabled",false);
        }
    });


    // VARIABLES FOR CSS CLASSES
    let scoreBoardContainer = $("#container_left, #container_right");
    let circle_point_one = $("#circle_point_1_A, #circle_point_1_B");
    let circle_point_two = $("#circle_point_2_A, #circle_point_2_B");
    let circle_point_three = $("#circle_point_3_A, #circle_point_3_B");
    let circle_point_four = $("#circle_point_4_A, #circle_point_4_B");
    let circle_point_six = $("#circle_point_6_A, #circle_point_6_B");
    let circle_kill_left_A = $("#circle_kill_left_A, #circle_kill_right_A");
    let circle_kill_left_B = $("#circle_kill_left_B, #circle_kill_right_B");
    let button_styles = $(".button1");
    let bottom_button_styles = $(".button2");
    let switch_button_styles = $(".button3, .button4");
    let table_data_cells = $(".A, .B");
    let score_table = $(".score_table");
    let kill_shot_styles = $(".kill_shot_btn");
    let order_form_item_container = $(".order_form_container");
    let hamburgerMenuBtnClass = $(".active");
    let hamburherIcon = $("#icon");

    let all_circles = [circle_point_one, circle_point_two, circle_point_three, circle_point_four,
        circle_point_six, circle_kill_left_A, circle_kill_left_B ];


    // SCRIPTS TO AUTO REZISE CIRCLES ACCORDING TO DEVICE SCREEN
    table_data_cells.height( score_table.width()  * .15 );
    scoreBoardContainer.height( scoreBoardContainer.width() );
    button_styles.css("width", scoreBoardContainer.width() * .25);
    button_styles.css("height", scoreBoardContainer.width() * .20);
    kill_shot_styles.css("width", scoreBoardContainer.width() * .80);
    kill_shot_styles.css("height", scoreBoardContainer.width() * .10);
    bottom_button_styles.css("width", scoreBoardContainer.width() * .20);
    bottom_button_styles.css("height", scoreBoardContainer.width() * .15);
    switch_button_styles.css("width", scoreBoardContainer.width() * .80);
    switch_button_styles.css("height", scoreBoardContainer.width() * .15);
    order_form_item_container.css("height", scoreBoardContainer.width() );

    circle_point_one.width( scoreBoardContainer.width() );
    circle_point_one.height( scoreBoardContainer.width() );

    circle_point_two.width( scoreBoardContainer.width() * .75 );
    circle_point_two.height( scoreBoardContainer.width() * .75 );
    circle_point_two.css("marginLeft", ( scoreBoardContainer.width() /4 ) / 2 );
    circle_point_two.css("marginTop", ( scoreBoardContainer.height() /4 ) / 2 );

    circle_point_three.width( scoreBoardContainer.width() * .50 );
    circle_point_three.height( scoreBoardContainer.width() * .50 );
    circle_point_three.css("marginLeft", scoreBoardContainer.width() / 4 );
    circle_point_three.css("marginTop", scoreBoardContainer.height() / 4 );

    circle_point_four.width( scoreBoardContainer.width() * .25 );
    circle_point_four.height( scoreBoardContainer.width() * .25 );
    circle_point_four.css("marginLeft", (scoreBoardContainer.width() / 2) - ((scoreBoardContainer.width() * .25) /2) );
    circle_point_four.css("marginTop", (scoreBoardContainer.height() / 2) - ((scoreBoardContainer.height() * .25) /2) );

    circle_point_six.width( scoreBoardContainer.width() * .075 );
    circle_point_six.height( scoreBoardContainer.width() * .075 );
    circle_point_six.css("marginLeft", (scoreBoardContainer.width() / 2) - ((scoreBoardContainer.width() * .075) /2) );
    circle_point_six.css("marginTop", (scoreBoardContainer.height() / 2) - ((scoreBoardContainer.height() * .075) /2) );

    circle_kill_left_A.width( scoreBoardContainer.width() * .085);
    circle_kill_left_A.height( scoreBoardContainer.width() * .085);
    circle_kill_left_A.css("marginLeft", scoreBoardContainer.width() * .21 );
    circle_kill_left_A.css("marginTop", scoreBoardContainer.height() * .090 );

    circle_kill_left_B.width( scoreBoardContainer.width() * .085);
    circle_kill_left_B.height( scoreBoardContainer.width() * .085);
    circle_kill_left_B.css("marginLeft", ( scoreBoardContainer.width() * .79) - scoreBoardContainer.width() * .085 );
    circle_kill_left_B.css("marginTop", scoreBoardContainer.height() * .090 );

    hamburgerMenuBtnClass.height( scoreBoardContainer.height() * 0.20);
    hamburherIcon.css( "padding-top", scoreBoardContainer.height() * 0.06);
    hamburherIcon.css( "padding-bottom", scoreBoardContainer.height() * 0.08);

    // SCRIPT FOR TOP NAV OPENING/CLOSING
    let heightPercent = 0;
    let zoomed = false;

    $("#icon").on('click', function()  {

        if( heightPercent === 0) {
            openNav();
            heightPercent = 100;
        }

        else {
            closeNav();
            heightPercent = 0;
        }

    });

    // SCRIPT FOR ZOOM BUTTON
    $("#zoom_button").click(function() {

        if ( !zoomed ){
            scoreBoardContainer.css( "transform", "scale(1.8) translateY(25%) translateX(-1%)" );
            for (let i in all_circles){
                all_circles[i].css( "borderWidth", "2px" );
            }
            zoomed = true;
        }

        else {
            scoreBoardContainer.css( "transform", "" );
            for (let i in all_circles){
                all_circles[i].css( "borderWidth", "3px" );
            }
            zoomed = false;
        }

    });

    // SCRIPT FOR SET BOARD VIA FORM
    $("#set_board").click(function() {

        var left_player_name = $("#left_pname").val();
        var right_player_name = $("#right_pname").val();

        $("#player_a").html( left_player_name );
        $("#player_b").html( right_player_name );

        alert("Board has been set.");

    });


});

/**
 * FUNCTIONS
 */

// Global variables for functions
let p_one_killshot = false;
let p_two_killshot = false;
let pointsA = $(".A");
let pointsB = $(".B");
var sidesSwitched = false;
var gameWinner;
var playerAFinalScore;
var playerBFinalScore;
var playerOneScores = [];
var playerTwoScores = [];


$( "#dialog-message" ).hide();


$("#submit_scores_btn").click( function() {

    $('.switch_sides_round').css("display", "none");
    $('.killshot_round').css("display", "none");

    $( "#dialog-message" ).dialog({
        modal: true,
        buttons: {
            Cancel: function() {
                $( this ).dialog( "close" );

            },
            "End Session": function() {
                getEndGameData();
                //finalizeGame();
                //alert(playerAFinalScore +" "+ playerBFinalScore +" "+ gameWinner);
                finalizeGame();
                $( this ).dialog( "close" );
                window.location = 'welcome.php';

            }
        }
    });
} );



function openNav() {
    $('#myNav').height($(document).height() * 0.9295);

}

function closeNav() {
    document.getElementById("myNav").style.height = "0%";
}

function openPage(pageName,elmnt,color) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablink");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].style.backgroundColor = "";
    }
    document.getElementById(pageName).style.display = "block";
    elmnt.style.backgroundColor = color;
}

// Get the element with id="defaultOpen" and click on it
document.getElementById("defaultOpen").click();



/**
 * Add a point to the selected team's scoreboard
 *
 * @param element
 */
function addPoint(element) {
    let points;
    let pointAmount;
    let array;

    if (isFiveOrTenafterRemove() % 2 === 0){
        $("#myScoreTable tr").removeClass("myGlower");
        $("#myScoreTable tr:not(:has(td:not(:empty))):first").addClass("myGlower");

    }


    if (p_one_killshot) {
        // Assign killshot point value
        switch (element.className) {
            case "circle1 pulse-single":
                pointAmount = 0;
                break;
            case "circle2 pulse-single":
                pointAmount = 0;
                break;
            case "circle3 pulse-single":
                pointAmount = 0;
                break;
            case "circle4 pulse-single":
                pointAmount = 0;
                break;
            case "circle5 pulse-single":
                pointAmount = 0;
                break;
            case "circle_k1 pulse-single":
                pointAmount = 8;
                break;
            case "zero_btn button1 pulse-single":
                pointAmount = 0;
                break;
            case "drop_btn button1 pulse-single":
                pointAmount = "D";
                break;
            case "fault_btn button1 pulse-single":
                pointAmount = "F";
                break;
        }

        p_one_killshot = false;
        $(".circle_k1").html("1");
        $(".circle1").html("1");
        $(".circle2").html("2");
        $(".circle3").html("3");
        $(".circle4").html("4");
        $(".circle5").html("6");

    }

    else {
        // Assign regular point value
        switch (element.className) {
            case "circle1 pulse-single":
                pointAmount = 1;
                break;
            case "circle2 pulse-single":
                pointAmount = 2;
                break;
            case "circle3 pulse-single":
                pointAmount = 3;
                break;
            case "circle4 pulse-single":
                pointAmount = 4;
                break;
            case "circle5 pulse-single":
                pointAmount = 6;
                break;
            case "circle_k1 pulse-single":
                pointAmount = 1;
                break;
            case "zero_btn button1 pulse-single":
                pointAmount = 0;
                break;
            case "drop_btn button1 pulse-single":
                pointAmount = "D";
                break;
            case "fault_btn button1 pulse-single":
                pointAmount = "F";
                break;
        }
    }

    if (p_two_killshot) {
        // Assign killshot point value
        switch (element.className) {
            case "circle1_R pulse-single":
                pointAmount = 0;
                break;
            case "circle2_R pulse-single":
                pointAmount = 0;
                break;
            case "circle3_R pulse-single":
                pointAmount = 0;
                break;
            case "circle4_R pulse-single":
                pointAmount = 0;
                break;
            case "circle5_R pulse-single":
                pointAmount = 0;
                break;
            case "circle_k1_R pulse-single":
                pointAmount = 8;
                break;
            case "zero_btn button1 pulse-single":
                pointAmount = 0;
                break;
            case "drop_btn button1 pulse-single":
                pointAmount = "D";
                break;
            case "fault_btn button1 pulse-single":
                pointAmount = "F";
                break;
        }

        p_two_killshot = false;
        $(".circle_k1_R").html("1");
        $(".circle1_R").html("1");
        $(".circle2_R").html("2");
        $(".circle3_R").html("3");
        $(".circle4_R").html("4");
        $(".circle5_R").html("6");

    }

    else {
        // Assign regular point value
        switch (element.className) {
            case "circle1_R pulse-single":
                pointAmount = 1;
                break;
            case "circle2_R pulse-single":
                pointAmount = 2;
                break;
            case "circle3_R pulse-single":
                pointAmount = 3;
                break;
            case "circle4_R pulse-single":
                pointAmount = 4;
                break;
            case "circle5_R pulse-single":
                pointAmount = 6;
                break;
            case "circle_k1_R pulse-single":
                pointAmount = 1;
                break;
            case "zero_btn button1 pulse-single":
                pointAmount = 0;
                break;
            case "drop_btn button1 pulse-single":
                pointAmount = "D";
                break;
            case "fault_btn button1 pulse-single":
                pointAmount = "F";
                break;
        }
    }

    // Determine which team is getting a point and assign variables
    switch (element.parentNode.id) {
        case "kill_shot_btn_container_left":
        case "button_container_left":
        case "container_left":
            array = "A";
            points = pointsA;
            break;
        case "kill_shot_btn_container_right":
        case "button_container_right":
        case "container_right":
            array = "B";
            points = pointsB;
            break;
    }

    // Add point to team's score if eligible
    if (canAddPoint(array)) {
        for (let i = 0; i < points.length; i++) {
            if (isEmpty(points[i])) {
                points[i].innerHTML = pointAmount;
                sendScores( getCurrentScores() );
                break;
            }
        }
    }

    calculateTotalScore();

}

/**
 * Remove point from the selected team and update total score
 *
 * @param obj
 */
function removePoint(obj) {
    $(obj).html(null);
    let player_A_win_banner = $(".win_alert_p1");
    let player_B_win_banner = $(".win_alert_p2");
    let submit_scores_btn = $("#submit_scores_btn");

    $("#myScoreTable tr").removeClass("myGlower");

    if (player_A_win_banner.css("visibility", "visible")){
        player_A_win_banner.css("visibility", "hidden")
    }

    if (player_B_win_banner.css("visibility", "visible")){
        player_B_win_banner.css("visibility", "hidden")
    }

    if (submit_scores_btn.prop("disabled",false)){
        submit_scores_btn.prop("disabled",true)
    }

    if (submit_scores_btn.css("visibility","visible")){
        submit_scores_btn.css("visibility","hidden")
    }


    if  (isFiveOrTenafterRemove() === 10 && sidesSwitched){
        switchSides();
        sidesSwitched = false;
        enableBoardClickables();
    }


    calculateTotalScore();
}

/**
 * Determine if obj has a value
 *
 * @param obj
 * @returns {boolean}
 */
function isEmpty(obj) {
    return $(obj).html().length === 0;
}

/**
 * Calculate both teams' total scores
 */
function calculateTotalScore() {
    let totalA = 0;
    let totalB = 0;
    let score;

    // Iterate through both arrays of scores and add to total points
    for (let i = 0; i < pointsA.length; i++) {
        if (!isEmpty(pointsA[i])) {
            score = parseInt(pointsA[i].innerHTML);
            if (!isNaN(score)) {
                totalA += score;
            }
        }

        if (!isEmpty(pointsB[i])) {
            score = parseInt(pointsB[i].innerHTML);
            if (!isNaN(score)) {
                totalB += score;
            }
        }
    }

    // Display the total score values
    $("#score_A").html(totalA.toString());
    $("#score_B").html(totalB.toString());

    // Determine button availability
    isFiveOrTen();
}

function justCalculateTotalScore() {
    let totalA = 0;
    let totalB = 0;
    let score;

    // Iterate through both arrays of scores and add to total points
    for (let i = 0; i < pointsA.length; i++) {
        if (!isEmpty(pointsA[i])) {
            score = parseInt(pointsA[i].innerHTML);
            if (!isNaN(score)) {
                totalA += score;
            }
        }

        if (!isEmpty(pointsB[i])) {
            score = parseInt(pointsB[i].innerHTML);
            if (!isNaN(score)) {
                totalB += score;
            }
        }
    }

    // Display the total score values
    $("#score_A").html(totalA.toString());
    $("#score_B").html(totalB.toString());

    // Determine button availability
}

/**
 * Determine if a team can add another point. Team must have equal or less number of points to add another
 *
 * @param sourceClass
 * @returns {boolean}
 */
function canAddPoint(sourceClass) {
    let totalA = 0;
    let totalB = 0;

    // Determine the number of times each team has added a point
    for (let i = 0; i < pointsA.length; i++) {
        if (!isEmpty(pointsA[i])) {
            totalA += 1;
        }

        if (!isEmpty(pointsB[i])) {
            totalB += 1;
        }
    }

    // If the source team has a higher amount of points added cannot add more
    if (sourceClass === "A") {
        if (totalA > totalB) {
            return false;
        }
    }
    else if (sourceClass === "B") {
        if (totalB > totalA) {
            return false;
        }
    }

    return true;
}

/**
 * Switch the scores presented on the board
 */
function switchSides() {
    let x;
    let left_player = $("#player_a").html();
    let right_player = $("#player_b").html();

    enableBoardClickables();
    sidesSwitched = true;

    for (let i = 0; i < pointsA.length; i++) {
        x = pointsA[i].innerHTML;
        pointsA[i].innerHTML = pointsB[i].innerHTML;
        pointsB[i].innerHTML = x;
    }

    $("#player_a").html(right_player);
    $("#player_b").html(left_player);

    calculateTotalScore();
}

/**
 * Determine what turn it is and change button availability depending on turn number
 */
function isFiveOrTen() {
    let turnsA = 0;
    let turnsB = 0;

    for (let i = 0; i < pointsA.length; i++) {
        if (!isEmpty(pointsA[i])) {
            turnsA += 1;
        }

        if (!isEmpty(pointsB[i])) {
            turnsB += 1;
        }
    }

    // Add the number of points added by each team to determine which turn it is
    if (turnsA + turnsB === 8 || turnsA + turnsB === 9) { // Enable killshot button for 5th turn   turnsA === 4 && turnsB === 4
        $('#kill_shot_btn_container_left').css("height","auto");
        $('#kill_shot_btn_container_right').css("height","auto");
        $('.real_killshot_button').prop('disabled', false);
        $('.real_killshot_button').css("visibility","visible");
        $('#switch_sides_btn').prop('disabled', true);
        $('#switch_sides_btn').css("visibility","hidden");
        enableBoardClickables();
        if (turnsA + turnsB === 8){
            showKillShotRoundVisual();
        }

    }

    else if (turnsA + turnsB === 10 && !sidesSwitched) { // Enable switch button on 5th turn   turnsA === 5 && turnsB === 5
        $('.real_killshot_button').prop('disabled', true);
        $('.real_killshot_button').css("visibility","hidden");
        $('#kill_shot_btn_container_left').height( 0 );
        $('#kill_shot_btn_container_right').height( 0 );
        $('#switch_sides_btn').prop('disabled', false);
        $('#switch_sides_btn').css("visibility","visible");
        disableBoardClickables();
        showSwitchSidesRoundVisual();

    }

    else if (turnsA + turnsB === 18 || turnsA + turnsB === 19) { // Enable killshot button for 10th turn   turnsA === 9 && turnsB === 9
        $('.real_killshot_button').prop('disabled', false);
        $('.real_killshot_button').css("visibility","visible");
        $('#kill_shot_btn_container_left').css("height","auto");
        $('#kill_shot_btn_container_right').css("height","auto");
        $('.declare_winner_btn').prop('disabled', true);
        $('.declare_winner_btn').css("visibility","hidden");
        $('.decide_winner_btn_container').height(0);
        if (turnsA + turnsB === 18){
            showKillShotRoundVisual();
        }
    }
    else if (turnsA + turnsB >= 20) { // Enable killshot button on 10th turn    turnsA === 10 && turnsB === 10
        if (checkForTie()){
            $('.declare_winner_btn').prop('disabled', false);
            $('.declare_winner_btn').css("visibility","visible");
            $('.decide_winner_btn_container').css("height","auto");
            $("#submit_scores_btn").prop("disabled",true);
            $("#submit_scores_btn").css("visibility","hidden");
            showTieGameVisual();


        }
        else {
            justCalculateTotalScore();
            checkWinner();
        }

        $('.real_killshot_button').prop('disabled', true);
        $('.real_killshot_button').css("visibility","hidden");
        $('#kill_shot_btn_container_left').height( 0 );
        $('#kill_shot_btn_container_right').height( 0 );
        $('#switch_sides_btn').prop('disabled', true);
        $('#switch_sides_btn').css("visibility","hidden");

    }
    else { // Disable all buttons
        $('#kill_shot_btn_container_left').height( 0 );
        $('#kill_shot_btn_container_right').height( 0 );
        $('#switch_sides_btn').prop('disabled', true);
        $('#switch_sides_btn').css("visibility","hidden");
        $('.real_killshot_button').prop('disabled', true);
        $('.real_killshot_button').css("visibility","hidden");
        $('.declare_winner_btn').prop('disabled', true);
        $('.declare_winner_btn').css("visibility","hidden");
        $('.decide_winner_btn_container').height( 0 );
        $("#submit_scores_btn").prop("disabled",true);
        $("#submit_scores_btn").css("visibility","hidden");
    }

    return turnsA + turnsB
}

function isFiveOrTenafterRemove() {
    let turnsA = 0;
    let turnsB = 0;

    for (let i = 0; i < pointsA.length; i++) {
        if (!isEmpty(pointsA[i])) {
            turnsA += 1;
        }

        if (!isEmpty(pointsB[i])) {
            turnsB += 1;
        }
    }

    return turnsA + turnsB;
}

// grab values and determine which player wins then display banner.
function checkWinner() {

    let player_A_final_score = parseInt( $("#score_A").html() );
    let player_B_final_score = parseInt( $("#score_B").html() );
    let player_A_win_banner = $(".win_alert_p1");
    let player_B_win_banner = $(".win_alert_p2");
    let submit_scores_btn = $("#submit_scores_btn");

    if (player_A_final_score > player_B_final_score){
        player_A_win_banner.css("visibility", "visible")

    }

    else if (player_B_final_score > player_A_final_score){
        player_B_win_banner.css("visibility", "visible")
    }

    submit_scores_btn.prop("disabled", false);
    submit_scores_btn.css("visibility", "visible")

}

function getEndGameData() {

    playerAFinalScore = 0;
    playerBFinalScore = 0;

    for (var i=0; i<playerOneScores.length; i++){
        if (!isNaN( playerOneScores[i] )){
            playerAFinalScore += parseInt( playerOneScores[i]);
        }
    }

    for (var j=0; j<playerTwoScores.length; j++){
        if (!isNaN( playerTwoScores[j] )){
            playerBFinalScore += parseInt( playerTwoScores[j]);

        }
    }


    if (playerAFinalScore > playerBFinalScore){
        gameWinner = localStorage.getItem("currentPlayerOne");

    }

    else if (playerBFinalScore > playerAFinalScore){
        gameWinner = localStorage.getItem("currentPlayerTwo");
    }

}


function getCurrentScores(){

    var pt1_A = document.getElementById("pt1_A");
    var pt2_A = document.getElementById("pt2_A");
    var pt3_A = document.getElementById("pt3_A");
    var pt4_A = document.getElementById("pt4_A");
    var pt5_A = document.getElementById("pt5_A");
    var pt6_A = document.getElementById("pt6_A");
    var pt7_A = document.getElementById("pt7_A");
    var pt8_A = document.getElementById("pt8_A");
    var pt9_A = document.getElementById("pt9_A");
    var pt10_A = document.getElementById("pt10_A");
    var pt1_B = document.getElementById("pt1_B");
    var pt2_B = document.getElementById("pt2_B");
    var pt3_B = document.getElementById("pt3_B");
    var pt4_B = document.getElementById("pt4_B");
    var pt5_B = document.getElementById("pt5_B");
    var pt6_B = document.getElementById("pt6_B");
    var pt7_B = document.getElementById("pt7_B");
    var pt8_B = document.getElementById("pt8_B");
    var pt9_B = document.getElementById("pt9_B");
    var pt10_B = document.getElementById("pt10_B");


    playerOneScores = [];
    playerTwoScores = [];

    // put each element in list for easy access.
    var tableDataCells = [ pt1_A, pt2_A, pt3_A, pt4_A, pt5_A, pt6_A, pt7_A, pt8_A, pt9_A, pt10_A,
        pt1_B, pt2_B, pt3_B, pt4_B, pt5_B, pt6_B, pt7_B, pt8_B, pt9_B, pt10_B ];

    if (isFiveOrTen() <= 10) {
        for (var i = 0; i < tableDataCells.length; i++) {
            if (tableDataCells[i].className === "A") {
                playerOneScores.push(tableDataCells[i].innerText)
            } else {
                playerTwoScores.push(tableDataCells[i].innerText)
            }

        }
    }

    if (isFiveOrTen() > 10) {
        for (var j = 0; j < tableDataCells.length; j++) {
            if (tableDataCells[j].className === "A") {
                playerTwoScores.push(tableDataCells[j].innerText)
            } else {
                playerOneScores.push(tableDataCells[j].innerText)
            }

        }
    }

    return setEmptyScoresToNull( playerOneScores.concat(playerTwoScores) );

}

function disableBoardClickables(){
    var boards = $(".main_container_left, .main_container_right");
    boards.css("pointer-events", "none");
}

function enableBoardClickables(){
    var boards = $(".main_container_left, .main_container_right");
    boards.css("pointer-events", "");
}

function checkForTie(){
    let player_A_final_score = parseInt( $("#score_A").html() );
    let player_B_final_score = parseInt( $("#score_B").html() );

    return player_A_final_score === player_B_final_score;

}

function setEmptyScoresToNull(scoresList){

    for (var i=0; i < scoresList.length; i++){
        if ( scoresList[i] === "" ){
            scoresList[i] = " ";
        }
    }

    return scoresList;

}

function sendScores(scoresList){

    $.ajax({
        dataType: 'json',
        type: 'POST',
        url: 'send_game_scores.php',
        data: {
            currentGameId: localStorage.getItem("currentGameId"),
            currentPlayerOne: localStorage.getItem("currentPlayerOne"),
            currentPlayerTwo: localStorage.getItem("currentPlayerTwo"),
            pOneP1: scoresList[0],
            pOneP2: scoresList[1],
            pOneP3: scoresList[2],
            pOneP4: scoresList[3],
            pOneP5: scoresList[4],
            pOneP6: scoresList[5],
            pOneP7: scoresList[6],
            pOneP8: scoresList[7],
            pOneP9: scoresList[8],
            pOneP10: scoresList[9],
            pTwoP1: scoresList[10],
            pTwoP2: scoresList[11],
            pTwoP3: scoresList[12],
            pTwoP4: scoresList[13],
            pTwoP5: scoresList[14],
            pTwoP6: scoresList[15],
            pTwoP7: scoresList[16],
            pTwoP8: scoresList[17],
            pTwoP9: scoresList[18],
            pTwoP10: scoresList[19]
        },
        success: function() {
            alert("scoresAdded");

        }


    });
}

/**
 * Function to close game. Once submit scores is confirmed, end game scripts will run. This adds the
 * following to the database.
 * game is set to 0 to indicate gameover, game winner is declared and appended, final scores are appended.
 * access to game removed.
 * @param scoresList
 */
function finalizeGame(){

    $.ajax({
        dataType: 'json',
        type: 'POST',
        url: 'finalize_game.php',
        data: {
            currentGameId: localStorage.getItem("currentGameId"),
            currentPlayerOne: localStorage.getItem("currentPlayerOne"),
            currentPlayerTwo: localStorage.getItem("currentPlayerTwo"),
            gameWinner: gameWinner,
            playerAFinalScore: playerAFinalScore,
            playerBFinalScore: playerBFinalScore

        },
        success: function() {
            alert("game ended");

        }

    });
}

function showKillShotRoundVisual(){

    var blink = setInterval(function () {
        var vis = $('.killshot_round').css("visibility");
        vis = (!vis || vis == "visible") ? "hidden" : "visible";
        $('.killshot_round').css("visibility", vis);
    }, 250)


    setTimeout( function(){
        clearInterval(blink);
        $('.killshot_round').css("visibility","hidden");
    }, 2000);

}

function showSwitchSidesRoundVisual(){

    var blink = setInterval(function () {
        var vis = $('.switch_sides_round').css("visibility");
        vis = (!vis || vis == "visible") ? "hidden" : "visible";
        $('.switch_sides_round').css("visibility", vis);
    }, 250)


    setTimeout( function(){
        clearInterval(blink);
        $('.switch_sides_round').css("visibility","hidden");
    }, 2000);

}

function showTieGameVisual(){

    var tieblink = setInterval(function () {
        var vis = $('.tie_game_visual').css("visibility");
        vis = (!vis || vis == "visible") ? "hidden" : "visible";
        $('.tie_game_visual').css("visibility", vis);
    }, 250)


    setTimeout( function(){
        clearInterval(tieblink);
        $('.tie_game_visual').css("visibility","hidden");
    }, 2000);

}


