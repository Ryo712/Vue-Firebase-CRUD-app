<template>
    <body>
        <header>
            <div class="title">Vue Firebase Example</div>
        </header>

        <main>
            <div class="container">
                <p>ID(メールアドレス)</p>
                <input type="email" v-model="inputValueId">
                <!-- この下の<p></p>はテキストボックスを中央に配置するために必要な疑似要素です -->
                <p></p>
            </div>

            <div class="container">
                <p>パスワード</p>
                <input type="password" v-model="inputValuePassword">
                <!-- この下の<p></p>はテキストボックスを中央に配置するために必要な疑似要素です -->
                <p></p>
            </div>

            <div class="message">
                <p class="red">{{ errorMessage }}&nbsp;</p>
            </div>

            <div>
                <button class="btn_standard" type="submit" v-on:click="logIn">ログインする</button>
            </div>
            <!-- ローディングアニメーション -->
            <div class="loading_animation_container">
                <div class="loading_animation" v-if="this.isLoading">
                    <LoadingAnimationComponent></LoadingAnimationComponent>
                </div>
            </div>

            <div class="login_info_container">
                <div class="login_info">
                    <p>LoginIDとパスワードは以下の通りです</p>
                    <br>
                    <p>ID: ryooshiro712@gmail.com</p>
                    <p>Pass: hil712</p>
                    <br>
                    <p>ID: okinawa777@gmail.com</p>
                    <p>Pass: oki712</p>
                </div>
            </div>

        </main>

        <FooterComponent></FooterComponent>
    </body>
</template>

<script>
import FooterComponent from '../components/FooterComponent.vue'
import LoadingAnimationComponent from '../components/LoadingAnimationComponent.vue'

// Firebase関連のインポート
import { signInWithEmailAndPassword } from "firebase/auth";
import Firebase from "../firebase_settings/index.js"
const auth = Firebase.auth

export default {

    components: {
        FooterComponent,
        LoadingAnimationComponent,
    },

    methods: {
    // Home画面へ遷移
    goToHome() {
        this.$router.push('/')
    },

    // ログイン
    logIn() {
        // IDとパスワードの未入力チェック
        if(this.inputValueId === undefined || this.inputValueId === "" || this.inputValuePassword === undefined || this.inputValuePassword === "") {
            this.errorMessage = 'IDまたはパスワードが未入力です'
            return
        }

        // エラーメッセージの消去
        this.errorMessage = ""

        // ローディングアニメーション
        this.isLoading = true

        // id,passを取得
        const mId = this.inputValueId
        const mPass = this.inputValuePassword

        // 連続クリックを防ぐためにパスワード欄を空欄にする
        this.inputValuePassword = ""

        // サインインメソッド
        signInWithEmailAndPassword(auth, mId, mPass)
            // サインイン成功時
            .then((userCredential) => {
                const user = userCredential.user;
                console.log("ログイン成功 "+user.email)
                this.goToHome()
            })

            // サインイン失敗時
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log('ログインエラー: errorCode -> '+errorCode+', errorMessage -> '+errorMessage)
                this.JudgeErrorCode(errorCode)

                // ローディングアニメーション
                this.isLoading = false
            });
    },

    // FirebaseAuthから受け取ったエラーコードを判定しエラーメッセージを表示する
    JudgeErrorCode(mError) {
        const errorCode = String(mError)
        if(errorCode === 'auth/wrong-password' || errorCode === 'auth/invalid-email' || errorCode === 'auth/user-not-found') {
            this.errorMessage = "ログインに失敗しました。IDまたはパスワードが間違っています"
        } else {
            this.errorMessage = "ログインに失敗しました。予期せぬエラーが発生しました。"
        }
    },

    },

    data() {
        return {
            // ローディングアニメーション
            isLoading: false,

            // エラーメッセージ
            errorMessage: '',

            // 入力欄
            inputValueId: "",
            inputValuePassword: "",
        }
    },

    computed: {

    },


}
</script>

<style scoped>
header {
    height: 120px;
}

header .title {
    font-size: 40px;
    padding: 20px 0 0;
}

main {
    padding: 30px auto;
}
.container {
    display: flex;
    justify-content: center;
    margin: 30px 0 0;
}
.container input {
    width: 400px;
}

.container p {
    width: 200px;
    text-align: left;
    margin-top: 8px;
}
.login_info_container {
    display: flex;
    justify-content: center;
    margin-top: 10px;
}
.login_info {
    text-align: left;
    background-color: #efefef;
    padding: 20px 100px;
    border-radius: 20px;
}

.loading_animation_container {
    height: 15px;
    margin-top: 10px;
}

</style>