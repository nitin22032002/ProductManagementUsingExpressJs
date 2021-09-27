$(document).ready(function(){
    $.getJSON('/authentication/fillstate',function(data){
        $.each(data,function(index,item){
            $("#states").append($('<option>').text(item.name).val(item.sort));
        })
    })
    $('#states').change(function(){
        $.getJSON('/authentication/fillcity',{state:$('#states').val()},function(data){
            $('#cities').empty();
            $("#cities").append($('<option>').text("--Select City--"));
            $.each(data,function(index,item){
                $("#cities").append($('<option>').text(item.cityname));
            })
        })
})
})