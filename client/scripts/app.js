// YOUR CODE HERE:
var app = {
  server: 'https://api.parse.com/1/classes/chatterbox'
};
app.init = function (){
    this.fetch();
    $(".username").on('click', this.addFriend);
    $("#send .submit").on('submit', this.handleSubmit);
    // $(' .userClick').on('click', function(){
    //   console.log('this', this);
    //   $(this).append("<form class='personalConvo'><p><label>Type to your heart\'s content!</label><input type='text' size='10'></input><p></form>");
    // })
};

app.send = function (data){
  var thisInstance = this;
  $.ajax({
    // This is the url you should use to communicate with the parse API server.
    url: this.server,
    type: 'POST',
    data: JSON.stringify(data),
    contentType: 'application/json',
    success: function (data) {
      app.addMessagesFromFetch(data);
      console.log("addMessage inside send function")
      // debugger;

      console.log('chatterbox: Message sent');
      console.log('chatterbox', data);
    },
    error: function (data) {
      // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to send message');
    }
  });

};

app.fetch = function(){
  // $.get('https://api.parse.com/1/classes/chatterbox');
  //console.log("hello")
  $.ajax({
    // This is the url you should use to communicate with the parse API server.
    url: this.server,
    type: 'GET',
    // data: JSON.parse(),
    contentType: 'application/json',
    dataType: 'json',
    success: function (data) {
      // app.addNewMessagesFromFetch(data);

      // var userResultsArray = data.results;
      // for (var i = 0; i < userResultsArray.length; i++) {
        // if (userResultsArray[i].username !== undefined && userResultsArray[i].text !== undefined){
          // app.addMessage(userResultsArray[i]);
          app.addMessagesFromFetch(data.results);
          //console.log("data", data, "data.results", data.results);
        // }
      // }
    },
    error: function (data, errorMessage) {
      // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to fetch message');
      console.log('errorMessage', errorMessage)
    }
  });
  // debugger;
};

// app.addNewMessagesFromFetch = function(data) {

// }

app.clearMessages = function () {
  $('#chats').children().remove()
};

app.makeHTMLelement = function(message) {
  var $uName = $("<div class = 'username'>").append(
      $("<a class = 'userClick' href = '#'>").text(message.username));
  var $uMessage = $("<div id = 'text'>").text(message.text);
  var $fullMessage = $('#chats').append($uName, $uMessage);
  return $fullMessage;
};

app.addMessagesFromFetch = function (dataResultsFromFetch) {
  //console.log(dataResultsFromFetch.length)
  for (var i = 0; i < dataResultsFromFetch.length; i++) {
    if (app.testForNewMessages(dataResultsFromFetch[i]) === true){
      var $HTMLelement = app.makeHTMLelement(dataResultsFromFetch[i]);
      $('#chats').prepend($HTMLelement);
    }
    //console.log("prepending");
    // $('#chats').append("<div>" + messageAdded + "</div>");
    // this.init();
  }
};

app.onScreenMessageStorage = {};

app.testForNewMessages = function(messageFromAddMessages) {
    // console.log(app.onScreenMessageStorage)
  if (!app.onScreenMessageStorage[messageFromAddMessages.objectId]) {
    app.onScreenMessageStorage[messageFromAddMessages.objectId] = true;
    return true;
  }
}

app.addRoom = function (room) {
  $('#roomSelect').append("<div>" /*+ room + */ +"</div>");

};

app.addFriend = function(){
  // return true;
  console.log("Defined adF")
};

app.handleSubmit = function() {

};
$(document).ready(function(){
  app.init();

  $('#refreshButton').on('click', function() {
    app.fetch();
  });

  $('.userClick').on('click', function(){
    console.log("this", this)
    $(this).append("<form class='personalConvo'><p><label>Type to your heart\'s content!</label><input type='text' size='10'></input><p></form>");
  })

});

