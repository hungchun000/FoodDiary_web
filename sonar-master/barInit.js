// 最上面那排圖案 .js

async function barInitial(){

    await new Promise ((resolve, reject) => {checkLogin(resolve, reject);});

    // 右上角 登入/登出
    $("#logInBtn").click(function (){
        // if 已登入, 停留在該頁面
        location.reload();
        // else (未登入)
        location.href = "LoginAndRegister.html";
    });
    $("#logOutBtn").click(function (){
        // 狀態改為 未登入
        // userPermission = 0;
        sessionStorage.clear();

        // location.href = "LoginAndRegister.html";
        // 已經寫在<a href>
    });
}

function checkLogin(resolve, reject){
    // 已登入 
    // 未登入
    resolve(0);
}