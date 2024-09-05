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

ここで、**Multi-Head Attention**や**Masked Multi-Head Attention**と表記されているブロックがTransformerアーキテクチャにおいて重要な役割をもつAttention機構です。

では、Transformerアーキテクチャを入力から順に見ていきましょう。

### Inputs -> Input Embedding
入力されるテキストは事前にTokenizerによって自然言語からtoken単位のシーケンスに変換されます。

例として入力シーケンス長は`seq_length`としましょう。

次に、入力されたシーケンスはそれぞれのtokenについて、モデルが学習しているEmbedding情報によって`(seq_length, hidden_size)`の行列に整形されます。\
ここで、Embedding情報は`(vocab_size, hidden_size)`の行列の形になっていて、ルックアップテーブルのような形式で、このtoken_idならこのEmbeddingという風に参照されます。

`vocab_size`はモデルが保持している語彙数で、hidden_sizeはモデルのEmbeddingの次元です。

### Positional Encoding
`(seq_length, hidden_size)`の行列をEncoderに入力する前にシーケンスの何番目なのかの情報を付与する必要があります。

論文では

### Attention
Transformerにおける重要なコンポーネントの一つであるAttention機構です。

Multi-Head Attentionを理解するためにはそれを構成する部品となるScaled Dot-Product Attentionを理解する必要があります。

#### Scaled Dot-Product Attention
Scaled Dot-Product Attentionは次の式で表されます。

$$
Attention(Q,K,V)=softmax({QK^T \over {\sqrt{d_k}}})V
$$

ここで、$Q,K,V$はそれぞれQuery,Key,Valueを指しており、QueryとKeyの積を取り類似度を計算し、そのsoftmaxとValueの積を取ることで、シーケンスの注目すべき要素が強調された表現となりAttention機構から出力される仕組みとなっています。

しかし、論文の図ではPositional EncodingされたInputが3本に分かれてMulti-Head Attentionに入っています。\
これはQuery,Key,Value全てに同じInputを入力することを意味しています。

入力を全て同じにしてしまうと、類似度も何もないのでは？と思いますよね。

安心してください。確かに入力は同じなのですが、Multi-Head Attentionに入る前にそれぞれ別の重み行列を使って線形変換を行います。

#### Multi-Head Attention
Multi-Head AttentionはScaled Dot-Product Attentionを複数個並列に行うものです。\
しかし、ただ並列に行うだけでは意味がありません。

Multi-Head AttentionではQuery,Key,ValueをScaled Dot-Product Attentionする前に$W_i^Q,W_i^K,W_i^V$という重み行列によって線形変換されます。

具体的に示してみましょう。今、入力のサイズは`(seq_length, hidden_size)`でした。

そして、Multi-Head Attentionのhead、並列数とも言える数をhとします。

ここで
$$
W_i^Q \in \mathbb{R^{d_{model} \times d_k}}\\
W_i^K \in \mathbb{R^{d_{model} \times d_k}}\\
W_i^V \in \mathbb{R^{d_{model} \times d_v}}
$$
です。

まず、$QW_i^Q$は`(seq_length, hidden_size)`と`(hidden_size, hidden_size/h)`の行列の積なので`(seq_length, hidden_size/h)`となります。

次に$(KW_i^K)^T$は同様に`(seq_length, hidden_size/h)`となって転置され`(hidden_size/h, seq_length)`となります。

よって$QW_i^Q(KW_i^K)^T$は`(seq_length, seq_length)`の行列です。これを$\sqrt{d_k}$で除してsoftmaxを適用します。

そして
$$
Attention(QW_i^Q,KW_i^K,VW_i^V)=softmax({QW_i^Q(KW_i^K)^T \over {\sqrt{d_k}}})VW_i^V
$$
は、`(seq_length, seq_length)`と`(seq_length, hidden_size/h)`の行列の積なので`(seq_length, hidden_size/h)`の行列になります。

これをh個行い、作成したh個の`(seq_length, hidden_size/h)`の行列を横にconcatします。\
そうすると`(seq_length, hidden_size)`になり、Attentionブロックに入力される前のサイズになりました。
