# 일본 숙소 모음 페이지 (GitHub Pages)

`index.html` 파일 하나로 동작하는 모바일 다크모드 숙소 추천 페이지입니다. 외부 라이브러리·빌드 없이 그대로 올리면 됩니다.

## 1. 제휴 ID 넣기 (가장 먼저 할 일)

`index.html` 맨 아래 `<script>` 안의 `AFFILIATE_CONFIG`만 고치면 카드 20개 버튼 전부에 자동 반영됩니다.

```js
var AFFILIATE_CONFIG = {
  trip:  { aid: "", sid: "" },   // 트립닷컴 파트너 AID / SID
  agoda: { cid: "" }             // 아고다 어필리에이트 cid
};
```

- 트립닷컴: https://kr.trip.com/partners/tools/index 로그인 → `Account` → `Manage My Sites`에서 **AID**, **SID** 숫자 확인
  - 값이 있으면 버튼 링크에 `?allianceid=AID&sid=SID`가 자동으로 붙습니다.
- 아고다: 아고다 파트너스 대시보드의 **cid** 숫자 → `?cid=값` 자동 첨부
- 비워 두면 제휴 파라미터 없이 일반 숙소 페이지로 열립니다(페이지는 정상 동작).

> 제휴 링크는 트립닷컴 파트너 도구의 **딥링크 생성기**로 한 번 더 확인하는 걸 권합니다. 파트너 정책상 생성된 링크의 파라미터를 임의로 수정하면 적립이 누락될 수 있습니다.

## 2. GitHub Pages에 올리기

1. GitHub에서 새 저장소를 만듭니다(Public). 예: `hotels`
2. 이 폴더의 `index.html`을 저장소 최상위에 업로드합니다.
3. 저장소 → **Settings → Pages** → Source를 `Deploy from a branch`, Branch를 `main` / 폴더 `/ (root)`로 저장합니다.
4. 1~2분 뒤 `https://<깃허브아이디>.github.io/hotels/` 에서 열립니다.

프로필 링크에 걸 때는 위 주소를 그대로 쓰면 됩니다.

## 3. 내용 수정 포인트

- **숙소 교체/추가**: `<article class="card">` 블록을 복사해 `data-num`, `data-city`, `data-tier`, `data-who`, `data-search`와 카드 내용을 바꿉니다.
  - `data-city`: `tokyo` `osaka` `yokohama` `fukuoka` `sapporo`
  - `data-tier`: `low`(가성비) `mid`(중간급) `high`(고급)
  - `data-who`: `solo` `duo` `family` 중 해당하는 것을 공백으로 구분
  - `data-search`: 검색에 걸릴 한글·영문·역 이름 키워드
  - 버튼의 `href`와 `data-agoda` / `data-trip` 값을 같은 숙소 페이지 주소로 바꿉니다.
- **검색·필터**: 별도 설정 없이 `data-*` 값만으로 동작합니다(번호로도 검색 가능).
- **문구**: 하단 공정위 문구(`제휴 마케팅 활동의 일환으로…`)는 그대로 두는 것이 안전합니다.

## 4. 확인된 정보 기준

숙소 정보(역 도보 거리, 온천·대욕장 유무와 운영시간, 객실 수)는 2026-11-14 기준 각 숙소 공식 홈페이지와 예약 사이트 안내로 확인했습니다. 운영시간·요금·이용 규정은 바뀔 수 있어 페이지 하단에도 안내 문구를 넣어 두었습니다.

- 사진은 저작권 문제를 피하려고 넣지 않고, 도시별 그라데이션 카드로 대체했습니다. 나중에 직접 촬영한 사진이 있으면 `.thumb` 안에 `<img>`를 넣어 교체할 수 있습니다.
- 리뷰 수·평점은 넣지 않았습니다(수시로 바뀌고, 확인 시점에 따라 달라지기 때문).
