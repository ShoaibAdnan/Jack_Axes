$( document ).ready(function() {

    //tournament players table.
    var tabledata = [];

    //TODO create callback funtion as opposed to setting async to false
    $.ajax({ //start ajax call
        dataType: 'json',
        type: 'POST',
        url: 'get_orders_data.php',
        success: function (data) { // start ajax success function
            tabledata = data;
            //alert(JSON.stringify(data));
        },
        async: false
    });


    //create Tabulator on DOM element with id "example-table"
    var table = new Tabulator( "#order_table", {
        height:205, // set height of table (in CSS or here), this enables the Virtual DOM and improves render speed dramatically (can be any valid css height value)
        layout:"fitColumns", //fit columns to width of table (optional)
        data: tabledata,
        columns:[ //Define Table Columns
            {title:"Order ID", field:"orderId", width:150},
            {title:"Game ID", field:"gameId", align:"left"},
            {title:"Lane", field:"gamelane"},
            {title:"Order", field:"orderDetails", align:"center"},
            {title:"Status", field:"orderFilled", align:"center", formatter:"tickCross", sorter:"boolean", editor:true},
        ],

        rowClick:function(e, row){ //trigger an alert message when the row is clicked
            alert("Row " + row.getData().gameId + " Clicked!!!!");
        }
    });


    //tournament game table
    var tournamentTableData = [];

    //TODO create callback funtion as opposed to setting async to false
    $.ajax({ //start ajax call
        dataType: 'json',
        type: 'POST',
        url: 'get_tournament_player_data.php',
        success: function (data) { // start ajax success function
            tournamentTableData = data;
            //alert(JSON.stringify(data));
        },
        async: false
    });


    //create Tabulator on DOM element with id "example-table"
    var tournamentGameTable = new Tabulator( "#tourn_table", {
        height: 500, // set height of table (in CSS or here), this enables the Virtual DOM and improves render speed dramatically (can be any valid css height value)
        layout:"fitDataFill", //fit columns to width of table (optional)
        responsiveLayout:"collapse",
        data: tournamentTableData,
        columns:[ //Define Table Columns
            {formatter:"responsiveCollapse", width:30, minWidth:30, align:"center", resizable:false, headerSort:false},
            {title:"Game ID", field:"gameId", width:150},
            {title:"Lane", field:"gamelane", align:"left"},
            {title:"Date", field:"gameDate" ,width:300},
            {title:"Completed", field:"gameComplete", align:"center" ,width:200},
            {title:"Winner", field:"gameWinner", align:"center" ,width:100},
            {title:"Player One", field:"P1", align:"center", width:180},
            {title:"Player Two", field:"P2", align:"center", width:180},
            {title:"Player One Score", field:"Player One Score", align:"center", responsive:2},
            {title:"Player Two Score", field:"Player Two Score", align:"center", responsive:2},
            {title:"Player One Total", field:"P1Final", align:"center", responsive:2},
            {title:"Player Two Total", field:"P2Final", align:"center", responsive:2},

        ],

        rowClick:function(e, row){ //trigger an alert message when the row is clicked
            alert("Row " + row.getData().gameId + " Clicked!!!!");
        },
    });


    var playerTableData = [];

    //TODO create callback function as opposed to setting async to false
    $.ajax({ //start ajax call
        dataType: 'json',
        type: 'POST',
        url: 'get_players_data.php',
        success: function (data) { // start ajax success function
            playerTableData = data;
            //alert(JSON.stringify(data));
        },
        async: false
    });


    //create Tabulator on DOM element with id "example-table"
    var playerTable = new Tabulator( "#player_table", {
        height:500, // set height of table (in CSS or here), this enables the Virtual DOM and improves render speed dramatically (can be any valid css height value)
        layout:"fitColumns", //fit columns to width of table (optional)
        data: playerTableData,
        columns:[ //Define Table Columns
            {title:"Player ID", field:"playerId", width:150},
            {title:"First Name", field:"firstName", align:"left"},
            {title:"Last Name", field:"lastName"},
            {title:"Email", field:"email", align:"center"},
            {title:"DOB", field:"dob", align:"center"},
        ],

        rowClick:function(e, row){ //trigger an alert message when the row is clicked
            alert("Row " + row.getData().playerId + " Clicked!!!!");
        },
    });


    $.ajax({ //start ajax call
        dataType: 'json',
        type: 'POST',
        url: 'get_next_player_id.php',
        success: function(data) { // start ajax success function

            var nextInt = parseInt(data[0].max) + 1;
            $("#player_id").val(nextInt.toString());

        } // end ajax success function

    }); //end ajax call


    $.ajax({ //start ajax call
        dataType: 'json',
        type: 'POST',
        url: 'get_next_game_id.php',
        success: function(data) { // start ajax success function

            var nextInt = parseInt(data[0].max) + 1;
            $("#game_id").val(nextInt.toString());

        } // end ajax success function

    }); //end ajax call


    //anon game table
    var anonGameTableData = [];

    //TODO create callback funtion as opposed to setting async to false
    $.ajax({ //start ajax call
        dataType: 'json',
        type: 'POST',
        url: 'get_anon_game_data.php',
        success: function (data) { // start ajax success function
            anonGameTableData = data;
            //alert(JSON.stringify(data));
        },
        async: false
    });


    //create Tabulator on DOM element with id "example-table"
    var anonGameTable = new Tabulator( "#anon_table", {
        height: 500, // set height of table (in CSS or here), this enables the Virtual DOM and improves render speed dramatically (can be any valid css height value)
        layout:"fitDataFill", //fit columns to width of table (optional)
        responsiveLayout:"collapse",
        data: anonGameTableData,
        columns:[ //Define Table Columns
            {formatter:"responsiveCollapse", width:30, minWidth:30, align:"center", resizable:false, headerSort:false},
            {title:"Game ID", field:"GameId", width:150},
            {title:"Game Date", field:"GameDate", width:180},
            {title:"Player One", field:"playerOne" ,width:200},
            {title:"Player Two", field:"playerTwo",width:200},
            {title:"Winner", field:"Winner", align:"center" ,width:100},
            {title:"PlayerOne Score", field:"PlayerOneScore", align:"center", width:150},
            {title:"PlayerTwo Score", field:"PlayerTwoScore", align:"center", width:150},
            {title:"Player One Score", field:"POneS", align:"center", responsive:2},
            {title:"Player Two Score", field:"PTwoS", align:"center", responsive:2},

        ],

        rowClick:function(e, row){ //trigger an alert message when the row is clicked
            alert("Row " + row.getData().gameId + " Clicked!!!!");
        },
    });


    $("#add_player_submit").click(function(){

        $.ajax({
            dataType: 'json',
            type: 'POST',
            url: 'add_new_player.php',
            data: {
                ID: $("#player_id").val(),
                FNAME: $("#fname").val(),
                LNAME: $("#lname").val(),
                EMAIL: $("#email").val(),
                DOB: $("#dob").val()

            },
            success : alert("record added")


        });

        //location.reload();

    });

    $("#add_game_submit").click(function(e){
        e.preventDefault();

        $.ajax({
            dataType: 'json',
            type: 'POST',
            url: 'add_new_game.php',
            data: {
                game_id: $("#game_id").val(),
                lane: $("#lane_number").val(),
                player_one_id: $("#player_one_id").val(),
                player_two_id: $("#player_two_id").val()

            }


        }).done(function(results){

            console.log(results);

            if (results['error']){
                if ( results['error'][0].indexOf("playerOneId") !== -1){
                    $("#addEventError").html("Player one Id not valid.");
                    $("#addEventSuccess").html("");
                }

                else if ( results['error'][0].indexOf("playerTwoId") !== -1 ){
                    $("#addEventError").html("Player two Id not valid.");
                    $("#addEventSuccess").html("");
                }
                else {
                    $("#addEventError").html(results['error'][0]);
                    $("#addEventSuccess").html("");
                }
            }

            else {
                $("#addEventSuccess").html(results['success']);
                $("#addEventError").html("");

                clearAddGameForm();

                alert( "Success. Game ID: " + $("#game_id").val() );

                $.ajax({ //start ajax call
                    dataType: 'json',
                    type: 'POST',
                    url: 'get_next_game_id.php',
                    success: function(data) { // start ajax success function

                        var nextInt = parseInt(data[0].max) + 1;
                        $("#game_id").val(nextInt.toString());

                    } // end ajax success function

                }); //end ajax call


            }



        });

        //location.reload();

    });

    function clearAddGameForm(){
        $("#lane_number").val("");
        $("#player_one_id").val("");
        $("#player_two_id").val("");

    }


});