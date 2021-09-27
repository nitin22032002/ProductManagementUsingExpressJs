$(document).ready(function(){
    $.getJSON('/product/fetchtype',function(data){
        $.each(data,function(index,item){
            $('#ptype').append($('<option>').val(item.producttypeid).text(item.producttype));
        })
    })
    $.getJSON('/product/fetchtype',function(data){
        $.each(data,function(index,item){
            $('#ptype1').append($('<option>').val(item.producttypeid).text(item.producttype));
        })
        $('#ptype1').append($('<option>').val(0).text("ALL"));
    })
    $('#ptype1').change(function(){

        location.href='/product/?a='+$('#ptype1').val()+'&name='+$('#n').val()+'&state='+$('#s').val()+'&city='+$('#c').val();
    })
    $('#ptype').change(function(){
        if($('#ptype').val()!='--Select Product Type--'){
        $.getJSON('/product/fetchgst',{pid:$('#ptype').val()},function(data){
            gst.setAttribute('readonly',false);    
            $('#gst').val(data[0].producttypegst);    
            gst.setAttribute('readonly',true);    
        })}
        else{
            alert("Please select valid option");
        }
    })
})