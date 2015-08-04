

$(document).ready(function() {

 

 		 

        $(".feature").on("click", function(){  
            $("#globe").html('<object data="https://en.wikipedia.org/wiki/Portal:Featured_content"/>');
            
        });


        $(".random").on("click", function(){  
            $("#globe").html('<object data="http://en.wikipedia.org/wiki/Special:Random"/>');
            
        });



       
    });	


