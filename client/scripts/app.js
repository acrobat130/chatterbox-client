// YOUR CODE HERE:
var app = {
  server: 'https://api.parse.com/1/classes/chatterbox'
}; 
app.init = function (){
    $(".username").on('click', app.addFriend);
    $("#send .submit").on('submit', app.handleSubmit);

};

app.send = function (message){
  $.ajax({
    // This is the url you should use to communicate with the parse API server.
    url: this.server,
    type: 'POST',
    data: JSON.stringify(message),
    contentType: 'application/json',
    success: function (data) {
      console.log('chatterbox: Message sent');
    },
    error: function (data) {
      // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to send message');
    }
  });

};

app.fetch = function(){
  // $.get('https://api.parse.com/1/classes/chatterbox');

  $.ajax({
    // This is the url you should use to communicate with the parse API server.
    url: this.server,
    type: 'GET',
    //data: JSON.parse(),
    contentType: 'application/json',
    success: function (data) {
      console.log('chatterbox: Message sent');
    },
    error: function (data) {
      // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to send message');
    }
  });


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
});

