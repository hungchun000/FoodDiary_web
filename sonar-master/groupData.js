$(document).ready(function(){
    barInitial();
    initial();
});

function initial(){
    var mId= sessionStorage.getItem("mId");
    var groupName= sessionStorage.getItem("groupName");

    if(mId== null){ // 未登入
        sessionStorage.setItem("mId", "fdtest01");
    }
    
    // var data= { // test
    //     "status": true, 
    //     "msg": "Successfully show home page.",
    //     "memberData": [
    //         {"nickname": "mmmember", "account": "aaaa001"},
    //         {"nickname": "邱爸爸", "account": "dad0426"},
    //         {"nickname": "邱母", "account": "mom0926"}
    //     ],
    //     "memberCount": 3
    // };

    var cmd= {"act": "group", "mId": mId, "groupName": groupName};
    $.post("groupmemberDatalist.php", cmd, function (data){
        data= JSON.parse(data);

        if(data.status== true){
            $("#groupName").html(groupName);
            var memberCount= data.memberCount;
            $("#memberCount").html(memberCount);
            var memberData= data.memberData;

            for(var i= 0; i< memberData.length; i++){
                $("#memberData").append("<span>"+ memberData[i].nickname+ "</span><h4>@"+ memberData[i].account+ "</h4>");
            }
        }
        else{
            $("groupName").html("Error...");
        }
    });
    /* 
    ***********************************************************
    (post)
    {
        "act": "group",
        "mId": "fd000001",
        "groupName": groupName
    }

    (get)
    {
        "status": true/ false, 
        "msg": "Successfully show home page."/ "Can't show post.",
        "memberData": [
            {"nickname": "mmmember", "account": "aaaa001"}
        ],
        "memberCount": 3
    }
    ***********************************************************
    */

//    var data= { // test
//         "status": true, 
//         "msg": "Successfully show home page.",
//         "groupList": ["groupname", "1g", "923", "我要吃肉肉"]
//     };

    var cmd= {"act": "groupList", "mId": mId};
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
        "groupList": ["groupname", "1g", "923", ...]
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