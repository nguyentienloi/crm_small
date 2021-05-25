<template>
  <div class="content" id="list-contact-screen">
    <div class="row menu-list-contact">
      <div class="col-md-4">
        <form style="padding: 0px !important; height:65px;">
          <div class="input-group">
            <div class="form-outline">
              <input id="search-input" type="search" class="form-control" placeholder="Tìm kiếm theo SDT..." style="width:300px;" />
            </div>
            <button id="search-button" type="button" class="btn btn-primary">
              Tìm kiếm
            </button>
          </div>
        </form>
      </div>
    </div>
    <ul class="list-status-contact">
        <li style="background-color: rgb(64 224 208 / 53%);">Chưa thanh toán(3)</li>
        <li style="background-color:rgb(64 224 103 / 73%);">Đã thanh toán(124)</li>
        <li style="background-color:red;">Đã huỷ(9)</li>
    </ul>
    <div class="row table-contact-list">
       <table class="table table-header table-hover" style="margin-left: 10px; background: white; margin-top:22px; width:99% !important;">
            <thead>
            <tr>
                <th></th>
                <th>Mã đơn hàng</th>
                <th>Tên khách hàng</th>
                <th>Số điện thoại</th>
                <th>Địa chỉ</th>
                <th>Phương thức thanh toán</th>
                <th>Tổng tiền</th>
                <th></th>
            </tr>
            </thead>
            <tbody>
            <tr>
                <td style="background-color: rgb(64 224 208 / 53%);"></td>
                <td style="width:12%;">VH001</td>
                <td style="width:15%;">Tiến Lợi</td>
                <td style="width:12%;">0332155830</td>
                <td style="width:25%;">Nam Định</td>
                <td style="width:10%;"><span class="label label-success">BANK</span></td>
                <td style="width:15%;"><b>127.000</b></td>
                <td><a data-toggle="modal" data-target="#myModal">Chi tiết</a></td>
            </tr>
            <tr>
                <td style="background-color: rgb(64 224 208 / 53%);"></td>
                <td style="width:12%;">VH001</td>
                <td style="width:15%;">Tiến Lợi</td>
                <td style="width:12%;">0332155830</td>
                <td style="width:25%;">Nam Định</td>
                <td style="width:10%;"><span class="label label-default">COD</span></td>
                <td style="width:15%;"><b>127.000</b></td>
                <td><a data-toggle="modal" data-target="#myModal">Chi tiết</a></td>
            </tr>
            <tr>
                <td style="background-color: rgb(64 224 208 / 53%);"></td>
                <td style="width:12%;">VH001</td>
                <td style="width:15%;">Tiến Lợi</td>
                <td style="width:12%;">0332155830</td>
                <td style="width:25%;">Nam Định</td>
                <td style="width:10%;"><span class="label label-default">COD</span></td>
                <td style="width:15%;"><b>127.000</b></td>
                <td><a data-toggle="modal" data-target="#myModal">Chi tiết</a></td>
            </tr>
            <tr>
                <td style="background-color:red;"></td>
                <td style="width:12%;">VH001</td>
                <td style="width:15%;">Tiến Lợi</td>
                <td style="width:12%;">0332155830</td>
                <td style="width:25%;">Nam Định</td>
                <td style="width:10%;"><span class="label label-default">COD</span></td>
                <td style="width:15%;"><b>127.000</b></td>
                <td><a data-toggle="modal" data-target="#myModal">Chi tiết</a></td>
            </tr>
            <tr>
                <td style="background-color: rgb(64 224 208 / 53%);"></td>
                <td style="width:12%;">VH001</td>
                <td style="width:15%;">Tiến Lợi</td>
                <td style="width:12%;">0332155830</td>
                <td style="width:25%;">Nam Định</td>
                <td style="width:10%;"><span class="label label-success">BANK</span></td>
                <td style="width:15%;"><b>127.000</b></td>
                <td><a data-toggle="modal" data-target="#myModal">Chi tiết</a></td>
            </tr>
             <tr>
                <td style="background-color:rgb(64 224 103 / 73%);"></td>
                <td style="width:12%;">VH001</td>
                <td style="width:15%;">Tiến Lợi</td>
                <td style="width:12%;">0332155830</td>
                <td style="width:25%;">Nam Định</td>
                <td style="width:10%;"><span class="label label-default">COD</span></td>
                <td style="width:15%;"><b>127.000</b></td>
                <td><a data-toggle="modal" data-target="#myModal">Chi tiết</a></td>
            </tr>
            <tr>
                <td style="background-color:rgb(64 224 103 / 73%);"></td>
                <td style="width:12%;">VH001</td>
                <td style="width:15%;">Tiến Lợi</td>
                <td style="width:12%;">0332155830</td>
                <td style="width:25%;">Nam Định</td>
                <td style="width:10%;"><span class="label label-success">BANK</span></td>
                <td style="width:15%;"><b>127.000</b></td>
                <td><a data-toggle="modal" data-target="#myModal">Chi tiết</a></td>
            </tr>
            <tr>
                <td style="background-color:rgb(64 224 103 / 73%);"></td>
                <td style="width:12%;">VH001</td>
                <td style="width:15%;">Tiến Lợi</td>
                <td style="width:12%;">0332155830</td>
                <td style="width:25%;">Nam Định</td>
                <td style="width:10%;"><span class="label label-success">BANK</span></td>
                <td style="width:15%;"><b>127.000</b></td>
                <td><a data-toggle="modal" data-target="#myModal">Chi tiết</a></td>
            </tr>
            <tr>
                <td style="background-color: rgb(64 224 208 / 53%);"></td>
                <td style="width:12%;">VH001</td>
                <td style="width:15%;">Tiến Lợi</td>
                <td style="width:12%;">0332155830</td>
                <td style="width:25%;">Nam Định</td>
                <td style="width:10%;"><span class="label label-success">BANK</span></td>
                <td style="width:15%;"><b>127.000</b></td>
                <td><a data-toggle="modal" data-target="#myModal">Chi tiết</a></td>
            </tr>
            </tbody>
        </table>
        <nav aria-label="Page navigation example" style="text-align: center;">
            <ul class="pagination">
                <li class="page-item">
                <a class="page-link" href="#" aria-label="Previous">
                    <span aria-hidden="true">&laquo;</span>
                    <span class="sr-only">Previous</span>
                </a>
                </li>
                <li class="page-item"><a class="page-link" href="#">1</a></li>
                <li class="page-item"><a class="page-link" href="#">2</a></li>
                <li class="page-item"><a class="page-link" href="#">3</a></li>
                <li class="page-item">
                <a class="page-link" href="#" aria-label="Next">
                    <span aria-hidden="true">&raquo;</span>
                    <span class="sr-only">Next</span>
                </a>
                </li>
            </ul>
        </nav>
    </div>
      <!-- Modal -->
  <div class="modal fade" id="myModal" role="dialog">
    <div class="modal-dialog">
    
      <!-- Modal content-->
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal">&times;</button>
          <h3 class="modal-title">Chi tiết đơn hàng</h3>
        </div>
        <div class="modal-body">
            <p><b>VH001 - 0332155830</b></p>
            <p><b>Họ tên:</b> Nguyễn Tiến Lợi</p>
            <p><b>Số điện thoại:</b> 0332155830</p>
            <p><b>Địa chỉ:</b> Giao Nhân, Giao Thuỷ, Nam Định</p>
            <p><b>Số lượng đặt:</b> 2</p>
            <p><b>Ghi chú:</b> xxx</p>
            <p><b>Trạng thái:</b> xxx</p>
            <p><b>Tổng tiền: 127.000</b> VND</p>
            <button class="btn btn-danger">Lưu</button>&nbsp;
        </div>
        <div class="modal-footer">
        </div>
      </div>
      
    </div>
  </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
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
        filter: {
            khoId: "",
            phone: ""
        },
        defaultKho: {
            id: "",
            name: ""
        },
    };
  },
  methods: {
    getListContact: function() {
        //       getListLivestream() {
        //     let me = this;
        //     $.ajax({
        //         url: '/service/livestream/getListLivestream',
        //         methods: 'POST',
        //         dataType: 'json',
        //         data: { cap: me.cap, mon: me.mon, lop:me.lop, type: me.getDataType},
        //         success: function (res) {
        //             if (res.success) {
        //                 me.listLivestreamIsLiving = res.data['isLiving'];
        //                 me.listLivestreamWillLiving = res.data['willLive'];
        //                 me.listLivestreamsLived = res.data['lived'];
        //                 me.hotLiveStream = res.data['hotLivestream'];
        //                 me.relatedLivestream = res.data['relatedLivestream'];
        //                 me.$nextTick(function () {
        //                     $(".owl-carousel").owlCarousel({
        //                         loop: false,
        //                         rewind: true,
        //                         margin: 20,
        //                         responsiveClass: true,
        //                         autoplay: false,
        //                         responsive: {
        //                             0: {
        //                                 items: 1,
        //                                 nav: true,
        //                                 navText: ["<i class='owlNavBtn pull-left fas fa-chevron-left'></i>", "<i class='owlNavBtn pull-left fas fa-chevron-right'></i>"]
        //                             },
        //                             993: {
        //                                 items: 2,
        //                                 nav: true,
        //                                 navText: ["<i class='owlNavBtn pull-left fas fa-chevron-left'></i>", "<i class='owlNavBtn pull-left fas fa-chevron-right'></i>"]
        //                             },
        //                             1300: {
        //                                 items: 4,
        //                                 nav: true,
        //                                 navText: ["<i class='owlNavBtn pull-left fas fa-chevron-left'></i>", "<i class='owlNavBtn pull-left fas fa-chevron-right'></i>"]
        //                             }
        //                         }
        //                     });
        //                 });
        //             } else {
        //                 App.showMessageWarning(res.msg);
        //             }
        //         },
        //         error: function(err) {
        //             console.log(err)
        //         }
        //     })
        // },
        // getLivestreamById() {
        //     let me = this;
        //     $.ajax({
        //         url: '/service/livestream/getLivestreamById',
        //         methods: 'GET',
        //         dataType: 'json',
        //         data: {
        //             id: me.livestreamId
        //         },
        //         success: function (res) {
        //             if (res.success) {
        //                 me.selectedLivestream = res.data;
        //             } else {
        //                 App.showMessageWarning(res.msg);
        //             }
        //         },
        //         error: function(err) {
        //             console.log(err)
        //         }
        //     })
        // }
    }
  }, 
  computed: {
    
  }
};
</script>
<style>
.list-status-contact li {
    list-style: none;
    float: left;
    padding: 3px;
    padding-left: 10px;
    padding-right: 10px;
    border-radius: 1px;
}
</style>