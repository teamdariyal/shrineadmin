const textareabtn = document.getElementById('textareabtn');
const videobtn = document.getElementById('videobtn');
const photobtn = document.getElementById('photobtn');
const linkbutton = document.getElementById('linkbutton');

const uploading_section = document.getElementById('uploading_section');
const photo_section = document.getElementById('photo');
const textArea = document.getElementById('textArea');
const textAreaLink = document.getElementById('textAreaLink');

const send_button =document.getElementById('send_button');
const linkUpdate_button = document.getElementById('donate_button');




document.getElementById('fileupload').addEventListener('change', (event) => {
    window.selectedFile = event.target.files[0];
    document.getElementById('file_name_video').innerHTML = window.selectedFile.name;
});
document.getElementById('imgfileupload').addEventListener('change', (event) => {
    window.selectedFile = event.target.files[0];
    document.getElementById('file_name_image').innerHTML = window.selectedFile.name;
});


Initialization();

function  Initialization(){

    console.log(textareabtn,videobtn,uploading_section,textArea,textAreaLink);

// button  click fuction to show the particular div elements......
    textareabtn.addEventListener("click",textareabtnFunction);
    videobtn.addEventListener("click",videobtnFunction);
    photobtn.addEventListener("click",photosection);
 	linkbutton.addEventListener("click",UploadLinkFunction); 

	linkUpdate_button.addEventListener("click",UpdateLinkAddress);

    send_button.addEventListener("click",storeTextFunction);
    const upload_btn = document.getElementById('upload-button-video');
    upload_btn.addEventListener('click',uploadFileVideo);
    const image_uploadbtn =document.getElementById('upload-img-button');
    image_uploadbtn.addEventListener('click',imguploadFile)
    

}

function uploadFileVideo(e){
    let foldername =$('#videos').val();
    console.log(foldername,window.selectedFile);
    document.getElementById('prograss-bar-video').style.display="block";
    uploadFile(window.selectedFile,foldername);

}
function imguploadFile(e){
    let foldername ="photo";
    console.log(foldername,window.selectedFile);
    document.getElementById('prograss-bar-photo').style.display="block";
    uploadFileImage(window.selectedFile,foldername);
}

// video uploading handlers.............................................
function uploadFile(file,foldername) {

    var formData = new FormData();
    let asset_url = "assets/"+ foldername+"/";
    formData.append('file_to_upload', file);
    formData.append("uploading_url",asset_url);
    var ajax = new XMLHttpRequest();
    ajax.upload.addEventListener("progress", progressHandler, false);
    ajax.addEventListener("load", transferCompletevideo);
    ajax.open('POST', './upload.php');
    ajax.send(formData);
}

function transferCompletevideo(event){
    document.getElementById("progress_status").innerHTML ="file upload completed";
    setTimeout(()=>{
        document.getElementById("progress_bar").value = Math.round(0);
        document.getElementById("progress_status").style.display="none";
        document.getElementById("progress_bar").style.display ="none";
    },3000)
}

function progressHandler(event) {
    document.getElementById("progress_status").style.display="block";
    document.getElementById("progress_bar").style.display ="block";
    var percent = (event.loaded / event.total) * 100;
    document.getElementById("progress_bar").value = Math.round(percent);
    document.getElementById("progress_status").innerHTML = Math.round(percent) + "% uploaded";
}

//Image Uploading Handlers................................................................

function uploadFileImage(file,foldername) {

    var formData = new FormData();
    let asset_url = "assets/"+ foldername+"/";
    formData.append('file_to_upload', file);
    formData.append("uploading_url",asset_url);
    var ajax = new XMLHttpRequest();
 
    ajax.upload.addEventListener("progress", progressHandlerImage, false);
    ajax.addEventListener("load", transferComplete);
    ajax.open('POST', 'upload.php');
    ajax.send(formData);
}
function transferComplete(event){

    document.getElementById("progress_status_Image").innerHTML ="file upload completed";
    setTimeout(()=>{
      
        document.getElementById("progress_bar_Image").value = Math.round(0);
        document.getElementById("progress_status_Image").style.display="none";
        document.getElementById("progress_bar_Image").style.display ="none";

    },3000)
}

function progressHandlerImage(event) {
    document.getElementById("progress_status_Image").style.display="block";
    document.getElementById("progress_bar_Image").style.display ="block";
    var percent = (event.loaded / event.total) * 100;
    document.getElementById("progress_bar_Image").value = Math.round(percent);
    document.getElementById("progress_status_Image").innerHTML = Math.round(percent) + "% uploaded";
}




// ......................................

function textareabtnFunction(){

    console.log('text button !');
    uploading_section.style.display = "none";
    textArea.style.display ="block";
    photo_section.style.display="none";
	textAreaLink.style.display="none"
    // storeRecord();
}

function UploadLinkFunction(){

	console.log('Link!');
	textAreaLink.style.display="block";
    uploading_section.style.display = "none";
    textArea.style.display ="none";
    photo_section.style.display="none";
}


async function storeTextFunction(){

    let name =$('#name').val();
    let about =$('#about').val();
    console.log(name,about)
    let data ={
        name:name,
        about:about
    };
    await fetch("backend/storeRecord.php", {
        method: 'post',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
       
    }).then((responseData) => {
        console.log(responseData);
        if(responseData.status === 200){
            alert("record successfully stored.");
            console.log();
             $('#name')[0].value = "";
            $('#about')[0].value =" ";
     
            // window.location.href = "index.html";
        }

    }).catch((error) => {
        alert(error)
    })
}


async function UpdateLinkAddress(){

    let link =$('#link').val();
 
    let data ={
        link:link,
    };
    await fetch("backend/UpdateUrl.php", {
        method: 'post',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
       
    }).then((responseData) => {
       
        if(responseData.status === 200){
            responseData.json().then((response)=>{
           	alert(response.message);
            });
        }else{
        console.log(responseData);
        }

    }).catch((error) => {
        alert(error)
    })
}




function videobtnFunction(){
    console.log('videos button !');
    uploading_section.style.display = "block";
    textArea.style.display ="none";
    photo_section.style.display="none";
	textAreaLink.style.display="none"
    // storeRecord();
}
function photosection(){
    uploading_section.style.display = "none";
    textArea.style.display ="none";
    photo_section.style.display="block";
	textAreaLink.style.display="none"

}

// async function uploadFile() {
//     let formData = new FormData(); 
//     //let asset_url = assetsUrl+"/video1/"+
//     let foldername =$('#videos').val();
//     let fileupload =$('#fileupload');
//     console.log(foldername);
//     let asset_url = "assets/"+foldername+"/";
//     formData.append("file", fileupload[0].files[0]);
//     formData.append("upload_url",asset_url);
//     await fetch('upload.php', {
//     method: "POST", 
//     body: formData,
//     }).then(response => console.log(response))
//     .then(result => {
//       alert('Success:', result);
//     })
//     .catch(error => {
//     console.log('Error:', error);
//     });
// }

// async function imguploadFile() {
//     let formData = new FormData(); 
//     //let asset_url = assetsUrl+"/video1/"+
//     // let foldername =$('#upload-img-button').val();
//     let foldername ="photo";
//     let fileupload =$('#imgfileupload');
//     console.log(fileupload)
//     console.log(foldername);
//     let asset_url = "assets/"+ foldername+"/";
//     formData.append("file_to_upload", fileupload[0].files[0]);
//     formData.append("uploading_url",asset_url);
//     var ajax = new XMLHttpRequest();
//     ajax.upload.addEventListener("progress", progressHandler, false);
//     ajax.open('POST', 'upload.php');
//     ajax.send(formData);
// }



