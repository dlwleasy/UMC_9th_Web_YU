const formatDate = (dateString) => {
return new Date(dateString).toLocaleDateString("ko-KR", {
year: "numeric",
month: "long",
day: "numeric",
});
};

옵션 값,의미,한국어 (ko-KR) 결과,영어 (en-US) 결과
"""numeric""",숫자만,11월 (또는 11),11
"""2-digit""",두 자리 숫자 (0 채움),11월 (또는 11),11 (1월이면 01)
"""long""",긴 글자 (풀네임),11월,November
"""short""",짧은 글자 (약어),11월,Nov
"""narrow""",아주 짧게,11월,N
'옵션 값,의미,예시 (한국어),예시 (영어)
"""numeric""",있는 그대로 숫자,"2025년, 1일","2025, 1"
"""2-digit""",뒤 두 자리만,"25년, 01일","25, 01"
