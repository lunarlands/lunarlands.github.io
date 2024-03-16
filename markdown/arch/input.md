# 输入法
当您安装了Arch Linux以及KDE或者其他桌面环境以后，可能会发现没有输入法。不必担心，本期教程将会教你如何安装输入法。
## I. 安装输入法
```shell
  sudo pacman -S fcitx5 fcitx5-configtool fcitx5-lua fcitx5-chinese-addons
```
## II. 配置
### 如果您是Wayland (Gnome/...):
```shell
# /etc/environment
QT_IM_MODULE=fcitx5
SDL_IM_MODULE=fcitx5
XMODIFIERS=@im=fcitx5
```
Gnome 还可能需要安装 kimpanel 插件才可以正常运行。<br><br>
### 如果您是Xorg (Gnome Xorg/KDE/...):
```shell
~/.pam_environment
GTK_IM_MODULE DEFAULT=fcitx
QT_IM_MODULE  DEFAULT=fcitx
XMODIFIERS    DEFAULT=\@im=fcitx
SDL_IM_MODULE DEFAULT=fcitx

~/.xprofile
export QT_IM_MODULE=fcitx5
```
在这之后，请重启您的电脑。
重启后即可输入文字。您可以在终端运行fcitx5-configtool ，点击全局选项以修改快捷键。