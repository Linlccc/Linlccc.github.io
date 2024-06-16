---
# 标题
title: "常用SQL"
# 描述
description: ""
# 标签
tags: ["sql"]
# 显示权重（越小显示越靠前）
weight: 1000

# 撰写日期
date: "2024-05-05 07:05:18"
---

## DCL(Data Control Language)数据控制语言

- DCL 在 mysql 中可以正常使用其他数据库没测试

### 用户管理

```sql
-- 查询用户
select host,user from mysql.user;
-- 添加用户
create user '用户名'@'主机名' identified by '密码';
-- 删除用户
drop user '用户名'@'主机名';
```

### 权限管理

```sql
-- 查询权限
show grants for '用户名'@'主机名';
-- 查询 root 用户权限
show grants for 'root'@'%';

-- 给予权限
grant 权限列表 on 库名.表名 to '用户名'@'主机名';
-- 给 user1 授予所有权限
grant all on *.* to 'user1'@'localhost';

-- 撤销权限
revoke 权限列表 on 库名.表名 from '用户名'@'主机名';
-- 撤销 user1 的所有权限
revoke all on *.* from 'user1'@'localhost';
```

## DDL(Data Definition Language)数据定义语言

### 操作库

```sql
-- 查看所有数据库
show databases;
-- 查看数据库的定义信息
show create database 库名;

-- 创建库
create database 库名;
-- 检查库是否存在，不存在则创建
create database if not exists 库名;

-- 修改数据库字符信息
alter database 库名 character set utf8;
-- 删除数据库
drop database 库名;
```

### 操作表

```sql
-- 查看表结构
desc 表名;
-- 查看创建表的SQL语句
show create table 表名;

-- 创建表
create table 表名(
    id int,
    name varchar(32),
    age int ,
    score double(4,1),
    birthday date,
    insert_time timestamp
);

-- 修改表名
alter table 旧表名 rename to 新表名;
-- 删除表
drop table 表名;
-- 检查表是否存在，存在则删除
drop table if exists 表名;

-- 添加一列
alter table 表名 add 列名 数据类型;
-- 删除列
alter table 表名 drop 列名;
```

## DML(Data Manipulation Language)数据操作语言

### 插入 insert into

```sql
-- 写列名
insert into 表名(列名1,列名2,...列名n) values(值1,值2,...值n);
-- 不写列名
insert into 表名 values(值1,值2,...值n);
```

### 删除 delete

```sql
-- 删除表中数据
delete from 表名 where 列名 = 值;
-- 删除表中所有数据
delete from 表名;
-- 删除表中所有数据（直接删除表，再创建一张一样的表）
truncate table 表名;
```

### 修改 update

```sql
-- 不带条件的修改(修改所有行)
update 表名 set 列名 = 值;
-- 带条件的修改
update 表名 set 列名 = 值 where 列名 = 值;
```

## DQL(Data Query Language)数据查询语言

### 基础关键字

```sql
-- 查询年龄大于等于20 小于等于30
-- &&(并且)
select * from 表名 where age >= 20 && age <= 30;
-- and(并且)
select * from 表名 where age >= 20 and age <= 30;
-- between..and(之间)
select * from 表名 where age between 20 and 30;

-- 查询年龄22岁，18岁，25岁的信息
-- or(或者)
select * from 表名 where age = 22 or age = 18 or age = 25;
-- in(集合)
select * from 表名 where age in (22,18,25);

-- 查询英语成绩不为null
-- in not null(不为空)
select * from 表名 where english is not null;

/** like(模糊查询)
_(单个字符)
%(多个字符)
 */
-- 查询性王的人
select * from 表名 where name like '王%';
-- 查询第二个字是麻的人
select * from 表名 where name like '_麻%';
-- 查询名字是三个字的人
select * from 表名 where name like '___';

-- distinct(重复的值都只显示一个)
-- 查询年龄集合，重复的只显示一个
select distinct age where 表名;
```

### 排序查询

```sql
-- 根据年龄升序(默认)
select * from 表名 order by age;
-- 根据年龄降序
select * from 表名 order by age desc;
```

### 聚合函数

```sql
-- 计算数据行数
select max(*) from 表名;
-- 计算年龄最大是多少
select max(age) from 表名;
-- 计算年龄最小是多少
select min(age) from 表名;
-- 计算年龄总和是多少
select sum(age) from 表名;
-- 计算年龄平均数是多少
select avg(age) from 表名;
```

### 分组查询 group by

```sql
-- 按照性别分组,分别查询男、女的平均分、人数
select sex,avg(math),count(id) from 表名 group by sex;
-- 将分数高于60的人按照性别分组,分别查询男、女的平均分、人数
select sex,avg(math),count(id) from 表名 where math > 60 group by sex;
-- 按照性别分组,分别查询男、女的平均分、人数。要求：分数大于60，分组后人数大于2
select sex,avg(math),count(id) from 表名 where math > 60 group by sex having count(id) > 2;
```

### 分页查询

```sql
/**
该分页只支持mysql
limit 开始索引,查询条数
开始索引计算公式：(页数 - 1) * 每页条数
 */
-- 每页显示10条
-- 第一页
select * from 表名 limit 0,10;
-- 第二页
select * from 表名 limit 10,10;
-- 第三页
select * from 表名 limit 20,10;
```

### 内连接查询

```sql
-- 隐式内连接
-- 语法
select 字段列表 from 表1,表2...表n where 条件;
-- 例子
select t1.c1,t1.c2,t2.c1 from t1,t2 where t1.t2Id = t2.id;

-- 显式内连接
-- 语法
select 字段列表 from 表1 join 表2 on 条件;
-- 例子
select * from t1 join t2 on t1.t2Id = t2.id;
```

### 外连接查询

```sql
-- 左外连接
-- 语法
select 字段列表 from 表1 left join 表2 on 条件;
-- 例子
select  t1.*,t2.c1 from t1 left join t2 ON t1.t2Id = t2.id;

-- 右外连接
-- 语法
select 字段列表 from 表1 right join 表2 on 条件;
-- 例子
select  t1.*,t2.c1 from t1 right join t2 ON t1.t2Id = t2.id;
```

### 子查询

#### 子查询结果是单行单列

```sql
-- 查询最高的成绩（这里假设最高为98）
select max(math) from 表名;
-- 查询成绩最高的人的信息
select * from 表名 where math = 98;
-- 使用子查询
select * from 表名 where math = (select max(math) from 表名);
```

#### 子查询结果是多行单列

```sql
-- 查询名称为n1或者n2的id（这里假设id为1，2）
select id from 表名 where name = 'n1' or name = 'n2';
-- 查询成绩最高的人的信息
select * from 表名 where id = 1 or id = 2;
-- 使用子查询
select * from 表名 where id in (select id from 表名 where name = 'n1' or name = 'n2');
```

#### 子查询结果是多行多列

```sql
-- 这里t1和t2是同一张表，查询结果每列有两个相同的数据
select * from 表名 t1,(select * from 表名) t2 where t1.id = t2.id;
```
