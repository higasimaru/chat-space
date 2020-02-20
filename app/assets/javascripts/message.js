$(function(){
  $('#new_message').on('submit', function(e){
    console.log('hoge');
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).atter('action');
    $.ajax({
      url: url,
      type: 'POST',
      Data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })    
  });
});