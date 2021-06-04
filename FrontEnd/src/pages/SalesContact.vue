<template>
  <div class="content">
    <div class="md-layout">
      <div class="md-layout-item">
        <md-card>
          <md-card-header data-background-color="green">
            <h1 class="title">Báo cáo contact</h1>
          </md-card-header>
          <md-card-content>
            <form class="form-inline">
                <div class="row">
                    <div class="col-md-2">
                        <label for="example-date-input" class="col-3 col-form-label" style="float: right; margin-top: 25px;">Ngày bắt đầu:</label>
                    </div>
                    <div class="col-md-3">
                        <input class="form-control startDate" type="date" v-bind:value="dateNow" id="example-date-input">
                    </div>
                    <div class="col-md-2">
                        <label for="example-date-input" class="col-3 col-form-label" style="float: right; margin-top: 25px;">Ngày kết thúc:</label>
                    </div>
                    <div class="col-md-3">
                        <input class="form-control endDate" type="date" v-bind:value="dateNows" id="example-date-input">
                    </div>
                    <div class="col-md-2">
                        <button type="submit" class="btn btn-success" v-on:click="search()">Tìm kiếm</button>
                    </div>
                </div>
            </form>
            <div class="row" v-if="Object.keys(data).length > 0">
                <h2 style="color: black; margin-left: 15px;">Tổng contact các kho</h2>
                <div class="col-md-3" style="padding: 10px; border: 1px solid black; border-radius: 12px; width: 23%; margin-left: 12px;">
                    <h2>
                        Tổng:
                    </h2>
                    <p style="font-size: 18px;"><b>{{data['moi']}}</b> <span>contact</span></p>
                </div>
                <div class="col-md-3" style="padding: 10px; border: 1px solid black; border-radius: 12px; width: 23%; margin-left: 12px;">
                    <h2>
                        Đã gọi:
                    </h2>
                    <p style="font-size: 18px;"><b>{{data['da_goi']}}</b> <span>contact</span></p>
                </div>
                <div class="col-md-3" style="padding: 10px; border: 1px solid black; border-radius: 12px; width: 23%; margin-left: 12px;">
                    <h2>
                        Chờ gọi lại:
                    </h2>
                    <p style="font-size: 18px;"><b>{{data['cho_goi_lai']}}</b> <span>contact</span></p>
                </div>
                <div class="col-md-3" style="padding: 10px; border: 1px solid black; border-radius: 12px; width: 23%; margin-left: 12px;">
                    <h2>
                        Đã huỷ:
                    </h2>
                    <p style="font-size: 18px;"><b>{{data['da_huy']}}</b> <span>contact</span></p>
                </div>
            </div>
            <div class="row" v-if="Object.keys(data1).length > 0">
                <h2 style="color: black; margin-left: 15px;">Kho A</h2>
                <div class="col-md-3" style="padding: 10px; border: 1px solid black; border-radius: 12px; width: 23%; margin-left: 12px;">
                    <h2>
                        Tổng:
                    </h2>
                    <p style="font-size: 18px;"><b>{{data1['moi']}}</b> <span>contact</span></p>
                </div>
                <div class="col-md-3" style="padding: 10px; border: 1px solid black; border-radius: 12px; width: 23%; margin-left: 12px;">
                    <h2>
                        Đã gọi:
                    </h2>
                    <p style="font-size: 18px;"><b>{{data1['da_goi']}}</b> <span>contact</span></p>
                </div>
                <div class="col-md-3" style="padding: 10px; border: 1px solid black; border-radius: 12px; width: 23%; margin-left: 12px;">
                    <h2>
                        Chờ gọi lại:
                    </h2>
                    <p style="font-size: 18px;"><b>{{data1['cho_goi_lai']}}</b> <span>contact</span></p>
                </div>
                <div class="col-md-3" style="padding: 10px; border: 1px solid black; border-radius: 12px; width: 23%; margin-left: 12px;">
                    <h2>
                        Đã huỷ:
                    </h2>
                    <p style="font-size: 18px;"><b>{{data1['da_huy']}}</b> <span>contact</span></p>
                </div>
            </div>
            <div class="row" v-if="Object.keys(data2).length > 0">
                <h2 style="color: black; margin-left: 15px;">Kho B</h2>
                <div class="col-md-3" style="padding: 10px; border: 1px solid black; border-radius: 12px; width: 23%; margin-left: 12px;">
                    <h2>
                        Tổng:
                    </h2>
                    <p style="font-size: 18px;"><b>{{data2['moi']}}</b> <span>contact</span></p>
                </div>
                <div class="col-md-3" style="padding: 10px; border: 1px solid black; border-radius: 12px; width: 23%; margin-left: 12px;">
                    <h2>
                        Đã gọi:
                    </h2>
                    <p style="font-size: 18px;"><b>{{data2['da_goi']}}</b> <span>contact</span></p>
                </div>
                <div class="col-md-3" style="padding: 10px; border: 1px solid black; border-radius: 12px; width: 23%; margin-left: 12px;">
                    <h2>
                        Chờ gọi lại:
                    </h2>
                    <p style="font-size: 18px;"><b>{{data2['cho_goi_lai']}}</b> <span>contact</span></p>
                </div>
                <div class="col-md-3" style="padding: 10px; border: 1px solid black; border-radius: 12px; width: 23%; margin-left: 12px;">
                    <h2>
                        Đã huỷ:
                    </h2>
                    <p style="font-size: 18px;"><b>{{data2['da_huy']}}</b> <span>contact</span></p>
                </div>
            </div>
          </md-card-content>
        </md-card>
      </div>
    </div>
  </div>
</template>

<script>
export default {
    props: {
        dataBackgroundColor: {
            type: String,
            default: ""
        }
    },
    data: function() {
        return {
            dateNow: '',
            dateNows:'',
            startDate: '',
            endDate: '',
            data:[],
            data1:[],
            data2:[],
        }
    },
    methods: {
        getSalesContact: function() {
            var me = this;
            const startDate = $('.startDate').val();
            const endDate = $('.endDate').val();
            me.startDate = startDate;
            me.endDate = endDate;
            $.ajax({
                url: 'http://localhost:3000/api/contactStatus/countConcatByStatus?startDate=' + startDate + '&endDate=' + endDate + '&khoId=0',
                methods: 'GET',
                dataType: 'json',
                data: {},
                success: function (res) {
                    me.data = res;
                },
                error: function(err) {
                    console.log(err)
                }
            })
        },
        getSalesContactA: function() {
            var me = this;
            const startDate = $('.startDate').val();
            const endDate = $('.endDate').val();
            me.startDate = startDate;
            me.endDate = endDate;
            $.ajax({
                url: 'http://localhost:3000/api/contactStatus/countConcatByStatus?startDate=' + startDate + '&endDate=' + endDate + '&khoId=1',
                methods: 'GET',
                dataType: 'json',
                data: {},
                success: function (res) {
                    me.data1 = res;
                },
                error: function(err) {
                    console.log(err)
                }
            })
        },
        getSalesContactB: function() {
            var me = this;
            const startDate = $('.startDate').val();
            const endDate = $('.endDate').val();
            me.startDate = startDate;
            me.endDate = endDate;
            $.ajax({
                url: 'http://localhost:3000/api/contactStatus/countConcatByStatus?startDate=' + startDate + '&endDate=' + endDate + '&khoId=2',
                methods: 'GET',
                dataType: 'json',
                data: {},
                success: function (res) {
                    me.data2 = res;
                },
                error: function(err) {
                    console.log(err)
                }
            })
        },
        search: function() {
            var me = this;
            me.getSalesContact();
            me.getSalesContactA();
            me.getSalesContactB();
        }
    },
    created: function(){
        const token = localStorage.getItem('token_user');
        if (token) {
            var me = this;
            var today = new Date();
            var lastMonth = today.getMonth();
            if (lastMonth.toString().length == 1) {
                lastMonth = '0' + lastMonth.toString();
            }
            var dd = String(today.getDate()).padStart(2, '0');
            var mm = String(today.getMonth() + 1).padStart(2, '0');
            var yyyy = today.getFullYear();
            today = yyyy + '-' + mm + '-' + dd;
            var lastDay = yyyy + '-' + lastMonth + '-01';
            me.dateNow = lastDay;
            me.dateNows = today;
            me.getSalesContact();
            me.getSalesContactA();
            me.getSalesContactB();
        } else {
            this.$router.push({ name: 'login' });
        }
    }
};
</script>