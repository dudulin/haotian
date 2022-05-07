    DEMO
    ===========================

    ###########环境依赖
    node v0.10.28+
    redIs ~

    ###########部署步骤
    1. 添加系统环境变量
        export $PORTAL_VERSION="production" // production, test, dev


    2. npm install  //安装node运行环境

    3. gulp build   //前端编译

    4. 启动两个配置(已forever为例)
        eg: forever start app-service.js
            forever start logger-service.js


    
