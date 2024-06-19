def filmEntity(item) -> dict:
    return {
        "id": str(item["_id"]),
        "title": str(item["title"]),
        "description": str(item["description"]),
        "rating" : int(item["rating"]),
        "cover_link": str(item["cover_link"]),
        "trailer_link": item["trailer_link"],
        "date": item["date"],
        "budget": int(item["budget"]),
        "language": str(item["language"]),
        "duration": str(item(["duration"])),
        "article_link": str(item["article_link"])
    }

def filmsEntities(entities) -> list:
    return [filmEntity(item) for item in entities]