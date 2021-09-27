$(document).ready(function(){
    // Check for First Name
    
    $('#fname').keyup(function(){
        var a=$('#fname').val();
        ficon.setAttribute('class',"fas fa-check")
        fname.style=""
        tem1=0
        if(a!=""){
        ficon.style="color:green;"}
        else{
            ficon.style=""
        }
        for(var i=0;i<a.length;i++){
            var t=a.charCodeAt(i);
            if(!((t>=65 && t<=90) || (t>=97 && t<=122))){
                fname.style="border-color:red;"
                ficon.setAttribute('class',"fas fa-times")
                ficon.style="color:red;"
                tem1=1;

            }
        }
    })
     
    //check for last name

    $('#lname').keyup(function(){
        var a=$('#lname').val();
        var b=$('#fname').val();
        if(b=="" || tem1==1){
            fname.style="border-color:red;"
            $('#lname').val("");
            a=""
        }
        licon.setAttribute('class',"fas fa-check")
        lname.style=""
        tem2=0
        if(a!=""){
        licon.style="color:green;"}
        else{
            licon.style=""
        }
        for(var i=0;i<a.length;i++){
            var t=a.charCodeAt(i);
            if(!((t>=65 && t<=90) || (t>=97 && t<=122) || t==32)){
                lname.style="border-color:red;"
                licon.setAttribute('class',"fas fa-times")
                licon.style="color:red;"
                tem2=1
            }
        }
    })
    // mobile number
    
    $('#mob').keyup(function(){
        var a=$('#mob').val();
        var b=$('#fname').val();
        var d=$('#lname').val();
        $.getJSON('/authentication/fetchmob',{mo:a},function(data){
         try{
            setmob=data[0].MobileNumber;}
        catch{
            setmob=""
        }
        if(b=="" || tem1==1){
            fname.style="border-color:red;"
            $('#mob').val("");
            a=""
        }
        if(d=="" || tem2==1){
            lname.style="border-color:red;"
            $('#mob').val("");
            a=""
        }
        mobicon.setAttribute('class',"fas fa-check")
        mob.style=""
        tem4=0
        if(a!=""){
        mobicon.style="color:green;"}
        else{
            mobicon.style=""
        }
        for(var i=0;i<a.length;i++){
            var t=a.charCodeAt(i);
            if(!((t>=48 && t<=57)) || a.length!=10 || setmob!=""){
                mob.style="border-color:red;"
                mobicon.setAttribute('class',"fas fa-times")
                mobicon.style="color:red;"
                tem4=1
            if(setmob!=""){
                alert("This Mobile Number Already Registered Please Try with other Number")
                break;
            }
            }
        }
     }) }) 

// for email id

$('#mail').keyup(function(){
    var a=$('#mail').val();
    var b=$('#fname').val();
    var d=$('#lname').val();
    var e=$('#mob').val();
    $.getJSON('/authentication/fetchmail',{ma:a},function(data){
     try{
        setmail=data[0].EmailId;}
    catch{
        setmail=""
    }
    if(b=="" || tem1==1){
        fname.style="border-color:red;"
        $('#mail').val("");
        a=""
    }
    if(e=="" || tem4==1){
        mob.style="border-color:red;"
        $('#mail').val("");
        a=""
    }
    if(d=="" || tem2==1){
        lname.style="border-color:red;"
        $('#mail').val("");
        a=""
    }
    mailicon.setAttribute('class',"fas fa-check")
    mail.style=""
    tem5=0
    if(a!=""){
    mailicon.style="color:green;"}
    else{
        mailicon.style=""
    }
        if(!(a.endsWith('@gmail.com')) || setmail!=""){
            mail.style="border-color:red;"
            mailicon.setAttribute('class',"fas fa-times")
            mailicon.style="color:red;"
            tem5=1
        if(setmail!=""){
            alert("This Email Id Already Registered Please Try with other Email Id")
        }
        }
 }) }) 
 // address 1
 $('#address1').keyup(function(){
        
    if($('#lname').val()=="" || tem2==1){
        lname.style="border-color:red;"
        $('#address1').val("");
    }
    if($('#fname').val()=="" || tem1==1){
        fname.style="border-color:red;"
        $('#address1').val("");
    }
    if($('#mob').val()=="" || tem4==1){
        mob.style="border-color:red;"
        $('#address1').val("");
    }
    if($('#mail').val()=="" || tem5==1){
        mail.style="border-color:red;"
        $('#address1').val("");
    }
    var a=$('#address1').val();
    tem6=1;
    if(a!=""){
    address1.style=""
    address1icon.style="color:green;"
     tem6=0}
    else if(a==""){
        address1icon.style=""
    }
})

// address 2
$('#address2').keyup(function(){
        
    if($('#lname').val()=="" || tem2==1){
        lname.style="border-color:red;"
        $('#address2').val("");
    }
    if($('#fname').val()=="" || tem1==1){
        fname.style="border-color:red;"
        $('#address2').val("");
    }
    if($('#mob').val()=="" || tem4==1){
        mob.style="border-color:red;"
        $('#address2').val("");
    }
    if($('#mail').val()=="" || tem5==1){
        mail.style="border-color:red;"
        $('#address2').val("");
    }
    if($('#address1').val()=="" || tem6==1){
        address1.style="border-color:red;"
        $('#address2').val("");
    }
    var a=$('#address2').val();
    if(a!=""){
    address1icon.style="color:green;"}
    else if(a==""){
        address1icon.style=""
    }
})
// state
$('#states').change(function(){
        
    if($('#lname').val()=="" || tem2==1){
        lname.style="border-color:red;"
        $('#states').val("--Select State--");
    }
    if($('#fname').val()=="" || tem1==1){
        fname.style="border-color:red;"
        $('#states').val("--Select State--");
    }
    if($('#mob').val()=="" || tem4==1){
        mob.style="border-color:red;"
        $('#states').val("--Select State--");
    }
    if($('#mail').val()=="" || tem5==1){
        mail.style="border-color:red;"
        $('#states').val("--Select State--");
    }
    if($('#address1').val()=="" || tem6==1){
        address1.style="border-color:red;"
        $('#states').val("--Select State--");
    }
    var a=$('#states').val();
    tem7=1;
    if(a!="--Select State--"){
    states.style=""
     tem7=0}
    else{
        states.style="border-color:red;"
    }
})
// city
$('#cities').change(function(){
        
    if($('#lname').val()=="" || tem2==1){
        lname.style="border-color:red;"
        $('#cities').val("--Select City--");
    }
    if($('#fname').val()=="" || tem1==1){
        fname.style="border-color:red;"
        $('#cities').val("--Select City--");
    }
    if($('#mob').val()=="" || tem4==1){
        mob.style="border-color:red;"
        $('#cities').val("--Select City--")}
    if($('#mail').val()=="" || tem5==1){
        mail.style="border-color:red;"
        $('#cities').val("--Select City--");
    }
    if($('#address1').val()=="" || tem6==1){
        address1.style="border-color:red;"
        $('#cities').val("--Select City--");
    }
    if($('#states').val()=="--Select State--" || tem7==1){
        states.style="border-color:red;"
        $('#cities').val("--Select City--");
    }
    var a=$('#cities').val();
    tem8=1;
    if(a!="--Select City--"){
    cities.style=""
     tem8=0}
    else{
        cities.style="border-color:red;"
    }
})
$('#passeye').click(function(){
    if(pass.type=='text'){
        passeye.innerHTML='&#128065;'
        pass.type='password';
    }
    else{
        passeye.innerHTML='<s>&#128065;</s>'
        pass.type='text';
    }
})
$('#cpasseye').click(function(){
    if(cpass.type=='text'){
        cpasseye.innerHTML='&#128065;'
        cpass.type='password';
    }
    else{
        cpasseye.innerHTML='<s>&#128065;</s>'
        cpass.type='text';
    }
})
$('#pass').keyup(function(){
        
    if($('#lname').val()=="" || tem2==1){
        lname.style="border-color:red;"
        $('#pass').val("");
    }
    if($('#fname').val()=="" || tem1==1){
        fname.style="border-color:red;"
        $('#pass').val("");
    }
    if($('#mob').val()=="" || tem4==1){
        mob.style="border-color:red;"
        $('#pass').val("")}
    if($('#mail').val()=="" || tem5==1){
        mail.style="border-color:red;"
        $('#pass').val("");
    }
    if($('#address1').val()=="" || tem6==1){
        address1.style="border-color:red;"
        $('#pass').val("");
    }
    if($('#states').val()=="--Select State--" || tem7==1){
        states.style="border-color:red;"
        $('#pass').val("");
    }
    if($('#cities').val()=="--Select City--" || tem8==1){
        cities.style="border-color:red;"
        $('#pass').val("");
    }
    var a=$('#pass').val();
    tem10=1;
    if(a!=""){
        passicon.style="color:green;"
      pass.style=""
    tem10=0}
      else if(a==""){
        pass.style=""
        passicon.style=""
    }
        else{
            pass.style="border-color:red;"
            passicon.setAttribute('class','fas fa-times');
            passicon.style="color:red;"
        }
})
$('#cpass').keyup(function(){
        
    if($('#lname').val()=="" || tem2==1){
        lname.style="border-color:red;"
        $('#cpass').val("");
    }
    if($('#fname').val()=="" || tem1==1){
        fname.style="border-color:red;"
        $('#cpass').val("");
    }
    if($('#mob').val()=="" || tem4==1){
        mob.style="border-color:red;"
        $('#cpass').val("")}
    if($('#mail').val()=="" || tem5==1){
        mail.style="border-color:red;"
        $('#cpass').val("");
    }
    if($('#address1').val()=="" || tem6==1){
        address1.style="border-color:red;"
        $('#cpass').val("");
    }
    if($('#states').val()=="--Select State--" || tem7==1){
        states.style="border-color:red;"
        $('#cpass').val("");
    }
    if($('#cities').val()=="--Select City--" || tem8==1){
        cities.style="border-color:red;"
        $('#cpass').val("");
    }
    if($('#pass').val()=="" || tem10==1){
        pass.style="border-color:red;"
        $('#cpass').val("");
    }
    var a=$('#cpass').val();
    tem11=1;
    cpassicon.setAttribute('class','fas fa-check');
    cpassicon.style=""
    if(a!="" && a==$('#pass').val()){
        cpassicon.style="color:green;"
      cpass.style=""
    tem11=0}
    else if(a==""){
        cpass.style=""
    }
        else{
            cpass.style="border-color:red;"
            cpassicon.setAttribute('class','fas fa-times');
            cpassicon.style="color:red;"
        }
})
$('#submitbtn').click(function(){
    try {
    if(tem1==0 && tem2==0 && tem4==0 && tem5==0 && tem6==0 && tem7==0 && tem8==0 && tem10==0 && tem11==0 && $('#robot').prop('checked') && $('#terms').prop('checked')){
        $('#formsignup').submit();
    }
    else{
        alert("Please Fill all mandotary field")
    }    
    } catch (error) {
        alert("Please Fill all mandotary field")
    }
})
});

