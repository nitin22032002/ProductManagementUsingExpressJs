$(document).ready(function(){
    $('#loginbtn').click(function(){
        var a=0;
        var t=0
        var k=0
        $.getJSON("/authentication/fetchdata",function(data){
            $.each(data,function(index,item){
                    if($('#lmail').val()==item.EmailId){
                        $.getJSON('/authentication/decode',{pass:item.userPassword},function(data){
                            var pass=data[0].pass;
                            k+=1
                        if(pass==$('#lpass').val()){        
                            $('#lpass').val(item.userPassword);
                            $('#formlogin').submit();
                        }
                        else{
                            a+=1;
                        }
                        if(a==k){
                            alert("Email Id or Password Invalid");
                        }     
                    })     
                }
                else{
                    t+=1;
                }
                if(t==data.length){
                        alert("Email Id or Password Invalid");
                    }
            })
        })
        });
    $('#passeye').click(function(){
        if(lpass.type=='text'){
            passeye.innerHTML='&#128065;'
            lpass.type='password';
        }
        else{
            passeye.innerHTML='<s>&#128065;</s>'
            lpass.type='text';
        }
    })
    $('#forgotlable').click(function(){
        var a=prompt("Enter Your Email Id");
        $.getJSON("/authentication/fetchdata",function(data){
            var tem=0;
            $.each(data,function(index,item){
                if(a==item.EmailId){
                        $.getJSON('/authentication/decode',{pass:item.userPassword},function(data){
                        tem=1;
                        var t="Your Password is "+data[0].pass
                        alert(t)
                        if(tem==0 && a!=null && data.length==index+1){
                            alert("Email Id Invalid");
                        }
                    })
                }
                
            })
        })
    })
    $('#signupbtn').click(function(){
        window.location.href="/authentication/signUp"
    })

    $('#lmail').keyup(function(){
        var a=$('#lmail').val();
        mailicon.setAttribute('class',"fas fa-check")
        lmail.style=""
        if(a!=""){
        mailicon.style="color:green;"}
        else{
            mailicon.style=""
        }
            if(!(a.endsWith('@gmail.com')) || a==""){
                lmail.style="border-color:red;"
                mailicon.setAttribute('class',"fas fa-times")
                mailicon.style="color:red;"
            }
     })
     
     $('#lpass').keyup(function(){
        var a=$('#lpass').val();
        if(a!=""){
            passicon.style="color:green;"
          lpass.style=""}
          else if(a==""){
            lpass.style=""
            passicon.style=""
        }
            else{
                lpass.style="border-color:red;"
                passicon.setAttribute('class','fas fa-times');
                passicon.style="color:red;"}
    })
}) 