// HARD: Create a page with a form to enter your longitude and latitude. 
// When the form is submitted, use jQuery's AJAX functions to display a 
// list of date/times that the International Space Station will pass over 
// the given location.

// Wait for the entire document to load before running AJAX
$(document).ready(function() {

    $('.submit').click(function() {

        // Set longitude/latitude equal to the user input
        var longitude = $('.longitude').val();
        var latitude = $('.latitude').val();

        // Make the AJAX request using JSONP to avoid access control issues
        $.ajax({
            url: `http://api.open-notify.org/iss-pass.json?lat=${latitude}&lon=${longitude}`,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            type: "GET", 
            dataType: "jsonp",
            data: {
            },
            success: function (data) {
                console.log(data);
 
                var spaceStationHTML = 'The International Space Station will pass over those coordinated at the below times:';
                spaceStationHTML += '<ul>';

                // List the converted Unix time stamps of dates/times
                $.each(data.response, function(index, time) {
                    var unixTimeStamp = time.risetime;
                    var timestampInMilliSeconds = unixTimeStamp*1000; // JavaScript uses milliseconds
                    var date = new Date(timestampInMilliSeconds);
                    
                    var day = (date.getDate() < 10 ? '0' : '') + date.getDate();
                    var month = (date.getMonth() < 9 ? '0' : '') + (date.getMonth() + 1);
                    var year = date.getFullYear();
                    
                    var hours = ((date.getHours() % 12 || 12) < 10 ? '0' : '') + (date.getHours() % 12 || 12);
                    var minutes = (date.getMinutes() < 10 ? '0' : '') + date.getMinutes();
                    var meridiem = (date.getHours() >= 12) ? 'PM' : 'AM';
                    
                    var formattedDate = month + '-' + day + '-' + year + ' at ' + hours + ':' + minutes + ' ' + meridiem;
                    
                    spaceStationHTML += `<li>${formattedDate}</li>`;
                });
    
                spaceStationHTML += '</ul>';
    
                // Display the dates and times that the space station will pass over a given area
                $('.ajax').html(spaceStationHTML);
            },
            error: function () {
                console.log("Those were not valid coordinates; please enter a valid latitude and longitude. Example: 35.2271 and 80.8431 for Charlotte.");
            }
        });

        // Set input field to empty to be ready for next entry
        $('.latitude').val('');
        $('.longitude').val('');
    });

});