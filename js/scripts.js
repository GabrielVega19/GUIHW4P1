// GUI Assignment: HW4
// Gabriel Vega, UMass Lowell Computer Science, gabriel_vega@student.uml.edu

$(function() {
    //validates all the input for the form and attaches the function to be used on valid submit
    $("#myForm").validate({
        rules: {
            x1: {
                required: true,
                range: [-50, 50],
                number: true
            }, 
            x2: {
                required: true,
                range: [-50, 50],
                number: true,
                gteqx: true
            }, 
            y1: {
                required: true,
                range: [-50, 50],
                number: true
            }, 
            y2: {
                required: true,
                range: [-50, 50],
                number: true,
                gteqy: true
            }
        }, 
        //sets error messages for every invalid input in the form
        messages: {
            x1: {
                required: "Please enter a number for this field",
                range: "Please enter a number between -50 and 50"
            }, 
            x2: {
                required: "Please enter a number for this field",
                range: "Please enter a number between -50 and 50",
            }, 
            y1: {
                required: "Please enter a number for this field",
                range: "Please enter a number between -50 and 50"
            }, 
            y2: {
                required: "Please enter a number for this field",
                range: "Please enter a number between -50 and 50",
            }
        },
        submitHandler: function(form, e) {
            //prevents the default behavior when the submit button gets pressed 
            e.preventDefault();

            //calculates the length of the x and y arrays 
            const xLen = ($("#x2").val() - $("#x1").val()) + 1;
            const yLen = ($("#y2").val() - $("#y1").val()) + 1;

            //unhides the table
            $("#unhide").removeClass("hidden");

            //generates the multiplication table and axis headers
            const xValues = new Array(xLen);
            const yValues = new Array(yLen);
            const multTable = new Array(yLen);

            //sets the values for the x and y headers
            for (let i = 0; i < xLen; i++){
                xValues[i] = parseInt($("#x1").val()) + i;
            }
            for (let i = 0; i < yLen; i++){
                yValues[i] = parseInt($("#y1").val()) + i;
            }

            for (let y = 0; y < yLen; y++){
                multTable[y] = Array(xLen);
                for (let x = 0; x < xLen; x++){
                    multTable[y][x] = xValues[x] * yValues[y];
                }
            }

            //clears any old data in the table
            $("#table").html("");

            //appends the top header to the table
            let tr = $("<tr>");
            console.log(tr);
            for (let i = 0; i < (xLen + 1); i++) {
                if (i == 0){
                    tr.append($("<th>"));
                } else{
                    tr.append(`<th>${xValues[i-1]}</th>`);
                }
            }
            $("#table").append(tr);

            //appends rest of table
            for (let y = 0; y < yLen; y++){
                tr = $("<tr>");
                for (let x = 0; x < (xLen + 1); x++){
                    if (x == 0){
                        tr.append(`<th>${yValues[y]}</th>`);
                    } else{
                        tr.append(`<td>${multTable[y][x-1]}</td>`);
                    }
                }
                $("#table").append(tr);
            }
        }
    });
});

//creates new validator to make sure that the xend is greater or equal to xstart 
jQuery.validator.addMethod(
    "gteqx", 
    function(value, element) {
        const xLen = ($("#x2").val() - $("#x1").val()) + 1;

        //makes sure the make sure the second value was greater than the first one 
        if (xLen <= 0){
            return false;
        }
        else{
            return true
        }
    }, 
    "Make sure X End is greater than or equal to X Start"
);

//creates new validator to make sure that the yend is greater or equal to ystart 
jQuery.validator.addMethod(
    "gteqy", 
    function(value, element) {
        const yLen = ($("#y2").val() - $("#y1").val()) + 1;

        //makes sure the make sure the second value was greater than the first one 
        if (yLen <= 0){
            return false;
        }
        else{
            return true
        }
    }, 
    "Make sure Y End is greater than or equal to Y Start"
);