var controlEditInfo= 0;
var controlEditGoal= 0;

$(document).ready(function(){
    barInitial();
    initial();
});

function initial(){
    var mId= sessionStorage.getItem("mId");
    
    if(mId== null || mId.substring(0,6)== "fdtest"){ // 未登入
        $(".sonar-services-area").html("<h1>請先登入</h1>");
        $(".type-goal-area").html("<h3>請先登入</h3>");
        $(".testimonial-slides").html("<h6>請先登入</h6><h4>請先登入</h4><h2>請先登入</h2><h5>請先登入</h5><h1>請先登入</h1><h3>請先登入</h3><br><p>:)))</p>");
        $(".section-heading h2").html("請先登入");
    }
    else{ // 已登入
        // get user info
        /* 
        ***********************************************************
        (post)
        {
            "act": "userInfo",
            "mId": mId
        }

        (get)
        {
            "status": true/ false, 
            "msg": "Successfully get."/ "Could not find the user data.",
            "account": "abc111",
            "password": "123456",
            "name": "陳小明",
            "gender": 'F'/ 'M',
            "age": 22,
            "weight": 48.6, 
            "goal": ["目標1", "目標2", "目標3", "目標4", "目標5"]
        }
        ***********************************************************
        */
        // let data= {"status": true, 
        //             "account": "abc1112",
        //             "password": "aaa1234",
        //             "name": "陳小明",
        //             "gender": "F",
        //             "age": 22,
        //             "weight": 48.6, 
        //             "goal": ["目標1<br>換行1", "目標2", "目標3", "目標4"]
        //         };

        let cmd= {"act": "userInfo", "mId": mId};
        $.post("userdata.php", cmd, function (data){
            data= JSON.parse(data);

            if(data.status== true){
                $("#nameMsg").html(data.name); // 暱稱
                $("#name").val(data.name);
                $("#accountMsg").html(data.account); // 帳號
                
                var pwStr= data.password.substring(0, 2);
                for(var i= 2; i< data.password.length; i++) pwStr+= "*"; 
                $("#passwordMsg").html(pwStr); // 密碼
                $("#password").val(data.password);
                $("#confirmPassward").val(data.password);
                
                $("#genderMsg").html(data.gender== "F"? "female": "male"); // 性別
                $("input[name= \"sex\"][value= \""+ data.gender+ "\"]").attr("checked", true); //radio 賦值

                $("#weightMsg").html(data.weight.toString()+ " (KG)"); // 體重
                $("#weight").val(data.weight);
                
                $("#ageMsg").html(data.age.toString()+ " (Years old)"); // 年齡
                $("#age").val(data.age);
                
                $(".section-heading h2").html("個人目標");

                var goalList= data.goal.split("&");
                console.log(goalList);
    
                for(var i= 0; i< 5; i++){
                    var aGoal= "";
                    if(i>= goalList.length){
                        $("#inputGoal"+ (i+ 1).toString()).val(aGoal);
                        aGoal= "(未填寫)";
                    }
                    else{
                        aGoal= goalList[i];
                        $("#inputGoal"+ (i+ 1).toString()).val(aGoal);
                    }
                    
                    if(i== 0) $("#goalOne").html(aGoal);
                    else if(i== 1) $("#goalTwo").html(aGoal);
                    else if(i== 2) $("#goalThree").html(aGoal);
                    else if(i== 3) $("#goalFour").html(aGoal);
                    else $("#goalFive").html(aGoal);
                }
            }
            else{
                $(".sonar-services-area").html("<h1>Error...請稍後重試</h1>");
                $(".type-goal-area").html("<h3>Error...請稍後重試</h3>");
                $(".testimonial-slides").html("<h6>Error...請稍後重試</h6><h4>Error...請稍後重試</h4><h2>Error...請稍後重試</h2><h5>Error...請稍後重試</h5><h1>Error...請稍後重試</h1><h3>Error...請稍後重試</h3><br><p>:(((</p>");
                $(".section-heading h2").html("Error...請稍後重試");
            }
        });
    }
}

// 修改個資 按鈕
$("#edit-info-btn").click(function (){
    if(controlEditInfo== 0){
        $(".contact-form").show();
        $("#save-info-btn").show();
        $("#edit-info-btn").html("取&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;消");
        controlEditInfo= 1;
    }
    else{
        $(".contact-form").hide();
        $("#save-info-btn").hide();
        $("#edit-info-btn").html("修&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;改");
        controlEditInfo= 0;
    }
});
// 儲存個資 按鈕
$("#save-info-btn").click(function (){
    var mId= sessionStorage.getItem("mId");
    var nameStr= $("#name").val();
    var pwStr= $("#password").val();
    var confirmPwStr= $("#confirmPassward").val();
    var genderStr= $("input[name='sex']:checked").val(); // radio 取值
    var weightNum= parseFloat($("#weight").val());
    var ageNum= parseInt($("#age").val());

    // if( typeof(genderStr) == "undefined")// 檢查radio 完全沒有選取
    if(!checkPassword(pwStr) || !DoubleCheckPassword(confirmPwStr)){
        $("erroeMsg").html("請修改密碼");
    }
    else{
        let cmd= {"act": "editUserInfo",
                "mId": mId,
                "password": pwStr,
                "name": nameStr,
                "gender": genderStr,
                "age": ageNum,
                "weight": weightNum};
        // console.log(cmd);
        // edit user info
        /* 
        ***********************************************************
        (post)
        {
            "act": "editUserInfo",
            "mId": mId,
            "password": "123456",
            "name": "陳小明",
            "gender": 'F'/ 'M',
            "age": 22,
            "weight": 48.6
        }
    
        (get)
        {
            "status": true/ false, 
            "msg": "Successfully get."/ "Could not find the user data."
        }
        ***********************************************************
        */
        $.post("updateuserdata.php", cmd, function (data){
            data= JSON.parse(data);
            // console.log(data);
            // let data= {"status": true};
            if(data.status== true){
                $(".contact-form").hide();
                $("#save-info-btn").hide();
                controlEditInfo= 0;
                $("#edit-info-btn").html("修&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;改");
                location.reload();
            }
            else{
                $("erroeMsg").html("error");
            }
        });
    }
});

// 修改目標 按鈕
$("#edit-goal-btn").click(function (){
    if(controlEditGoal== 0){
        $(".goal_textarea-control").show();
        $("#edit-goal-btn").html("取&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;消");
        controlEditGoal= 1;
    }
    else{
        $(".goal_textarea-control").hide();
        $("#edit-goal-btn").html("修&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;改");
        controlEditGoal= 0;
    }
});
// 儲存目標 按鈕
$("#save-goal-btn").click(function (){
    var mId= sessionStorage.getItem("mId");
    var goalList= [];
    for(var i= 0; i< 5; i++){
        var aGoal= $("#inputGoal"+ i.toString()).val();
        if(aGoal) goalList.push(aGoal);
    }

    let cmd= {"act": "editUserGoal",
            "mId": mId,
            "goal": goalList};

    // edit user info
    /* 
    ***********************************************************
    (post)
    {
        "act": "editUserGoal",
        "mId": mId,
        "goal": ["目標1", "222222", ...]
    }

    (get)
    {
        "status": true/ false, 
        "msg": "Successfully get."/ "Could not find the user data."
    }
    ***********************************************************
    */
    $.post("updategoal.php", cmd, function (data){
        data= JSON.parse(data);

        // let data= {"status": true};
        if(data.status== true){
            $(".goal_textarea-control").hide();
            $("#edit-goal-btn").html("修&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;改");
            controlEditGoal= 0;
            location.reload();
        }
        else{
            $("errorMsg-goal").html("error");
        }
    });
});

$("#password").focusout(function (){
    var pwStr= $("#password").val();
    var result= checkPassword(pwStr);
});
$("#confirmPassward").focusout(function (){
    var confirmPwStr= $("#confirmPassward").val();
    var result= DoubleCheckPassword(confirmPwStr);
});

function checkPassword(pwStr){
    var regexp= /^\w{6,12}$/
    if(pwStr.length< 6|| pwStr.length> 12){ // 長度6~12
        $("#checkMsg").css("color", "brown");
        $("#checkMsg").html("<i class=\"bi bi-x-lg\"></i>");
        return false;
    }
    else if(!regexp.test(pwStr)){ // 數字、英文、底線
        $("#checkMsg").css("color", "brown");
        $("#checkMsg").html("<i class=\"bi bi-x-lg\"></i>");
        return false;
    }
    else{ // ok
        $("#checkMsg").css("color", "darkolivegreen");
        $("#checkMsg").html("<i class=\"bi bi-check2-all\"></i>");
        return true;
    }
}

function DoubleCheckPassword(confirmPwStr){
    var pwStr= $("#password").val();
    if(pwStr!= confirmPwStr){ // 密碼不一致
        $("#DoublecheckMsg").css("color", "brown");
        $("#DoublecheckMsg").html("<i class=\"bi bi-x-lg\"></i>");
        return false;
    }
    else{ // ok
        $("#DoublecheckMsg").css("color", "darkolivegreen");
        $("#DoublecheckMsg").html("<i class=\"bi bi-check2-all\"></i>");
        return true;
    }
}
