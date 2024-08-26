---
sidebar_position: 1
---

# Transformer
## Overview

## Note
- Transformerは2017年にGoogleの研究者等によって発表された
- [論文](https://arxiv.org/abs/1706.03762)
- それまでの主要なシーケンス変換モデルは複雑なRNNやCNNだった
- Transformerはそれらを使わずにAttentionという機構のみを使ったシンプルなネットワークアーキテクチャとしている
- 論文ではEncoder-Decoderモデルで機械翻訳タスクとして当時のSOTAとなったようだ
- 既存の手法と比べて並列処理ができること、トレーニングコストが大幅に削減できたことを特徴として挙げている
