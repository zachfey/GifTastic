$(document).ready(function () {


    let buttonList = ['coding', 'wood-working', 'sports', 'traveling', 'painting', 'drawing', 'hiking', 'photography', 'video-games', 'running', 'weightlifting']

    let app = {
        populateButtons: function () {
            for (let i in buttonList) {
                var listButton = $('<button>');
                listButton.attr('id', buttonList[i]);
                listButton.attr('class', 'gifButton')
                listButton.text(buttonList[i]);
                $('#buttonList').prepend(listButton);
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
                    var p = $('<p>');
                    p.text('Rating: ' + results[i].rating);

                    gifImage = $('<img>');
                    gifImage.addClass('gif')
                    gifImage.attr('data-animate', results[i].images.fixed_height.url)
                    gifImage.attr('data-still', results[i].images.fixed_height_still.url)
                    gifImage.attr('src', results[i].images.fixed_height_still.url)
                    gifImage.attr('data-state', 'still')


                    gifDiv.append(p);
                    gifDiv.append(gifImage);
                    $('#gifs').prepend(gifDiv);
                }
            });
        }
    }

    app.populateButtons();

    $('.gifButton').on('click', function () {
        console.log(this.id);
        app.populateGifs(this.id);


    })

    $(document).on('click', '.gif', function (response) {
        console.log(response.target.data-state);
        // if (this.attr('data-state') === 'still') {
        //     this.attr('src', this.attr('data-animate'));
        // } else {
        //     this.attr('src', this.attr('data-still'));
        // }
    })



})