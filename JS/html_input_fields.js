$(document).ready(function(){

    function validation(){
        $("#form1").validate({
            rules:{
                
                name: "required",
                id: "required",
                class: "required",
                value: "required",
                placeholder: "required",
                
                required: "required",
                readonly: "required",
                option1: "required"
                
    
            },
            messages: {
                name: "Please enter type",
                id: "Please enter id",
                class: "Please enter class",
                value: "Please enter value",
                placeholder: "Please enter placeholder",
                
                required: "Please select an option",
                readonly: "Please select an option",
                option1: "Please enter option"
                
            }
        });
    };




    function addOption(){
        $("#option_div").append("<label for='option_div' class='form-label'>Option</label>");
        $("#option_div").append('<input type="text" class="form-control" id="opt_input" placeholder="Enter Option" name="option1">');
        $("#add_option_btn").append('<button type="button" id="add_option" class="btn btn-dark mb-3">Add Option</button>');
        $("#add_option").click(function(){
            $("#option_div").append('<input type="text" class="form-control my-2" id="opt_input" placeholder="Enter Option" name="option1">');
        })    
    };




    function clearOption(){
        document.getElementById("option_div").innerHTML = "";
        document.getElementById("add_option_btn").innerHTML = "";
    };




    function addJSON(){
        var formArray = $("#form1").serializeArray();
        var j = "";
        var formData = {};
        var opt_array = [];
        $.each(formArray, function(i, field){
            if(field.name == "option1"){
                opt_array.push(field.value)
                formData[field.name] = opt_array;
            }else{
                formData[field.name] = field.value;
            }
        });

    
        fields.push(formData);
        var j = JSON.stringify(fields,null, 2)
        document.getElementById("json").innerHTML = "<pre>" +  j + "</pre>"; 
        $("form").trigger("reset");
    };




    const fields = [];

    $("form").hide();
    $("#html_fields").hide();
    $("#cancel").click(function(){
        $("form").trigger("reset");
    });
    $("#show_btn").click(function(){
        $("#form1").hide();
        $("#html_fields").show();
    });
    


    $("#next_btn").click(function(){

        $("#form1").show();
        $("form").trigger("reset");
        $("#html_fields").hide();
        document.querySelector("input[id='type']").setAttribute("value", $("#input_fields").val());

        if($("#input_fields").val() == 'select'){

            addOption();

            
        }else{ 

            clearOption();

        }

    });



    $("#save").click(function(e){

        e.preventDefault();
        validation();

        if($("#form1").valid()){

            addJSON();
            
        }

    });



    $("#show_btn").click(function(){

        document.getElementById("html_fields").innerHTML = "";

        fields.forEach(function(arrayItem){

            if(arrayItem.type != "select" && arrayItem.type != "textarea" && arrayItem.type != "checkbox" && arrayItem.type != "radio"){

                addInputField();     
                

            }else if(arrayItem.type == "select"){

                addSelectField();
                
                
            }else if(arrayItem.type == "textarea"){

                addTextareaField();
                

            }else if(arrayItem.type == "checkbox"){

                addCheckbox();
                

            }else if(arrayItem.type == "radio"){

                addRadio();
                

            }



            function addInputField(){
                if(arrayItem.type != "button"){
                    $("#html_fields").append(`<div><label class='form-label'> ${arrayItem.type} </label></div>`);
                }
        
                $("#html_fields").append(`<input type='${arrayItem.type}' name='${arrayItem.name}' id='${arrayItem.id}' value='${arrayItem.value}' 
                                         placeholder='${arrayItem.placeholder}' 
                                         ${(arrayItem.type == "button") ? `class='btn btn-success my-3 ${arrayItem.class}'` : `class='form-control ${arrayItem.class}'`}
                                         ${(arrayItem.required == "true") ? "required" : "return false"}
                                         ${(arrayItem.readonly == "true") ? "readonly" : "return false"} >`);
            };



            function addSelectField(){
                $("#html_fields").append("<div><label class='form-label'> Select </label></div>");
                        $("#html_fields").append(`<select type='${arrayItem.type}' name='${arrayItem.name}' id='${arrayItem.id}' value='${arrayItem.value}'
                                                 placeholder='${arrayItem.placeholder}' class='form-select ${arrayItem.class}'
                                                 ${(arrayItem.required == "true") ? "required" : "return false"}
                                                 ${(arrayItem.readonly == "true") ? "readonly" : "return false"} ></select>`);
                        
                        for(let x in arrayItem.option1){
        
                            $(`#${arrayItem.id}`).append(`<option value="${arrayItem.option1[x]}">${arrayItem.option1[x]}</option>`)
                            
                        }
            };



            function addTextareaField(){
                $("#html_fields").append("<div><label class='form-label'> Textarea </label></div>");
                $("#html_fields").append(`<textarea type='${arrayItem.type}' name='${arrayItem.name}' id='${arrayItem.id}' value='${arrayItem.value}'
                                         class='form-control ${arrayItem.class}' placeholder='${arrayItem.placeholder}'
                                         ${(arrayItem.required == "true") ? "required" : "return false"}
                                         ${(arrayItem.readonly == "true") ? "readonly" : "return false"} ></textarea>`);
            };



            function addCheckbox(){
                $("#html_fields").append(`<input type='${arrayItem.type}' name='check' id='${arrayItem.id}' value='${arrayItem.value}'
                    class='form-check-input border border-dark me-3 ${arrayItem.class}' placeholder='${arrayItem.placeholder}'
                    ${(arrayItem.required == "true") ? "required" : "return false"}
                    ${(arrayItem.readonly == "true") ? "readonly" : "return false"} ></input>
                    <label class='form-label'> ${arrayItem.value} </label><br>`);
            };



            function addRadio(){
                $("#html_fields").append(`<input type='${arrayItem.type}' name='radio' id='${arrayItem.id}' value='${arrayItem.value}'
                    class='form-check-input border border-dark me-3 ${arrayItem.class}' placeholder='${arrayItem.placeholder}'
                    ${(arrayItem.required == "true") ? "required" : "return false"}
                    ${(arrayItem.readonly == "true") ? "readonly" : "return false"} ></input>
                    <label class='form-label'> ${arrayItem.value} </label><br>`);
            };



        }) 
    })
});

