$(function(){
  function buildHTML(message){
    if ( message.image ) {
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
      return html;
    } else {
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
      return html;
    };
  }
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
  })
});