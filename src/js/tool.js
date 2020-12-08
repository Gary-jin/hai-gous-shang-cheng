export default {
    methods: {
        //再按一次返回键退出程序
        dbClickkExit: function () {
            var that = this;
            if (!that.isExit) {
                that.isExit = true;
                this.$ac.toast({
                    msg: "再按一次返回键退出程序",
                    duration: 2000,
                    location: "bottom",
                });
                setTimeout(function () {
                    that.isExit = false;
                }, 2000);
            } else if (that.isExit) {
                this.$ac.closeWidget({
                    silent: true,
                });
            }
        },

    }
}