
document.querySelector('button').addEventListener('click',function clickHandler(e){

    // this.removeEventListener('click',clickHandler,false);

    e.preventDefault();
    var self = this;
    setTimeout(function(){
        self.className = 'loading';
    },75);

    setTimeout(function(){
        self.className = 'ready';
    },700);

},false);




function generate(){
    var data = document.getElementById('input-data').value;
    var obj = {'text': data}
    console.log(obj);
    $.ajax({
        type: 'POST',
        url:  '/qrGenerate',
        data: JSON.stringify(obj),
        // dataType: 'json',                //dataType = datatype of received;
        contentType: 'application/json',    //contenType = datatype of sent
        cache: false,
        processData: false,
        success: function(data) {
            console.log(data);
            setTimeout(function(){
                var ele = document.getElementById('output-image');
                if(ele)
                    ele.remove();
                var random_string = makeid(5);
                var source = "<img id='output-image' src='../static/qr.png?" + random_string + "width='200' height='200'>";
                $("#output").append(source);
                // document.getElementById('output-image').setAttribute('src','../static/qr.png')
            },750);
        },  
    });
}

function makeid(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
 }