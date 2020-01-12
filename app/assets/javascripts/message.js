$(function(){

  var buildHTML = function(message) {
    if (message.text && message.image) {
      var html = `<div class="list" data-message-id=${message.id}>
                    <div class="chat-list">
                      <div class="chat-list__name">
                        ${message.user_name}
                      </div>
                      <div class="chat-list__date">
                        ${message.created_at}
                      </div>
                    </div>
                    <div class="message-list">
                      <p class="message-list__text">
                        ${message.text}
                      </p>
                      <img class="message-list__image" src=${message.image}>
                    </div>
                  </div>`
    } else if (message.text) {
      var html = `<div class="list" data-message-id=${message.id}>
                    <div class="chat-list">
                      <div class="chat-list__name">
                        ${message.user_name}
                      </div>
                      <div class="chat-list__date">
                        ${message.created_at}
                      </div>
                    </div>
                    <div class="message-list">
                      <p class="message-list__text">
                        ${message.text}
                      </p>
                    </div>
                  </div>`
    }else if (message.image) {
      var html = `<div class="list" data-message-id=${message.id}>
                    <div class="chat-list">
                      <div class="chat-list__name">
                        ${message.user_name}
                      </div>
                      <div class="chat-list__date">
                        ${message.created_at}
                      </div>
                    </div>
                    <div class="message-list">
                      <img class="message-list__image" src=${message.image}>
                    </div>`
    };
    return html;
  };

  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action')
    $.ajax({
      url: url,
      type: 'POST',
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.main-chat__message-list').append(html);
      $('.main-chat__message-list').animate({ scrollTop: $('.main-chat__message-list')[0].scrollHeight});
      $('form')[0].reset();
      $('.submit-btn').prop('disabled', false);
    })
    .fail(function() {
      alert("メッセージ送信に失敗しました");
    });
  });

  var reloadMessages = function() {
    last_message_id = $('.list:last').data("message-id");
    $.ajax({
      url: "api/messages",
      type: 'get',
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function(messages) {
      if (messages.length !== 0) {
        var insertHTML = '';
        $.each(messages, function(i, message) {
          insertHTML += buildHTML(message)
        });
      $('.main-chat__message-list').append(insertHTML);
      $('.main-chat__message-list').animate({ scrollTop: $('.main-chat__message-list')[0].scrollHeight});
      $("#new_message")[0].reset();
      $(".submit-btn").prop("disabled", false);
      }
    })
    .fail(function() {
      console.log('error');
    })
  };
  if (document.location.href.match(/\/groups\/\d+\/messages/)) {
    setInterval(reloadMessages, 7000);
  }
});