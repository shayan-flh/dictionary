import json
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# فعال کردن CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# لود دیتابیس JSON
with open("words.json", "r", encoding="utf-8") as f:
    dictionary_data = json.load(f)

words_list = dictionary_data["words"]  # گرفتن لیست کلمات

@app.get("/search")
def search_word(query: str):
    results = [
        item for item in words_list
        if query.lower() in item["EnglishWord"].lower()
    ]
    return {"results": results}
