---
sidebar_position: 1
---

# ローカルLLMって？
まずは、現状のローカルLLMコミュニティの概要をざっくりと認識することから始めましょう。

## どんなことが、どんな精度でできるの？
OpenAIのGPT-4oや、GoogleのGeminiなどができることはほとんどの場合可能です。\
例えば、以下のようなものです。
### テキスト補完、文章生成
多くのモデルが存在します。現時点では次のようなモデルがあります。
- [cyberagent/Llama-3.1-70B-Japanese-Instruct-2407](https://huggingface.co/cyberagent/Llama-3.1-70B-Japanese-Instruct-2407)
  - CyberAgentがMetaの`Meta-Llama-3.1-70B-Instruct`というモデルに日本語の追加学習を行ったモデルです。
  - 日本語に対応しているモデルを比較した[Nejumi LLMリーダーボード3](https://wandb.ai/wandb-japan/llm-leaderboard3/reports/Nejumi-LLM-3--Vmlldzo3OTg2NjM2?accessToken=wpnwc9whr96pxm40dfe4k3xq513f9jc4yhj7q6pnvj4jtayoefbc77qhzbsrztgz)では、日本語ローカルLLMの中でトップ性能となっています。
- [google/gemma-2-9b-it](https://huggingface.co/google/gemma-2-9b-it)
  - Googleが公開しているモデルで、比較的小さなサイズでありながら高い性能を有しています。

### Function Calling
- [karakuri-ai/karakuri-lm-8x7b-instruct-v0.1](https://huggingface.co/karakuri-ai/karakuri-lm-8x7b-instruct-v0.1)
  - KARAKURIがMistralの`Mixtral-8x7B-Instruct-v0.1`をベースとしたモデルをチューニングしたモデルです。

## PCの最低必要スペックとかある？
ローカルLLMで何を行うかによって、必要なスペックは大きく異なります。

パラメータ数が10B(100億)以下のモデルを使って日常的なチャットを楽しむだけなら十数万程度のローエンドゲーミングPCで十分です。

文章生成ではない、テキスト分類やNERなどのタスクを行いたいだけならGPUの載っていないPCでも推論は可能です。

しかし、GPT-4(≠GPT-4-Turbo)やClaude-3-Opusと同程度の汎用的なモデルを使いたい、公開されているモデルを特定のタスクで学習したいとなると要求されるハードの金額は数十万、数百万に跳ね上がります。

これについては、[Dataセクション](/docs/category/data)にいくつかのヒントをまとめていますので、何をしたいかによってハードを検討することをおすすめします。

## たくさんモデルがあるけど、どう使い分ければいいの？
...

## どんな知識が必要？前提知識は？
...

## デメリットはある？
デメリットとしては
- クローズドなモデルと比較して汎用的な性能は劣ってしまう
- 要件によってはハードへの初期投資が高額になってしまう
- 高度なカスタムには幅広い知識を必要とする

といったことが挙げられます。

しかし、クローズドなモデルに比べて自由度がはるかに高いことはこれらのデメリットを打ち消すほどのメリットだと考えています。

## どう始めればいい？使い始めるのってめんどくさい？
使い始めるのはそんなにめんどくさいものでもありません。

次のチュートリアルでは、CPUでの推論を数ステップで行う方法を紹介しています。

## まず自分のマシンにいろいろ入れる前に試してみたいんだけど？
[Notebooksセクション](/docs/category/notebooks)にGoogle Colabで実行可能なnotebookをいくつか置いています。

無料版でも利用できるものがいくつかありますので、実際にローカル環境をセットアップする前に試してみてください。
