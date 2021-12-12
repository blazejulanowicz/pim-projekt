# Define here the models for your scraped items
#
# See documentation in:
# https://docs.scrapy.org/en/latest/topics/items.html

import scrapy


class EnumberItem(scrapy.Item):
    ALL_ITEMS = []
    id = scrapy.Field()
    name = scrapy.Field()
    data = scrapy.Field()
