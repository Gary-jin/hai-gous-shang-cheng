import baseUrl from '@/js/const'
const seathMeuths = {
    methods: {
        async goodsListFn() {
            if (this.upLoading) {
                //上拉加载
                ++this.page;
            } else {
                this.page = 1; //刷新
            }

            const { code, msg, data } = await this.http(baseUrl.searchGoods, {
                page: this.page,
                type: this.type, //api.pageParam.type,
                keywords: this.keywords,
                order: this.order,
                sort: this.sort,
                sub_cate_id: this.sub_cate_id,
                cate_id: this.cate_id
            });

            if (0 == code) {
                this.loadUtils(data.list, "goodList");
                // }else{
                // this.downLoading = false;
            }
        },
        objstatus(obj) {
            this.order = obj.order;
            this.sort = obj.sort;
            this.goodsListFn();
            // alert(JSON.stringify(obj));
        },

    }
}
export default seathMeuths