---
description: ''
title: C++ 配置 libtorch 环境
---
## 下载 LibTorch

- 从 [LibTorch](https://pytorch.org/) 下载对应系统的 C++ 版本
- 下载完成后解压文件，如解压到`C:\libtorch`（以下都将以此为libtorch目录）

## 配置环境变量

确保程序在运行时可以找到`LibTorch`动态链接库，将`lib`目录添加到环境变量

1. 在系统搜索查找“编辑系统环境变量”->”环境变量“
2. 在“系统变量”中，找到`Path`变量，点击“编辑”，添加LibTorch的库目录路径`C:\libtorch\lib`

## vs2022 中的配置

> 如果在配置环境变量之前启动了需要重启

创建一个 C++ 控制台项目

### 配置项目属性

1. 常规
   * **C++语言标准**：将“语言标准”设置为`ISO C++ 14 标准 (/std:c++14)`或更高版本
2. C/C++
   * **附加包含目录**：添加`C:\libtorch\include`和`C:\libtorch\include\torch\csrc\api\include`
3. 链接器
   * **附加库目录**：添加`C:\libtorch\lib`
   * **输入**->**附加依赖项**：添加以下库

     ```plaintext
     C:\libtorch\lib\c10.lib
     C:\libtorch\lib\torch.lib
     C:\libtorch\lib\torch_cpu.lib
     ```

     如果使用CUDA还需添加以下库

     ```plaintext
     C:\libtorch\lib\caffe2_nvrtc.lib
     C:\libtorch\lib\torch_cuda.lib
     C:\libtorch\lib\torch_cuda_cu.lib
     C:\libtorch\lib\torch_cuda_cpp.lib
     ```

## 测试代码

```cpp
#include <torch/torch.h>
#include <iostream>

int main() {
    torch::Tensor tensor = torch::rand({2, 3});
    std::cout << tensor << std::endl;
    return 0;
}
```

## 设置CMake（可选）

如果你希望使用CMake进行构建，可以在项目根目录创建一个`CMakeLists.txt`文件，内容如下：

```cmake
cmake_minimum_required(VERSION 3.0 FATAL_ERROR)
project(your_project)

set(CMAKE_PREFIX_PATH "C:/libtorch")

find_package(Torch REQUIRED)

add_executable(your_project main.cpp)
target_link_libraries(your_project "${TORCH_LIBRARIES}")
set_property(TARGET your_project PROPERTY CXX_STANDARD 14)

```

然后在命令行中运行以下命令生成可执行文件：

```bash
mkdir build
cd build
cmake ..
cmake --build .

```
