var list_text = [];
var list_Canvas = [];


// read text 
function read_text(){
    document.getElementById('inputfile')
        .addEventListener('change', function() {
        
        var fr=new FileReader();
        fr.onload=function(){
            document.getElementById('output')
                    .textContent=fr.result;
        }
        fr.readAsText(this.files[0]);
    })
}


// preview image
function preview_all_image(){
    list_text = document.getElementById('output').textContent.split('\n');
    if(list_text){
        for(let i=0; i < list_text.length; i++){
            var pre = document.createElement("pre");
            pre.textContent = list_text[i];
            pre.id = String(i);
            $('#second_row').append(pre);
            
        }
    }

    for(let i=0; i < list_text.length; i++){
        html2canvas(document.getElementById(i), {
            onrendered: function (canvas) { 
                list_Canvas[i] = canvas;
            }
        })
    }
}

function sleep(milliseconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
      if ((new Date().getTime() - start) > milliseconds){
        break;
      }
    }
  }

//download image 
function down_all_image(){
    var imgageData

    if(!localStorage.length){
        for(let i=0; i < list_Canvas.length; i++){
            imgageData = list_Canvas[i].toDataURL("image/png");
            localStorage.setItem(i, imgageData);
        }
    }

    var count_image = localStorage.length-1;
    while(count_image){
        var recentImageURL = localStorage.getItem(localStorage.key(count_image))

        var a = $("<a>")
                .attr("href", recentImageURL)
                .attr("download", 'img' + localStorage.key(count_image) + '.png')
                .appendTo("body");
        
        a[0].click();
        a.remove();
        count_image -=1;
        sleep(500);
    }
}

function clear_localstorage(){
    localStorage.clear();
}

