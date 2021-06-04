<template>
  <div class="content" id="list-contact-screen" v-cloak>
    <div class="row menu-list-contact">
        <div class="dropdown col-md-1">
            <select class="form-control" id="exampleFormControlSelect1" v-model="khoId" style="margin-top:12px;">
                <option v-for="(khoID, index) in kho" :key="index" v-bind:value="khoID.id">{{khoID.name}}</option>
            </select>
        </div>
        <div class="col-md-4">
            <form style="padding: 0px !important; height:65px;">
                <div class="input-group">
                    <div class="form-outline">
                        <input id="search-input" type="search" class="form-control" placeholder="Tìm kiếm theo SDT..." style="width:300px;" />
                    </div>
                    <button id="search-button" type="button" class="btn btn-primary" v-on:click="filterContact()" style="background-color: #4caf50 !important;">
                    Tìm kiếm
                    </button>
                </div>
            </form>
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
            <tr v-for="(contact, index) in listContact" :key="index" v-on:click="getContactById(contact.id)">
                <td v-bind:style="{backgroundColor:contact.colorStatus}"></td>
                <td style="width:12%;">MS{{ contact.id }}</td>
                <td style="width:25%;">{{ contact.contactName }}</td>
                <td style="width:12%;">{{ contact.contactPhone }}</td>
                <td style="width:45%;">{{ contact.address }}</td>
                <td></td>
            </tr>
            <p v-if="listContact.length == 0" class="text-center">Không tìm thấy dữ liệu.</p>
            </tbody>
        </table>
        <nav v-if="totalPage" aria-label="Page navigation example" style="text-align: center;">
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
            <span v-if="totalContact" style="float: right; margin-top: 23px;">Tổng {{ totalContact }} kết quả</span>
        </nav>
    </div>
      <!-- Modal -->
  <div class="modal fade" id="myModal" role="dialog">
    <div class="modal-dialog">
    
      <!-- Modal content-->
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal">&times;</button>
          <h2 class="modal-title" style="color: black; text-align: center;">Thông tin khách hàng</h2>
        </div>
        <div class="modal-body">
                <label class="label-120"><b>Họ tên:</b></label>
                <input type="text" name="contactName" v-model="contactDetail.contactName" style="background: white; border: 1px solid black; border-radius: 7px;width:430px;"><br/>
                <label class="label-120"><b>Số điện thoại:</b></label>
                <input type="text" name="contactPhone" v-model="contactDetail.contactPhone" style="background: white; border: 1px solid black; border-radius: 7px;width:430px;"><br/>
                <label class="label-120"><b>Địa chỉ liên hệ:</b></label>
                <input type="text" name="address" v-model="contactDetail.address" style="background: white; border: 1px solid black; border-radius: 7px;width:430px;"><br/>
                <label class=""><b>Link mua hàng:</b> <a v-bind:href="contactDetail.linkUrl" target="_blank">{{contactDetail.linkUrl}}</a></label><br/>
                <label class="label-120"><b>Số lượng mua:</b></label>
                <input type="number" min="0" name="numberProduct" v-model="contactDetail.numberProduct" style="background: white; border: 1px solid black; border-radius: 7px;width:430px;"><br/>
                <label class="label-120"><b>Ghi chú:</b></label>
                <input type="text" name="note" v-model="contactDetail.note" style="background: white; border: 1px solid black; border-radius: 7px;width:430px;"><br/>
                <label class="label-120"><b>Trạng thái:</b></label>
                <select class="form-control" id="exampleFormControlSelect1" v-model="contactDetail.statusId">
                    <option v-for="(status, index) in listContactStatus" :key="index" v-bind:value="status.id" >{{status.name}}</option>
                </select>
                <button class="btn btn-success" name="sendSubmit" @click="saveContact(contactDetail.id)" style="margin-top:20px;">Lưu</button>&nbsp;
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
            kho : [],
            listContactStatus: [],
            listContact: [],
            phone: '',
            khoId: 1,
            contactStatus:'',
            totalContact: '',
            page: 0,
            limit: 15,
            totalPage: '',
            pages: [],
            contactDetail: [],
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
                        data: {khoId: me.khoId},
                        success: function (r) {
                            res[0]['count'] = r['moi'];
                            res[1]['count'] = r['da_goi'];
                            res[2]['count'] = r['da_huy'];
                            res[3]['count'] = r['cho_goi_lai'];
                            res[4]['count'] = r['da_tao_don'];
                           
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
                    me.pages = [];
                    me.listContact = res['data'];
                    me.totalContact = res['count'];
                    const totalPage = Math.ceil(parseInt(me.totalContact) / parseInt(me.limit));
                    me.totalPage = totalPage;
                    for(var i = 1; i <= totalPage; i ++) {
                        me.pages.push(i);
                    }
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
            me.totalContact = '';
            me.totalPage = '';
            me.pages = [];
            this.getStatusContact();
        },
        filterContactByStatus:function(statusId){
            var me = this;
            me.contactStatus = statusId;
            var key = $('#search-input').val();
            me.phone = key;
            me.page = 0;
            me.totalContact = 0;
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
                const pageP = me.page - 1;
                if (pageP < 0) {
                    me.page = 0;
                } else {
                    me.page = me.page - 1;
                }
            } else if (type == 'nex') {
                const pageN = me.page + 1;
                if (pageN > me.totalPage) {
                    me.page = me.totalPage;
                } else {
                    me.page = pageN;
                }
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
            var status = me.contactDetail.statusId;
            const data = {
                contactName: contactName,
                contactPhone: contactPhone,
                address: address,
                numberProduct: numberProduct,
                note: note,
                status: status
            };
            fetch('http://localhost:3000/api/contact/update/' + id, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({data: data}),
            })
            .then(response => response.json())
            .then(data => {
                window.location.href = '/';
                $('#myModal').modal('hidden');
                me.getListContact();
            })
            .catch((error) => {
            });
        },
        getKhoContact:function(){
            try{
                var me = this;
                $.ajax({
                    url: 'http://localhost:3000/api/khoContact/',
                    methods: 'GET',
                    dataType: 'json',
                    data: {},
                    success: function (res) {
                    me.kho = res;
                    },
                    error: function(err) {
                        console.log(err);
                    }
                });
            } catch (e) {
                logMyErrors(e); // pass exception object to error handler
            }
        }
    },
    created: function(){
        const token = localStorage.getItem('token_user');
        if (token) {
            this.getStatusContact();
            this.getListContact();
            this.getKhoContact();
        } else {
            this.$router.push({ name: 'login' });
        }
    }
}
</script>


<style>
#list-contact-screen {
    font-size: medium;
    line-height: revert;
}
.list-status-contact li {
    list-style: none;
    float: left;
    padding: 3px;
    padding-left: 10px;
    padding-right: 10px;
    border-radius: 1px;
}
.label-120 {
    width:120px;
}
</style>