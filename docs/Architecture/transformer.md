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

- 訓練可能なパラメータはモデルにもよるが、一般的には
  - 埋め込み変換の行列
  - アテンションブロックのQ,K,V,O
  - 線形変換の重みとバイアス
  - 最終のMLP層

- まず、tokenizerによって入力文字列はtoken単位に分割され(1, seq_in)のシーケンスになる
- (vocab_size, embed_size)の埋め込み変換行列を使ってシーケンスを(seq_in, embed_size)に変換(ルックアップテーブルのような処理)
- シーケンスは位置情報を付与される
- Encoder層の1層目に渡される
- マルチヘッドアテンションのヘッド数はi=8とする
- Q、K、Vにはそれぞれ入力のシーケンスが入る
- W_i_Qは(embed_size, embed_size/8)、同様にW_i_K、W_i_Vも(embed_size, embed_size/8)
- ヘッドごとにAttentionScoreを計算する
  - (Q * W_i_Q * (K * W_i_K)T) -> (seq_in, seq_in)
  - ↑ * (V * W_i_V) -> (seq_in, embed_size/8)
- 計算したものをconcatする -> (seq_in, embed_size)
- W_Oは(embed_size, embed_size)なので、concatしたものとの積を計算して(seq_in, embed_size)
- これを正規化する
- FFN層で