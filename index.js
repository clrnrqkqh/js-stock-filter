// Import stylesheets
debugger;

/*
import "./style.css";

// FileSaver.js ->saveAs
import "./lib/FileSaver.js";
console.log(saveAs);

// hangul 라이브러리 로드
import "./lib/hangul.js";
// w3.js 라이브러리 로드
import "./lib/w3.js";
console.log(w3);

// JSON 데이터 호출하기
import "./public/jsondata.js";
*/

var treedata = JSONDATA.treedata; // treedata
var arr = JSONDATA.mastercode; // 주식마스터 데이터

let objJSON = {
  /* 옵션값
   option={
     nostringify : false, // true : 원본데이터, false: 데이터 필더(키이름이 pq_시작하는 모든이름)
     nopqdata : true,    // 콜백함수 사용
     nopretty : true    // true 이쁘게 정렬
  },
  data : 배열 데이터
  */
  getJsonContent: function (option, data) {
    function replacer(key, val) {
      if ((key + "").indexOf("pq_") === 0) {
        return undefined;
      }
      return val;
    }

    return option.nostringify
      ? data
      : JSON.stringify(
          data,
          option.nopqdata ? replacer : null,
          option.nopretty ? null : 2
        );
  },
};

// 데이터 저장 버튼 선택시 treedata를 json 파일로 저장하는 기능
// 참고 사이트
// https://github.com/eligrey/FileSaver.js
let saveBtn = document.getElementById("save");
saveBtn.addEventListener("click", function (evt) {
  console.log("변환전==>", JSON.stringify(treedata, null, 2));

  let opt = { nostringify: false, nopqdata: true, nopretty: false },
    text;
  text = objJSON.getJsonContent(opt, treedata);
  console.log("변환후==>", text);
  debugger;
  /*
  // Note: Ie and Edge don't support the new File constructor,
  // so it's better to construct blobs and use saveAs(blob, filename)
  var file = new File([text], "text.json", {
    type: "text/plain;charset=utf-8"
  });
  saveAs(file);
*/
  // Blob 형식으로 변환후, 해당유형으로 저장을 한다.
  var blob = new Blob([text], { type: "text/plain;charset=utf-8" });
  saveAs(blob, "text.json");
});

// JSON 데이터 호출하기
//import "./public/stock_ko.js";
// 주식종목 로드
//console.log(window.mastercode);
//var arr = window.mastercode;
/*
        var arr = [
            { name: "홍길동" },
            { name: "한국" },
            { name: "호가든" },
            { name: "프로그램목록" },
            { name: "프로세스" },
            { name: "공통" },
            { name: "아키텍쳐" },
            { name: "앙칼지다" },
            { name: "학사행정" },
            { name: "일반부속" },
            { name: "학습 및 취업" },
            { name: "테이블정의서" },
            { name: "테이저건" },
            { name: "정의서" },
            { name: "현행화" },
            { name: "졸업" },
            { name: "바인더" },
            { name: "대학본부" },
            { name: "에디터" },
            { name: "Visual Studio Code" },
            { name: "Edit Plus" },
            { name: "소나무" },
            { name: "민들레" },
            { name: "나뭇가지" },
            { name: "갑천" },
            { name: "한강" },
            { name: "금강" },
            { name: "도안동" },
            { name: "월평동" },
            { name: "대전광역시" },
            { name: "서울" },
            { name: "경기도" },
            { name: "성남시" },
            { name: "모니터" },
            { name: "이클립스" },
            { name: "탐색기" },
            { name: "엑셀" },
            { name: "크롬" },
            { name: "파이어폭스" },
            { name: "텔레그램" },
            { name: "팟플레이어" },
            { name: "마이크로소프트" },
            { name: "애플" },
            { name: "LG" },
            { name: "삼성" },
            { name: "오라클" },
            { name: "MySQL" },
            { name: "치약" },
            { name: "프린터" },
            { name: "레이저 프린터" },
            { name: "아반떼" },
            { name: "베라크루즈" },
            { name: "자동차공학과" },
            { name: "기아자동차" },
            { name: "현대자동차" },
            { name: "에어컨" }
        ];
      debugger;
        // object 에 초성필드 추가 {name:"홍길동", diassembled:"ㅎㄱㄷ"}
        arr.forEach(function (item) {
            let dis = Hangul.disassemble(item.name, true);
            let cho = dis.reduce(function (prev, elem) {
                elem = elem[0] ? elem[0] : elem;
                return prev + elem;
            }, "");
            item.diassembled = cho;  // 초성작성
        });
       console.log("arr==>",arr);
*/
//

var ul = document.getElementById("find");
// 키 입력시에 처리부분
document.getElementById("txt").addEventListener("keyup", function () {
  while (ul.firstChild) {
    ul.removeChild(ul.firstChild);
  }

  var search = this.value; // 입력값
  var search1 = Hangul.disassemble(search).join(""); // ㄺ=>ㄹㄱ
  // 대소문자 구별없이 검색
  search = search.toUpperCase();
  search1 = search1.toUpperCase();

  // 문자열 검색 || 초성검색
  let arList = arr.filter(function (item) {
    return (
      item.code.indexOf(search) == 0 || // 종목코드 검색
      item.name.toUpperCase().includes(search) || // 실제 데이터 검색
      item.csname.toUpperCase().includes(search1)
    ); // 초성분리에서 검색
  });
  console.log("arList==>", arList);

  // 검색결과 ul 아래에 li 로 추가
  arList.forEach(function (item) {
    var li = document.createElement("li");
    li.innerHTML = item.name + "--- <B>" + item.code;
    ul.appendChild(li);
  });
});
