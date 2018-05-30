var newBtn = '#newBtn';
var cancelBtn = '#cancelBtn';

$(document).ready(function() {
  $(cancelBtn).hide();
  $('#addAppointment').hide();
});

$(newBtn).click(function() {
  if ($(newBtn).val() == 'NEW') {
		  $(this).attr({type :'submit', value:'ADD'});
    $(cancelBtn).show();
    $('#addAppointment').show();

	 } else {
    var date = $('#datepicker').val().trim();
    var time = $('#time').val().trim();
    var description = $('#description').val().trim();

    if (date != '' && time != '' && description != '') {
      $("#appointmentForm").submit();
    } else {
      $('#formError').empty();
      $('#formError').append("Please check for missing or invalid data.");
    }
	 }
});

$(cancelBtn).click(function() {
   $('#formError').empty();
   $(newBtn).attr({type:'button', value:'NEW'});
   $(this).hide();
   $('#addAppointment').hide();
});

$(document).ready(function() {
  $('#searchBtn').click(function() {
    getAppointments($('#searchText').val());
  });
});

function getAppointments(searchValue) {
  $.ajax({type: 'GET',
          url: '/cgi-bin/appointment/search.pl',
          dataType: 'json',
          data: {'searchValue':searchValue},
          success: function(data) {
             $('#resultsTable').empty();
             $('#resultsNone').empty();
             if (data.length === 0) {
               $('#resultsNone').append('There are no results found.');
             } else {
               displayResults(data);
             }
          },
          error: function(jqXHR, textStatus, errorThrown) {
            alert(errorThrown);
          }
  });
}

function displayResults(data) {
  $('#resultsTable').append('<tr><th>DATE</th><th>TIME</th><th>DESCRIPTION</th></tr>');
  for (row in data) {
      $('#resultsTable').append('<tr><td>' + data[row].date + '</td>' +
                                    '<td>' + data[row].time + '</td>' +
                                    '<td>' + data[row].description + '</td></tr>');
  }
}

$(function() {
  $("#datepicker").datepicker({minDate: "+1D"});
});
