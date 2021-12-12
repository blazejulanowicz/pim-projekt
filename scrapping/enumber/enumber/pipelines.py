from .items import EnumberItem

class EnumberPipeline:
    def process_item(self, item, spider):
        EnumberItem.ALL_ITEMS.append(item)
        return item
