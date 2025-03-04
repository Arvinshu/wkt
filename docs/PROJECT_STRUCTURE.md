# 项目工程结构说明

## 工程结构总览
```java
WKT
│  .gitignore
│  pom.xml
│  README.md
│
├─docs
│      ARCHITECTURE.md
│      DB_SCHEMA.md
│      PROJECT_STRUCTURE.md
│
└─src
   ├─main
   │  ├─java
   │  │  └─org
   │  │      └─ls
   │  │          │  Application.java
   │  │          │
   │  │          ├─config
   │  │          │      CacheConfig.java
   │  │          │      PageHelperConfig.java
   │  │          │
   │  │          ├─controller
   │  │          │      DepartmentManagerController.java
   │  │          │      ProjectProfitCenterController.java
   │  │          │      StatsController.java
   │  │          │      WktController.java
   │  │          │
   │  │          ├─entity
   │  │          │      DepartmentManager.java
   │  │          │      DepartmentStat.java
   │  │          │      ProjectProfitCenter.java
   │  │          │      Wkt.java
   │  │          │
   │  │          ├─mapper
   │  │          │      DepartmentManagerMapper.java
   │  │          │      ProjectProfitCenterMapper.java
   │  │          │      StatsMapper.java
   │  │          │      WktMapper.java
   │  │          │
   │  │          └─service
   │  │              │  DepartmentManagerService.java
   │  │              │  ProjectProfitCenterService.java
   │  │              │  WktService.java
   │  │              │
   │  │              └─impl
   │  │                      DepartmentManagerServiceImpl.java
   │  │                      ProjectProfitCenterServiceImpl.java
   │  │                      WktServiceImpl.java
   │  │
   │  └─resources
   │      │  application.properties
   │      │
   │      ├─mybatis
   │      │  └─mapper
   │      │          DepartmentManagerMapper.xml
   │      │          ProjectProfitCenterMapper.xml
   │      │          StatsMapper.xml
   │      │          WktMapper.xml
   │      │
   │      ├─static
   │      │  │  department-manager.html
   │      │  │  index.html
   │      │  │  project-profit-center.html
   │      │  │  working-hours.html
   │      │  │
   │      │  ├─components
   │      │  │      nav.html
   │      │  │
   │      │  ├─css
   │      │  │      data-maintain.css
   │      │  │      manager.css
   │      │  │      nav.css
   │      │  │      stats.css
   │      │  │      style.css
   │      │  │
   │      │  └─js
   │      │          app.js
   │      │          common.js
   │      │          data-maintain.js
   │      │          manager.js
   │      │          nav-loader.js
   │      │          profit-center.js
   │      │          stats.js
   │      │          test.js
   │      │
   │      └─templates
   └─test
       └─java


```
