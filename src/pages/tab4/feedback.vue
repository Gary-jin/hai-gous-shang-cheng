<template>
  <div class="flex_colT flex_items_stretch W_100vw H_100vh">
    <via-header
      @click-left="closeWin()"
      :center="{ text: '意见反馈' }"
      :right="{ text: '记录' }"
      @click-right="openWin('tab4-replyhisoy')"
      class="color_fff bg_FF0040 flex_shrink_0"
    ></via-header>
    <div class="overflow_y H_100 P_3">
      <textarea
        class="bg_f2f2f2 B_1_eee D_block H_50vw W_100 P_3 B_radius_10"
        placeholder="请在此处写下你的意见和反馈"
        name=""
        id=""
        v-model="content"
      ></textarea>
      <div
        class="bg_FF0040 P_2 color_fff MT_10 textC B_radius_5"
        @click="addOpinion"
      >
        提交
      </div>
    </div>
  </div>
</template> <script>
import viaHeader from "@/components/header.vue";
import baseUrl from "@/js/const";
export default {
  components: { viaHeader },
  name: "feedback",
  data() {
    return {
      content: "",
    };
  },
  created() {},
  mounted() {},
  methods: {
    async addOpinion() {
      const { code, msg, data } = await this.http(baseUrl.addOpinion, {
        content: this.content,
      });
      this.toast(msg);
      if (0 == code) {
        this.content = "";
      }
    },
  },
};
</script> <style  scoped>
</style>
