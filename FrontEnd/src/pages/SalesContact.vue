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
                        <input class="form-control endDate" type="date" v-bind:value="dateNow" id="example-date-input">
                    </div>
                    <div class="col-md-2">
                        <button type="submit" class="btn btn-success" v-on:click="getSalesContact()">Tìm kiếm</button>
                    </div>
                </div>
            </form>
            <div class="row" v-if="Object.keys(data).length > 0">
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
            <div class="row">
               <pie-chart :data="chartData" :options="chartOptions" style="width: 500px;height: 500px;margin: 30px auto;"></pie-chart>
               <h3 style="text-align: center;"><b>Biểu đồ báo cáo contact tổng các kho</b></h3>
            </div>
            <div class="row">
                <h2 style="margin-left: 16px;">Kho A</h2>
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
            <div class="row">
                <h2 style="margin-left: 16px;">Kho B</h2>
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
          </md-card-content>
        </md-card>
      </div>
    </div>
  </div>
</template>

<script>
import PieChart from "./PieChart.js";
export default {
    components: {
        PieChart
    },
    props: {
        dataBackgroundColor: {
            type: String,
            default: ""
        }
    },
    data: function() {
        return {
            dateNow: '',
            startDate: '',
            endDate: '',
            data:[
                // {
                //     "moi": 172
                // },
                // {
                //     "da_goi": 125
                // },
                // {
                //     "da_huy": 35
                // },
                // {
                //     "cho_goi_lai": 12
                // },
                // {
                //     "da_tao_don": 235
                // }
            ],
            chartOptions: {
                hoverBorderWidth: 20
            },
            chartData: {
                hoverBackgroundColor: "red",
                hoverBorderWidth: 10,
                labels: ["Đã gọi", "Đã huỷ", "Chờ gọi lại"],
                datasets: [
                    {
                        label: "Data One",
                        backgroundColor: ["#41B883", "#E46651", "#d3f70bdb"],
                        data: []
                    }
                ]
            }
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
                url: 'http://localhost:3000/api/contactStatus/countConcatByStatus?startDate=' + startDate + '&endDate=' + endDate,
                methods: 'GET',
                dataType: 'json',
                data: {},
                success: function (res) {
                    me.data = res;
                    // me.chartData.datasets[0].data = [];
                    me.chartData.datasets[0].data.push(res['da_goi']);
                    me.chartData.datasets[0].data.push(res['da_huy']);
                    me.chartData.datasets[0].data.push(res['cho_goi_lai']);
                },
                error: function(err) {
                    console.log(err)
                }
            })
        }
    },
    created: function(){
        var me = this;
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0');
        var yyyy = today.getFullYear();
        today = yyyy + '-' + mm + '-' + dd;
        me.dateNow = today;
        me.getSalesContact();
        me.chartData.datasets[0].data = [135,12,4];
    }
};
</script>