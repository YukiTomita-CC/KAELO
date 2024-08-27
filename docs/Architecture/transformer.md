---
sidebar_position: 1
---

# Transformer
## Overview
Transformerは2017年にGoogleの研究者らによって発表された、シーケンスからシーケンスへ変換することを目的とした新しいニューラルネットワークのアーキテクチャです。

Transformerは**Attention**という機構を持つ、Encoder-Decoderモデルです。\
Attention機構は入力シーケンスのある要素について、他の要素にどれだけ注目すべきかを表現します。\
この処理を何重にも繰り返すことで単純な単語の意味から文脈に沿った意味まで幅広い表現を獲得できるとされています。

これ以前では複雑なRNNやCNNが主要なモデルとなっていましたが、Transformer発表以降は皆さんご存じの通り、自然言語処理分野におけるデファクトスタンダードとなりつつあります。

## Paper
Title: **Attention Is All You Need**

- [Arxiv](https://arxiv.org/abs/1706.03762)

## Description
上記の論文で示されているアーキテクチャは以下のようになっています。
<img
  src={require('./img/transformer_0.png').default}
  style={{ width: '400px' }}
/>

左がEncoder、右がDecoderとなっています。

ここで、Multi-Head Attentionと表記されているブロックがTransformerアーキテクチャにおいて重要な役割をもつAttention機構です。

では、Transformerアーキテクチャを入力から順に見ていきます。

### Inputs -> Input Embedding
入力されるテキストは事前にTokenizerによって自然言語からtoken単位のシーケンスに変換されます。

例として入力シーケンス長は`seq_length`としましょう。

次に、入力されたシーケンスはそれぞれのtokenについて、モデルが学習しているEmbedding情報によって`(seq_length, hidden_size)`の行列に整形されます。\
ここで、Embedding情報は`(vocab_size, hidden_size)`の行列の形になっていて、ルックアップテーブルのような形式で、このtoken_idならこのEmbeddingという風に参照されます。\

`vocab_size`はモデルが保持している語彙数で、hidden_sizeはモデルのEmbeddingの次元です。

### Positional Encoding
`(seq_length, hidden_size)`の行列をEncoderに入力する前にシーケンスの何番目なのかの情報を付与する必要があります。

論文では

### Attention
Attentionは入力シーケンスに対して、それぞれの要素が他の要素をどれくらい注意すべきかを計算するものです。

まず、基本となるScaled Dot Product Attentionは以下のような計算式になります。

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
