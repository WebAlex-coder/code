Vue.component ('catalog', {
    data () {
        return {
            catalogUrl: 'catalog',
            imgCatalog: 'https://placehold.it/200x150',
            filterUrl: 'filter',
            items: []
        }
    },
    methods: {
        filterProduct(reg) {
            if (reg) {
                reg = {"reg": reg};
                console.log(reg);
                this.$parent.getJsonPost(this.filterUrl, reg)
                .then(data => {
                    console.log(data);
                    if (data.result !== 1) {
                        return Promise.reject(new Error("Не удалось добавить товар в корзину"))
                    } else {
                        this.items = data.filter;
                    }
                })
                .catch( error => console.log("error", error));
            }
            else {
                this.$parent.getJson (this.catalogUrl)
                    .then (data => this.items = data);
            }
        }
    },
    mounted () {
        this.$parent.getJson (this.catalogUrl)
            .then (data => this.items = data);
    },
    template: `
            <div class="products">
                <catalog-item v-for="product of items" :item="product" :imgProp="imgCatalog"></catalog-item>
            </div>
    `
})