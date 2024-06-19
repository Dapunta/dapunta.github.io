# import requests, re

# user_agent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
# headers_get = {
#     'Accept':'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
#     'Accept-Encoding':'gzip, deflate',
#     'Accept-Language':'en-US,en;q=0.9',
#     'Dpr':'1',
#     'Priority':'u=0, i',
#     'Sec-Ch-Prefers-Color-Scheme':'dark',
#     'Sec-Ch-Ua':'""',
#     'Sec-Ch-Ua-Full-Version-List':'""',
#     'Sec-Ch-Ua-Mobile':'?0',
#     'Sec-Ch-Ua-Model':'""',
#     'Sec-Ch-Ua-Platform':'""',
#     'Sec-Ch-Ua-Platform-Version':'""',
#     'Sec-Fetch-Dest':'document',
#     'Sec-Fetch-Mode':'navigate',
#     'Sec-Fetch-Site':'same-origin',
#     'Upgrade-Insecure-Requests':'1',
#     'User-Agent':user_agent,
#     'Viewport-Width':'960',
# }

# def Setter(cookie):
#     r = requests.Session()
#     req = r.get('https://adsmanager.facebook.com/adsmanager/manage/campaigns', headers=headers_get, cookies={'cookie':cookie}).text.replace('\\','')
#     act = re.search(r'act=(\d+)',str(req)).group(1)
#     print(act)

# if __name__ == '__main__':
#     cookie = 'sb=dO6kZZiKUA-GYCqlx7trixOV;c_user=61556949299760;ps_n=1;ps_l=1;datr=mjM7Zg3rmUhUVJ7jCBI7QLhl;fbl_st=100437153%3BT%3A28618176;wl_cbv=v2%3Bclient_version%3A2517%3Btimestamp%3A1717090559;vpd=v1%3B640x360x2.0000000298023224;m_page_voice=61556949299760;locale=en_US;xs=42%3A_LBMPl7hh2_NtQ%3A2%3A1715093294%3A-1%3A10888%3A%3AAcVd6LqXPa8jdF6U1j5JkCiSStVNvoZt-MsVoY5Odgk;wd=360x640;m_pixel_ratio=2.0000000298023224;fr=1YSmzZrF1CeiUuGp4.AWU7HAGejc2lrHERNm3kUCbxk_Q.BmccEm..AAA.0.0.Bmcq7J.AWXgcGKyZHE;cppo=1;dpr=1.25;usida=eyJ2ZXIiOjEsImlkIjoiQXNmYnA2ZWtlemVsdSIsInRpbWUiOjE3MTg3OTMwNDd9;'
#     Setter(cookie)

print('def EvenOrOdd(number):')
for i in range(2000000+1):
    print('    {} number == {}:\n        print("{}")'.format('if' if i == 0 else 'elif', str(i), 'Even' if i % 2 == 0 else 'Odd'))