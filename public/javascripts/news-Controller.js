function createSuperContent(title,content,date,url){
    date = date.substring(0,16);
    var imageHtml = '';
    var title = '<a class="news-title">'+title+'</a><p class="news-publish-date">'+date+'</p>';
    if(content){
      try{
          var imgReg = content.match(/<img[^>]*?src="([^<]*?)"[^>]*?>/)[1] || '';
      }catch(err){
        var imgReg = '';
      }
    }
    imageHtml = (imgReg != '') ? '<a><img src="'+imgReg+'" class="news-image" hspace="10" align="left" onerror="this.onerror=null;this.src=\'app_pics/bg/logo-sm.png\';" /></a>' : '';
    content = content.replace(/<a[^>]*?>[^>]*?<img[^>]*?>[^>]*?<\/a>/,'');
    return imageHtml + title + content;
}

function createNewsDiv(news){
  var code = "";
  try{
    code += '<div class="col-sm-12 news-main-div allSidesSoft">';
    code += ' <div class="col-sm-12 news_description">';
    code += '   <div class="col-sm-12">'
    code +=       createSuperContent(news.title,news.content,news.pubDate,news.link);
    code += '   </div>';
    code += '<div class="col-sm-12 share-icon-div">';
    code += '<div class="dropdown">';
    code += '          <a data-toggle="dropdown"><i class="fas fa-share-alt share-icon-pop-btn"></i></a>';
    code += '          <ul class="dropdown-menu">';
    if(vali.isMobile()){
        whatsappShareLink = 'whatsapp://send?text='+shareMessageIntro+news.link;
        code += '            <li><a href="'+whatsappShareLink+'" class="share-icon" target="_blank"><i class="fab fa-whatsapp"></i> WhatsApp</a></li>';
    }
    gplusShareLink = 'https://plus.google.com/share?url='+news.link;
    code += '            <li><a href="'+gplusShareLink+'" class="share-icon" target="_blank"><i class="fas fa-envelope"></i> Google+</a></li>';
    fbShareLink = 'https://facebook.com/sharer/sharer.php?u='+news.link;
    code += '            <li><a href="'+fbShareLink+'" class="share-icon" target="_blank"><i class="fab fa-facebook-f"></i> facebook</a></li>';
    code += '          </ul>';
    code += ' </div>';
    code += '</div>';
    code += '</div>';
  }catch(err){
    code = "";
  }
  return code;
}

$(document).on('click','.feed-link',(e)=>{
  var route = $(e.target).attr('data-id');
  var heading = route.substring(route.lastIndexOf('/') + 1).replace(/_|-/g, " ");
  $('body').waitMe({
    bg : 'rgba(12, 16, 33,0.6)',
    color : '#fff'
  });
  $.ajax({
        type: 'GET',
        contentType: 'application/json',
        url: route,
        success: function (response) {
          $('body').waitMe("hide");
          $('.main-heading').text(heading);
          for(var i = 0 ; i < response.length ; i++){
            var codeHtml = createNewsDiv(response[i]);
            $('.news-main-container').append(codeHtml);
          }
        },
        error: function (err) {
          $('body').waitMe("hide");
          notie.alert({type: 3, text: err.responseText, time: 2});
        }
    });
});

function initDefaultPage(){
  $('body').waitMe({
    bg : 'rgba(12, 16, 33,0.6)',
    color : '#fff'
  });
  $.ajax({
        type: 'GET',
        contentType: 'application/json',
        url: '/getNews/Top_Stories',
        success: function (response) {
          $('body').waitMe("hide");
          for(var i = 0 ; i < response.length ; i++){
            var codeHtml = createNewsDiv(response[i]);
            $('.news-main-container').append(codeHtml);
          }
        },
        error: function (err) {
          $('body').waitMe("hide");
          notie.alert({type: 3, text: err.responseText, time: 2});
        }
    });
}
