---
date: 2024-06-20 10:20:00
description: ""
tags:
  - C++
  - LibTorch
title: C++ 配置 libtorch 环境
---

## 前置条件

1. 显卡驱动
   在命令行输入`nvidia-smi`查看驱动信息，如果信息异常或 CUDA 支持版本较低的话[前往下载驱动](https://www.nvidia.cn/Download/index.aspx)

   ```plaintext
    +-----------------------------------------------------------------------------------------+
    | NVIDIA-SMI 555.99                 Driver Version: 555.99         CUDA Version: 12.5     |
    |-----------------------------------------+------------------------+----------------------+
    | GPU  Name                  Driver-Model | Bus-Id          Disp.A | Volatile Uncorr. ECC |
    | Fan  Temp   Perf          Pwr:Usage/Cap |           Memory-Usage | GPU-Util  Compute M. |
    |                                         |                        |               MIG M. |
    |=========================================+========================+======================|
    |   0  NVIDIA GeForce RTX 1660 Ti   WDDM  |   00000000:01:00.0  On |                  N/A |
    | N/A   63C    P0             23W /   80W |    1117MiB /   6144MiB |      2%      Default |
    |                                         |                        |                  N/A |
    +-----------------------------------------+------------------------+----------------------+

    +-----------------------------------------------------------------------------------------+
    | Processes:                                                                              |
    |  GPU   GI   CI        PID   Type   Process name                              GPU Memory |
    |        ID   ID                                                               Usage      |
    |=========================================================================================|
    |    0   N/A  N/A      1848    C+G   ...2\Enterprise\Common7\IDE\devenv.exe      N/A      |
    |    0   N/A  N/A      6928    C+G   ...nt.CBS_cw5n1h2txyewy\SearchHost.exe      N/A      |
    +-----------------------------------------------------------------------------------------+
   ```

2. CUDA Toolkit
   1. [前往下载 CUDA Toolkit](https://developer.nvidia.com/cuda-toolkit-archive)
   2. CUDA 的版本需要小于等于驱动中的 `CUDA Version`
   3. **重点！！这里的 CUDA 版本需要和 LibTorch 使用的 CUDA 版本一致**，建议先确定好 LibTorch 要使用的 CUDA 版本
   4. 下载完成后无脑下一步即可,默认安装目录`C:\Program Files\NVIDIA GPU Computing Toolkit\CUDA\[version]`
   5. 验证安装
      1. 在命令行输入`nvcc --version`查看 CUDA 版本信息
      2. 在命令行运行 **[安装目录]\extras\demo_suite** 目录下的 `bandwidthTest.exe`、`deviceQuery.exe`，确保在最后都有输出 `Result = PASS`
3. cuDNN
   cuDNN(NVIDIA CUDA® Deep Neural Network library) 是 NVIDIA 专门针对深度神经网络（Deep Neural Networks）中的基础操作而设计基于 GPU 的加速库
   1. [前往下载 cuDNN](https://developer.nvidia.com/cudnn-downloads)
   2. 下载完成解压后，将目录中的 bin、include、lib 文件夹拷贝到 CUDA Toolkit 的安装目录

## 下载 LibTorch

1. [前往下载 LibTorch](https://pytorch.org/)**！！这里下载的 LibTorch 使用的 CUDA 版本需要与你的 CUDA 版本一致**
2. 下载完成后将文件解压到你想存放的目录，如解压到`S:\libtorch`
3. 按下 win 键 > 输入"编辑系统环境变量" > "环境变量" > 在系统变量中的"Path"添加`S:\libtorch\lib`

## vs2022 中的配置

> CUDA toolkit 目录：`C:\Program Files\NVIDIA GPU Computing Toolkit\CUDA\v12.1`
> LibTorch 目录：`S:\libtorch\lib`
> 以下配置都将在以上安装目录的基础上进行

创建一个 C++ 控制台项目

### 配置项目属性

1. 项目右键 > 属性
2. **常规**
   - **C++语言标准**：将“语言标准”设置为`ISO C++ 17 标准 (/std:c++17)`或更高版本
3. **C/C++**
   - **常规** > **附加包含目录**：添加以下目录
     - `S:\libtorch\include`
     - `S:\libtorch\include\torch\csrc\api\include`
     - `C:\Program Files\NVIDIA GPU Computing Toolkit\CUDA\v12.1\include`
4. **链接器**

   - **常规** > **附加库目录**：添加以下目录
     - `S:\libtorch\lib`
     - `C:\Program Files\NVIDIA GPU Computing Toolkit\CUDA\v12.1\lib`
   - **输入** > **附加依赖项**：添加以下库

     ```plaintext
      c10.lib
      c10_cuda.lib
      torch.lib
      torch_cpu.lib
      torch_cuda.lib
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

## 设置 CMake（可选）

如果你希望使用 CMake 进行构建，可以在项目根目录创建一个`CMakeLists.txt`文件，内容如下：

```cmake
cmake_minimum_required(VERSION 3.0 FATAL_ERROR)
project(your_project)

set(CMAKE_PREFIX_PATH "S:/libtorch")

find_package(Torch REQUIRED)

add_executable(your_project main.cpp)
target_link_libraries(your_project "${TORCH_LIBRARIES}")
set_property(TARGET your_project PROPERTY CXX_STANDARD 20)
```

然后在命令行中运行以下命令生成可执行文件：

```bash
mkdir build
cd build
cmake ..
cmake --build .
```

## 异常笔记

### 找不到 mkl_avx2.1.dll / mkl_def.1.dll

> Intel MKL FATAL ERROR: Cannot load mkl_avx2.1.dll or mkl_def.1.dll

原因是找不到 mkl 2021.4 版的动态依赖库，然而在 [oneApi](https://www.intel.com/content/www/us/en/developer/tools/oneapi/base-toolkit-download.html) 下载安装了也不行，因为他只提供最新版本 [see](https://github.com/pytorch/pytorch/issues/124009#issuecomment-2156183422) ,可以使用以下方式解决

1. 下载 2021.4 版本的动态 mkl 动态链接库，打开命令行工具输入以下命令：

   ```bash
   pip install mkl==2021.4
   ```

2. 在 python 的库中将需要的依赖拷贝到项目中，`C:\Users\[User]\AppData\Local\Programs\Python\Python312\Library\bin` 是 python 安装在默认路径时的库的位置
