Object
data
:
data
:
Array(10)
0
:
{id: 1, title: 'Vesica tero spectaculum.', content: 'Crepusculum virtus cervus stips. Victoria amita ad… cicuta carus aliquid. Conscendo taedium crapula.', thumbnail: 'https://loremflickr.com/1626/3076?lock=7330833606846665', published: true, …}
1
:
{id: 2, title: 'Ago amo tabula coniuratio depopulo barba considero labore.', content: 'Dicta uter sortitus desino ultra apud vomica iste …Astrum desolo casso anser. Soluta abduco adficio.', thumbnail: 'https://loremflickr.com/1451/1102?lock=5182013487842003', published: true, …}

type지정

:
{id: number,
title: string,
content: string,
thumbnail: img srg,
published: boolean
, …}

/// +정보
"authorId": 4,
"createdAt": "2025-02-22T13:49:29.037Z",
"updatedAt": "2025-02-22T13:49:29.037Z",
"tags": [
{
"id": 4,
"name": "매튜"
}
],
"likes": [
{
"id": 5,
"userId": 3,
"lpId": 13
}
]
}
],
"nextCursor": 10, -> 다음 페이지를 요청해야할때 사용하는 커서 값
"hasNext": true => 다음페이지 존재유무
}

axios.get("http://localhost:8000/v1/lps", {
params: {
cursor: 10,
pageSize: 10,
},
});
GET http://localhost:8000/v1/lps?cursor=10&pageSize=10
메서드: GET

URL: http://localhost:8000/v1/lps

쿼리 파라미터:

cursor = 0 //요청할 때마다 새 nextCursor를 계산해서 응답에 넣어주는것 백엔드가 자동으로해줌 ㅎㅎ

limit = 10

order = asc
