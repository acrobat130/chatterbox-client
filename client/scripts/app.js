// YOUR CODE HERE:
var app = {
  server: 'https://api.parse.com/1/classes/chatterbox'
}; 
app.init = function (){
    $(".username").on('click', this.addFriend);
    $("#send .submit").on('submit', this.handleSubmit);
    // $('#refreshButton').on('click',this.fetch);

};

app.send = function (message){
  var thisInstance = this; 
  $.ajax({
    // This is the url you should use to communicate with the parse API server.
    url: this.server,
    type: 'POST',
    data: JSON.stringify(message),
    contentType: 'application/json',
    success: function (data) {
      app.addMessage(message);
      debugger;

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
  console.log("hello")
  $.ajax({
    // This is the url you should use to communicate with the parse API server.
    url: this.server,
    type: 'GET',
    //data: JSON.parse(),
    contentType: 'application/json',
    success: function (data,status, jqxhr) {
/*      console.log('chatterbox: Request sent');
      console.log('data', data);
*/      var userResultsArray = data.results;
debugger;
      for (var i = 0; i < userResultsArray.length; i++) {
        if (userResultsArray[i].username !== undefined && userResultsArray[i].text !== undefined){
          // debugger; 
          app.addMessage(userResultsArray[i]);
        }
      }
    },
    error: function (data) {
      // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to send message');
    }
  });
  // debugger;


};

app.clearMessages = function () {
  $('#chats').children().remove()
};

app.addMessage = function (messageAdded) {
  $('#chats').append("<div id='message'>Message: " + messageAdded.text + "</div>");
  $('#chats').append("<div class='username' href='#'>Username: " + messageAdded.username + "</div>");
  // $('#chats').append("<div>" + messageAdded + "</div>");
  this.init();
};

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
  setInterval(app.fetch(), 1000);
// $('#refreshButton').on('click', app.fetch);
});

