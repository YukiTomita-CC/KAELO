---
sidebar_position: 1
---

# はじめに
## このサイトについて
このサイトは日本におけるローカルLLMに関する知識や情報交換を行う目的で作成されました。\
現時点では英語圏などと比較して情報や知見が集まりにくい環境だと感じているため、少しでもコミュニティの発展に寄与できれば幸いです。
:::info

このサイトにおける`ローカルLLM`の定義は、
- 推論や学習に必要なニューラルネットワークの重み等が公開されており、オフラインでそれらが可能なこと
- テキストを入力として、テキストもしくは埋め込み表現を出力するモデルであること

とします。

`Large`の基準が曖昧になっていることもあり、モデルのサイズは問いません。\
また、Transformer以外のアーキテクチャ(RWKVやManbaなど)も同様に扱います。

:::

:::warning

このサイトの作成者は自然言語処理、ひいては機械学習、プログラムを生業としている者ではありません。\
そのため、間違った解釈をしてしまっている可能性も十分考えられます。\
正確な情報をまとめられるよう努めていますが、万が一誤りを見つけられた場合はご連絡ください。

:::

## なぜローカルか？
OpenAIやGoogleによるSOTAなクローズドモデルとの最も大きな違いは、**モデルとそれを扱うライブラリが手元にあること**だと思っています。
  - クローズドモデルに対し、どんなにチューニングを行っても企業側がモデルをアップデートしたり削除すれば同じものは残らない
  - 対して、ローカルなモデルは適切な管理を行えさえいれば手元に残り続ける

何かの課題を解決する機械学習モデルである以上、実世界の変化に沿って変わり続ける必要はあるでしょうが、そのタイミングは私たちが決めるべきです。
    
これはどちらが優れているということでもなく、汎用性においては間違いなくクローズドモデルがトップです。\
問題はクローズドモデルに**依存しすぎること**だと思います。\
適度にその技術の恩恵を享受しつつ、自身が解決すべきタスクは自身のローカルなモデルで解決するのがベストではないでしょうか。

セキュリティ面でのメリットも多少はあるでしょうが、ローカルLLMでも実運用にシフトするとなるとセキュリティリスクは同様に生じると思われます。

## 運用について
基本的には一人体制で情報収集や記事の作成を行っています。

もし協力してくださる方がいらっしゃればXやGitHubにてご連絡ください。\
GitHubのIssueやPull Requestでの指摘や記事の修正も是非ご検討ください。
