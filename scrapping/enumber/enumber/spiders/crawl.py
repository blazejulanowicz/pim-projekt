from typing import Text
from scrapy.http.response.text import TextResponse
from scrapy.spiders import CrawlSpider, Rule
from scrapy.linkextractors import LinkExtractor
import re
from ..items import EnumberItem

class MySpider(CrawlSpider):
    name = 'enumber'
    allowed_domains = ['www.food-info.net']
    start_urls = ['http://www.food-info.net/uk/e/e-alphabet.htm']

    rules = (
        Rule(LinkExtractor(allow=(r'/uk/e/e\d+\.htm', )), callback='parse_item'),
    )

    def parse_item(self, response: TextResponse):
        title = response.xpath('//h1/descendant-or-self::*/text()').getall()
        title = ''.join(title)
        normal_name = re.search(r'[E]{0,1}\s*\d{3,4}\s*[:]*', title)
        if normal_name:
            normal_name = normal_name.group()
            normal_name = title.replace(normal_name, '')
            if ':' in normal_name:
                normal_name = normal_name.replace(':', '')
            normal_name = normal_name.strip()
        contents = response.xpath("//td[@align='left']").xpath(".//p")
        del contents[0]
        data = {}
        if_origin = False
        for index, par in enumerate(contents):
            try:
                strongs = par.xpath('.//strong/text()').getall()
                if not len(strongs):
                    continue
                key = strongs[0].strip()
                if key == '':
                    key = strongs[1] 
                key = key.replace(':', '').strip()
                if 'Origin' in key:
                    if_origin = True
                if not if_origin:
                    continue
            except AttributeError:
                continue
            values = par.xpath('.//text()').getall()
            values = re.sub(rf'{key}\s*:', '',''.join(values))
            values = re.sub(' +', ' ', values.replace('\n', '')).strip()
            if values != '':
                data[key] = values
        item = EnumberItem()
        item['id'] = re.search(r'e\d{3,4}(?=\.htm)', response.url).group()
        item['name'] = normal_name
        item['data'] = data
        yield item
