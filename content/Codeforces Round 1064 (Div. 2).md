Title: Codeforces Round 1064 (Div. 2) 紀錄
Date: 2025-12-02 16:00
Category: 刷題記錄
Tags: Codeforces, div2, algorithm 
Slug: Codeforces-1064-紀錄
Summary: Codeforces 1064 刷題紀錄

# 被賴威廷狂電的一天
題目連結: [Codeforces Round 1064 (Div. 2)](https://codeforces.com/contest/2166)
今天星期二 我的隊長 威廷 賴 中興程式競賽 唯一真神 叫我刷題 因為我太爛了要多加練習>3


## A. Same Difference

這是一個普通的觀察題，因為他的字串只能抓後面那一個，所以 簡單來說 你可以從後面想回去，這時你會驚呀地發現，他就是看整個字串，有哪個字母跟最後一個不一樣!!(水題)

```cpp
#include<iostream>
 
using namespace std;

int main(){
    int t;
    cin>>t;
    while(t--){
        int n;
        cin>>n;
        string s;
        cin>>s;
        int ans =0;
        for(int i=0;i<s.size();i++){
            if(s[i]!=s[s.size()-1])ans++;
        }
        cout<<ans<<endl;
    }
}
```

## B. Tab Closing
這是一個 比較困難的觀察題，你可以打開它題目服的可視化網頁，玩一玩把測試資料都試過一次，因該就會發現答案只有1跟2兩種選項，那判斷的式子就是相乘之後比大小而已

```cpp
#include<iostream>
 
using namespace std;
 
 
int main(){
    int t;
    cin>>t;
    while(t--){
        long long int a,n,x;
        cin>>a>>x>>n;
        if(x>=a){
            cout<<"1"<<endl;
            continue;
        }
        if(x*n>a)cout<<"2"<<endl;
        else cout<<"1"<<endl;
    }
}
```
## C. Cyclic Merging
這一題比較複雜一點，應該可以蠻快的觀察，他就是要找出把他畫到一個二維平面上下凹處的點
那這個時候困難的地方就是在如何有效率的解決這問題很明顯的地方是 我要把兩個點合併 如果假設是vector 結構把它用擦掉的方式複雜度會極高，這時應該就會想到linked list 來實作這一題
但是現在還有一個問題 就是我需要知道凹點在哪，我要去知道此時最小值在哪，這時可以用一個min heap 來解決這問題(PQ)就可以完成這一題了！！ 雖然我是用假指標我知道我很鞋咖 不要罵我 嗚嗚嗚嗚嗚
```cpp

#include <iostream>
#include <vector>
#include <queue> // 引入 priority_queue
#include <algorithm>
 
using namespace std;
 
const int MAXN = 200005;
 
long long int now[MAXN];
long long int pre[MAXN];
long long int nex[MAXN];
bool deleted[MAXN];
 
int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
 
    int t;
    cin >> t;
    while (t--) {
        int n;
        cin >> n;
        priority_queue<pair<long long, int>, vector<pair<long long, int>>, greater<pair<long long, int>>> pq;
 
        for (int i = 1; i <= n; i++) {
            cin >> now[i];
            pre[i] = i - 1;
            nex[i] = i + 1;
            deleted[i] = false;
            pq.push({now[i], i});
        }
 
        pre[1] = n;
        nex[n] = 1;
 
        long long int ans = 0;
        for (int i = 0; i < n - 1; i++) {
            while (deleted[pq.top().second]) {
                pq.pop();
            }
 
            pair<long long, int> curr = pq.top();
            pq.pop();
 
            int idx = curr.second;     
            long long val = curr.first;
 
            int left_neighbor = pre[idx];
            int right_neighbor = nex[idx];
 
            
            if (now[left_neighbor] < now[right_neighbor]) {
                ans += now[left_neighbor];
            } else {
                ans += now[right_neighbor];
            }
 
            nex[left_neighbor] = right_neighbor;
            pre[right_neighbor] = left_neighbor;
 
            deleted[idx] = true;
        }
 
        cout << ans << "\n";
    }
    return 0;
}
```

## D. Marble Council
先感謝賴威廷電神給我DP思路

思路：
可以發現有些情況是的得不到的，那我們可以考慮哪些是合法的？
想到，對於出現在集合s 裡的每一個數x，其在原來集合裡一定是眾數，那對於沒出現在集合裡的數y 我們只要保證 sigma cnt(x)> sigma cnt(y)即可
因此，我們只需統計滿足上述條件的s個數即可。

這顯然可以轉化成一個​​背包問題：

狀態設定：
考慮 dp[i][j] 表示從1~ i的數中，在集合s中的數的cnt總和已經為 j的方案數
狀態轉移：
第i个数时，
如果放入s中：dp[i][j] += dp[i-1][j]
放到s中: dp[i][j + cnt[i]] += cnt[i] * dp[i-1][j]

```cpp
#include<iostream>
using namespace std;

const int mod = 998244353;
long long int a[5005],dp[5005][5005],cnt[5005];
void solve(){
    int n;
    
    cin>>n;
    for(int i = 0; i <= n; i++) cnt[i] = 0; 
    
    for(int i = 0; i <= n; i++){
        for(int j = 0; j <= n; j++){
            dp[i][j] = 0;
        }
    }

    for(int i=1;i<=n;i++){
        cin>>a[i],cnt[a[i]]++;
    }
    dp[0][0]=1;
    for(int i=1;i<=n;i++){
        for(int j=0;j<=n;j++){
            dp[i][j]+=dp[i-1][j];         
            if(j+cnt[i]<= n) dp[i][j+cnt[i]] = (dp[i][j+cnt[i]]+cnt[i]*dp[i-1][j]%mod)%mod;  
        }
    }
    long long int ans=0,mx=0;
    for(int i=1;i<=n;i++)mx=max(mx,cnt[i]);
    for(int i=mx;i<=n;i++)ans=(ans+dp[n][i])%mod;
    cout<<ans<<endl;
    
}
int main(){
    int T;
    cin>>T;
    while(T--){
        solve();
    }
    return 0;
}

```
## 後面的我就不會寫了 嘻嘻