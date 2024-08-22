---
sidebar_position: 2
---

# ローカルLLM with llama.cpp
では次に、llama.cppを使ってローカルLLMを試していきましょう。

## 準備
今回までWindowsでのCPU実行を前提に進めていきます。

### llama.cppのダウンロード
llama.cppはGitHubで公開されているソースコードから`make`や`cmake`を使ってビルドできますが、今回はすでにビルドされているものをダウンロードします。

[llama.cppのReleaseページ](https://github.com/ggerganov/llama.cpp/releases/)にアクセスし、Latestのバージョン(2024年8月時点では`b3616`)のAssetsから\
`llama-{バージョン}-bin-win-avx2-x64.zip`を選んでダウンロードします。
:::tip

お使いのPCのCPUがAVX2でない命令セットに対応している場合は、それに対応するzipファイルをダウンロードしてください。

:::

ダウンロードが終わったらzipファイルを解凍します。

### GGUFファイルのダウンロード
llama.cppを使ってローカルLLMを実行するにはモデルをGGUFというフォーマットに変換する必要があります。

幸い、llama.cppはローカルLLMのコミュニティで最も人気のフレームワークの一つですので、HuggingFace上には既に主要なモデルが有志によってGGUFに変換されています。\
多くの場合、いくつかの量子化のバリエーションを作成して公開されていることがほとんどです。

今回はgoogleが開発した`Gemma2`というモデルシリーズの2BサイズをGGUFに変換および量子化されたものを使用します。\
[mmnga/gemma-2-2b-it-gguf](https://huggingface.co/mmnga/gemma-2-2b-it-gguf)にアクセスして、「Files and versions」のタブに移動し、`gemma-2-2b-it-Q4_K_M.gguf`というファイルをダウンロードしてください。
:::tip

mmnga氏は日本語に対応しているローカルLLMを積極的にGGUF変換および量子化してくださっている方です。\

`gemma-2-2b-it-Q4_K_M.gguf`というファイル名から得られる情報を簡単に説明しますと
- gemma-2: Gemma2シリーズのモデル
- 2b: 2B(パラメータ)サイズ
- it: 対話できるように調整されているモデル
- Q4_K_M: 4bitの量子化で、K-Quantメソッドが使用されている中のMediumサイズ

:::
