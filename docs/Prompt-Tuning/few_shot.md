---
sidebar_position: 1
---

# Few-shot
## Overview
Few-shotとは、モデルへのプロンプトにいくつかの応答例を含めることです。

## Examples
### 2-shot
```python
prompt = ```User: この映画はこれまで見た中で一番面白い！
Assistant: Positive
User: こんなもの見るくらいなら家に閉じこもってた方がましだった。
Assistant: Negative
User: 家族にも見せてあげたいほど心に響いた映画だった。
Assistant: ```

# output -> Positive
```
