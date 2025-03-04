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
    id            integer generated always as identity
        primary key,
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
create table public.t_department_manager
(
    id                serial
        primary key,
    department_name   varchar(255)           not null
        unique,
    department_leader varchar(255),
    created_at        timestamp default now(),
    updated_at        timestamp,
    active            boolean   default true not null
);

comment on table public.t_department_manager is '数据维护主表';

alter table public.t_department_manager
    owner to postgres;

create index idx_department_active
    on public.t_department_manager (active);


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


### 项目利润中心表
```sql
create table public.t_project_profit_center
(
    id                    serial    primary key,
    zone                  varchar(200)    not null        unique,
    project_profit_center varchar(200),
    active                boolean   default true not null,
    created_at            timestamp default now(),
    updated_at            timestamp,
    business_type         varchar(200),
    region_category       varchar(200),
    region_name           varchar(200),
    center_name           varchar(200),
    business_subcategory  varchar(200),
    department_name       varchar(200),
    responsible_person    varchar(100),
    work_location         varchar(200)
);

alter table public.t_project_profit_center
    owner to postgres;

```



## 关键业务查询DDL
