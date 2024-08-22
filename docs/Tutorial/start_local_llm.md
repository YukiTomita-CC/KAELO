---
sidebar_position: 1
---

# ローカルLLMを始める
まずはローカルLLMを、基本となるtransformersライブラリで試してみましょう。

## 準備～実行
:::info

**Python3.6以上**が既にインストールされている**Windows**を対象としています。
GPUが搭載されていないPCでも実行できるよう、CPU推論でのチュートリアルとなっています。

:::

1. 任意の場所にディレクトリを作成します。
```bash
mkdir start_local_llm
```

2. コマンドプロンプトやターミナルを起動し、1で作成したディレクトリに移動します。
```bash
cd start_local_llm
```

3. 下記のコマンドを実行し、Pythonの仮想環境を作成します。
```bash
python -m venv --prompt . .venv
```

4. 仮想環境をアクティベーションします。
```bash
.venv\Scripts\activate.bat
```

5. transformersライブラリをinstallします。
```bash
pip install transformers[torch]
```

6. 下記のコードを`sample.py`として現在のディレクトリに保存します。
```python
import torch
from transformers import AutoModelForCausalLM, AutoTokenizer

model = AutoModelForCausalLM.from_pretrained("cyberagent/open-calm-small", torch_dtype=torch.float16)
tokenizer = AutoTokenizer.from_pretrained("cyberagent/open-calm-small")

inputs = tokenizer("AIによって私達の暮らしは、", return_tensors="pt").to(model.device)
with torch.no_grad():
    tokens = model.generate(
        **inputs,
        max_new_tokens=64,
        do_sample=True,
        temperature=0.7,
        top_p=0.9,
        repetition_penalty=1.05,
        pad_token_id=tokenizer.pad_token_id,
    )
    
output = tokenizer.decode(tokens[0], skip_special_tokens=True)
print(output)
```

7. コードを実行します。\
(初回のみ400MBほどのデータをダウンロードしますので、回線によっては時間がかかるかもしれません。)
```bash
.venv\Scripts\python.exe sample.py
```

## まとめ
コードを実行して「**AIによって私達の暮らしは、**」の続きの文章が生成されていたら成功です。\
この文章の部分を変えて再度実行すると違う文章が生成されます。\
(モデルの生成にはランダム性がありますので実行のたびに文章は変わります)

ローカル環境で動いていますから、入力したデータは外部に送信されることはありません。\
試しにオフラインにしてから再度実行してみましょう。(1回目はモデルをダウンロードしますのでオンラインが必須です)

今回使用したのは、[GPT-NeoX](https://github.com/EleutherAI/gpt-neox)というライブラリを用いてCyberAgentによって開発された165MパラメータのDecoder-Onlyモデルです。\
他にもいろいろなモデルがありますので、[HuggingFace](https://huggingface.co/)などからモデルを探して試してみてください。

...と言いたいところですが、高性能なGPU(消費者向けでは*GeForce RTX 30シリーズ*や*GeForce RTX 40シリーズ*など)を搭載したPCでない限り、選択肢はかなり限られるというのが現状です。

2024年8月時点で高性能と評価されるモデルの多くはそのパラメータが7B以上、つまり今回の40倍以上で最低でも16GBのVRAM(GPUメモリ)を必要とします。\
もちろんCPUでも実行できますが、文章を生成するのに途方もない時間がかかってしまい現実的ではありません。

そのため、CPUでも現実的なスピードで実行できるフレームワークや量子化といった手法が積極的に開発されています。\
次のチュートリアルではllama.cppというフレームワークと量子化を使った実行を試していきましょう。

また、ここではDecoder-Onlyモデルを紹介しましたが、Encoder-Onlyモデル、Encoder-Decoderモデルなど、用途の異なるアーキテクチャが存在します。\
どのようなものがあるのかは以下のセクションを見てみてください。
- [Architecture](/docs/category/architecture/)
