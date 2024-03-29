---
layout: article
title: Paper Reading
tags: Daily_Paper_Reading
mathjax: true
mathjax_autoNumber: true
---

## Point-NeRF: Point-based Neural Radiance Fields
[[Github]](https://github.com/Xharlie/pointnerf) [[PDF]](https://arxiv.org/pdf/2201.08845.pdf)
![](/blog/figs/pointnerf.png)

## Neural Point-Based Graphics [[ECCV22]](https://github.com/alievk/npbg)
与Point-NeRF类似，但点云是作为一个输入，而非优化得到

## Dual Octree Graph Networks for Learning Adaptive Volumetric Shape Representations
[[PDF]](https://arxiv.org/pdf/2205.02825.pdf) [王鹏帅](https://wang-ps.github.io/)的一系列voxel工作。

## Shape As Points A Differentiable Poisson Solver
![](/blog/figs/2022-09-06-SAP.png)
将泊松重建指示函数场的过程可微分化。相比神经网络隐式场的方法不需要存储网络参数。
[[PDF]](https://proceedings.neurips.cc/paper/2021/file/6cd9313ed34ef58bad3fdd504355e72c-Paper.pdf)
[[Supp]](https://proceedings.neurips.cc/paper/2021/file/6cd9313ed34ef58bad3fdd504355e72c-Supplemental.pdf)
[[Code]](https://github.com/autonomousvision/shape_as_points)

## LEARNING TO EXPLORE USING ACTIVE NEURAL SLAM
留作参考
[[PDF]](https://openreview.net/pdf?id=HklXn1BKDH) [[Project Webpage]](https://devendrachaplot.github.io/projects/Neural-SLAM)

## SparseNeuS: Fast Generalizable Neural Surface Reconstruction from Sparse views [[Project]](https://www.xxlong.site/SparseNeuS/)
![](/blog/figs/SparseNeuS.jpg)
类似地，
Neural Sparse Voxel Fields [[NIPS20]](https://github.com/facebookresearch/NSVF): octree的NeRF