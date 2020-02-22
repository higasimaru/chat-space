$(function(){
  
  function buildHTML(message){
    if ( message.image ) {
      var html = 
        `<div class="message" data-message-id=${message.id}>
          <div class="message-info">
            <div class="message-info__name">
              ${message.user_name}
            </div>
            <div class="message-info__date">
              ${message.created_at}
            </div>
          </div>
          <div class="content">
            <p class="content__content-details">
              ${message.content}
            </p>       
          </div>
          <img src=${message.image}>
        </div>`
      return html;
    } else {
      var html = 
        `<div class="message" data-message-id=${message.id}>
        <div class="message-info">
          <div class="message-info__name">
            ${message.user_name}
          </div>
          <div class="message-info__date">
            ${message.created_at}
          </div>
        </div>
        <div class="content">
          <p class="content__content-details">
            ${message.content}
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

    $('.submit-btn').removeAttr('data-disable-with');

    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })  
      .done(function(data){
      var html = buildHTML(data);
      $('.messages').append(html);     
      $('form')[0].reset();
      $('.messages').animate({ scrollTop: $('.messages')[0].scrollHeight});       
      })
      .fail(function(){
        alert("メッセージの送信に失敗しました");
    });
  })
  var reloadMessages = function(){
    var last_message_id = $('.message:last').data("message-id");
    $.ajax({
      url: "api/messages",
      type: 'GET',
      dataType: 'json',
      data: {id: last_message_id}
    })
      .done(function(messages){
        console.log('ok');
    })
      .fail(function(){
        console.log('no');
    });
  };
});
