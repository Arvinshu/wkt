# 工时统计系统（wkt）

## 项目简介

本项目是一个基于 Spring Boot 的工时统计系统，旨在帮助企业或团队管理员工的工时数据，并生成统计报表。

## 业务及功能

* **工时记录：** 员工可以记录自己的工时数据，包括工作内容、工作时长和工作日期。
* **工时统计：** 系统可以根据部门、员工或日期等条件，统计工时数据，并生成报表。
* **数据展示：** 通过前端页面，直观地展示工时统计结果。

### 前端页面功能

* **`index.html` - 部门统计页：**
    * 展示部门级别的工时统计概览，使用户能够快速了解整体的工时情况。
    * 提供各部门的工时汇总信息，例如部门名称、总工时等。
* **`working-hours.html` - 工时数据页：**
    * 展示员工级别的详细工时数据，包括员工姓名、工作内容、工作时长和工作日期等。
    * 使用户能够深入了解具体的工作记录。
* **通用导航：**
    * 两个页面都包含相同的导航组件（`nav.html`），方便用户在不同页面之间切换。

## 技术栈

* **后端：**
    * Spring Boot
    * MyBatis
    * Maven
* **前端：**
    * HTML
    * CSS
    * JavaScript

## 项目结构
docs/ # 项目文档
src/main/java/org/ls/ # 主Java包
├── config/ # Spring Boot配置类
├── controller/ # 控制器层
├── entity/ # 实体类
├── mapper/ # MyBatis映射接口
└── service/ # 业务逻辑层
src/main/resources/ # 资源文件
├── static/ # 前端静态资源
└── mybatis/ # MyBatis配置


## 运行环境

* JDK 21.0.6
* PostgreSQL 17.2
* Maven 3.6+

## 快速开始

1.  克隆项目到本地。
2.  在 PostgreSQL 中创建数据库，并导入 `DB_SCHEMA.md` 中的数据库表结构。
3.  在src/main/resources下创建 `application.properties` 文件，添加数据库连接信息。
4.  使用 Maven 构建项目：`mvn clean package`
5.  运行 Spring Boot 应用：`java -jar target/*.jar`
6.  在浏览器中访问 `http://localhost:8080`。

## 文档

* `docs/ARCHITECTURE.md`：系统架构说明
* `docs/DB_SCHEMA.md`：数据库设计文档
* `docs/PROJECT_STRUCTURE.md`：项目工程结构说明

## 贡献

欢迎提交 Pull Request，共同完善本项目。

## 许可证

MIT