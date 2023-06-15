<template>
    <body>
        <HeaderComponent></HeaderComponent>

        <main>
            <!-- <p class="contents">ここがFoodです</p> -->
            <div class="all_container">
                <div class="row_container">
                    <div class="container_left">
                        <p>好きな食べ物</p>
                    </div>
                    <div class="container_right">
                        <p>{{ food }}&nbsp;</p>
                        <p>{{ timestamp }}&nbsp;</p>
                    </div>
                </div>

                <div class="row_container">
                    <div class="container_left">
                    </div>
                    <div class="container_right">
                        <input type="text" v-model="inputFood">
                    </div>
                </div>

                <div class="row_container">
                    <div class="container_left">
                    </div>
                    <div class="container_right">
                        <button class="btn_standard" v-on:click="registerFood">好きな食べ物を登録</button>
                        <p class="red">{{ errorMessage }}&nbsp;</p>
                        <!-- ローディングアニメーション -->
                        <div class="loading_animation" v-if="this.isLoading">
                            <LoadingAnimationComponent></LoadingAnimationComponent>
                        </div>
                    </div>
                </div>
            </div>
        </main>

        <FooterComponent></FooterComponent>
    </body>
</template>

<script>
import HeaderComponent from '../components/HeaderComponent.vue'
import FooterComponent from '../components/FooterComponent.vue'
import LoadingAnimationComponent from '../components/LoadingAnimationComponent.vue'

// Firebase関連のインポート
import Firebase from "../firebase_settings/index.js"
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore"
import { onAuthStateChanged } from "firebase/auth";
const auth = Firebase.auth
const db = Firebase.db

export default {

    components: {
        HeaderComponent,
        FooterComponent,
        LoadingAnimationComponent,
    },

    data() {
        return {
            errorMessage: "",
            isLoading: false,
            food: "",
            uid: "",
            inputFood: "",
            timestamp: "",
        }
    },

    methods: {
        // DBから好きな食べ物のデータを取得する
        async getFavoriteFood() {
            // 変数を初期化
            this.food = ""

            // DBからデータ取得
            try {
                const docRef = doc(db, "userData", this.uid)
                const docSnap = await getDoc(docRef)
                if (!docSnap.exists()) {
                    this.food = "データ未登録"
                    this.timeStamp = ""
                    return
                }
                this.food = docSnap.get('food')
                this.timestamp = "更新日時: "+docSnap.get('timestamp').toDate().toLocaleString()
            } catch(error) {
                this.food = "データ取得に失敗しました"
                console.log(error)
            }
        },

        // DBへ好きな食べ物を登録する
        async registerFood() {
            // データ書き込み処理ステータスをチェック
            if(this.isLoading) { return }

            // inputの入力値チェック
            const mFood = this.inputFood.trim()
            if(mFood==="") {
                this.errorMessage = "好きな食べ物が入力されていません"
                return
            }

            // エラーメッセージ消去
            this.errorMessage = ""

            const result = confirm('好きな食べ物を登録しますか？')
            if(!result) { return }

            // 書き込み開始
            this.isLoading = true
            const docRef = doc(db, "userData", this.uid)
            try {
                await setDoc(docRef, {
                    food: mFood,
                    timestamp: serverTimestamp(),
                },
                { merge: true })
            } catch(error) {
                console.log(error)
                alert("エラーが発生しました")
            }

            // データ再取得
            this.getFavoriteFood()

            // 書き込み終了
            this.isLoading = false
        }
    },

    mounted() {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                // User is signed in, see docs for a list of available properties
                // https://firebase.google.com/docs/reference/js/firebase.User
                this.uid = user.uid;
                this.getFavoriteFood()
            } else {
                // User is signed out
                this.uid = ""
            }
        });
    },

}


</script>

<style scoped>

/* ///////////////////////////////////////// */
/* コンテンツ関連 */
/* ///////////////////////////////////////// */

.all_container {
    margin: 50px 0 0 0;
}
.row_container {
    display: flex;
    justify-content: center;
    margin-bottom: 20px;
}
.container_left {
    width: 200px;
}
.container_right {
    width: 400px;
}
input {
    width: 300px;
}
.loading_animation {
    justify-content: left;
}

</style>