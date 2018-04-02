var o='mr',t='a',type='null',c=null,page=0,query=null,flag=false;
var limit=48;
var url="https://api.avgle.com/v1/videos/0?limit=";
var chip=document.getElementsByClassName("mdui-chip-title")[0];
function cate(){
    document.getElementsByName("o")[0].addEventListener('closed.mdui.select', function () {
      if(this.value!=o){
        o=this.value;
        query=null;chip.innerText=page=0;
        resource(url+limit+"&o="+o+"&t="+t+"&type="+type+"&c="+c);
      }
    });
    document.getElementsByName("t")[0].addEventListener('closed.mdui.select', function () {
      if(this.value!=t){
        t=this.value;
        query=null;chip.innerText=page=0;
        resource(url+limit+"&o="+o+"&t="+t+"&type="+type+"&c="+c);
      }
        
    });
    document.getElementsByName("type")[0].addEventListener('closed.mdui.select', function () {
      if(this.value!=type){
        type=this.value;
        query=null;chip.innerText=page=0;
        resource(url+limit+"&o="+o+"&t="+t+"&type="+type+"&c="+c);
      }
    });
    document.getElementsByName("c")[0].addEventListener('closed.mdui.select', function () {
      if(this.value!=c){
        c=this.value;
        query=null;chip.innerText=page=0;
        resource(url+limit+"&o="+o+"&t="+t+"&type="+type+"&c="+c);
      }
    });
    document.getElementById("search").onclick=function(){
        query=document.getElementsByClassName("mdui-textfield-input")[0].value;chip.innerText=page=0;
        if(query){
          resource("https://api.avgle.com/v1/search/"+query+"/0?limit=48");
        }else{
          resource("https://api.avgle.com/v1/videos/0?o=&limit=48");
        }
        return false;
    }
}


function resource(href){
    var content=document.getElementById("content");
    content.innerHTML="";
    document.getElementsByClassName("mdui-progress")[0].style.display="block";
    var xhr=new XMLHttpRequest();
    xhr.open('get',href);
    xhr.send();
    xhr.onreadystatechange=function () {
        if(xhr.readyState==4){
            eval("var info="+xhr.responseText);
            var data=info.response.videos,el='';
            if(info.success){
                for(var i in data){
                    el+='<div class="mdui-col-xs-12 mdui-col-sm-6 mdui-col-md-4 mdui-col-lg-3 mdui-m-b-2"><div class="mdui-card mdui-center"><div class="mdui-card-media">';
                    el+='<img src="'+data[i].preview_url+'"/>';
                    el+='<div class="mdui-card-media-covered"><div class="mdui-card-primary"><div class="mdui-card-primary-title">';
                    el+=data[i].keyword+'</div><div class="mdui-card-primary-subtitle">'+data[i].title+'</div></div></div></div>';
                    el+='<div class="mdui-card-actions mdui-color-black"><button class="mdui-btn mdui-ripple pbtn" id="'+data[i].title+'" name="'+data[i].embedded_url+'">播放</button></div></div></div>';
                }
                content.innerHTML=el;
                videos();
                if(info.response.has_more){
                  flag=true;
                }else{
                  flag=false;
                }
                console.log(flag);
            }else{
                content.innerHTML="<p>获取数据失败</p>";
            }
            
        }
    }
    xhr.onloadend=function(){
        document.getElementsByClassName("mdui-progress")[0].style.display="none";
    }
}

function pages(){
  document.getElementById("prev").onclick=function(){
    if(page>0){
      page--;chip.innerText=page+1;
      if(query){
        
        resource("https://api.avgle.com/v1/search/"+query+"/"+page+"?limit="+limit);
      }else{
        resource("https://api.avgle.com/v1/videos/"+page+"?limit="+limit+"&o="+o+"&t="+t+"&type="+type+"&c="+c);
      }
    }else{
      mdui.snackbar({
        message: '已经是首页了'
      });
    }
  };
  document.getElementById("next").onclick=function(){
    if(flag){
      page++;chip.innerText=page+1;
      if(query){
        resource("https://api.avgle.com/v1/search/"+query+"/"+page+"?limit="+limit);
      }else{
        resource("https://api.avgle.com/v1/videos/"+page+"?limit="+limit+"&o="+o+"&t="+t+"&type="+type+"&c="+c);
      }
    }else{
      mdui.snackbar({
        message: '已经是尾页了'
      });
    }
  };
}

function videos(){
    $(".pbtn").click(function () {
          var info=this;
          layer.open({
              type: 2,
              title:info.id,
              area : ['100%','100%'],
              content: info.name,
              cancel: function(){
                  document.body.removeChild(onMask);
                  document.body.removeChild(onMask1);
              }
          });
          var onMask=document.createElement("div");
          onMask.id="mask";
          onMask.style.width="100%";
          onMask.style.height="100px";
          document.body.appendChild(onMask);
          var onMask1=document.createElement("div");
          onMask1.id="mask1";
          onMask1.style.width="100%";
          onMask1.style.height="100px";
          document.body.appendChild(onMask1);
          return false;
      });
}
window.onload=function(){
    if(screen.width<=600){
      limit=10;
    }
    cate();
    pages();
    chip.innerText=page+1;
    resource(url+limit+"&o="+o+"&t="+t+"&type="+type+"&c="+c);
}

