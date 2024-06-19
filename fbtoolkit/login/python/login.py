import requests, re

def Login(cookie:str) -> dict:
    try:
        r = requests.Session()
        id = GetUserID(cookie)
        token_eaab = TokenEAAB(r, cookie)
        token_eaag = TokenEAAG(r, cookie)
        return({
            'status':'success',
            **GeneralData(r, cookie, token_eaab),
            **FriendCount(r, cookie, token_eaab),
            **FollowerCount(r, cookie, token_eaag),
            **PostCount(r, cookie, token_eaag),
            **{'cookie':cookie, 'token_eaab':token_eaab, 'token_eaag':token_eaag}
        })
    except Exception:
        return({'status':'failed', 'id':None, 'name':None, 'gender':None, 'picture':None, 'friend':None, 'follower':None, 'post':None, 'cookie':None, 'token_eaab':None, 'token_eaag':None})
    
def GetUserID(cookie:str):
    return(re.search(r'c_user=(\d+)',str(cookie)).group(1))

def TokenEAAB(r, cookie:str):
    return(re.search(r'accessToken="(.*?)"',str(r.get('https://adsmanager.facebook.com/adsmanager/manage/campaigns?act={}&breakdown_regrouping=1&nav_source=no_referrer'.format(re.search(r'act=(\d+)',str(r.get('https://www.facebook.com/adsmanager/manage/campaigns',cookies={'cookie':cookie}).text.replace('\\',''))).group(1)),cookies={'cookie':cookie}).text.replace('\\',''))).group(1))

def TokenEAAG(r, cookie:str):
    return(re.search(r'(\["EAAG\w+)', r.get('https://business.facebook.com/business_locations',cookies={'cookie':cookie}).text).group(1).replace('["',''))

def GeneralData(r, cookie:str, token:str):
    req = r.get('https://graph.facebook.com/me?fields=id,name,gender,picture.width(1080)&access_token={}'.format(token), cookies={'cookie':cookie}).json()
    return({'id':req['id'], 'name':req['name'], 'gender':req['gender'], 'picture':req['picture']['data']['url']})

def FriendCount(r, cookie:str, token:str):
    req = r.get('https://graph.facebook.com/me/friends?limit=0&access_token={}'.format(token), cookies={'cookie':cookie}).json()
    return({'friend':req['summary']['total_count']})

def FollowerCount(r, cookie:str, token:str):
    req = r.get('https://graph.facebook.com/me?fields=subscribers.fields(id).limit(0)&access_token={}'.format(token), cookies={'cookie':cookie}).json()
    return({'follower':req['subscribers']['summary']['total_count']})

def PostCount(r, cookie:str, token:str):
    req = r.get('https://graph.facebook.com/me?fields=posts.fields(id).limit(5000)&access_token={}'.format(token), cookies={'cookie':cookie}).json()
    return({'post':len(req['posts']['data'])})

if __name__ == '__main__':
    cookie = 'sb=dO6kZZiKUA-GYCqlx7trixOV;c_user=61556949299760;ps_n=1;ps_l=1;datr=mjM7Zg3rmUhUVJ7jCBI7QLhl;fbl_st=100437153%3BT%3A28618176;wl_cbv=v2%3Bclient_version%3A2517%3Btimestamp%3A1717090559;vpd=v1%3B640x360x2.0000000298023224;m_page_voice=61556949299760;xs=42%3A_LBMPl7hh2_NtQ%3A2%3A1715093294%3A-1%3A10888%3A%3AAcWoeRrcZAzI4fsyTt9DP2D1z_0Z6waWeaJz3eWBVCM;fr=1DUsikiK908ysqVxW.AWXPficUmBvi5D235gdqTyKyEps.BmYoYr..AAA.0.0.BmZfqO.AWUG1LHEMkE;'
    login_data = Login(cookie)
    print(login_data)