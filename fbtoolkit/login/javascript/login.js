async function login(cookie) {
    try {
        const id = GetUserID(cookie);
        console.log('Masok');
        const tokenEAAB = await TokenEAAB(cookie);
        console.log(tokenEAAB);
        const tokenEAAG = await TokenEAAG(cookie);
        console.log(tokenEAAG);
        return {
            status: 'success',
            ...await GeneralData(cookie, tokenEAAB),
            ...await FriendCount(cookie, tokenEAAB),
            ...await FollowerCount(cookie, tokenEAAG),
            ...await PostCount(cookie, tokenEAAG),
            cookie: cookie, token_eaab: tokenEAAB, token_eaag: tokenEAAG
        };}
    catch (error) {
        return { status: 'failed', id: null, name: null, gender: null, picture: null, friend: null, follower: null, post: null, cookie: null, token_eaab: null, token_eaag: null };}
}

function GetUserID(cookie) {
    const match = /c_user=(\d+)/.exec(cookie);
    return match ? match[1] : null;
}

async function TokenEAAB(cookie) {
    const response = await fetch('https://adsmanager.facebook.com/adsmanager/manage/campaigns', { headers: { cookie } });
    const text = await response.text();
    const act = /act=(\d+)/.exec(text.replace(/\\/g, ''))[1];
    const tokenResponse = await fetch(`https://adsmanager.facebook.com/adsmanager/manage/campaigns?act=${act}&breakdown_regrouping=1&nav_source=no_referrer`, { headers: { cookie } });
    const tokenText = await tokenResponse.text();
    return /accessToken="(.*?)"/.exec(tokenText.replace(/\\/g, ''))[1];
}

async function TokenEAAG(cookie) {
    const response = await fetch('https://business.facebook.com/business_locations', { headers: { cookie } });
    const text = await response.text();
    return (/\["EAAG\w+/.exec(text)[0]).replace('["', '');
}

async function GeneralData(cookie, token) {
    const response = await fetch(`https://graph.facebook.com/me?fields=id,name,gender,picture.width(1080)&access_token=${token}`, { headers: { cookie } });
    const data = await response.json();
    return { id: data.id, name: data.name, gender:data.gender, picture:data.picture.data.url };
}

async function FriendCount(cookie, token) {
    const response = await fetch(`https://graph.facebook.com/me/friends?limit=0&access_token=${token}`, { headers: { cookie } });
    const data = await response.json();
    return { friend: data.summary.total_count };
}

async function FollowerCount(cookie, token) {
    const response = await fetch(`https://graph.facebook.com/me?fields=subscribers.fields(id).limit(0)&access_token=${token}`, { headers: { cookie } });
    const data = await response.json();
    return { follower: data.subscribers.summary.total_count };
}

async function PostCount(cookie, token) {
    const response = await fetch(`https://graph.facebook.com/me?fields=posts.fields(id).limit(5000)&access_token=${token}`, { headers: { cookie } });
    const data = await response.json();
    return { post: data.posts.data.length };
}

// const cookie = 'sb=dO6kZZiKUA-GYCqlx7trixOV;c_user=61556949299760;ps_n=1;ps_l=1;datr=mjM7Zg3rmUhUVJ7jCBI7QLhl;fbl_st=100437153%3BT%3A28618176;wl_cbv=v2%3Bclient_version%3A2517%3Btimestamp%3A1717090559;vpd=v1%3B640x360x2.0000000298023224;m_page_voice=61556949299760;xs=42%3A_LBMPl7hh2_NtQ%3A2%3A1715093294%3A-1%3A10888%3A%3AAcWoeRrcZAzI4fsyTt9DP2D1z_0Z6waWeaJz3eWBVCM;fr=1DUsikiK908ysqVxW.AWXPficUmBvi5D235gdqTyKyEps.BmYoYr..AAA.0.0.BmZfqO.AWUG1LHEMkE;';
// login(cookie).then(data => console.log(data));

export { login }