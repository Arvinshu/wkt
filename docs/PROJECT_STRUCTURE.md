# 项目工程结构说明

## 工程结构总览
```java
docs                                      // 项目文档
├── ARCHITECTURE.md                       // 系统架构说明文档
├── DB_SCHEMA.md                          // 数据库设计文档
└── PROJECT_STRUCTURE.md                  // 项目工程结构说明（本文档）
src/main/
├── java/org.ls/                          // 主Java包
│   ├── config/                           // Spring Boot配置类
│   │   ├── CacheConfig.java              // 缓存策略配置
│   │   ├── WebConfig.java                // Web MVC配置
│   │   └── PageHelperConfig.java         // 分页插件配置
│   │
│   ├── controller/                       // 控制器层
│   │   ├── StatsController.java          // 部门统计控制器
│   │   └── WktController.java            // 工时数据控制器
│   │
│   ├── entity/                           // 实体类
│   │   ├── DepartmentStat.java           // 部门统计实体
│   │   └── Wkt.java                      // 工时数据实体
│   │
│   ├── mapper/                           // MyBatis映射接口
│   │   ├── StatsMapper.java              // 统计模块Mapper
│   │   └── WktMapper.java                // 工时模块Mapper
│   │
│   └── service/                          // 业务逻辑层
│   │   ├── impl/                         // 服务实现类
│   │   │   └── WktServiceImpl.java       // 工时服务实现
│   │   └── WktService.java               // 工时服务接口
│   └── Application.java                  // 程序主入口
│
└── resources/
    ├── static/                           // 前端静态资源
    │   ├── components/                   // 可复用组件
    │   │   └── nav.html                  // 导航菜单组件
    │   │
    │   ├── css/                          // 样式文件
    │   │   ├── nav.css                   // 导航专用样式
    │   │   ├── stats.css                 // 统计页样式
    │   │   └── style.css                 // 全局基础样式
    │   │
    │   ├── js/                           // 脚本文件
    │   │   ├── app.js                    // 主页面逻辑
    │   │   ├── nav-loader.js             // 导航加载器
    │   │   └── stats.js                  // 统计页逻辑
    │   │
    │   ├── index.html                    // 默认入口（部门统计页）
    │   └── working-hours.html            // 工时数据页
    │
    ├── application.properties            // 主配置文件
    └── mybatis/                          // MyBatis配置
        └── mapper/                       // XML映射文件
            ├── StatsMapper.xml           // 统计模块SQL
            └── WktMapper.xml             // 工时模块SQL
README.md                                 // 项目说明文档
```
