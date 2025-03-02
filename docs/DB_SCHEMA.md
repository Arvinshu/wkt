# 数据库设计文档
## 数据库连接信息
在src/main/resources下创建 `application.properties` 文件，添加数据库连接信息。
```java
spring.datasource.url=jdbc:postgresql://xxx.xxx.xxx.xxx:5432/your_table
spring.datasource.username=postgres
spring.datasource.password=postgres
spring.datasource.driver-class-name=org.postgresql.Driver

mybatis.mapper-locations=classpath:mybatis/mapper/*.xml
mybatis.configuration.map-underscore-to-camel-case=true
```


## 表结构说明DML

### t_wkt 表

```sql
create table public.t_wkt
(
    id            integer generated always as identity        primary key,
    ts_id         varchar(30) not null,
    tr            varchar(50),
    employee      varchar(30),
    dep           varchar(200),
    ts_status     varchar(30),
    ts_ym         varchar(10),
    nature_ym     varchar(10),
    ts_date       date,
    ts_hours      integer,
    ts_month      real,
    proj_bm       varchar(30),
    ts_bm         varchar(200),
    ts_name       varchar(200),
    zone          varchar(200),
    s_proj_bm     varchar(30),
    s_ts_bm       varchar(200),
    ts_comments   varchar(2000),
    proj_comments varchar
);

comment on column public.t_wkt.proj_comments is '项目备注是否属于特别关注项目';

alter table public.t_wkt
    owner to postgres;


```

### 部门负责人表
```sql
DROP TABLE IF EXISTS t_department_manager; -- 如果原表存在则删除

CREATE TABLE t_department_manager (
    id SERIAL PRIMARY KEY,
    department_name VARCHAR(255) UNIQUE NOT NULL, -- 部门名称（与 t_wkt.dep 一致）
    department_leader VARCHAR(255), -- 部门负责人
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP
);
COMMENT ON TABLE t_department_manager IS '数据维护主表';
```
数据初始化
```sql
INSERT INTO t_department_manager (department_name)
SELECT DISTINCT dep FROM t_wkt
ON CONFLICT (department_name) DO NOTHING;
```

更新权限
```sql
-- 确保应用用户有 t_department_manager 表的读写权限
GRANT SELECT, INSERT, UPDATE ON t_department_manager TO postgres;
```


## 关键业务查询DDL

### 部门员工统计及工时率统计

```sql
WITH processed_data AS (SELECT CASE
                                   WHEN dep IS NULL OR dep = '' OR dep = '未分配' THEN '其他'
                                   ELSE dep
                                   END AS department,
                               employee,
                               ts_bm,
                               ts_hours
                        FROM t_wkt)
SELECT department,
       COUNT(DISTINCT employee)                              AS count,
       ROUND(SUM(
                     CASE
                         WHEN ts_bm IN ('999003', '999004')
                             THEN ts_hours
                         ELSE 0 END
             )::numeric / 8, 2)                              AS excludedDays,

       ROUND(
               SUM(CASE WHEN ts_bm NOT IN ('999003', '999004') THEN ts_hours ELSE 0 END)::numeric
                   / NULLIF(SUM(ts_hours), 0), 4
       )                                                     AS projectRate,

       STRING_AGG(DISTINCT employee, ', ' ORDER BY employee) AS applicants
FROM processed_data
GROUP BY department
ORDER BY count DESC
```
