---
sidebar_position: 2
---

# ローカルLLMを始める
ローカルLLMを、基本となるtransformersライブラリで試してみましょう。

## 準備～実行
:::info

**Python3.7以上**が既にインストールされている**Windows**を対象としています。\
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

今回使用したのは、[GPT-NeoX](https://github.com/EleutherAI/gpt-neox)というライブラリを用いてCyberAgentによって開発された165M(1億6500万)パラメータのDecoder-Onlyモデルです。\
他にもいろいろなモデルがありますので、[HuggingFace](https://huggingface.co/)などからモデルを探して試してみてください。

また、ここでは文章の生成を得意とするDecoder-Onlyモデルを紹介しましたが、文章全体の理解を得意とするEncoder-Onlyモデル、それらを組み合わせたEncoder-Decoderモデルなど、用途の異なるアーキテクチャが存在します。\
どのようなものがあるのかは以下のセクションを見てみてください。
- [Architecture](/docs/category/architecture/)
