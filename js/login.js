
initialize();

function initialize(){

    const login_btn = document.getElementById('login');
    login_btn.addEventListener('click',submitinfo);
    
}

function submitinfo(){
    const username = $('#username').val();
    const password =$('#password').val();
    // console.log(username)
     var data ={
         username:username,
         password:password
     }
     
     if(data.username ==='Admin' && data.password ==='1234567'){
       setTimeout(' window.location.href = "home.html"; ',10);
     }
	else{
    alert('Invalid credentials');
    } 
}