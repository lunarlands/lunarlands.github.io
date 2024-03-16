# 安装 Arch Linux

您好。本期教程将会教您如何安装ArchLinux (并且是BTRFS文件系统)。

安装有风险，请三思而后行。

如果您没有Linux基础，建议不要安装ArchLinux。

::: danger 警告!
在查看本教程之前，请确定您是UEFI启动。
:::



## I. 准备
#### &emsp;I. ArchLinux镜像
&emsp;&emsp;可以去[中科大](https://mirrors.ustc.edu.cn/archlinux/iso/latest/)下载。
#### &emsp;II. 写盘工具
&emsp;&emsp;选择有很多。BalenaEtcher, Rufus, Ventoy, dd...
#### &emsp;III. 分区
&emsp;&emsp;如果您的电脑有系统，建议先分好。因为后面作者只会对新硬盘写出教程。
#### &emsp;IV. USB和电脑
&emsp;&emsp;想什么呢？不可能有的

#### &emsp;V. 准备完成后，请使用写盘工具向USB写入镜像。

## II.  启动
   ::: danger 警告!
   请务必关闭您电脑的安全启动。
   :::
   请把您的USB设为第一启动项 或者 启动USB。

   在您操作完后(如果没进入，请重启)，就会进入一个菜单，请直接选第一个，等待一会，就进入了ARCHISO界面。ARCHISO不支持输入中文。

## III. 安装前

   I. 如果您使用无线网络进行安装，请执行以下命令以联网。

```shell
iwctl
station wlan0 scan # 扫描网络
station wlan0 get-networks # 列出 wifi 网络
station wlan0 connect wifi-name # 连接 {wifi-name}，在这之后会要求您输入密码。
exit # 退出
```

   II. 切换源

```shell
systemctl stop reflector
rm -rf /etc/pacman.d/mirrorlist
nano /etc/pacman.d/mirrorlist
# 加入以下内容
Server = https://mirrors.ustc.edu.cn/archlinux/$repo/os/$arch
# Ctrl+X, Y, Enter保存
```

   III. 分区

```shell
# 查看分区
fdisk -l
# 编辑分区
cfdisk /dev/{your_disk}
# 分区:
[NEW] -> 新建一个500M的分区(输入) -> [TYPE] -> 选择EFI
[NEW] -> 新建一个分区
DANGER
请先确定是否正确再看下面的！！
[WRITE] -> [QUIT]

# 再次确定是否正确
fdisk -l
# 创建EFI
mkfs.fat -F32 /dev/{your_part}
# 再次确定是否正确
fdisk -l
# 创建btrfs
mkfs.btrfs -L ArchLinux /dev/{your_part}
```

   IV. 创建Btrfs子卷

```shell
# 挂载btrfs分区
mount /dev/{your_part} /mnt
# 创建子卷
btrfs subvolume create /mnt/@
btrfs subvolume create /mnt/@home
btrfs subvolume create /mnt/@boot
# 卸载
umount /mnt
# 挂载
mount -t btrfs -o subvol=/@,compress=zstd /dev/sdxn /mnt
mount -t btrfs -o subvol=/@home,compress=zstd /dev/sdxn /mnt/home --mkdir
mount -t btrfs -o subvol=/@boot,compress=zstd /dev/sdxn /mnt/boot --mkdir
```

## IV. 安装系统

   I. 安装基本系统

```shell
pacman -Sy archlinux-keyring
pacstrap /mnt base base-devel linux linux-firmware btrfs-progs networkmanager vim nano sudo
```

   II. 写入挂载信息

```shell
genfstab -U /mnt > /mnt/etc/fstab
```

   III. 切换根目录

```shell
arch-chroot /mnt
```

   IV. 一些配置

```shell
nano /etc/hostname

# 输入一个你喜欢的主机名，Ctrl+X, Y, Enter
nano /etc/hosts

# 加入：
127.0.0.1   localhost
::1         localhost
127.0.1.1   myarch.localdomain myarch
# Ctrl+X, Y, Enter

# 切换时区
ln -sf /usr/share/zoneinfo/Asia/Shanghai /etc/localtime
hwclock --systohc

# 语言
nano /etc/locale.gen

# 去掉en_US.UTF-8前面的#
# Ctrl+X, Y, Enter

locale-gen
echo 'LANG=en_US.UTF-8'  > /etc/locale.conf

# 设置root密码
passwd root

# 安装微码（根据情况选择）
pacman -S intel-ucode # Intel
pacman -S amd-ucode # AMD
```

   V. 安装引导

```shell
pacman -S grub efibootmgr os-prober
grub-install --target=x86_64-efi --efi-directory=/boot --bootloader-id=ARCH
vim /etc/default/grub

# 去掉最后一行的#
# ESC + :wq

# 生成
grub-mkconfig -o /boot/grub/grub.cfg

exit                     # 退回安装环境
umount -R /mnt           # 卸载新分区
reboot                   # 重启
```

## V. 安装后

```shell
systemctl enable --now NetworkManager # 设置开机自启并启动 NetworkManager
# 请看前面重新联网
# 用户

useradd -m -G wheel -s /bin/bash {yourname}
passwd {username}
sudo nano /etc/sudoers
#%wheel ALL=(ALL:ALL) ALL -> %wheel ALL=(ALL:ALL) ALL (去掉注释)

# 添加cn源
vim /etc/pacman.conf

# 添加：
[archlinuxcn]
Server = https://mirrors.ustc.edu.cn/archlinuxcn/$arch
# ESC + :wq

rm -rf /etc/pacman.d/mirrorlist
nano /etc/pacman.d/mirrorlist
# 加入以下内容
Server = https://mirrors.ustc.edu.cn/archlinux/$repo/os/$arch
# Ctrl+X, Y, Enter保存

pacman -Syyu
```

   如果您需要安装KDE桌面环境:

```shell
pacman -S plasma konsole dolphin xorg ark neofetch sddm
sudo systemctl enable sddm

sudo systemctl enable sddm
```
