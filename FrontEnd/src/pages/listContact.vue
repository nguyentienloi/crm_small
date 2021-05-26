<template>
  <div class="content" id="list-contact-screen" v-cloak>
    <div class="row menu-list-contact">
      <div class="col-md-4">
        <form style="padding: 0px !important; height:65px;">
          <div class="input-group">
            <div class="form-outline">
              <input id="search-input" type="search" class="form-control" placeholder="Tìm kiếm theo SDT..." style="width:300px;" />
            </div>
            <button id="search-button" type="button" class="btn btn-primary" v-on:click="filterContact()">
              Tìm kiếm
            </button>
          </div>
        </form>
      </div>
      <div class="dropdown col-md-4">
        <button class="btn btn-primary dropdown-toggle" type="button" data-toggle="dropdown">{{ kho[0].name }}
        <span class="caret"></span></button>
        <ul class="dropdown-menu">
          <li v-for="(item, index) in kho" :key="index" v-bind:value="item.id"><a>{{ item.name }}</a></li>
        </ul>
      </div>
    </div>
    <ul class="list-status-contact">
        <li v-for="(status, index) in listContactStatus" :key="index" v-bind:value="status.id" v-bind:style="{backgroundColor:status.color}" v-on:click="filterContactByStatus(status.id)">{{ status.name + ' (' + status.count + ')' }}</li>
    </ul>
    <div class="row table-contact-list">
       <table class="table table-header table-hover" style="margin-left: 10px; background: white; margin-top:22px; width:99% !important;">
            <thead>
            <tr>
                <th></th>
                <th>Mã khách hàng</th>
                <th>Tên khách hàng</th>
                <th>Số điện thoại</th>
                <th>Địa chỉ</th>
                <th></th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(contact, index) in listContact" :key="index">
                <td v-bind:style="{backgroundColor:contact.colorStatus}"></td>
                <td style="width:12%;">MS{{ contact.id }}</td>
                <td style="width:25%;">{{ contact.contactName }}</td>
                <td style="width:12%;">{{ contact.contactPhone }}</td>
                <td style="width:38%;">{{ contact.address }}</td>
                <td><a data-toggle="modal" v-on:click="getContactById(contact.id)">Chi tiết</a></td>
            </tr>
            <p v-if="listContact.length == 0" class="text-center">Không tìm thấy dữ liệu.</p>
            </tbody>
        </table>
        <nav aria-label="Page navigation example" style="text-align: center;">
            <ul class="pagination">
                <li class="page-item">
                <a class="page-link" v-on:click="getContactByPagination('pre')" aria-label="Previous">
                    <span aria-hidden="true">&laquo;</span>
                    <span class="sr-only">Previous</span>
                </a>
                </li>
                <li class="page-item" v-for="(page, index) in pages" :key="index"><a class="page-link" v-on:click="getContactByPaginate(page -1)">{{page}}</a></li>
                <li class="page-item">
                <a class="page-link" v-on:click="getContactByPagination('nex')" aria-label="Next">
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
          <h2 class="modal-title">Thông tin khách hàng</h2>
        </div>
        <div class="modal-body">
            <form class=""  method="Post" enctype="multipart/form-data">
                <label for="email"><b>Họ tên:</b></label>
                <input type="text" name="contactName" v-model="contactDetail.contactName" required style="background: white; border: 1px solid black; border-radius: 7px;">
                <label for="email"><b>Số điện thoại:</b></label>
                <input type="text" name="contactPhone" v-model="contactDetail.contactPhone" required style="background: white; border: 1px solid black; border-radius: 7px;">
                <label for="email"><b>Địa chỉ liên hệ:</b></label>
                <input type="text" name="address" required v-model="contactDetail.address" style="background: white; border: 1px solid black; border-radius: 7px;">
                <label for="email"><b>Link mua hàng:</b> <a v-bind:href="contactDetail.linkUrl" target="_blank">{{contactDetail.linkUrl}}</a></label>
                <label for="email"><b>Số lượng mua:</b></label>
                <input type="number" min="0" name="numberProduct" required v-model="contactDetail.numberProduct" style="background: white; border: 1px solid black; border-radius: 7px;">
                <label for="email"><b>Ghi chú:</b></label>
                <input type="text" name="note" required v-model="contactDetail.note" style="background: white; border: 1px solid black; border-radius: 7px;">
                <label for="email"><b>Trạng thái:</b></label>
                <select class="form-control" id="exampleFormControlSelect1" v-model="contactDetail.statusId">
                    <option v-for="(status, index) in listContactStatus" :key="index" v-bind:value="status.id" >{{status.name}}</option>
                </select>
            </form>
            <button class="btn btn-danger" v-on:click="saveContact(contactDetail.id)">Lưu</button>&nbsp;
            <button style="float:right" class="btn btn-success">Tạo đơn hàng</button>
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
    data: function() {
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
            listContactStatus: [],
            listContact: [],
            phone: '',
            khoiId: '',
            contactStatus:'',
            totalContact: '',
            page: 0,
            limit: 10,
            totalPage: '',
            pages: [],
            contactDetail: []
        };
    },
    props: [],
    methods: {
        getStatusContact: function(){
            var me = this;
            $.ajax({
                url: 'http://localhost:3000/api/contactStatus',
                methods: 'GET',
                dataType: 'json',
                data: {},
                success: function (res) {
                    $.ajax({
                        url: 'http://localhost:3000/api/contactStatus/count',
                        methods: 'GET',
                        dataType: 'json',
                        data: {},
                        success: function (r) {
                            res[0]['count'] = r['moi'];
                            res[1]['count'] = r['da_goi'];
                            res[2]['count'] = r['da_huy'];
                            res[3]['count'] = r['cho_goi_lai'];
                            res[4]['count'] = r['da_tao_don'];
                            me.totalContact = r['moi'] + r['da_goi'] + r['da_huy'] + r['cho_goi_lai'] + r['da_tao_don'];
                            const totalPage = Math.round(parseInt(me.totalContact) / parseInt(me.limit));
                            me.totalPage = totalPage;
                            for(var i = 1; i <= totalPage; i ++) {
                                me.pages.push(i);
                            }
                            me.listContactStatus = res;
                        },
                        error: function(err) {
                            console.log(err)
                        }
                    })

                },
                error: function(err) {
                    console.log(err)
                }
            })
        },
        getListContact: function(){
            var me = this;
            $.ajax({
                url: 'http://localhost:3000/api/contact',
                methods: 'GET',
                dataType: 'json',
                data: {
                    phone: me.phone,
                    khoId: me.khoId,
                    contactStatus: me.contactStatus,
                    limit: me.limit,
                    page: me.page
                },
                success: function (res) {
                    me.listContact = res;
                },
                error: function(err) {
                    console.log(err)
                }
            })
        },
        filterContact: function(){
            var me = this;
            var key = $('#search-input').val();
            me.phone = key;
            this.getListContact();
        },
        filterContactByStatus:function(statusId){
            var me = this;
            me.contactStatus = statusId;
            var key = $('#search-input').val();
            me.phone = key;
            me.page = 0;
            this.getListContact();
        },
        getContactByPaginate: function(page) {
            var me = this;
            me.page = page;
            this.getListContact();
        },
        getContactByPagination:function(type) {
            var me = this;
            if (type == 'pre') {
                me.page = page - 1;
            } else if (type == 'nex') {
                me.page = page + 1;
            }
            this.getListContact();
        },
        getContactById: function(id) {
            $('#myModal').modal({
                show: 'true'
            }); 
            var me = this;
            $.ajax({
                url: 'http://localhost:3000/api/contact/' + id,
                methods: 'GET',
                dataType: 'json',
                data: {},
                success: function (res) {
                    me.contactDetail = res;
                },
                error: function(err) {
                    console.log(err)
                }
            })
        },
        saveContact:function(id){
            var me = this;
            var contactName = $("input[name='contactName']").val();
            var contactPhone = $("input[name='contactPhone']").val();
            var address = $("input[name='address']").val();
            var numberProduct = $("input[name='numberProduct']").val();
            var note = $("input[name='note']").val();
            var status = $("#exampleFormControlSelect1").val();
            $.ajax({
                url: 'http://localhost:3000/api/contact/update/' + id,
                methods: 'get',
                dataType: 'json',
                data: {
                    contactName: contactName,
                    contactPhone: contactPhone,
                    address: address,
                    numberProduct,
                    note: note,
                    status: status
                },
                success: function (res) {
                     $('#myModal').modal({
                        show: 'false'
                    });
                    me.getListContact();
                },
                error: function(err) {
                    console.log(err)
                }
            })
        }
    },
    created: function(){
        this.getStatusContact();
        this.getListContact();
    }
}
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