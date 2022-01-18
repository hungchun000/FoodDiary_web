var imgSrc= "";
var hotFood= [];
var fileInput= document.querySelector("#foodImg");

fileInput.addEventListener("change", function(event) { 
    const file = event.target.files[0]; // 得到檔案的 Blob
    if(file){
        //jpeg
        var validExts = new Array(".gif", ".jpg", ".png");
        var fileExt = fileInput.value;
        fileExt = fileExt.substring(fileExt.lastIndexOf('.'));
        
        if (validExts.indexOf(fileExt)< 0){
            fileInput.value = null;
            return false;
        }
        else{
            // 轉成 ArrayBuffer：透過 FilerReader() 來轉成 ArrayBuffer 的格式
            // 在 reader.onLoad 的時候，可以透過 reader.result 來取得 ArrayBuffer
            const reader = new FileReader();
            // 轉換成 DataURL
            reader.readAsDataURL(file);
            
            reader.onload= function(){
                // 將圖片 src 替換為 DataURL
                var image= new Image();
                image.height= 400;
                image.title= file.name;
                image.src= reader.result;
                $("#foodImgMsg").html("<br><img src= \""+ image.src+ "\" style=\"height:400px;\">");
                imgSrc= image.src;
            }
        }
    }
});

$(document).ready(function(){
    barInitial();
    initial();
});

function initial(){
    imgSrc= "";
    var mId= sessionStorage.getItem("mId");

    if(mId== null || mId.substring(0,6)== "fdtest"){ // 未登入
        $(".portfolio-title h2").html("“ Plesae Login.<br>&emsp;&emsp;<span>請先登入</span> .””");
        $(".latest-news-widget-area").html("...");
    }
    else{ // 已登入
        // let cmd= {"act": "getHotPost", "mId": mId};
        // $.post("updateuserdata.php", cmd, function (data){
            //     data= JSON.parse(data);

        // get hot post
        /* 
        ***********************************************************
        (post)
        {
            "act": "getHotPost",
            "mId": "fd000001"
        }

        (get)
        {
            "status": true/ false, 
            "info": "Successfully show home page."/ "Can't show post.",
            "hotFood": [ // 5格
                {"foodName": "餐點", "shopName": "店家", "foodCost": 50, "foodCal": 425, "foodNote": "備註", "foodImg": "???"}, {}, {}, ...
            ]
        }
        ***********************************************************
        */

        // 常吃餐點
    //    let data= { //test
    //         "status": true, 
    //         "info": "Successfully show home page.",
    //         "hotFood": [ // 8格
    //             {"foodName": "餐點", 
    //             "shopName": "店家", 
    //             "foodCost": 123, 
    //             "foodCal": 1233, 
    //             "foodNote": "備註3333333333備註3333333333備註3333333333備註3333333333", 
    //             "foodImg": "img/bg-img/slide1.jpg"}
    //         ]
    //     };
    //     if(data.status== true){
    //         hotFood= data.hotFood;
    //         for(var i= 0; i< hotFood.length; i++){
    //             var onePost= "<div class=\"widget-single-blog-post d-flex align-items-start\">"+
    //                             "<div class=\"widget-post-thumbnail pr-3\"><img src=\"";
    //             onePost+= hotFood[i].foodImg+ "\" style=\"width: 70px;\">"; // 餐點圖片
    //             onePost+= "</div><div class=\"widget-post-content\"><a href=\"javascript: void(0)\">";
    //             onePost+= hotFood[i].shopName+ " <strong>"+ hotFood[i].foodName+ "</strong></a>"; // 店名+餐點名
    //             onePost+= "<br><i class=\"fa fa-dollar\" style=\"color:darkgoldenrod\">"+ hotFood[i].foodCost; // 金額
    //             onePost+= "元</i>&nbsp;<i class=\"fa fa-fire\" style=\"color:darkred\">"+ hotFood[i].foodCal; // 熱量
                
    //             var foodNote= hotFood[i].foodNote;
    //             if(foodNote.length> 10) foodNote= foodNote.substring(0, 10)+ "... ...";
    //             onePost+= " cal </i><p>"+ foodNote+ "</p></div></div>"; // 備註

    //             $(".widget-blog-post").append(onePost);
    //         }
    //     }
    //     else{
    //         $(".widget-blog-post").html("...");
    //     }
        // });
    }
}

$("#shopName").focusout(function (){
    var shopName= $("#shopName").val();
    if(!shopName || shopName.length== 0){
        $("#shopNameMsg").html("請填寫店名");
        $("#shopNameMsg").css("color", "darkred");
        // return false;
    }
    else{
        $("#shopNameMsg").html("");
        // $("#shopNameMsg").css("color", "darkred");
    }
});
$("#foodName").focusout(function (){
    var foodName= $("#foodName").val();
    if(!foodName || foodName.length== 0){
        $("#foodNameMsg").html("請填寫餐點名稱");
        $("#foodNameMsg").css("color", "darkred");
        // return false;
    }
    else{
        $("#foodNameMsg").html("");
        // $("#foodNameMsg").css("color", "darkred");
    }
});

$("#save-btn").click(function(){
    var mId= sessionStorage.getItem("mId");

    var shopName= $("#shopName").val();
    if(!shopName || shopName.length== 0){
        $("#shopNameMsg").html("請填寫店名");
        $("#shopNameMsg").css("color", "darkred");
        return false;
    }

    var foodName= $("#foodName").val();
    if(!foodName || foodName.length== 0){
        $("#foodNameMsg").html("請填寫餐點名稱");
        $("#foodNameMsg").css("color", "darkred");
        return false;
    }

    var mealTimeStr= $("input[name='mealTime']:checked").val(); // radio 取值
    if(!mealTimeStr || mealTimeStr.length== 0){
        $("#mealTimeMsg").html("請選擇時段");
        $("#mealTimeMsg").css("color", "darkred");
        return false;
    }
    var mealTime= mealTimeStr.substring(0, 1);
    
    var foodCountStr= $("#foodCount").val();
    if(!foodCountStr || foodCountStr.length== 0){
        $("#foodCountMsg").html("請輸入餐點份數");
        $("#foodCountMsg").css("color", "darkred");
        return false;
    }
    var foodCount= parseInt(foodCountStr);

    var foodCalStr= $("#foodCal").val();
    if(!foodCalStr || foodCalStr.length== 0){
        $("#foodCalMsg").html("請輸入此餐熱量");
        $("#foodCalMsg").css("color", "darkred");
        return false;
    }
    var foodCal= parseInt(foodCalStr);

    var foodCostStr= $("#foodCost").val();
    if(!foodCostStr || foodCostStr.length== 0){
        $("#foodCostMsg").html("請輸入此餐價格");
        $("#foodCostMsg").css("color", "darkred");
        return false;
    }
    var foodCost= parseInt(foodCostStr);
    

    var foodPointStr= $("#foodPoint").val();
    if(!foodPointStr || foodPointStr.length== 0){
        $("#foodPointMsg").html("請選擇評分");
        $("#foodPointMsg").css("color", "darkred");
        return false;
    }
    var foodPoint= parseInt(foodPointStr);

    var mealDate= $("#mealDate").val();
    if(!mealDate || mealDate.length!= 10){
        $("#mealDateMsg").html("請選擇日期");
        $("#mealDateMsg").css("color", "darkred");
        return false;
    }

    if(!imgSrc || imgSrc.length== 0){
        $("#foodImgMsg").html("請上傳圖片...");
        $("#foodImgMsg").css("color", "darkred");
        return false;
    }

    var foodNote= $("#foodNote").val();

    let cmd= {
        "mId": mId,
        "shopName": shopName,
        "foodName": foodName,
        "mealTime": mealTime,
        "foodCount": foodCount,
        "foodCal": foodCal,
        "foodCost": foodCost,
        "foodPoint": foodPoint,
        "foodImg": imgSrc,
        "mealDate": mealDate,
        "foodNote": foodNote
    };
    $.post("addrecords.php", cmd, function (data){
            data= JSON.parse(data);

        // add a record
        /* 
        ***********************************************************
        (post)
        {
            "mId": mId,
            "shopName": shopName,
            "foodName": foodName,
            "mealTime": mealTime,
            "foodCount": foodCount,
            "foodCal": foodCal,
            "foodCost": foodCost,
            "foodPoint": foodPoint,
            "foodImg": imgSrc,
            "mealDate": mealDate,
            "foodNote": foodNote
        }

        (get)
        {
            "status": true/ false, 
            "msg": "Successfully add a record."/ "Can't add."
        }
        ***********************************************************
        */
        // let data= {"status": true, "msg": "Can't add."};
        if(data.status== true){
            console.log(cmd);
            location.href = "home.html";
        }
        else{
            $("#errorMsg").css("color", "brown");
            $("#errorMsg").html("Something wrong..."); // 
        }
        // console.log(imgSrc);
    });
});

$(".widget-blog-post").on("click", "a", function(e){ // 點擊常吃餐點
    var nameStr=  $(this).text();
    var nameList= nameStr.split(" ");
    var foodIndex= -1;

    for(var i= 0; i< hotFood.length; i++){
        if(nameList[0]== hotFood[i].shopName && nameList[1]== hotFood[i].foodName){
            foodIndex= i;
            break;
        }
    }

    if(foodIndex>= 0){
        $("#shopName").val(hotFood[foodIndex].shopName);
        $("#foodName").val(hotFood[foodIndex].foodName);
        $("#foodCost").val(hotFood[foodIndex].foodCost);
        $("#foodCal").val(hotFood[foodIndex].foodCal);
        $("#foodNote").val(hotFood[foodIndex].foodNote);
        $("#foodImgMsg").html("<br><img src= \""+ hotFood[foodIndex].foodImg+ "\" style=\"height:400px;\">");
    }
});