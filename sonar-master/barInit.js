// 最上面那排圖案 .js

function barInitial(){

    // 右上角 登入/登出
    $("#logInBtn").click(function (){
        var mId= sessionStorage.getItem("mId");

        if(mId== null || mId.substring(0,6)== "fdtest"){ // 未登入
            location.href = "LoginAndRegister.html";
        }
        else{ // 已登入, 停留在該頁面
            location.reload();
        }
    });
    $("#logOutBtn").click(function (){
        if(sessionStorage.getItem("mId")){
            sessionStorage.clear(); // 狀態改為 未登入
        }
        // location.href = "LoginAndRegister.html";
        // 已經寫在<a href>
    });
}