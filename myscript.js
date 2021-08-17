var list_text = new Array();
var list_Canvas =  new Array();
var start_counter;



function sleep(milliseconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
      if ((new Date().getTime() - start) > milliseconds){
        break;
      }
    }
  }


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
    document.getElementById('second_row').innerHTML = "";
    list_Canvas = new Array();
}


// preview image
function preview_all_image(){
    list_text = document.getElementById('output').textContent.split('\n');
    
    for(let i=0; i < list_text.length; i++){
        var pre = document.createElement("pre");
        pre.textContent = list_text[i];
        pre.id = i;
        $('#second_row').append(pre);
    }


    for(let i=0; i < list_text.length; i++){
        html2canvas(document.getElementById(i)).then(canvas => {
            list_Canvas[i] = canvas;
        });
    }

}



//download image 
function down_all_image(){

    var count_image = localStorage.length-1;
    while(count_image){
        var recentImageURL = localStorage.getItem(count_image)

        var a = $("<a>")
                .attr("href", recentImageURL)
                .attr("download", 'img' + count_image + '22222222222.png')
                .appendTo("body");
        
        a[0].click();
        a.remove();
        if(count_image==start_counter) break;
        count_image -=1;
        sleep(200);
        
    }
}

function clear_localstorage(){
    localStorage.clear();
    
}

function save_localstorage(){
    var imgageData;
    start_counter = localStorage.length;
    for(let i=0; i < list_Canvas.length; i++){
        imgageData = list_Canvas[i].toDataURL("image/png");
        localStorage.setItem(String(i+start_counter), imgageData);
    }
    // console.log(start_counter, localStorage.length);
}
    

