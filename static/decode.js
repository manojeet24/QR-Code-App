// where files are dropped + file selector is opened
var dropRegion = document.getElementById("drop-region"),
// where images are previewed
imagePreviewRegion = document.getElementById("image-preview");

// open file selector when clicked on the drop region
var fakeInput = document.createElement("input");
fakeInput.type = "file";
fakeInput.accept = "image/*";
// fakeInput.multiple = true;
dropRegion.addEventListener('click', function() {
    fakeInput.click();
});
fakeInput.addEventListener("change", function() {
    var file = fakeInput.files;
    handleFiles(file);
});

//Drag and Drop
function preventDefault(e) {
    e.preventDefault();
      e.stopPropagation();
}

dropRegion.addEventListener('dragenter', preventDefault, false);
dropRegion.addEventListener('dragleave', preventDefault, false);
dropRegion.addEventListener('dragover', preventDefault, false);
dropRegion.addEventListener('drop', preventDefault, false);

//Drop Event
function handleDrop(e) {
    var data = e.dataTransfer,
    files = data.files;
    //console.log(typeof(files))
        
    handleFiles(files);    
}


dropRegion.addEventListener('drop', handleDrop, false);

function handleFiles(files) {
    var prev_image = document.getElementById('img-view');
    if(prev_image)
        prev_image.remove();
    for (var i = 0, len = files.length; i < len; i++) {
        if (validateImage(files[i]))
            previewAnduploadImage(files[i]);
    }
}

function validateImage(image) {
    // check the type
    var validTypes = ['image/jpeg', 'image/png', 'image/jpg'];
    if (validTypes.indexOf( image.type ) === -1) {
        alert("Invalid File Type");
        return false;
    }

    // check the size
    var maxSizeInBytes = 10e6; // 10MB
    if (image.size > maxSizeInBytes) {
        alert("File too large");
        return false;
    }
    console.log('Image is Valid'); 
    return true;
}

function previewAnduploadImage(image) {

   // console.log(typeof(image));

    // container
    var imgView = document.createElement("div");
    imgView.className = "image-view";
    imgView.id="img-view";
    imagePreviewRegion.appendChild(imgView);

    // previewing image
    var img = document.createElement("img");
    imgView.appendChild(img);

    // progress overlay
    var overlay = document.createElement("div");
    overlay.className = "overlay";
    imgView.appendChild(overlay);

    // read the image...
    var reader = new FileReader();
    reader.onload = function(e) {
        img.src = e.target.result;
        img.width="150" ;
        img.height="150";
        var ele = document.getElementById('drop-qr');
        if(ele)
            ele.remove();
    }
    reader.readAsDataURL(image);  

    var formData = new FormData();
    formData.append('image', image);

    $(function() {
        $.ajax({
            type: 'POST',
            url:  '/qrDecode',
            data: formData,
            contentType: false,
            cache: false,
            processData: false,
            success: function(data) {
                console.log(data);
                if(validURL(data)){
                    console.log('Link')
                    $('#link').attr("href", data);
                    $('#link').html(data);
                    $('#output').html('');
                }
                else
                {
                    $('#link').attr("href", '');
                    $('#link').html('');
                    $('#output').html(data);
                }
            },
        });
    });
}

function validURL(myURL) {
    var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|'+ // domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))'+ // ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ //port
    '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
    '(\\#[-a-z\\d_]*)?$','i');
    return pattern.test(myURL);
 }

dropRegion.addEventListener('dragenter', highlight, false);
dropRegion.addEventListener('dragover', highlight, false);
dropRegion.addEventListener('dragleave', unhighlight, false);
dropRegion.addEventListener('drop', unhighlight, false);

function highlight() {
    dropRegion.classList.add('highlighted');
}
function unhighlight() {
    dropRegion.classList.remove("highlighted");
}