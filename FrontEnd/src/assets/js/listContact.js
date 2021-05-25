var listLivestream = new Vue({
    el: '#list-contact-screen',
    data: {
        kho : [
            {
                id: 1,
                name: "Kho quần áo"
            },
            {
                id: 2,
                name: "Kho phụ kiện"
            },
            {
                id: 1,
                name: "Kho đồ gia dụng"
            },
            {
                id: 1,
                name: "Kho điện tử"
            }
        ],
    },
    methods: {
        init: function () {
            // this.getCap();
        },
        getCap: function () {
            var me = this;
            var paramUrl = window.location.pathname;
            var subString_v1 = paramUrl.split('/');
            var params = subString_v1[2];
            if (params.includes('tieu-hoc')) {
                me.cap = 'tieu-hoc';
            } else
            if (params.includes('thcs')) {
                me.cap = 'thcs';
            } else
            if (params.includes('thpt')) {
                me.cap = 'thpt';
            } else {
                var string_v2 = params.split('-lop-');
                if (parseInt(string_v2[1]) >= 1 && parseInt(string_v2[1]) <= 5) {
                    me.cap = 'tieu-hoc';
                }
                if (parseInt(string_v2[1]) >=6 && parseInt(string_v2[1]) <= 9) {
                    me.cap = 'thcs';
                }
                if (parseInt(string_v2[1]) >=10 && parseInt(string_v2[1]) <= 12) {
                    me.cap = 'thpt';
                }
                me.lop = string_v2[1];
                me.mon = string_v2[0];
                me.getDataType = 'bymonkhoi';
            }
        },
        updateData: function(i){
            this.pager['page'] = i;
            this.pager['start'] = (this.pager['page'] - 1) * this.pager['limit'];
            this.searchLivestream();
        },
        closeTab: function(type, id) {
            console.log('type', type);
            console.log('id', id);
        },
        getLessonsByLivestream: function(){
            var me = this;
            $.ajax({
                url: '/service/livestream/getListLessonByLivestreamId',
                methods: 'GET',
                dataType: 'json',
                data: {id: me.livestreamId},
                success: function (res) {
                    console.log('data', res);
                    me.listLessonByLivestream = res;
                },
                error: function(err) {
                    console.log(err)
                }
            })
        },
        getListMon:function(){
            var me = this;
            $.ajax({
                url: '/service/khoi/getListMonByKhoiCap',
                methods: 'GET',
                dataType: 'json',
                data: {khoi: me.lop, cap: me.cap},
                success: function (res) {
                    res.data.unshift({
                        id: 0,
                        title: 'Tất cả'
                    });
                    me.listMon = res.data;
                },
                error: function(err) {
                    console.log(err)
                }
            })
        }
    }
});
$(document).on('ready', function () {
    listLivestream.init();
});