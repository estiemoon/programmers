# 가계부

기존 코드 github : https://github.com/feel5ny/prms-js

## Use Case

1. 현재 자산을 입력할 수 있다.
2. 가계부 내역을 입력할 수 있다.
3. 가계부 목록을 볼 수 있다.
-추가된 항목-
4. 카테고리 별 사용 금액을 볼 수 있다.

## Detail

가계부 내역 데이터

```json
{
	"currentFunds": 1000000,
}
```

```
{
 
"categories" : {
   cafe : 0,
   food : 0,
   culture : 0,
   life : 0
}

,

"dateList" : {
    date: new Date("2000-01-10").toLocaleDateString(),
    id: "2",
}
,

"detailList": {
    2: {
       id: Date.now() + 1000,
       createAt: new Date(),
       description: "삼겹살",
       category: "식사",
       amount: 20000,
       fundsAtTheTime: 9978000,
     }[]
  }

  
}

```
