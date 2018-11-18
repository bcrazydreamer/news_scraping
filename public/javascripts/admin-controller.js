$( "#category" ).change(function() {
  var str = "";
  $( "#category option:selected" ).each(function() {
    str += $( this ).text().trim();
  });
  $('.sub-op').remove();
  var code = '';
  if(str == 'Main Feeds'){
    for(var i=0;i<option_obj.Main_Feeds.length;i++)
    {
      code += '<option class="sub-op">'+option_obj.Main_Feeds[i]+'</option>';
    }
    $('#sub_category').append(code);
  }else if(str == 'Cities'){
    for(var i=0;i<option_obj.Cities.length;i++)
    {
      code += '<option class="sub-op">'+option_obj.Cities[i]+'</option>';
    }
    $('#sub_category').append(code);
  }else if(str == 'World'){
    for(var i=0;i<option_obj.World.length;i++)
    {
      code += '<option class="sub-op">'+option_obj.World[i]+'</option>';
    }
    $('#sub_category').append(code);
  }

});
$(document).on('click', '#rsssubmitbtn', function() {
      $('#rsssubmitbtn').attr('disabled','true');
      $('#rsssubmitbtn').html('<i class="fas fa-spinner infinite-rotation"></i>');
      var data = {};
      data.rssurl = $('#rssurl').val();
      data.category = $('#category').val();
      data.subcategory = $('#sub_category').val();
      if(vali.ValidURL(data.rssurl)){

        $.ajax({
              type: 'POST',
              data: JSON.stringify(data),
              contentType: 'application/json',
              url: '/admin/addrss',
              success: function (response) {
                $('#rsssubmitbtn').html('Submit');
                $('#rsssubmitbtn').removeAttr("disabled");
                $('#rssurl').val('');
              },
              error: function (err) {
                $('#rsssubmitbtn').html('Submit');
                $('#rsssubmitbtn').removeAttr("disabled");
                $('#rssurl').val('');
                notie.alert({type: 3, text: err.responseText, time: 2})
              }
          });


      }else{
        notie.alert({type: 3, text: 'invalid', time: 2})
      }

 });
