import requests, re, uuid, random, time, hashlib

def LoginEmail(email:str, password:str):
    try:
        r = requests.Session()
        head = {'Host':'b-graph.facebook.com','X-Fb-Connection-Quality':'EXCELLENT','Authorization':'OAuth 350685531728|62f8ce9f74b12f84c123cc23437a4a32','User-Agent':'Dalvik/2.1.0 (Linux; U; Android 7.1.2; RMX3740 Build/QP1A.190711.020) [FBAN/FB4A;FBAV/417.0.0.33.65;FBPN/com.facebook.katana;FBLC/in_ID;FBBV/480086274;FBCR/Corporation Tbk;FBMF/realme;FBBD/realme;FBDV/RMX3740;FBSV/7.1.2;FBCA/x86:armeabi-v7a;FBDM/{density=1.0,width=540,height=960};FB_FW/1;FBRV/483172840;]','X-Tigon-Is-Retry':'false','X-Fb-Friendly-Name':'authenticate','X-Fb-Connection-Bandwidth':str(random.randrange(70000000,80000000)),'Zero-Rated':'0','X-Fb-Net-Hni':str(random.randrange(50000,60000)),'X-Fb-Sim-Hni':str(random.randrange(50000,60000)),'X-Fb-Request-Analytics-Tags':'{"network_tags":{"product":"350685531728","retry_attempt":"0"},"application_tags":"unknown"}','Content-Type':'application/x-www-form-urlencoded','X-Fb-Connection-Type':'WIFI','X-Fb-Device-Group':str(random.randrange(4700,5000)),'Priority':'u=3,i','Accept-Encoding':'gzip, deflate','X-Fb-Http-Engine':'Liger','X-Fb-Client-Ip':'true','X-Fb-Server-Cluster':'true','Content-Length':str(random.randrange(1500,2000))}
        data = {'adid':str(uuid.uuid4()),'format':'json','device_id':str(uuid.uuid4()),'email':email,'password':'#PWD_FB4A:0:{}:{}'.format(str(time.time())[:10], password),'generate_analytics_claim':'1','community_id':'','linked_guest_account_userid':'','cpl':True,'try_num':'1','family_device_id':str(uuid.uuid4()),'secure_family_device_id':str(uuid.uuid4()),'credentials_type':'password','account_switcher_uids':[],'fb4a_shared_phone_cpl_experiment':'fb4a_shared_phone_nonce_cpl_at_risk_v3','fb4a_shared_phone_cpl_group':'enable_v3_at_risk','enroll_misauth':False,'generate_session_cookies':'1','error_detail_type':'button_with_disabled','source':'login','machine_id':str(''.join([random.choice('abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789') for i in range(24)])),'jazoest':str(random.randrange(22000,23000)),'meta_inf_fbmeta':'V2_UNTAGGED','advertiser_id':str(uuid.uuid4()),'encrypted_msisdn':'','currently_logged_in_userid':'0','locale':'id_ID','client_country_code':'ID','fb_api_req_friendly_name':'authenticate','fb_api_caller_class':'Fb4aAuthHandler','api_key':'882a8490361da98702bf97a021ddc14d','sig':str(hashlib.md5(str(uuid.uuid4()).encode()).hexdigest()[:32]),'access_token':'350685531728|62f8ce9f74b12f84c123cc23437a4a32'}
        pos  = r.post('https://b-graph.facebook.com/auth/login', data=data, headers=head).json()
        if ('session_key' in str(pos)) and ('access_token' in str(pos)):
            token  = pos['access_token']
            cookie = ''.join(['{}={};'.format(i['name'],i['value']) for i in pos['session_cookies']])
            return(LoginCookie(cookie))
        else: return({'status':'failed', 'id':None, 'name':None, 'gender':None, 'picture':None, 'friend':None, 'follower':None, 'post':None, 'cookie':None, 'token_eaab':None, 'token_eaag':None})
    except Exception as e: return({'status':'failed', 'id':None, 'name':None, 'gender':None, 'picture':None, 'friend':None, 'follower':None, 'post':None, 'cookie':None, 'token_eaab':None, 'token_eaag':None})

def LoginCookie(cookie:str) -> dict:
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

# if __name__ == '__main__':
#     cookie = 'sb=dO6kZZiKUA-GYCqlx7trixOV;c_user=61556949299760;ps_n=1;ps_l=1;datr=mjM7Zg3rmUhUVJ7jCBI7QLhl;fbl_st=100437153%3BT%3A28618176;wl_cbv=v2%3Bclient_version%3A2517%3Btimestamp%3A1717090559;vpd=v1%3B640x360x2.0000000298023224;m_page_voice=61556949299760;xs=42%3A_LBMPl7hh2_NtQ%3A2%3A1715093294%3A-1%3A10888%3A%3AAcWoeRrcZAzI4fsyTt9DP2D1z_0Z6waWeaJz3eWBVCM;fr=1DUsikiK908ysqVxW.AWXPficUmBvi5D235gdqTyKyEps.BmYoYr..AAA.0.0.BmZfqO.AWUG1LHEMkE;'
#     login_data = Login(cookie)
#     print(login_data)