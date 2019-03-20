$(document).ready(function () {


    let app = {
        hobbyList: ['coding', 'woodworking', 'sports', 'traveling', 'painting', 'drawing', 'hiking', 'photography', 'video games', 'running', 'weightlifting'],

        populateButtons: function () {
            for (let i in app.hobbyList) {
                // var listButton = $('<button>');
                // listButton.addClass('gifButton btn btn-outline-success')
                // listButton.attr('data-toggle', 'buttons')
                // listButton.attr('id', app.hobbyList[i]);
                // listButton.text(app.hobbyList[i]);
                // $('#buttonList').append(listButton);

                var listLabel = $('<label>');
                listLabel.addClass('gifButton btn btn-primary')
                listLabel.attr('id', app.hobbyList[i]);
                listLabel.text(app.hobbyList[i])

                var listInput = $('<input>');
                listInput.attr('type', 'radio');
                listInput.attr('name', 'options');
                listInput.attr('autocomplete', 'off');
                // listInput.addClass('gifButton')

                listLabel.append(listInput);

                $('#buttonList').append(listLabel);

            }
        },

        populateGifs: function (buttonID) {
            console.log('buttonid: ' + buttonID)
            const queryURL = 'https://api.giphy.com/v1/gifs/search?api_key=nmP5ayP6N65Aw6RBzK4nzC1ZeUkl2wRf&limit=10&q=' + buttonID

            $.ajax({
                url: queryURL,
                method: 'GET'
            }).then(function (response) {
                console.log(response)
                const results = response.data

                for (var i = 0; i < results.length; i++) {

                    var gifDiv = $('<div>');
                    gifDiv.addClass('gifDiv');
                    var p = $('<p>');
                    p.text('Rating: ' + results[i].rating.toUpperCase());

                    gifImage = $('<img>');
                    gifImage.addClass('gif')
                    gifImage.attr('data-animate', results[i].images.fixed_height.url)
                    gifImage.attr('data-still', results[i].images.fixed_height_still.url)
                    gifImage.attr('src', results[i].images.fixed_height_still.url)
                    gifImage.attr('data-state', 'still')

                    gifDiv.append(p);
                    gifDiv.prepend(gifImage);
                    $('#gifs').prepend(gifDiv);
                }
            });
        },

        playPauseGif: function (response) {
            const clickedGif = $(response.target)
            const dataState = clickedGif.attr('data-state');
            console.log('data state: ' + dataState);
            if (dataState === 'still') {
                clickedGif.attr('src', clickedGif.attr('data-animate'));
                clickedGif.attr('data-state', 'animate');
            } else {
                clickedGif.attr('src', clickedGif.attr('data-still'));
                clickedGif.attr('data-state', 'still');
            }
        }
    }

    app.populateButtons();

    $(document).on('click', '.gifButton', function () {
        // console.log(this.id);

        $('#gifs').empty();
        app.populateGifs(this.id);
    })

    $(document).on('click', '.gif', function (response) {
        app.playPauseGif(response);
    })

    $(document).on('click', '#add-hobby', function (event) {
        event.preventDefault();
        app.hobbyList.push($('#hobby-input').val().trim())
        $('#buttonList').empty();
        app.populateButtons();
    })

})