---
title: Ubuntu安装配置mysql
author: IU
date: 2020-07-16 15:07:42 +0800
categories: [计算机,linux]
tags: [ubuntu,mysql]
pin: false
toc: true
comments: true  
---

Ubuntu安装配置mysql

```shell
sudo apt-get install mysql-server mysql-client
```

### 测试是否安装成功

```shell
sudo netstat -tap | grep mysql
```

### 相关操作

- 登录 `mysql -uroot -p`
- 重启MySQL服务器`sudo /etc/init.d/mysql restart`
- 检查MySQL服务器占用端口 `netstat -nlt|grep 3306`
- 检查MySQL服务器系统进程 `ps -aux|grep mysql`
- 查看数据库的字符集编码 `show variables like '%char%';`
- 展示一些关于 MySQL 服务的信息 `sudo systemctl status mysql.service`
- 开始这个服务：`sudo systemctl start mysql.service`
- 查看当前的数据库 `show databases`


### 配置/保护 MySQL

对于刚安装的 MySQL，你应该运行它提供的安全相关的更新命令。就是：

```shell
sudo mysql_secure_installation
```

这样做首先会询问你是否想使用 “ *密码有效强度(validate password component)*”。如果你想使用它，你将必须选择一个最小密码强度（0 – 低，1 – 中，2 – 高）。你将无法输入任何不遵守所选规则的密码。如果你没有使用强密码的习惯（本应该使用），这可能会配上用场。如果你认为它可能有帮助，那你就键入 `y`或者 `Y`，按下回车键，然后为你的密码选择一个强度等级和输入一个你想使用的密码。如果成功，你将继续强化过程；否则你将重新输入一个密码。

但是，如果你不想要此功能（我不会），只需按回车或任何其他键即可跳过使用它。

对于其他选项，我建议开启它们（对于每一步输入 `y` 或者 `Y` 和按下回车）。它们（依序）是：“ *移除匿名用户(remove anonymous user)*”，“ *禁止 root 远程登录(disallow root login remotely)*”，“ *移除测试数据库及其访问(remove test database and access to it)*”。“ *重新载入权限表(reload privilege tables now)*”。

### 链接与断开 MySQL Server

为了运行 SQL 查询，你首先必须使用 MySQL 连到服务器并在 MySQL 提示符使用。

执行此操作的命令是：

```shell
mysql -h host_name -u user -p
```

- `-h` 用来指定一个主机名（如果这个服务被安装到其他机器上，那么会有用；如果没有，忽略它）
- `-u` 指定登录的用户
- `-p` 指定你想输入的密码.

虽然出于安全原因不建议，但是你可以在命令行最右边的 `-p` 后直接输入密码。例如，如果用户`test_user` 的密码是 `1234`，那么你可以在你使用的机器上尝试去连接，你可以这样使用：

```shell
mysql -u test_user -p1234
```

如果你成功输入了必要的参数，你将会收到由 MySQL shell 提示符提供的欢迎（`mysql >`）：

要从服务端断开连接和离开 MySQL 提示符，输入：

```shell
QUIT
```

输入 `quit` （MySQL 不区分大小写）或者 `\q` 也能工作。按下回车退出。

你使用简单的命令也能输出关于版本的信息：

```shell
sudo mysqladmin -u root version -p
```

如果你想看命令行选项列表，使用：

```shell
mysql --help
```

## `卸载 MySQL`

如果您决定要使用较新版本或只是想停止使用 MySQL。

首先，关闭服务：

```shell
sudo systemctl stop mysql.service && sudo systemctl disable mysql.service
```

确保你备份了你的数据库，以防你之后想使用它们。你可以通过运行下列命令卸载 MySQL：

```shell
sudo apt purge mysql*
```

清理依赖：

```shell
sudo apt autoremove
```

### 修改mysql密码默认密码

进入到etc/mysql 目录下，查看debian.cnf文件

```shell
 cd /etc/mysql
 sudo cat  debian.cnf
```

找到用户名，密码 ，使用此账号登录mysql

```shell
mysql -u用户名 -p密码
```

mysql中执行下面语句修改密码

```shell
show databases;
use mysql;
update user set authentication_string=PASSWORD("自定义密码") where user='root';
update user set plugin="mysql_native_password";
flush privileges;
quit;
```

再次登录 mysql -u root -p 密码

### ubuntu mysql 远程连接

一、判断Ubuntu是否开启防火墙

sudo ufw status 开放防火墙3306端口

sudo ufw allow 3306 二、查看3306端口是否打开

127.0.0.1:3306–>即mysql默认绑定localhost，远程访问不了

三、修改mysql配置文件，将bind-address = 127.0.0.1注释，开放所有连接

sudo vim /etc/mysql/mysql.conf.d/mysqld.cnf

重启ubuntu，再次查看3306端口状态，同第二步

四、通过telnet尝试连接mysql

telnet ip:3306 如果不能连通，继续下一步

五、将root用户授权给所有连接 step1：进入mysql step2： 法一>改表法：进入mysql数据库，查看里面user表，搜索User=’root’的记录

注：此处为修改后的记录 修改Host=’localhost’的记录：

mysql> UPDATE user SET Host = ‘%’ WHERE User = ‘root’ AND Host=’localhost’; 使修改生效：

mysql> FLUSH PRIVILEGES; 法二>授权法： 例子：允许root用户使用密码password从任何主机连接到mysql：

mysql> grant all privileges on *.* to ‘root’@’%’ identified by ‘password’ with grant option; 使修改生效：

mysql> FLUSH PRIVILEGES; 最后，可再通过第四步进行测试验证能否远程连接上mysql~

### 开放root账户的访问权限

```shell
mysql -h 127.0.0.1 -u root -p

use mysql;

show tables;

修改最后一张表“user

desc user;

select host,user from user;
```

看到root用户仅仅只能在本地访问MySQL服务，所以我们要把它修改为“%”，意思是无论在哪里root账户都能够访问数据库服务：

```shell
update user set host='%' where user='root';
```

注意，在真实的生产环境中，并不建议这么修改，因为安全风险太大。我建议根据实际情况将root用户的host项修改为某个指定的ip地址，或仍然保持localhost

最后一项设置，开放root账户所有权限：

```shell
grant all privileges on *.* to 'root'@'%' identified by '你的root账户密码';
```

使各种权限设置立即生效：

```shell
flush privileges;
```
