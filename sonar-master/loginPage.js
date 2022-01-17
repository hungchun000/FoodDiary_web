var act; // login / register
var accountList= [];

$(document).ready(function(){
    barInitial();
    initial();

    document.onkeydown= function(event){
        var e = event || window.event || arguments.callee.caller.arguments[0];
        if(e && e.keyCode==13){
            $("#confirmBtn").click();
        }
    };
});

// 選擇: 登入 或 註冊
$("#chooseLogin").click(function (){
    act= "login";
    $("#confirmPasswardDiv").hide(); // 再次確認密碼 隱藏
});
$("#chooseRegister").click(function (){
    act= "register";
    $("#confirmPasswardDiv").show(); // 再次確認密碼 顯示

});

// 檢查輸入是否符合
// $("#account").focusout(function (){
//     var accStr= $("#account").val();
    
//     if(act== "register"){ // 註冊
//         var result= checkAccount(accStr);
//     }
//     else{ // 登入
//         var result= isAccount(accStr);
//     }
// });
$("#password").focusout(function (){
    if(act== "register"){ // 註冊
        var pwStr= $("#password").val();
        var result= checkPassword(pwStr);
    }
});
$("#confirmPassward").focusout(function (){
    if(act== "register"){ // 註冊
        var confirmPwStr= $("#confirmPassward").val();
        var result= DoubleCheckPassword(confirmPwStr);
    }
});

// 點擊 確認
$("#confirmBtn").click(function (){
    var accStr= $("#account").val();
    var pwStr= $("#password").val();

    if(act== "login"){ // 登入
        // if(isAccount(accStr)){
            let cmd = {};
            cmd["act"]= "login";
            cmd["account"]= accStr;
            cmd["password"]= pwStr;
            $.post("login.php", cmd, function (data){
                data= JSON.parse(data);

                if(data.status== true){ // login success
                    $("#errorMsg").html("");
                    sessionStorage.setItem("mId", data.mId);
                    location.href = "addDiary.html";
                }else{ // login failed
                    $("#passwordMsg").css("color", "brown");
                    $("#passwordMsg").html("帳號或密碼有誤！");
                }
            });
            // 確認帳號密碼是否符合
            /* 
            ***********************************************************
            (post)
            {
                "act": "login",
                "account": accStr,
                "password": pwStr
            }

            (get)
            {
                "status": true/ false, 
                "msg": "Successfully log in."/ "Could not find the user.", ...
                "mId": "fd000001"
            }
            ***********************************************************
            */

            // let data= {"status": true, "info": "Successfully log in.", "mId": "fd000001"};
        // }
    }
    else{ // 註冊
        var confirmPwStr= $("#confirmPassward").val();
        if(checkAccount(accStr)&& checkPassword(pwStr)&& DoubleCheckPassword(confirmPwStr)){
            // 確認是否註冊成功
            /* 
            ***********************************************************
            (post)
            {
                "act": "register",
                "account": accStr,
                "password": pwStr
            }

            (get)
            {
                "status": true/ false, 
                "msg": "Successfully register."/ "Try again.", 
                "mId": "fd000001"
            }
            ***********************************************************
            */
           let cmd = {};
           cmd["act"]= "register";
           cmd["account"]= accStr;
           cmd["password"]= pwStr;
           
            // let data= {"status": true, "info": "Successfully log in.", "mId": "fd000001"};
            $.post("register.php", cmd, function (data){
                data= JSON.parse(data);
                
                if(data.status== true){ // 註冊 success
                    $("#errorMsg").html("");
                    sessionStorage.setItem("mId", data.mId);
                    location.href = "addDiary.html";
                }else{ // 註冊 failed
                    $("#confirmPasswardMsg").css("color", "brown");
                    $("#confirmPasswardMsg").html("error"); // 顯示錯誤訊息
                }
            });
        }
    }
});

function initial(){
    act= "login";
    
    // get all account(acc List)
    /* 
    ***********************************************************
    (post)
    {
        "act": "getAllAccount"
    }

    (get)
    {
        "status": true/ false, 
        "accountList": ["account1", "account2", "account3", ...]
    }
    ***********************************************************
    */
    
    let data= {"status": true, "accountList": ["aaa111", "aaa1234", "abcd123"]}; //test
    if(data.status== true){
        accountList= data.accountList;
        $("#errorMsg").html("");
    }
    else{
        $("#errorMsg").html("Have something wrong...<br>請稍後重試");
    }
}

function isAccount(accStr){
    for(var i= 0; i< accountList.length; i++){
        if(accStr== accountList[i]){ // 有此帳號
            $("#accountMsg").css("color", "darkolivegreen");
            $("#accountMsg").html("<i class=\"bi bi-check2-all\"></i>");
            return true;
        }
    }
    $("#accountMsg").css("color", "brown");
    $("#accountMsg").html("無此帳號");
    return false;
}

function checkAccount(accStr){
    for(var i= 0; i< accountList.length; i++){
        if(accStr== accountList[i]){ // 重複帳號
            $("#accountMsg").css("color", "brown");
            $("#accountMsg").html("此帳號已有人使用");
            return false;
        }
    }

    var regexp= /^\w{7,14}$/
    if(accStr.length< 7|| accStr.length> 14){ // 長度7~14
        $("#accountMsg").css("color", "brown");
        $("#accountMsg").html("請輸入7~14個英文、數字或底線");
        return false;
    }
    else if(!regexp.test(accStr)){ // 數字、英文、底線
        $("#accountMsg").css("color", "brown");
        $("#accountMsg").html("只能輸入英文、數字或底線");
        return false;
    }
    else{ // ok
        $("#accountMsg").css("color", "darkolivegreen");
        $("#accountMsg").html("<i class=\"bi bi-check2-all\"></i>");
        return true;
    }
}


function checkPassword(pwStr){
    var regexp= /^\w{6,12}$/
    if(pwStr.length< 6|| pwStr.length> 12){ // 長度6~12
        $("#passwordMsg").css("color", "brown");
        $("#passwordMsg").html("請設定6~12個英文、數字或底線");
        return false;
    }
    else if(!regexp.test(pwStr)){ // 數字、英文、底線
        $("#passwordMsg").css("color", "brown");
        $("#passwordMsg").html("只能輸入英文、數字或底線");
        return false;
    }
    else{ // ok
        $("#passwordMsg").css("color", "darkolivegreen");
        $("#passwordMsg").html("<i class=\"bi bi-check2-all\"></i>");
        return true;
    }
}

function DoubleCheckPassword(confirmPwStr){
    var pwStr= $("#password").val();
    if(pwStr!= confirmPwStr){ // 密碼不一致
        $("#confirmPasswardMsg").css("color", "brown");
        $("#confirmPasswardMsg").html("請再次確認");
        return false;
    }
    else{ // ok
        $("#confirmPasswardMsg").css("color", "darkolivegreen");
        $("#confirmPasswardMsg").html("<i class=\"bi bi-check2-all\"></i>");
        return true;
    }
}
