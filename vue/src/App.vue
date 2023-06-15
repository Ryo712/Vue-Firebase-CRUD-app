<template>
  <div id="app">
    <div class="test">
      <router-view />
    </div>
  </div>
</template>

<style>
/* このアプリの指定フォント：Noto Sans JPをGoogleのサイトからインポートする。ここで設定すればPJT全体に適用できる */
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@300;400;700&display=swap');

#app {
    background: #ffffff;
    text-align: center;
}

* {
    font-family: "Noto Sans JP", "Hiragino Kaku Gothic ProN", "Meiryo", sans-serif;
    font-size: 16px;
    line-height: 1.7;
    color: #4a4a4a;
    margin: 0;
    padding: 0;
}

header {
    background: #efefef;
    width: auto;
}

footer {
    background: #efefef;
    width: 100%;
    position: absolute;
    bottom: -40px;
    height: 40px;
}

body {
    min-height: calc(100vh - 40px);
    position: relative;
    box-sizing: border-box;
}

/* //////////////////////////////////////////////////////////////////////////////// */
/* button関係 */
/* //////////////////////////////////////////////////////////////////////////////// */
button {
    border-radius: 10px;
    padding: 6px 20px 8px;
    width: auto;
    height: auto;
    cursor: pointer;
}
button:active {
    transform: translate(0,2px);
}
/* 通常のボタン */
.btn_standard {
    background: #fff176;
    border: 3px solid #fff176;
}
.btn_standard:hover {
    background: #ffcf00;
    border: 3px solid #ffcf00;
}

/* //////////////////////////////////////////////////////////////////////////////// */
/* input関係 */
/* //////////////////////////////////////////////////////////////////////////////// */
input {
    height: 40px;
    text-indent: 1em;
}


/* //////////////////////////////////////////////////////////////////////////////// */
/* その他 */
/* //////////////////////////////////////////////////////////////////////////////// */
/* 赤色の文字(エラーメッセージなど) */
.red {
    color: #f54337;
}
/* 青色の文字(ログインネームなど) */
.blue {
    color: #2296f3;
}

</style>
