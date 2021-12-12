# Define here the models for your spider middleware
#
# See documentation in:
# https://docs.scrapy.org/en/latest/topics/spider-middleware.html

from scrapy import signals

from .items import EnumberItem
import json

class EnumberMiddleware:
    @classmethod
    def from_crawler(cls, crawler):
        s = cls()
        crawler.signals.connect(s.spider_opened, signal=signals.spider_opened)
        crawler.signals.connect(s.spider_closed, signal=signals.spider_closed)
        return s

    def spider_opened(self, spider):
        spider.logger.info('Spider opened: %s' % spider.name)

    def spider_closed(self, spider, reason):
        spider.logger.info('Saving to JSON...')
        items_info = {}
        for item in EnumberItem.ALL_ITEMS:
            temp = {'name': item['name']}
            temp.update(item['data'])
            items_info[item['id']] = temp
        with open('dump.json', 'w') as f:
            f.write(json.dumps({'items': {'EN': items_info}}))
