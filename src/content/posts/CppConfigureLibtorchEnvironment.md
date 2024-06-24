---
date: 2024-06-20 10:20:00
description: ''
langs:
- C++
tags:
- C++
- LibTorch
title: C++ 配置 libtorch 环境
---
## 前置条件

### 显卡驱动

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

### CUDA Toolkit

1. [前往下载 CUDA Toolkit](https://developer.nvidia.com/cuda-toolkit-archive)
2. CUDA 的版本需要小于等于驱动中的 `CUDA Version`
3. **重点！！这里的 CUDA 版本需要和 LibTorch 使用的 CUDA 版本一致**，建议先确定好 LibTorch 要使用的 CUDA 版本
4. 下载完成后无脑下一步即可,默认安装目录`C:\Program Files\NVIDIA GPU Computing Toolkit\CUDA\[version]`
5. 验证安装
   1. 在命令行输入`nvcc --version`查看 CUDA 版本信息
   2. 在命令行运行 **[安装目录]\extras\demo_suite** 目录下的 `bandwidthTest.exe`、`deviceQuery.exe`，确保在最后都有输出 `Result = PASS`

### cuDNN

cuDNN(NVIDIA CUDA® Deep Neural Network library) 是 NVIDIA 专门针对深度神经网络（Deep Neural Networks）中的基础操作而设计基于 GPU 的加速库

1. [前往下载 cuDNN](https://developer.nvidia.com/cudnn-downloads)
2. 下载完成解压后，将目录中的 bin、include、lib 文件夹拷贝到 CUDA Toolkit 的安装目录

## 下载 LibTorch

> **注意：**
> 
> * **！！这里下载的 LibTorch 使用的 CUDA 版本需要与你的 CUDA 版本一致**
> * 在一些特殊的情况下，你还需要考虑下载的 Libtorch 是否支持你的 GPU 算力，[前往查看GPU算力](https://developer.nvidia.com/cuda-gpus)，[前往查看Torch支持算力](https://github.com/pytorch/pytorch/releases)(这里需要自己在里面查找信息)


1. [前往下载 LibTorch](https://pytorch.org/)
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
     - `C:\Program Files\NVIDIA GPU Computing Toolkit\CUDA\v12.1\lib\x64`
   - **输入** > **附加依赖项**：添加以下库（二选一即可）
     
     按需引入
     
     ```plaintext
     c10.lib
     c10_cuda.lib
     torch.lib
     torch_cpu.lib
     torch_cuda.lib
     cudart.lib
     cublas.lib
     curand.lib
     ```
     
     全部引入
     
     ```plaintext
     S:\libtorch\lib\*.lib
     C:\Program Files\NVIDIA GPU Computing Toolkit\CUDA\v12.1\lib\x64\*.lib
     ```
   - **命令行** > **其他选项**：输入以下内容(如果不添加的话不能使用 CUDA)
     
     12.x 的版本只需要第一句即可
     
     ```plaintext
     /INCLUDE:?warp_size@cuda@at@@YAHXZ
     /INCLUDE:?_torch_cuda_cu_linker_symbol_op_cuda@native@at@@YA?AVTensor@2@AEBV32@@Z
     ```

## 测试

1. [下载样品](./LibtorchSample.7z)
   
   1. 需要将里面的**附加包含目录**、**附加库目录**替换成你的目录
2. 测试代码
   
   ```cpp
   #include <cuda_runtime.h>
   #include <iostream>
   #include <torch/torch.h>
   #include <torch/version.h>
   
   // 将 SM 版本转换为核心数的辅助函数
   int _ConvertSMVer2Cores(int major, int minor);
   
   int main() {
   // 版本信息
   std::cout << "LibTorch 版本：" << TORCH_VERSION << std::endl;
   
   // 检查是否支持CUDA
   if (torch::cuda::is_available()) {
   std::cout << "CUDA 可用！使用 GPU" << std::endl;
   std::cout << "cuDNN 可用状态：" << (torch::cuda::cudnn_is_available() ? "true" : "false") << std::endl;
   
   int device_count = torch::cuda::device_count();
   //cudaGetDeviceCount(&device_count);
   std::cout << "CUDA 设备数量：" << device_count << std::endl;
   
   for (int i = 0; i < device_count; ++i) {
   cudaDeviceProp prop;
   cudaGetDeviceProperties(&prop, i);
   std::cout << "设备 " << i << ": " << prop.name << std::endl;
   std::cout << "  总内存：" << prop.totalGlobalMem / (1024 * 1024) << " MB" << std::endl;
   std::cout << "  多处理器：" << prop.multiProcessorCount << std::endl;
   std::cout << "  CUDA 核心：" << prop.multiProcessorCount * _ConvertSMVer2Cores(prop.major, prop.minor) << std::endl;
   std::cout << "  CUDA 算力：" << prop.major << "." << prop.minor << std::endl;
   }
   } else {
   std::cout << "CUDA 不可用。正在使用 CPU。" << std::endl;
   }
   
   // 创建张量
   torch::Tensor tensor = torch::rand({ 2, 3 });
   std::cout << "随机张量：" << tensor << std::endl;
   
   // 基本运算
   torch::Tensor tensor_a = torch::tensor({ 1, 2, 3 }, torch::kFloat32);
   torch::Tensor tensor_b = torch::tensor({ 4, 5, 6 }, torch::kFloat32);
   torch::Tensor result = tensor_a + tensor_b;
   std::cout << "张量添加：" << result << std::endl;
   
   // 自动求导
   torch::Tensor x = torch::tensor({ 1.0, 2.0, 3.0 }, torch::requires_grad());
   torch::Tensor y = x * 2;
   y.backward(torch::ones_like(y));
   std::cout << "坡度：" << x.grad() << std::endl;
   
   // 简单的线性回归模型
   struct Model : torch::nn::Module {
   Model() {
   fc = register_module("fc", torch::nn::Linear(3, 1));
   }
   
   torch::Tensor forward(torch::Tensor x) {
   return fc->forward(x);
   }
   
   torch::nn::Linear fc{ nullptr };
   };
   
   auto model = std::make_shared<Model>();
   torch::optim::SGD optimizer(model->parameters(), torch::optim::SGDOptions(0.01));
   
   // 模拟一些数据
   torch::Tensor inputs = torch::rand({ 10, 3 });
   torch::Tensor targets = torch::rand({ 10, 1 });
   
   // 训练模型
   for (size_t epoch = 1; epoch <= 100; ++epoch) {
   optimizer.zero_grad();
   torch::Tensor outputs = model->forward(inputs);
   torch::Tensor loss = torch::mse_loss(outputs, targets);
   loss.backward();
   optimizer.step();
   
   if (epoch % 10 == 0) {
   std::cout << "Epoch [" << epoch << "/100], Loss: " << loss.item<float>() << std::endl;
   }
   }
   
   // CUDA 测试
   if (torch::cuda::is_available()) {
   torch::Tensor tensor_cuda = torch::rand({ 2, 3 }, torch::device(torch::kCUDA));
   std::cout << "CUDA 上的随机张量：" << tensor_cuda << std::endl;
   
   torch::Tensor result_cuda = tensor_cuda * 2;
   std::cout << "CUDA 上的张量乘法：" << result_cuda << std::endl;
   }
   
   return 0;
   }
   
   int _ConvertSMVer2Cores(int major, int minor) {
   typedef struct {
   int SM;
   int Cores;
   } sSMtoCores;
   
   sSMtoCores nGpuArchCoresPerSM[] = {
   {0x30, 192}, // Kepler
   {0x32, 192}, // Kepler
   {0x35, 192}, // Kepler
   {0x37, 192}, // Kepler
   {0x50, 128}, // Maxwell
   {0x52, 128}, // Maxwell
   {0x53, 128}, // Maxwell
   {0x60, 64},  // Pascal
   {0x61, 128}, // Pascal
   {0x62, 128}, // Pascal
   {0x70, 64},  // Volta
   {0x72, 64},  // Volta
   {0x75, 64},  // Turing
   {-1, -1} };
   
   int index = 0;
   while (nGpuArchCoresPerSM[index].SM != -1) {
   if (nGpuArchCoresPerSM[index].SM == ((major << 4) + minor)) {
   return nGpuArchCoresPerSM[index].Cores;
   }
   index++;
   }
   // 如果未找到 SM，则默认返回值
   return -1;
   }
   ```
3. 输出
   
   ```plaintext
   算力LibTorch 版本：2.3.1
   CUDA 可用！使用 GPU
   CUDA 设备数量：1
   设备 0: NVIDIA GeForce GTX 1660 Ti
   总内存：6143 MB
   多处理器：24
   CUDA 核心：1536
   CUDA 算力：7.5
   随机张量： 0.2155  0.1309  0.6969
   0.1763  0.3493  0.3799
   [ CPUFloatType{2,3} ]
   张量添加： 5
   7
   9
   [ CPUFloatType{3} ]
   坡度： 2
   2
   2
   [ CPUFloatType{3} ]
   Epoch [10/100], Loss: 0.137609
   Epoch [20/100], Loss: 0.107415
   Epoch [30/100], Loss: 0.0934079
   Epoch [40/100], Loss: 0.0868109
   Epoch [50/100], Loss: 0.0836093
   Epoch [60/100], Loss: 0.0819671
   Epoch [70/100], Loss: 0.0810442
   Epoch [80/100], Loss: 0.0804563
   Epoch [90/100], Loss: 0.0800275
   Epoch [100/100], Loss: 0.0796769
   CUDA 上的随机张量： 0.7906  0.9510  0.5951
   0.6755  0.9932  0.4448
   [ CUDAFloatType{2,3} ]
   CUDA 上的张量乘法： 1.5813  1.9021  1.1902
   1.3511  1.9864  0.8897
   [ CUDAFloatType{2,3} ]
   ```

## 异常笔记

### 找不到 mkl_avx2.1.dll / mkl_def.1.dll

> Intel MKL FATAL ERROR: Cannot load mkl_avx2.1.dll or mkl_def.1.dll

即使下载了最新版本的[intel oneApi](https://www.intel.com/content/www/us/en/developer/tools/oneapi/base-toolkit-download.html)也不行，是因为他依赖与 2021.4 的版本。参考[issue](https://github.com/pytorch/pytorch/issues/124009#issuecomment-2156183422)，解决方法如下

1. 在解决方案目录创建一个空文件夹`lib`
2. 在命令行输入`pip install mkl==2021.4` 安装 mkl 2021.4 版本
   
   1. 如果需要下载最新版本前往[intel oneApi](https://www.intel.com/content/www/us/en/developer/tools/oneapi/base-toolkit-download.html)，注意最新版中不包含 mkl_avx2.1.dll、mkl_def.1.dll
3. 从 python 库安装目录中将依赖拷贝到**步骤 1**的文件夹中
   
   1. python 库默认安装目录`C:\Users\[User]\AppData\Local\Programs\Python\Python312\Library\bin`
   2. 这里只需要拷贝 mkl_avx2.1.dll、mkl_def.1.dll 即可
4. 打开 Vs > 项目右键 > **属性** > **生成事件** > **生成后事件** > **命令行**中输入以下内容
   
   ```plaintext
   set customLibDir=../lib
   :: 拷贝自定义库中的的dll，如果不存在
   for %%f in (%customLibDir%\*.dll) do (
       if not exist $(OutDir)\%%~nxf (
           xcopy /Y /I "%%f" "$(OutDir)"
       )
   )
   ```

### 找不到 nvToolsExt

> Failed to find nvToolsExt

出现这个情况大概率是使用的 12.x 版本的 CUDA Toolkit，Nvidia 在 12.x 版本中移除了 nvToolsExt，解决方法如下

1. 前往[CUDA Toolkit Archive](https://developer.nvidia.com/cuda-toolkit-archive)下载 11.8.0 版本的 CUDA Toolkit，**推荐下载网络安装包**
2. 下载完成后打开安装包，选择自定义安装，只选择 **Nsight NVTX** 即可,如下
   ![NVIDIA_CUDA11.8_Install](./NVIDIA_CUDA11.8_Install.png)

