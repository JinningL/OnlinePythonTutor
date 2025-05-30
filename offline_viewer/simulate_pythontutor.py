import requests
import json

with open("code.c", "r") as f:
    code = f.read()

url = "https://pythontutor.com/web_exec_c.py"

params = {
    "user_script": code,
    "raw_input_json": "",
    "options_json": json.dumps({
        "cumulative_mode": False,
        "heap_primitives": False,
        "show_only_outputs": False,
        "origin": "opt-frontend.js",
        "cpp_version": "c_gcc9.3.0",
        "fe_disableHeapNesting": True,
        "fe_textualMemoryLabels": False
    }),
    "lang": "c",
    "stdin": "",
    "backend_options_json": "{}",
    "frontend_options_json": "{}",
    "starting_instruction": 0,
    "instruction_limit": 10000,
    "origin": "c"
}


response = requests.post(url, data=params)


if response.status_code == 200:
    result = response.json()
    print("✅ 模拟成功！你得到了执行结果 trace：\n")
    print(json.dumps(result, indent=2, ensure_ascii=False))  

    with open("trace.json", "w") as f:
        json.dump(result, f, indent=2)
    print("\n✅ trace.json 已保存成功！你可以用于本地加载啦。")
else:
    print("❌ 请求失败，状态码：", response.status_code)