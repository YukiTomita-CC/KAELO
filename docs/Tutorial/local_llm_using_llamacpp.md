---
sidebar_position: 3
---

# with llama.cpp
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
[mmnga/gemma-2-2b-it-gguf](https://huggingface.co/mmnga/gemma-2-2b-it-gguf)にアクセスして、「Files and versions」のタブに移動し、`gemma-2-2b-it-Q4_K_M.gguf`というファイルをダウンロードしてください。\
ファイルサイズは約2GBですので、ダウンロードに少し時間がかかるかもしれません。
:::tip

mmnga氏は日本語に対応しているローカルLLMを積極的にGGUF変換および量子化してくださっている方です。

`gemma-2-2b-it-Q4_K_M.gguf`というファイル名から得られる情報を簡単に説明しますと
- gemma-2: Gemma2シリーズのモデル
- 2b: 2B(パラメータ)サイズ
- it: 対話できるように調整されているモデル
- Q4_K_M: 4bitの量子化で、K-Quantメソッドが使用されている中でのMediumサイズ

となります。GGUFの量子化については[Quantize/GGUF](/docs/Quantize/GGUF)にて確認することができます。

:::

## CLIで実行
では、先ほど解凍した`llama.cpp`のフォルダにダウンロードしたGGUFファイルを移動します。

エクスプローラのアドレスバーに`cmd`と入力してEnterを押し、コマンドプロンプトで`llama.cpp`を開いて以下のコマンドを実行してください。

```bash
llama-cli.exe -m gemma-2-2b-it-Q4_K_M.gguf -n 64 -c 512 -co -p "<start_of_turn>user\nHello! How are you doing?<end_of_turn>\n<start_of_turn>model\n"
```
:::tip

各オプションの意味は下記のようになります。
- `-m`: 使用するモデルのGGUFファイル
- `-n`: 生成する文章(出力)の長さ
- `-c`: 扱う文章の長さ(入力+出力がこの長さに限定されます)
- `-co`: 入力文章と生成文章が分かりやすいように色を分ける
- `-p`: 入力する文章

ここで、入力する文章に`<start_of_turn>`や`user`など色々なものがくっついていることが分かります。\
これは**プロンプトフォーマット**といい、対話できるよう調整されたモデルは、この正しくフォーマットされた文字列でないと性能を発揮できません。\
Gemma2のプロンプトフォーマットは上記の通りですが、これはモデルによって様々です。

:::

コマンドを実行すると、ダーッと色んな出力がされた後に黄色で`-p`オプションで指定した文章が表示され、その次に生成された文章が表示されるはずです。

その下には`llama_print_timings`といういくつかの計測結果が表示されていると思いますが、特に重要な情報は`eval time`の`○○ tokens per second`の数値です。\
これは`tps`とも略され、一秒間に何文字(正確にはtoken)生成されたかという情報です。

個人的な体感として、
- 2～3 tps: 対話をするなら最低限のライン
- 5～10 tps: 大きなストレスなく対話可能
- 20～30 tps: 対話において反応が速いと感じる
- 50～ tps: 対話でないバッチ的な処理でも実用的

というようなレベル感でしょうか。基本的には対話形式でローカルLLMを使用する場合はストリーミングで全ての生成を待たずに、生成したものから表示していくのが最近の主流です。

では、先ほどのコマンドの`Hello! How are you doing?`の部分を変えながら出力の変化を試してみてください。
:::warning

`llama-cli`は出力の日本語表示に対応していないため、日本語を入力すると文字化けして表示されてしまいます。\
次のパラグラフで日本語でやり取りする方法を試してみましょう。

:::

## サーバー機能を使って実行
先ほどの`llama-cli`では実行のたびにモデルをロードしていました。\
1回や2回、出力を確認してみるくらいならそれで十分ですが、何回も使いたいとなるとその度にモデルをロードするのは現実的ではありません。\
そこで、`llama.cpp`にはモデルをロードしていつでも使えるように待機しておくサーバー機能がありますので、それを使ってみましょう。

以下のコマンドを実行してください。
```bash
llama-server.exe -m gemma-2-2b-it-Q4_K_M.gguf -n 64 -c 512 --port 8080
```
:::tip

オプションについては、`-m`、`-n`、`-c`は先ほど使ったものと同じ意味です。\
`--port`は何番のポートを使用するか指定できます。特に問題なければデフォルトの`8080`で実行します。

:::

これで、いつでもモデルを使える状態になりました。curlやrequestsライブラリから使うこともできますが、`llama-server`の機能であるOpenAI互換サーバーを利用するのが簡単です。

[前チュートリアル](/docs/Tutorial/start_local_llm)で作成したPython仮想環境を利用します。\
(このチュートリアルから始めている方は、[前チュートリアルの「準備～実行」](/docs/Tutorial/start_local_llm#準備実行)の1～4を実行してください)

1. **仮想環境をアクティブにした状態で**、以下のライブラリをinstallしてください。
```bash
pip install openai
```

1. 下記のコードを`llamacpp_example.py`として`start_local_llm`ディレクトリに保存します。
```python
import openai


client = openai.OpenAI(
    base_url="http://localhost:8080/v1",
    api_key = "no-required"
)

messages = []
while True:
    user_input = input("User: ")

    messages.append({"role": "user", "content": user_input})

    completion = client.chat.completions.create(
        model="gemma2",
        messages=messages,
        stream=True
        )

    print("Assistant: ", end='')

    output = ""
    for chunk in completion:
        if chunk.choices[0].delta.content:
            gen_token = chunk.choices[0].delta.content

            print(gen_token, end='', flush=True)
            output += gen_token

    print()

    messages.append({"role": "assistant", "content": output})
```

3. `start_local_llm`ディレクトリでコマンドプロンプトを開き、以下のコードを実行します。
```bash
.venv\Scripts\python.exe llamacpp_example.py
```

実行して少し待つと
```
User: 
```
と表示されますので、「こんにちは。あなたの名前は何ですか？」など、会話したい内容を入力してEnterを押してください。

ローカルLLMによる文章の生成が終わるとまたこちらのターンになります。\
前のターンの文脈が必要な会話などを入力してみて、どのような出力になるか試してみましょう。

4. 会話を終わるときは`Ctrl+C`で終了します。
5. `llama-server.exe`も`Ctrl+C`で終了できます。

## まとめ
llama.cppでCPU実行を試すことができました。

注意点として、他の大きなモデルをllama.cppで試す場合はお使いのPCのRAMを確認してください。\
Windowsで言えば、`タスクマネージャー`の`パフォーマンス`タブの`メモリ`を開いて、`利用可能`という項目の数値で確認できます。\
例えば、`利用可能`の数値が`17.7GB`となっていたら、そのPCで動かせるGGUFファイルのサイズの上限は`1.5`で除した`12GB`程が目安です。
