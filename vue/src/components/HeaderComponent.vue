<template>
    <div class="header_container">
        <div class="header_logo">
            <div class="img_container">
                <img src="../assets/logo.png" alt="logo">
            </div>
            <p>Vue Firebase Example</p>
        </div>
        <div>
            <div class="login_name blue">&nbsp;{{ login_name }}</div>
            <div class="header_menu">
                <div class="menu_item" v-on:click="goToHome">Home</div>
                <div class="menu_item" v-on:click="goToFood">Food</div>
                <div class="menu_item" v-on:click="confirmLogout">Logout</div>
            </div>
        </div>
    </div>
</template>

<script>
// Firebase関連のインポート
import { signOut, onAuthStateChanged } from "firebase/auth";
import Firebase from "../firebase_settings/index.js"
const auth = Firebase.auth

export default {

    components: {

    },

    data() {
        return {
            // ログイン中のアカウントのemail
            login_name: "",
        }
    },

    methods: {

        // ログアウトの確認ダイアログ
        confirmLogout() {
            const result = confirm('ログアウトしますか？')
            if(!result) { return }
            this.logOut()
        },

        // ログアウト処理
        logOut() {
            // ユーザー情報とイベント内容をログに記録
            signOut(auth).then(() => {
                // Sign-out successful.
                this.$router.push('/login')
                console.log("ログアウト成功")
                alert('ログアウトしました')
            }).catch((error) => {
                // An error happened.
                console.log('ログアウトエラー: error ->'+error)
                alert('ログアウト処理でエラーが発生しました')
            });
        },

        // ログインアカウントのemailを表示する
        showLoginEmail() {
            onAuthStateChanged(auth, (user) => {
                if (user) {
                    // User is signed in, see docs for a list of available properties
                    // https://firebase.google.com/docs/reference/js/firebase.User
                    const email = user.email;
                    this.login_name = 'ログイン中: '+email+' さん'
                } else {
                    // User is signed out
                    this.login_name = '未ログイン: ゲストユーザーさん'
                }
            });
        },

        // Homeへ画面遷移
        goToHome() {
            const nowRoute = this.$route.path
            if(nowRoute != '/') {
                this.$router.push('/')
            } else {
                window.location.reload()
            }
        },

        // Foodへ画面遷移
        goToFood() {
            const nowRoute = this.$route.path
            if(nowRoute != '/food') {
                this.$router.push('/food')
            } else {
                window.location.reload()
            }
        },
    },

    mounted() {
        // mounted時(=ページ読み込み時)に下記のメソッド実行する
        this.showLoginEmail()
    },
}

</script>

<style scoped>
/* ///////////////////////////////////////// */
/* ヘッダー関連 */
/* ///////////////////////////////////////// */
.header_container {
    display: flex;
    justify-content: space-between;
    padding: 7px 25px 15px 25px;
    height: 60px;
    width: auto;
    background: #efefef;
}
.header_logo {
    display: flex;
    width: fit-content;
}
.header_logo p {
    font-size: 35px;
    padding: 0 0 0 10px;
}
.img_container {
    width: 100px;
}
img {
    width: 100%;
    height: 100%;
    object-fit: contain;
}

.login_name {
    text-align: right;
}
.header_menu {
    display: flex;
    justify-content: right;
    padding: 2px 0 5px 0;
    margin: 0 0 0 10px;
}
.menu_item {
    width: max-content;
    margin-left: 30px;
}
.menu_item:hover {
    cursor: pointer;
    color: #2296f3;
    border-bottom: solid 3px #2296f3;
}

</style>