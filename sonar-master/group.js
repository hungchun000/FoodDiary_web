var loadTimes= 1;

$(document).ready(function(){
    barInitial();
    initial();
});

function initial(){
    var mId= sessionStorage.getItem("mId");

    if(mId== null){ // 未登入
        sessionStorage.setItem("mId", "fdtest01");
    }

    // var data= { // test
    //     "status": true, 
    //     "msg": "Successfully show home page.",
    //     "groupPost": [ // 8格
    //         {"foodName": "餐點", 
    //         "shopName": "店家", 
    //         "mealTime": "b", 
    //         "foodCount": 1, 
    //         "foodCost": 200, 
    //         "foodCal": 1200, 
    //         "foodPoint": 3, 
    //         "foodNote": "備註備註備註備註備註備註", 
    //         "foodImg": "img/portfolio-img/1.jpg", 
    //         "mealDate": "2012-07-03"},
    //         {"foodName": "餐點2", 
    //         "shopName": "店家2", 
    //         "mealTime": "d", 
    //         "foodCount": 1, 
    //         "foodCost": 111, 
    //         "foodCal": 2222, 
    //         "foodPoint": 5, 
    //         "foodNote": "讚", 
    //         "foodImg": "img/portfolio-img/2.jpg", 
    //         "mealDate": "2022-01-17"}
    //         ]
    // };

    // // let cmd= {"act": "groupPost", "mId": mId, "loadTimes": 1};
    // // $.post("myrecords.php", cmd, function (data){
    // //     data= JSON.parse(data);

    //     if(data.status== true){
    //         let groupPost= data.groupPost;
    //         console.log(groupPost);

    //         for(var i= 0; i< groupPost.length; i++){
    //             var onePost= "<div class=\"single-blog-area mb-100 wow fadeInUp\" data-wow-delay=\"300ms\">"+
    //                     "<div class=\"blog-post-thumbnail\"><img src=\"";
    //             onePost+= groupPost[i].foodImg+ "\">";
    //             onePost+= "<div class=\"post-date\"><a href=\"javascript: void(0)\">";

    //             var mealDateStr= groupPost[i].mealDate; // 2012-07-03
    //             var mealDate= "";
    //             var monthStr= mealDateStr.substring(5, 7); // 07
    //             if(monthStr== "01") mealDate+= "Jan";
    //             else if(monthStr== "02") mealDate+= "Feb";
    //             else if(monthStr== "03") mealDate+= "Mar";
    //             else if(monthStr== "04") mealDate+= "Apr";
    //             else if(monthStr== "05") mealDate+= "May";
    //             else if(monthStr== "06") mealDate+= "Jun";
    //             else if(monthStr== "07") mealDate+= "Jul";
    //             else if(monthStr== "08") mealDate+= "Aug";
    //             else if(monthStr== "09") mealDate+= "Sep";
    //             else if(monthStr== "10") mealDate+= "Oct";
    //             else if(monthStr== "11") mealDate+= "Nov";
    //             else mealDate+= "Dec";
    //             mealDate+= " "+ mealDateStr.substring(8, 10);
    //             mealDate+= " \'"+ mealDateStr.substring(2, 4); // '12

    //             onePost+= mealDate; // 日期(Jan 01 '09)(月 日 '年)
    //             onePost+= "</a></div></div><div class=\"post-content\">"+
    //                         "<a href=\"javascript: void(0)\" class=\"headline\">";
    //             onePost+= groupPost[i].shopName+ " <strong>"+ groupPost[i].foodName;

    //             onePost+= "</strong></a><div class=\"post-meta\">"+
    //                             "<a href=\"javascript: void(0)\" class=\"comments\">By member"+
    //                             "</a> | <span style=\"color:gold\">";
                
    //             for(var point= 0; point< groupPost[i].foodPoint; point++) // 評價(1~5)
    //                 onePost+= "<i class=\"fa fa-star\"></i>&nbsp;"; // 星星

    //             onePost+= "</span></div><h6>"+ groupPost[i].foodCount+ "份&nbsp;";
    //             onePost+= "<i class=\"fa fa-dollar\" style=\"color:darkgoldenrod\">"+ groupPost[i].foodCost+ "元</i>&nbsp;"; // 金額
    //             onePost+= "<i class=\"fa fa-fire\" style=\"color:darkred\">"+ groupPost[i].foodCal+ "cal </i>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"; // 熱量
                         
    //             switch(groupPost[i].mealTime){ // 時段
    //                 case 'b':
    //                 onePost+= "<i class=\"bi bi-brightness-alt-high\">Breakfast</i></h6><p>";
    //                 break;
    //                 case 'l':
    //                 onePost+= "<i class=\"bi bi-brightness-high\">Lunch</i></h6><p>";
    //                 break;
    //                 case 'd':
    //                 onePost+= "<i class=\"bi bi-cloud-moon\">Dinner</i></h6><p>";
    //                 break;
    //                 case 'n':
    //                 onePost+= "<i class=\"bi bi-moon\">Night Meal</i></h6><p>";
    //                 break;
    //                 case 'o':
    //                 onePost+= "<i class=\"bi bi-emoji-wink\">Other</i></h6><p>";
    //                 break;
    //             }
    //             onePost+= groupPost[i].foodNote+ "</p></div></div>"; // 備註

    //             $("#groupPost").append(onePost);
    //         }
    //         // for end.
    //     }
    //     else{

    //     }
    // // });
    /* 
    ***********************************************************
    (post)
    {
        "act": "groupPost",
        "mId": "fd000001",
        "loadTimes": 1
    }

    (get)
    {
        "status": true/ false, 
        "msg": "Successfully show home page."/ "Can't show post.",
        "groupPost": [ // loadTimes x8 後的8格
            {"foodName": "餐點", "shopName": "店家", "mealTime": "b", "foodCount": 1, "foodCost": 50, "foodCal": 425, "foodPoint": (1~5), "foodNote": "備註", "foodImg": "???", "mealDate": "???"}, {}, {}, ...
        ]
    }
    ***********************************************************
    */
    
    var data= { // test
        "status": true, 
        "msg": "Successfully show home page.",
        "grouplist": ["groupName", "1g", "923", "我要吃肉肉"]
    };

    let cmd= {"act": "groupList", "mId": mId};
    $.post("mygroupList.php", cmd, function (data){
        data= JSON.parse(data);

        if(data.status== true){
            var groupList= data.grouplist;
            for(var i= 0; i< groupList.length; i++){
                $("#groupList").append("<li><a href=\"javascript: void(0)\">"+ groupList[i]+"</a></li>");
            }
        }
        else{

        }
    });
    /* 
    ***********************************************************
    (post)
    {
        "act": "groupList",
        "mId": "fd000001"
    }

    (get)
    {
        "status": true/ false, 
        "msg": "Successfully show home page."/ "Can't show post.",
        "groupPost": [ // loadTimes x8 後的8格
            {"foodName": "餐點", "shopName": "店家", "mealTime": "b", "foodCount": 1, "foodCost": 50, "foodCal": 425, "foodPoint": (1~5), "foodNote": "備註", "foodImg": "???", "mealDate": "???"}, {}, {}, ...
        ],
        "grouplist": ["groupname", "1g", "923", ...]
    }
    ***********************************************************
    */
}

$("#search-btn").click(function (){
    $("#searchResult").hide();
    $("#joinGroup").hide();
    $("#noResult").hide();
    var groupName= $("#searchGroupId").val();
    var mId= sessionStorage.getItem("mId");
    
    // let data= {"status": true, "msg": "Successfully create a group.", "groupName": "im a Group"}; // test

    let cmd= {"act": "searchGroup", "mId": mId, "groupName": groupName};
    
    $.post("searchgroup.php", cmd, function (data){
        data= JSON.parse(data);

        if(data.status== true){
            $("#searchResult").html("<i class=\"bi bi-record-fill\"> </i>"+ data.groupName);
            $("#joinGroup").show();
        }
        else{
            $("#noResult").show();
        }
    });
    /* 
    ***********************************************************
    (post)
    {
        "act": "searchGroup",
        "mId": "fd000001",
        "groupId": groupId
    }

    (get)
    {
        "status": true/ false, 
        "msg": "Successfully create a group."/ "error"
        "groupName": "im a Group"
    }
    ***********************************************************
    */
});

$("#createGroup-btn").click(function (){
    var groupName= $("#createGroupName").val();
    if(!groupName || groupName.length== 0){
        $("#createResult").html("請輸入群組名稱");
        $("#createResult").css("color", "darkred");
    }
    else{
        var mId= sessionStorage.getItem("mId");
    
        let data= {"status": true, "msg": "Successfully create a group."}; // test

        let cmd= {"act": "group", "mId": mId, "groupName": groupName};
        
        $.post("createGroup.php", cmd, function (data){
            data= JSON.parse(data);

            if(data.status== true){
                $("#createResult").html("<i class=\"bi bi-circle\"> </i>創建群組成功");
                $("#createResult").css("color", "green");
                $("#groupList").append("<li><a href=\"javascript: void(0)\">"+ groupName+"</a></li>");
            }
            else{
                $("#createResult").html("<i class=\"bi bi-x-lg\"> </i>無法創建此群組");
                $("#createResult").css("color", "red");
            }
        });
        /* 
        ***********************************************************
        (post)
        {
            "act": "createGroup",
            "mId": "fd000001",
            "groupName": "哈哈哈111"
        }

        (get)
        {
            "status": true/ false, 
            "msg": "Successfully create a group."/ "error"
        }
        ***********************************************************
        */
    }
});

$("#groupList").on("click", "a", function(e){
    var groupName= $(this).text();
    
    sessionStorage.setItem("groupName", groupName);
    location.href = "groupData.html";
});

$("#joinGroup").click(function (){
    var groupName= $("#searchResult").text().substring(1,);
    var groupId= $("#searchGroupId").val();
    var mId= sessionStorage.getItem("mId");
    
    // let data= {"status": true, "msg": "Successfully join a group."}; // test

    let cmd= {"act": "joinGroup", "mId": mId, "groupName": groupName};
    
    $.post("joingroup.php", cmd, function (data){
        data= JSON.parse(data);

        if(data.status== true){
            // console.log(groupName);
            sessionStorage.setItem("groupName", groupName);
            location.href = "groupData.html";
        }
        else{
            $("#noResult").show();
        }
    });
    /* 
    ***********************************************************
    (post)
    {
        "act": "joinGroup",
        "mId": "fd000001",
        "groupId": groupId
    }

    (get)
    {
        "status": true/ false, 
        "msg": "Successfully join"/ "error"
    }
    ***********************************************************
    */
});