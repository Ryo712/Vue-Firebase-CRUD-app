<template>
    <body>
        <HeaderComponent></HeaderComponent>

        <main>
            <p class="contents">ここがHomeです</p>
        </main>

        <FooterComponent></FooterComponent>
    </body>
</template>

<script>
import HeaderComponent from '../components/HeaderComponent.vue'
import FooterComponent from '../components/FooterComponent.vue'

export default {

    components: {
        HeaderComponent,
        FooterComponent,
    },

    data() {
        return {

        }
    },

    methods: {

    },

    mounted() {

    },

}


</script>

<style scoped>

/* ///////////////////////////////////////// */
/* コンテンツ関連 */
/* ///////////////////////////////////////// */

.contents {
    font-size: 30px;
    margin: 50px 0 0 0;
}

</style>
