## 什么是卷积
1. 使用滤波器覆盖图像
2. 将滤波器的值与图像对应的像素值相乘
3. 把乘积相加, 得到的和是输出图像目标像素的值
4. 移动滤波, 对图像所有位置重复上述

e.g.

4*4 的图像  
0   50  0   29  
0   80  31  2  
33  90  0   75  
0   9   0   95

3 * 3 滤波器
-1  0  1
-2  0  2
-1  0  1

结果
80 31
90 95

### 有哪些滤波器  
索伯滤波器 - 轮廓滤波


## 池化
图片中相邻的像素倾向于拥有相似的值, 因此卷积相邻的输出像素也具有相似的值, 这意味着卷积层输入包含大量冗余数据  
池化层用来解决这个问题, 通过减少输入来降低输入量  